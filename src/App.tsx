import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Shield, 
  Smartphone, 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  RefreshCw, 
  Download,
  AlertCircle,
  Menu,
  X,
  Lock,
  Zap,
  Server
} from "lucide-react";

// --- Types ---
interface PairingCode {
  code: string;
  hostId: string;
}

// --- Components ---

const LandingPage = ({ onEnterDashboard }: { onEnterDashboard: () => void }) => {
  return (
    <div className="min-h-screen bg-bento-bg text-bento-text flex flex-col font-sans">
      {/* Hero Section */}
      <nav className="p-6 flex justify-between items-center max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-2 text-bento-blue font-bold text-2xl">
          <Shield className="w-8 h-8" />
          <span>BD-VPN</span>
        </div>
        <button 
          onClick={onEnterDashboard}
          className="px-6 py-2 bg-bento-blue/10 border border-bento-blue/20 text-bento-blue rounded-full font-medium hover:bg-bento-blue/20 transition-all"
        >
          লগইন করুন
        </button>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12 lg:py-24 grid lg:grid-cols-12 gap-6 items-start">
        {/* Header/Hero Card - Span 8 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-8 bg-gradient-to-br from-[#1e293b] to-[#0f172a] border border-bento-blue/30 rounded-[32px] p-10 md:p-16 space-y-8 flex flex-col justify-center min-h-[400px]"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bento-blue/20 text-bento-blue text-xs font-bold uppercase tracking-widest">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-bento-blue opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-bento-blue"></span>
            </span>
            P2P টানেলিং সক্রিয়
          </div>
          
          <h1 className="text-4xl lg:text-7xl font-bold leading-tight tracking-tight">
            বাংলাদেশের সাথে <span className="text-bento-blue">সুরক্ষিত</span> সংযোগ।
          </h1>
          
          <p className="text-lg text-bento-muted max-w-xl leading-relaxed">
            ব্যক্তিগত হোস্ট ডিভাইসের মাধ্যমে জিও-রেস্ট্রিকশন বাইপাস করুন। 
            ওয়্যারগার্ড এনক্রিপশনের মাধ্যমে পান নেটিভ স্পিড।
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button 
              onClick={onEnterDashboard}
              className="px-8 py-4 bg-bento-blue text-slate-900 rounded-2xl font-bold text-lg hover:brightness-110 transition-all flex items-center justify-center gap-2"
            >
              গেটওয়ে শুরু করুন <ArrowRight className="w-5 h-5" />
            </button>
            <a 
              href="#how"
              className="px-8 py-4 bg-bento-card border border-bento-border text-bento-text rounded-2xl font-bold text-lg hover:bg-white/5 transition-all flex items-center justify-center"
            >
              নির্দেশিকা
            </a>
          </div>
        </motion.div>

        {/* Status Card - Span 4 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-4 bg-bento-green/10 border border-bento-green/30 rounded-[32px] p-8 space-y-6 min-h-[400px] flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center gap-2 text-bento-green mb-4">
              <div className="w-2 h-2 rounded-full bg-bento-green" />
              <h2 className="font-bold text-sm uppercase tracking-wider">সিস্টেম ইন্টিগ্রিটি</h2>
            </div>
            <p className="text-sm text-bento-green font-medium">কোনো VPN লিক সনাক্ত হয়নি। ১০৩.এক্স রেঞ্জের জন্য রেসিডেন্সিয়াল এনক্রিপশন সক্রিয়।</p>
          </div>
          
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/5 text-center">
            <div className="text-[10px] uppercase font-bold text-bento-green/60 mb-2">লাইভ নোড আইডি</div>
            <div className="text-2xl font-mono font-black text-white tracking-widest uppercase">XJ9-4K2P</div>
            <div className="text-[10px] text-white/40 mt-2">ভেরিফাইড হোস্ট: ঢাকা উত্তর</div>
          </div>

          <div className="bg-black/20 p-4 rounded-xl flex items-center justify-between">
            <div className="text-xs font-bold text-bento-muted">গড় ল্যাটেন্সি</div>
            <div className="text-sm font-black text-bento-green">42ms</div>
          </div>
        </motion.div>

        {/* Bottom Bento Row */}
        <div className="lg:col-span-4 bg-bento-card border border-bento-border rounded-[24px] p-6 space-y-4">
           <h3 className="font-bold text-sm text-bento-blue uppercase tracking-widest flex items-center gap-2">
             <Smartphone className="w-4 h-4" /> অ্যান্ড্রয়েড এসডিকে
           </h3>
           <div className="grid grid-cols-2 gap-3">
             <div className="p-3 rounded-xl bg-black/20 border border-white/5">
                <div className="text-[10px] uppercase font-bold text-bento-muted mb-1">সর্বনিম্ন এসডিকে</div>
                <div className="text-sm font-bold">API 26+</div>
             </div>
             <div className="p-3 rounded-xl bg-black/20 border border-white/5">
                <div className="text-[10px] uppercase font-bold text-bento-muted mb-1">রুট</div>
                <div className="text-sm font-bold">প্রয়োজন নেই</div>
             </div>
           </div>
        </div>

        <div className="lg:col-span-4 bg-bento-card border border-bento-border rounded-[24px] p-6 space-y-4">
           <h3 className="font-bold text-sm text-bento-blue uppercase tracking-widest flex items-center gap-2">
             <Lock className="w-4 h-4" /> নিরাপত্তা
           </h3>
           <div className="space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="text-bento-muted">প্রোটোকল</span>
                <span className="font-mono">WireGuard v1</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full">
                <div className="h-full bg-bento-blue w-full" />
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-bento-muted">এনক্রিপ্টেড সিগন্যালিং</span>
                <span className="font-mono">WSS (TLS 1.3)</span>
              </div>
           </div>
        </div>

        <div className="lg:col-span-4 bg-bento-card border border-bento-border rounded-[24px] p-6 flex flex-col justify-center">
           <h3 className="font-bold text-sm text-bento-blue uppercase tracking-widest mb-4">সমর্থিত অ্যাপ</h3>
           <div className="flex flex-wrap gap-2">
             {['bKash', 'Nagad', 'Rocket', 'Upay', 'MyGP'].map(app => (
               <span key={app} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-bento-muted">{app}</span>
             ))}
           </div>
        </div>
      </main>
    </div>
  );
};

