import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ShoppingBag, User, LogOut, Menu, X,
  Search, Heart, ChevronDown,
  LayoutDashboard, Package, ArrowRight, Trash2, Plus, Minus, MessageCircle,
  Sun, Moon
} from 'lucide-react';
import { resolveImageUrl } from '../utils/urlConfig';
import { useTheme } from '../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  const { user, logout, isAdmin, isAuthenticated } = useAuth();
  const { cartItems, removeFromCart, addToCart, cartTotal, isCartOpen, setIsCartOpen } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const navigate = useNavigate();
  const navRef = useRef(null);
  const logoRef = useRef(null);
  const megaMenuRef = useRef(null);

  // Close mobile menu when navigating
  useEffect(() => {
    setIsOpen(false);
    setProfileOpen(false);
  }, [navigate]);

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
          const isDark = document.documentElement.classList.contains('dark');
          gsap.to(navRef.current, {
            height: isScrolled ? "5rem" : "6.5rem",
            backgroundColor: isScrolled
              ? (isDark ? "rgb(10, 10, 10)" : "rgb(255, 255, 255)")
              : (isDark ? "rgba(10, 10, 10, 0.9)" : "rgba(255, 255, 255, 0.9)"),
            backdropFilter: isScrolled ? "none" : "blur(10px)",
            boxShadow: isScrolled ? "0 20px 40px rgba(0,0,0,0.1)" : "none",
            borderBottom: isScrolled ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0)",
            duration: 0.3, // Faster response
            ease: "power2.out",
            overwrite: "auto"
          });
          gsap.to(logoRef.current, {
            scale: isScrolled ? 0.85 : 1,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto"
          });
        }
      });
    });

    return () => ctx.revert();
  }, [theme]);

  useEffect(() => {
    if (activeMegaMenu) {
      gsap.fromTo(megaMenuRef.current,
        { opacity: 0, y: -40, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "expo.out" }
      );
      gsap.fromTo(".mega-item",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, stagger: 0.08, delay: 0.1, duration: 0.5, ease: "back.out(1.7)" }
      );
    }
  }, [activeMegaMenu]);

  const navLinks = [
    {
      name: 'Men',
      path: '/products?category=Men',
      subCategories: ['Sneakers', 'Running', 'Casual', 'Formal', 'Sandals']
    },
    {
      name: 'Women',
      path: '/products?category=Women',
      subCategories: ['Sneakers', 'Casual', 'Sandals', 'Heels', 'Daily Wear']
    },
    {
      name: 'Sneakers',
      path: '/products?category=Sneakers',
      subCategories: ['Limited Edition', 'Street Style', 'Performance', 'Retro']
    },
    {
      name: 'Formal',
      path: '/products?category=Formal',
      subCategories: ['Oxfords', 'Derbys', 'Loafers', 'Monk Straps']
    },
    {
      name: 'Kids',
      path: '/products?category=Kids',
      subCategories: ['School', 'Sneakers', 'Casual', 'Sports']
    }
  ];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 sm:top-4 w-full sm:w-[96%] left-0 sm:left-[2%] z-[1000] bg-white dark:bg-black sm:rounded-[2.5rem] transition-all duration-300 h-[6.5rem] flex items-center px-4"
      onMouseLeave={() => setActiveMegaMenu(null)}
    >
      <div className="w-full max-w-[1600px] mx-auto px-8 md:px-12 flex items-center justify-between">

        {/* Brand Identity */}
        <Link to="/" ref={logoRef} className="flex flex-col group z-[110] origin-left shrink-0">
          <span className="font-black text-xl sm:text-2xl md:text-3xl tracking-tighter leading-none uppercase animate-rgb-text">
            NEW SAMADHAN
          </span>
          <span className="text-[8px] sm:text-[10px] font-black tracking-[0.4em] sm:tracking-[0.6em] uppercase leading-none mt-1 sm:mt-2 animate-rgb-text opacity-70">
            SHOE MART
          </span>
        </Link>

        {/* Premium Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-10 h-full">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="h-full flex items-center"
              onMouseEnter={() => setActiveMegaMenu(link.name)}
            >
              <Link
                to={link.path}
                className={`text-[11px] xl:text-[12px] font-black uppercase tracking-[0.2em] xl:tracking-[0.3em] transition-all relative py-2 ${activeMegaMenu === link.name ? 'text-[rgb(212,175,55)]' : 'text-[rgb(120,120,120)] dark:text-[rgb(180,180,180)] hover:text-[rgb(0,0,0)] dark:hover:text-[rgb(255,255,255)]'}`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 h-[2px] bg-[rgb(212,175,55)] transition-all duration-300 ${activeMegaMenu === link.name ? 'w-full' : 'w-0'}`}></span>
              </Link>
            </div>
          ))}
          <Link to="/collection" className="text-[11px] xl:text-[12px] font-black uppercase tracking-[0.2em] xl:tracking-[0.3em] text-[rgb(120,120,120)] dark:text-[rgb(180,180,180)] hover:text-[rgb(212,175,55)] transition-colors">Collection</Link>
          <Link to="/workshop" className="text-[11px] xl:text-[12px] font-black uppercase tracking-[0.2em] xl:tracking-[0.3em] text-[rgb(120,120,120)] dark:text-[rgb(180,180,180)] hover:text-[rgb(212,175,55)] transition-colors">Workshop</Link>
          <Link to="/gallery" className="text-[11px] xl:text-[12px] font-black uppercase tracking-[0.2em] xl:tracking-[0.3em] text-[rgb(120,120,120)] dark:text-[rgb(180,180,180)] hover:text-[rgb(212,175,55)] transition-colors">Gallery</Link>
          <Link to="/about" className="text-[11px] xl:text-[12px] font-black uppercase tracking-[0.2em] xl:tracking-[0.3em] text-[rgb(120,120,120)] dark:text-[rgb(180,180,180)] hover:text-[rgb(212,175,55)] transition-colors">About</Link>
        </div>

        {/* Right Interactions */}
        <div className="flex items-center gap-2 sm:gap-6 z-[110]">
          <button
            onClick={toggleTheme}
            className="text-[rgb(0,0,0)] dark:text-[rgb(255,255,255)] hover:text-[rgb(212,175,55)] transition-all p-2 sm:p-3 hover:bg-[rgb(245,245,245)] dark:hover:bg-[rgb(20,20,20)] rounded-2xl hidden sm:flex items-center justify-center"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <button className="text-[rgb(0,0,0)] dark:text-[rgb(255,255,255)] hover:text-[rgb(212,175,55)] transition-all p-2 sm:p-3 hover:bg-[rgb(245,245,245)] dark:hover:bg-[rgb(20,20,20)] rounded-2xl hidden sm:block" aria-label="Search">
            <Search size={18} />
          </button>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-3 sm:p-4 bg-[rgb(10,10,10)] text-[rgb(255,255,255)] rounded-[1.2rem] sm:rounded-[1.5rem] group hover:bg-[rgb(212,175,55)] transition-all shadow-xl shadow-black/10 cart-icon-target"
            aria-label="Cart"
          >
            <ShoppingBag size={18} sm={20} className="group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-5 h-5 sm:w-6 sm:h-6 bg-[rgb(212,175,55)] text-[rgb(255,255,255)] text-[9px] sm:text-[10px] font-black rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setIsOpen(false);
                }}
                className="flex items-center gap-2 p-1 rounded-full border-2 border-[rgb(240,240,240)] hover:border-[rgb(212,175,55)] transition-all bg-[rgb(255,255,255)] shadow-sm"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[rgb(10,10,10)] text-[rgb(255,255,255)] flex items-center justify-center text-xs sm:text-sm font-black overflow-hidden shadow-inner">
                   {user?.avatar ? (
                     <img
                       src={user.avatar}
                       alt="Profile"
                       className="w-full h-full object-cover"
                       onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${user.name}&background=1a1a1a&color=fff`; }}
                     />
                   ) : (
                     <span className="uppercase">{user?.name ? user.name[0] : 'U'}</span>
                   )}
                </div>
                <ChevronDown size={14} className={`text-[rgb(160,160,160)] transition-transform mr-1 hidden sm:block ${profileOpen ? 'rotate-180' : ''}`} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-4 w-64 sm:w-72 bg-[rgb(255,255,255)] rounded-[2rem] border border-[rgb(245,245,245)] shadow-[0_30px_60px_rgba(0,0,0,0.15)] p-4 z-[120] animate-in fade-in slide-in-from-top-4 duration-300">
                  <div className="p-3 border-b border-[rgb(250,250,250)] mb-2">
                    <p className="text-[9px] font-black text-[rgb(160,160,160)] uppercase tracking-[0.2em] mb-1">Account</p>
                    <p className="text-sm font-black text-[rgb(10,10,10)] uppercase tracking-tight">{user.name}</p>
                    <p className="text-[10px] text-[rgb(160,160,160)] font-medium truncate">{user.email}</p>
                  </div>
                  <div className="space-y-1">
                    <Link to="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-4 p-3 text-[10px] font-black uppercase tracking-widest text-[rgb(100,100,100)] hover:bg-[rgb(250,250,250)] hover:text-[rgb(10,10,10)] rounded-xl transition-all">
                      <User size={14} className="text-[rgb(212,175,55)]" /> My Profile
                    </Link>
                    <Link to="/my-orders" onClick={() => setProfileOpen(false)} className="flex items-center gap-4 p-3 text-[10px] font-black uppercase tracking-widest text-[rgb(100,100,100)] hover:bg-[rgb(250,250,250)] hover:text-[rgb(10,10,10)] rounded-xl transition-all">
                      <Package size={14} className="text-[rgb(212,175,55)]" /> Orders
                    </Link>
                  </div>
                  <div className="h-px bg-[rgb(250,250,250)] my-2 mx-2"></div>
                  <button onClick={handleLogout} className="flex items-center gap-4 p-3 text-[10px] font-black uppercase tracking-widest text-[rgb(225,29,72)] hover:bg-[rgb(255,241,242)] w-full rounded-xl transition-all text-left">
                    <LogOut size={14} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl border-2 border-[rgb(240,240,240)] text-[rgb(0,0,0)] dark:text-[rgb(255,255,255)] hover:bg-[rgb(0,0,0)] hover:text-[rgb(255,255,255)] hover:border-[rgb(0,0,0)] transition-all shadow-sm" aria-label="Account">
              <User size={18} />
            </Link>
          )}

          <button
            onClick={() => {
              setIsOpen(!isOpen);
              setProfileOpen(false);
            }}
            className="lg:hidden w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-[rgb(0,0,0)] dark:text-[rgb(255,255,255)] hover:bg-[rgb(245,245,245)] dark:hover:bg-[rgb(20,20,20)] rounded-xl sm:rounded-2xl transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* MEGA MENU COMPONENT */}
      <style>{`
        @keyframes rgb-text {
          0% { color: #ff0000; text-shadow: 0 0 15px rgba(255,0,0,0.3); }
          33% { color: #00ff00; text-shadow: 0 0 15px rgba(0,255,0,0.3); }
          66% { color: #0000ff; text-shadow: 0 0 15px rgba(0,0,255,0.3); }
          100% { color: #ff0000; text-shadow: 0 0 15px rgba(255,0,0,0.3); }
        }
        .animate-rgb-text {
          animation: rgb-text 3s infinite linear;
        }
      `}</style>
      {activeMegaMenu && (
        <div
          ref={megaMenuRef}
          className="absolute top-full left-0 w-full bg-white dark:bg-[#111111] border-b border-[#111111]/5 dark:border-white/5 shadow-2xl z-[90] hidden lg:block overflow-hidden"
          onMouseEnter={() => setActiveMegaMenu(activeMegaMenu)}
        >
          <div className="max-w-[1440px] mx-auto px-12 py-12 grid grid-cols-4 gap-12">
            <div className="col-span-1">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#8B0000] mb-8">Categories</h4>
              <ul className="space-y-4">
                {navLinks.find(l => l.name === activeMegaMenu)?.subCategories.map(sub => (
                  <li key={sub} className="mega-item">
                    <Link
                      to={`/products?category=${activeMegaMenu}&type=${sub}`}
                      className="text-xs font-bold text-[#6B6B6B] dark:text-gray-400 hover:text-[#111111] dark:hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-4 h-[1px] bg-[#8B0000] transition-all"></span>
                      {sub}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-1">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#8B0000] mb-8">Featured</h4>
              <ul className="space-y-4">
                <li className="mega-item"><Link to="/products?collection=New+Arrivals" className="text-xs font-bold text-[#6B6B6B] dark:text-gray-400 hover:text-[#111111] dark:hover:text-white">New Arrivals</Link></li>
                <li className="mega-item"><Link to="/products?collection=Bestsellers" className="text-xs font-bold text-[#6B6B6B] dark:text-gray-400 hover:text-[#111111] dark:hover:text-white">Best Sellers</Link></li>
                <li className="mega-item"><Link to="/products?collection=Limited+Edition" className="text-xs font-bold text-[#8B0000]">Limited Edition</Link></li>
              </ul>
            </div>
            <div className="col-span-2 grid grid-cols-2 gap-6">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group cursor-pointer mega-item">
                <img
                  src={activeMegaMenu === 'Men' ? resolveImageUrl('/New-Samadhan-Shoe-Mart/Shoes-grey-men-1.jpg') : resolveImageUrl('/New-Samadhan-Shoe-Mart/IMG-20260928-WA0011.jpg')}
                  alt="Featured"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                  <span className="text-white text-xs font-black uppercase tracking-widest">Shop the Collection</span>
                </div>
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] group cursor-pointer mega-item">
                <img
                  src={activeMegaMenu === 'Sneakers' ? resolveImageUrl('/New-Samadhan-Shoe-Mart/Main-Shoe.png') : resolveImageUrl('/New-Samadhan-Shoe-Mart/IMG-20260928-WA0008.jpg')}
                  alt="Featured"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/40 flex items-end p-6">
                  <span className="text-white text-xs font-black uppercase tracking-widest">New Arrivals</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modern Animated Fullscreen Mobile Navigation */}
      {isOpen && (
        <div className="fixed inset-0 top-[5.5rem] sm:top-24 bg-[rgb(255,255,255)] dark:bg-[rgb(10,10,10)] z-[90] lg:hidden flex flex-col justify-between p-6 sm:p-8 overflow-y-auto animate-in fade-in slide-in-from-right duration-300">
          <div className="flex flex-col gap-3 pt-4">
            {navLinks.map((link, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between p-5 bg-[rgb(247,245,240)] dark:bg-[rgb(20,20,20)] rounded-2xl border border-[rgb(0,0,0)]/5 dark:border-[rgb(255,255,255)]/5 shadow-sm">
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className="text-[10px] font-black uppercase tracking-[0.2em] text-[rgb(17,17,17)] dark:text-[rgb(240,240,240)] flex-1"
                  >
                    {link.name}
                  </Link>
                  <ArrowRight size={14} className="text-[rgb(107,107,107)]" />
                </div>
                <div className="flex flex-wrap gap-2 px-2 pb-2">
                   {link.subCategories.slice(0, 3).map(sub => (
                     <Link
                       key={sub}
                       to={`${link.path}&type=${sub}`}
                       onClick={() => setIsOpen(false)}
                       className="text-[8px] font-bold text-gray-400 uppercase tracking-widest bg-gray-50 dark:bg-white/5 px-3 py-1.5 rounded-full"
                     >
                       {sub}
                     </Link>
                   ))}
                </div>
              </div>
            ))}

            {[{name: 'Workshop', path: '/workshop'}, {name: 'Gallery', path: '/gallery'}, {name: 'About', path: '/about'}].map((item, idx) => (
              <Link
                key={idx}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className="mobile-nav-link flex items-center justify-between p-5 bg-[rgb(247,245,240)] dark:bg-[rgb(20,20,20)] rounded-2xl border border-[rgb(0,0,0)]/5 dark:border-[rgb(255,255,255)]/5 shadow-sm hover:border-[rgb(139,0,0)]/20 transition-all"
              >
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[rgb(17,17,17)] dark:text-[rgb(240,240,240)]">{item.name}</span>
                <ArrowRight size={14} className="text-[rgb(107,107,107)]" />
              </Link>
            ))}

            {!user && (
              <div className="grid grid-cols-2 gap-4 pt-4 mobile-nav-link">
                <Link to="/login" onClick={() => setIsOpen(false)} className="py-4 text-center bg-[rgb(247,245,240)] dark:bg-[rgb(20,20,20)] text-[rgb(17,17,17)] dark:text-[rgb(240,240,240)] rounded-xl text-[9px] font-black uppercase tracking-widest border border-[rgb(0,0,0)]/10">Login</Link>
                <Link to="/identity" onClick={() => setIsOpen(false)} className="py-4 text-center bg-[rgb(17,17,17)] dark:bg-[rgb(255,255,255)] text-[rgb(255,255,255)] dark:text-[rgb(17,17,17)] rounded-xl text-[9px] font-black uppercase tracking-widest shadow-xl">Join Now</Link>
              </div>
            )}
          </div>

          <div className="pt-8 border-t border-[rgb(0,0,0)]/5 dark:border-[rgb(255,255,255)]/5 text-center">
             <p className="text-[9px] font-sans font-bold text-[rgb(107,107,107)] uppercase tracking-[0.4em]">NEW SAMADHAN SHOE MART © 2026</p>
          </div>
        </div>
      )}

      {/* PREMIUM CART DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[1000] overflow-hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-500"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tighter">Your Bag</h2>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">{cartCount} Items Selected</p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center hover:bg-black hover:text-white transition-all"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-hide">
              {cartItems.length > 0 ? (
                cartItems.map((item, idx) => (
                  <div key={`${item.id}-${item.size}`} className="flex gap-6 group">
                    <div className="w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden shrink-0 border border-gray-100">
                      <img
                        src={resolveImageUrl(item.image)}
                        alt={item.name}
                        className="w-full h-full object-contain p-2 group-hover:scale-110 transition-transform"
                        onError={(e) => { e.target.src = '/Shoes.png'; }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="text-sm font-black uppercase tracking-tight truncate pr-4">{item.name}</h4>
                        <button
                          onClick={() => removeFromCart(item.id, item.size)}
                          className="text-gray-300 hover:text-rose-500 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Size: {item.size} • UK/IN</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-100">
                          <button
                            onClick={() => {
                              if (item.qty > 1) {
                                addToCart(item, -1, item.size);
                              } else {
                                removeFromCart(item.id, item.size);
                              }
                            }}
                            className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-md transition-colors"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="w-8 text-center text-xs font-black">{item.qty}</span>
                          <button
                            onClick={() => addToCart(item, 1, item.size)}
                            className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-md transition-colors"
                          >
                            <Plus size={10} />
                          </button>
                        </div>
                        <span className="text-sm font-black">₹{(item.price * item.qty).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center py-20">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <ShoppingBag size={32} className="text-gray-200" />
                  </div>
                  <h3 className="text-xl font-black uppercase tracking-tighter mb-2">Your bag is empty</h3>
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-8">Start adding some heat to your collection</p>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/products');
                    }}
                    className="px-8 py-4 bg-black text-white rounded-full font-bold uppercase tracking-widest text-[10px] hover:bg-[#8B0000] transition-colors"
                  >
                    Shop Collection
                  </button>
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-8 border-t border-gray-100 bg-gray-50/50">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-1">Subtotal</p>
                    <p className="text-xs text-gray-500 font-bold italic">Shipping & taxes calculated at checkout</p>
                  </div>
                  <span className="text-3xl font-black tracking-tighter">₹{cartTotal.toLocaleString()}</span>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/checkout');
                  }}
                  className="w-full py-6 bg-black text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-[#8B0000] transition-all shadow-xl shadow-black/10 flex items-center justify-center gap-3 group"
                >
                  Proceed to Checkout <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                </button>

                <button
                  onClick={() => {
                     // Instant WhatsApp Order for whole cart
                     const message = `Hello New Samadhan Shoe Mart! 👋\n\nI want to place a Bulk Bag Order:\n\n${cartItems.map(item => `👟 *${item.name}* (Size: ${item.size}) x ${item.qty} = ₹${(item.price * item.qty).toLocaleString()}`).join('\n')}\n\n💰 *Total Amount:* ₹${cartTotal.toLocaleString()}\n\n--- CUSTOMER DETAILS ---\n👤 *Name:* ${user?.name || 'Guest'}\n📍 *Address:* ${user?.address || 'Not Provided'}\n\nI'm ready for payment. Please share details.`;
                     window.open(`https://wa.me/919423228843?text=${encodeURIComponent(message)}`, '_blank');
                  }}
                  className="w-full mt-4 py-4 bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle size={14} /> Quick WhatsApp Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
