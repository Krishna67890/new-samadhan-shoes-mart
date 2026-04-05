import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import {
  ShoppingBag, User, LogOut, Menu, X,
  Settings, ChevronDown, LayoutDashboard,
  Package, Wrench, Home, ShoppingCart, ShieldCheck
} from 'lucide-react';

const Navbar = () => {
  const { user, logout, isAdmin } = useAuth();
  const { cartItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    setIsOpen(false);
    navigate('/');
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className="fixed top-0 w-full z-[100] bg-[#050505]/80 backdrop-blur-2xl border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-4 group z-[110]">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-[0_0_30px_rgba(37,99,235,0.3)] group-hover:rotate-12 transition-transform border border-blue-500/50">S</div>
          <div className="flex flex-col">
            <span className="font-black text-white tracking-tighter text-2xl uppercase leading-none hidden sm:block">Samadhan<span className="text-blue-600">Shoes</span></span>
            <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.4em] leading-none mt-1 hidden sm:block">The Vault 2026</span>
          </div>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-12">
          <Link to="/" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-all">Home</Link>
          <Link to="/products" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-all">The Vault</Link>
          <Link to="/service-centre" className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 hover:text-white transition-all flex items-center gap-3">
            <Wrench size={16} /> Service Hub
          </Link>

          {isAdmin && (
            <Link to="/admin" className="px-6 py-3 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 hover:text-white transition-all shadow-2xl">
              Command
            </Link>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-6 z-[110]">
          <Link to="/cart" className="relative group p-2">
            <div className="w-12 h-12 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-all backdrop-blur-md">
              <ShoppingBag className="text-white group-hover:text-blue-500 transition-colors" size={24} />
            </div>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-6 h-6 bg-blue-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-[#050505] shadow-xl animate-pulse">
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
                className="flex items-center gap-4 pl-4 py-2 pr-2 bg-white/5 rounded-2xl border border-white/10 hover:border-blue-500/50 transition-all backdrop-blur-md"
              >
                <div className="hidden lg:flex flex-col items-end mr-2">
                   <span className="text-[10px] font-black text-white uppercase tracking-tighter leading-none">{user.name}</span>
                   <span className="text-[8px] font-bold text-slate-500 lowercase leading-none mt-1.5">{user.email}</span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-600/20 flex items-center justify-center text-blue-500 font-bold overflow-hidden border border-blue-500/30 shadow-sm no-blur">
                   {user?.avatar ? (
                     <img
                       src={user.avatar}
                       alt="Profile"
                       className="w-full h-full object-cover sharp-img"
                       onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${user.name}&background=2563eb&color=fff`; }}
                     />
                   ) : (
                     <span className="uppercase text-lg">{user?.name ? user.name[0] : 'U'}</span>
                   )}
                </div>
                <ChevronDown size={14} className={`text-slate-500 transition-transform hidden sm:block ${profileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* DESKTOP DROPDOWN */}
              {profileOpen && (
                <div className="absolute right-0 mt-6 w-72 bg-[#111] backdrop-blur-3xl rounded-[2.5rem] border border-white/10 shadow-[0_40px_80px_rgba(0,0,0,0.5)] p-4 animate-in fade-in slide-in-from-top-4 z-[120]">
                  <div className="p-5 mb-3 border-b border-white/5 lg:hidden">
                    <p className="text-[11px] font-black text-white uppercase tracking-widest">{user.name}</p>
                    <p className="text-[9px] font-bold text-slate-500 mt-1">{user.email}</p>
                  </div>
                  <Link to="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-5 p-5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-white/5 hover:text-white rounded-[1.5rem] transition-all">
                    <User size={18} className="text-blue-500" /> Profile Dashboard
                  </Link>
                  <Link to="/my-orders" onClick={() => setProfileOpen(false)} className="flex items-center gap-5 p-5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-white/5 hover:text-white rounded-[1.5rem] transition-all">
                    <Package size={18} className="text-indigo-500" /> Order History
                  </Link>
                  <Link to="/identity" onClick={() => setProfileOpen(false)} className="flex items-center gap-5 p-5 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-white/5 hover:text-white rounded-[1.5rem] transition-all">
                    <ShieldCheck size={18} className="text-emerald-500" /> Identity Sync
                  </Link>
                  <div className="h-px bg-white/5 my-3 mx-5"></div>
                  <button onClick={handleLogout} className="flex items-center gap-5 p-5 text-[10px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-500/10 w-full rounded-[1.5rem] transition-all text-left">
                    <LogOut size={18} /> Terminate Session
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-6">
              <Link to="/login" className="text-[10px] font-black text-slate-500 uppercase tracking-widest hover:text-white transition-colors">Login</Link>
              <Link to="/identity" className="px-8 py-4 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl hover:bg-blue-600 hover:text-white hover:-translate-y-1 transition-all">Sync Identity</Link>
            </div>
          )}

          <button
            onClick={() => {
              setIsOpen(!isOpen);
              setProfileOpen(false);
            }}
            className="md:hidden w-12 h-12 flex items-center justify-center text-white bg-white/5 rounded-2xl border border-white/10 transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 top-24 bg-[#050505] z-[90] md:hidden animate-in fade-in slide-in-from-right overflow-y-auto no-blur">
          <div className="p-8 space-y-6">
            <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center justify-between p-8 bg-white/5 rounded-[2.5rem] border border-white/5 group">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-500 shadow-sm"><Home size={24} /></div>
                <span className="text-sm font-black uppercase tracking-[0.2em] text-white">Home</span>
              </div>
              <ChevronDown className="-rotate-90 text-slate-700" size={20} />
            </Link>

            <Link to="/products" onClick={() => setIsOpen(false)} className="flex items-center justify-between p-8 bg-white/5 rounded-[2.5rem] border border-white/5 group">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-indigo-600/20 rounded-2xl flex items-center justify-center text-indigo-500 shadow-sm"><ShoppingCart size={24} /></div>
                <span className="text-sm font-black uppercase tracking-[0.2em] text-white">The Vault</span>
              </div>
              <ChevronDown className="-rotate-90 text-slate-700" size={20} />
            </Link>

            <Link to="/service-centre" onClick={() => setIsOpen(false)} className="flex items-center justify-between p-8 bg-white/5 rounded-[2.5rem] border border-white/5 group">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 bg-emerald-600/20 rounded-2xl flex items-center justify-center text-emerald-500 shadow-sm"><Wrench size={24} /></div>
                <span className="text-sm font-black uppercase tracking-[0.2em] text-white">Service Hub</span>
              </div>
              <ChevronDown className="-rotate-90 text-slate-700" size={20} />
            </Link>

            {!user && (
              <div className="grid grid-cols-2 gap-6 pt-4">
                <Link to="/login" onClick={() => setIsOpen(false)} className="py-6 text-center bg-white/5 text-white rounded-[2rem] text-[10px] font-black uppercase tracking-widest border border-white/5">Login</Link>
                <Link to="/identity" onClick={() => setIsOpen(false)} className="py-6 text-center bg-white text-black rounded-[2rem] text-[10px] font-black uppercase tracking-widest shadow-2xl">Sync Identity</Link>
              </div>
            )}

            {isAdmin && (
               <Link to="/admin" onClick={() => setIsOpen(false)} className="flex items-center justify-center p-8 bg-blue-600 text-white rounded-[2.5rem] gap-5">
                  <LayoutDashboard size={20} />
                  <span className="text-xs font-black uppercase tracking-widest">Store Command</span>
               </Link>
            )}

            {user && (
              <div className="space-y-6">
                <div className="h-px bg-white/5 mx-6"></div>
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] px-8">Account Management</p>
                <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center justify-between p-8 bg-white/5 rounded-[2.5rem] border border-white/5 group">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-blue-500 border border-white/5"><User size={24} /></div>
                    <span className="text-sm font-black uppercase tracking-[0.2em] text-white">Profile Dashboard</span>
                  </div>
                  <ChevronDown className="-rotate-90 text-slate-700" size={20} />
                </Link>
                <Link to="/my-orders" onClick={() => setIsOpen(false)} className="flex items-center justify-between p-8 bg-white/5 rounded-[2.5rem] border border-white/5 group">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-indigo-500 border border-white/5"><Package size={24} /></div>
                    <span className="text-sm font-black uppercase tracking-[0.2em] text-white">Order History</span>
                  </div>
                  <ChevronDown className="-rotate-90 text-slate-700" size={20} />
                </Link>
                <button onClick={handleLogout} className="w-full flex items-center justify-center p-8 bg-rose-500/10 text-rose-500 rounded-[2.5rem] gap-5 font-black uppercase tracking-widest text-[10px] border border-rose-500/20">
                  <LogOut size={20} /> Terminate Session
                </button>
              </div>
            )}
          </div>

          <div className="p-10 mt-auto border-t border-white/5">
             <p className="text-[9px] font-black text-slate-600 uppercase tracking-[0.5em] text-center">New Samadhan Shoes Mart © 2026</p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

