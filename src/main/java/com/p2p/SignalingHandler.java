package com.p2p;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.ConcurrentWebSocketSessionDecorator;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class SignalingHandler extends TextWebSocketHandler {

    @Autowired
    private TurnService turnService;

    private static final int SEND_TIME_LIMIT_MS = 5_000;
    private static final int SEND_BUFFER_SIZE   = 64 * 1024;

    // room name -> set of sessions in that room
    private final Map<String, Set<WebSocketSession>> rooms = new ConcurrentHashMap<>();
    // peerId -> session (for addressed signaling routing)
    private final Map<String, WebSocketSession> peerIdToSession = new ConcurrentHashMap<>();
    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        session.getAttributes().put("safe", wrap(session));
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message)
            throws Exception {

        JsonNode msg  = mapper.readTree(message.getPayload());
        String   type = msg.get("type").asText();

        if ("ping".equals(type)) {
            send(session, Map.of("type", "pong"));
            return;
        }

        if ("join".equals(type)) {
            String room    = msg.get("room").asText();
            String peerId  = UUID.randomUUID().toString();

            session.getAttributes().put("room",   room);
            session.getAttributes().put("peerId", peerId);
            peerIdToSession.put(peerId, session);

            Set<WebSocketSession> roomPeers =
                rooms.computeIfAbsent(room, k -> ConcurrentHashMap.newKeySet());

            // collect IDs of peers already in the room
            List<String> existingIds = new ArrayList<>();
            for (WebSocketSession other : roomPeers) {
                String otherId = (String) other.getAttributes().get("peerId");
                if (otherId != null) existingIds.add(otherId);
            }

            // tell the joiner who is already here (and their own assigned ID)
            Map<String, Object> joined = new LinkedHashMap<>();
            joined.put("type",  "joined");
            joined.put("myId",  peerId);
            joined.put("peers", existingIds);
            try {
                turnService.generateCredentials().ifPresent(turn -> joined.put("turn", turn));
            } catch (Exception ignored) {}
            send(session, joined);

            // tell everyone already in the room that a new peer arrived
            for (WebSocketSession other : roomPeers) {
                send(other, Map.of("type", "peer-joined", "peerId", peerId));
            }

            roomPeers.add(session);
            return;
        }

        // ── Signaling relay (offer / answer / candidate / …) ──────────────────
        String senderPeerId = (String) session.getAttributes().get("peerId");
        String room         = (String) session.getAttributes().get("room");

        // Parse payload into a mutable map so we can inject 'from'
        Map<String, Object> payload =
            mapper.convertValue(msg, new TypeReference<Map<String, Object>>() {});
        if (senderPeerId != null) payload.put("from", senderPeerId);

        JsonNode toNode = msg.get("to");
        if (toNode != null && !toNode.isNull()) {
            // Addressed — route to the specific target peer only
            String toPeerId = toNode.asText();
            WebSocketSession target = peerIdToSession.get(toPeerId);
            if (target != null && target.isOpen()) {
                safe(target).sendMessage(new TextMessage(mapper.writeValueAsString(payload)));
            }
        } else {
            // Broadcast to all other peers in the room
            for (WebSocketSession other : rooms.getOrDefault(room, Set.of())) {
                if (!other.getId().equals(session.getId()) && other.isOpen()) {
                    safe(other).sendMessage(new TextMessage(mapper.writeValueAsString(payload)));
                }
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status)
            throws Exception {
        String room    = (String) session.getAttributes().get("room");
        String peerId  = (String) session.getAttributes().get("peerId");

        if (peerId  != null) peerIdToSession.remove(peerId);
        if (room    == null) return;

        Set<WebSocketSession> roomPeers = rooms.getOrDefault(room, Set.of());
        roomPeers.remove(session);

        // tell remaining peers which peer left (so they can close the right PC)
        Map<String, Object> left = new LinkedHashMap<>();
        left.put("type",   "peer-left");
        left.put("peerId", peerId != null ? peerId : "");
        for (WebSocketSession other : roomPeers) {
            send(other, left);
        }

        if (roomPeers.isEmpty()) rooms.remove(room);
    }

    // ── Boss broadcast ────────────────────────────────────────────────────────

    public void broadcastToRoom(String room, Object message) throws Exception {
        String json = mapper.writeValueAsString(message);
        for (WebSocketSession s : rooms.getOrDefault(room, Set.of())) {
            if (s.isOpen()) safe(s).sendMessage(new TextMessage(json));
        }
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    private void send(WebSocketSession s, Object payload) throws IOException {
        safe(s).sendMessage(new TextMessage(mapper.writeValueAsString(payload)));
    }

    private WebSocketSession safe(WebSocketSession s) {
        return (WebSocketSession) s.getAttributes().getOrDefault("safe", s);
    }

    private ConcurrentWebSocketSessionDecorator wrap(WebSocketSession s) {
        return new ConcurrentWebSocketSessionDecorator(s, SEND_TIME_LIMIT_MS, SEND_BUFFER_SIZE);
    }
}
