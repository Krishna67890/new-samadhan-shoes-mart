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
    const message = `*BUSINESS INQUIRY (JUSTDIAL STYLE)*%0A%0A` +
      `*Source:* New Samadhan Shoes Mart Listing%0A` +
      `*Target Shop:* ${shop.name}%0A` +
      `*Inquiry:* I want shoes details and available offers.%0A%0A` +
      `_Please share your latest collection catalogue._`;
    window.open(`https://wa.me/${shop.whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="group bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 overflow-hidden flex flex-col md:flex-row p-6 gap-8">

      {/* --- IMAGE NODE --- */}
      <div className="md:w-1/3 aspect-[4/3] rounded-3xl overflow-hidden relative shrink-0">
        <img
          src={getImageUrl(shop.images[0]) || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80'}
          alt={shop.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          {shop.isVerified && (
            <div className="bg-blue-600 text-white p-1.5 rounded-full shadow-lg">
              <BadgeCheck size={14} />
            </div>
          )}
          <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[8px] font-black text-slate-900 uppercase tracking-widest shadow-sm">
             Verified Dealer
          </div>
        </div>
      </div>

      {/* --- CONTENT NODE --- */}
      <div className="flex-grow space-y-4">
        <div className="flex justify-between items-start">
          <div>
             <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase group-hover:text-blue-600 transition-colors">
               {shop.name}
             </h3>
             <div className="flex items-center gap-3 mt-1 text-slate-400">
               <MapPin size={12} className="text-blue-500" />
               <p className="text-[10px] font-bold uppercase tracking-widest">{shop.city}</p>
             </div>
          </div>
          <div className="flex flex-col items-end">
             <div className="flex items-center gap-1 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-lg">
                <span className="text-sm font-black">{shop.rating || '4.5'}</span>
                <Star size={12} className="fill-emerald-600" />
             </div>
             <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{shop.numReviews || '250'} Ratings</p>
          </div>
        </div>

        <p className="text-xs font-medium text-slate-500 italic border-l-2 border-slate-100 pl-4 leading-relaxed">
           "{shop.description || 'Premium destination for latest sneaker drops and artisanal leather footwear in the city node.'}"
        </p>

        <div className="flex flex-wrap gap-3 py-2">
           <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-xl text-[9px] font-black text-slate-600 uppercase tracking-widest border border-slate-100">
              <TrendingUp size={12} className="text-blue-500" /> Best Deals
           </div>
           <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-xl text-[9px] font-black text-slate-600 uppercase tracking-widest border border-slate-100">
              <Award size={12} className="text-amber-500" /> Top Rated
           </div>
        </div>

        {/* --- ACTION ROW (JUSTDIAL STYLE) --- */}
        <div className="pt-4 flex flex-wrap items-center gap-4">
          <button
             onClick={() => window.location.href = `tel:${shop.phone}`}
             className="flex-1 min-w-[120px] bg-slate-950 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-600 transition-all flex items-center justify-center gap-2 group/btn shadow-xl shadow-slate-200"
          >
            <Phone size={14} className="group-hover/btn:animate-bounce" /> Call Now
          </button>

          <button
             onClick={whatsappInquiry}
             className="flex-1 min-w-[120px] bg-white border-2 border-slate-100 text-slate-900 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:border-blue-600 hover:text-blue-600 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <MessageCircle size={14} /> WhatsApp
          </button>

          <Link
             to={`/shop/${shop._id}`}
             className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all group/arrow"
          >
            <ChevronRight size={20} className="group-hover/arrow:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

    </div>
  );
};

export default ShopCard;
