import { basicSetup } from 'codemirror'
import { EditorView, ViewUpdate } from '@codemirror/view'
import { EditorState, Compartment } from '@codemirror/state'
import { javascript } from '@codemirror/lang-javascript'
import { java } from '@codemirror/lang-java'
import { cpp } from '@codemirror/lang-cpp'
import { oneDark } from '@codemirror/theme-one-dark'

// ── Constants ────────────────────────────────────────────────────────────────

const STUN_CONFIG: RTCConfiguration = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
    ],
}
const MY_COLOR   = '#a78bfa'
const PEER_COLOR = '#38bdf8'

const DEFAULT_CODE: Record<string, string> = {
    js: `function solve(arr) {
  return arr;
}

console.log(solve([1, 2, 3]));`,
    java: `class Solution {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}`,
    c: `#include <stdio.h>

int main() {
    printf("Hello World\\n");
    return 0;
}`,
    cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello World" << endl;
    return 0;
}`,
}

// ── Room / URL ────────────────────────────────────────────────────────────────

let room = ''   // set when the user enters a room (from home or hash)

const proto = location.protocol === 'https:' ? 'wss' : 'ws'
const wsUrl = `${proto}://${location.host}/signal`

// ── Data message types ────────────────────────────────────────────────────────

type Point = { x: number; y: number }

interface Stroke {
    color: string
    erasing: boolean
    points: Point[]
}

type DataMsg =
    | { source: 'hello'; name: string }
    | { source: 'chat'; text: string }
    | { source: 'code'; content: string; lang: string }
    | { source: 'code-output'; output: string }
    | { source: 'diagram'; op: 'line'; x1: number; y1: number; x2: number; y2: number; erasing: boolean }
    | { source: 'diagram'; op: 'stroke-complete'; color: string; erasing: boolean; points: Point[] }
    | { source: 'diagram'; op: 'undo' }
    | { source: 'diagram'; op: 'redo' }
    | { source: 'diagram'; op: 'clear' }

// ── DOM refs ──────────────────────────────────────────────────────────────────

const statusDot  = document.getElementById('status-dot')!
const statusText = document.getElementById('status-text')!
const messages   = document.getElementById('messages')!
const msgInput   = document.getElementById('msg') as HTMLInputElement
const sendBtn    = document.getElementById('send') as HTMLButtonElement
const localLabel  = document.getElementById('local-label')!
const remoteLabel = document.getElementById('remote-label')!

// ── Diagnostics state ────────────────────────────────────────────────────────

const diagState = {
    localCandidates: [] as Array<{ type: string; protocol: string }>,
    iceState:        'new',
    gatheringState:  'new',
    dcState:         'closed',
    wsConnected:     false,
    rtt:             -1,
    bytesSent:       0,
    bytesReceived:   0,
    pairLocalType:   '',
    pairRemoteType:  '',
    iceCheckingStart: 0,
}

function resetDiagState() {
    diagState.localCandidates  = []
    diagState.iceState         = 'new'
    diagState.gatheringState   = 'new'
    diagState.dcState          = 'closed'
    diagState.rtt              = -1
    diagState.bytesSent        = 0
    diagState.bytesReceived    = 0
    diagState.pairLocalType    = ''
    diagState.pairRemoteType   = ''
    diagState.iceCheckingStart = 0
    updateDiagnosticsUI()
}

function fmtBytes(n: number): string {
    if (n < 1024) return `${n} B`
    if (n < 1048576) return `${(n / 1024).toFixed(1)} KB`
    return `${(n / 1048576).toFixed(2)} MB`
}

function getDiagnosis(): { text: string; cls: 'ok' | 'warn' | 'error' } {
    if (!diagState.wsConnected) {
        return { text: '🔴 Cannot reach signaling server.\nCheck internet connection. If on VPN try disabling it.', cls: 'error' }
    }

    const ice = diagState.iceState
    const srflx = diagState.localCandidates.filter(c => c.type === 'srflx').length

    if (ice === 'connected' || ice === 'completed') {
        const t = diagState.pairLocalType
        if (t === 'relay')
            return { text: '⚠️ Connected via TURN relay.\nDirect P2P was not possible on this network — traffic is being routed through a relay server. Connection works but has extra latency.\nFix: add a TURN server to the ICE config.', cls: 'warn' }
        if (t === 'host')
            return { text: '✅ Both peers on the same local network.\nDirect local connection — optimal.', cls: 'ok' }
        return { text: '✅ Direct peer-to-peer connection over the internet.\nOptimal — no relay needed.', cls: 'ok' }
    }

    if (ice === 'failed') {
        if (srflx === 0)
            return { text: '🔴 STUN blocked — UDP to external servers is firewalled.\nICE could not discover a public IP. Ask the other person to:\n1. Switch to mobile hotspot\n2. Disable VPN / corporate proxy\n3. Try a different network\nLong-term fix: add TURN over TLS port 443 (looks like HTTPS, bypasses most firewalls).', cls: 'error' }
        return { text: '🔴 Symmetric NAT detected.\nSTUN resolved a public IP but the router assigns a different port for each destination, so direct P2P failed.\nLong-term fix: add a TURN server to the ICE config.', cls: 'error' }
    }

    if (ice === 'disconnected') {
        return { text: '⚠️ Connection dropped — attempting to recover.\nIf this persists the network is unstable.', cls: 'warn' }
    }

    if (ice === 'checking') {
        const elapsed = diagState.iceCheckingStart ? (Date.now() - diagState.iceCheckingStart) / 1000 : 0
        if (elapsed > 20)
            return { text: `⚠️ Still checking after ${Math.round(elapsed)}s — unusually long.\nNetwork may be heavily firewalled. Try mobile hotspot.`, cls: 'warn' }
        return { text: '⏳ Negotiating connection — trying candidate pairs…', cls: 'warn' }
    }

    return { text: '⏳ Waiting for the other person to join.', cls: 'warn' }
}

