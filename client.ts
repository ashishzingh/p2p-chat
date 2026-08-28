const STUN_CONFIG: RTCConfiguration = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
};

const room = location.hash.slice(1) || "lobby";

// ── UI refs ───────────────────────────────────────────────────────────────────

const statusEl    = document.getElementById("status")!;
const messagesEl  = document.getElementById("messages")!;
const msgInput    = document.getElementById("msg")          as HTMLInputElement;
const sendBtn     = document.getElementById("send")         as HTMLButtonElement;
const localVideo  = document.getElementById("local-video")  as HTMLVideoElement;
const remoteVideo = document.getElementById("remote-video") as HTMLVideoElement;
const videoBtn    = document.getElementById("toggle-video") as HTMLButtonElement;

// ── State ─────────────────────────────────────────────────────────────────────

let pc: RTCPeerConnection | null = null;
let channel: RTCDataChannel | null = null;
let localStream: MediaStream | null = null;
let isOfferer = false;
let connected = false;

const pendingCandidates: RTCIceCandidateInit[] = [];
let remoteDescSet = false;

// ── Helpers ───────────────────────────────────────────────────────────────────

function setStatus(text: string) { statusEl.textContent = text; }

function appendMessage(who: string, text: string) {
    const p = document.createElement("p");
    p.textContent = `${who}: ${text}`;
    messagesEl.appendChild(p);
    messagesEl.scrollTop = messagesEl.scrollHeight;
}

function enableChat(on: boolean) {
    msgInput.disabled = !on;
    sendBtn.disabled  = !on;
}

// ── WebSocket (signalling) ────────────────────────────────────────────────────

const proto = location.protocol === "https:" ? "wss" : "ws";
const ws = new WebSocket(`${proto}://${location.host}/signal`);

ws.onopen = () => {
    setStatus(`Joining room "${room}"…`);
    ws.send(JSON.stringify({ type: "join", room }));
};

ws.onclose = () => setStatus("Disconnected from server");

ws.onmessage = async ({ data }) => {
    const msg = JSON.parse(data as string);

    switch (msg.type) {

        case "joined":
            if (msg.peers === 0) {
                setStatus(`In room "${room}" — waiting for someone to join…`);
            } else {
                setStatus("Peer found — connecting…");
                await initPeerConnection(true);
            }
            break;

        case "peer-joined":
            setStatus("Peer joined — setting up connection…");
            await initPeerConnection(false);
            break;

        case "offer":
            await pc!.setRemoteDescription(new RTCSessionDescription(msg));
            remoteDescSet = true;
            await drainCandidates();
            const answer = await pc!.createAnswer();
            await pc!.setLocalDescription(answer);
            ws.send(JSON.stringify(pc!.localDescription));
            break;

        case "answer":
            await pc!.setRemoteDescription(new RTCSessionDescription(msg));
            remoteDescSet = true;
            await drainCandidates();
            break;

        case "candidate":
            if (remoteDescSet) {
                await pc!.addIceCandidate(new RTCIceCandidate(msg.candidate));
            } else {
                pendingCandidates.push(msg.candidate);
            }
            break;

        case "peer-left":
            setStatus("Peer disconnected");
            enableChat(false);
            connected = false;
            remoteVideo.srcObject = null;
            break;
    }
};

// ── WebRTC ────────────────────────────────────────────────────────────────────

async function initPeerConnection(offerer: boolean) {
    isOfferer = offerer;
    pc = new RTCPeerConnection(STUN_CONFIG);

    // Add local video tracks if camera was already started before connecting
    if (localStream) {
        localStream.getTracks().forEach(t => pc!.addTrack(t, localStream!));
    }

    pc.ontrack = ({ streams }) => {
        remoteVideo.srcObject = streams[0];
    };

    pc.onicecandidate = ({ candidate }) => {
        if (candidate) ws.send(JSON.stringify({ type: "candidate", candidate }));
    };

    pc.onconnectionstatechange = () => {
        switch (pc!.connectionState) {
            case "connected":
                connected = true;
                setStatus("Connected!");
                break;
            case "failed":
                setStatus("Connection failed — reload to retry");
                enableChat(false);
                connected = false;
                break;
            case "disconnected":
                setStatus("Peer disconnected");
                enableChat(false);
                connected = false;
                break;
        }
    };

    // Renegotiation — fires when tracks are added after the initial connection.
    // Only the offerer creates new offers to avoid collision.
    pc.onnegotiationneeded = async () => {
        if (!connected || !isOfferer || pc!.signalingState !== "stable") return;
        const offer = await pc!.createOffer();
        await pc!.setLocalDescription(offer);
        ws.send(JSON.stringify(pc!.localDescription));
    };

    if (offerer) {
        channel = pc.createDataChannel("chat", { ordered: true });
        setupChannel(channel);

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        ws.send(JSON.stringify(pc.localDescription));
    } else {
        pc.ondatachannel = ({ channel: ch }) => {
            channel = ch;
            setupChannel(channel);
        };
    }
}

function setupChannel(ch: RTCDataChannel) {
    ch.onopen    = () => { setStatus("Connected! Start typing or enable video."); enableChat(true); };
    ch.onclose   = () => { setStatus("Chat closed"); enableChat(false); };
    ch.onmessage = ({ data }) => appendMessage("Peer", data as string);
}

async function drainCandidates() {
    for (const c of pendingCandidates) {
        await pc!.addIceCandidate(new RTCIceCandidate(c));
    }
    pendingCandidates.length = 0;
}

// ── Video toggle ──────────────────────────────────────────────────────────────

videoBtn.addEventListener("click", async () => {
    if (localStream) {
        localStream.getTracks().forEach(t => t.stop());
        localStream = null;
        localVideo.srcObject = null;
        videoBtn.textContent = "Start Video";
    } else {
        try {
            localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            localVideo.srcObject = localStream;
            videoBtn.textContent = "Stop Video";
            // If already connected, add tracks — offerer's onnegotiationneeded handles the new offer
            if (pc && connected) {
                localStream.getTracks().forEach(t => pc!.addTrack(t, localStream!));
            }
        } catch {
            setStatus("Camera/mic access denied — check browser permissions");
        }
    }
});

// ── Send ──────────────────────────────────────────────────────────────────────

sendBtn.addEventListener("click", () => {
    const text = msgInput.value.trim();
    if (!text || !channel || channel.readyState !== "open") return;
    channel.send(text);
    appendMessage("You", text);
    msgInput.value = "";
});

msgInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendBtn.click();
});
