import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useAuth } from '../context/AuthContext';
import { indiaData } from '../utils/indiaData';
import {
  Check,
  Camera,
  Loader2,
  Volume2,
  ArrowLeft,
  ShieldCheck,
  MapPin,
  Phone,
  User,
  Mail,
  Zap,
  Info
} from 'lucide-react';

const IdentityPage = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name && user.name !== 'Elite Guest' ? user.name : '',
    email: user?.email && user.email !== 'guest@samadhan.com' ? user.email : '',
    gender: user?.gender || null,
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || 'Nashik',
    state: user?.state || 'Maharashtra',
    pincode: user?.pincode || '',
  });

  const [preview, setPreview] = useState(user?.avatar || null);
  const [uploading, setUploading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState(null);

  const containerRef = useRef(null);
  const fileInputRef = useRef(null);

  const isStep1Complete = !!formData.gender || !!preview;
  const isStep2Complete = !!(formData.name && formData.email && formData.phone && formData.phone.replace(/\s/g, '').length >= 10);
  const isStep3Complete = !!(formData.address && formData.city && formData.state && formData.pincode && formData.pincode.length === 6);
  const isFormComplete = isStep1Complete && isStep2Complete && isStep3Complete;

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from('.identity-reveal', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, [user, navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const playGuide = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance("Identity synchronization required. Secure your delivery destination and contact details within the vault to unlock the high-tier catalog.");
      msg.lang = 'en-IN';
      msg.rate = 0.95;
      window.speechSynthesis.speak(msg);
    }
  };

  const handleComplete = async () => {
    setError(null);
    setUploading(true);

    try {
      const keysToKeep = ['ssm_user_identity', 'cartItems', 'token'];
      Object.keys(localStorage).forEach(key => {
        if (!keysToKeep.includes(key)) localStorage.removeItem(key);
      });
      localStorage.removeItem('gsap_cache');
      sessionStorage.clear();
    } catch (e) { console.warn("Vault Cleanup failed"); }

    const phoneClean = formData.phone.replace(/\s/g, '').replace('+91', '');

    const success = updateProfile({
      ...formData,
      phone: phoneClean,
      avatar: preview,
      identityVerified: true
    });

    if (success) {
      setIsVerified(true);
      setTimeout(() => navigate('/products'), 2000);
    } else {
      setError("Vault encryption error. Storage quota exceeded.");
    }
    setUploading(false);
  };

  return (
    <div className="bg-[#050505] min-h-screen pt-32 pb-24 px-6 relative overflow-hidden" ref={containerRef}>
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full"></div>

      <div className="max-w-4xl mx-auto relative z-10">

        {isVerified && (
          <div className="fixed inset-0 bg-[#050505] z-[100] flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
             <div className="w-32 h-32 bg-blue-600 rounded-[3rem] flex items-center justify-center text-white mb-10 shadow-[0_0_50px_rgba(37,99,235,0.4)] border border-blue-400/50">
                <Check size={56} strokeWidth={3} />
             </div>
             <h2 className="text-5xl font-black text-white uppercase tracking-tighter">Identity Synced</h2>
             <p className="text-blue-500 font-black text-[10px] uppercase tracking-[0.6em] mt-6 italic animate-pulse">Accessing Vault Content...</p>
          </div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-16 identity-reveal">
           <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                 <ShieldCheck size={32} />
              </div>
              <div>
                 <h1 className="text-5xl font-black text-white uppercase tracking-tighter leading-none">Identity Sync</h1>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mt-2 italic">Secured Local Encryption</p>
              </div>
           </div>
           <button
             onClick={playGuide}
             className="px-8 py-4 bg-white/5 rounded-2xl text-blue-500 hover:bg-blue-600 hover:text-white transition-all border border-white/5 backdrop-blur-md flex items-center gap-4 text-[10px] font-black uppercase tracking-widest"
           >
             <Volume2 size={18} /> Audio Protocol
           </button>
        </div>

        {error && (
          <div className="mb-10 p-6 bg-rose-500/10 border border-rose-500/20 text-rose-500 rounded-[2rem] font-black text-[10px] uppercase tracking-widest flex items-center gap-4">
            <Info size={18} /> {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* LEFT: VISUALS & GENDER */}
          <div className="lg:col-span-4 space-y-8 identity-reveal">
             <div className="bg-white/5 backdrop-blur-3xl p-10 rounded-[4rem] border border-white/10 shadow-2xl flex flex-col items-center">
                <div
                  onClick={() => fileInputRef.current.click()}
                  className="w-48 h-48 rounded-[3rem] bg-[#111] border-2 border-dashed border-white/10 flex items-center justify-center cursor-pointer overflow-hidden group hover:border-blue-500/50 transition-all mb-10 relative"
                >
                  {preview ? (
                    <img src={preview} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" alt="Avatar" />
                  ) : (
                    <Camera className="text-slate-700 group-hover:text-blue-500 transition-colors" size={48} />
                  )}
                  <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <span className="text-[9px] font-black text-white uppercase tracking-widest">Update Image</span>
                  </div>
                </div>
                <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageChange} accept="image/*" />

                <div className="grid grid-cols-2 gap-4 w-full">
                  <button
                    onClick={() => setFormData({...formData, gender: 'boy'})}
                    className={`py-5 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all ${formData.gender === 'boy' ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' : 'bg-white/5 text-slate-500 hover:bg-white/10 border border-white/5'}`}
                  >
                    Masculine
                  </button>
                  <button
                    onClick={() => setFormData({...formData, gender: 'girl'})}
                    className={`py-5 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all ${formData.gender === 'girl' ? 'bg-rose-600 text-white shadow-xl shadow-rose-500/20' : 'bg-white/5 text-slate-500 hover:bg-white/10 border border-white/5'}`}
                  >
                    Feminine
                  </button>
                </div>
             </div>

             <div className="bg-blue-600/5 backdrop-blur-md p-8 rounded-[2.5rem] border border-blue-500/10">
                <div className="flex items-center gap-4 text-blue-500 mb-4">
                   <Zap size={20} />
                   <span className="text-[10px] font-black uppercase tracking-widest">Security Protocol</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed font-bold italic">
                  Data is stored locally on your device's Elite Vault. No identity information is transmitted to external servers without encryption.
                </p>
             </div>
          </div>

          {/* RIGHT: DATA FORM */}
          <div className="lg:col-span-8 space-y-8 identity-reveal">
            <div className="bg-white/5 backdrop-blur-3xl p-12 rounded-[4rem] border border-white/10 shadow-2xl">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                  <div className="space-y-4">
                     <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-6">Legal Designation</label>
                     <div className="relative">
                        <input name="name" value={formData.name} onChange={handleInputChange} className="w-full pl-16 pr-8 py-6 bg-white/5 rounded-[2rem] font-black text-white outline-none focus:bg-white/10 border border-white/5 focus:border-blue-500/50 transition-all" placeholder="FULL NAME" />
                        <User className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                     </div>
                  </div>
                  <div className="space-y-4">
                     <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-6">Encryption Email</label>
                     <div className="relative">
                        <input name="email" value={formData.email} onChange={handleInputChange} className="w-full pl-16 pr-8 py-6 bg-white/5 rounded-[2rem] font-black text-white outline-none focus:bg-white/10 border border-white/5 focus:border-blue-500/50 transition-all" placeholder="EMAIL ADDRESS" />
                        <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                     </div>
                  </div>
               </div>

               <div className="space-y-4 mb-10">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-6">WhatsApp Sync Number</label>
                  <div className="relative">
                     <input name="phone" value={formData.phone} onChange={handleInputChange} className="w-full pl-16 pr-8 py-6 bg-white/5 rounded-[2rem] font-black text-white outline-none focus:bg-white/10 border border-white/5 focus:border-blue-500/50 transition-all" placeholder="10 DIGIT MOBILE" />
                     <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  </div>
               </div>

               <div className="space-y-4 mb-10">
                  <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-6">Shipping Coordinates</label>
                  <div className="relative">
                     <textarea name="address" value={formData.address} onChange={handleInputChange} className="w-full pl-16 pr-8 py-6 bg-white/5 rounded-[2rem] font-black text-white outline-none focus:bg-white/10 border border-white/5 focus:border-blue-500/50 transition-all min-h-[120px]" placeholder="STREET ADDRESS, AREA, LANDMARK" />
                     <MapPin className="absolute left-6 top-8 text-slate-500" size={18} />
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  <div className="space-y-4">
                     <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-6">State</label>
                     <select name="state" value={formData.state} onChange={handleInputChange} className="w-full px-8 py-6 bg-white/5 rounded-[2rem] font-black text-white outline-none focus:bg-white/10 border border-white/5 focus:border-blue-500/50 transition-all appearance-none cursor-pointer">
                        <option value="" className="bg-[#111]">SELECT STATE</option>
                        {indiaData.states.map(s => <option key={s} value={s} className="bg-[#111]">{s}</option>)}
                     </select>
                  </div>
                  <div className="space-y-4">
                     <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-6">City</label>
                     <input name="city" value={formData.city} onChange={handleInputChange} className="w-full px-8 py-6 bg-white/5 rounded-[2rem] font-black text-white outline-none focus:bg-white/10 border border-white/5 focus:border-blue-500/50 transition-all" placeholder="CITY" />
                  </div>
                  <div className="space-y-4">
                     <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-6">Pincode</label>
                     <input name="pincode" value={formData.pincode} onChange={handleInputChange} className="w-full px-8 py-6 bg-white/5 rounded-[2rem] font-black text-white outline-none focus:bg-white/10 border border-white/5 focus:border-blue-500/50 transition-all" placeholder="6 DIGITS" />
                  </div>
               </div>

               <button
                 onClick={handleComplete}
                 disabled={!isFormComplete || uploading}
                 className="w-full py-7 bg-white text-black rounded-[2rem] font-black uppercase tracking-[0.4em] text-[11px] hover:bg-blue-600 hover:text-white transition-all shadow-2xl disabled:opacity-20 flex items-center justify-center gap-6 relative overflow-hidden group"
               >
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                 {uploading ? <Loader2 className="animate-spin" /> : <>Commit to Vault <ArrowLeft className="rotate-180" size={20} /></>}
               </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default IdentityPage;