function updateDiagnosticsUI() {
    // WebSocket row
    const wsDot = document.getElementById('d-ws-dot')!
    const wsVal = document.getElementById('d-ws-val')!
    wsDot.className = `health-dot ${diagState.wsConnected ? 'ok' : 'error'}`
    wsVal.textContent = diagState.wsConnected ? 'Connected' : 'Disconnected'

    // ICE row
    const iceDot = document.getElementById('d-ice-dot')!
    const iceVal = document.getElementById('d-ice-val')!
    const iceCls: Record<string, string> = {
        new: '', checking: 'warn', connected: 'ok', completed: 'ok',
        disconnected: 'warn', failed: 'error', closed: '',
    }
    iceDot.className = `health-dot ${iceCls[diagState.iceState] ?? ''}`

    const typeLabel: Record<string, string> = {
        host: 'local network', srflx: 'direct P2P', prflx: 'direct P2P', relay: 'via TURN relay',
    }
    let iceText = diagState.iceState
    if ((diagState.iceState === 'connected' || diagState.iceState === 'completed') && diagState.pairLocalType) {
        iceText += ` — ${typeLabel[diagState.pairLocalType] ?? diagState.pairLocalType}`
        if (diagState.rtt >= 0) iceText += `, ${diagState.rtt}ms RTT`
    }
    iceVal.textContent = iceText

    // Data channel row
    const dcDot = document.getElementById('d-dc-dot')!
    const dcVal = document.getElementById('d-dc-val')!
    const dcMap: Record<string, string> = { open: 'ok', connecting: 'warn', closing: 'warn', closed: '' }
    dcDot.className = `health-dot ${dcMap[diagState.dcState] ?? ''}`
    dcVal.textContent = diagState.dcState

    // Diagnosis box
    const { text, cls } = getDiagnosis()
    const box = document.getElementById('diag-box')!
    box.textContent = text
    box.className = `diag-box ${cls}`

    // Candidate counts
    const counts = { host: 0, srflx: 0, relay: 0, prflx: 0 }
    diagState.localCandidates.forEach(c => { if (c.type in counts) (counts as Record<string,number>)[c.type]++ })

    const setCount = (id: string, n: number, alarmIfZeroAndFailed: boolean) => {
        const el = document.getElementById(id)!
        el.textContent = String(n)
        el.className = `cand-count${n === 0 ? ' zero' : ''}${alarmIfZeroAndFailed && n === 0 && diagState.iceState === 'failed' ? ' alarm' : ''}`
    }
    setCount('d-host-count',  counts.host,  false)
    setCount('d-srflx-count', counts.srflx, true)
    setCount('d-relay-count', counts.relay, false)

    // Live stats
    document.getElementById('d-rtt')!.textContent  = diagState.rtt >= 0 ? `${diagState.rtt} ms` : '—'
    document.getElementById('d-sent')!.textContent = diagState.bytesSent > 0 ? fmtBytes(diagState.bytesSent) : '—'
    document.getElementById('d-recv')!.textContent = diagState.bytesReceived > 0 ? fmtBytes(diagState.bytesReceived) : '—'
    document.getElementById('d-gathering')!.textContent = diagState.gatheringState

    const pair = diagState.pairLocalType && diagState.pairRemoteType
        ? `${diagState.pairLocalType} ↔ ${diagState.pairRemoteType}`
        : '—'
    document.getElementById('d-pair')!.textContent = pair
}

async function pollStats() {
    if (!pc) { updateDiagnosticsUI(); return }
    try {
        const stats = await pc.getStats()
        const candMap = new Map<string, RTCIceCandidateStats>()
        let activePair: RTCIceCandidatePairStats | null = null

        stats.forEach((r: RTCStats) => {
            const report = r as Record<string, unknown>
            if (r.type === 'local-candidate' || r.type === 'remote-candidate')
                candMap.set(r.id, r as unknown as RTCIceCandidateStats)
            if (r.type === 'candidate-pair' && report['nominated'] === true)
                activePair = r as unknown as RTCIceCandidatePairStats
        })

        if (activePair) {
            const ap = activePair as Record<string, unknown>
            const local  = candMap.get(ap['localCandidateId'] as string)
            const remote = candMap.get(ap['remoteCandidateId'] as string)
            diagState.rtt  = ap['currentRoundTripTime'] != null ? Math.round((ap['currentRoundTripTime'] as number) * 1000) : -1
            diagState.bytesSent     = (ap['bytesSent']     as number) ?? 0
            diagState.bytesReceived = (ap['bytesReceived'] as number) ?? 0
            diagState.pairLocalType  = (local  as Record<string,unknown>)?.['candidateType'] as string ?? ''
            diagState.pairRemoteType = (remote as Record<string,unknown>)?.['candidateType'] as string ?? ''
        }
    } catch { /* getStats may fail if PC is closing */ }
    updateDiagnosticsUI()
}

let statsTimer: ReturnType<typeof setInterval> | null = null
function startStatsPolling() {
    if (statsTimer) return
    pollStats()
    statsTimer = setInterval(pollStats, 2000)
}
function stopStatsPolling() {
    if (statsTimer) { clearInterval(statsTimer); statsTimer = null }
}

