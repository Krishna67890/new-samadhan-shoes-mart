import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useAuth } from '../context/AuthContext';
import { indiaData } from '../utils/indiaData';
import { Check, Camera, Loader2, Volume2, ArrowLeft, ShieldCheck, MapPin, Phone, User, Mail } from 'lucide-react';

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
      if (containerRef.current) {
        gsap.from('.identity-reveal', {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'all'
        });
      }
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
      const msg = new SpeechSynthesisUtterance("Save your address to Nashik so we know where to deliver your shoes. This locks your identity into the vault so the shopkeeper knows where to ship your shoes.");
      msg.lang = 'en-IN';
      msg.rate = 0.9;
      window.speechSynthesis.speak(msg);
    }
  };

  const handleComplete = async () => {
    setError(null);
    setUploading(true);

    // Storage Cleanup Protocol to prevent QuotaExceededError
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
      // Ensure state is saved immediately before navigation
      localStorage.setItem('ssm_user_identity', JSON.stringify({
        ...user,
        ...formData,
        phone: phoneClean,
        avatar: preview,
        identityVerified: true
      }));
      setTimeout(() => navigate('/cart'), 1500);
    } else {
      setError("Vault storage full. Please clear browser cache.");
    }
    setUploading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24 px-6 no-blur" ref={containerRef}>
      <style dangerouslySetInnerHTML={{ __html: `
        * { backdrop-filter: none !important; filter: none !important; }
        .form-input {
          width: 100%;
          padding: 1.25rem 2rem 1.25rem 3.5rem;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 1.5rem;
          font-weight: 700;
          color: #0f172a;
          outline: none;
        }
      `}} />

      <div className="max-w-2xl mx-auto bg-white rounded-[3rem] p-12 border border-slate-200 shadow-2xl relative overflow-hidden">

        {isVerified && (
          <div className="absolute inset-0 bg-white z-[100] flex flex-col items-center justify-center text-center animate-in fade-in">
             <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white mb-6 shadow-xl">
                <Check size={48} />
             </div>
             <h2 className="text-3xl font-black text-slate-900 uppercase">Identity Synced</h2>
             <p className="text-emerald-600 font-bold text-xs uppercase tracking-widest mt-2">Opening Vault...</p>
          </div>
        )}

        <div className="flex justify-between items-start mb-12 identity-reveal">
          <div>
            <h1 className="text-4xl font-black text-slate-950 uppercase tracking-tighter">Identity Sync</h1>
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mt-2">Local-First Vault Active</p>
          </div>
          <button onClick={playGuide} className="p-4 bg-slate-50 rounded-2xl text-blue-600 hover:bg-blue-600 hover:text-white transition-all">
            <Volume2 size={20} />
          </button>
        </div>

        {error && <div className="mb-8 p-4 bg-rose-50 text-rose-600 rounded-xl font-bold text-xs uppercase">{error}</div>}

        <div className="space-y-8 identity-reveal">
          <div className="flex gap-6 items-center bg-slate-50 p-6 rounded-[2rem]">
            <div className="relative">
              <div onClick={() => fileInputRef.current.click()} className="w-24 h-24 rounded-2xl bg-white border-2 border-dashed border-slate-200 flex items-center justify-center cursor-pointer overflow-hidden">
                {preview ? <img src={preview} className="w-full h-full object-cover" /> : <Camera className="text-slate-300" />}
              </div>
              <input type="file" ref={fileInputRef} className="hidden" onChange={handleImageChange} />
            </div>
            <div className="flex gap-3">
              <button onClick={() => setFormData({...formData, gender: 'boy'})} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase ${formData.gender === 'boy' ? 'bg-blue-600 text-white' : 'bg-white text-slate-400'}`}>Male</button>
              <button onClick={() => setFormData({...formData, gender: 'girl'})} className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase ${formData.gender === 'girl' ? 'bg-pink-600 text-white' : 'bg-white text-slate-400'}`}>Female</button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <input name="name" value={formData.name} onChange={handleInputChange} className="form-input" placeholder="FULL NAME" />
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            </div>
            <div className="relative">
              <input name="email" value={formData.email} onChange={handleInputChange} className="form-input" placeholder="EMAIL ADDRESS" />
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            </div>
            <div className="relative">
              <input name="phone" value={formData.phone} onChange={handleInputChange} className="form-input" placeholder="WHATSAPP NUMBER" />
              <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            </div>
            <textarea name="address" value={formData.address} onChange={handleInputChange} className="form-input min-h-[100px] !pl-6" placeholder="DELIVERY ADDRESS" />
            <div className="grid grid-cols-1 gap-4">
              <select name="state" value={formData.state} onChange={handleInputChange} className="form-input !pl-6 appearance-none">
                <option value="">SELECT STATE</option>
                {indiaData.states.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input name="city" value={formData.city} onChange={handleInputChange} className="form-input !pl-6" placeholder="CITY" />
              <input name="pincode" value={formData.pincode} onChange={handleInputChange} className="form-input !pl-6" placeholder="PINCODE" />
            </div>
          </div>

          <button
            onClick={handleComplete}
            disabled={!isFormComplete || uploading}
            className="w-full py-6 bg-slate-950 text-white rounded-2xl font-black uppercase tracking-[0.3em] text-xs hover:bg-blue-600 transition-all shadow-xl disabled:opacity-20"
          >
            {uploading ? <Loader2 className="animate-spin mx-auto" /> : "Confirm & Enter Vault"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default IdentityPage;
