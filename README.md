# BD-VPN Gateway: Full Setup Guide (Bengali & English)

## বাংলা নির্দেশিকা (Bengali Guide)

এই প্রজেক্টটি একটি P2P VPN সিস্টেম যা প্রবাসী বাংলাদেশিদের জন্য তৈরি। এটি ব্যবহার করে আপনি বিদেশ থেকে বিকাশের মতো অ্যাপগুলো ব্যবহার করতে পারবেন।

### ১. সার্ভার ডিপ্লয়মেন্ট
টার্মিনালে নিচের কমান্ডগুলো দিয়ে সার্ভার চালু করুন:
```bash
docker-compose up -d
```

### ২. অ্যান্ড্রয়েড অ্যাপ সেটআপ
- `flutter_sample.dart` ফাইলটি নিয়ে একটি Flutter প্রোজেক্ট তৈরি করুন।
- APK বিল্ড করে একটি ফোন বাংলাদেশে এবং একটি ফোন বিদেশে ব্যবহার করুন।

### ৩. ব্যবহারের নিয়ম
- **Host (বাংলাদেশ):** অ্যাপে গিয়ে 'Host Mode' এ ড্যাশবোর্ড থেকে পাওয়া কোডটি দিন।
- **Client (বিদেশ):** একই কোডটি বিদেশের ফোনে অ্যাপে দিন।
- কানেক্ট হয়ে গেলে একটি সিকিউর টানেল তৈরি হবে।

---

## English Guide

### 1. Server Deployment
Run the following in your terminal to start the signaling server and database:
```bash
docker-compose up -d
```

### 2. Android App (Flutter)
- Use the `flutter_sample.dart` as a base.
- Integrate the `wireguard_flutter_plugin`.
- Build the APK and deploy to two devices (one in BD, one abroad).

### 3. Connection Steps
- **Step 1:** Generate a pairing code from the Web Dashboard (Host Tab).
- **Step 2:** Enter code on the BD phone (Host Mode).
- **Step 3:** Enter same code on the Abroad phone (Client Mode).
- **Step 4:** The specific BD IP ranges (103.x, 202.x) will now route through the BD phone.

### Tech Stack
- **Frontend:** React + Tailwind + Motion
- **Backend:** Node.js + WebSocket + Redis
- **Database:** PostgreSQL
- **VPN Protocol:** WireGuard