// Copy report
document.getElementById('copy-report-btn')!.addEventListener('click', () => {
    const counts = { host: 0, srflx: 0, relay: 0 }
    diagState.localCandidates.forEach(c => { if (c.type in counts) (counts as Record<string,number>)[c.type]++ })
    const { text } = getDiagnosis()

    const lines = [
        '── Interview Room Diagnostic Report ──',
        `Room: ${room || '(not joined)'}`,
        `Time: ${new Date().toLocaleTimeString()}`,
        '',
        `Signaling server: ${diagState.wsConnected ? 'Connected' : 'Disconnected'}`,
        `ICE state:        ${diagState.iceState}`,
        `Data channel:     ${diagState.dcState}`,
        `ICE gathering:    ${diagState.gatheringState}`,
        '',
        'ICE Candidates gathered (local):',
        `  Host  (local IP):  ${counts.host}`,
        `  STUN  (public IP): ${counts.srflx}${counts.srflx === 0 ? '  ← UDP may be blocked' : ''}`,
        `  TURN  (relay):     ${counts.relay}${counts.relay === 0 ? '  ← no TURN server configured' : ''}`,
        '',
        diagState.rtt >= 0          ? `RTT:              ${diagState.rtt} ms` : '',
        diagState.pairLocalType     ? `Active path:      ${diagState.pairLocalType} ↔ ${diagState.pairRemoteType}` : '',
        diagState.bytesSent > 0     ? `Bytes sent:       ${fmtBytes(diagState.bytesSent)}` : '',
        diagState.bytesReceived > 0 ? `Bytes received:   ${fmtBytes(diagState.bytesReceived)}` : '',
        '',
        `Diagnosis: ${text.replace(/^[🔴✅⚠️⏳]\s*/, '')}`,
        '',
        `Browser: ${navigator.userAgent}`,
    ].filter(l => l !== '').join('\n')

    navigator.clipboard.writeText(lines).then(() => {
        const btn = document.getElementById('copy-report-btn')!
        const orig = btn.textContent!
        btn.textContent = '✓ Copied to clipboard'
        setTimeout(() => { btn.textContent = orig }, 2000)
    })
})

document.getElementById('refresh-stats')!.addEventListener('click', pollStats)

// ── Names ─────────────────────────────────────────────────────────────────────

let myName   = 'You'
let peerName = 'Peer'

// ── Home screen ───────────────────────────────────────────────────────────────

const homeScreen    = document.getElementById('home-screen')!
const createRoomBtn = document.getElementById('create-room-btn') as HTMLButtonElement
const joinCodeInput = document.getElementById('join-code-input') as HTMLInputElement
const joinCodeBtn   = document.getElementById('join-code-btn') as HTMLButtonElement

function generateRoomId(): string {
    const adj  = ['swift','bold','calm','bright','deep','sharp','clean','brave','quick','cool']
    const noun = ['eagle','tiger','river','falcon','storm','pine','coast','cliff','grove','peak']
    const num  = Math.floor(Math.random() * 9000 + 1000)
    const pick = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)]
    return `${pick(adj)}-${pick(noun)}-${num}`
}

function showJoinScreen(roomId: string) {
    room = roomId
    location.hash = roomId
    ;(document.getElementById('room-name') as HTMLElement).textContent = roomId
    joinRoomDisplay.textContent = roomId
    homeScreen.style.display = 'none'
    joinScreen.classList.add('visible')
    nameInput.focus()
}

createRoomBtn.addEventListener('click', () => showJoinScreen(generateRoomId()))

joinCodeBtn.addEventListener('click', () => {
    const code = joinCodeInput.value.trim().replace(/^#/, '')
    if (code) showJoinScreen(code)
})

joinCodeInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && joinCodeInput.value.trim()) joinCodeBtn.click()
})

// ── Join screen ───────────────────────────────────────────────────────────────

const joinScreen      = document.getElementById('join-screen')!
const joinRoomDisplay = document.getElementById('join-room-display')!
const nameInput       = document.getElementById('name-input') as HTMLInputElement
const joinBtn         = document.getElementById('join-btn') as HTMLButtonElement
const copyLinkBtn     = document.getElementById('copy-link-btn') as HTMLButtonElement

nameInput.addEventListener('input', () => {
    joinBtn.disabled = nameInput.value.trim().length === 0
})

nameInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !joinBtn.disabled) joinBtn.click()
})

copyLinkBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(location.href).then(() => {
        const orig = copyLinkBtn.textContent!
        copyLinkBtn.textContent = '✓ Copied!'
        setTimeout(() => { copyLinkBtn.textContent = orig }, 2000)
    })
})

joinBtn.addEventListener('click', () => {
    const name = nameInput.value.trim()
    if (!name) return
    myName = name
    localLabel.textContent = name
    const la = document.getElementById('local-avatar')
    if (la) la.textContent = name[0].toUpperCase()
    joinScreen.classList.add('hiding')
    setTimeout(() => {
        joinScreen.style.display = 'none'
        connect()   // connect to signaling server only now
    }, 260)
})

// ── Initial screen routing ────────────────────────────────────────────────────

const initialHash = location.hash.slice(1).trim()
if (initialHash) {
    showJoinScreen(initialHash)   // direct link with room — skip home screen
} else {
    homeScreen.style.display = 'flex'   // no room yet — show home
}

// ── Theme toggle ──────────────────────────────────────────────────────────────

