# BD-VPN Gateway: Technical Specification & Implementation Plan

## 1. System Architecture Overview
The BD-VPN Gateway is a Peer-to-Peer (P2P) VPN solution designed to bypass geo-restrictions for Bangladeshi apps (bKash, Nagad, etc.) by routing traffic from abroad through a host device physically located in Bangladesh.

### Core Components:
1.  **Signaling Server (Backend)**: Orchestrates peer discovery, pairing codes, and STUN/TURN coordination.
2.  **Host Node (Bangladesh Android Device)**: Acts as the VPN gateway.
3.  **Client Node (Abroad Android Device)**: Connects to the host via a secure WireGuard tunnel.
4.  **Web Management Portal**: User registration, pairing dashboard, and documentation.

### Connection Flow:
1.  **Handshake**: Host generates an 8-character pairing code via the Signaling Server.
2.  **Pairing**: Client enters the code. Server matches the two sessions.
3.  **Key Exchange**: Peers exchange WireGuard public keys and STUN/TURN candidates via encrypted WebSocket.
4.  **Tunneling**: A WireGuard tunnel is established. Split-tunneling routes only specific BD IP ranges.

---

## 2. Backend Signaling Server

### Technology Stack:
- **Runtime**: Node.js (Express)
- **Real-time**: WebSockets (`ws` library)
- **Database**: PostgreSQL (User data/Logs), Redis (Session/Pairing codes)
- **NAT Traversal**: `coturn` (STUN/TURN)

### Key Features:
- **Authentication**: Phone number + OTP (integration with SMS gateways like Twilio or BD-specific providers).
- **Pairing Engine**: 
    - Cryptographically secure 8-char alphanumeric codes.
    - Expiration: 24 hours of inactivity.
- **Signaling**: JSON-based messages for SDP-like WireGuard configuration exchange.
- **Rate Limiting**: Protection against OTP brute-forcing.

---

## 3. Android Application (Dual-Mode)

### Framework: Flutter
- **Engine**: `wireguard-go` for the VPN protocol.
- **System API**: `VpnService` for non-root traffic interception.

### Host Mode (Gateway):
- Listen for inbound signaling.
- Bridge VPN traffic to the local Wi-Fi/LTE interface.
- Persistent foreground service with usage statistics.

### Client Mode (VPN):
- **Split Tunneling**: Routes only `103.0.0.0/8`, `202.0.0.0/8`, `27.0.0.0/8`.
- **Kill Switch**: Optional feature to block internet if VPN drops.
- **Stealth**: No VPN headers in high-level traffic; WireGuard is notoriously hard to detect as a standard VPN.

---

## 4. Website Frontend

### Design:
- **Framework**: React + Tailwind CSS.
- **Language**: Bilingual (English & Bengali).
- **Screens**:
    - **Landing Page**: Explains the "Shared Connection" concept.
    - **Dashboard**: "My Pairing Code" (for Hosts) and "Connection Guide" (for Clients).
    - **Downloads**: Direct signed APK links.

---

## 5. Security & Privacy
- **Zero-Log Policy**: No traffic data is ever decrypted or stored by the Signaling Server.
- **End-to-End Encryption**: WireGuard keys are generated locally. Signaling server only sees public keys.
- **WSS**: All signaling occurs over encrypted WebSockets.

---

## 6. Implementation Plan (Phases)

### Phase 1: Signaling Core (Days 1-3)
- Initialize Node.js server.
- Implement pairing code logic in Redis.
- Setup `coturn` on Oracle Cloud.

### Phase 2: Android WireGuard Integration (Days 4-8)
- Integrate WireGuard Flutter plugins.
- Implement Host vs Client logic.
- Test NAT traversal across different mobile networks.

### Phase 3: Web & User Management (Days 9-11)
- Build React dashboard.
- Integrate OTP authentication.
- Create multi-lingual onboarding docs.

### Phase 4: Hardening & QA (Days 12-14)
- Test bKash/Nagad detection bypass.
- Optimize battery usage on host devices.
- Launch!
