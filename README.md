# BD-VPN Gateway: সম্পূর্ণ সেটআপ গাইড

এই প্রজেক্টটি একটি **Peer-to-Peer (P2P) VPN** সিস্টেম যা প্রবাসী বাংলাদেশিদের জন্য বিশেষভাবে তৈরি। এটি একটি সিগন্যালিং সার্ভার এবং ওয়্যারগার্ড (WireGuard) টানেল ব্যবহার করে দুই ফোনের মধ্যে সরাসরি সংযোগ তৈরি করে।

## প্রোজেক্টের অংশসমূহ:
১. **Signaling Server:** এটি সংযোগের মাধ্যম হিসেবে কাজ করে।
২. **React Dashboard:** সার্ভার স্ট্যাটাস দেখার জন্য ওয়েব ইন্টারফেস।
৩. **Flutter Android App:** মূল ফাইল যা ফোনে ইনস্টল হবে।
৪. **GitHub CI/CD:** স্বয়ংক্রিয়ভাবে APK তৈরির সিস্টেম।

---

## ১. সার্ভার সেটআপ (VPS বা GitHub Codespaces)
আপনি যদি এই কোডটি GitHub এ পুশ করেন, তবে ডকার ব্যবহার করে সহজে সার্ভার চালাতে পারবেন:
```bash
docker-compose up -d
```
সার্ভারটি `PORT 3000` এ চলবে। এটি রিডলিস্ট এবং কানেকশন হ্যান্ডেল করবে।

## ২. APK বানানোর সেরা নিয়ম (GitHub Actions)
আমি একটি অটোমেটেড টুল যোগ করেছি। আপনি যদি এই কোডটি আপনার GitHub অ্যাকাউন্টে আপলোড করেন, তবে GitHub নিজে থেকেই আপনার জন্য APK বানিয়ে দেবে:
1. কোডটি GitHub-এ নতুন রিপোজিটরি হিসেবে আপলোড করুন।
2. GitHub-এ গিয়ে **Actions** ট্যাবে ক্লিক করুন।
3. **Build Android APK** রান হলে প্রসেস শেষ না হওয়া পর্যন্ত অপেক্ষা করুন।
4. প্রসেস শেষ হয়ে গেলে **Artifacts** থেকে `release-apk` ডাউনলোড করে নিন।

## ৩. Flutter কোড (android_main.dart)
আপনি `android_main.dart` ফাইল থেকে কোডটি ব্যবহার করবেন (আমি আগে `flutter_sample.dart` বললেও এখন ফাইলটির নাম `android_main.dart`)।

### প্রয়োজনীয় প্যাকেজ (pubspec.yaml):
FlutLab বা লোকাল মেশিনে রান করতে এই প্যাকেজগুলো যোগ করুন:
```yaml
dependencies:
  flutter:
    sdk: flutter
  web_socket_channel: ^3.0.1
  shared_preferences: ^2.3.2
  flutter_spinkit: ^5.2.1
```

---

## সমস্যা ও সমাধান (Troubleshooting)
- **App keeps stopping:** ফোনের `minSdkVersion` এর কারণে হতে পারে। `android/app/build.gradle` ফাইলে `minSdkVersion 21` সেট করুন।
- **Server Connection:** আপনার ড্যাশবোর্ড থেকে পাওয়া সার্ভার আইপি অবশ্যই `android_main.dart` ফাইলের `IOWebSocketChannel.connect` লাইনে দিয়ে দিতে হবে।

এখন আপনি আপনার GitHub রিপোজিটরি ব্যবহার করে প্রফেশনাল ভাবে APK বিল্ড এবং সার্ভার হোস্ট করতে পারবেন।