const themeBtn = document.getElementById('theme-toggle') as HTMLButtonElement
const savedTheme = localStorage.getItem('theme') || 'dark'
if (savedTheme === 'light') document.body.classList.add('light')
themeBtn.textContent = savedTheme === 'light' ? '🌙' : '☀️'

themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light')
    const isLight = document.body.classList.contains('light')
    localStorage.setItem('theme', isLight ? 'light' : 'dark')
    themeBtn.textContent = isLight ? '🌙' : '☀️'
})

// ── Status helpers ────────────────────────────────────────────────────────────

function setStatus(text: string, state: 'connected' | 'waiting' | 'error' | '') {
    statusText.textContent = text
    statusDot.className = state
}

// ── Chat ──────────────────────────────────────────────────────────────────────

function appendMessage(who: 'you' | 'peer' | 'system', text: string) {
    if (who === 'system') {
        const el = document.createElement('div')
        el.className = 'system-msg'
        el.textContent = text
        messages.appendChild(el)
    } else {
        const el = document.createElement('div')
        el.className = `bubble ${who}`
        const nameEl = document.createElement('div')
        nameEl.className = 'who'
        nameEl.textContent = who === 'you' ? myName : peerName
        el.appendChild(nameEl)
        el.appendChild(document.createTextNode(text))
        messages.appendChild(el)
    }
    messages.scrollTop = messages.scrollHeight
    if (who === 'peer') {
        const drawer = document.getElementById('chat-drawer')
        if (drawer && !drawer.classList.contains('open'))
            document.getElementById('chat-notif')?.classList.add('show')
    }
}

function playPing() {
    try {
        const ctx = new AudioContext()
        const o = ctx.createOscillator()
        const g = ctx.createGain()
        o.connect(g); g.connect(ctx.destination)
        o.type = 'sine'; o.frequency.setValueAtTime(880, ctx.currentTime)
        g.gain.setValueAtTime(0.25, ctx.currentTime)
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.6)
        o.start(ctx.currentTime); o.stop(ctx.currentTime + 0.6)
    } catch { /* audio not available */ }
}

// ── Code editor ───────────────────────────────────────────────────────────────

let currentLang = 'js'
const langCompartment = new Compartment()
let applyingRemote = false
let codeDebounce: ReturnType<typeof setTimeout> | null = null

const langExtensions: Record<string, ReturnType<typeof javascript>> = {
    js:   javascript(),
    java: java(),
    c:    cpp(),
    cpp:  cpp(),
}

const editor = new EditorView({
    state: EditorState.create({
        doc: DEFAULT_CODE['js'],
        extensions: [
            basicSetup,
            oneDark,
            langCompartment.of(javascript()),
            EditorView.updateListener.of((update: ViewUpdate) => {
                if (!update.docChanged || applyingRemote) return
                if (codeDebounce) clearTimeout(codeDebounce)
                codeDebounce = setTimeout(() => {
                    sendData({ source: 'code', content: editor.state.doc.toString(), lang: currentLang })
                }, 250)
            }),
        ],
    }),
    parent: document.getElementById('editor')!,
})

function applyRemoteCode(content: string, lang: string) {
    if (lang !== currentLang) setLang(lang, false)
    applyingRemote = true
    const sel = editor.state.selection
    editor.dispatch({
        changes: { from: 0, to: editor.state.doc.length, insert: content },
        selection: { anchor: Math.min(sel.main.anchor, content.length) },
    })
    applyingRemote = false
}

function setLang(lang: string, sendToChannel = true) {
    currentLang = lang
    document.querySelectorAll('.lang-btn').forEach(b =>
        b.classList.toggle('active', (b as HTMLElement).dataset.lang === lang))
    editor.dispatch({ effects: langCompartment.reconfigure(langExtensions[lang] || javascript()) })
    applyingRemote = true
    editor.dispatch({ changes: { from: 0, to: editor.state.doc.length, insert: DEFAULT_CODE[lang] || '' } })
    applyingRemote = false
    if (sendToChannel) {
        sendData({ source: 'code', content: editor.state.doc.toString(), lang })
    }
}

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang((btn as HTMLElement).dataset.lang!))
})

// ── Code execution ────────────────────────────────────────────────────────────

const runBtn         = document.getElementById('run-btn') as HTMLButtonElement
const outputText     = document.getElementById('output-text') as HTMLPreElement
const outputBadge    = document.getElementById('output-badge') as HTMLSpanElement
const clearOutputBtn = document.getElementById('clear-output-btn') as HTMLButtonElement

function showOutput(text: string, isError = false, isInfo = false) {
    outputText.textContent = text
    outputBadge.textContent = isError ? 'error' : isInfo ? 'info' : 'ok'
    outputBadge.className   = `badge ${isError ? 'err' : isInfo ? 'info' : 'ok'}`
}

// Wandbox — free community compiler service, no account, no billing, no rate limit key
// https://github.com/melpon/wandbox  |  running since 2012
const WANDBOX_URL = 'https://wandbox.org/api/compile.json'

