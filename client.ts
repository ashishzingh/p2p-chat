import { basicSetup } from 'codemirror'
import { EditorView, ViewUpdate, keymap } from '@codemirror/view'
import { EditorState, Compartment } from '@codemirror/state'
import { indentWithTab } from '@codemirror/commands'
import { indentUnit } from '@codemirror/language'
import { javascript } from '@codemirror/lang-javascript'
import { java } from '@codemirror/lang-java'
import { cpp } from '@codemirror/lang-cpp'
import { oneDark } from '@codemirror/theme-one-dark'
import posthog from 'posthog-js'

// ── Analytics ────────────────────────────────────────────────────────────────

const PH_KEY = import.meta.env.VITE_POSTHOG_KEY
if (PH_KEY) posthog.init(PH_KEY, { api_host: 'https://us.i.posthog.com', autocapture: false, persistence: 'memory' })
function track(event: string, props?: Record<string, unknown>) { if (PH_KEY) posthog.capture(event, props) }
function hashRoom(r: string) { let h = 0; for (const c of r) h = (Math.imul(31, h) + c.charCodeAt(0)) | 0; return h.toString(36) }

let joinedAt = 0

// ── Header SVG icons ─────────────────────────────────────────────────────────

const _svg = (paths: string) =>
    `<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`

const SVG = {
    leave:  _svg('<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>'),
    micOn:  _svg('<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/>'),
    micOff: _svg('<path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="1" y1="1" x2="23" y2="23"/>'),
    camOn:  _svg('<path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>'),
    camOff: _svg('<line x1="1" y1="1" x2="23" y2="23"/><path d="M16 16v1a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2m5.66 0H14a2 2 0 0 1 2 2v3.34L23 7v10"/>'),
    chat:   _svg('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>'),
    moon:   _svg('<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>'),
    screen: _svg('<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="22"/>'),
}

// Initialize icon spans once DOM is ready
document.getElementById('leave-icon')!.innerHTML  = SVG.leave
document.getElementById('chat-icon')!.innerHTML   = SVG.chat
document.getElementById('audio-icon')!.innerHTML  = SVG.micOn
document.getElementById('video-icon')!.innerHTML  = SVG.camOff
document.getElementById('theme-icon')!.innerHTML  = SVG.moon
document.getElementById('screen-icon')!.innerHTML = SVG.screen

// ── Constants ────────────────────────────────────────────────────────────────

let rtcConfig: RTCConfiguration = {
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

type Stroke =
    | { type: 'pen';     color: string; erasing: boolean; width: number; points: Point[] }
    | { type: 'line';    color: string; width: number; x1: number; y1: number; x2: number; y2: number }
    | { type: 'rect';    color: string; width: number; filled: boolean; x: number; y: number; w: number; h: number }
    | { type: 'ellipse'; color: string; width: number; filled: boolean; cx: number; cy: number; rx: number; ry: number }
    | { type: 'arrow';   color: string; width: number; x1: number; y1: number; x2: number; y2: number }
    | { type: 'text';    color: string; fontSize: number; x: number; y: number; text: string }

type DataMsg =
    | { source: 'hello'; name: string }
    | { source: 'chat'; text: string }
    | { source: 'code'; content: string; lang: string }
    | { source: 'code-output'; output: string }
    | { source: 'problem'; content: string }
    | { source: 'diagram'; op: 'line'; x1: number; y1: number; x2: number; y2: number; erasing: boolean; width: number }
    | { source: 'diagram'; op: 'stroke-complete'; stroke: Stroke }
    | { source: 'diagram'; op: 'full-sync';       strokes: Stroke[] }
    | { source: 'diagram'; op: 'undo' }
    | { source: 'diagram'; op: 'redo' }
    | { source: 'diagram'; op: 'clear' }
    | { source: 'mic-state'; muted: boolean }
    | { source: 'cam-state'; on: boolean }
    | { source: 'chat-sync'; history: Array<{ who: string; text: string }> }
    | { source: 'timer-sync'; elapsed: number; running: boolean; startedAt: number }

// ── DOM refs ──────────────────────────────────────────────────────────────────

const statusDot  = document.getElementById('status-dot')!
const statusText = document.getElementById('status-text')!
const messages   = document.getElementById('messages')!
const msgInput   = document.getElementById('msg') as HTMLInputElement
const sendBtn    = document.getElementById('send') as HTMLButtonElement
const localLabel = document.getElementById('local-label')!

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
    turnConfigured:  false,   // set from 'joined' message if server sent turn credentials
    turnHost:        '',      // extracted from turn URL for display
    forceRelay:      false,   // iceTransportPolicy: 'relay' — set from server config
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
    // turnConfigured / turnHost are session-level — not reset here
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

    const relayCount = diagState.localCandidates.filter(c => c.type === 'relay').length

    if (ice === 'connected' || ice === 'completed') {
        const t = diagState.pairLocalType
        if (t === 'relay')
            return { text: `⚠️ Relaying via TURN (${diagState.turnHost}).\nDirect P2P failed on this network — symmetric NAT or firewall detected. All traffic is routed through the TURN server. Connection is stable but latency will be higher than direct P2P.`, cls: 'warn' }
        if (t === 'host')
            return { text: `✅ Direct connection on the same local network — optimal.${diagState.turnConfigured ? '\nTURN is on standby but not needed.' : ''}`, cls: 'ok' }
        return { text: `✅ Direct peer-to-peer connection over the internet — optimal.${diagState.turnConfigured ? '\nTURN is on standby but not needed.' : ''}`, cls: 'ok' }
    }

    if (ice === 'failed') {
        if (diagState.forceRelay)
            return { text: `🔴 Force Relay ON — TURN relay failed.\n${diagState.turnHost} did not establish a relay connection. Likely causes:\n1. Free-tier TURN servers often block actual relay — check your plan\n2. UDP port 3478 may be blocked on this network (TCP may still work)\n3. Wrong credentials — verify username/password in /boss panel\n4. TURN server down or overloaded\nTip: turn off Force Relay in /boss to fall back to direct P2P.`, cls: 'error' }
        if (diagState.turnConfigured && relayCount === 0)
            return { text: `🔴 ICE failed — TURN server unreachable.\n${diagState.turnHost} did not respond or rejected credentials.\nCheck: host/username/password in Railway env vars, firewall rules on the TURN server, UDP port 3478 open.`, cls: 'error' }
        if (srflx === 0)
            return { text: '🔴 STUN blocked — UDP to external servers is firewalled.\nICE could not discover a public IP. Ask the other person to:\n1. Switch to mobile hotspot\n2. Disable VPN / corporate proxy\n3. Try a different network\nLong-term fix: configure a TURN server (already supported — enable via admin API).', cls: 'error' }
        return { text: `🔴 Symmetric NAT detected.\nSTUN resolved a public IP but the router assigns a different port per destination — direct P2P failed.${diagState.turnConfigured ? `\nTURN (${diagState.turnHost}) was configured but also failed — check server reachability.` : '\nFix: enable the TURN server via the admin API.'}`, cls: 'error' }
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
    setCount('d-relay-count', counts.relay, diagState.turnConfigured)

    // Relay hint — dynamic based on TURN config
    const relayHint = document.getElementById('d-relay-hint')
    if (relayHint) {
        if (diagState.turnConfigured) {
            const forceTag = diagState.forceRelay ? ' · FORCE RELAY ON' : ''
            if (diagState.pairLocalType === 'relay')
                relayHint.textContent = `Relaying via ${diagState.turnHost} — TURN active${forceTag}`
            else if (counts.relay > 0)
                relayHint.textContent = `TURN (${diagState.turnHost}) ready — ${counts.relay} relay candidate${counts.relay > 1 ? 's' : ''} gathered${forceTag}`
            else if (diagState.iceState === 'failed')
                relayHint.textContent = `TURN relay failed — ${diagState.turnHost} unreachable or credentials rejected${forceTag}`
            else
                relayHint.textContent = `TURN configured (${diagState.turnHost}) — gathering...${forceTag}`
        } else {
            relayHint.textContent = 'No TURN server configured — direct P2P only'
        }
    }

    // TURN health row
    const turnDot = document.getElementById('d-turn-dot')
    const turnVal = document.getElementById('d-turn-val')
    if (turnDot && turnVal) {
        if (!diagState.turnConfigured) {
            turnDot.className = 'health-dot'
            turnVal.textContent = 'Not configured'
        } else if (diagState.pairLocalType === 'relay') {
            turnDot.className = 'health-dot ok'
            turnVal.textContent = `Active — routing via ${diagState.turnHost}`
        } else if (counts.relay > 0) {
            turnDot.className = 'health-dot ok'
            turnVal.textContent = `Standby — ${diagState.turnHost} reachable`
        } else if (diagState.iceState === 'failed') {
            turnDot.className = 'health-dot error'
            turnVal.textContent = `Unreachable — ${diagState.turnHost} did not respond`
        } else {
            turnDot.className = 'health-dot warn'
            turnVal.textContent = `Configured (${diagState.turnHost}) — waiting for ICE`
        }
    }

    // Live stats
    document.getElementById('d-rtt')!.textContent  = diagState.rtt >= 0 ? `${diagState.rtt} ms` : '—'
    document.getElementById('d-sent')!.textContent = diagState.bytesSent > 0 ? fmtBytes(diagState.bytesSent) : '—'
    document.getElementById('d-recv')!.textContent = diagState.bytesReceived > 0 ? fmtBytes(diagState.bytesReceived) : '—'
    document.getElementById('d-gathering')!.textContent = diagState.gatheringState

    const pair = diagState.pairLocalType && diagState.pairRemoteType
        ? `${diagState.pairLocalType} ↔ ${diagState.pairRemoteType}`
        : '—'
    document.getElementById('d-pair')!.textContent = pair

    // TURN server stat row
    const turnServerEl = document.getElementById('d-turn-server')
    if (turnServerEl)
        turnServerEl.textContent = diagState.turnConfigured ? diagState.turnHost : 'None'

    // TURN badge — visible only when active path is relay
    const turnBadge = document.getElementById('turn-badge')!
    turnBadge.style.display = diagState.pairLocalType === 'relay' ? 'flex' : 'none'
}

async function pollStats() {
    // Use the first connected peer's PC for stats (representative sample)
    const activePc = [...peers.values()].find(p =>
        p.pc.iceConnectionState === 'connected' || p.pc.iceConnectionState === 'completed'
    )?.pc ?? peers.values().next().value?.pc
    if (!activePc) { updateDiagnosticsUI(); return }
    try {
        const stats = await activePc.getStats()
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

    const turnLine = diagState.turnConfigured
        ? `TURN server:      ${diagState.turnHost}${
            diagState.pairLocalType === 'relay' ? ' (active — relaying traffic)' :
            counts.relay > 0                    ? ' (standby — reachable)' :
            diagState.iceState === 'failed'     ? ' (relay FAILED — unreachable or wrong credentials)' :
                                                  ' (configured — gathering...)'
          }${diagState.forceRelay ? ' [FORCE RELAY]' : ''}`
        : 'TURN server:      Not configured'

    const lines = [
        '── Interview Room Diagnostic Report ──',
        `Room: ${room || '(not joined)'}`,
        `Time: ${new Date().toLocaleTimeString()}`,
        '',
        `Signaling server: ${diagState.wsConnected ? 'Connected' : 'Disconnected'}`,
        `ICE state:        ${diagState.iceState}`,
        `Data channel:     ${diagState.dcState}`,
        `ICE gathering:    ${diagState.gatheringState}`,
        turnLine,
        '',
        'ICE Candidates gathered (local):',
        `  Host  (local IP):  ${counts.host}${diagState.forceRelay && counts.host === 0 ? '  ← not gathered (force relay mode)' : ''}`,
        `  STUN  (public IP): ${counts.srflx}${diagState.forceRelay && counts.srflx === 0 ? '  ← not gathered (force relay mode)' : counts.srflx === 0 ? '  ← UDP may be blocked' : ''}`,
        `  TURN  (relay):     ${counts.relay}${
            counts.relay === 0 && !diagState.turnConfigured ? '  ← no TURN server configured' :
            counts.relay === 0 && diagState.forceRelay      ? '  ← TURN server unreachable or rejected credentials' :
            counts.relay === 0 && diagState.turnConfigured  ? '  ← TURN server may be unreachable' : ''
        }`,
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

let myName = 'You'

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
        connect()
    }, 260)
})

