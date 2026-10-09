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
    const message = `Hello New Samadhan Expert! 👋\n\nI need a professional consultation for my feet.\n\n🔍 *Concern:* ${concern}\n👟 I'm looking for specialized orthotic footwear that provides better alignment and comfort.\n\nPlease guide me with the best options available in the vault.`;
    window.open(`https://wa.me/91${targetNum}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="fixed bottom-8 right-8 z-[9999]">
      {isOpen && (
        <div
          ref={menuRef}
          className="mb-4 w-72 bg-white rounded-[2.5rem] shadow-2xl border border-[#111111]/10 overflow-hidden"
        >
          <div className="bg-[#8B0000] p-6 text-white relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <User size={20} />
              </div>
              <div>
                <h4 className="text-sm font-black uppercase tracking-widest">Product Expert</h4>
                <p className="text-[9px] text-white/70 font-bold uppercase tracking-widest flex items-center gap-1">
                  <ShieldCheck size={10} className="text-emerald-400" /> Online Now
                </p>
              </div>
            </div>
            <p className="text-[10px] font-medium leading-relaxed opacity-90 mt-2">
              "Finding the perfect fit for your specific foot condition is our heritage."
            </p>
          </div>

          <div className="p-4 space-y-2 bg-[#F7F5F0]">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 px-2">Ask about your comfort</p>
            {['Flat Feet Support', 'Plantar Fasciitis', 'Heel & Foot Comfort', 'Diabetic Care'].map((concern) => (
              <button
                key={concern}
                onClick={() => handleConsultation(concern)}
                className="w-full text-left px-4 py-3 bg-white hover:bg-[#8B0000] hover:text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all border border-[#111111]/5 shadow-sm"
              >
                {concern}
              </button>
            ))}
            <button
              onClick={() => handleConsultation('General Inquiry')}
              className="w-full px-4 py-3 text-[#8B0000] font-black uppercase tracking-[0.2em] text-[9px] mt-2 border-t border-[#111111]/5"
            >
              Chat with Expert
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
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-[#8B0000] text-white text-[10px] font-black rounded-full flex items-center justify-center animate-bounce shadow-lg">
            1
          </span>
        )}
      </button>
    </div>
  );
};

export default WhatsAppConcierge;
