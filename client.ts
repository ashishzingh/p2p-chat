import { basicSetup } from 'codemirror'
import { EditorView } from '@codemirror/view'
import { EditorState, Compartment } from '@codemirror/state'
import { javascript } from '@codemirror/lang-javascript'
import { java } from '@codemirror/lang-java'
import { cpp } from '@codemirror/lang-cpp'
import { oneDark } from '@codemirror/theme-one-dark'

// ── Constants ─────────────────────────────────────────────────────────────────

const STUN_CONFIG: RTCConfiguration = {
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
}
const MY_COLOR   = '#a78bfa'  // local user strokes
const PEER_COLOR = '#38bdf8'  // remote user strokes

const room = location.hash.slice(1) || 'lobby'

// ── UI refs ───────────────────────────────────────────────────────────────────

const statusDot   = document.getElementById('status-dot')!
const statusText  = document.getElementById('status-text')!
const messagesEl  = document.getElementById('messages')!
const msgInput    = document.getElementById('msg')          as HTMLInputElement
const sendBtn     = document.getElementById('send')         as HTMLButtonElement
const localVideo  = document.getElementById('local-video')  as HTMLVideoElement
const remoteVideo = document.getElementById('remote-video') as HTMLVideoElement
const videoBtn    = document.getElementById('toggle-video') as HTMLButtonElement
const canvas      = document.getElementById('whiteboard')   as HTMLCanvasElement

;(document.getElementById('room-name')!).textContent = room

// ── WebRTC / WS state ─────────────────────────────────────────────────────────

let pc: RTCPeerConnection | null = null
let channel: RTCDataChannel | null = null
let localStream: MediaStream | null = null
let isOfferer = false
let connected = false
const pendingCandidates: RTCIceCandidateInit[] = []
let remoteDescSet = false

// ── Status ────────────────────────────────────────────────────────────────────

function setStatus(text: string, state: 'idle' | 'waiting' | 'connected' | 'error' = 'idle') {
    statusText.textContent = text
    statusDot.className = ({ connected: 'connected', waiting: 'waiting', error: 'error', idle: '' } as const)[state]
}

// ── Chat helpers ──────────────────────────────────────────────────────────────

function appendMessage(who: 'you' | 'peer', text: string) {
    const wrap = document.createElement('div')
    wrap.className = `bubble ${who}`
    const label = document.createElement('div')
    label.className = 'who'
    label.textContent = who === 'you' ? 'You' : 'Peer'
    const body = document.createElement('div')
    body.textContent = text
    wrap.appendChild(label)
    wrap.appendChild(body)
    messagesEl.appendChild(wrap)
    messagesEl.scrollTop = messagesEl.scrollHeight
}

function appendSystem(text: string) {
    const el = document.createElement('div')
    el.className = 'system-msg'
    el.textContent = text
    messagesEl.appendChild(el)
    messagesEl.scrollTop = messagesEl.scrollHeight
}

function enableChat(on: boolean) {
    msgInput.disabled = !on
    sendBtn.disabled  = !on
}

// ── Ping ──────────────────────────────────────────────────────────────────────

function playPing() {
    const ctx  = new AudioContext()
    const osc  = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.connect(gain); gain.connect(ctx.destination)
    osc.type = 'sine'
    osc.frequency.setValueAtTime(620, ctx.currentTime)
    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.08)
    gain.gain.setValueAtTime(0.25, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55)
    osc.start(); osc.stop(ctx.currentTime + 0.55)
}

// ── Data channel multiplexer ──────────────────────────────────────────────────

type DataMsg =
    | { source: 'chat'; text: string }
    | { source: 'code'; content: string; lang: string }
    | { source: 'diagram'; op: 'line'; x1: number; y1: number; x2: number; y2: number }
    | { source: 'diagram'; op: 'clear' }

function sendData(msg: DataMsg) {
    if (channel?.readyState === 'open') {
        channel.send(JSON.stringify(msg))
    }
}

function handleDataMessage(raw: string) {
    const msg: DataMsg = JSON.parse(raw)
    if (msg.source === 'chat')    return appendMessage('peer', msg.text)
    if (msg.source === 'code')    return applyRemoteCode(msg.content, msg.lang)
    if (msg.source === 'diagram') return applyRemoteDiagram(msg)
}

