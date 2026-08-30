package com.p2p;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/admin")
public class AdminRoomController {

    @Autowired
    private SignalingHandler signalingHandler;

    @Value("${admin.key}")
    private String adminKey;

    record TurnCapRequest(String room, int kbps) {}

    @PostMapping("/turn-cap")
    public ResponseEntity<?> setTurnCap(
            @RequestHeader("X-Admin-Key") String key,
            @RequestBody TurnCapRequest req) {
        if (!adminKey.equals(key)) return ResponseEntity.status(403).build();
        try {
            signalingHandler.broadcastToRoom(req.room(),
                Map.of("type", "boss-cmd", "cmd", "set-bitrate-cap", "kbps", req.kbps()));
            return ResponseEntity.ok(Map.of("ok", true, "room", req.room(), "kbps", req.kbps()));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("error", e.getMessage()));
        }
    }
}
