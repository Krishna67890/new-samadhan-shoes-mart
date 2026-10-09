import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, ArrowUp, Phone, MapPin, Mail, ShieldCheck } from 'lucide-react';
import { resolveImageUrl } from '../utils/urlConfig';

const Footer = () => {
  const scrollToTop = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    // Cross-browser scroll to top
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    } catch (_) {
      try { window.scrollTo(0, 0); } catch (_) {}
    }
    try {
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    } catch (_) {}
    try {
      const topTarget = document.getElementById('root') || document.body || document.documentElement;
      topTarget?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (_) {}
  };

  return (
    <footer className="bg-white text-[#111111] border-t border-[#111111]/10 pt-20 pb-12 relative overflow-hidden font-sans">
      {/* Background visual texture */}
      <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-[#F7F5F0] rounded-full -z-10 opacity-70"></div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-[#111111]/10">

          {/* Brand Presentation */}
          <div className="space-y-6">
            <Link to="/" className="flex flex-col origin-left">
              <span className="font-editorial text-2xl font-black tracking-tight text-[#111111] uppercase">
                NEW SAMADHAN
              </span>
              <span className="text-[9px] font-bold tracking-[0.45em] text-[#d4af37] uppercase mt-1">
                SHOE MART • NASHIK
              </span>
            </Link>
            <p className="text-sm text-[#6B6B6B] font-medium leading-relaxed">
              Crafting premium movement and unmatched resilience since generations. Your premier high-end shoe destination in Nashik.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="https://www.facebook.com/people/New-Samadhan-Shoes-Mart/61555891316279/" target="_blank" rel="noreferrer" className="w-10 h-10 border border-[#111111]/10 rounded-full flex items-center justify-center text-[#6B6B6B] hover:text-[#d4af37] hover:border-[#d4af37] transition-colors" aria-label="Facebook">
                <Facebook size={16} />
              </a>
              <a href="https://www.instagram.com/newsamadhanshoe?stkn=MTJheDd5ODduejZzYQ==" target="_blank" rel="noreferrer" className="w-10 h-10 border border-[#111111]/10 rounded-full flex items-center justify-center text-[#6B6B6B] hover:text-[#d4af37] hover:border-[#d4af37] transition-colors" aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href="https://x.com/SamadhanShoes" target="_blank" rel="noreferrer" className="w-10 h-10 border border-[#111111]/10 rounded-full flex items-center justify-center text-[#6B6B6B] hover:text-[#d4af37] hover:border-[#d4af37] transition-colors" aria-label="Twitter">
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
              <li><Link to="/products?collection=New+Arrivals" className="text-[#6B6B6B] hover:text-[#d4af37] transition-colors">New Arrivals</Link></li>
              <li><Link to="/products?collection=Bestsellers" className="text-[#6B6B6B] hover:text-[#d4af37] transition-colors">Best Sellers</Link></li>
              <li><Link to="/products?collection=Limited+Edition" className="text-[#6B6B6B] hover:text-[#d4af37] transition-colors">Limited Edition</Link></li>
              <li><Link to="/products?collection=Retro" className="text-[#6B6B6B] hover:text-[#d4af37] transition-colors">Retro Classics</Link></li>
            </ul>
          </div>

          {/* Verified Showroom & Developer Column */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111] flex items-center gap-2">
              <ShieldCheck size={14} className="text-[#d4af37]" />
              Verified Showroom &amp; Developer
            </h3>
            <div className="p-4 bg-[#FAF9F6] rounded-2xl border border-[#d4af37]/25 space-y-3 shadow-xs">
              <div className="flex items-center gap-3">
                <img
                  src={resolveImageUrl("/Devloper.jpg")}
                  alt="Krishna Patil Rajput"
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#d4af37] shadow-sm"
                  onError={(e) => { e.target.src = resolveImageUrl('/New-Samadhan-Shoe-Mart/Devloper.jpg'); }}
                />
                <div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#d4af37] block">
                    Chief Architect &amp; Dev
                  </span>
                  <a
                    href="https://www.instagram.com/krish_root_labs?stkn=YWczM2t3amUyZ3lp"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-black text-[#111111] hover:text-[#d4af37] transition-colors"
                  >
                    Krishna Patil Rajput
                  </a>
                  <span className="text-[10px] text-gray-500 block">Krishna Ajaysing Patil</span>
                </div>
              </div>
              <div className="pt-2 border-t border-black/5 flex items-center justify-between text-[11px]">
                <Link to="/about" className="font-bold text-[#d4af37] hover:underline flex items-center gap-1">
                  Verified Profile →
                </Link>
                <a href="https://wa.me/918080690631" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-black">
                  Direct WhatsApp
                </a>
              </div>
            </div>
            <ul className="space-y-2 text-xs font-medium text-gray-500 pt-1">
              <li><Link to="/about" className="hover:text-black">Heritage &amp; Workshop Story</Link></li>
              <li><Link to="/gallery" className="hover:text-black">Atelier Gallery Archive</Link></li>
            </ul>
          </div>

          {/* Headquarters */}
          <div className="space-y-4">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#111111]">
              Flagship Showroom
            </h3>
            <ul className="space-y-3 text-sm text-[#6B6B6B] font-medium">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#d4af37] shrink-0 mt-0.5" />
                <span>Plot No 29, Santkrupa Niwas, Factory Rd, Nashik 422003</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-[#d4af37] shrink-0" />
                <a href="tel:+919423228843" className="hover:text-black transition-colors">
                  +91 94232 28843 / 88886 44021
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-[#d4af37] shrink-0" />
                <span>info@samadhanshoemart.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <p className="text-xs font-medium text-[#6B6B6B] text-center sm:text-left">
            &copy; {new Date().getFullYear()} New Samadhan Shoe Mart. All Rights Reserved. Crafted with Precision · <Link to="/about" className="text-[#111111] font-bold hover:text-[#d4af37] transition-colors">Architected by Krishna Patil Rajput</Link>
          </p>

          <div className="flex items-center gap-6">
            <Link to="/about" className="flex items-center gap-2 text-xs font-semibold text-[#111111] hover:text-[#d4af37] transition-colors">
              <ShieldCheck size={16} className="text-[#d4af37]" />
              <span>Verified Showroom &amp; Developer</span>
            </Link>

            {/* Scroll To Top Button Recreated & Tested */}
            <button
              type="button"
              onClick={scrollToTop}
              className="w-12 h-12 bg-[#111111] text-[#d4af37] hover:bg-[#d4af37] hover:text-black rounded-full flex items-center justify-center transition-all duration-300 shadow-lg hover:scale-110 cursor-pointer active:scale-95 group"
              aria-label="Scroll to top"
              title="Go to Top"
            >
              <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
