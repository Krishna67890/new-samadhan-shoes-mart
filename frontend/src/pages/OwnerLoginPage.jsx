import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useAuth } from '../context/AuthContext';
import { ShieldCheck, Lock, Mail, ArrowRight, Loader2, AlertCircle } from 'lucide-react';

const OwnerLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState(null);
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const formRef = useRef(null);

  useEffect(() => {
    if (formRef.current) {
      gsap.from(formRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: 'power4.out',
        clearProps: "all"
      });
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLocalError(null);

    // Private Owner Credentials Enforcement
    if (email !== 'Command@SamadhanShoe.com') {
      setLocalError('Unauthorized Access: Invalid Owner Email.');
      return;
    }

    const result = await login(email, password);
    if (result.success && result.role === 'admin') {
      window.location.href = '/admin';
    } else {
      setLocalError('Authentication Failed: Identity Not Verified.');
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Red Pulse Glow for Security - Sharp edges per Zero-Blur policy */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/10 rounded-full border border-red-600/5 animate-pulse"></div>

      <div className="w-full max-w-lg z-10" ref={formRef}>
        <div className="bg-white/[0.03] rounded-[3rem] border border-white/10 p-10 md:p-14 shadow-2xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-red-600 rounded-3xl mb-6 shadow-[0_0_40px_rgba(220,38,38,0.4)]">
              <ShieldCheck className="text-white w-10 h-10" />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase mb-2">Owner Login</h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">Proprietor Command Interface</p>
          </div>

          {localError && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-6 rounded-2xl mb-8 flex items-center gap-4">
              <AlertCircle size={20} className="shrink-0" />
              <p className="text-xs font-bold uppercase tracking-widest">{localError}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-4">Owner Email</label>
              <div className="relative">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="email"
                  required
                  className="w-full pl-16 pr-8 py-5 bg-white/5 border border-white/5 rounded-2xl focus:bg-white/10 focus:border-red-500/50 outline-none transition-all font-black text-white placeholder:text-white/5"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] ml-4">Security Key</label>
              <div className="relative">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input
                  type="password"
                  required
                  className="w-full pl-16 pr-8 py-5 bg-white/5 border border-white/5 rounded-2xl focus:bg-white/10 focus:border-red-500/50 outline-none transition-all font-black text-white placeholder:text-white/5"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-6 rounded-2xl text-[11px] font-black uppercase tracking-[0.4em] transition-all hover:bg-red-700 shadow-xl flex items-center justify-center gap-4 group"
            >
              {loading ? <Loader2 className="animate-spin" /> : <>Authorize Access <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" /></>}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-white/5 text-center">
             <button
               onClick={() => navigate('/login')}
               className="text-slate-500 hover:text-white text-[9px] font-black uppercase tracking-widest transition-colors"
             >
                Return to Member Portal
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerLoginPage;