// ── Initial screen routing ────────────────────────────────────────────────────

const initialHash = location.hash.slice(1).trim()
if (initialHash) {
    showJoinScreen(initialHash)   // direct link with room — skip home screen
} else {
    homeScreen.style.display = 'flex'   // no room yet — show home
}

// ── Theme picker ──────────────────────────────────────────────────────────────

const THEMES = {
    batman:     { icon: '🦇', cls: 'batman' },
    superman:   { icon: '🦸', cls: 'superman' },
    spiderman:  { icon: '🕷️', cls: 'spiderman' },
    nikki:      { icon: '👑', cls: 'nikki' },
    espresso:   { icon: '☕', cls: 'espresso' },
    astroworld: { icon: '🚀', cls: 'astroworld' },
} as const
type ThemeName = keyof typeof THEMES
const THEME_CLASSES = ['light', 'batman', 'superman', 'spiderman', 'nikki', 'espresso', 'astroworld']

const themePickerEl = document.getElementById('theme-picker')!
const themeIconEl   = document.getElementById('theme-icon')!

function applyTheme(name: ThemeName) {
    document.body.classList.remove(...THEME_CLASSES)
    const cls = THEMES[name].cls
    if (cls) document.body.classList.add(cls)
    themeIconEl.innerHTML = SVG.moon
    document.querySelectorAll('.theme-option').forEach(el => {
        const opt = el as HTMLElement
        const isActive = opt.dataset.theme === name
        opt.classList.toggle('active', isActive)
        let check = opt.querySelector('.tcheck') as HTMLElement | null
        if (isActive && !check) {
            check = document.createElement('span')
            check.className = 'tcheck'
            check.textContent = '✓'
            opt.appendChild(check)
        } else if (!isActive && check) {
            check.remove()
        }
    })
    localStorage.setItem('theme', name)
}

const saved = localStorage.getItem('theme') as ThemeName
applyTheme(saved in THEMES ? saved : 'batman')

document.getElementById('theme-picker-btn')!.addEventListener('click', e => {
    themePickerEl.classList.toggle('open')
    e.stopPropagation()
})

document.querySelectorAll('.theme-option').forEach(btn => {
    btn.addEventListener('click', e => {
        applyTheme((btn as HTMLElement).dataset.theme as ThemeName)
        themePickerEl.classList.remove('open')
        e.stopPropagation()
    })
})

document.addEventListener('click', () => themePickerEl.classList.remove('open'))

// ── Status helpers ────────────────────────────────────────────────────────────

function setStatus(text: string, state: 'connected' | 'waiting' | 'error' | '') {
    statusText.textContent = text
    statusDot.className = state
}

// ── Chat ──────────────────────────────────────────────────────────────────────

// who = 'you' | 'system' | <peer display name>
const chatHistory: Array<{ who: string; text: string }> = []

function appendMessage(who: string, text: string) {
    if (who !== 'system') chatHistory.push({ who, text })
    if (who === 'system') {
        const el = document.createElement('div')
        el.className = 'system-msg'
        el.textContent = text
        messages.appendChild(el)
    } else {
        const el = document.createElement('div')
        el.className = `bubble ${who === 'you' ? 'you' : 'peer'}`
        const nameEl = document.createElement('div')
        nameEl.className = 'who'
        nameEl.textContent = who === 'you' ? myName : who
        el.appendChild(nameEl)
        el.appendChild(document.createTextNode(text))
        messages.appendChild(el)
    }
    messages.scrollTop = messages.scrollHeight
    if (!replayingHistory && who !== 'you' && who !== 'system') {
        const drawer = document.getElementById('chat-drawer')
        if (drawer && !drawer.classList.contains('open')) {
            setUnread(unreadCount + 1)
            showToast(who, text)
            playPing()
        }
    }
}

let replayingHistory = false

// ── Unread badge + toast ──────────────────────────────────────────────────────

let unreadCount = 0
const chatNotifEl = document.getElementById('chat-notif')!
const msgToast    = document.getElementById('msg-toast')!
let toastTimer: ReturnType<typeof setTimeout> | null = null

