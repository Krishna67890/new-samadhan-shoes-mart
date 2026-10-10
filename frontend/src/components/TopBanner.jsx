import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Sparkles, ArrowRight, Zap, ShieldCheck } from 'lucide-react';

const TopBanner = () => {
  const tickerRef = useRef(null);

  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;

    // We need to calculate the actual width to scroll
    const scrollWidth = ticker.scrollWidth / 2;

    gsap.to(ticker, {
      x: -scrollWidth,
      duration: 35, // Slower, more premium feel
      ease: "none",
      repeat: -1,
    });
  }, []);

  const offers = [
    { text: "SHOP OVER ₹999 & GET A ₹500 LUXURY VOUCHER", icon: <Zap size={14} className="text-yellow-400 fill-yellow-400" /> },
    { text: "FREE PAN-INDIA DELIVERY ON ALL PREPAID ORDERS", icon: <Sparkles size={14} className="text-blue-400" /> },
    { text: "NEW ARRIVAL: POLICE ELITE SERIES 2.0", icon: <ArrowRight size={14} className="text-emerald-400" /> },
    { text: "B2B SPECIAL: 40% OFF ON INDUSTRIAL BULK ORDERS", icon: <Zap size={14} className="text-yellow-400 fill-yellow-400" /> },
    { text: "CERTIFIED ORTHOTIC SUPPORT IN EVERY STEP", icon: <ShieldCheck size={14} className="text-blue-500" /> },
  ];

  const duplicatedOffers = [...offers, ...offers];

  return (
    <div className="fixed top-0 w-full z-[2000] bg-black h-10 flex items-center overflow-hidden border-b border-white/10 shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-black z-10 pointer-events-none opacity-50"></div>
      <div
        ref={tickerRef}
        className="flex whitespace-nowrap items-center gap-16 px-4"
      >
        {duplicatedOffers.map((offer, idx) => (
          <div key={idx} className="flex items-center gap-4 group cursor-default">
            <div className="p-1 bg-white/5 rounded group-hover:bg-white/10 transition-colors">
              {offer.icon}
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/90 group-hover:text-white transition-colors">
              {offer.text}
            </span>
            <div className="w-1.5 h-1.5 rounded-full bg-white/20"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBanner;