async function runWithWandbox(code: string, lang: string): Promise<{ output: string; isError: boolean }> {
    // For Java, the compiler needs the filename to match the public class name
    let compiler: string
    let compilerOptionRaw: string | undefined

    if (lang === 'java') {
        compiler = 'openjdk-head'
    } else if (lang === 'c') {
        compiler = 'gcc-head'
        compilerOptionRaw = '-x c'
    } else {
        compiler = 'gcc-head'
    }

    // Extract class name so Wandbox can name the Java file correctly
    const javaFilename = lang === 'java'
        ? (() => { const m = code.match(/(?:public\s+)?class\s+(\w+)/); return m ? `${m[1]}.java` : 'Main.java' })()
        : undefined

    const body: Record<string, string> = { compiler, code }
    if (compilerOptionRaw) body['compiler-option-raw'] = compilerOptionRaw
    if (javaFilename)      body['filename'] = javaFilename

    const resp = await fetch(WANDBOX_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    })
    if (!resp.ok) throw new Error(`Wandbox returned ${resp.status}`)

    const data = await resp.json()
    const progOut  = (data.program_output  ?? '').trimEnd()
    const progErr  = (data.program_error   ?? '').trimEnd()
    const compErr  = (data.compiler_error  ?? '').trimEnd()

    let output = ''
    if (progOut) output += progOut
    if (progErr) output += (output ? '\n' : '') + `STDERR:\n${progErr}`
    if (compErr) output += (output ? '\n' : '') + `Compile error:\n${compErr}`
    if (!output) output = data.status === '0' ? '(no output)' : `Exited with status ${data.status}`

    return { output, isError: data.status !== '0' || !!compErr }
}

clearOutputBtn.addEventListener('click', () => {
    outputText.textContent  = '// Click ▶ Run to execute'
    outputBadge.textContent = 'ready'
    outputBadge.className   = 'badge info'
})

runBtn.addEventListener('click', async () => {
    const code = editor.state.doc.toString()
    runBtn.classList.add('running')
    runBtn.textContent = '⏳ Running…'
    runBtn.disabled = true

    if (currentLang === 'js') {
        // Run JavaScript locally — no network call
        const captured: string[] = []
        const origLog   = console.log
        const origError = console.error
        const origWarn  = console.warn

        const capture = (prefix: string) => (...args: unknown[]) => {
            captured.push(prefix + args.map(a =>
                a === null       ? 'null' :
                a === undefined  ? 'undefined' :
                typeof a === 'object' ? JSON.stringify(a, null, 2) :
                String(a)
            ).join(' '))
        }

        console.log   = capture('')
        console.error = capture('ERROR: ')
        console.warn  = capture('WARN:  ')

        let isError = false
        try {
            // eslint-disable-next-line no-new-func
            new Function(code)()
        } catch (e: unknown) {
            captured.push(`Runtime Error: ${e instanceof Error ? e.message : String(e)}`)
            isError = true
        } finally {
            console.log   = origLog
            console.error = origError
            console.warn  = origWarn
        }

        const output = captured.length > 0 ? captured.join('\n') : '(no output)'
        showOutput(output, isError)
        sendData({ source: 'code-output', output })
    } else {
        // Run Java / C / C++ via Wandbox (free, no auth, no charges ever)
        try {
            const { output, isError } = await runWithWandbox(code, currentLang)
            showOutput(output, isError)
            sendData({ source: 'code-output', output })
        } catch (e: unknown) {
            const msg = `Could not reach Wandbox.\n${e instanceof Error ? e.message : String(e)}`
            showOutput(msg, true)
            sendData({ source: 'code-output', output: msg })
        }
    }

    runBtn.classList.remove('running')
    runBtn.textContent = '▶ Run'
    runBtn.disabled = false
})

// ── Whiteboard ────────────────────────────────────────────────────────────────

const canvas = document.getElementById('whiteboard') as HTMLCanvasElement
const ctx2d  = canvas.getContext('2d')!

let erasing       = false
let myDrawColor   = MY_COLOR
let drawing       = false
let lx = 0, ly = 0

let strokes: Stroke[]   = []
let undoStack: Stroke[] = []
let currentStroke: Stroke | null = null

function resizeCanvas() {
    const rect = canvas.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) return
    canvas.width  = Math.floor(rect.width)
    canvas.height = Math.floor(rect.height)
    redrawCanvas()
}

function redrawCanvas() {
    ctx2d.clearRect(0, 0, canvas.width, canvas.height)
    strokes.forEach(drawStroke)
}

function drawStroke(s: Stroke) {
    if (s.points.length < 2) return
    ctx2d.save()
    if (s.erasing) {
        ctx2d.globalCompositeOperation = 'destination-out'
        ctx2d.lineWidth = 20
        ctx2d.strokeStyle = 'rgba(0,0,0,1)'
    } else {
        ctx2d.globalCompositeOperation = 'source-over'
        ctx2d.lineWidth = 2.5
        ctx2d.strokeStyle = s.color
    }
    ctx2d.lineCap  = 'round'
    ctx2d.lineJoin = 'round'
    ctx2d.beginPath()
    ctx2d.moveTo(s.points[0].x, s.points[0].y)
    for (let i = 1; i < s.points.length; i++) ctx2d.lineTo(s.points[i].x, s.points[i].y)
    ctx2d.stroke()
    ctx2d.restore()
}

function drawSegment(x1: number, y1: number, x2: number, y2: number, color: string, erase: boolean) {
    ctx2d.save()
    if (erase) {
        ctx2d.globalCompositeOperation = 'destination-out'
        ctx2d.lineWidth = 20
        ctx2d.strokeStyle = 'rgba(0,0,0,1)'
    } else {
        ctx2d.globalCompositeOperation = 'source-over'
        ctx2d.lineWidth = 2.5
        ctx2d.strokeStyle = color
    }
    ctx2d.lineCap  = 'round'
    ctx2d.lineJoin = 'round'
    ctx2d.beginPath()
    ctx2d.moveTo(x1, y1)
    ctx2d.lineTo(x2, y2)
    ctx2d.stroke()
    ctx2d.restore()
}

function getCanvasPos(e: MouseEvent): Point {
    const r = canvas.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top }
}

