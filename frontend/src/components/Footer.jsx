import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, ArrowUp, Phone, MapPin, Mail, ShieldCheck } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white text-[#111111] border-t border-[#111111]/10 pt-24 pb-12 relative overflow-hidden font-sans">
      {/* Background visual texture */}
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-[#F7F5F0] rounded-full -z-10 opacity-70"></div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 md:gap-12 pb-16 border-b border-[#111111]/10">

          {/* Brand Presentation */}
          <div className="space-y-6">
            <Link to="/" className="flex flex-col origin-left">
              <span className="font-editorial text-2xl font-black tracking-tight text-[#111111] uppercase">
                NEW SAMADHAN
              </span>
              <span className="text-[9px] font-bold tracking-[0.45em] text-[#6B6B6B] uppercase mt-1">
                SHOE MART
              </span>
            </Link>
            <p className="text-sm text-[#6B6B6B] font-medium leading-relaxed">
              Crafting premium movement and unmatched resilience since generations. Your premier high-end shoe destination in Nashik.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" className="w-9 h-9 border border-[#111111]/10 rounded-full flex items-center justify-center text-[#6B6B6B] hover:text-[#8B0000] hover:border-[#8B0000] transition-colors" aria-label="Facebook">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-9 h-9 border border-[#111111]/10 rounded-full flex items-center justify-center text-[#6B6B6B] hover:text-[#8B0000] hover:border-[#8B0000] transition-colors" aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href="#" className="w-9 h-9 border border-[#111111]/10 rounded-full flex items-center justify-center text-[#6B6B6B] hover:text-[#8B0000] hover:border-[#8B0000] transition-colors" aria-label="Twitter">
                <Twitter size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111]">
              Collections
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><Link to="/products?category=Men" className="text-[#6B6B6B] hover:text-[#111111] transition-colors">Men's Campaign</Link></li>
              <li><Link to="/products?category=Women" className="text-[#6B6B6B] hover:text-[#111111] transition-colors">Women's Edition</Link></li>
              <li><Link to="/products?category=Kids" className="text-[#6B6B6B] hover:text-[#111111] transition-colors">Kids' Selection</Link></li>
              <li><Link to="/products" className="text-[#6B6B6B] hover:text-[#111111] transition-colors">Featured Drops</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111]">
              Atelier & Craft
            </h3>
            <ul className="space-y-2.5 text-sm font-medium">
              <li><Link to="/workshop" className="text-[#6B6B6B] hover:text-[#8B0000] transition-colors">The Workshop</Link></li>
              <li><Link to="/gallery" className="text-[#6B6B6B] hover:text-[#8B0000] transition-colors">Curated Gallery</Link></li>
              <li><Link to="/about" className="text-[#6B6B6B] hover:text-[#8B0000] transition-colors">About &amp; Heritage</Link></li>
              <li className="pt-2">
                <div className="flex items-center gap-3 p-3 bg-[#F7F5F0] rounded-2xl border border-[#111111]/5">
                  <img
                    src="/Devloper.jpg"
                    alt="Developer"
                    className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
                    onError={(e) => { e.target.src = 'https://ui-avatars.com/api/?name=Krishna&background=8B0000&color=fff'; }}
                  />
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#6B6B6B] block">Technical Architect</span>
                    <a href="https://wa.me/918080690631" target="_blank" rel="noreferrer" className="text-[11px] font-black text-[#111111] hover:text-[#8B0000] transition-colors flex items-center gap-1">
                      Krishna Rajput <span className="text-[#8B0000] font-bold">(8080690631)</span>
                    </a>
                  </div>
                </div>
              </li>
              <li><Link to="/service-centre" className="text-[#6B6B6B] hover:text-[#111111] transition-colors">Service Hub</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111]">
              Headquarters
            </h3>
            <ul className="space-y-3 text-sm text-[#6B6B6B] font-medium">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#8B0000] shrink-0 mt-0.5" />
                <span>Plot No 29, Santkrupa Niwas, Nashik 422003</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[#8B0000] shrink-0" />
                <span>+91 9423228843 / 8888644021</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#8B0000] shrink-0" />
                <span>info@samadhanshoemart.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-xs font-medium text-[#6B6B6B] text-center sm:text-left">
            &copy; {new Date().getFullYear()} New Samadhan Shoe Mart. All Rights Reserved. Crafted with Precision · <Link to="/about" className="text-[#111111] font-bold hover:text-[#8B0000] transition-colors">Architected by Krishna</Link> (<a href="https://krishna-patil-rajput.vercel.app/" target="_blank" rel="noreferrer" className="text-[#8B0000] font-semibold hover:underline">Portfolio</a> | <a href="https://krishnablogy.blogspot.com/" target="_blank" rel="noreferrer" className="text-[#8B0000] font-semibold hover:underline">Website</a> | <a href="https://wa.me/918080690631" target="_blank" rel="noreferrer" className="text-[#8B0000] font-semibold hover:underline">WhatsApp</a>)
          </p>

          <div className="flex items-center gap-6">
            <Link to="/about" className="flex items-center gap-2 text-xs font-medium text-[#6B6B6B] hover:text-[#8B0000] transition-colors">
              <ShieldCheck size={14} className="text-[#8B0000]" />
              <span>Verified Showroom &amp; Developer</span>
            </Link>

            <button
              onClick={scrollToTop}
              className="w-10 h-10 border border-[#111111]/10 rounded-full flex items-center justify-center text-[#111111] hover:bg-[#111111] hover:text-white transition-all shadow-sm"
              aria-label="Scroll to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
