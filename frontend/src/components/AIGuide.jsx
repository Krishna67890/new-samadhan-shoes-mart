import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MessageSquare, Volume2, X, Zap, User, UserCheck } from 'lucide-react';

const AIGuide = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [voiceType, setVoiceType] = useState('female'); // 'male' or 'female'
  const location = useLocation();

  const getScript = () => {
    const path = location.pathname;
    const userName = JSON.parse(localStorage.getItem('ssm_user_identity') || '{}').name || 'Elite User';

    if (path === '/') {
      return `Welcome to New Samadhan Shoe Mart, ${userName}. Browse our popular ADIDAS YEEZY BOOST and JORDAN collections. Click Shop to see our collection or Sync Identity to start your purchase.`;
    }
    if (path === '/login') {
      return "Please enter your credentials or use Guest Login to browse. Your data is only used for order verification.";
    }
    if (path === '/products' || path === '/shop') {
      return "Browse our curated drops. Add items like the NIKE AIR MAX 270 to your cart to begin. Every pair here is curated for elite performance.";
    }
    if (path === '/identity' || path === '/edit-profile' || path === '/profile') {
      return `${userName}, please save your address to Nashik so we know where to deliver your shoes. This locks your identity into the vault.`;
    }
    if (path === '/cart' || path === '/checkout' || path === '/vault') {
      return "Your order is ready. I am opening WhatsApp to notify our Shopkeepers of your purchase. For technical support, you can reach our developer at 80-80-69-06-31.";
    }
    return "Welcome to New Samadhan Shoe Mart. Browse our collection and add your shoes to the Vault.";t. Finally, click Confirm to send your order details directly to our Shopkeepers via WhatsApp. For technical support, contact our developer at 80-80-69-06-31.";
  };

  const speak = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);

      // Try to find English (India) voices
      const voices = window.speechSynthesis.getVoices();
      let selectedVoice = null;

      if (voiceType === 'female') {
        selectedVoice = voices.find(v => v.lang.includes('en-IN') && v.name.toLowerCase().includes('female')) ||
                        voices.find(v => v.lang.includes('en-IN')) ||
                        voices.find(v => v.name.toLowerCase().includes('female')) ||
                        voices[0];
      } else {
        selectedVoice = voices.find(v => v.lang.includes('en-IN') && v.name.toLowerCase().includes('male')) ||
                        voices.find(v => v.lang.includes('en-IN')) ||
                        voices.find(v => v.name.toLowerCase().includes('male')) ||
                        voices[0];
      }

      if (selectedVoice) utterance.voice = selectedVoice;

      utterance.rate = 1.0;
      utterance.pitch = voiceType === 'female' ? 1.1 : 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    // Re-load voices when they change (browser behavior)
    window.speechSynthesis.getVoices();
  }, []);

  const handleGuide = () => {
    setIsOpen(true);
    speak(getScript());
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={handleGuide}
        className="fixed bottom-8 left-8 z-[200] w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-2xl shadow-blue-200 hover:scale-110 active:scale-95 transition-all group"
      >
        <Volume2 className="group-hover:animate-pulse" size={28} />
      </button>

      {/* Modal / Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 animate-in fade-in duration-300">
           <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={() => setIsOpen(false)}></div>

           <div className="bg-white w-full max-w-md rounded-[3rem] p-10 relative z-10 shadow-2xl border border-slate-100 no-blur">
              <button
                onClick={() => { setIsOpen(false); window.speechSynthesis.cancel(); }}
                className="absolute top-6 right-6 p-2 text-slate-300 hover:text-slate-950 transition-colors"
              >
                <X size={24} />
              </button>

              <div className="flex items-center justify-between mb-8">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
                   <Zap size={32} />
                </div>

                {/* Voice Selector */}
                <div className="flex bg-slate-100 p-1 rounded-2xl">
                   <button
                     onClick={() => setVoiceType('female')}
                     className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all flex items-center gap-2 ${voiceType === 'female' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                   >
                     <User size={14} /> Female
                   </button>
                   <button
                     onClick={() => setVoiceType('male')}
                     className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all flex items-center gap-2 ${voiceType === 'male' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                   >
                     <UserCheck size={14} /> Male
                   </button>
                </div>
              </div>

              <h2 className="text-3xl font-black text-slate-950 uppercase tracking-tighter mb-4">AI ELITE GUIDE</h2>
              <div className="space-y-6">
                 <p className="text-slate-600 font-bold leading-relaxed italic">
                   "{getScript()}"
                 </p>

                 <div className="pt-6 border-t border-slate-50 flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <div className="flex -space-x-2">
                       <div className="w-6 h-6 rounded-full bg-blue-100 border-2 border-white"></div>
                       <div className="w-6 h-6 rounded-full bg-blue-600 border-2 border-white"></div>
                    </div>
                    <span>{voiceType.toUpperCase()} AI Protocol Active</span>
                 </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-full mt-10 py-5 bg-slate-950 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 transition-colors"
              >
                Understood
              </button>
           </div>
        </div>
      )}
    </>
  );
};

export default AIGuide;