canvas.addEventListener('mousedown', e => {
    drawing   = true
    undoStack = []
    const pos = getCanvasPos(e)
    currentStroke = { color: myDrawColor, erasing, points: [pos] }
    lx = pos.x; ly = pos.y
})

canvas.addEventListener('mousemove', e => {
    if (!drawing || !currentStroke) return
    const { x, y } = getCanvasPos(e)
    currentStroke.points.push({ x, y })
    drawSegment(lx, ly, x, y, myDrawColor, erasing)
    sendData({ source: 'diagram', op: 'line', x1: lx, y1: ly, x2: x, y2: y, erasing })
    lx = x; ly = y
})

function finishStroke() {
    if (!drawing || !currentStroke) return
    drawing = false
    strokes.push(currentStroke)
    sendData({
        source: 'diagram', op: 'stroke-complete',
        color: currentStroke.color,
        erasing: currentStroke.erasing,
        points: currentStroke.points,
    })
    currentStroke = null
}

canvas.addEventListener('mouseup', finishStroke)
canvas.addEventListener('mouseleave', finishStroke)

function undo() {
    if (strokes.length === 0) return
    undoStack.push(strokes.pop()!)
    redrawCanvas()
    sendData({ source: 'diagram', op: 'undo' })
}

function redo() {
    if (undoStack.length === 0) return
    strokes.push(undoStack.pop()!)
    redrawCanvas()
    sendData({ source: 'diagram', op: 'redo' })
}

document.getElementById('undo-btn')!.addEventListener('click', undo)
document.getElementById('redo-btn')!.addEventListener('click', redo)

document.addEventListener('keydown', e => {
    if (!document.querySelector('#tab-diagram.active')) return
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) { e.preventDefault(); undo() }
    if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) { e.preventDefault(); redo() }
})

document.getElementById('tool-pen')!.addEventListener('click', () => {
    erasing = false
    canvas.style.cursor = 'crosshair'
    document.getElementById('tool-pen')!.classList.add('active')
    document.getElementById('tool-eraser')!.classList.remove('active')
})
document.getElementById('tool-eraser')!.addEventListener('click', () => {
    erasing = true
    canvas.style.cursor = 'cell'
    document.getElementById('tool-eraser')!.classList.add('active')
    document.getElementById('tool-pen')!.classList.remove('active')
})

document.querySelectorAll('.swatch').forEach(s => {
    s.addEventListener('click', () => {
        erasing = false
        myDrawColor = (s as HTMLElement).dataset.color!
        document.getElementById('tool-pen')!.classList.add('active')
        document.getElementById('tool-eraser')!.classList.remove('active')
        document.querySelectorAll('.swatch').forEach(x => x.classList.remove('active'))
        s.classList.add('active')
        canvas.style.cursor = 'crosshair'
    })
})

const customColor = document.getElementById('custom-color') as HTMLInputElement
customColor.addEventListener('input', () => {
    erasing = false
    myDrawColor = customColor.value
    document.querySelectorAll('.swatch').forEach(x => x.classList.remove('active'))
    canvas.style.cursor = 'crosshair'
})

document.getElementById('clear-canvas')!.addEventListener('click', () => {
    strokes = []; undoStack = []
    ctx2d.clearRect(0, 0, canvas.width, canvas.height)
    sendData({ source: 'diagram', op: 'clear' })
})

function applyRemoteDiagram(msg: Extract<DataMsg, { source: 'diagram' }>) {
    switch (msg.op) {
        case 'line':
            drawSegment(msg.x1, msg.y1, msg.x2, msg.y2, PEER_COLOR, msg.erasing)
            break
        case 'stroke-complete':
            strokes.push({ color: PEER_COLOR, erasing: msg.erasing, points: msg.points })
            break
        case 'undo':
            if (strokes.length > 0) { undoStack.push(strokes.pop()!); redrawCanvas() }
            break
        case 'redo':
            if (undoStack.length > 0) { strokes.push(undoStack.pop()!); redrawCanvas() }
            break
        case 'clear':
            strokes = []; undoStack = []
            ctx2d.clearRect(0, 0, canvas.width, canvas.height)
            break
    }
}

// ── Tabs ──────────────────────────────────────────────────────────────────────

document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const target = (tab as HTMLElement).dataset.tab!
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'))
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'))
        tab.classList.add('active')
        document.getElementById(`tab-${target}`)!.classList.add('active')
        if (target === 'diagram') requestAnimationFrame(resizeCanvas)
        if (target === 'network') pollStats()
    })
})

window.addEventListener('resize', () => {
    if (document.querySelector('#tab-diagram.active')) resizeCanvas()
})

// ── Video ─────────────────────────────────────────────────────────────────────

let localStream: MediaStream | null = null
const localVideo  = document.getElementById('local-video') as HTMLVideoElement
const remoteVideo = document.getElementById('remote-video') as HTMLVideoElement
const toggleBtn   = document.getElementById('toggle-video') as HTMLButtonElement

toggleBtn.addEventListener('click', async () => {
    if (!localStream) {
        try {
            localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            localVideo.srcObject = localStream
            toggleBtn.textContent = '📹'
            toggleBtn.classList.add('active')
            document.getElementById('pip-local')!.classList.add('cam-on')
            if (pc && pc.connectionState !== 'closed') {
                localStream.getTracks().forEach(t => pc!.addTrack(t, localStream!))
            }
        } catch { appendMessage('system', 'Camera/mic access denied') }
    } else {
        localStream.getTracks().forEach(t => t.stop())
        localStream = null
        localVideo.srcObject = null
        document.getElementById('pip-local')!.classList.remove('cam-on')
        toggleBtn.textContent = '📷'
        toggleBtn.classList.remove('active')
    }
})

