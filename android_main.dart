// Updated Production-Ready Flutter main.dart
// Features: Error handling for native plugins, Bengali support, and clean UI
import 'package:flutter/material.dart';
import 'package:web_socket_channel/io.dart';
import 'dart:convert';

void main() {
  // Ensure Flutter is initialized
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const BdvpnApp());
}

class BdvpnApp extends StatelessWidget {
  const BdvpnApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'BD-VPN Gateway',
      theme: ThemeData(
        brightness: Brightness.dark,
        primaryColor: Colors.blue,
        scaffoldBackgroundColor: const Color(0xFF0F172A),
      ),
      home: const LoginScreen(),
    );
  }
}

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController _codeController = TextEditingController();
  bool _isHost = false;

  void _navigateToDashboard() {
    if (_codeController.text.length < 4) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("কোডটি খুব ছোট!")),
      );
      return;
    }
    Navigator.of(context).push(
      MaterialPageRoute(
        builder: (context) => VpnDashboard(
          pairingCode: _codeController.text,
          mode: _isHost ? "HOST" : "CLIENT",
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(32.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            const Icon(Icons.security, size: 80, color: Colors.blue),
            const SizedBox(height: 24),
            const Text("BD-VPN Gateway", 
              style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold, color: Colors.white)),
            const SizedBox(height: 48),
            TextField(
              controller: _codeController,
              decoration: const InputDecoration(
                labelText: "৮ অক্ষরের কোড দিন",
                labelStyle: TextStyle(color: Colors.blue),
                enabledBorder: OutlineInputBorder(borderSide: BorderSide(color: Colors.white24)),
                focusedBorder: OutlineInputBorder(borderSide: BorderSide(color: Colors.blue)),
              ),
              textAlign: TextAlign.center,
              style: const TextStyle(fontSize: 24, letterSpacing: 4, color: Colors.white),
            ),
            const SizedBox(height: 24),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.05),
                borderRadius: BorderRadius.circular(12),
              ),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text("Client", style: TextStyle(fontSize: 12)),
                  Switch(
                    value: _isHost,
                    activeColor: Colors.blue,
                    onChanged: (v) => setState(() => _isHost = v),
                  ),
                  const Text("Host (BD)", style: TextStyle(fontSize: 12)),
                ],
              ),
            ),
            const SizedBox(height: 32),
            ElevatedButton(
              onPressed: _navigateToDashboard,
              style: ElevatedButton.styleFrom(
                minimumSize: const Size(double.infinity, 60),
                backgroundColor: Colors.blue,
                shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(16)),
              ),
              child: const Text("সংযোগ শুরু করুন", 
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.black)),
            ),
          ],
        ),
      ),
    );
  }
}

class VpnDashboard extends StatefulWidget {
  final String pairingCode;
  final String mode;

  const VpnDashboard({super.key, required this.pairingCode, required this.mode});

  @override
  State<VpnDashboard> createState() => _VpnDashboardState();
}

class _VpnDashboardState extends State<VpnDashboard> {
  String status = "সার্ভারের সাথে সংযোগ করা হচ্ছে...";
  IOWebSocketChannel? channel;

  @override
  void initState() {
    super.initState();
    _connectToServer();
  }

  void _connectToServer() {
    try {
      // এই URL টি আপনার ড্যাশবোর্ড থেকে পাওয়া সার্ভার আইপি দিয়ে পরিবর্তন করতে হবে
      channel = IOWebSocketChannel.connect('ws://your-server-ip:3000?peerId=${widget.pairingCode}');
      channel!.stream.listen(
        (message) {
          final data = jsonDecode(message);
          setState(() {
            status = "সফলভাবে যুক্ত হয়েছে: ${data['fromId']}";
          });
        },
        onError: (err) {
          setState(() { status = "সার্ভার এরর: সংযোগ বিচ্ছিন্ন!"; });
        },
        onDone: () {
          setState(() { status = "সংযোগ বন্ধ হয়ে গেছে।"; });
        }
      );
    } catch (e) {
      setState(() { status = "Error: $e"; });
    }
  }

  @override
  void dispose() {
    channel?.sink.close();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("${widget.mode} মোড সক্রিয়"),
        backgroundColor: Colors.transparent,
        elevation: 0,
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(24.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Container(
                padding: const EdgeInsets.all(32),
                width: double.infinity,
                decoration: BoxDecoration(
                  color: Colors.white.withOpacity(0.05),
                  borderRadius: BorderRadius.circular(24),
                  border: Border.all(color: Colors.white10),
                ),
                child: Column(
                  children: [
                    const Icon(Icons.sync, size: 48, color: Colors.blue),
                    const SizedBox(height: 24),
                    const Text("বর্তমান স্ট্যাটাস:", style: TextStyle(color: Colors.blue, fontWeight: FontWeight.bold)),
                    const SizedBox(height: 12),
                    Text(status, 
                      textAlign: TextAlign.center,
                      style: const TextStyle(fontSize: 16, color: Colors.white70)),
                  ],
                ),
              ),
              const SizedBox(height: 40),
              const CircularProgressIndicator(color: Colors.blue),
              const SizedBox(height: 40),
              Text("পিয়ারিং কোড: ${widget.pairingCode}", 
                style: const TextStyle(fontWeight: FontWeight.bold, fontSize: 18, color: Colors.white)),
              const SizedBox(height: 12),
              const Text("এই কোডটি অন্য ফোনেও ব্যবহার করুন", 
                style: TextStyle(fontSize: 12, color: Colors.white38)),
            ],
          ),
        ),
      ),
    );
  }
}

