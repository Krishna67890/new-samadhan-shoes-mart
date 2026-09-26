import React from 'react';
import {
  Star, MapPin, Phone, MessageCircle,
  Clock, ShieldCheck, ChevronRight, Wrench
} from 'lucide-react';

const ServiceCenterCard = ({ center, onBook }) => {
  const handleWhatsApp = () => {
    const message = `*ELITE MAINTENANCE PROTOCOL*\n\nNode: ${center.name}\n\nI want to book a professional shoe restoration. Please confirm availability for my footwear collection.`;
    window.location.href = `https://wa.me/${center.whatsappNumber}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div className="group bg-white rounded-[2.5rem] border border-[#111111]/5 shadow-[0_40px_80px_rgba(0,0,0,0.02)] hover:border-[#8B0000]/20 transition-all duration-700 overflow-hidden flex flex-col p-8 gap-6">

      {/* Header Info */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
             <span className="px-3 py-1 bg-[#8B0000] text-white text-[8px] font-bold rounded-full uppercase tracking-widest shadow-sm">Authorized Node</span>
             {center.isVerified && <ShieldCheck size={14} className="text-[#8B0000]" />}
          </div>
          <h3 className="text-3xl font-editorial font-black text-[#111111] tracking-tighter uppercase group-hover:text-[#8B0000] transition-colors leading-none">
            {center.name}
          </h3>
        </div>
        <div className="flex flex-col items-end">
           <div className="flex items-center gap-1.5 bg-[#8B0000]/5 text-[#8B0000] px-3 py-1.5 rounded-xl border border-[#8B0000]/10">
              <span className="text-sm font-black tracking-tighter">{center.rating}</span>
              <Star size={12} className="fill-[#8B0000]" />
           </div>
           <p className="text-[8px] font-bold text-[#111111]/30 mt-1 uppercase tracking-widest">{center.numReviews} Reviews</p>
        </div>
      </div>

      {/* Services Badges */}
      <div className="flex flex-wrap gap-2">
        {center.services.map((service, idx) => (
          <span key={idx} className="px-3 py-1 bg-[#F7F5F0] text-[#111111]/50 rounded-full text-[9px] font-bold uppercase tracking-widest border border-[#111111]/5">
            {service}
          </span>
        ))}
      </div>

      {/* Location & Contact */}
      <div className="space-y-3 pt-4 border-t border-[#111111]/5">
        <div className="flex items-start gap-3 text-[#111111]/60">
          <MapPin size={16} className="text-[#8B0000] shrink-0 mt-0.5" />
          <p className="text-xs font-bold leading-relaxed uppercase tracking-tight">{center.address}, {center.city}</p>
        </div>
        <div className="flex items-center gap-3 text-emerald-600">
          <Clock size={16} />
          <p className="text-[9px] font-black uppercase tracking-[0.2em]">Operational Network: Active</p>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-2 grid grid-cols-2 gap-4">
        <button
           onClick={() => window.location.href = `tel:${center.phone}`}
           className="bg-[#111111] text-white py-4.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#8B0000] transition-all flex items-center justify-center gap-2 shadow-md"
        >
          <Phone size={14} /> Call Agent
        </button>

        <button
           onClick={handleWhatsApp}
           className="bg-white border border-[#111111]/10 text-[#111111] py-4.5 rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:border-[#8B0000] hover:text-[#8B0000] transition-all flex items-center justify-center gap-2"
        >
          <MessageCircle size={14} /> WhatsApp
        </button>

        <button
          onClick={() => onBook(center)}
          className="col-span-2 py-4.5 bg-[#F7F5F0] border border-[#111111]/5 text-[#111111] rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#111111] hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <Wrench size={14} /> Initiate Restoration Protocol
        </button>
      </div>
    </div>
  );
};

export default ServiceCenterCard;
