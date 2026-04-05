import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Menu, X, ShieldCheck, Search, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsOpen(false);
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/products' },
    { name: 'Service Centre', path: '/service' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white transform group-hover:rotate-12 transition-transform">
            <ShoppingBag size={24} />
          </div>
          <span className={`text-xl font-black tracking-tighter ${scrolled || location.pathname !== '/' ? 'text-slate-900' : 'text-white'}`}>
            SAMADHAN <span className="text-blue-500">SHOES</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-bold text-sm uppercase tracking-widest transition-colors ${
                location.pathname === link.path
                  ? 'text-blue-500'
                  : scrolled || location.pathname !== '/' ? 'text-slate-600 hover:text-blue-500' : 'text-white/80 hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4 md:gap-6">
          <button className={`p-2 rounded-full transition-colors ${scrolled || location.pathname !== '/' ? 'text-slate-600 hover:bg-slate-100' : 'text-white/80 hover:bg-white/10'}`}>
            <Search size={20} />
          </button>

          <Link to="/cart" className="relative group p-2">
            <ShoppingCart size={22} className={scrolled || location.pathname !== '/' ? 'text-slate-800' : 'text-white'} />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-blue-600 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white animate-bounce">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="hidden md:flex items-center gap-4 bg-slate-100 p-1 rounded-full pl-4 border border-slate-200">
              <span className="text-xs font-bold text-slate-700">{user.name.split(' ')[0]}</span>
              <div className="flex items-center gap-1">
                {user.role === 'admin' && (
                  <Link to="/admin" className="p-2 bg-white rounded-full text-red-500 hover:shadow-md transition-all">
                    <ShieldCheck size={18} />
                  </Link>
                )}
                <Link to="/dashboard" className="p-2 bg-white rounded-full text-slate-700 hover:shadow-md transition-all">
                  <User size={18} />
                </Link>
                <button onClick={handleLogout} className="p-2 bg-white rounded-full text-slate-400 hover:text-red-500 hover:shadow-md transition-all">
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className={`hidden md:flex btn-primary !py-2 !px-6 !text-sm ${
                !scrolled && location.pathname === '/' ? 'bg-white !text-slate-900 hover:bg-slate-100' : ''
              }`}
            >
              Sign In
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className={`lg:hidden p-2 rounded-xl ${scrolled || location.pathname !== '/' ? 'text-slate-900 bg-slate-100' : 'text-white bg-white/10'}`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-slate-950 z-[60] flex flex-col p-8 lg:hidden">
          <div className="flex justify-between items-center mb-12">
            <span className="text-2xl font-black text-white">MENU</span>
            <button onClick={() => setIsOpen(false)} className="p-3 bg-white/10 rounded-2xl text-white">
              <X size={28} />
            </button>
          </div>

          <nav className="flex flex-col gap-6 mb-auto">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-4xl font-bold text-white/50 hover:text-blue-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="space-y-4 pt-8 border-t border-white/10">
            {user ? (
              <div className="flex flex-col gap-4">
                <Link
                  to="/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-4 text-white text-xl font-bold"
                >
                  <User /> Profile
                </Link>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-4 text-red-400 text-xl font-bold"
                  >
                    <ShieldCheck /> Admin Panel
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-4 text-slate-400 text-xl font-bold text-left"
                >
                  <LogOut /> Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="btn-accent w-full text-center text-xl py-4"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