// ── WebRTC ────────────────────────────────────────────────────────────────────

let pc: RTCPeerConnection | null = null
let dataChannel: RTCDataChannel | null = null
let isOfferer = false
let makingOffer = false
const pendingCandidates: RTCIceCandidateInit[] = []

function sendData(msg: DataMsg) {
    if (dataChannel?.readyState === 'open') {
        dataChannel.send(JSON.stringify(msg))
    }
}

function handleDataMessage(raw: string) {
    const msg: DataMsg = JSON.parse(raw)
    if (msg.source === 'hello') {
        peerName = msg.name
        remoteLabel.textContent = msg.name
        const ra = document.getElementById('remote-avatar')
        if (ra) ra.textContent = msg.name[0].toUpperCase()
        return
    }
    if (msg.source === 'chat')        return appendMessage('peer', msg.text)
    if (msg.source === 'code')        return applyRemoteCode(msg.content, msg.lang)
    if (msg.source === 'code-output') return showOutput(msg.output, msg.output.startsWith('ERROR'), msg.output.startsWith('⚠️'))
    if (msg.source === 'diagram')     return applyRemoteDiagram(msg)
}

function setupDataChannel(ch: RTCDataChannel) {
    dataChannel = ch
    ch.onopen = () => {
        setStatus('Connected', 'connected')
        msgInput.disabled = false
        sendBtn.disabled  = false
        sendData({ source: 'hello', name: myName })
        appendMessage('system', 'Connected to peer')
        diagState.dcState = 'open'
        updateDiagnosticsUI()
    }
    ch.onclose = () => {
        setStatus('Peer disconnected', 'waiting')
        diagState.dcState = 'closed'
        stopStatsPolling()
        updateDiagnosticsUI()
    }
    ch.onmessage = e => handleDataMessage(e.data)
}

function createPeerConnection() {
    pc = new RTCPeerConnection(STUN_CONFIG)

    pc.onicecandidate = ({ candidate }) => {
        if (candidate) {
            ws.send(JSON.stringify({ type: 'candidate', candidate }))
            diagState.localCandidates.push({ type: candidate.type ?? 'unknown', protocol: candidate.protocol ?? 'unknown' })
            updateDiagnosticsUI()
        }
    }

    pc.oniceconnectionstatechange = () => {
        const s = pc!.iceConnectionState
        diagState.iceState = s
        if (s === 'checking' && !diagState.iceCheckingStart) diagState.iceCheckingStart = Date.now()
        if (s !== 'checking') diagState.iceCheckingStart = 0
        if (s === 'connected' || s === 'completed') startStatsPolling()
        updateDiagnosticsUI()
    }

    pc.onicegatheringchange = () => {
        diagState.gatheringState = pc!.iceGatheringState
        updateDiagnosticsUI()
    }

    pc.ontrack = e => {
        if (!remoteVideo.srcObject) remoteVideo.srcObject = new MediaStream()
        ;(remoteVideo.srcObject as MediaStream).addTrack(e.track)
        document.getElementById('pip-remote')!.classList.add('cam-on')
    }

    pc.ondatachannel = e => setupDataChannel(e.channel)

    pc.onconnectionstatechange = () => {
        if (pc?.connectionState === 'disconnected' || pc?.connectionState === 'failed') {
            setStatus('Peer disconnected', 'waiting')
            appendMessage('system', 'Peer left the room')
        }
    }

    pc.onnegotiationneeded = async () => {
        if (!isOfferer) return
        try {
            makingOffer = true
            await pc!.setLocalDescription()
            ws.send(JSON.stringify({ type: 'offer', sdp: pc!.localDescription }))
        } finally { makingOffer = false }
    }

    if (localStream) localStream.getTracks().forEach(t => pc!.addTrack(t, localStream!))
    return pc
}

async function startAsOfferer() {
    isOfferer = true
    createPeerConnection()
    const ch = pc!.createDataChannel('main')
    setupDataChannel(ch)
}

function startAsAnswerer() {
    isOfferer = false
    createPeerConnection()
}

function resetPeerState() {
    if (pc) { try { pc.close() } catch {} pc = null }
    dataChannel = null
    isOfferer   = false
    makingOffer = false
    pendingCandidates.length = 0
    msgInput.disabled = true
    sendBtn.disabled  = true
    remoteVideo.srcObject = null
    document.getElementById('pip-remote')!.classList.remove('cam-on')
    stopStatsPolling()
    resetDiagState()
}

// ── WebSocket & signaling ─────────────────────────────────────────────────────

let ws: WebSocket
let reconnectDelay = 1000
let heartbeatTimer: ReturnType<typeof setInterval> | null = null

