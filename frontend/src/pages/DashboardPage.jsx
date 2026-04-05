import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import useFetch from '../hooks/useFetch';
import { gsap } from 'gsap';
import {
  Package, User, MapPin, Calendar, Clock, ChevronRight,
  Bell, ShieldCheck, CreditCard, Box, TrendingUp, Zap,
  Settings, LogOut, Info, CheckCircle2, Truck
} from 'lucide-react';
import { Link } from 'react-router-dom';

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const { loading, error, request } = useFetch();
  const [orders, setOrders] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await request('/api/orders/myorders');
        setOrders(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrders();

    // GSAP Entrance
    const ctx = gsap.context(() => {
      gsap.from('.dash-reveal', {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, [request]);

  if (!user) return null;

  const confirmedOrders = orders.filter(o => o.isPaid);
  const pendingDelivery = orders.filter(o => !o.isDelivered);

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-20 px-4 sm:px-8 lg:px-12" ref={containerRef}>
      <div className="max-w-7xl mx-auto">

        {/* --- TOP HEADER: WELCOME & STATUS --- */}
        <header className="mb-12 dash-reveal">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-px bg-blue-600"></div>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em]">Collector Dashboard</p>
              </div>
              <h1 className="text-5xl font-black text-slate-950 tracking-tighter">
                WELCOME, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">{user.name.toUpperCase()}</span>
              </h1>
            </div>

            <div className="flex items-center gap-4 bg-white p-2 rounded-full border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 pl-4 pr-6">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Account Security</p>
                  <p className="text-xs font-black text-slate-900">VERIFIED STATUS</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="w-12 h-12 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition-all duration-300"
              >
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* --- STATS GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Confirmed Drops', value: confirmedOrders.length, icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
            { label: 'In Transit', value: pendingDelivery.length, icon: Truck, color: 'text-blue-500', bg: 'bg-blue-50' },
            { label: 'Vault Value', value: '₹' + orders.reduce((acc, o) => acc + o.totalPrice, 0).toLocaleString(), icon: TrendingUp, color: 'text-indigo-500', bg: 'bg-indigo-50' },
            { label: 'Member Points', value: '2,450', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 group dash-reveal">
              <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                <stat.icon size={28} />
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
              <h3 className="text-3xl font-black text-slate-950 tracking-tighter">{stat.value}</h3>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* --- LEFT: MAIN ACTIVITY (ORDERS) --- */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[3.5rem] p-10 border border-slate-100 shadow-sm dash-reveal">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-black text-slate-950 tracking-tighter flex items-center gap-4">
                  <Box className="text-blue-600" /> CONFIRMED PRODUCTS
                </h2>
                <div className="px-4 py-2 bg-slate-50 rounded-full text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  {orders.length} TOTAL DROPS
                </div>
              </div>

              {loading ? (
                <div className="py-20 flex flex-col items-center gap-4">
                   <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                   <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Syncing Vault...</p>
                </div>
              ) : orders.length === 0 ? (
                <div className="text-center py-20 bg-slate-50 rounded-[2.5rem] border-2 border-dashed border-slate-200">
                  <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 font-bold mb-6 italic">No grails confirmed in your collection yet.</p>
                  <Link to="/products" className="bg-slate-950 text-white px-10 py-5 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all">
                    Start Collecting
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div key={order._id} className="group relative bg-slate-50 rounded-[2.5rem] overflow-hidden border border-transparent hover:border-blue-600/20 hover:bg-white hover:shadow-2xl transition-all duration-700">
                      <div className="p-8 flex flex-col md:flex-row gap-8 items-center">
                        {/* Order Preview Images */}
                        <div className="flex -space-x-8">
                          {order.orderItems.slice(0, 3).map((item, idx) => (
                            <div key={idx} className="w-20 h-20 rounded-2xl border-4 border-white overflow-hidden shadow-lg relative group-hover:scale-110 transition-transform duration-500" style={{ zIndex: 3 - idx }}>
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            </div>
                          ))}
                        </div>

                        <div className="flex-1 text-center md:text-left">
                           <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-1">ID: #{order._id.substring(order._id.length - 6).toUpperCase()}</p>
                           <h4 className="text-xl font-black text-slate-900 mb-2 truncate max-w-xs">
                             {order.orderItems.length} Products Confirmed
                           </h4>
                           <div className="flex items-center justify-center md:justify-start gap-4 text-slate-400">
                             <div className="flex items-center gap-1">
                               <Calendar size={12} />
                               <span className="text-[10px] font-bold uppercase tracking-wider">{new Date(order.createdAt).toLocaleDateString()}</span>
                             </div>
                             <div className="w-1 h-1 bg-slate-200 rounded-full"></div>
                             <div className="flex items-center gap-1">
                               <CreditCard size={12} />
                               <span className="text-[10px] font-bold uppercase tracking-wider">₹{order.totalPrice.toLocaleString()}</span>
                             </div>
                           </div>
                        </div>

                        <div className="flex items-center gap-6">
                           <div className="text-right hidden sm:block">
                              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Delivery Progress</p>
                              <div className="w-32 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                 <div className={`h-full bg-blue-600 transition-all duration-1000 ${order.isDelivered ? 'w-full' : 'w-1/2'}`}></div>
                              </div>
                           </div>
                           <Link
                            to={`/checkout`} // Link to order details if you have that page
                            className="w-14 h-14 bg-white text-slate-900 rounded-2xl flex items-center justify-center border border-slate-200 hover:bg-blue-600 hover:text-white transition-all duration-500 shadow-sm"
                           >
                              <ChevronRight size={24} />
                           </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* --- RIGHT: NOTIFICATIONS & LOCATION --- */}
          <div className="lg:col-span-4 space-y-8">

            {/* NOTIFICATION CENTER */}
            <div className="bg-white rounded-[3.5rem] p-10 border border-slate-100 shadow-sm dash-reveal">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-black text-slate-950 tracking-tighter flex items-center gap-3">
                  <Bell className="text-amber-500" /> ALERTS
                </h3>
                <span className="w-2 h-2 bg-rose-500 rounded-full animate-ping"></span>
              </div>
              <div className="space-y-6">
                {[
                  { title: 'New Drop Incoming', time: '2h ago', desc: 'The 2026 Yeezy Vision is launching tomorrow at 09:00 AM.', icon: Zap, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { title: 'Order Dispatched', time: '5h ago', desc: 'Your #VAULT-293 drop has left the logistics center.', icon: Truck, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                  { title: 'Market Volatility', time: '1d ago', desc: 'Jordan Retro High value increased by 14.5% today.', icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' }
                ].map((note, i) => (
                  <div key={i} className="flex gap-4 group cursor-pointer p-2 rounded-2xl hover:bg-slate-50 transition-colors">
                    <div className={`w-12 h-12 ${note.bg} ${note.color} rounded-xl flex-shrink-0 flex items-center justify-center`}>
                      <note.icon size={20} />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{note.title}</p>
                        <span className="text-[9px] font-bold text-slate-400">{note.time}</span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-relaxed line-clamp-2">{note.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-4 border border-slate-100 rounded-2xl text-[9px] font-black text-slate-400 uppercase tracking-widest hover:bg-slate-50 transition-all">
                Clear All Notifications
              </button>
            </div>

            {/* LOCATION CARD */}
            <div className="bg-slate-950 rounded-[3.5rem] p-10 text-white relative overflow-hidden dash-reveal shadow-2xl shadow-blue-900/20">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <MapPin size={120} />
              </div>
              <h3 className="text-xl font-black tracking-tighter mb-8 flex items-center gap-3 relative z-10">
                <MapPin className="text-blue-500" /> ACCESS NODE
              </h3>
              <div className="relative z-10">
                <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mb-2">Authenticated Location</p>
                <h4 className="text-2xl font-black mb-6">MUMBAI, INDIA</h4>

                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Network Speed</span>
                    <span className="text-xs font-black text-blue-400">0.4ms LAG</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl border border-white/10">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Login Security</span>
                    <span className="text-xs font-black text-emerald-400">ENCRYPTED</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-3 opacity-50">
                <Info size={14} />
                <p className="text-[9px] font-bold uppercase tracking-widest leading-none">Last login was 4 minutes ago via Chrome Desktop.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
