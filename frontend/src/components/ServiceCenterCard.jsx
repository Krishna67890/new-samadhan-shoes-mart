import React from 'react';
import {
  Star, MapPin, Phone, MessageCircle,
  Clock, ShieldCheck, ChevronRight, Wrench
} from 'lucide-react';

const ServiceCenterCard = ({ center, onBook }) => {
  const handleWhatsApp = () => {
    const message = `Hello, I want to book a shoe repair at *${center.name}* for maintenance. Please confirm availability.`;
    window.open(`https://wa.me/${center.whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 overflow-hidden flex flex-col p-8 gap-6">

      {/* Header Info */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
             <span className="px-3 py-1 bg-blue-600 text-white text-[8px] font-black rounded-full uppercase tracking-widest">Authorized</span>
             {center.isVerified && <ShieldCheck size={14} className="text-emerald-500" />}
          </div>
          <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase group-hover:text-blue-600 transition-colors">
            {center.name}
          </h3>
        </div>
        <div className="flex flex-col items-end">
           <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-3 py-1 rounded-lg">
              <span className="text-sm font-black">{center.rating}</span>
              <Star size={12} className="fill-amber-600" />
           </div>
           <p className="text-[8px] font-bold text-slate-400 mt-1 uppercase tracking-widest">({center.numReviews} Reviews)</p>
        </div>
      </div>

      {/* Services Badges */}
      <div className="flex flex-wrap gap-2">
        {center.services.map((service, idx) => (
          <span key={idx} className="px-3 py-1 bg-slate-50 text-slate-500 rounded-full text-[9px] font-black uppercase tracking-widest border border-slate-100">
            {service}
          </span>
        ))}
      </div>

      {/* Location & Contact */}
      <div className="space-y-3 pt-2 border-t border-slate-50">
        <div className="flex items-start gap-3 text-slate-500">
          <MapPin size={16} className="text-blue-600 shrink-0 mt-0.5" />
          <p className="text-xs font-bold leading-relaxed">{center.address}, {center.city}</p>
        </div>
        <div className="flex items-center gap-3 text-emerald-500">
          <Clock size={16} />
          <p className="text-xs font-black uppercase tracking-widest">24/7 ALL TIME ACTIVE NODE</p>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 grid grid-cols-2 gap-4">
        <button
           onClick={() => window.location.href = `tel:${center.phone}`}
           className="bg-slate-950 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all flex items-center justify-center gap-2 group/btn"
        >
          <Phone size={14} className="group-hover/btn:animate-bounce" /> Call Node
        </button>

        <button
           onClick={handleWhatsApp}
           className="bg-emerald-500 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all flex items-center justify-center gap-2"
        >
          <MessageCircle size={14} /> WhatsApp
        </button>

        <button
          onClick={() => onBook(center)}
          className="col-span-2 py-4 border-2 border-slate-100 text-slate-900 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:border-blue-600 hover:text-blue-600 transition-all flex items-center justify-center gap-2"
        >
          <Wrench size={14} /> Book Service Protocol
        </button>
      </div>
    </div>
  );
};

export default ServiceCenterCard;
