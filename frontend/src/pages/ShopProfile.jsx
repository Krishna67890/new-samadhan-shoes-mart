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
import useFetch from '../hooks/useFetch';

const ShopProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);
  const [shop, setShop] = useState(null);
  const { loading, request } = useFetch();

  useEffect(() => {
    fetchShop();
  }, [id]);

  const fetchShop = async () => {
    try {
      const data = await request(`/api/shops/${id}`);
      setShop(data);
    } catch (error) {
      console.error('Error fetching shop details:', error);
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

    const message = `*NEW ELITE ORDER INQUIRY*\n\n` +
      `*Source:* New Samadhan Shoe Listing Profile\n` +
      `*Vendor:* ${shop.name}\n\n` +
      `*Client Name:* ${userName}\n` +
      `*Contact Number:* ${userPhone}\n` +
      `*Delivery Address:* ${userAddress}\n` +
      `*City:* ${userCity}\n` +
      `*Pincode:* ${userPincode}\n\n` +
      `*Product/Inquiry:* I am looking for premium footwear. Please share your UPI QR code and latest stock catalog.\n\n` +
      `_Automated by New Samadhan Shoe Mart 2026_`;

    const encodedMsg = encodeURIComponent(message);

    // Dual Shopkeeper Protocol
    window.open(`https://wa.me/919423228843?text=${encodedMsg}`, '_blank');
    setTimeout(() => {
      window.open(`https://wa.me/918888644021?text=${encodedMsg}`, '_blank');
    }, 600);
  };

  if (loading) return (
    <div className="bg-[#050505] min-h-screen flex items-center justify-center">
       <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin shadow-[0_0_30px_rgba(37,99,235,0.3)]" />
    </div>
  );

  if (!shop) return (
    <div className="bg-[#050505] min-h-screen flex items-center justify-center">
       <h1 className="text-2xl font-black text-slate-700 uppercase tracking-[0.3em] italic">Node Not Detected</h1>
    </div>
  );

  return (
    <div className="bg-[#050505] min-h-screen pt-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/5 blur-[150px] rounded-full"></div>

      {/* --- HERO GALLERY SECTION --- */}
      <div className="h-[65vh] relative overflow-hidden group mx-6 rounded-[4rem] border border-white/10 mt-10">
         <img
            src={getImageUrl(shop.images[0]) || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80'}
            alt={shop.name}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80"
         />
         <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

         <div className="absolute bottom-16 left-0 w-full">
            <div className="container mx-auto px-12">
               <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
                  <div className="space-y-6">
                     <div className="flex items-center gap-4">
                        <span className="px-5 py-2 bg-blue-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-2xl border border-blue-500/50">Verified Partner</span>
                        <div className="flex items-center gap-2 px-4 py-1.5 bg-white/5 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase tracking-widest border border-white/10">
                           <Star size={14} className="fill-blue-500 text-blue-500" /> {shop.rating || '4.8'} Elite Score
                        </div>
                     </div>
                     <h1 className="text-7xl md:text-9xl font-black text-white tracking-tighter uppercase leading-[0.8]">
                        {shop.name}
                     </h1>
                     <div className="flex flex-wrap items-center gap-8 text-slate-400 font-black text-[10px] uppercase tracking-[0.3em] italic">
                        <span className="flex items-center gap-3"><MapPin size={16} className="text-blue-500" /> {shop.city} Sector</span>
                        <span className="flex items-center gap-3"><Clock size={16} className="text-blue-500" /> Operational 0900-2200</span>
                     </div>
                  </div>

                  <div className="flex gap-6">
                     <button className="w-16 h-16 rounded-3xl bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-blue-600 transition-all border border-white/10 shadow-2xl">
                        <Heart size={24} />
                     </button>
                     <button className="w-16 h-16 rounded-3xl bg-white/5 backdrop-blur-md flex items-center justify-center text-white hover:bg-blue-600 transition-all border border-white/10 shadow-2xl">
                        <Share2 size={24} />
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* --- CONTENT GRID --- */}
      <div className="container mx-auto px-6 mt-16 relative z-10 max-w-7xl pb-24">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

            {/* --- LEFT: DETAILS --- */}
            <div className="lg:col-span-2 space-y-10">

               {/* Quick Info Bar */}
               <div className="bg-white/5 backdrop-blur-3xl rounded-[3.5rem] p-10 border border-white/10 shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-8">
                  <div className="space-y-2 text-center border-r border-white/5">
                     <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">Experience</p>
                     <p className="text-sm font-black text-white uppercase tracking-widest">12+ Years</p>
                  </div>
                  <div className="space-y-2 text-center border-r border-white/5">
                     <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">Clearance</p>
                     <p className="text-sm font-black text-white uppercase tracking-widest">Priority</p>
                  </div>
                  <div className="space-y-2 text-center border-r border-white/5">
                     <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">Channels</p>
                     <p className="text-sm font-black text-white uppercase tracking-widest">UPI/Cash</p>
                  </div>
                  <div className="space-y-2 text-center">
                     <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">Authenticity</p>
                     <p className="text-sm font-black text-emerald-500 uppercase tracking-widest">Verified</p>
                  </div>
               </div>

               {/* Description */}
               <div className="bg-white/5 backdrop-blur-3xl rounded-[3.5rem] p-12 border border-white/10 shadow-2xl space-y-8">
                  <div className="flex items-center gap-5">
                     <div className="w-12 h-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                        <Info size={24} />
                     </div>
                     <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Dealer Intel</h3>
                  </div>
                  <p className="text-slate-400 leading-relaxed font-medium text-lg italic border-l-2 border-blue-600 pl-8">
                     "{shop.description || "The premier destination for high-end artisanal footwear and the latest sneaker drops. Specializing in luxury leather collections and performance sports shoes. We provide a curated shopping experience with expert sizing consultations."}"
                  </p>
               </div>

               {/* Location / Map Placeholder */}
               <div className="bg-white/5 backdrop-blur-3xl rounded-[3.5rem] p-12 border border-white/10 shadow-2xl space-y-8 overflow-hidden">
                  <div className="flex items-center justify-between">
                     <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-2xl bg-rose-600/10 flex items-center justify-center text-rose-500 border border-rose-500/20">
                           <Map size={24} />
                        </div>
                        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Node Matrix</h3>
                     </div>
                  </div>
                  <div className="h-72 bg-white/5 rounded-[2.5rem] flex flex-col items-center justify-center space-y-6 border border-white/5 relative group cursor-crosshair">
                     <div className="absolute inset-0 bg-blue-600/5 opacity-0 group-hover:opacity-100 transition-opacity blur-3xl"></div>
                     <MapPin size={48} className="text-slate-700 group-hover:text-blue-500 transition-colors" />
                     <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] italic">{shop.address}</p>
                     <button className="bg-white text-black px-12 py-4 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-2xl z-10">Sync Coordinates</button>
                  </div>
               </div>

            </div>

            {/* --- RIGHT: SIDEBAR ACTIONS --- */}
            <div className="space-y-10">

               {/* Contact Card */}
               <div className="bg-white/5 backdrop-blur-3xl rounded-[4rem] p-12 text-white border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] sticky top-32">
                  <div className="absolute top-0 right-0 p-10 opacity-5">
                      <ShieldCheck size={140} />
                  </div>

                  <p className="text-[10px] font-black text-blue-500 uppercase tracking-[0.5em] mb-6 italic">Secure Channel</p>
                  <h3 className="text-4xl font-black tracking-tighter uppercase mb-10 leading-[0.9]">Connect <br/> with Agent</h3>

                  <div className="space-y-6 mb-12">
                     <div className="flex items-center gap-5 p-5 bg-white/5 rounded-3xl border border-white/5 hover:border-white/20 transition-all cursor-pointer group" onClick={() => window.location.href = `tel:${shop.phone}`}>
                        <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)] group-hover:scale-110 transition-transform">
                           <Phone size={24} />
                        </div>
                        <div>
                           <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1 italic">Vocal Uplink</p>
                           <p className="text-sm font-black text-white">+91 {shop.phone}</p>
                        </div>
                     </div>

                     <div className="flex items-center gap-5 p-5 bg-emerald-500/5 rounded-3xl border border-emerald-500/10 hover:border-emerald-500/30 transition-all cursor-pointer group" onClick={buyNowWhatsApp}>
                        <div className="w-14 h-14 rounded-2xl bg-emerald-600 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.3)] group-hover:scale-110 transition-transform">
                           <MessageCircle size={24} />
                        </div>
                        <div>
                           <p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest mb-1 italic">WhatsApp Elite</p>
                           <p className="text-sm font-black text-white">Encrypted Data</p>
                        </div>
                     </div>
                  </div>

                  <button
                     onClick={buyNowWhatsApp}
                     className="w-full bg-white text-black py-7 rounded-[2rem] text-xs font-black uppercase tracking-[0.3em] flex items-center justify-center gap-4 hover:bg-blue-600 hover:text-white transition-all shadow-2xl group relative overflow-hidden"
                  >
                     <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                     <Send size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                     Transmit Inquiry
                  </button>

                  <div className="mt-8 flex items-center gap-4 p-5 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-md">
                      <ShieldCheck className="text-blue-500" size={24} />
                      <p className="text-[9px] text-slate-500 font-black uppercase tracking-[0.2em] leading-relaxed italic">
                        Manual UPI verification required for elite clearance.
                      </p>
                  </div>
               </div>

            </div>

         </div>
      </div>

    </div>
  );
};

export default ShopProfile;
