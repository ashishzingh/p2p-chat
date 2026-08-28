"use strict";
const STUN_CONFIG = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
};
const room = location.hash.slice(1) || "lobby";
// ── UI refs ───────────────────────────────────────────────────────────────────
const statusDot = document.getElementById("status-dot");
const statusText = document.getElementById("status-text");
const messagesEl = document.getElementById("messages");
const msgInput = document.getElementById("msg");
const sendBtn = document.getElementById("send");
const localVideo = document.getElementById("local-video");
const remoteVideo = document.getElementById("remote-video");
const videoBtn = document.getElementById("toggle-video");
(document.getElementById("room-name")).textContent = room;
// ── State ─────────────────────────────────────────────────────────────────────
let pc = null;
let channel = null;
let localStream = null;
let isOfferer = false;
let connected = false;
const pendingCandidates = [];
let remoteDescSet = false;
// ── UI helpers ────────────────────────────────────────────────────────────────
function setStatus(text, state = "idle") {
    statusText.textContent = text;
    statusDot.className = state === "connected" ? "connected"
        : state === "waiting" ? "waiting"
            : state === "error" ? "error"
                : "";
}
function appendMessage(who, text) {
    const wrap = document.createElement("div");
    wrap.className = `bubble ${who}`;
    const label = document.createElement("div");
    label.className = "who";
    label.textContent = who === "you" ? "You" : "Peer";
    const body = document.createElement("div");
    body.textContent = text;
    wrap.appendChild(label);
    wrap.appendChild(body);
    messagesEl.appendChild(wrap);
    messagesEl.scrollTop = messagesEl.scrollHeight;
}
function appendSystem(text) {
    const el = document.createElement("div");
    el.className = "system-msg";
    el.textContent = text;
    messagesEl.appendChild(el);
    messagesEl.scrollTop = messagesEl.scrollHeight;
}
function enableChat(on) {
    msgInput.disabled = !on;
    sendBtn.disabled = !on;
}
// ── Ping sound (Web Audio API — no file needed) ───────────────────────────────
function playPing() {
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(620, ctx.currentTime);
    osc.frequency.setValueAtTime(880, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.25, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.55);
}
// ── WebSocket (signalling) ────────────────────────────────────────────────────
const proto = location.protocol === "https:" ? "wss" : "ws";
const ws = new WebSocket(`${proto}://${location.host}/signal`);
ws.onopen = () => {
    setStatus(`Joining room "${room}"…`, "waiting");
    ws.send(JSON.stringify({ type: "join", room }));
};
ws.onclose = () => setStatus("Disconnected from server", "error");
ws.onmessage = async ({ data }) => {
    const msg = JSON.parse(data);
    switch (msg.type) {
        case "joined":
            if (msg.peers === 0) {
                setStatus("Waiting for peer to join…", "waiting");
            }
            else {
                setStatus("Peer found — connecting…", "waiting");
                await initPeerConnection(true);
            }
            break;
        case "peer-joined":
            playPing();
            appendSystem("A peer joined the room");
            setStatus("Peer joined — connecting…", "waiting");
            await initPeerConnection(false);
            break;
        case "offer":
            await pc.setRemoteDescription(new RTCSessionDescription(msg));
            remoteDescSet = true;
            await drainCandidates();
            const answer = await pc.createAnswer();
            await pc.setLocalDescription(answer);
            ws.send(JSON.stringify(pc.localDescription));
            break;
        case "answer":
            await pc.setRemoteDescription(new RTCSessionDescription(msg));
            remoteDescSet = true;
            await drainCandidates();
            break;
        case "candidate":
            if (remoteDescSet) {
                await pc.addIceCandidate(new RTCIceCandidate(msg.candidate));
            }
            else {
                pendingCandidates.push(msg.candidate);
            }
            break;
        case "peer-left":
            appendSystem("Peer left the room");
            setStatus("Peer disconnected", "error");
            enableChat(false);
            connected = false;
            remoteVideo.srcObject = null;
            break;
    }
};
// ── WebRTC ────────────────────────────────────────────────────────────────────
async function initPeerConnection(offerer) {
    isOfferer = offerer;
    pc = new RTCPeerConnection(STUN_CONFIG);
    if (localStream) {
        localStream.getTracks().forEach(t => pc.addTrack(t, localStream));
    }
    pc.ontrack = ({ streams }) => { remoteVideo.srcObject = streams[0]; };
    pc.onicecandidate = ({ candidate }) => {
        if (candidate)
            ws.send(JSON.stringify({ type: "candidate", candidate }));
    };
    pc.onconnectionstatechange = () => {
        switch (pc.connectionState) {
            case "connected":
                connected = true;
                setStatus("Connected", "connected");
                break;
            case "failed":
                setStatus("Connection failed — reload to retry", "error");
                enableChat(false);
                connected = false;
                break;
            case "disconnected":
                setStatus("Peer disconnected", "error");
                enableChat(false);
                connected = false;
                break;
        }
    };
    pc.onnegotiationneeded = async () => {
        if (!connected || !isOfferer || pc.signalingState !== "stable")
            return;
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        ws.send(JSON.stringify(pc.localDescription));
    };
    if (offerer) {
        channel = pc.createDataChannel("chat", { ordered: true });
        setupChannel(channel);
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        ws.send(JSON.stringify(pc.localDescription));
    }
    else {
        pc.ondatachannel = ({ channel: ch }) => { channel = ch; setupChannel(channel); };
    }
}
function setupChannel(ch) {
    ch.onopen = () => { setStatus("Connected", "connected"); enableChat(true); appendSystem("Chat is ready"); };
    ch.onclose = () => { setStatus("Chat closed", "error"); enableChat(false); };
    ch.onmessage = ({ data }) => appendMessage("peer", data);
}
async function drainCandidates() {
    for (const c of pendingCandidates) {
        await pc.addIceCandidate(new RTCIceCandidate(c));
    }
    pendingCandidates.length = 0;
}
// ── Video toggle ──────────────────────────────────────────────────────────────
videoBtn.addEventListener("click", async () => {
    if (localStream) {
        localStream.getTracks().forEach(t => t.stop());
        localStream = null;
        localVideo.srcObject = null;
        videoBtn.textContent = "🎥 Start Video";
        videoBtn.classList.remove("active");
    }
    else {
        try {
            localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            localVideo.srcObject = localStream;
            videoBtn.textContent = "⏹ Stop Video";
            videoBtn.classList.add("active");
            if (pc && connected) {
                localStream.getTracks().forEach(t => pc.addTrack(t, localStream));
            }
        }
        catch {
            setStatus("Camera/mic access denied — check browser permissions", "error");
        }
    }
});
// ── Send ──────────────────────────────────────────────────────────────────────
sendBtn.addEventListener("click", () => {
    const text = msgInput.value.trim();
    if (!text || !channel || channel.readyState !== "open")
        return;
    channel.send(text);
    appendMessage("you", text);
    msgInput.value = "";
});
msgInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter")
        sendBtn.click();
});
