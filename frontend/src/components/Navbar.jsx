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
    <nav className="fixed top-0 w-full z-[100] bg-white border-b border-slate-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group z-[110]">
          <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-blue-200 group-hover:rotate-12 transition-transform">S</div>
          <span className="font-black text-slate-950 tracking-tighter text-2xl uppercase hidden sm:block">Samadhan<span className="text-blue-600">Shoes</span></span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-10">
          <Link to="/" className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-all">Home</Link>
          <Link to="/products" className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-all">Shop</Link>
          <Link to="/service-centre" className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-all flex items-center gap-2">
            <Wrench size={16} /> Service
          </Link>

          {isAdmin && (
            <Link to="/admin" className="px-5 py-2.5 bg-slate-950 text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-600 transition-all hover:shadow-xl hover:shadow-blue-200">
              Store Command
            </Link>
          )}
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-4 sm:gap-6 z-[110]">
          <Link to="/cart" className="relative group p-2">
            <ShoppingBag className="text-slate-950 group-hover:text-blue-600 transition-colors" size={26} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-lg animate-bounce">
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
                className="flex items-center gap-3 pl-3 py-1.5 pr-1.5 bg-slate-50 rounded-full border border-slate-100 hover:border-blue-200 transition-all"
              >
                <div className="hidden lg:flex flex-col items-end mr-1">
                   <span className="text-[10px] font-black text-slate-950 uppercase tracking-tighter leading-none">{user.name}</span>
                   <span className="text-[8px] font-bold text-slate-400 lowercase leading-none mt-1">{user.email}</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold overflow-hidden border-2 border-white shadow-sm ring-2 ring-slate-50 no-blur">
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
                <ChevronDown size={14} className={`text-slate-400 transition-transform hidden sm:block ${profileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* DESKTOP DROPDOWN */}
              {profileOpen && (
                <div className="absolute right-0 mt-4 w-64 bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-3 animate-in fade-in slide-in-from-top-4 z-[120]">
                  <div className="p-4 mb-2 border-b border-slate-50 lg:hidden">
                    <p className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{user.name}</p>
                    <p className="text-[8px] font-bold text-slate-400 mt-1">{user.email}</p>
                  </div>
                  <Link to="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-4 p-4 text-[11px] font-black uppercase tracking-widest text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-[1.5rem] transition-all">
                    <User size={18} /> Profile Dashboard
                  </Link>
                  <Link to="/my-orders" onClick={() => setProfileOpen(false)} className="flex items-center gap-4 p-4 text-[11px] font-black uppercase tracking-widest text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-[1.5rem] transition-all">
                    <Package size={18} /> Order History
                  </Link>
                  <Link to="/identity" onClick={() => setProfileOpen(false)} className="flex items-center gap-4 p-4 text-[11px] font-black uppercase tracking-widest text-slate-600 hover:bg-blue-50 hover:text-blue-600 rounded-[1.5rem] transition-all">
                    <ShieldCheck size={18} /> Identity Verification
                  </Link>
                  <div className="h-px bg-slate-50 my-2 mx-4"></div>
                  <button onClick={handleLogout} className="flex items-center gap-4 p-4 text-[11px] font-black uppercase tracking-widest text-rose-500 hover:bg-rose-50 hover:text-rose-600 w-full rounded-[1.5rem] transition-all text-left">
                    <LogOut size={18} /> Terminate Session
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <Link to="/login" className="text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-blue-600 transition-colors">Login</Link>
              <Link to="/identity" className="px-8 py-3.5 bg-blue-600 text-white rounded-full text-[11px] font-black uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-slate-950 hover:-translate-y-1 transition-all">Sync Identity</Link>
            </div>
          )}

          <button
            onClick={() => {
              setIsOpen(!isOpen);
              setProfileOpen(false);
            }}
            className="md:hidden p-2 text-slate-950 hover:bg-slate-50 rounded-xl transition-colors"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 top-20 bg-white z-[90] md:hidden animate-in fade-in slide-in-from-right overflow-y-auto no-blur">
          <div className="p-8 space-y-6">
            <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100 group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm"><Home size={24} /></div>
                <span className="text-sm font-black uppercase tracking-widest text-slate-900">Home</span>
              </div>
              <ChevronDown className="-rotate-90 text-slate-300" size={20} />
            </Link>

            <Link to="/products" onClick={() => setIsOpen(false)} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100 group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm"><ShoppingCart size={24} /></div>
                <span className="text-sm font-black uppercase tracking-widest text-slate-900">Elite Catalog</span>
              </div>
              <ChevronDown className="-rotate-90 text-slate-300" size={20} />
            </Link>

            <Link to="/service-centre" onClick={() => setIsOpen(false)} className="flex items-center justify-between p-6 bg-slate-50 rounded-[2rem] border border-slate-100 group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm"><Wrench size={24} /></div>
                <span className="text-sm font-black uppercase tracking-widest text-slate-900">Service Hub</span>
              </div>
              <ChevronDown className="-rotate-90 text-slate-300" size={20} />
            </Link>

            {!user && (
              <div className="grid grid-cols-2 gap-4 pt-4">
                <Link to="/login" onClick={() => setIsOpen(false)} className="py-5 text-center bg-slate-100 text-slate-900 rounded-[2rem] text-xs font-black uppercase tracking-widest">Login</Link>
                <Link to="/identity" onClick={() => setIsOpen(false)} className="py-5 text-center bg-blue-600 text-white rounded-[2rem] text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-100">Sync Identity</Link>
              </div>
            )}

            {isAdmin && (
               <Link to="/admin" onClick={() => setIsOpen(false)} className="flex items-center justify-center p-6 bg-slate-950 text-white rounded-[2rem] gap-4">
                  <LayoutDashboard size={20} />
                  <span className="text-xs font-black uppercase tracking-widest">Store Command</span>
               </Link>
            )}

            {user && (
              <div className="space-y-4">
                <div className="h-px bg-slate-100 mx-4"></div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-6">User Account</p>
                <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center justify-between p-6 bg-white rounded-[2rem] border border-slate-100 group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-600 shadow-sm"><User size={24} /></div>
                    <span className="text-sm font-black uppercase tracking-widest text-slate-900">Profile Dashboard</span>
                  </div>
                  <ChevronDown className="-rotate-90 text-slate-300" size={20} />
                </Link>
                <Link to="/my-orders" onClick={() => setIsOpen(false)} className="flex items-center justify-between p-6 bg-white rounded-[2rem] border border-slate-100 group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-600 shadow-sm"><Package size={24} /></div>
                    <span className="text-sm font-black uppercase tracking-widest text-slate-900">Order History</span>
                  </div>
                  <ChevronDown className="-rotate-90 text-slate-300" size={20} />
                </Link>
                <button onClick={handleLogout} className="w-full flex items-center justify-center p-6 bg-rose-50 text-rose-600 rounded-[2rem] gap-4 font-black uppercase tracking-widest text-xs border border-rose-100">
                  <LogOut size={20} /> Terminate Session
                </button>
              </div>
            )}
          </div>

          <div className="p-8 mt-auto border-t border-slate-50">
             <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] text-center">New Samadhan Shoes Mart © 2024</p>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