function connect() {
    ws = new WebSocket(wsUrl)

    ws.onopen = () => {
        reconnectDelay = 1000
        if (heartbeatTimer) clearInterval(heartbeatTimer)
        heartbeatTimer = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ type: 'ping' }))
        }, 25_000)
        ws.send(JSON.stringify({ type: 'join', room }))
        setStatus('Waiting for peer…', 'waiting')
        diagState.wsConnected = true
        updateDiagnosticsUI()
    }

    ws.onmessage = async ({ data }) => {
        const msg = JSON.parse(data)

        if (msg.type === 'pong') return

        if (msg.type === 'joined') {
            if (msg.peers > 0) await startAsOfferer()
            else startAsAnswerer()
            return
        }

        if (msg.type === 'peer-joined') {
            playPing()
            appendMessage('system', 'Peer joined the room')
            if (!isOfferer) startAsAnswerer()
            return
        }

        if (msg.type === 'peer-left') {
            appendMessage('system', 'Peer left the room')
            resetPeerState()
            setStatus('Waiting for peer…', 'waiting')
            return
        }

        if (msg.type === 'offer') {
            if (!pc) startAsAnswerer()
            const offerCollision = makingOffer || pc!.signalingState !== 'stable'
            if (offerCollision && !isOfferer) return
            await pc!.setRemoteDescription(new RTCSessionDescription(msg.sdp))
            pendingCandidates.splice(0).forEach(c => pc!.addIceCandidate(new RTCIceCandidate(c)).catch(() => {}))
            const answer = await pc!.createAnswer()
            await pc!.setLocalDescription(answer)
            ws.send(JSON.stringify({ type: 'answer', sdp: pc!.localDescription }))
            return
        }

        if (msg.type === 'answer') {
            if (pc?.signalingState === 'have-local-offer') {
                await pc.setRemoteDescription(new RTCSessionDescription(msg.sdp))
                pendingCandidates.splice(0).forEach(c => pc!.addIceCandidate(new RTCIceCandidate(c)).catch(() => {}))
            }
            return
        }

        if (msg.type === 'candidate') {
            if (pc?.remoteDescription) {
                pc.addIceCandidate(new RTCIceCandidate(msg.candidate)).catch(() => {})
            } else {
                pendingCandidates.push(msg.candidate)
            }
            return
        }
    }

    ws.onclose = () => {
        if (heartbeatTimer) { clearInterval(heartbeatTimer); heartbeatTimer = null }
        diagState.wsConnected = false
        resetPeerState()
        setStatus('Reconnecting…', 'error')
        updateDiagnosticsUI()
        setTimeout(() => {
            reconnectDelay = Math.min(reconnectDelay * 2, 16_000)
            connect()
        }, reconnectDelay)
    }
}

// connect() is called from the join button handler, not on page load

// ── Chat send ─────────────────────────────────────────────────────────────────

function sendChatMessage() {
    const text = msgInput.value.trim()
    if (!text || dataChannel?.readyState !== 'open') return
    sendData({ source: 'chat', text })
    appendMessage('you', text)
    msgInput.value = ''
}

sendBtn.addEventListener('click', sendChatMessage)
msgInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendChatMessage() })

// ── Chat drawer ───────────────────────────────────────────────────────────────

const chatDrawer   = document.getElementById('chat-drawer')!
const chatBackdrop = document.getElementById('chat-backdrop')!

function openChatDrawer() {
    chatDrawer.classList.add('open')
    chatBackdrop.classList.add('visible')
    document.getElementById('chat-notif')?.classList.remove('show')
    messages.scrollTop = messages.scrollHeight
}
function closeChatDrawer() {
    chatDrawer.classList.remove('open')
    chatBackdrop.classList.remove('visible')
}

document.getElementById('chat-toggle-btn')!.addEventListener('click', () => {
    chatDrawer.classList.contains('open') ? closeChatDrawer() : openChatDrawer()
})
document.getElementById('close-chat-btn')!.addEventListener('click', closeChatDrawer)
chatBackdrop.addEventListener('click', closeChatDrawer)

// ── PIP drag & collapse ───────────────────────────────────────────────────────

const pipContainer   = document.getElementById('pip-container')!
const pipHandle      = document.getElementById('pip-handle')!
const pipCollapseBtn = document.getElementById('pip-collapse-btn')!

let pipDragging = false
let pipDragStartX = 0, pipDragStartY = 0, pipStartLeft = 0, pipStartTop = 0

function pipPointerStart(clientX: number, clientY: number) {
    pipDragging = true
    pipDragStartX = clientX
    pipDragStartY = clientY
    const rect = pipContainer.getBoundingClientRect()
    pipStartLeft = rect.left
    pipStartTop  = rect.top
    pipContainer.style.right  = 'auto'
    pipContainer.style.bottom = 'auto'
    pipContainer.style.left   = `${pipStartLeft}px`
    pipContainer.style.top    = `${pipStartTop}px`
}

function pipPointerMove(clientX: number, clientY: number) {
    if (!pipDragging) return
    pipContainer.style.left = `${Math.max(0, pipStartLeft + clientX - pipDragStartX)}px`
    pipContainer.style.top  = `${Math.max(0, pipStartTop  + clientY - pipDragStartY)}px`
}

pipHandle.addEventListener('mousedown', e => {
    if ((e.target as HTMLElement).closest('#pip-collapse-btn')) return
    pipPointerStart(e.clientX, e.clientY)
    e.preventDefault()
})
document.addEventListener('mousemove', e => pipPointerMove(e.clientX, e.clientY))
document.addEventListener('mouseup',   () => { pipDragging = false })

pipHandle.addEventListener('touchstart', e => {
    if ((e.target as HTMLElement).closest('#pip-collapse-btn')) return
    pipPointerStart(e.touches[0].clientX, e.touches[0].clientY)
    e.preventDefault()
}, { passive: false })
document.addEventListener('touchmove', e => {
    if (pipDragging) pipPointerMove(e.touches[0].clientX, e.touches[0].clientY)
}, { passive: true })
document.addEventListener('touchend', () => { pipDragging = false })

pipCollapseBtn.addEventListener('click', () => {
    const collapsed = pipContainer.classList.toggle('collapsed')
    pipCollapseBtn.textContent = collapsed ? '+' : '−'
})
