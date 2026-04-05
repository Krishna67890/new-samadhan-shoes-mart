import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { useAuth } from '../context/AuthContext';
import useFetch from '../hooks/useFetch';
import { Mail, Lock, LogIn, AlertCircle, Loader2, ArrowRight, Sparkles } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState(null);
  const containerRef = useRef(null);
  const leftSideRef = useRef(null);
  const rightSideRef = useRef(null);
  const orb1Ref = useRef(null);
  const orb2Ref = useRef(null);

  const { user, login, loginAsGuest } = useAuth();
  const { loading, error, request } = useFetch();

  const navigate = useNavigate();
  const location = useLocation();

  const [guestLoading, setGuestLoading] = useState(false);

  // Use a state or ref to store redirect to avoid recalculation on every render
  // though simple variable is fine if used consistently.
  const queryParams = new URLSearchParams(location.search);
  const redirect = queryParams.get('redirect') || '/';

  // Remove or comment out the auto-redirect useEffect to allow manual navigation
  // useEffect(() => {
  //   if (user) {
  //     const savedRedirect = sessionStorage.getItem('redirectAfterLogin');
  //     navigate(savedRedirect || (user.role === 'admin' ? '/admin' : '/identity'));
  //   }
  // }, [navigate, user]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Entrance Split
      gsap.from(leftSideRef.current, {
        x: -200,
        opacity: 0,
        duration: 1.8,
        ease: 'expo.out'
      });
      gsap.from(rightSideRef.current, {
        x: 200,
        opacity: 0,
        duration: 1.8,
        ease: 'expo.out'
      });

      // 2. Staggered Content reveal
      gsap.from('.login-animate', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.1,
        ease: 'power4.out',
        delay: 0.5
      });

      // 3. Floating Orb Parallax
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        gsap.to(orb1Ref.current, {
          x: (clientX - window.innerWidth / 2) * 0.05,
          y: (clientY - window.innerHeight / 2) * 0.05,
          duration: 2,
          ease: 'power2.out'
        });
        gsap.to(orb2Ref.current, {
          x: -(clientX - window.innerWidth / 2) * 0.05,
          y: -(clientY - window.innerHeight / 2) * 0.05,
          duration: 2,
          ease: 'power2.out'
        });
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);

    }, containerRef);
    return () => ctx.revert();
  }, []);

  const handleGuestLogin = async () => {
    setGuestLoading(true);
    setLocalError(null);
    const result = await loginAsGuest();
    setGuestLoading(false);
    if (result.success) {
      navigate('/identity');
    } else {
      setLocalError(result.message);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLocalError(null);

    // Strict Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.com$/;
    if (!emailRegex.test(email)) {
      setLocalError('Identity failed validation. Email must contain "@" and end with ".com"');
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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 overflow-hidden relative" ref={containerRef}>
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-100"></div>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[4rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] relative z-10 border border-slate-100">

        {/* BRAND SIDE: PREMIUM LIGHT */}
        <div className="hidden lg:flex flex-col justify-between p-24 bg-slate-50 text-slate-900 relative overflow-hidden border-r border-slate-100" ref={leftSideRef}>
          <div className="relative z-10">
            <Link to="/" className="text-3xl font-black tracking-tighter flex items-center gap-4 mb-24 login-animate">
              <div className="w-14 h-14 bg-blue-600 rounded-[1.5rem] flex items-center justify-center shadow-2xl shadow-blue-500/20 rotate-12">
                <Sparkles size={28} className="text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-[10px] font-black text-blue-600 tracking-[0.5em] mb-1 uppercase">New Samadhan</span>
                <span className="tracking-widest text-2xl">SHOES MART</span>
              </div>
            </Link>

            <h2 className="text-7xl font-black leading-[0.9] mb-10 login-animate tracking-tighter text-slate-950">
              PREMIUM <br />
              <span className="text-blue-600">FOOTWEAR.</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-sm font-bold leading-relaxed border-l-4 border-blue-600 pl-8 py-2 login-animate uppercase tracking-[0.1em]">
              Access the exclusive collection of premium shoes and sneakers.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.6em] login-animate">
            <div className="w-12 h-px bg-slate-200"></div>
            ESTABLISHED QUALITY
          </div>
        </div>

        {/* FORM SIDE */}
        <div className="p-12 md:p-20 lg:p-28 flex flex-col justify-center bg-white" ref={rightSideRef}>
          <div className="mb-14 login-animate">
            <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-1 bg-blue-600 rounded-full"></div>
               <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.3em]">Customer Login</p>
            </div>
            <h1 className="text-6xl font-black text-slate-950 mb-4 tracking-tight">SIGN IN.</h1>
          </div>

          {(error || localError) && (
            <div className="bg-rose-50 text-rose-600 p-8 rounded-[2.5rem] mb-10 flex items-start border border-rose-100 login-animate shadow-sm">
              <AlertCircle className="w-7 h-7 mr-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-black text-xs uppercase tracking-[0.2em] mb-1">Access Error</p>
                <p className="text-sm font-bold opacity-80 leading-relaxed">{error || localError}</p>
              </div>
            </div>
          )}

          <form onSubmit={submitHandler} className="space-y-10">
            <div className="space-y-4 login-animate">
              <div className="relative group">
                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-blue-600 transition-all duration-500" />
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  className="w-full pl-16 pr-8 py-6 bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] focus:bg-white focus:border-blue-600 outline-none transition-all duration-500 font-black text-slate-900 text-lg shadow-sm"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-4 login-animate">
              <div className="relative group">
                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400 group-focus-within:text-blue-600 transition-all duration-500" />
                <input
                  type="password"
                  placeholder="PASSWORD"
                  className="w-full pl-16 pr-8 py-6 bg-slate-50 border-2 border-slate-100 rounded-[2.5rem] focus:bg-white focus:border-blue-600 outline-none transition-all duration-500 font-black text-slate-900 text-lg shadow-sm"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || guestLoading}
              className="w-full bg-slate-950 text-white py-8 rounded-[2.5rem] text-xl font-black shadow-xl hover:bg-blue-600 active:scale-[0.96] transition-all duration-700 login-animate group overflow-hidden relative"
            >
              <span className="relative z-10 flex items-center justify-center gap-4 tracking-[0.2em] uppercase text-sm font-black">
                {loading ? (
                  <Loader2 className="w-8 h-8 animate-spin" />
                ) : (
                  <>
                    LOGIN <ArrowRight className="w-6 h-6 group-hover:translate-x-3 transition-transform duration-700" />
                  </>
                )}
              </span>
            </button>

            <div className="grid grid-cols-2 gap-4 login-animate">
              <button
                type="button"
                onClick={async () => {
                  setGuestLoading(true);
                  const result = await loginAsGuest();
                  setGuestLoading(false);
                  if (result.success) navigate('/');
                }}
                disabled={loading || guestLoading}
                className="bg-blue-50 text-blue-600 py-6 rounded-[2rem] text-[10px] font-black border border-blue-100 hover:bg-blue-600 hover:text-white active:scale-[0.96] transition-all duration-700 group flex flex-col items-center justify-center gap-3"
              >
                <Sparkles className="w-5 h-5 group-hover:scale-125 transition-transform" />
                <span className="tracking-[0.2em] uppercase">Guest Login</span>
              </button>

              <button
                type="button"
                onClick={async () => {
                  setEmail('admin@samadhan.com');
                  setPassword('admin123');
                  const result = await login('admin@samadhan.com', 'admin123');
                  if (result.success) {
                    window.location.href = '/admin';
                  }
                }}
                disabled={loading || guestLoading}
                className="bg-slate-50 text-slate-900 py-6 rounded-[2rem] text-[10px] font-black border border-slate-200 hover:bg-slate-950 hover:text-white active:scale-[0.96] transition-all duration-700 group flex flex-col items-center justify-center gap-3"
              >
                <Lock className="w-5 h-5 group-hover:scale-125 transition-transform" />
                <span className="tracking-[0.2em] uppercase">Admin Login</span>
              </button>
            </div>

            <div className="relative py-4 login-animate">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-100"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase tracking-[0.3em] font-black">
                <span className="bg-white px-6 text-slate-400">OR</span>
              </div>
            </div>
          </form>

          <div className="mt-20 text-center login-animate pt-12 border-t border-slate-50">
            <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
              Ready to sync?{' '}
              <Link
                to="/identity"
                className="text-blue-600 font-black hover:text-blue-800 ml-2 border-b-2 border-blue-600/20 pb-1"
              >
                Sync Identity
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
