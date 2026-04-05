import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { useAuth } from '../context/AuthContext';
import useFetch from '../hooks/useFetch';
import { Mail, Lock, LogIn, AlertCircle, Loader2, ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState(null);
  const containerRef = useRef(null);
  const leftSideRef = useRef(null);
  const rightSideRef = useRef(null);

  const { user, login, loginAsGuest } = useAuth();
  const { loading, error, request } = useFetch();

  const navigate = useNavigate();
  const location = useLocation();

  const [guestLoading, setGuestLoading] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(leftSideRef.current, {
        x: -100,
        opacity: 0,
        duration: 1.5,
        ease: 'expo.out'
      });
      gsap.from(rightSideRef.current, {
        x: 100,
        opacity: 0,
        duration: 1.5,
        ease: 'expo.out'
      });
      gsap.from('.login-animate', {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power4.out',
        delay: 0.3
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLocalError(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLocalError('Invalid identity format. Please enter a valid email.');
      return;
    }

    const result = await login(email, password);
    if (result.success) {
      if (result.role === 'admin') {
        window.location.href = '/admin';
      } else {
        navigate('/identity');
      }
    } else {
      setLocalError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 overflow-hidden relative" ref={containerRef}>
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-600/5 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 bg-white/[0.02] backdrop-blur-3xl rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl relative z-10">

        {/* LEFT SIDE: BRANDING */}
        <div className="hidden lg:flex flex-col justify-between p-24 bg-white/[0.03] border-r border-white/5 relative overflow-hidden" ref={leftSideRef}>
          <div className="relative z-10">
            <Link to="/" className="flex items-center gap-4 mb-24 login-animate group">
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-[0_0_30px_rgba(37,99,235,0.3)] group-hover:rotate-12 transition-transform border border-blue-500/50">S</div>
              <div className="flex flex-col">
                <span className="font-black text-white tracking-tighter text-2xl uppercase leading-none">Samadhan<span className="text-blue-600">Shoes</span></span>
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.4em] leading-none mt-1">The Vault 2026</span>
              </div>
            </Link>

            <h2 className="text-7xl font-black text-white leading-[0.9] mb-10 tracking-tighter uppercase login-animate">
              ELITE <br />
              <span className="text-blue-600">ACCESS.</span>
            </h2>
            <p className="text-slate-500 text-lg font-medium italic border-l-2 border-blue-600 pl-8 py-2 max-w-sm login-animate">
              "Entry restricted to verified members. Sync your identity to explore the high-tier catalog."
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-6 text-[10px] font-black text-slate-700 uppercase tracking-[0.6em] login-animate">
            <div className="w-12 h-px bg-white/10"></div>
            ENCRYPTED CONNECTION
          </div>
        </div>

        {/* RIGHT SIDE: FORM */}
        <div className="p-12 md:p-20 lg:p-28 flex flex-col justify-center" ref={rightSideRef}>
          <div className="mb-14 login-animate">
            <div className="flex items-center gap-4 mb-6">
               <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
               <p className="text-[11px] font-black text-blue-500 uppercase tracking-[0.4em]">Member Portal</p>
            </div>
            <h1 className="text-5xl font-black text-white tracking-tighter uppercase leading-none">Initialize.</h1>
          </div>

          {(error || localError) && (
            <div className="bg-rose-500/10 border border-rose-500/20 text-rose-500 p-8 rounded-[2.5rem] mb-10 flex items-start login-animate">
              <AlertCircle className="w-6 h-6 mr-4 mt-0.5 shrink-0" />
              <div>
                <p className="font-black text-[10px] uppercase tracking-widest mb-1">Access Refused</p>
                <p className="text-xs font-bold leading-relaxed opacity-80">{error || localError}</p>
              </div>
            </div>
          )}

          <form onSubmit={submitHandler} className="space-y-10">
            <div className="space-y-4 login-animate">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-6">Designation Email</label>
              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input
                  type="email"
                  placeholder="name@identity.com"
                  className="w-full pl-16 pr-8 py-6 bg-white/5 border border-white/5 rounded-[2.5rem] focus:bg-white/10 focus:border-blue-500/50 outline-none transition-all font-black text-white placeholder:text-white/10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-4 login-animate">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-6">Security Phrase</label>
              <div className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-16 pr-8 py-6 bg-white/5 border border-white/5 rounded-[2.5rem] focus:bg-white/10 focus:border-blue-500/50 outline-none transition-all font-black text-white placeholder:text-white/10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || guestLoading}
              className="w-full bg-white text-black py-7 rounded-[2.5rem] text-[11px] font-black uppercase tracking-[0.4em] transition-all hover:bg-blue-600 hover:text-white shadow-2xl flex items-center justify-center gap-6 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
              {loading ? <Loader2 className="animate-spin" /> : <>Access Vault <ArrowRight className="group-hover:translate-x-3 transition-transform" size={20} /></>}
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 login-animate">
               <button
                 type="button"
                 onClick={async () => {
                   setGuestLoading(true);
                   const result = await loginAsGuest();
                   setGuestLoading(false);
                   if (result.success) navigate('/products');
                 }}
                 disabled={loading || guestLoading}
                 className="py-6 rounded-[2rem] bg-white/5 border border-white/10 text-white text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all flex flex-col items-center justify-center gap-3"
               >
                 <Sparkles size={18} /> Elite Guest
               </button>
               <button
                 type="button"
                 onClick={async () => {
                   setEmail('admin@samadhan.com');
                   setPassword('admin123');
                   const result = await login('admin@samadhan.com', 'admin123');
                   if (result.success) window.location.href = '/admin';
                 }}
                 disabled={loading || guestLoading}
                 className="py-6 rounded-[2rem] bg-blue-600/10 border border-blue-600/20 text-blue-500 text-[9px] font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex flex-col items-center justify-center gap-3"
               >
                 <ShieldCheck size={18} /> Command Authority
               </button>
            </div>
          </form>

          <div className="mt-16 pt-10 border-t border-white/5 text-center login-animate">
             <p className="text-slate-500 font-black uppercase tracking-widest text-[9px]">
                New Identity? <Link to="/identity" className="text-white hover:text-blue-500 ml-2 transition-colors">Sync Identity Now</Link>
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
