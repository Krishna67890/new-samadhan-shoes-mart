import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import {
  Star, MapPin, Phone, MessageCircle,
  ChevronRight, BadgeCheck, Share2,
  TrendingUp, Award, Calendar
} from 'lucide-react';
import { getImageUrl } from '../../utils/imagePath';

const ShopCard = ({ shop }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const whatsappInquiry = () => {
    if (!isAuthenticated) {
      sessionStorage.setItem('redirectAfterLogin', `/shop/${shop._id}`);
      navigate('/login');
      return;
    }
    const message = `*ELITE BUSINESS INQUIRY*\n\n` +
      `*Source:* New Samadhan Shoes Network\n` +
      `*Target Shop:* ${shop.name}\n` +
      `*Inquiry:* Requesting latest collection and clearance price list.\n\n` +
      `_Please sync latest catalogue via dual-channel protocol._`;

    const encodedMsg = encodeURIComponent(message);
    // Dual-Shopkeeper Protocol Implementation
    window.open(`https://wa.me/919423228843?text=${encodedMsg}`, '_blank');
    setTimeout(() => {
      window.open(`https://wa.me/918888644021?text=${encodedMsg}`, '_blank');
    }, 600);
  };

  return (
    <div className="group bg-white rounded-[2.5rem] border border-[#111111]/5 shadow-[0_40px_80px_rgba(0,0,0,0.02)] hover:border-[#8B0000]/20 transition-all duration-700 overflow-hidden flex flex-col md:flex-row p-6 gap-8">

      {/* --- IMAGE NODE --- */}
      <div className="md:w-1/3 aspect-[4/3] rounded-3xl overflow-hidden relative shrink-0 border border-[#111111]/5 bg-[#F7F5F0] flex items-center justify-center">
        <img
          src={getImageUrl(shop.images[0]) || '/Shoes.png'}
          alt={shop.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {shop.isVerified && (
            <div className="bg-[#8B0000] text-white p-1.5 rounded-full shadow-lg w-fit">
              <BadgeCheck size={14} />
            </div>
          )}
          <div className="bg-white/95 px-3 py-1 rounded-full text-[8px] font-bold text-[#111111] uppercase tracking-widest border border-[#111111]/5 shadow-sm">
             Verified Dealer
          </div>
        </div>
      </div>

      {/* --- CONTENT NODE --- */}
      <div className="flex-grow space-y-4">
        <div className="flex justify-between items-start">
          <div>
             <h3 className="text-3xl font-editorial font-black text-[#111111] tracking-tighter uppercase group-hover:text-[#8B0000] transition-colors leading-none">
               {shop.name}
             </h3>
             <div className="flex items-center gap-3 mt-2 text-[#111111]/40">
               <MapPin size={12} className="text-[#8B0000]" />
               <p className="text-[9px] font-bold uppercase tracking-widest">{shop.city} Sector</p>
             </div>
          </div>
          <div className="flex flex-col items-end">
             <div className="flex items-center gap-1.5 bg-[#8B0000]/5 text-[#8B0000] px-3 py-1.5 rounded-xl border border-[#8B0000]/10">
                <span className="text-sm font-black tracking-tighter">{shop.rating || '4.8'}</span>
                <Star size={12} className="fill-[#8B0000]" />
             </div>
             <p className="text-[8px] font-bold text-[#111111]/30 mt-1 uppercase tracking-widest">{shop.numReviews || '250'} Feedbacks</p>
          </div>
        </div>

        <p className="text-sm font-medium text-[#111111]/60 italic border-l-2 border-[#8B0000]/30 pl-5 leading-relaxed">
           "{shop.description || 'Premium destination for latest sneaker drops and artisanal leather footwear in the city node.'}"
        </p>

        <div className="flex flex-wrap gap-3 py-2">
           <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F7F5F0] rounded-xl text-[9px] font-bold text-[#111111]/40 uppercase tracking-widest border border-[#111111]/5">
              <TrendingUp size={12} className="text-[#8B0000]" /> Exclusive Drops
           </div>
           <div className="flex items-center gap-2 px-3 py-1.5 bg-[#F7F5F0] rounded-xl text-[9px] font-bold text-[#111111]/40 uppercase tracking-widest border border-[#111111]/5">
              <Award size={12} className="text-[#8B0000]" /> Elite Partner
           </div>
        </div>

        {/* --- ACTION ROW --- */}
        <div className="pt-4 flex flex-wrap items-center gap-4">
          <button
             onClick={() => window.location.href = `tel:${shop.phone}`}
             className="flex-1 min-w-[140px] bg-[#111111] text-white py-5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#8B0000] transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            <Phone size={14} /> Call Agent
          </button>

          <button
             onClick={whatsappInquiry}
             className="flex-1 min-w-[140px] bg-white border border-[#111111]/10 text-[#111111] py-5 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] hover:border-[#8B0000] hover:text-[#8B0000] transition-all flex items-center justify-center gap-2"
          >
            <MessageCircle size={14} /> WhatsApp
          </button>

          <Link
             to={`/shop/${shop._id}`}
             className="w-14 h-14 bg-[#F7F5F0] rounded-2xl flex items-center justify-center text-[#111111]/40 border border-[#111111]/5 hover:bg-[#111111] hover:text-white transition-all group/arrow"
          >
            <ChevronRight size={20} className="group-hover/arrow:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

    </div>
  );
};

export default ShopCard;