// ── WebSocket ─────────────────────────────────────────────────────────────────

const proto = location.protocol === 'https:' ? 'wss' : 'ws'
let ws: WebSocket
let reconnectDelay = 1000
let heartbeatTimer: ReturnType<typeof setInterval> | null = null

function resetPeerState() {
    if (pc) { pc.close(); pc = null }
    channel = null
    connected = false
    remoteDescSet = false
    pendingCandidates.length = 0
    enableChat(false)
}

function connect() {
    ws = new WebSocket(`${proto}://${location.host}/signal`)

    ws.onopen = () => {
        reconnectDelay = 1000
        setStatus(`Joining room "${room}"…`, 'waiting')
        ws.send(JSON.stringify({ type: 'join', room }))

        // Heartbeat every 25s — keeps Railway's proxy from closing idle connections
        if (heartbeatTimer) clearInterval(heartbeatTimer)
        heartbeatTimer = setInterval(() => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ type: 'ping' }))
            }
        }, 25_000)
    }

    ws.onclose = () => {
        if (heartbeatTimer) { clearInterval(heartbeatTimer); heartbeatTimer = null }
        resetPeerState()
        setStatus(`Reconnecting in ${reconnectDelay / 1000}s…`, 'error')
        setTimeout(() => {
            reconnectDelay = Math.min(reconnectDelay * 2, 16_000)
            connect()
        }, reconnectDelay)
    }

    ws.onmessage = async ({ data }) => {
        const msg = JSON.parse(data as string)
        switch (msg.type) {
            case 'pong': break  // heartbeat reply — ignore
            case 'joined':
                if (msg.peers === 0) {
                    setStatus('Waiting for peer to join…', 'waiting')
                } else {
                    setStatus('Peer found — connecting…', 'waiting')
                    await initPeerConnection(true)
                }
                break
            case 'peer-joined':
                playPing()
                appendSystem('A peer joined the room')
                setStatus('Peer joined — connecting…', 'waiting')
                await initPeerConnection(false)
                break
            case 'offer': {
                await pc!.setRemoteDescription(new RTCSessionDescription(msg))
                remoteDescSet = true
                await drainCandidates()
                const answer = await pc!.createAnswer()
                await pc!.setLocalDescription(answer)
                ws.send(JSON.stringify(pc!.localDescription))
                break
            }
            case 'answer':
                await pc!.setRemoteDescription(new RTCSessionDescription(msg))
                remoteDescSet = true
                await drainCandidates()
                break
            case 'candidate':
                if (remoteDescSet) {
                    await pc!.addIceCandidate(new RTCIceCandidate(msg.candidate))
                } else {
                    pendingCandidates.push(msg.candidate)
                }
                break
            case 'peer-left':
                appendSystem('Peer left the room')
                setStatus('Peer disconnected', 'error')
                enableChat(false)
                connected = false
                remoteVideo.srcObject = null
                break
        }
    }
}

connect()

// ── WebRTC ────────────────────────────────────────────────────────────────────

async function initPeerConnection(offerer: boolean) {
    isOfferer = offerer
    pc = new RTCPeerConnection(STUN_CONFIG)

    if (localStream) {
        localStream.getTracks().forEach(t => pc!.addTrack(t, localStream!))
    }

    pc.ontrack = ({ streams }) => { remoteVideo.srcObject = streams[0] }

    pc.onicecandidate = ({ candidate }) => {
        if (candidate) ws.send(JSON.stringify({ type: 'candidate', candidate }))
    }

    pc.onconnectionstatechange = () => {
        switch (pc!.connectionState) {
            case 'connected':
                connected = true
                setStatus('Connected', 'connected')
                break
            case 'failed':
                setStatus('Connection failed — reload to retry', 'error')
                enableChat(false); connected = false
                break
            case 'disconnected':
                setStatus('Peer disconnected', 'error')
                enableChat(false); connected = false
                break
        }
    }

    // Renegotiation for video added after initial connect
    pc.onnegotiationneeded = async () => {
        if (!connected || !isOfferer || pc!.signalingState !== 'stable') return
        const offer = await pc!.createOffer()
        await pc!.setLocalDescription(offer)
        ws.send(JSON.stringify(pc!.localDescription))
    }

    if (offerer) {
        channel = pc.createDataChannel('main', { ordered: true })
        setupChannel(channel)
        const offer = await pc.createOffer()
        await pc.setLocalDescription(offer)
        ws.send(JSON.stringify(pc.localDescription))
    } else {
        pc.ondatachannel = ({ channel: ch }) => { channel = ch; setupChannel(channel) }
    }
}

