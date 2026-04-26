import express from "express";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
import { createServer as createViteServer } from "vite";
import path from "path";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

// --- MOCK DATABASE (For Preview Environment) ---
// In production, replace with Redis/PostgreSQL
const PAIRING_CODES = new Map<string, { hostId: string, createdAt: number }>();
const ACTIVE_PEERS = new Map<string, WebSocket>();

const app = express();
const httpServer = createServer(app);
const wss = new WebSocketServer({ server: httpServer });

app.use(cors());
app.use(express.json());

// --- API ROUTES ---

// Generate pairing code (Host calls this)
app.post("/api/pairing/generate", (req, res) => {
  const hostId = uuidv4();
  const code = Math.random().toString(36).substring(2, 10).toUpperCase();
  PAIRING_CODES.set(code, { hostId, createdAt: Date.now() });
  
  // Cleanup old codes (24h)
  setTimeout(() => PAIRING_CODES.delete(code), 24 * 60 * 60 * 1000);

  res.json({ code, hostId });
});

// Verify code (Client calls this)
app.post("/api/pairing/verify", (req, res) => {
  const { code } = req.body;
  const pairing = PAIRING_CODES.get(code);
  if (!pairing) {
    return res.status(404).json({ error: "Invalid or expired code" });
  }
  res.json({ success: true, hostId: pairing.hostId });
});

// Mock OTP (For demo)
app.post("/api/auth/otp", (req, res) => {
  const { phone } = req.body;
  console.log(`[OTP] Sending 123456 to ${phone}`);
  res.json({ success: true, message: "OTP sent" });
});

app.post("/api/auth/verify-otp", (req, res) => {
  const { otp } = req.body;
  if (otp === "123456") {
    return res.json({ token: "mock-jwt-token" });
  }
  res.status(401).json({ error: "Invalid OTP" });
});

// --- WEBSOCKET SIGNALING ---

wss.on("connection", (ws, req) => {
  const url = new URL(req.url!, `http://${req.headers.host}`);
  const peerId = url.searchParams.get("peerId");

  if (!peerId) {
    ws.close();
    return;
  }

  ACTIVE_PEERS.set(peerId, ws);
  console.log(`[WS] Peer connected: ${peerId}`);

  ws.on("message", (data) => {
    try {
      const message = JSON.parse(data.toString());
      const { targetId, type, payload } = message;

      if (targetId && ACTIVE_PEERS.has(targetId)) {
        const targetWs = ACTIVE_PEERS.get(targetId)!;
        if (targetWs.readyState === WebSocket.OPEN) {
          targetWs.send(JSON.stringify({
            fromId: peerId,
            type,
            payload
          }));
        }
      }
    } catch (e) {
      console.error("[WS] Error parsing message:", e);
    }
  });

  ws.on("close", () => {
    ACTIVE_PEERS.delete(peerId);
    console.log(`[WS] Peer disconnected: ${peerId}`);
  });
});

// --- VITE MIDDLEWARE ---

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const PORT = 3000;
  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`BD-VPN Server running at http://localhost:${PORT}`);
  });
}

startServer();