const UserDashboard = () => {
  const [pairingCode, setPairingCode] = useState<PairingCode | null>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'host' | 'client' | 'overview'>('overview');

  const generateCode = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/pairing/generate", { method: "POST" });
      const data = await res.json();
      setPairingCode(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-bento-bg text-bento-text font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Dash Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-bento-card border border-bento-border p-6 rounded-[24px]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-bento-blue/10 flex items-center justify-center text-bento-blue ring-1 ring-bento-blue/20">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">গেটওয়ে কন্ট্রোলার</h1>
              <p className="text-xs text-bento-muted uppercase font-black tracking-widest">সেশন: সক্রিয় &bull; ঢাকা রিলে টার্গেট</p>
            </div>
          </div>
          
          <nav className="flex bg-black/40 p-1 rounded-xl ring-1 ring-white/5 w-full md:w-auto">
            {[
              { id: 'overview', icon: Globe, label: 'ওভারভিউ' },
              { id: 'host', icon: Server, label: 'হোস্ট' },
              { id: 'client', icon: Smartphone, label: 'ক্লায়েন্ট' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex-1 md:flex-none px-6 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === tab.id ? 'bg-bento-blue text-slate-900' : 'text-bento-muted hover:text-white'}`}
              >
                <tab.icon className="w-4 h-4" /> <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </nav>
        </header>

        <AnimatePresence mode="wait">
          {activeTab === 'overview' && (
            <motion.div 
              key="ov"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="grid md:grid-cols-12 gap-6"
            >
              {/* Stats Bento Block */}
              <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { label: 'সক্রিয় রিলে', val: '0', icon: Shield, col: 'md:col-span-1' },
                  { label: 'টানেল স্পিড', val: '0 Mbps', icon: Zap, col: 'md:col-span-1' },
                  { label: 'ডেটা ব্যবহার', val: '0 MB', icon: Globe, col: 'md:col-span-1' },
                  { label: 'গ্লোবাল স্ট্যাটাস', val: 'সুস্থ', icon: CheckCircle2, col: 'md:col-span-1' },
                ].map((s, i) => (
                  <div key={i} className={`${s.col} bg-bento-card border border-bento-border p-6 rounded-[24px] flex flex-col justify-between min-h-[140px]`}>
                    <s.icon className="w-5 h-5 text-bento-blue/40" />
                    <div>
                      <div className="text-2xl font-black text-white">{s.val}</div>
                      <div className="text-[10px] uppercase font-bold text-bento-muted tracking-widest">{s.label}</div>
                    </div>
                  </div>
                ))}

                {/* Big Info Block */}
                <div className="col-span-2 md:col-span-4 bg-gradient-to-br from-bento-card to-black/20 border border-bento-border p-8 rounded-[32px] space-y-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Server className="w-5 h-5 text-bento-blue" /> নোড আর্কিটেকচার
                  </h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                      <div className="text-xs font-bold text-bento-blue mb-2 uppercase tracking-widest">১. বিদেশের নোড</div>
                      <p className="text-xs text-bento-muted leading-relaxed">ক্লায়েন্ট মোডে চলে। WSS এর মাধ্যমে অথেন্টিকেট করে এবং ওয়্যারগার্ড কী (key) তৈরি করে।</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                      <div className="text-xs font-bold text-bento-blue mb-2 uppercase tracking-widest">২. সিগন্যালিং</div>
                      <p className="text-xs text-bento-muted leading-relaxed">মোবাইল ফায়ারওয়াল ভেদ করতে STUN/TURN ক্যান্ডিডেট আদান-প্রদান করে।</p>
                    </div>
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                      <div className="text-xs font-bold text-bento-blue mb-2 uppercase tracking-widest">৩. হোস্ট নোড</div>
                      <p className="text-xs text-bento-muted leading-relaxed">রেসিডেন্সিয়াল বাংলাদেশি আইপিতে ট্রাফিক ব্রিজ করে। বিকাশ অ্যাপে ধরা পড়বে না।</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar Bento Block */}
              <div className="md:col-span-4 space-y-6 text-white">
                <div className="bg-bento-blue text-slate-900 p-8 rounded-[32px] flex flex-col justify-between min-h-[200px]">
                   <Download className="w-8 h-8" />
                   <div>
                     <h3 className="text-xl font-black">ক্লায়েন্ট ডাউনলোড</h3>
                     <p className="text-xs font-bold opacity-70 mb-4">ভার্সন ১.৪.২ এক্স৬৪-অ্যান্ড্রয়েড</p>
                     <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-black transition-all">এপিকে ইনস্টল</button>
                   </div>
                </div>
                
                <div className="bg-bento-card border border-bento-border p-8 rounded-[32px] space-y-6">
                   <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] text-bento-muted">নেটওয়ার্ক হেলথ</h4>
                   <div className="space-y-4">
                     <div className="flex justify-between items-center text-sm">
                       <span className="text-bento-muted font-bold">WSS সিগন্যালিং</span>
                       <span className="text-bento-green flex items-center gap-1 font-black"><span className="w-1.5 h-1.5 rounded-full bg-bento-green" /> সক্রিয়</span>
                     </div>
                     <div className="flex justify-between items-center text-sm">
                       <span className="text-bento-muted font-bold">ICE (টার্ন)</span>
                       <span className="text-bento-green flex items-center gap-1 font-black"><span className="w-1.5 h-1.5 rounded-full bg-bento-green" /> প্রস্তুত</span>
                     </div>
                   </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'host' && (
            <motion.div 
              key="ho"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-bento-card border border-bento-border p-12 rounded-[40px] text-center max-w-2xl mx-auto space-y-8"
            >
              <div className="w-20 h-20 bg-bento-blue/10 rounded-full flex items-center justify-center mx-auto text-bento-blue ring-1 ring-bento-blue/20">
                <Server className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight">হোস্ট ভেরিফিকেশন</h2>
                <p className="text-bento-muted leading-relaxed max-w-sm mx-auto italic">
                  বাংলাদেশে থাকা ডিভাইসে এই কোডটি ব্যবহার করুন।<br/>
                  বাংলাদেশে আপনার রেসিডেন্সিয়াল নোড যুক্ত করুন।
                </p>
              </div>

              {pairingCode ? (
                <div className="space-y-8 animate-in fade-in zoom-in duration-500">
                  <div className="p-10 bg-black/40 rounded-3xl border border-white/5">
                    <div className="text-6xl md:text-7xl font-black font-mono text-white tracking-[0.2em]">
                      {pairingCode.code}
                    </div>
                  </div>
                  <div className="flex flex-col gap-4">
                    <button 
                      onClick={generateCode}
                      className="text-sm font-bold text-bento-blue hover:text-white transition-colors flex items-center justify-center gap-2"
                    >
                      <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> টানেল সেশন রিসেট করুন
                    </button>
                    <div className="bg-white/5 py-2 px-4 rounded-full inline-block mx-auto text-[10px] uppercase font-black tracking-widest text-[#64748b]">
                       মেয়াদ শেষ হবে ২৩:৫৯:৫৯
                    </div>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={generateCode}
                  disabled={loading}
                  className="px-12 py-5 bg-bento-blue text-slate-900 hover:brightness-110 disabled:opacity-50 rounded-2xl font-black text-lg shadow-2xl shadow-bento-blue/10 transition-all flex items-center justify-center gap-3 mx-auto"
                >
                  {loading ? <RefreshCw className="w-6 h-6 animate-spin" /> : <Zap className="w-6 h-6" />}
                  পেয়ারিং কোড তৈরি করুন
                </button>
              )}
            </motion.div>
          )}

          {activeTab === 'client' && (
            <motion.div 
              key="cl"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid md:grid-cols-12 gap-6"
            >
              <div className="md:col-span-12 lg:col-span-7 bg-bento-card border border-bento-border p-8 rounded-[32px] space-y-8">
                <h3 className="text-2xl font-bold">বিদেশ থেকে কানেক্ট করুন</h3>
                
                <div className="space-y-4">
                  <label className="text-[10px] uppercase font-black tracking-widest text-bento-muted">ভেরিফিকেশন কোড</label>
                  <div className="flex gap-4">
                    <input 
                      type="text" 
                      placeholder="৮ অক্ষরের কোড দিন"
                      className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-xl font-mono focus:outline-none focus:ring-2 focus:ring-bento-blue/50 uppercase"
                    />
                    <button className="px-8 py-4 bg-bento-blue text-slate-900 rounded-2xl font-black hover:brightness-110 transition-all">যাচাই করুন</button>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 pt-4">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                    <h4 className="font-bold text-white mb-2">স্প্লিট টানেলিং</h4>
                    <p className="text-xs text-bento-muted leading-relaxed">এটি শুধু নির্দিষ্ট বাংলাদেশি ব্যাংক আইপি রেঞ্জগুলো রাউট করে। আপনার লোকাল ব্রাউজিং ফাস্ট থাকবে।</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                    <h4 className="font-bold text-white mb-2">অটো-রিকানেক্ট</h4>
                    <p className="text-xs text-bento-muted leading-relaxed">নেটওয়ার্ক পরিবর্তন বা দুর্বল সংকেতে টানেল স্বয়ংক্রিয়ভাবে পুনরুদ্ধার হবে।</p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-12 lg:col-span-5 bg-gradient-to-br from-bento-card to-black/20 border border-bento-border p-8 rounded-[32px] flex flex-col justify-between space-y-6">
                <div>
                  <h4 className="text-lg font-bold mb-4 flex items-center gap-2"><Smartphone className="w-5 h-5 text-bento-blue"/> নেটিভ ইন্টিগ্রিটি</h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-bento-green shrink-0 mt-0.5" />
                      <p className="text-sm text-bento-muted">সাধারণ VPN সেন্সরগুলো এটি ধরতে পারবে না।</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-bento-green shrink-0 mt-0.5" />
                      <p className="text-sm text-bento-muted">কোনো হেডার ইনজেকশন বা প্রক্সি লিকিং নেই।</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-bento-green shrink-0 mt-0.5" />
                      <p className="text-sm text-bento-muted">রেসিডেন্সিয়াল আইপি কনসিস্টেন্সি ভেরিফাইড।</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-5 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl">
                  <p className="text-xs text-yellow-500 font-bold leading-relaxed">সংযোগে স্থিতিশীলতা বজায় রাখতে বাংলাদেশে থাকা হোস্ট নোডটি ফোরগ্রাউন্ড সার্ভিস হিসেবে অ্যাপটি চালাচ্ছে কিনা তা নিশ্চিত করুন।</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};


export default function App() {
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');

  return (
    <div className="antialiased">
      {view === 'landing' ? (
        <LandingPage onEnterDashboard={() => setView('dashboard')} />
      ) : (
        <UserDashboard />
      )}
    </div>
  );
}