function setupChannel(ch: RTCDataChannel) {
    ch.onopen = () => {
        setStatus('Connected', 'connected')
        enableChat(true)
        appendSystem('Chat is ready')
    }
    ch.onclose   = () => { setStatus('Chat closed', 'error'); enableChat(false) }
    ch.onmessage = ({ data }) => handleDataMessage(data as string)
}

async function drainCandidates() {
    for (const c of pendingCandidates) {
        await pc!.addIceCandidate(new RTCIceCandidate(c))
    }
    pendingCandidates.length = 0
}

// ── Video ─────────────────────────────────────────────────────────────────────

videoBtn.addEventListener('click', async () => {
    if (localStream) {
        localStream.getTracks().forEach(t => t.stop())
        localStream = null
        localVideo.srcObject = null
        videoBtn.textContent = '🎥 Start Video'
        videoBtn.classList.remove('active')
    } else {
        try {
            localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            localVideo.srcObject = localStream
            videoBtn.textContent = '⏹ Stop Video'
            videoBtn.classList.add('active')
            if (pc && connected) {
                localStream.getTracks().forEach(t => pc!.addTrack(t, localStream!))
            }
        } catch {
            setStatus('Camera/mic access denied', 'error')
        }
    }
})

// ── Chat send ─────────────────────────────────────────────────────────────────

sendBtn.addEventListener('click', () => {
    const text = msgInput.value.trim()
    if (!text) return
    sendData({ source: 'chat', text })
    appendMessage('you', text)
    msgInput.value = ''
})

msgInput.addEventListener('keydown', e => { if (e.key === 'Enter') sendBtn.click() })

// ── Code editor ───────────────────────────────────────────────────────────────

const langCompartment = new Compartment()
let applyingRemote = false
let currentLang = 'js'
let codeTimer: ReturnType<typeof setTimeout> | null = null

const langExtensions: Record<string, ReturnType<typeof javascript | typeof java | typeof cpp>> = {
    js:   javascript(),
    java: java(),
    c:    cpp(),
    cpp:  cpp(),
}

const editor = new EditorView({
    state: EditorState.create({
        doc: '// Start coding here\n',
        extensions: [
            basicSetup,
            oneDark,
            langCompartment.of(langExtensions['js']),
            EditorView.updateListener.of(update => {
                if (!update.docChanged || applyingRemote) return
                if (codeTimer) clearTimeout(codeTimer)
                codeTimer = setTimeout(() => {
                    sendData({ source: 'code', content: editor.state.doc.toString(), lang: currentLang })
                }, 250)
            }),
            EditorView.theme({
                '&': { height: '100%' },
                '.cm-scroller': { overflow: 'auto' },
            }),
        ]
    }),
    parent: document.getElementById('editor')!
})

document.querySelectorAll<HTMLElement>('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.dataset.lang!
        currentLang = lang
        editor.dispatch({ effects: langCompartment.reconfigure(langExtensions[lang]) })
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'))
        btn.classList.add('active')
        sendData({ source: 'code', content: editor.state.doc.toString(), lang })
    })
})

function applyRemoteCode(content: string, lang: string) {
    applyingRemote = true
    const cursor = Math.min(editor.state.selection.main.head, content.length)
    editor.dispatch({
        changes: { from: 0, to: editor.state.doc.length, insert: content },
        selection: { anchor: cursor }
    })
    if (lang !== currentLang) {
        currentLang = lang
        editor.dispatch({ effects: langCompartment.reconfigure(langExtensions[lang]) })
        document.querySelectorAll<HTMLElement>('.lang-btn').forEach(b => {
            b.classList.toggle('active', b.dataset.lang === lang)
        })
    }
    applyingRemote = false
}

