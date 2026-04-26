import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: { origin: "*" }
  });

  const PORT = 3000;

  app.use(express.json());

  // pairingCodes stores [code]: socketId
  const pairingCodes = new Map();

  // --- API Routes ---
  app.post("/api/pairing/generate", (req, res) => {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    console.log(`Generated code for dashboard: ${code}`);
    res.json({ code, hostId: "pending" });
  });

  io.on("connection", (socket) => {
    console.log("New connection:", socket.id);

    // Register a pairing code (Host mode)
    socket.on("register-host", (code) => {
      pairingCodes.set(code, socket.id);
      console.log(`Host registered with code: ${code}`);
    });

    // Join a session (Client mode)
    socket.on("join-session", (code) => {
      const hostSocketId = pairingCodes.get(code);
      if (hostSocketId) {
        // Notify host that a client wants to connect
        io.to(hostSocketId).emit("client-joined", { clientId: socket.id });
        socket.emit("session-ready", { hostId: hostSocketId });
        console.log(`Client joined session: ${code}`);
      } else {
        socket.emit("error", "Invalid pairing code or host offline");
      }
    });

    // Signal forwarding (WebRTC/WireGuard Handshake)
    socket.on("signal", ({ to, data }) => {
      io.to(to).emit("signal", { from: socket.id, data });
    });

    socket.on("disconnect", () => {
      // Cleanup pairing codes
      for (const [code, id] of pairingCodes.entries()) {
        if (id === socket.id) {
          pairingCodes.delete(code);
          break;
        }
      }
    });
  });

  // Vite integration for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(process.cwd(), "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(process.cwd(), "dist", "index.html"));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`BD-VPN Server running on http://localhost:${PORT}`);
  });
}

startServer();
