package com.p2p;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.ConcurrentWebSocketSessionDecorator;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class SignalingHandler extends TextWebSocketHandler {

    private static final int SEND_TIME_LIMIT_MS = 5_000;
    private static final int SEND_BUFFER_SIZE   = 64 * 1024;

    // room name -> thread-safe sessions in that room
    private final Map<String, Set<WebSocketSession>> rooms = new ConcurrentHashMap<>();
    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        // wrap immediately so all sends are thread-safe
        session.getAttributes().put("safe", wrap(session));
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message)
            throws Exception {

        JsonNode msg = mapper.readTree(message.getPayload());
        String type  = msg.get("type").asText();

        if ("ping".equals(type)) {
            send(session, Map.of("type", "pong"));
            return;
        }

        if ("join".equals(type)) {
            String room = msg.get("room").asText();
            session.getAttributes().put("room", room);

            Set<WebSocketSession> peers =
                rooms.computeIfAbsent(room, k -> ConcurrentHashMap.newKeySet());

            // tell the joiner how many peers were already here (decides who offers)
            send(session, Map.of("type", "joined", "peers", peers.size()));

            // tell everyone already in the room that someone new arrived
            for (WebSocketSession other : peers) {
                send(other, Map.of("type", "peer-joined"));
            }

            peers.add(session);
            return;
        }

        // offer / answer / candidate — forward verbatim to everyone else in the room
        String room = (String) session.getAttributes().get("room");
        for (WebSocketSession other : rooms.getOrDefault(room, Set.of())) {
            if (!other.getId().equals(session.getId()) && other.isOpen()) {
                safe(other).sendMessage(new TextMessage(message.getPayload()));
            }
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status)
            throws Exception {
        String room = (String) session.getAttributes().get("room");
        if (room == null) return;

        Set<WebSocketSession> peers = rooms.getOrDefault(room, Set.of());
        peers.remove(session);

        for (WebSocketSession other : peers) {
            send(other, Map.of("type", "peer-left"));
        }

        if (peers.isEmpty()) rooms.remove(room);
    }

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