// ── Whiteboard ────────────────────────────────────────────────────────────────

const ctx2d  = canvas.getContext('2d')!
let drawing  = false
let lx = 0, ly = 0
let erasing  = false

function resizeCanvas() {
    const rect = canvas.getBoundingClientRect()
    const dpr  = devicePixelRatio || 1
    // Save image before resize
    const img  = ctx2d.getImageData(0, 0, canvas.width, canvas.height)
    canvas.width  = rect.width  * dpr
    canvas.height = rect.height * dpr
    ctx2d.scale(dpr, dpr)
    ctx2d.putImageData(img, 0, 0)
}

window.addEventListener('resize', resizeCanvas)
// Initial size set after layout renders
setTimeout(resizeCanvas, 50)

function stroke(x1: number, y1: number, x2: number, y2: number, color: string, width = 2.5) {
    ctx2d.beginPath()
    ctx2d.strokeStyle = color
    ctx2d.lineWidth   = width
    ctx2d.lineCap     = 'round'
    ctx2d.lineJoin    = 'round'
    ctx2d.moveTo(x1, y1); ctx2d.lineTo(x2, y2)
    ctx2d.stroke()
}

function erase(x1: number, y1: number, x2: number, y2: number) {
    ctx2d.save()
    ctx2d.globalCompositeOperation = 'destination-out'
    ctx2d.strokeStyle = 'rgba(0,0,0,1)'
    ctx2d.lineWidth   = 20
    ctx2d.lineCap     = 'round'
    ctx2d.beginPath(); ctx2d.moveTo(x1, y1); ctx2d.lineTo(x2, y2)
    ctx2d.stroke()
    ctx2d.restore()
}

function getCanvasPos(e: MouseEvent | Touch) {
    const r = canvas.getBoundingClientRect()
    return { x: e.clientX - r.left, y: e.clientY - r.top }
}

canvas.addEventListener('mousedown', e => {
    drawing = true;
    ({ x: lx, y: ly } = getCanvasPos(e))
})

canvas.addEventListener('mousemove', e => {
    if (!drawing) return
    const { x, y } = getCanvasPos(e)
    if (erasing) {
        erase(lx, ly, x, y)
    } else {
        stroke(lx, ly, x, y, MY_COLOR)
    }
    sendData({ source: 'diagram', op: 'line', x1: lx, y1: ly, x2: x, y2: y })
    lx = x; ly = y
})

canvas.addEventListener('mouseup',    () => { drawing = false })
canvas.addEventListener('mouseleave', () => { drawing = false })

// Touch support
canvas.addEventListener('touchstart', e => {
    e.preventDefault()
    drawing = true
    const pos = getCanvasPos(e.touches[0])
    lx = pos.x; ly = pos.y
}, { passive: false })

canvas.addEventListener('touchmove', e => {
    e.preventDefault()
    if (!drawing) return
    const { x, y } = getCanvasPos(e.touches[0])
    if (erasing) { erase(lx, ly, x, y) } else { stroke(lx, ly, x, y, MY_COLOR) }
    sendData({ source: 'diagram', op: 'line', x1: lx, y1: ly, x2: x, y2: y })
    lx = x; ly = y
}, { passive: false })

canvas.addEventListener('touchend', () => { drawing = false })

function applyRemoteDiagram(msg: DataMsg & { source: 'diagram' }) {
    if (msg.op === 'line') stroke(msg.x1, msg.y1, msg.x2, msg.y2, PEER_COLOR)
    if (msg.op === 'clear') ctx2d.clearRect(0, 0, canvas.width, canvas.height)
}

// Tool buttons
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

document.getElementById('clear-canvas')!.addEventListener('click', () => {
    ctx2d.clearRect(0, 0, canvas.width, canvas.height)
    sendData({ source: 'diagram', op: 'clear' })
})

// ── Tab switching ─────────────────────────────────────────────────────────────

document.querySelectorAll<HTMLElement>('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.dataset.tab!
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'))
        document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'))
        tab.classList.add('active')
        document.getElementById(`tab-${target}`)!.classList.add('active')
        // Resize canvas when whiteboard tab becomes visible
        if (target === 'diagram') setTimeout(resizeCanvas, 10)
    })
})