function setUnread(n: number) {
    unreadCount = n
    chatNotifEl.textContent = n > 9 ? '9+' : String(n)
    chatNotifEl.classList.toggle('show', n > 0)
}

function hideToast() {
    msgToast.classList.remove('show')
    if (toastTimer) { clearTimeout(toastTimer); toastTimer = null }
}

function showToast(who: string, text: string) {
    document.getElementById('toast-avatar')!.textContent = who.charAt(0).toUpperCase()
    document.getElementById('toast-who')!.textContent    = who
    document.getElementById('toast-msg')!.textContent    = text.length > 80 ? text.slice(0, 77) + '…' : text
    msgToast.classList.add('show')
    if (toastTimer) clearTimeout(toastTimer)
    toastTimer = setTimeout(hideToast, 4000)
}

msgToast.addEventListener('click', () => { hideToast(); openChatDrawer() })
document.getElementById('toast-close')!.addEventListener('click', e => { e.stopPropagation(); hideToast() })

// ── Interview timer ───────────────────────────────────────────────────────────

let timerElapsed   = 0
let timerRunning   = false
let timerStartedAt = 0
let timerInterval: ReturnType<typeof setInterval> | null = null

function timerTick() {
    const total = timerRunning
        ? timerElapsed + (Date.now() - timerStartedAt)
        : timerElapsed
    const s = Math.floor(total / 1000)
    const m = Math.floor(s / 60)
    document.getElementById('timer-display')!.textContent =
        `${String(m).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}

function applyTimerState(elapsed: number, running: boolean, startedAt: number) {
    timerElapsed   = elapsed
    timerRunning   = running
    timerStartedAt = startedAt
    if (timerInterval) { clearInterval(timerInterval); timerInterval = null }
    if (running) timerInterval = setInterval(timerTick, 500)
    timerTick()
    document.getElementById('timer-toggle-btn')!.textContent = running ? '⏸' : '▶'
    document.getElementById('timer-widget')!.classList.toggle('running', running)
}

function broadcastTimerState() {
    sendData({ source: 'timer-sync', elapsed: timerElapsed, running: timerRunning, startedAt: timerStartedAt })
}

document.getElementById('timer-toggle-btn')!.addEventListener('click', () => {
    const now = Date.now()
    if (timerRunning)
        applyTimerState(timerElapsed + (now - timerStartedAt), false, 0)
    else
        applyTimerState(timerElapsed, true, now)
    broadcastTimerState()
})

document.getElementById('timer-reset-btn')!.addEventListener('click', () => {
    applyTimerState(0, false, 0)
    broadcastTimerState()
})

// ── Copy invite link ──────────────────────────────────────────────────────────

let copyFeedbackTimer: ReturnType<typeof setTimeout> | null = null
document.getElementById('room-chip')!.addEventListener('click', () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
        const chip = document.getElementById('room-chip')!
        chip.classList.add('copied')
        if (copyFeedbackTimer) clearTimeout(copyFeedbackTimer)
        copyFeedbackTimer = setTimeout(() => chip.classList.remove('copied'), 1800)
    })
})

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
const savedCode: Record<string, string> = {}
const langCompartment     = new Compartment()
const indentCompartment   = new Compartment()
const fontSizeCompartment = new Compartment()
let editorFontSize = Math.min(22, Math.max(11, parseInt(localStorage.getItem('editor-font-size') || '14', 10)))
const LANG_META: Record<string, { badge: string; cls: string; label: string }> = {
    js:   { badge: 'JS',  cls: 'js',   label: 'JavaScript' },
    java: { badge: '☕',  cls: 'java', label: 'Java' },
    c:    { badge: 'C',   cls: 'c',    label: 'C' },
    cpp:  { badge: 'C++', cls: 'cpp',  label: 'C++' },
}
let applyingRemote = false
let codeDebounce: ReturnType<typeof setTimeout> | null = null

const langExtensions: Record<string, ReturnType<typeof javascript>> = {
    js:   javascript({ jsx: true, typescript: false }),
    java: java(),
    c:    cpp(),
    cpp:  cpp(),
}
const indentExtensions: Record<string, ReturnType<typeof indentUnit>> = {
    js:   indentUnit.of('  '),
    java: indentUnit.of('    '),
    c:    indentUnit.of('    '),
    cpp:  indentUnit.of('    '),
}

const editor = new EditorView({
    state: EditorState.create({
        doc: DEFAULT_CODE['js'],
        extensions: [
            basicSetup,
            oneDark,
            keymap.of([indentWithTab]),
            langCompartment.of(javascript({ jsx: true })),
            indentCompartment.of(indentUnit.of('  ')),
            fontSizeCompartment.of(EditorView.theme({ '&': { fontSize: editorFontSize + 'px' } })),
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

// ── Font size (local only, never synced) ──────────────────────────────────────
function setFontSize(size: number) {
    editorFontSize = Math.min(22, Math.max(11, size))
    localStorage.setItem('editor-font-size', String(editorFontSize))
    editor.dispatch({ effects: fontSizeCompartment.reconfigure(EditorView.theme({ '&': { fontSize: editorFontSize + 'px' } })) })
    document.getElementById('font-size-label')!.textContent = editorFontSize + 'px'
}
document.getElementById('font-size-label')!.textContent = editorFontSize + 'px'
document.getElementById('font-dec-btn')!.addEventListener('click', () => setFontSize(editorFontSize - 1))
document.getElementById('font-inc-btn')!.addEventListener('click', () => setFontSize(editorFontSize + 1))

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
    savedCode[currentLang] = editor.state.doc.toString()
    currentLang = lang
    const meta = LANG_META[lang]
    if (meta) {
        const badge = document.getElementById('lang-badge')!
        badge.textContent = meta.badge
        badge.className = `lo-badge ${meta.cls}`
        document.getElementById('lang-label')!.textContent = meta.label
    }
    document.querySelectorAll('.lang-option').forEach(b =>
        b.classList.toggle('active', (b as HTMLElement).dataset.lang === lang))
    editor.dispatch({ effects: [
        langCompartment.reconfigure(langExtensions[lang] || javascript()),
        indentCompartment.reconfigure(indentExtensions[lang] || indentUnit.of('  ')),
    ] })
    applyingRemote = true
    editor.dispatch({ changes: { from: 0, to: editor.state.doc.length, insert: savedCode[lang] ?? DEFAULT_CODE[lang] ?? '' } })
    applyingRemote = false
    if (sendToChannel) {
        sendData({ source: 'code', content: editor.state.doc.toString(), lang })
    }
}

const langPickerEl = document.getElementById('lang-picker')!
const langMenuEl   = document.getElementById('lang-menu')!
document.getElementById('lang-picker-btn')!.addEventListener('click', e => {
    const open = langPickerEl.classList.toggle('open')
    if (open) {
        const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
        langMenuEl.style.top  = (rect.bottom + 6) + 'px'
        langMenuEl.style.left = rect.left + 'px'
    }
})
document.querySelectorAll('.lang-option').forEach(btn => {
    btn.addEventListener('click', () => {
        setLang((btn as HTMLElement).dataset.lang!)
        langPickerEl.classList.remove('open')
    })
})
document.addEventListener('click', e => {
    if (!langPickerEl.contains(e.target as Node)) langPickerEl.classList.remove('open')
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

// ── Code copy / download ──────────────────────────────────────────────────────

const CODE_EXT: Record<string, string> = { js: 'js', java: 'java', c: 'c', cpp: 'cpp' }

document.getElementById('copy-code-btn')!.addEventListener('click', () => {
    navigator.clipboard.writeText(editor.state.doc.toString()).then(() => {
        const btn = document.getElementById('copy-code-btn')!
        const orig = btn.textContent!
        btn.textContent = '✓ Copied'
        setTimeout(() => { btn.textContent = orig }, 2000)
    })
})

document.getElementById('download-code-btn')!.addEventListener('click', () => {
    const code = editor.state.doc.toString()
    const ext  = CODE_EXT[currentLang] ?? 'txt'
    const blob = new Blob([code], { type: 'text/plain' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href = url; a.download = `solution.${ext}`; a.click()
    URL.revokeObjectURL(url)
})

// ── Format code ──────────────────────────────────────────────────────────────

async function formatCode(code: string, lang: string): Promise<string> {
    if (lang === 'js') {
        const prettier     = await import('https://esm.sh/prettier@3/standalone' as string)
        const parserBabel  = await import('https://esm.sh/prettier@3/plugins/babel' as string)
        const parserEstree = await import('https://esm.sh/prettier@3/plugins/estree' as string)
        return (prettier as any).format(code, {
            parser: 'babel',
            plugins: [parserBabel, parserEstree],
            printWidth: 100,
            tabWidth: 4,
            semi: true,
            singleQuote: true,
        })
    }

    if (lang === 'java') {
        // bundled locally — esm.sh can't polyfill the require() calls inside this plugin
        const { format }          = await import('prettier/standalone') as any
        const { default: plugin } = await import('prettier-plugin-java') as any
        return await format(code, {
            parser: 'java',
            plugins: [plugin],
            printWidth: 100,
            tabWidth: 4,
        })
    }

    // C and C++ — clang-format bundled locally via the vite-specific entry
    const filename = lang === 'c' ? 'file.c' : 'file.cpp'
    const cf = await import('@wasm-fmt/clang-format/vite') as any
    await cf.default()
    return cf.format(code, filename)
}

document.getElementById('format-btn')!.addEventListener('click', async () => {
    const btn  = document.getElementById('format-btn')!
    track('code_formatted', { lang: currentLang })
    const orig = btn.textContent!
    btn.textContent = '⏳…'
    ;(btn as HTMLButtonElement).disabled = true
    try {
        const code      = editor.state.doc.toString()
        const formatted = await formatCode(code, currentLang)
        const sel = editor.state.selection
        editor.dispatch({
            changes: { from: 0, to: editor.state.doc.length, insert: formatted },
            selection: { anchor: Math.min(sel.main.anchor, formatted.length) },
        })
        sendData({ source: 'code', content: formatted, lang: currentLang })
        btn.textContent = '✓ Done'
        setTimeout(() => { btn.textContent = orig; (btn as HTMLButtonElement).disabled = false }, 1200)
    } catch (e: any) {
        console.error('[format]', e)
        showOutput(`Format failed (${currentLang}): ${e?.message ?? e}`, false, true)
        btn.textContent = '✕ Error'
        setTimeout(() => { btn.textContent = orig; (btn as HTMLButtonElement).disabled = false }, 2500)
    }
})

// ── Layout orientation + resizable output ─────────────────────────────────────

const codeOutputWrap = document.getElementById('code-output-wrap')!
const resizeHandle   = document.getElementById('resize-handle')!
const outputSection  = document.getElementById('output-section') as HTMLElement

let isHorizontal = false

document.getElementById('orient-btn')!.addEventListener('click', () => {
    isHorizontal = !isHorizontal
    codeOutputWrap.classList.toggle('horizontal', isHorizontal)
    const btn = document.getElementById('orient-btn')!
    btn.textContent = isHorizontal ? '↕ Layout' : '⇄ Layout'
})

// Resize handle — works for both vertical (height) and horizontal (width) modes
resizeHandle.addEventListener('mousedown', (e: MouseEvent) => {
    e.preventDefault()
    resizeHandle.classList.add('dragging')
    const startX   = e.clientX
    const startY   = e.clientY
    const startSize = isHorizontal
        ? outputSection.offsetWidth
        : outputSection.offsetHeight

    const onMove = (ev: MouseEvent) => {
        if (isHorizontal) {
            const delta = startX - ev.clientX
            const newW  = Math.max(80, Math.min(startSize + delta, window.innerWidth * 0.7))
            outputSection.style.width  = `${newW}px`
            outputSection.style.height = 'auto'
        } else {
            const delta = startY - ev.clientY
            const newH  = Math.max(60, Math.min(startSize + delta, window.innerHeight * 0.7))
            outputSection.style.height = `${newH}px`
            outputSection.style.width  = 'auto'
        }
    }
    const onUp = () => {
        resizeHandle.classList.remove('dragging')
        window.removeEventListener('mousemove', onMove)
        window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
})

// Touch support for resize
resizeHandle.addEventListener('touchstart', (e: TouchEvent) => {
    e.preventDefault()
    const t0     = e.touches[0]
    const startX = t0.clientX
    const startY = t0.clientY
    const startSize = isHorizontal ? outputSection.offsetWidth : outputSection.offsetHeight

    const onMove = (ev: TouchEvent) => {
        const t = ev.touches[0]
        if (isHorizontal) {
            const newW = Math.max(80, Math.min(startSize + (startX - t.clientX), window.innerWidth * 0.7))
            outputSection.style.width = `${newW}px`
        } else {
            const newH = Math.max(60, Math.min(startSize + (startY - t.clientY), window.innerHeight * 0.7))
            outputSection.style.height = `${newH}px`
        }
    }
    const onEnd = () => {
        resizeHandle.classList.remove('dragging')
        resizeHandle.removeEventListener('touchmove', onMove)
        resizeHandle.removeEventListener('touchend', onEnd)
    }
    resizeHandle.classList.add('dragging')
    resizeHandle.addEventListener('touchmove', onMove, { passive: false })
    resizeHandle.addEventListener('touchend', onEnd)
}, { passive: false })

// ── Disconnect session ────────────────────────────────────────────────────────

document.getElementById('disconnect-btn')!.addEventListener('click', () => {
    if (!confirm('Leave this session? You will be taken back to the home screen.')) return
    if (ws) { try { ws.close() } catch {} }
    resetPeerState()
    // Stop all media tracks
    if (screenStream) stopScreenShare()
    localStream?.getTracks().forEach(t => t.stop())
    localStream = null
    // Navigate back to home
    location.href = '/'
})

// ── Sidebar resize handle ─────────────────────────────────────────────────────

const sidebarResizeHandle = document.getElementById('sidebar-resize-handle')!
const sidebarPanel        = document.getElementById('problem-section')!

sidebarResizeHandle.addEventListener('mousedown', (e: MouseEvent) => {
    e.preventDefault()
    sidebarResizeHandle.classList.add('dragging')
    const startX = e.clientX
    const startW = sidebarPanel.offsetWidth

    const onMove = (ev: MouseEvent) => {
        const newW = Math.max(180, Math.min(startW + (ev.clientX - startX), 480))
        sidebarPanel.style.width = `${newW}px`
    }
    const onUp = () => {
        sidebarResizeHandle.classList.remove('dragging')
        window.removeEventListener('mousemove', onMove)
        window.removeEventListener('mouseup', onUp)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
})

// ── Problem section toggle + live sync ───────────────────────────────────────

const problemSection = document.getElementById('problem-section')!
const problemEditor  = document.getElementById('problem-editor') as HTMLTextAreaElement
const tabCode        = document.getElementById('tab-code')!

function setSidebarCollapsed(collapsed: boolean) {
    problemSection.classList.toggle('collapsed', collapsed)
    tabCode.classList.toggle('sidebar-collapsed', collapsed)
}

document.getElementById('problem-toggle-btn')!.addEventListener('click', (e) => {
    e.stopPropagation()
    setSidebarCollapsed(!problemSection.classList.contains('collapsed'))
})

document.getElementById('sidebar-show-btn')!.addEventListener('click', () => {
    setSidebarCollapsed(false)
})

let problemDebounce: ReturnType<typeof setTimeout> | null = null
let applyingRemoteProblem = false

problemEditor.addEventListener('input', () => {
    if (applyingRemoteProblem) return
    if (problemDebounce) clearTimeout(problemDebounce)
    problemDebounce = setTimeout(() => {
        sendData({ source: 'problem', content: problemEditor.value })
    }, 250)
})

function applyRemoteProblem(content: string) {
    applyingRemoteProblem = true
    const pos = problemEditor.selectionStart
    problemEditor.value = content
    // restore cursor only if the textarea is focused (i.e. the peer is editing locally too)
    try { problemEditor.setSelectionRange(Math.min(pos, content.length), Math.min(pos, content.length)) } catch {}
    applyingRemoteProblem = false
    // expand collapsed problem section so the receiver notices the update
    setSidebarCollapsed(false)
}

runBtn.addEventListener('click', async () => {
    const code = editor.state.doc.toString()
    track('code_run', { lang: currentLang })
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

type DrawTool = 'pen' | 'eraser' | 'line' | 'rect' | 'ellipse' | 'arrow' | 'text'

const canvas  = document.getElementById('whiteboard') as HTMLCanvasElement
const ctx2d   = canvas.getContext('2d')!
const wbWrap  = document.getElementById('whiteboard-wrap') as HTMLDivElement

let currentTool: DrawTool = 'pen'
let strokeWidth  = 2.5
let shapeFilled  = false
let myDrawColor  = MY_COLOR
let drawing      = false
let lx = 0, ly = 0
let shapeStartX  = 0, shapeStartY = 0
let shiftHeld    = false

let strokes: Stroke[]   = []
let undoStack: Stroke[] = []
let currentStroke: Stroke | null = null

document.addEventListener('keydown', e => { if (e.key === 'Shift') shiftHeld = true  })
document.addEventListener('keyup',   e => { if (e.key === 'Shift') shiftHeld = false })

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
    ctx2d.save()
    switch (s.type) {
        case 'pen': {
            if (s.points.length < 2) break
            if (s.erasing) {
                ctx2d.globalCompositeOperation = 'destination-out'
                ctx2d.lineWidth = Math.max(20, s.width * 5)
                ctx2d.strokeStyle = 'rgba(0,0,0,1)'
            } else {
                ctx2d.globalCompositeOperation = 'source-over'
                ctx2d.lineWidth = s.width
                ctx2d.strokeStyle = s.color
            }
            ctx2d.lineCap = 'round'; ctx2d.lineJoin = 'round'
            ctx2d.beginPath()
            ctx2d.moveTo(s.points[0].x, s.points[0].y)
            for (let i = 1; i < s.points.length; i++) ctx2d.lineTo(s.points[i].x, s.points[i].y)
            ctx2d.stroke()
            break
        }
        case 'line': {
            ctx2d.strokeStyle = s.color; ctx2d.lineWidth = s.width; ctx2d.lineCap = 'round'
            ctx2d.beginPath(); ctx2d.moveTo(s.x1, s.y1); ctx2d.lineTo(s.x2, s.y2); ctx2d.stroke()
            break
        }
        case 'rect': {
            ctx2d.strokeStyle = s.color; ctx2d.fillStyle = s.color; ctx2d.lineWidth = s.width
            if (s.filled) ctx2d.fillRect(s.x, s.y, s.w, s.h)
            else          ctx2d.strokeRect(s.x, s.y, s.w, s.h)
            break
        }
        case 'ellipse': {
            ctx2d.strokeStyle = s.color; ctx2d.fillStyle = s.color; ctx2d.lineWidth = s.width
            ctx2d.beginPath()
            ctx2d.ellipse(s.cx, s.cy, Math.max(1, Math.abs(s.rx)), Math.max(1, Math.abs(s.ry)), 0, 0, 2 * Math.PI)
            if (s.filled) ctx2d.fill(); else ctx2d.stroke()
            break
        }
        case 'arrow': {
            const ang  = Math.atan2(s.y2 - s.y1, s.x2 - s.x1)
            const head = Math.max(12, s.width * 5)
            ctx2d.strokeStyle = s.color; ctx2d.fillStyle = s.color
            ctx2d.lineWidth = s.width; ctx2d.lineCap = 'round'
            ctx2d.beginPath(); ctx2d.moveTo(s.x1, s.y1); ctx2d.lineTo(s.x2, s.y2); ctx2d.stroke()
            ctx2d.beginPath()
            ctx2d.moveTo(s.x2, s.y2)
            ctx2d.lineTo(s.x2 - head * Math.cos(ang - Math.PI / 6), s.y2 - head * Math.sin(ang - Math.PI / 6))
            ctx2d.lineTo(s.x2 - head * Math.cos(ang + Math.PI / 6), s.y2 - head * Math.sin(ang + Math.PI / 6))
            ctx2d.closePath(); ctx2d.fill()
            break
        }
        case 'text': {
            ctx2d.fillStyle = s.color
            ctx2d.font = `${s.fontSize}px -apple-system, BlinkMacSystemFont, sans-serif`
            ctx2d.textBaseline = 'top'
            s.text.split('\n').forEach((line, i) => ctx2d.fillText(line, s.x, s.y + i * s.fontSize * 1.3))
            break
        }
    }
    ctx2d.restore()
}

function drawSegment(x1: number, y1: number, x2: number, y2: number, color: string, erase: boolean, width = strokeWidth) {
    ctx2d.save()
    if (erase) {
        ctx2d.globalCompositeOperation = 'destination-out'
        ctx2d.lineWidth = Math.max(20, width * 5)
        ctx2d.strokeStyle = 'rgba(0,0,0,1)'
    } else {
        ctx2d.globalCompositeOperation = 'source-over'
        ctx2d.lineWidth = width
        ctx2d.strokeStyle = color
    }
    ctx2d.lineCap = 'round'; ctx2d.lineJoin = 'round'
    ctx2d.beginPath(); ctx2d.moveTo(x1, y1); ctx2d.lineTo(x2, y2); ctx2d.stroke()
    ctx2d.restore()
}

function getCanvasPos(e: MouseEvent): Point {
    const r = canvas.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top }
}

function snapToAngle(sx: number, sy: number, ex: number, ey: number): Point {
    const angle   = Math.atan2(ey - sy, ex - sx)
    const snapped = Math.round(angle / (Math.PI / 4)) * (Math.PI / 4)
    const dist    = Math.hypot(ex - sx, ey - sy)
    return { x: sx + dist * Math.cos(snapped), y: sy + dist * Math.sin(snapped) }
}

function makeShapeStroke(sx: number, sy: number, ex: number, ey: number): Stroke | null {
    switch (currentTool) {
        case 'line':    return { type: 'line',  color: myDrawColor, width: strokeWidth, x1: sx, y1: sy, x2: ex, y2: ey }
        case 'arrow':   return { type: 'arrow', color: myDrawColor, width: strokeWidth, x1: sx, y1: sy, x2: ex, y2: ey }
        case 'rect':    return { type: 'rect',    color: myDrawColor, width: strokeWidth, filled: shapeFilled,
            x: Math.min(sx, ex), y: Math.min(sy, ey), w: Math.abs(ex - sx), h: Math.abs(ey - sy) }
        case 'ellipse': return { type: 'ellipse', color: myDrawColor, width: strokeWidth, filled: shapeFilled,
            cx: (sx + ex) / 2, cy: (sy + ey) / 2, rx: Math.abs(ex - sx) / 2, ry: Math.abs(ey - sy) / 2 }
        default: return null
    }
}

canvas.addEventListener('mousedown', e => {
    if (currentTool === 'text') return
    drawing = true; undoStack = []
    const pos = getCanvasPos(e)
    shapeStartX = pos.x; shapeStartY = pos.y
    lx = pos.x; ly = pos.y
    if (currentTool === 'pen' || currentTool === 'eraser') {
        currentStroke = { type: 'pen', color: myDrawColor, erasing: currentTool === 'eraser', width: strokeWidth, points: [pos] }
    } else {
        currentStroke = null
    }
})

canvas.addEventListener('mousemove', e => {
    if (!drawing) return
    const { x, y } = getCanvasPos(e)
    if (currentTool === 'pen' || currentTool === 'eraser') {
        const cs = currentStroke as Extract<Stroke, { type: 'pen' }> | null
        if (!cs) return
        cs.points.push({ x, y })
        const erase = currentTool === 'eraser'
        drawSegment(lx, ly, x, y, myDrawColor, erase)
        sendData({ source: 'diagram', op: 'line', x1: lx, y1: ly, x2: x, y2: y, erasing: erase, width: strokeWidth })
    } else {
        const snap = (currentTool === 'line' || currentTool === 'arrow') && shiftHeld
        const end  = snap ? snapToAngle(shapeStartX, shapeStartY, x, y) : { x, y }
        redrawCanvas()
        const preview = makeShapeStroke(shapeStartX, shapeStartY, end.x, end.y)
        if (preview) drawStroke(preview)
    }
    lx = x; ly = y
})

function finishStroke() {
    if (!drawing) return
    drawing = false
    track('whiteboard_stroke', { tool: currentTool })
    if (currentTool === 'pen' || currentTool === 'eraser') {
        if (!currentStroke) return
        strokes.push(currentStroke)
        sendData({ source: 'diagram', op: 'stroke-complete', stroke: currentStroke })
        currentStroke = null
    } else {
        const snap = (currentTool === 'line' || currentTool === 'arrow') && shiftHeld
        const end  = snap ? snapToAngle(shapeStartX, shapeStartY, lx, ly) : { x: lx, y: ly }
        const s    = makeShapeStroke(shapeStartX, shapeStartY, end.x, end.y)
        if (s) {
            strokes.push(s)
            redrawCanvas()
            sendData({ source: 'diagram', op: 'stroke-complete', stroke: s })
        }
    }
}

canvas.addEventListener('mouseup',    finishStroke)
canvas.addEventListener('mouseleave', finishStroke)

// ── Text tool ─────────────────────────────────────────────────────────────────

canvas.addEventListener('click', e => {
    if (currentTool !== 'text') return
    const pos   = getCanvasPos(e)
    const input = document.createElement('textarea')
    input.rows  = 1
    input.style.cssText = [
        `position:absolute`, `left:${pos.x}px`, `top:${pos.y - 2}px`,
        `min-width:80px`, `max-width:${canvas.width - pos.x - 12}px`,
        `background:transparent`, `border:1.5px dashed ${myDrawColor}`, `border-radius:3px`,
        `outline:none`, `color:${myDrawColor}`,
        `font:16px -apple-system,BlinkMacSystemFont,sans-serif`, `line-height:1.3`,
        `resize:none`, `padding:2px 5px`, `z-index:20`, `overflow:hidden`,
    ].join(';')
    wbWrap.appendChild(input)
    input.focus()

    const commit = () => {
        const text = input.value.trim()
        input.remove()
        if (!text) return
        undoStack = []
        const s: Stroke = { type: 'text', color: myDrawColor, fontSize: 16, x: pos.x, y: pos.y, text }
        strokes.push(s); drawStroke(s)
        sendData({ source: 'diagram', op: 'stroke-complete', stroke: s })
    }
    input.addEventListener('keydown', ev => {
        if (ev.key === 'Escape') { input.remove(); return }
        if (ev.key === 'Enter' && !ev.shiftKey) { ev.preventDefault(); commit(); return }
        setTimeout(() => { input.style.height = 'auto'; input.style.height = input.scrollHeight + 'px' }, 0)
    })
    input.addEventListener('blur', commit)
})

// ── Undo / Redo ───────────────────────────────────────────────────────────────

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

// ── Tool selection ────────────────────────────────────────────────────────────

const TOOL_CURSORS: Record<DrawTool, string> = {
    pen: 'crosshair', eraser: 'cell', line: 'crosshair',
    rect: 'crosshair', ellipse: 'crosshair', arrow: 'crosshair', text: 'text',
}

function setActiveTool(tool: DrawTool) {
    currentTool = tool
    canvas.style.cursor = TOOL_CURSORS[tool]
    ;(['pen','eraser','line','rect','ellipse','arrow','text'] as DrawTool[]).forEach(t =>
        document.getElementById(`tool-${t}`)?.classList.toggle('active', t === tool))
}

;(['pen','eraser','line','rect','ellipse','arrow','text'] as DrawTool[]).forEach(t =>
    document.getElementById(`tool-${t}`)?.addEventListener('click', () => setActiveTool(t)))

// Fill toggle
const fillToggleBtn = document.getElementById('tool-fill-toggle')!
fillToggleBtn.addEventListener('click', () => {
    shapeFilled = !shapeFilled
    fillToggleBtn.classList.toggle('active', shapeFilled)
    fillToggleBtn.textContent = shapeFilled ? '◆ Fill' : '◇ Fill'
})

// Width picker
document.querySelectorAll('.width-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        strokeWidth = parseFloat((btn as HTMLElement).dataset.width!)
        document.querySelectorAll('.width-btn').forEach(b => b.classList.remove('active'))
        btn.classList.add('active')
    })
})

// Color swatches
document.querySelectorAll('.swatch').forEach(s => {
    s.addEventListener('click', () => {
        myDrawColor = (s as HTMLElement).dataset.color!
        if (currentTool === 'eraser') setActiveTool('pen')
        document.querySelectorAll('.swatch').forEach(x => x.classList.remove('active'))
        s.classList.add('active')
    })
})

const customColor = document.getElementById('custom-color') as HTMLInputElement
customColor.addEventListener('input', () => {
    myDrawColor = customColor.value
    if (currentTool === 'eraser') setActiveTool('pen')
    document.querySelectorAll('.swatch').forEach(x => x.classList.remove('active'))
})

document.getElementById('clear-canvas')!.addEventListener('click', () => {
    strokes = []; undoStack = []
    ctx2d.clearRect(0, 0, canvas.width, canvas.height)
    sendData({ source: 'diagram', op: 'clear' })
})

document.getElementById('save-canvas-btn')!.addEventListener('click', () => {
    const url = canvas.toDataURL('image/png')
    const a   = document.createElement('a')
    a.href = url; a.download = 'whiteboard.png'; a.click()
})

function applyRemoteDiagram(msg: Extract<DataMsg, { source: 'diagram' }>) {
    switch (msg.op) {
        case 'line':
            drawSegment(msg.x1, msg.y1, msg.x2, msg.y2, PEER_COLOR, msg.erasing, msg.width)
            break
        case 'stroke-complete': {
            const s: Stroke = msg.stroke.type === 'pen'
                ? { ...msg.stroke, color: PEER_COLOR }
                : msg.stroke
            strokes.push(s)
            if (s.type !== 'pen') drawStroke(s)
            break
        }
        case 'undo':
            if (strokes.length > 0) { undoStack.push(strokes.pop()!); redrawCanvas() }
            break
        case 'redo':
            if (undoStack.length > 0) { strokes.push(undoStack.pop()!); redrawCanvas() }
            break
        case 'full-sync':
            strokes = msg.strokes
            undoStack = []
            redrawCanvas()
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

let localStream:  MediaStream | null = null
let screenStream: MediaStream | null = null
let micMuted = false
const localVideo     = document.getElementById('local-video') as HTMLVideoElement
const toggleVideoBtn = document.getElementById('toggle-video') as HTMLButtonElement
const toggleAudioBtn = document.getElementById('toggle-audio') as HTMLButtonElement
const toggleScreenBtn = document.getElementById('toggle-screen') as HTMLButtonElement
const pipCamBtn  = document.getElementById('pip-cam-btn') as HTMLButtonElement
const pipMicBtn  = document.getElementById('pip-mic-btn') as HTMLButtonElement

function setCamOn(on: boolean) {
    document.getElementById('video-icon')!.innerHTML = on ? SVG.camOn : SVG.camOff
    toggleVideoBtn.classList.toggle('active', on)
    pipCamBtn.textContent = on ? '📹' : '📷'
    pipCamBtn.classList.toggle('off', !on)
    document.getElementById('pip-local')!.classList.toggle('cam-on', on)
    const micEnabled = on
    toggleAudioBtn.disabled = !micEnabled
    pipMicBtn.disabled = !micEnabled
}

function setMicMuted(muted: boolean) {
    micMuted = muted
    document.getElementById('audio-icon')!.innerHTML = muted ? SVG.micOff : SVG.micOn
    document.getElementById('audio-label')!.textContent = muted ? 'Unmute' : 'Mute'
    toggleAudioBtn.classList.toggle('active', muted)
    pipMicBtn.textContent = muted ? '🔇' : '🎤'
    pipMicBtn.classList.toggle('off', muted)
}

async function toggleCamera() {
    if (!localStream) {
        try {
            localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            localVideo.srcObject = localStream
            setCamOn(true)
            setMicMuted(false)
            track('camera_toggled', { on: true })
            sendData({ source: 'cam-state', on: true })
            for (const { pc } of peers.values()) {
                if (pc.connectionState === 'closed') continue
                for (const track of localStream.getTracks()) {
                    // Re-enable path: reuse existing sender to avoid duplicate senders accumulating
                    const existing = pc.getSenders().find(s => s.track?.kind === track.kind)
                    if (existing) await existing.replaceTrack(track)
                    else pc.addTrack(track, localStream!)
                }
            }
        } catch { appendMessage('system', 'Camera/mic access denied') }
    } else {
        if (screenStream) stopScreenShare()
        localStream.getTracks().forEach(t => t.stop())
        localStream = null
        localVideo.srcObject = null
        setCamOn(false)
        sendData({ source: 'cam-state', on: false })
        track('camera_toggled', { on: false })
    }
}

function toggleMic() {
    if (!localStream) return
    const enabled = localStream.getAudioTracks().some(t => t.enabled)
    localStream.getAudioTracks().forEach(t => { t.enabled = !enabled })
    setMicMuted(enabled) // if was enabled, now muted
    sendData({ source: 'mic-state', muted: enabled })
    track('mic_toggled', { muted: enabled })
}

async function toggleScreen() {
    if (screenStream) { stopScreenShare(); return }
    try {
        screenStream = await navigator.mediaDevices.getDisplayMedia({ video: { frameRate: 15, width: { ideal: 1920 } } })
        const screenTrack = screenStream.getVideoTracks()[0]
        screenTrack.contentHint = 'detail'

        for (const { pc } of peers.values()) {
            if (pc.connectionState === 'closed') continue
            const sender = pc.getSenders().find(s => s.track?.kind === 'video')
            if (sender) await sender.replaceTrack(screenTrack)
            else pc.addTrack(screenTrack, screenStream!)
        }

        localVideo.srcObject = screenStream
        document.getElementById('pip-local')!.classList.add('cam-on')
        toggleScreenBtn.classList.add('active')
        toggleVideoBtn.disabled = true

        appendMessage('system', `${myName} started screen sharing`)
        track('screen_share_started', {})

        screenTrack.onended = () => stopScreenShare()
    } catch {
        screenStream = null
    }
}

function stopScreenShare() {
    if (!screenStream) return
    screenStream.getTracks().forEach(t => t.stop())
    screenStream = null

    for (const { pc } of peers.values()) {
        if (pc.connectionState === 'closed') continue
        const sender = pc.getSenders().find(s => s.track?.kind === 'video')
        if (!sender) continue
        sender.replaceTrack(localStream?.getVideoTracks()[0] ?? null)
    }

    localVideo.srcObject = localStream ?? null
    if (!localStream) document.getElementById('pip-local')!.classList.remove('cam-on')
    toggleScreenBtn.classList.remove('active')
    toggleVideoBtn.disabled = false

    appendMessage('system', `${myName} stopped screen sharing`)
    track('screen_share_stopped', {})
}

toggleVideoBtn.addEventListener('click', toggleCamera)
toggleAudioBtn.addEventListener('click', toggleMic)
toggleScreenBtn.addEventListener('click', toggleScreen)
pipCamBtn.addEventListener('click', toggleCamera)
pipMicBtn.addEventListener('click', toggleMic)

// ── WebRTC — full-mesh multi-peer ─────────────────────────────────────────────

interface PeerState {
    pc:         RTCPeerConnection
    dc:         RTCDataChannel | null
    name:       string
    pending:    RTCIceCandidateInit[]
    tileEl:     HTMLDivElement
    videoEl:    HTMLVideoElement
    isExisting: boolean   // true when we were already in the room when this peer joined
}

const peers = new Map<string, PeerState>()
let myId = ''   // assigned by server on join

const STUN_ONLY: RTCConfiguration = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
    ],
}

// ── Send to all open data channels ───────────────────────────────────────────

function sendData(msg: DataMsg) {
    const payload = JSON.stringify(msg)
    for (const { dc } of peers.values()) {
        if (dc?.readyState === 'open') dc.send(payload)
    }
}

// ── Per-peer data channel setup ───────────────────────────────────────────────

function handleDataMessage(raw: string, peerId: string) {
    const msg   = JSON.parse(raw) as DataMsg
    const state = peers.get(peerId)

    if (msg.source === 'hello') {
        if (state) {
            state.name = msg.name
            const nameBar = document.getElementById(`pip-name-${peerId}`)
            if (nameBar) nameBar.textContent = msg.name
            const avatar  = document.getElementById(`pip-avatar-${peerId}`)
            if (avatar)  avatar.textContent  = msg.name[0].toUpperCase()
        }
        return
    }
    if (msg.source === 'chat')        return appendMessage(state?.name ?? 'Peer', msg.text)
    if (msg.source === 'code')        return applyRemoteCode(msg.content, msg.lang)
    if (msg.source === 'code-output') return showOutput(msg.output, msg.output.startsWith('ERROR'), msg.output.startsWith('⚠️'))
    if (msg.source === 'diagram')     return applyRemoteDiagram(msg)
    if (msg.source === 'problem')     return applyRemoteProblem(msg.content)
    if (msg.source === 'mic-state') {
        document.getElementById(`pip-tile-${peerId}`)?.classList.toggle('peer-muted', msg.muted)
        return
    }
    if (msg.source === 'cam-state') {
        document.getElementById(`pip-tile-${peerId}`)?.classList.toggle('cam-on', msg.on)
        return
    }
    if (msg.source === 'chat-sync') {
        replayingHistory = true
        msg.history.forEach(m => appendMessage(m.who, m.text))
        replayingHistory = false
        return
    }
    if (msg.source === 'timer-sync') {
        applyTimerState(msg.elapsed, msg.running, msg.startedAt)
        return
    }
}

function setupDataChannel(ch: RTCDataChannel, peerId: string) {
    const state = peers.get(peerId)
    if (state) state.dc = ch

    ch.onopen = () => {
        msgInput.disabled = false
        sendBtn.disabled  = false
        setStatus('Connected', 'connected')
        ch.send(JSON.stringify({ source: 'hello', name: myName }))
        ch.send(JSON.stringify({ source: 'mic-state', muted: micMuted }))
        ch.send(JSON.stringify({ source: 'cam-state', on: !!localStream }))
        if (state?.isExisting) {
            // Sync current room state to the newly joined peer
            ch.send(JSON.stringify({ source: 'code', content: editor.state.doc.toString(), lang: currentLang }))
            if (problemEditor.value) ch.send(JSON.stringify({ source: 'problem', content: problemEditor.value }))
            if (strokes.length > 0) ch.send(JSON.stringify({ source: 'diagram', op: 'full-sync', strokes }))
            if (chatHistory.length > 0) ch.send(JSON.stringify({ source: 'chat-sync', history: chatHistory }))
            ch.send(JSON.stringify({ source: 'timer-sync', elapsed: timerElapsed, running: timerRunning, startedAt: timerStartedAt }))
        }
        appendMessage('system', `${state?.name || 'Peer'} connected`)
        diagState.dcState = 'open'
        updateDiagnosticsUI()
        startStatsPolling()
    }
    ch.onclose = () => {
        const anyOpen = [...peers.values()].some(p => p.dc?.readyState === 'open')
        if (!anyOpen) {
            diagState.dcState = 'closed'
            stopStatsPolling()
            updateDiagnosticsUI()
        }
    }
    ch.onmessage = e => handleDataMessage(e.data, peerId)
}

// ── Create a pip video tile for a remote peer ─────────────────────────────────

function createPeerTile(peerId: string): { tileEl: HTMLDivElement; videoEl: HTMLVideoElement } {
    const tileEl  = document.createElement('div')
    tileEl.className = 'pip-tile'
    tileEl.id = `pip-tile-${peerId}`

    const videoEl = document.createElement('video')
    videoEl.autoplay   = true
    videoEl.playsInline = true
    tileEl.appendChild(videoEl)

    const noCam   = document.createElement('div')
    noCam.className = 'pip-no-cam'
    const avatar  = document.createElement('div')
    avatar.className = 'pip-avatar'
    avatar.id = `pip-avatar-${peerId}`
    avatar.textContent = 'P'
    noCam.appendChild(avatar)
    tileEl.appendChild(noCam)

    const muteBadge = document.createElement('div')
    muteBadge.className = 'pip-mute-badge'
    muteBadge.textContent = '🔇'
    tileEl.appendChild(muteBadge)

    const nameBar = document.createElement('div')
    nameBar.className = 'pip-name-bar'
    nameBar.id = `pip-name-${peerId}`
    nameBar.textContent = 'Peer'
    tileEl.appendChild(nameBar)

    document.getElementById('pip-tiles')!.appendChild(tileEl)
    return { tileEl, videoEl }
}

// ── Connect to one peer ───────────────────────────────────────────────────────

function connectToPeer(peerId: string, isExisting = false) {
    if (peers.has(peerId)) return

    let pc: RTCPeerConnection
    try {
        pc = new RTCPeerConnection(rtcConfig)
    } catch {
        console.warn('RTCPeerConnection failed with TURN config, retrying STUN-only')
        rtcConfig = STUN_ONLY
        diagState.turnConfigured = false
        pc = new RTCPeerConnection(STUN_ONLY)
    }

    const { tileEl, videoEl } = createPeerTile(peerId)
    const state: PeerState = { pc, dc: null, name: 'Peer', pending: [], tileEl, videoEl, isExisting }
    peers.set(peerId, state)

    pc.onicecandidate = ({ candidate }) => {
        if (candidate) {
            ws.send(JSON.stringify({ type: 'candidate', to: peerId, candidate }))
            // Aggregate candidates across all peers into diagState for display
            diagState.localCandidates.push({ type: candidate.type ?? 'unknown', protocol: candidate.protocol ?? 'unknown' })
            updateDiagnosticsUI()
        }
    }

    pc.oniceconnectionstatechange = () => {
        // Reflect the best ICE state across all peers
        const states = [...peers.values()].map(p => p.pc.iceConnectionState)
        const best =
            states.includes('connected') || states.includes('completed') ? 'connected' :
            states.includes('checking')     ? 'checking'     :
            states.includes('disconnected') ? 'disconnected' :
            states.includes('failed')       ? 'failed'       : 'new'
        diagState.iceState = best
        if (best === 'checking' && !diagState.iceCheckingStart) diagState.iceCheckingStart = Date.now()
        if (best !== 'checking') diagState.iceCheckingStart = 0
        if (best === 'connected' || best === 'completed') {
            if (diagState.iceState !== 'connected' && diagState.iceState !== 'completed')
                track('peer_connected', { path: diagState.pairLocalType || 'unknown', force_relay: diagState.forceRelay })
            startStatsPolling()
            pollStats() // immediate update — don't wait for the 2s timer
        } else {
            // Clear stale path info so display reflects the actual transitioning state
            diagState.pairLocalType  = ''
            diagState.pairRemoteType = ''
        }
        if (best === 'failed') {
            if (diagState.forceRelay)
                setStatus('TURN relay failed — check server credentials', 'error')
            else
                setStatus('Connection failed — check Network tab', 'error')
        }
        updateDiagnosticsUI()
    }

    pc.onicegatheringchange = () => {
        // New gathering round — clear stale candidates so display reflects fresh state
        if (pc.iceGatheringState === 'gathering') diagState.localCandidates = []
        diagState.gatheringState = pc.iceGatheringState
        updateDiagnosticsUI()
    }

    pc.ontrack = e => {
        if (!videoEl.srcObject) videoEl.srcObject = new MediaStream()
        ;(videoEl.srcObject as MediaStream).addTrack(e.track)
        tileEl.classList.add('cam-on')
    }

    pc.ondatachannel = e => setupDataChannel(e.channel, peerId)

    pc.onconnectionstatechange = () => {
        if (pc.connectionState === 'disconnected' || pc.connectionState === 'failed') {
            appendMessage('system', `${state.name || 'Peer'} lost connection`)
        }
    }

    if (localStream) localStream.getTracks().forEach(t => pc.addTrack(t, localStream!))
    if (screenStream) {
        const screenTrack = screenStream.getVideoTracks()[0]
        const videoSender = pc.getSenders().find(s => s.track?.kind === 'video')
        if (videoSender) videoSender.replaceTrack(screenTrack)
        else pc.addTrack(screenTrack, screenStream!)
    }

    // Smaller ID initiates the offer — no coin-flip or negotiation needed
    if (myId < peerId) {
        const ch = pc.createDataChannel('main')
        setupDataChannel(ch, peerId)
        pc.onnegotiationneeded = async () => {
            try {
                await pc.setLocalDescription()
                ws.send(JSON.stringify({ type: 'offer', to: peerId, sdp: pc.localDescription }))
            } catch (e) { console.warn('offer failed', e) }
        }
    }
}

// ── Remove one peer (they left or disconnected) ───────────────────────────────

function removePeer(peerId: string) {
    const state = peers.get(peerId)
    if (!state) return
    try { state.pc.close() } catch {}
    state.tileEl.remove()
    peers.delete(peerId)

    if (peers.size === 0) {
        msgInput.disabled = true
        sendBtn.disabled  = true
        setStatus('Waiting for peer…', 'waiting')
        stopStatsPolling()
        resetDiagState()
    }
}

// ── Tear down all peers (disconnect / WS close) ───────────────────────────────

function resetPeerState() {
    for (const peerId of [...peers.keys()]) removePeer(peerId)
    peers.clear()
    msgInput.disabled = true
    sendBtn.disabled  = true
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
            myId = msg.myId as string
            joinedAt = Date.now()
            track('room_joined', { room: hashRoom(room), peers_present: (msg.peers as string[]).length, turn: !!msg.turn })
            if (msg.turn?.urls) {
                const hostMatch = (msg.turn.urls[0] as string).match(/turn:([^:?/]+)/)
                diagState.turnConfigured = true
                diagState.turnHost       = hostMatch ? hostMatch[1] : 'configured'
                diagState.forceRelay     = !!msg.turn.forceRelay
                rtcConfig = {
                    iceTransportPolicy: msg.turn.forceRelay ? 'relay' : 'all',
                    iceServers: [
                        { urls: 'stun:stun.l.google.com:19302' },
                        { urls: 'stun:stun1.l.google.com:19302' },
                        { urls: msg.turn.urls, username: msg.turn.username, credential: msg.turn.credential },
                    ],
                }
                updateDiagnosticsUI()
            }
            // Connect to every peer already in the room
            for (const peerId of (msg.peers as string[])) {
                connectToPeer(peerId)
            }
            return
        }

        if (msg.type === 'peer-joined') {
            playPing()
            appendMessage('system', 'Someone joined the room')
            connectToPeer(msg.peerId as string, true)
            return
        }

        if (msg.type === 'peer-left') {
            const state = peers.get(msg.peerId as string)
            appendMessage('system', `${state?.name || 'Peer'} left the room`)
            track('peer_left', { session_s: joinedAt ? Math.round((Date.now() - joinedAt) / 1000) : 0 })
            removePeer(msg.peerId as string)
            return
        }

        if (msg.type === 'offer') {
            const fromId = msg.from as string
            // Ensure we have a PeerState (edge case: peer joined just before us)
            if (!peers.has(fromId)) connectToPeer(fromId)
            const state = peers.get(fromId)!
            await state.pc.setRemoteDescription(new RTCSessionDescription(msg.sdp))
            state.pending.splice(0).forEach(c => state.pc.addIceCandidate(new RTCIceCandidate(c)).catch(() => {}))
            const answer = await state.pc.createAnswer()
            await state.pc.setLocalDescription(answer)
            ws.send(JSON.stringify({ type: 'answer', to: fromId, sdp: state.pc.localDescription }))
            return
        }

        if (msg.type === 'answer') {
            const state = peers.get(msg.from as string)
            if (state?.pc.signalingState === 'have-local-offer') {
                await state.pc.setRemoteDescription(new RTCSessionDescription(msg.sdp))
                state.pending.splice(0).forEach(c => state.pc.addIceCandidate(new RTCIceCandidate(c)).catch(() => {}))
            }
            return
        }

        if (msg.type === 'candidate') {
            const state = peers.get(msg.from as string)
            if (!state) return
            if (state.pc.remoteDescription) {
                state.pc.addIceCandidate(new RTCIceCandidate(msg.candidate)).catch(() => {})
            } else {
                state.pending.push(msg.candidate)
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
    if (!text) return
    const anyOpen = [...peers.values()].some(p => p.dc?.readyState === 'open')
    if (!anyOpen) return
    sendData({ source: 'chat', text })
    appendMessage('you', text)
    msgInput.value = ''
    track('chat_sent')
}

sendBtn.addEventListener('click', sendChatMessage)
msgInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendChatMessage() })

// ── Chat drawer ───────────────────────────────────────────────────────────────

const chatDrawer   = document.getElementById('chat-drawer')!
const chatBackdrop = document.getElementById('chat-backdrop')!

function openChatDrawer() {
    chatDrawer.classList.add('open')
    chatBackdrop.classList.add('visible')
    setUnread(0)
    hideToast()
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
