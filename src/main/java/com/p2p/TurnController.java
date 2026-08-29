package com.p2p;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/admin/turn")
public class TurnController {

    @Autowired
    private TurnService turnService;

    @Value("${admin.key:change-me}")
    private String adminKey;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getConfig(
            @RequestHeader(value = "X-Admin-Key", required = false) String key) {
        if (!adminKey.equals(key)) return unauthorized();
        return ResponseEntity.ok(turnService.getConfig());
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> updateConfig(
            @RequestHeader(value = "X-Admin-Key", required = false) String key,
            @RequestBody Map<String, Object> body) {
        if (!adminKey.equals(key)) return unauthorized();
        turnService.updateConfig(body);
        return ResponseEntity.ok(turnService.getConfig());
    }

    private ResponseEntity<Map<String, Object>> unauthorized() {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
            .body(Map.of("error", "Invalid or missing X-Admin-Key header"));
    }
}
