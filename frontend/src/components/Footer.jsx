import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Facebook, Instagram, Twitter, MessageCircle, ShieldCheck, Zap, Wrench, Package } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';

const Footer = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleWhatsAppClick = (e) => {
    if (!isAuthenticated) {
      e.preventDefault();
      navigate('/login');
      return;
    }

    // BLOCK WHATSAPP IF IDENTITY NOT VERIFIED
    if (user?.role !== 'admin' && !user?.identityVerified) {
      e.preventDefault();
      navigate('/identity');
    }
  };

  return (
    <footer className="bg-[#050505] text-white pt-32 pb-16 relative overflow-hidden border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">

          {/* BRAND */}
          <div className="space-y-10">
            <Link to="/" className="flex items-center gap-4 group">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-[0_0_30px_rgba(37,99,235,0.3)] group-hover:rotate-12 transition-transform border border-blue-500/50">S</div>
              <div className="flex flex-col">
                <span className="font-black text-white tracking-tighter text-2xl uppercase leading-none">Samadhan<span className="text-blue-600">Shoes</span></span>
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.4em] leading-none mt-1">The Vault 2026</span>
              </div>
            </Link>
            <p className="text-slate-500 font-medium leading-relaxed italic text-sm">
              "Precision engineered footwear curated for the elite. Redefining artisanal craftsmanship and style."
            </p>
            <div className="flex items-center gap-6">
               <a href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-500 hover:text-white hover:bg-blue-600 transition-all border border-white/5"><Facebook size={20} /></a>
               <a href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-500 hover:text-white hover:bg-blue-600 transition-all border border-white/5"><Instagram size={20} /></a>
               <a href="#" className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-500 hover:text-white hover:bg-blue-600 transition-all border border-white/5"><Twitter size={20} /></a>
               <a
                 href="https://wa.me/919423228843"
                 target="_blank"
                 rel="noopener noreferrer"
                 onClick={handleWhatsAppClick}
                 className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 hover:text-white hover:bg-emerald-500 transition-all border border-emerald-500/10 shadow-lg shadow-emerald-500/5"
               ><MessageCircle size={20} /></a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="space-y-8">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] mb-4">The Navigation</h3>
            <ul className="space-y-6">
              <li><Link to="/" className="text-sm font-black text-white/50 hover:text-blue-500 transition-all flex items-center gap-4 uppercase tracking-widest"><Zap size={14} /> Home Axis</Link></li>
              <li><Link to="/products" className="text-sm font-black text-white/50 hover:text-blue-500 transition-all flex items-center gap-4 uppercase tracking-widest"><Package size={14} /> The Vault</Link></li>
              <li><Link to="/service-centre" className="text-sm font-black text-white/50 hover:text-blue-500 transition-all flex items-center gap-4 uppercase tracking-widest"><Wrench size={14} /> Service Hub</Link></li>
              <li><Link to="/identity" className="text-sm font-black text-white/50 hover:text-blue-500 transition-all flex items-center gap-4 uppercase tracking-widest"><ShieldCheck size={14} /> Identity Sync</Link></li>
            </ul>
          </div>

          {/* CONTACTS */}
          <div className="space-y-8 lg:col-span-2">
            <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.5em] mb-4">Official Channels</h3>
            <div className="grid md:grid-cols-2 gap-10">
               <div className="space-y-6">
                  <div className="flex flex-col">
                     <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.4em] mb-1">General Inquiries</span>
                     <span className="text-sm font-black text-white uppercase tracking-tighter">9423228843 | 8888644021</span>
                  </div>
                  <div className="flex flex-col">
                     <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.4em] mb-1">Developer Ops</span>
                     <span className="text-sm font-black text-white uppercase tracking-tighter">8080690631 (KRISHNA)</span>
                  </div>
               </div>
               <div className="space-y-6">
                  <div className="flex flex-col">
                     <span className="text-[8px] font-black text-slate-600 uppercase tracking-[0.4em] mb-1">Main Factory</span>
                     <p className="text-sm font-black text-white uppercase tracking-tighter leading-relaxed">
                        Plot No 29, Santkrupa Niwas, Nashik 422003
                     </p>
                  </div>
               </div>
            </div>
            <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-8">
               <div className="flex items-center gap-4 px-5 py-2 bg-white/5 rounded-full border border-white/10">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Global Vault Server: Active</span>
               </div>
               <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">© {new Date().getFullYear()} SSM VISION 2026</p>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
