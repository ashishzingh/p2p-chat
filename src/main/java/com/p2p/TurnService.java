package com.p2p;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.*;

@Service
public class TurnService {

    @Value("${turn.enabled:false}")
    private volatile boolean enabled;

    @Value("${turn.mode:static}")
    private volatile String mode;          // "static" | "hmac"

    @Value("${turn.host:}")
    private volatile String host;

    @Value("${turn.udp-port:3478}")
    private volatile int udpPort;

    @Value("${turn.tcp-port:3478}")
    private volatile int tcpPort;

    @Value("${turn.tls-port:5349}")
    private volatile int tlsPort;

    // static-mode credentials
    @Value("${turn.username:}")
    private volatile String username;

    @Value("${turn.password:}")
    private volatile String password;      // never returned in API responses

    // hmac-mode secret
    @Value("${turn.secret:}")
    private volatile String secret;        // never returned in API responses

    @Value("${turn.credential-ttl-seconds:86400}")
    private volatile int credentialTtlSeconds;

    @Value("${turn.force-relay:false}")
    private volatile boolean forceRelay;

    /**
     * Generates ICE-ready credentials for the configured TURN server.
     * Returns empty if TURN is disabled or not fully configured.
     */
    public Optional<Map<String, Object>> generateCredentials() throws Exception {
        if (!enabled || host.isBlank()) return Optional.empty();

        String user;
        String credential;

        if ("hmac".equalsIgnoreCase(mode)) {
            if (secret.isBlank()) return Optional.empty();
            long expiry = System.currentTimeMillis() / 1000 + credentialTtlSeconds;
            user = expiry + ":user";
            Mac mac = Mac.getInstance("HmacSHA1");
            mac.init(new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), "HmacSHA1"));
            credential = Base64.getEncoder().encodeToString(
                mac.doFinal(user.getBytes(StandardCharsets.UTF_8))
            );
        } else {
            // static mode — use credentials exactly as provided by the service
            if (username.isBlank() || password.isBlank()) return Optional.empty();
            user       = username;
            credential = password;
        }

        String cleanHost = sanitizeHost(host);
        if (cleanHost.isBlank()) return Optional.empty();

        List<String> urls = new ArrayList<>();
        urls.add("turn:" + cleanHost + ":" + udpPort + "?transport=udp");
        urls.add("turn:" + cleanHost + ":" + tcpPort + "?transport=tcp");
        if (tlsPort > 0) urls.add("turns:" + cleanHost + ":" + tlsPort + "?transport=tcp");

        Map<String, Object> turn = new LinkedHashMap<>();
        turn.put("urls",        urls);
        turn.put("username",    user);
        turn.put("credential",  credential);
        turn.put("forceRelay",  forceRelay);
        return Optional.of(turn);
    }

    // ── Config read — secret and password intentionally excluded ─────────────

    public Map<String, Object> getConfig() {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("enabled",              enabled);
        m.put("mode",                 mode);
        m.put("host",                 host);
        m.put("udpPort",              udpPort);
        m.put("tcpPort",              tcpPort);
        m.put("tlsPort",              tlsPort);
        m.put("username",             username);
        m.put("credentialTtlSeconds", credentialTtlSeconds);
        m.put("forceRelay",           forceRelay);
        // password and secret intentionally omitted
        return m;
    }

    // ── Config write ──────────────────────────────────────────────────────────

    public void updateConfig(Map<String, Object> body) {
        if (body.containsKey("enabled"))              enabled              = (Boolean) body.get("enabled");
        if (body.containsKey("mode"))                 mode                 = (String)  body.get("mode");
        if (body.containsKey("host"))                 host                 = (String)  body.get("host");
        if (body.containsKey("udpPort"))              udpPort              = toInt(body.get("udpPort"));
        if (body.containsKey("tcpPort"))              tcpPort              = toInt(body.get("tcpPort"));
        if (body.containsKey("tlsPort"))              tlsPort              = toInt(body.get("tlsPort"));
        if (body.containsKey("username"))             username             = (String)  body.get("username");
        if (body.containsKey("password"))             password             = (String)  body.get("password");
        if (body.containsKey("secret"))               secret               = (String)  body.get("secret");
        if (body.containsKey("credentialTtlSeconds")) credentialTtlSeconds = toInt(body.get("credentialTtlSeconds"));
        if (body.containsKey("forceRelay"))           forceRelay           = (Boolean) body.get("forceRelay");
    }

    private int toInt(Object v) {
        if (v instanceof Integer i) return i;
        if (v instanceof Number  n) return n.intValue();
        return Integer.parseInt(v.toString());
    }

    // Strip any scheme prefix (turn:/turns:/stun:) and trailing :port the user may have included
    private String sanitizeHost(String raw) {
        String h = raw.trim();
        // strip scheme: "turn:host" or "turns://host"
        h = h.replaceAll("(?i)^(turns?|stuns?)://", "");
        h = h.replaceAll("(?i)^(turns?|stuns?):", "");
        // strip trailing :port — a colon followed only by digits at the end
        h = h.replaceAll(":\\d+$", "");
        return h.trim();
    }
}
