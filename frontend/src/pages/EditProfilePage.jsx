import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { Camera, Save, ArrowLeft, Loader2, ShieldCheck, Mail, Phone, MapPin, Lock, User, ShieldAlert, Volume2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { indiaData } from '../utils/indiaData';

const EditProfilePage = () => {
  const { user, updateProfile } = useAuth();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || 'Nashik',
    state: user?.state || 'Maharashtra',
    pincode: user?.pincode || '',
  });

  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user) return navigate('/login');

    // GSAP Reveal
    const ctx = gsap.context(() => {
      gsap.from('.profile-reveal', {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
      });
    }, containerRef);

    return () => ctx.revert();
  }, [user, navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const playEliteGuide = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const intro = new SpeechSynthesisUtterance(
        "Identity Sync active. Please confirm your details. Your address in Nashik will be saved locally to your device. Once saved, you can unlock the vault and message our shopkeeper at 88 88 64 40 21."
      );
      intro.lang = 'en-IN';
      intro.rate = 0.9;
      window.speechSynthesis.speak(intro);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    // Strict Phone & Pincode Validation
    const phoneClean = formData.phone.replace(/\s/g, '').replace('+91', '');
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phoneClean)) {
      setError('Identity Rejected: WhatsApp number must be exactly 10 digits.');
      setLoading(false);
      return;
    }

    const pinRegex = /^[0-9]{6}$/;
    if (!pinRegex.test(formData.pincode)) {
      setError('Identity Rejected: Pincode must be exactly 6 digits.');
      setLoading(false);
      return;
    }

    // Local-First Save
    const successSave = updateProfile({
        ...formData,
        phone: phoneClean,
        identityVerified: true
    });

    if (successSave) {
        setSuccess('Identity Synced to Local Vault!');
        setTimeout(() => {
            navigate('/cart');
        }, 1500);
    } else {
        setError('Vault Sync Failed');
        setLoading(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-24 px-6 overflow-hidden no-blur" ref={containerRef}>
      <style dangerouslySetInnerHTML={{ __html: `
        * { backdrop-filter: none !important; -webkit-backdrop-filter: none !important; filter: none !important; }
        .form-input {
          width: 100%;
          padding: 1.25rem 2rem 1.25rem 3.5rem;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 1.5rem;
          font-weight: 700;
          color: #0f172a;
          outline: none;
          transition: all 0.3s;
        }
        .form-input:focus {
          border-color: #2563eb;
          box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
        }
        .input-icon {
          position: absolute;
          left: 1.25rem;
          top: 50%;
          transform: translateY(-50%);
          color: #64748b;
        }
        .label-text {
          color: #475569;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          font-size: 10px;
          margin-left: 1rem;
          margin-bottom: 0.5rem;
          display: block;
        }
      `}} />

      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-12 profile-reveal">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors">
            <ArrowLeft size={20} /> <span className="text-[10px] font-black uppercase tracking-widest">Return</span>
          </button>
          <div className="text-right">
            <h1 className="text-4xl font-black text-slate-950 tracking-tighter uppercase">Identity Sync</h1>
            <button onClick={playEliteGuide} className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest mt-2 ml-auto">
                <Volume2 size={14} /> AI Voice Guide
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 space-y-8 profile-reveal">
            <div className="bg-white rounded-[3.5rem] p-10 border border-slate-200 shadow-xl flex flex-col items-center">
              <div className="w-48 h-48 rounded-[3rem] overflow-hidden border-8 border-slate-50 shadow-inner bg-slate-100">
                <img src={avatarPreview || 'https://cdn-icons-png.flaticon.com/512/4140/4140048.png'} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <h3 className="mt-8 text-xl font-black text-slate-950 tracking-tighter uppercase">{formData.name || 'ANONYMOUS'}</h3>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2">LOCAL IDENTITY VAULT</p>
            </div>

            <div className="bg-slate-950 rounded-[3rem] p-8 text-white">
              <div className="flex items-center gap-3 mb-4">
                <ShieldCheck size={16} className="text-emerald-400" />
                <span className="text-[9px] font-black uppercase tracking-widest">Vercel Local-First Logic</span>
              </div>
              <p className="text-xs font-medium text-slate-400 leading-relaxed italic">"Data is stored in your personal browser vault. Zero-Blur technology ensures 100% legibility."</p>
            </div>
          </div>

          <div className="lg:col-span-8 bg-white p-12 rounded-[4rem] border border-slate-200 shadow-2xl profile-reveal">
            {success && <div className="mb-8 p-6 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-[2rem] text-sm font-bold flex items-center gap-4">
              <ShieldCheck /> {success}
            </div>}
            {error && <div className="mb-8 p-6 bg-rose-50 border border-rose-100 text-rose-700 rounded-[2rem] text-sm font-bold flex items-center gap-4">
              <ShieldAlert /> {error}
            </div>}

            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="label-text">Full Name</label>
                  <div className="relative">
                    <input name="name" value={formData.name} onChange={handleInputChange} type="text" className="form-input" placeholder="Krishna Patil Rajput" required />
                    <User className="input-icon" size={18} />
                  </div>
                </div>
                <div>
                  <label className="label-text">WhatsApp Number</label>
                  <div className="relative">
                    <input name="phone" value={formData.phone} onChange={handleInputChange} type="tel" className="form-input" placeholder="8888888888" required />
                    <Phone className="input-icon" size={18} />
                  </div>
                </div>
              </div>

              <div>
                <label className="label-text">Physical Address</label>
                <div className="relative">
                  <input name="address" value={formData.address} onChange={handleInputChange} type="text" className="form-input" placeholder="Building, Street, Landmark" required />
                  <MapPin className="input-icon" size={18} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <label className="label-text">State</label>
                  <select name="state" value={formData.state} onChange={handleInputChange} className="form-input appearance-none">
                    {indiaData.states.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="label-text">City</label>
                  <input name="city" value={formData.city} onChange={handleInputChange} type="text" className="form-input" placeholder="Nashik" required />
                </div>
                <div>
                  <label className="label-text">Pincode</label>
                  <input name="pincode" value={formData.pincode} onChange={handleInputChange} type="text" className="form-input" placeholder="422001" required />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-slate-950 text-white py-8 rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-sm shadow-2xl hover:bg-blue-600 hover:-translate-y-2 transition-all duration-500 flex items-center justify-center gap-4"
              >
                {loading ? <Loader2 className="animate-spin" /> : <><Save size={20} /> Sync Identity & Enter Vault</>}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfilePage;
