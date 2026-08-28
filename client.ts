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

const room = location.hash.slice(1) || 'lobby'
;(document.getElementById('room-name') as HTMLElement).textContent = room

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
        nameEl.textContent = who === 'you' ? 'You' : 'Peer'
        el.appendChild(nameEl)
        el.appendChild(document.createTextNode(text))
        messages.appendChild(el)
    }
    messages.scrollTop = messages.scrollHeight
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

clearOutputBtn.addEventListener('click', () => {
    outputText.textContent  = '// Click ▶ Run to execute JavaScript'
    outputBadge.textContent = 'ready'
    outputBadge.className   = 'badge info'
})

runBtn.addEventListener('click', () => {
    const code = editor.state.doc.toString()

    if (currentLang !== 'js') {
        const msg = `⚠️ Browser execution only supports JavaScript.\n\nFor ${currentLang.toUpperCase()}, use:\n• replit.com\n• godbolt.org\n• onlinegdb.com`
        showOutput(msg, false, true)
        sendData({ source: 'code-output', output: msg })
        return
    }

    runBtn.classList.add('running')
    runBtn.textContent = '⏳ Running…'

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
        captured.push(`\nRuntime Error: ${e instanceof Error ? e.message : String(e)}`)
        isError = true
    } finally {
        console.log   = origLog
        console.error = origError
        console.warn  = origWarn
    }

    const output = captured.length > 0 ? captured.join('\n') : '(no output)'
    showOutput(output, isError)
    sendData({ source: 'code-output', output })

    runBtn.classList.remove('running')
    runBtn.textContent = '▶ Run'
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
            toggleBtn.textContent = '🎥 Stop Video'
            toggleBtn.classList.add('active')
            if (pc && pc.connectionState !== 'closed') {
                localStream.getTracks().forEach(t => pc!.addTrack(t, localStream!))
            }
        } catch { appendMessage('system', 'Camera/mic access denied') }
    } else {
        localStream.getTracks().forEach(t => t.stop())
        localStream = null
        localVideo.srcObject = null
        toggleBtn.textContent = '🎥 Start Video'
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
        appendMessage('system', 'Connected to peer')
    }
    ch.onclose   = () => setStatus('Peer disconnected', 'waiting')
    ch.onmessage = e => handleDataMessage(e.data)
}

function createPeerConnection() {
    pc = new RTCPeerConnection(STUN_CONFIG)

    pc.onicecandidate = ({ candidate }) => {
        if (candidate) ws.send(JSON.stringify({ type: 'candidate', candidate }))
    }

    pc.ontrack = e => {
        if (!remoteVideo.srcObject) remoteVideo.srcObject = new MediaStream()
        ;(remoteVideo.srcObject as MediaStream).addTrack(e.track)
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
        resetPeerState()
        setStatus('Reconnecting…', 'error')
        setTimeout(() => {
            reconnectDelay = Math.min(reconnectDelay * 2, 16_000)
            connect()
        }, reconnectDelay)
    }
}

connect()

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
