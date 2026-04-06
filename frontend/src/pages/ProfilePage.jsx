import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import useFetch from '../hooks/useFetch';
import { gsap } from 'gsap';
import {
  User, Mail, Lock, ShieldCheck, Save, ArrowLeft,
  Camera, CheckCircle2, AlertCircle, RefreshCw, Phone, MapPin, Sparkles, Package, List, Settings, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const { user, setUser, logout } = useAuth();
  const { loading, error, request } = useFetch();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('identity'); // 'identity' or 'orders'
  const [orders, setOrders] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);

  // Form States
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const [city, setCity] = useState(user?.city || '');
  const [pincode, setPincode] = useState(user?.pincode || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchOrders = async () => {
      try {
        const data = await request('/api/orders/myorders');
        setOrders(data || []);
      } catch (err) {
        console.error("Order fetch failed:", err);
      }
    };

    if (activeTab === 'orders') {
       fetchOrders();
    }

    // GSAP Entrance
    gsap.from('.profile-reveal', {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: 'power3.out'
    });
  }, [user, navigate, activeTab, request]);

  const submitHandler = async (e) => {
    e.preventDefault();

    // Strict Identity Validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, '').replace('+91', ''))) {
      alert('Identity Rejected: WhatsApp number must be exactly 10 digits.');
      return;
    }

    const pinRegex = /^[0-9]{6}$/;
    if (!pinRegex.test(pincode)) {
      alert('Identity Rejected: Pincode must be exactly 6 digits.');
      return;
    }

    setIsUpdating(true);

    const updatedUser = {
      ...user,
      name,
      phone,
      address,
      city,
      pincode,
      identityVerified: true
    };

    setUser(updatedUser);
    localStorage.setItem('userInfo', JSON.stringify(updatedUser));

    if (!user?.isGuest) {
      try {
        await request('/api/users/profile', 'PUT', {
          name,
          email,
          phone,
          address,
          city,
          pincode,
          password,
        });
      } catch (err) {
        console.error("Server sync failed:", err);
      }
    }

    setIsUpdating(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  const displayAvatar = user?.avatar || (user?.gender === 'girl'
    ? 'https://cdn-icons-png.flaticon.com/512/6997/6997662.png'
    : 'https://cdn-icons-png.flaticon.com/512/4140/4140048.png');

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-24 px-4 sm:px-10 lg:px-20 relative overflow-x-hidden">
      {/* Global Blur Suppression */}
      <style dangerouslySetInnerHTML={{ __html: `
        * {
          backdrop-filter: none !important;
          -webkit-backdrop-filter: none !important;
          filter: none !important;
        }
      `}} />
      {/* Background patterns */}
      <div className="fixed inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-100"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16 profile-reveal">
          <div>
            <button onClick={() => navigate(-1)} className="group flex items-center gap-3 text-slate-400 hover:text-blue-600 transition-all mb-4">
              <ArrowLeft size={18} />
              <span className="font-black text-[10px] uppercase tracking-widest">Back to Catalog</span>
            </button>
            <h1 className="text-6xl font-black text-slate-950 tracking-tighter uppercase leading-none">
              MY <span className="text-blue-600">PROFILE.</span>
            </h1>
          </div>

          <div className="flex items-center gap-4 bg-white p-2 rounded-[2rem] border border-slate-200 shadow-sm">
             <button
                onClick={() => setActiveTab('identity')}
                className={`px-8 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'identity' ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' : 'text-slate-400 hover:text-slate-900'}`}
             >
                My Profile
             </button>
             <button
                onClick={() => setActiveTab('orders')}
                className={`px-8 py-4 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'orders' ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' : 'text-slate-400 hover:text-slate-900'}`}
             >
                Order History
             </button>
          </div>
        </div>

        {activeTab === 'identity' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start profile-reveal">

            {/* LEFT CARD: AVATAR & QUICK INFO */}
            <div className="lg:col-span-4 bg-white rounded-[3.5rem] p-10 border border-slate-200 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>

              <div className="relative inline-block mt-8">
                <div className="w-48 h-48 bg-slate-50 rounded-[3.5rem] flex items-center justify-center overflow-hidden border-8 border-white shadow-2xl transition-transform hover:scale-105 duration-700">
                   <img
                     src={displayAvatar}
                     alt="Profile"
                     className="w-full h-full object-cover"
                   />
                </div>
                <button
                  onClick={() => navigate('/identity')}
                  className="absolute -bottom-2 -right-2 w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-2xl border-4 border-white hover:bg-slate-950 transition-all hover:rotate-12"
                >
                  <Camera size={22} />
                </button>
              </div>

              <div className="mt-10 space-y-2">
                <h2 className="text-3xl font-black text-slate-950 uppercase tracking-tighter">{user.name}</h2>
                <p className="text-slate-400 font-bold text-xs">{user.email}</p>
                <div className="inline-flex items-center gap-2 mt-4 px-6 py-2 bg-blue-50 text-blue-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-blue-100">
                   Verified {user?.isGuest ? 'Guest' : 'Member'}
                </div>
              </div>

              <div className="mt-12 pt-10 border-t border-slate-50 grid grid-cols-2 gap-4">
                <div className="text-left p-4 bg-slate-50 rounded-2xl">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
                    <p className="text-[10px] font-black text-emerald-600 uppercase">ACTIVE</p>
                 </div>
                 <div className="text-left p-4 bg-slate-50 rounded-2xl">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">Since</p>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-tight">2024</p>
                 </div>
              </div>

              <button
                onClick={logout}
                className="w-full mt-10 py-5 bg-rose-50 text-rose-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-500 hover:text-white transition-all border border-rose-100 flex items-center justify-center gap-3"
              >
                Logout Account
              </button>
            </div>

            {/* RIGHT CARD: EDIT PROFILE FORM */}
            <div className="lg:col-span-8 bg-white rounded-[4rem] p-12 border border-slate-200 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)]">
              <h3 className="text-2xl font-black text-slate-950 uppercase tracking-tighter mb-12 flex items-center gap-4">
                 <Settings size={24} className="text-blue-600" /> PROFILE SETTINGS
              </h3>

              {success && (
                <div className="mb-10 p-6 bg-emerald-50 border border-emerald-100 rounded-[2rem] flex items-center gap-6 text-emerald-600 animate-in fade-in slide-in-from-top-4 shadow-xl shadow-emerald-500/5">
                  <CheckCircle2 size={24} />
                  <p className="font-black text-[10px] uppercase tracking-widest">Profile Updated Successfully</p>
                </div>
              )}

              <form onSubmit={submitHandler} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Full Name</label>
                    <input
                      type="text"
                      className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600/20 outline-none transition-all font-bold text-slate-900 shadow-inner"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Email Address</label>
                    <input
                      type="email"
                      disabled
                      className="w-full px-8 py-5 bg-slate-100 border-2 border-transparent rounded-2xl font-bold text-slate-400 cursor-not-allowed"
                      value={email}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">WhatsApp Number</label>
                    <input
                      type="text"
                      className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600/20 outline-none transition-all font-bold text-slate-900 shadow-inner"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Physical Address (Street, Landmark)</label>
                    <input
                      type="text"
                      className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600/20 outline-none transition-all font-bold text-slate-900 shadow-inner"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">City / District</label>
                    <input
                      type="text"
                      className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600/20 outline-none transition-all font-bold text-slate-900 shadow-inner"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-4">Pincode</label>
                    <input
                      type="text"
                      className="w-full px-8 py-5 bg-slate-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-600/20 outline-none transition-all font-bold text-slate-900 shadow-inner"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isUpdating}
                  className="w-full bg-slate-950 text-white py-8 rounded-[2rem] font-black uppercase tracking-[0.4em] text-xs hover:bg-blue-600 transition-all duration-700 shadow-2xl flex items-center justify-center gap-6 group disabled:opacity-50"
                >
                  {isUpdating ? <RefreshCw className="animate-spin" /> : <><Save size={20} /> Update Profile</>}
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* ORDER HISTORY TAB */
          <div className="bg-white rounded-[4rem] p-12 border border-slate-200 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] profile-reveal min-h-[600px]">
             <div className="flex justify-between items-center mb-12">
                <h3 className="text-2xl font-black text-slate-950 uppercase tracking-tighter flex items-center gap-4">
                   <Package size={24} className="text-blue-600" /> ORDER HISTORY
                </h3>
                <div className="px-6 py-2 bg-slate-50 rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest">
                   {orders.length} TOTAL ORDERS
                </div>
             </div>

             {loading ? (
                <div className="flex flex-col items-center justify-center py-40 gap-4">
                   <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Loading Orders...</p>
                </div>
             ) : orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-40 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
                   <Package size={48} className="text-slate-200 mb-6" />
                   <p className="text-slate-400 font-bold italic mb-8">No order history found.</p>
                   <Link to="/products" className="px-12 py-5 bg-slate-950 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl">
                      Start Shopping
                   </Link>
                </div>
             ) : (
                <div className="space-y-6">
                   {orders.map((order) => (
                      <div key={order._id} className="p-8 bg-slate-50 rounded-[2.5rem] border border-transparent hover:border-blue-600/20 hover:bg-white hover:shadow-2xl transition-all duration-700 group">
                         <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                            <div className="flex items-center gap-6">
                               <div className="w-20 h-20 bg-white rounded-2xl p-2 border border-slate-100 shadow-sm flex items-center justify-center">
                                  <img src={order.orderItems[0]?.image} alt="Order" className="w-full h-full object-cover rounded-xl" />
                               </div>
                               <div>
                                  <p className="text-[9px] font-black text-blue-600 uppercase tracking-widest mb-1">ID: #{order._id.substring(order._id.length - 6).toUpperCase()}</p>
                                  <h4 className="text-xl font-black text-slate-950">{order.orderItems.length} Products</h4>
                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString()}</p>
                               </div>
                            </div>

                            <div className="flex items-center gap-12">
                               <div className="text-center md:text-right">
                                  <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">Total Price</p>
                                  <p className="text-xl font-black text-slate-950">₹{order.totalPrice.toLocaleString()}</p>
                               </div>
                               <div className={`px-6 py-3 rounded-full text-[9px] font-black uppercase tracking-widest border ${order.isDelivered ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                                  {order.isDelivered ? 'Delivered' : 'In Transit'}
                               </div>
                               <button className="w-12 h-12 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                                  <ChevronRight size={20} />
                               </button>
                            </div>
                         </div>
                      </div>
                   ))}
                </div>
             )}
          </div>
        )}

        <div className="mt-20 text-center profile-reveal">
           <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.6em] flex items-center justify-center gap-4">
             <ShieldCheck size={14} className="text-blue-600" /> Secure Verification • New Samadhan Shoe Mart
           </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
