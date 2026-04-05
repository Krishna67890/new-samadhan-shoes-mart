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
    const message = `*ELITE BUSINESS INQUIRY*%0A%0A` +
      `*Source:* New Samadhan Shoes Network%0A` +
      `*Target Shop:* ${shop.name}%0A` +
      `*Inquiry:* Requesting latest collection and clearance price list.%0A%0A` +
      `_Please sync latest catalogue via dual-channel protocol._`;

    // Dual-Shopkeeper Protocol Implementation
    window.open(`https://wa.me/919423228843?text=${message}`, '_blank');
    setTimeout(() => {
      window.open(`https://wa.me/918888644021?text=${message}`, '_blank');
    }, 600);
  };

  return (
    <div className="group bg-white/5 backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-2xl hover:border-blue-500/30 transition-all duration-700 overflow-hidden flex flex-col md:flex-row p-6 gap-8">

      {/* --- IMAGE NODE --- */}
      <div className="md:w-1/3 aspect-[4/3] rounded-3xl overflow-hidden relative shrink-0 border border-white/5">
        <img
          src={getImageUrl(shop.images[0]) || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80'}
          alt={shop.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {shop.isVerified && (
            <div className="bg-blue-600 text-white p-1.5 rounded-full shadow-lg">
              <BadgeCheck size={14} />
            </div>
          )}
          <div className="bg-black/80 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-black text-white uppercase tracking-widest border border-white/10 shadow-sm">
             Verified Dealer
          </div>
        </div>
      </div>

      {/* --- CONTENT NODE --- */}
      <div className="flex-grow space-y-4">
        <div className="flex justify-between items-start">
          <div>
             <h3 className="text-2xl font-black text-white tracking-tighter uppercase group-hover:text-blue-500 transition-colors">
               {shop.name}
             </h3>
             <div className="flex items-center gap-3 mt-1 text-slate-500">
               <MapPin size={12} className="text-blue-500" />
               <p className="text-[10px] font-bold uppercase tracking-widest">{shop.city} Sector</p>
             </div>
          </div>
          <div className="flex flex-col items-end">
             <div className="flex items-center gap-1 bg-blue-600/10 text-blue-500 px-3 py-1 rounded-lg border border-blue-500/20">
                <span className="text-sm font-black">{shop.rating || '4.5'}</span>
                <Star size={12} className="fill-blue-500" />
             </div>
             <p className="text-[9px] font-bold text-slate-500 mt-1 uppercase tracking-widest">{shop.numReviews || '250'} Ratings</p>
          </div>
        </div>

        <p className="text-xs font-medium text-slate-400 italic border-l-2 border-blue-600/30 pl-4 leading-relaxed">
           "{shop.description || 'Premium destination for latest sneaker drops and artisanal leather footwear in the city node.'}"
        </p>

        <div className="flex flex-wrap gap-3 py-2">
           <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-xl text-[9px] font-black text-slate-400 uppercase tracking-widest border border-white/5">
              <TrendingUp size={12} className="text-blue-500" /> Best Deals
           </div>
           <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-xl text-[9px] font-black text-slate-400 uppercase tracking-widest border border-white/5">
              <Award size={12} className="text-amber-500" /> Top Rated
           </div>
        </div>

        {/* --- ACTION ROW (ELITE STYLE) --- */}
        <div className="pt-4 flex flex-wrap items-center gap-4">
          <button
             onClick={() => window.location.href = `tel:${shop.phone}`}
             className="flex-1 min-w-[120px] bg-white text-black py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 group/btn shadow-2xl"
          >
            <Phone size={14} className="group-hover/btn:animate-bounce" /> Call Now
          </button>

          <button
             onClick={whatsappInquiry}
             className="flex-1 min-w-[120px] bg-white/5 border border-white/10 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:border-blue-600 hover:text-blue-600 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <MessageCircle size={14} /> WhatsApp Elite
          </button>

          <Link
             to={`/shop/${shop._id}`}
             className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-500 border border-white/10 hover:bg-blue-600 hover:text-white transition-all group/arrow"
          >
            <ChevronRight size={20} className="group-hover/arrow:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

    </div>

  );
};

export default ShopCard;
