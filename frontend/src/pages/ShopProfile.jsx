import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import {
  Star, MapPin, Phone, MessageCircle,
  Clock, CheckCircle2, ShieldCheck,
  Map, Camera, Heart, Share2,
  Info, TrendingUp, Sparkles, Send
} from 'lucide-react';
import { getImageUrl } from '../utils/imagePath';

const ShopProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);
  const [shop, setShop] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShop();
  }, [id]);

  const fetchShop = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/shops/${id}`);
      const data = await response.json();
      setShop(data);
    } catch (error) {
      console.error('Error fetching shop details:', error);
    } finally {
      setLoading(false);
    }
  };

  const buyNowWhatsApp = () => {
    if (!isAuthenticated) {
      sessionStorage.setItem('redirectAfterLogin', `/shop/${id}`);
      navigate('/login');
      return;
    }
    const userName = user ? user.name : 'Elite Guest';
    const userPhone = user?.phone || 'Not Provided';
    const userAddress = user?.address || 'Not Provided';
    const userCity = user?.city || 'Not Provided';
    const userPincode = user?.pincode || 'Not Provided';

    const message = `*NEW ELITE ORDER INQUIRY*%0A%0A` +
      `*Source:* New Samadhan Shoes Listing Profile%0A` +
      `*Vendor:* ${shop.name}%0A%0A` +
      `*Client Name:* ${userName}%0A` +
      `*Contact Number:* ${userPhone}%0A` +
      `*Delivery Address:* ${userAddress}%0A` +
      `*City:* ${userCity}%0A` +
      `*Pincode:* ${userPincode}%0A%0A` +
      `*Product/Inquiry:* I am looking for premium footwear. Please share your UPI QR code and latest stock catalog.%0A%0A` +
      `_Automated by New Samadhan Shoes Mart 2026_`;

    window.open(`https://wa.me/${shop.whatsappNumber}?text=${message}`, '_blank');
  };

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
       <div className="w-12 h-12 border-4 border-slate-900 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!shop) return (
    <div className="min-h-screen flex items-center justify-center">
       <h1 className="text-2xl font-black text-slate-300 uppercase tracking-widest">Shop Node Not Found</h1>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">

      {/* --- HERO GALLERY SECTION --- */}
      <div className="h-[60vh] relative overflow-hidden group">
         <img
            src={getImageUrl(shop.images[0]) || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80'}
            alt={shop.name}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

         <div className="absolute bottom-12 left-0 w-full">
            <div className="container mx-auto px-6 max-w-6xl">
               <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                  <div className="space-y-4">
                     <div className="flex items-center gap-3">
                        <span className="px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg">Verified Dealer</span>
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-white/10 rounded-full text-white text-[10px] font-black uppercase tracking-widest">
                           <Star size={12} className="fill-amber-400 text-amber-400" /> {shop.rating || '4.8'}
                        </div>
                     </div>
                     <h1 className="text-6xl font-black text-white tracking-tighter uppercase leading-none drop-shadow-2xl">
                        {shop.name}
                     </h1>
                     <div className="flex items-center gap-6 text-slate-300 font-bold text-xs uppercase tracking-widest">
                        <span className="flex items-center gap-2"><MapPin size={14} className="text-blue-500" /> {shop.city} Node</span>
                        <span className="flex items-center gap-2"><Clock size={14} className="text-blue-500" /> Open 9:00 AM - 10:00 PM</span>
                     </div>
                  </div>

                  <div className="flex gap-4">
                     <button className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-slate-950 transition-all border border-white/20">
                        <Heart size={20} />
                     </button>
                     <button className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-slate-950 transition-all border border-white/20">
                        <Share2 size={20} />
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* --- CONTENT GRID --- */}
      <div className="container mx-auto px-6 -mt-12 relative z-10 max-w-6xl pb-24">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* --- LEFT: DETAILS --- */}
            <div className="lg:col-span-2 space-y-8">

               {/* Quick Info Bar */}
               <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl shadow-slate-200 border border-slate-100 grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="space-y-1 text-center border-r border-slate-100">
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Experience</p>
                     <p className="text-sm font-black text-slate-900">12+ Years</p>
                  </div>
                  <div className="space-y-1 text-center border-r border-slate-100">
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Delivery</p>
                     <p className="text-sm font-black text-slate-900">Same Day</p>
                  </div>
                  <div className="space-y-1 text-center border-r border-slate-100">
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Payment</p>
                     <p className="text-sm font-black text-slate-900">UPI/Cash</p>
                  </div>
                  <div className="space-y-1 text-center">
                     <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">GSTIN</p>
                     <p className="text-sm font-black text-emerald-600">Verified</p>
                  </div>
               </div>

               {/* Description */}
               <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200 border border-slate-100 space-y-6">
                  <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                        <Info size={20} />
                     </div>
                     <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Dealer Identity</h3>
                  </div>
                  <p className="text-slate-500 leading-relaxed font-medium">
                     {shop.description || "The premier destination for high-end artisanal footwear and the latest sneaker drops. Specializing in luxury leather collections and performance sports shoes. We provide a curated shopping experience with expert sizing consultations and nationwide delivery nodes."}
                  </p>
               </div>

               {/* Location / Map Placeholder */}
               <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl shadow-slate-200 border border-slate-100 space-y-6 overflow-hidden">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600">
                           <Map size={20} />
                        </div>
                        <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Location Matrix</h3>
                     </div>
                  </div>
                  <div className="h-64 bg-slate-100 rounded-[2rem] flex flex-col items-center justify-center space-y-4 border-2 border-dashed border-slate-200">
                     <MapPin size={32} className="text-slate-300" />
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{shop.address}</p>
                     <button className="bg-slate-950 text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all">Get Directions</button>
                  </div>
               </div>

            </div>

            {/* --- RIGHT: SIDEBAR ACTIONS --- */}
            <div className="space-y-8">

               {/* Contact Card */}
               <div className="bg-slate-950 rounded-[3rem] p-10 text-white shadow-2xl shadow-blue-200 sticky top-32">
                  <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.4em] mb-4">Elite Inquiry</p>
                  <h3 className="text-3xl font-black tracking-tighter uppercase mb-8 leading-none">Connect with Dealer</h3>

                  <div className="space-y-6 mb-10">
                     <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer group" onClick={() => window.location.href = `tel:${shop.phone}`}>
                        <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                           <Phone size={20} />
                        </div>
                        <div>
                           <p className="text-[8px] font-black text-blue-400 uppercase tracking-widest">Instant Call</p>
                           <p className="text-sm font-black">+91 {shop.phone}</p>
                        </div>
                     </div>

                     <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all cursor-pointer group" onClick={buyNowWhatsApp}>
                        <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                           <MessageCircle size={20} />
                        </div>
                        <div>
                           <p className="text-[8px] font-black text-emerald-400 uppercase tracking-widest">WhatsApp Business</p>
                           <p className="text-sm font-black">Secure Inquiry</p>
                        </div>
                     </div>
                  </div>

                  <button
                     onClick={buyNowWhatsApp}
                     className="w-full bg-white text-slate-950 py-6 rounded-3xl text-xs font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-blue-600 hover:text-white transition-all shadow-2xl group/elite"
                  >
                     <Send size={16} className="group-hover/elite:-translate-y-1 group-hover/elite:translate-x-1 transition-transform" />
                     Elite Inquiry
                  </button>

                  <p className="text-[9px] font-bold text-slate-500 text-center mt-6 uppercase tracking-widest leading-relaxed">
                     Your details (Name, Address) will be shared automatically for manual UPI processing.
                  </p>
               </div>

            </div>

         </div>
      </div>

    </div>
  );
};

export default ShopProfile;
