const STUN_CONFIG: RTCConfiguration = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
};

// Room comes from the URL hash, e.g. http://localhost:8080/#my-room
const room = location.hash.slice(1) || "lobby";

const statusEl   = document.getElementById("status")!;
const messagesEl = document.getElementById("messages")!;
const msgInput   = document.getElementById("msg")    as HTMLInputElement;
const sendBtn    = document.getElementById("send")   as HTMLButtonElement;

let pc: RTCPeerConnection | null = null;
let channel: RTCDataChannel | null = null;

// Candidates that arrive before setRemoteDescription — must be queued
const pendingCandidates: RTCIceCandidateInit[] = [];
let remoteDescSet = false;

// ── UI helpers ────────────────────────────────────────────────────────────────

function setStatus(text: string) {
    statusEl.textContent = text;
}

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
                // We joined second, so WE create the offer
                await initPeerConnection(true);
            }
            break;

        case "peer-joined":
            setStatus("Peer joined — setting up connection…");
            // We were first, so we wait for the offer
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
                // Queue it — remote description not set yet
                pendingCandidates.push(msg.candidate);
            }
            break;

        case "peer-left":
            setStatus("Peer disconnected");
            enableChat(false);
            break;
    }
};

// ── WebRTC ────────────────────────────────────────────────────────────────────

async function initPeerConnection(isOfferer: boolean) {
    pc = new RTCPeerConnection(STUN_CONFIG);

    pc.onicecandidate = ({ candidate }) => {
        if (candidate) {
            ws.send(JSON.stringify({ type: "candidate", candidate }));
        }
    };

    pc.onconnectionstatechange = () => {
        switch (pc!.connectionState) {
            case "connected":
                setStatus("Connected to peer!");
                break;
            case "failed":
                setStatus("Connection failed — reload to retry");
                enableChat(false);
                break;
            case "disconnected":
                setStatus("Peer disconnected");
                enableChat(false);
                break;
        }
    };

    if (isOfferer) {
        // Offerer creates the data channel
        channel = pc.createDataChannel("chat", { ordered: true });
        setupChannel(channel);

        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        ws.send(JSON.stringify(pc.localDescription));
    } else {
        // Answerer receives the data channel
        pc.ondatachannel = ({ channel: ch }) => {
            channel = ch;
            setupChannel(channel);
        };
    }
}

function setupChannel(ch: RTCDataChannel) {
    ch.onopen    = () => { setStatus("Chat ready!"); enableChat(true); };
    ch.onclose   = () => { setStatus("Chat closed"); enableChat(false); };
    ch.onmessage = ({ data }) => appendMessage("Peer", data as string);
}

async function drainCandidates() {
    for (const c of pendingCandidates) {
        await pc!.addIceCandidate(new RTCIceCandidate(c));
    }
    pendingCandidates.length = 0;
}

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
