import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ShoppingBag, User, LogOut, Menu, X,
  Search, Heart, ShieldCheck, ChevronDown,
  LayoutDashboard, Package, Wrench, Home, ArrowRight
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { cartItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const navRef = useRef(null);
  const logoRef = useRef(null);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    setIsOpen(false);
    navigate('/');
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: "top top",
        end: 100,
        onUpdate: (self) => {
          const isScrolled = self.scroll() > 50;
          gsap.to(navRef.current, {
            height: isScrolled ? "4.5rem" : "6rem",
            backgroundColor: isScrolled ? "rgba(247, 245, 240, 0.95)" : "rgba(247, 245, 240, 0.85)",
            boxShadow: isScrolled ? "0 10px 30px rgba(0,0,0,0.03)" : "none",
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto"
          });
          gsap.to(logoRef.current, {
            scale: isScrolled ? 0.9 : 1,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto"
          });
        }
      });
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(".mobile-nav-link",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, ease: "power3.out", duration: 0.5 }
      );
    }
  }, [isOpen]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 w-full z-[100] bg-[#F7F5F0]/90 backdrop-blur-md border-b border-[#111111]/5 transition-all duration-300 h-24 flex items-center"
    >
      <div className="w-full max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">

        {/* Brand Identity */}
        <Link to="/" ref={logoRef} className="flex flex-col group z-[110] origin-left">
          <span className="font-editorial text-xl sm:text-2xl font-black text-[#111111] tracking-tight leading-none uppercase">
            NEW SAMADHAN
          </span>
          <span className="text-[9px] font-sans font-bold tracking-[0.45em] text-[#6B6B6B] uppercase leading-none mt-1">
            SHOE MART
          </span>
        </Link>

        {/* Premium Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-7 xl:gap-8">
          <Link to="/" className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#111111] hover:text-[#8B0000] transition-colors">Home</Link>
          <Link to="/products" className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#6B6B6B] hover:text-[#111111] transition-colors">Collections</Link>
          <Link to="/workshop" className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#6B6B6B] hover:text-[#8B0000] transition-colors">Workshop</Link>
          <Link to="/gallery" className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#6B6B6B] hover:text-[#8B0000] transition-colors">Gallery</Link>
          <Link to="/products?category=Men" className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#6B6B6B] hover:text-[#111111] transition-colors">Men</Link>
          <Link to="/products?category=Women" className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#6B6B6B] hover:text-[#111111] transition-colors">Women</Link>
          <Link to="/service-centre" className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#6B6B6B] hover:text-[#111111] transition-colors flex items-center gap-2">
             Offers
          </Link>
          <Link to="/about" className="text-[11px] font-sans font-bold uppercase tracking-[0.25em] text-[#6B6B6B] hover:text-[#8B0000] transition-colors">About</Link>
        </div>

        {/* Right Interactions */}
        <div className="flex items-center gap-4 sm:gap-6 z-[110]">
          <button className="text-[#111111] hover:text-[#8B0000] transition-colors p-2 hidden sm:block" aria-label="Search">
            <Search size={20} />
          </button>

          <button className="text-[#111111] hover:text-[#8B0000] transition-colors p-2 hidden sm:block" aria-label="Wishlist">
            <Heart size={20} />
          </button>

          <Link to="/cart" className="relative p-2 group" aria-label="Cart">
            <ShoppingBag className="text-[#111111] group-hover:text-[#8B0000] transition-colors" size={21} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-[#8B0000] text-white text-[9px] font-sans font-bold rounded-full flex items-center justify-center shadow-md">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative">
              <button
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setIsOpen(false);
                }}
                className="flex items-center gap-3 p-1 rounded-full border border-[#111111]/10 hover:border-[#111111] transition-all bg-white"
              >
                <div className="w-8 h-8 rounded-full bg-[#8B0000]/10 flex items-center justify-center text-[#8B0000] font-bold overflow-hidden">
                   {user?.avatar ? (
                     <img
                       src={user.avatar}
                       alt="Profile"
                       className="w-full h-full object-cover"
                       onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${user.name}&background=8B0000&color=fff`; }}
                     />
                   ) : (
                     <span className="uppercase text-xs">{user?.name ? user.name[0] : 'U'}</span>
                   )}
                </div>
                <ChevronDown size={12} className={`text-[#6B6B6B] transition-transform mr-1 hidden sm:block ${profileOpen ? 'rotate-180' : ''}`} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-4 w-64 bg-white rounded-2xl border border-[#111111]/10 shadow-xl p-3 z-[120] animate-in fade-in slide-in-from-top-2">
                  <div className="p-3 border-b border-[#111111]/5">
                    <p className="text-xs font-bold text-[#111111] uppercase tracking-wider">{user.name}</p>
                    <p className="text-[10px] text-[#6B6B6B] truncate">{user.email}</p>
                  </div>
                  <Link to="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 p-3 text-[11px] font-bold uppercase tracking-wider text-[#6B6B6B] hover:bg-[#F7F5F0] hover:text-[#111111] rounded-xl transition-all">
                    <User size={16} /> My Showroom
                  </Link>
                  <Link to="/my-orders" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 p-3 text-[11px] font-bold uppercase tracking-wider text-[#6B6B6B] hover:bg-[#F7F5F0] hover:text-[#111111] rounded-xl transition-all">
                    <Package size={16} /> Order Journal
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 p-3 text-[11px] font-bold uppercase tracking-wider text-[#8B0000] hover:bg-[#8B0000]/5 rounded-xl transition-all">
                      <LayoutDashboard size={16} /> Master Command
                    </Link>
                  )}
                  <div className="h-px bg-[#111111]/5 my-2"></div>
                  <button onClick={handleLogout} className="flex items-center gap-3 p-3 text-[11px] font-bold uppercase tracking-wider text-rose-600 hover:bg-rose-50 w-full rounded-xl transition-all text-left">
                    <LogOut size={16} /> Leave Session
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full border border-[#111111]/10 text-[#111111] hover:bg-[#111111] hover:text-white transition-all" aria-label="Account">
              <User size={18} />
            </Link>
          )}

          <button
            onClick={() => {
              setIsOpen(!isOpen);
              setProfileOpen(false);
            }}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-[#111111] hover:bg-[#111111]/5 rounded-xl transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Modern Animated Fullscreen Mobile Navigation */}
      {isOpen && (
        <div className="fixed inset-0 top-24 bg-[#F7F5F0] z-[90] lg:hidden flex flex-col justify-between p-8 overflow-y-auto animate-in fade-in slide-in-from-right duration-300">
          <div className="flex flex-col gap-4 pt-4">
            {[
              { label: 'Home Axis', path: '/' },
              { label: 'The Workshop (Atelier)', path: '/workshop' },
              { label: 'Artisanal Gallery', path: '/gallery' },
              { label: 'The Catalog', path: '/products' },
              { label: 'Men Campaign', path: '/products?category=Men' },
              { label: 'Women Collection', path: '/products?category=Women' },
              { label: 'Kids Edition', path: '/products?category=Kids' },
              { label: 'Exclusive Offers', path: '/service-centre' },
              { label: 'About Samadhan & Dev', path: '/about' },
              { label: 'My Showroom / Profile', path: '/profile' }
            ].map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="mobile-nav-link flex items-center justify-between p-6 bg-white rounded-2xl border border-[#111111]/5 shadow-sm hover:border-[#8B0000]/20 transition-all"
              >
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#111111]">{item.label}</span>
                <ArrowRight size={16} className="text-[#6B6B6B]" />
              </Link>
            ))}

            {!user && (
              <div className="grid grid-cols-2 gap-4 pt-4 mobile-nav-link">
                <Link to="/login" onClick={() => setIsOpen(false)} className="py-4 text-center bg-white text-[#111111] rounded-xl text-[11px] font-bold uppercase tracking-wider border border-[#111111]/10">Login</Link>
                <Link to="/identity" onClick={() => setIsOpen(false)} className="py-4 text-center bg-[#111111] text-white rounded-xl text-[11px] font-bold uppercase tracking-wider shadow-md">Join Us</Link>
              </div>
            )}
          </div>

          <div className="pt-8 border-t border-[#111111]/5 text-center">
             <p className="text-[9px] font-sans font-bold text-[#6B6B6B] uppercase tracking-[0.4em]">NEW SAMADHAN SHOE MART © 2026</p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
