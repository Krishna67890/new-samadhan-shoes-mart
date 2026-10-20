import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, ShieldCheck, User } from 'lucide-react';
import { gsap } from 'gsap';

const WhatsAppConcierge = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const expertNumbers = ['9423228843', '8888644021'];
  const targetNum = expertNumbers[Math.floor(Math.random() * expertNumbers.length)];

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(menuRef.current,
        { opacity: 0, y: 20, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.7)" }
      );
    }
  }, [isOpen]);

  const handleConsultation = (concern) => {
    const message = `Hello Heritage Concierge! 👋\n\nI am reaching out regarding my foot health.\n\n🔍 *Heritage Concern:* ${concern}\n👟 I am interested in your 26-year expertise in anatomical footwear and arch support.\n\nPlease guide me with the most suitable Heritage builds.`;
    window.open(`https://wa.me/91${targetNum}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed bottom-8 right-8 z-[9999]">
      {isOpen && (
        <div
          ref={menuRef}
          className="mb-4 w-72 bg-white rounded-[2.5rem] shadow-2xl border border-[#111111]/10 overflow-hidden"
        >
          <div className="bg-[#111111] p-6 text-white relative border-b border-[#d4af37]/30">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-[#d4af37] transition-colors"
            >
              <X size={20} />
            </button>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#d4af37] rounded-full flex items-center justify-center text-black shadow-lg">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest text-[#d4af37]">Heritage Concierge</h4>
                <p className="text-[9px] text-white/70 font-bold uppercase tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> Live Support
                </p>
              </div>
            </div>
            <p className="text-[10px] font-medium leading-relaxed opacity-90 mt-2 italic">
              "26+ Years of Nashik's Finest Footwear Heritage."
            </p>
          </div>

          <div className="p-4 space-y-2 bg-[#F7F5F0]">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 px-2">Expert Footwear Solutions</p>
            {['Anatomical Arch Support', 'Diabetic Comfort', 'Heel Pain Relief', 'Professional Uniforms'].map((concern) => (
              <button
                key={concern}
                onClick={() => handleConsultation(concern)}
                className="w-full text-left px-4 py-3 bg-white hover:bg-[#111111] hover:text-[#d4af37] rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all border border-[#111111]/5 shadow-sm"
              >
                {concern}
              </button>
            ))}
            <button
              onClick={() => handleConsultation('Heritage Consultation')}
              className="w-full px-4 py-3 text-[#111111] font-black uppercase tracking-[0.2em] text-[9px] mt-2 border-t border-[#111111]/5 hover:text-[#d4af37] transition-colors"
            >
              Direct Agent Access
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-105 active:scale-95 ${
          isOpen ? 'bg-black text-white' : 'bg-emerald-500 text-white'
        }`}
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        {!isOpen && (
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#d4af37] text-white text-[10px] font-black rounded-full flex items-center justify-center animate-bounce shadow-lg">
            1
          </span>
        )}
      </button>
    </div>
  );
};

export default WhatsAppConcierge;
