import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import useFetch from '../hooks/useFetch';
import { indiaData } from '../utils/indiaData';
import {
  ShoppingBag,
  User,
  Phone,
  MapPin,
  Truck,
  ShieldCheck,
  ArrowLeft,
  MessageCircle,
  Zap,
  ChevronRight,
  Info
} from 'lucide-react';

const CheckoutPage = () => {
  const { user } = useAuth();
  const { cartItems, cartTotal, clearCart } = useCart();
  const { request } = useFetch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    state: user?.state || '',
    city: user?.city || '',
    pincode: user?.pincode || '',
  });

  const [paymentMethod, setPaymentMethod] = useState('whatsapp');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (name === 'state') {
        setFormData(prev => ({ ...prev, city: '' }));
    }
  };

  const processPayment = () => {
    if (paymentMethod === 'online') {
      alert("Razorpay Secure Gateway Initializing... (Keys required in Vercel Env)");
      // Logic for Razorpay would go here
      return;
    }
    sendWhatsAppOrder();
  };

  const sendWhatsAppOrder = async () => {
    setLoading(true);

    const orderRef = `SSM-${Date.now()}`;

    // Sync to Database for "My Orders" history
    try {
      await request('/api/orders', 'POST', {
        orderItems: cartItems.map(item => ({
          name: item.name,
          qty: item.qty,
          image: item.images[0],
          price: item.price,
          product: item._id,
          size: item.size
        })),
        shippingAddress: {
          address: formData.address,
          city: formData.city,
          postalCode: formData.pincode,
          state: formData.state,
        },
        paymentMethod: 'WhatsApp',
        totalPrice: cartTotal,
        phone: formData.phone
      });
    } catch (err) {
      console.error("Database sync failed, proceeding with WhatsApp only:", err);
    }

    // Dual Shopkeeper Protocol - Load Balancing with Math.random()
    const shopNumbers = ["919423228843", "918888644021"];
    const targetNum = shopNumbers[Math.floor(Math.random() * shopNumbers.length)];

    let message = `🚀 *NEW ORDER RECEIVED - NEW SAMADHAN SHOE MART*\n`;
    message += `--------------------------------------\n`;
    message += `👤 *CUSTOMER:* ${formData.name.toUpperCase()}\n`;
    message += `📞 *PHONE:* ${formData.phone}\n`;
    message += `📍 *SHIPPING ADDRESS:* ${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}\n`;
    message += `--------------------------------------\n`;
    message += `👟 *PRODUCTS:*\n`;
    cartItems.forEach(item => {
      message += `  - ${item.name} (Size ${item.size}) x${item.qty} [₹${(item.price * item.qty).toLocaleString()}]\n`;
    });
    message += `💰 *TOTAL AMOUNT:* ₹${cartTotal.toLocaleString()}\n`;
    message += `🏢 *ORIGIN:* New Samadhan Shoe Mart Factory, Nashik\n`;
    message += `--------------------------------------\n`;
    message += `✅ *ORDER REF:* #${orderRef}\n`;
    message += `🏪 *SHOP CONTACTS: 9423228843 | 8888644021*`;

    const encodedMsg = encodeURIComponent(message);

    // Dual Shopkeeper Protocol - Randomized Redirect
    window.location.href = `https://wa.me/${targetNum}?text=${encodedMsg}`;

    // Note: window.location.href will navigate away, so we shouldn't attempt a second immediate redirect
    // unless the user comes back. For dual notification, usually a backend does this or we stick to one primary.
    // However, if we must do two, the second one will likely be blocked or never reached.
    // Given the "window.location.href is preferred" instruction, we prioritize direct navigation.

    // Clear cart and redirect
    setTimeout(() => {
      clearCart();
      navigate('/profile');
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="bg-[#F7F5F0] min-h-screen pt-32 pb-24 px-6 relative overflow-hidden text-[#111111]">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#8B0000]/5 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">

        <button
          onClick={() => navigate('/cart')}
          className="flex items-center gap-4 text-[#6B6B6B] hover:text-[#111111] transition-all mb-12 group"
        >
          <div className="w-10 h-10 bg-white border border-[#111111]/5 rounded-xl flex items-center justify-center group-hover:bg-[#111111] group-hover:text-white transition-all shadow-sm">
            <ArrowLeft size={18} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-widest">Return to Vault</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* LEFT: CHECKOUT FORM */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white p-10 md:p-16 rounded-[4rem] border border-[#111111]/5 shadow-xl">
              <div className="flex items-center gap-6 mb-12">
                 <div className="w-14 h-14 bg-[#8B0000] rounded-[1.5rem] flex items-center justify-center text-white shadow-lg">
                    <User size={28} />
                 </div>
                 <div>
                    <h2 className="text-4xl font-editorial font-black text-[#111111] tracking-tighter uppercase leading-none">Delivery Protocol</h2>
                    <p className="text-[#6B6B6B] text-[9px] font-bold uppercase tracking-[0.3em] mt-2 italic">Secured Identity Verification</p>
                 </div>
              </div>

              <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-4">
                      <label className="text-[9px] font-bold text-[#6B6B6B] uppercase tracking-[0.4em] ml-6">Legal Name</label>
                      <div className="relative">
                         <input
                           name="name"
                           value={formData.name}
                           onChange={handleInputChange}
                           className="w-full pl-16 pr-8 py-6 bg-[#F7F5F0] rounded-[2rem] font-bold text-[#111111] outline-none border border-[#111111]/5 focus:border-[#8B0000]/30 transition-all placeholder:text-[#111111]/20"
                           placeholder="Elite Member Name"
                         />
                         <User className="absolute left-6 top-1/2 -translate-y-1/2 text-[#6B6B6B]" size={20} />
                      </div>
                   </div>
                   <div className="space-y-4">
                      <label className="text-[9px] font-bold text-[#6B6B6B] uppercase tracking-[0.4em] ml-6">WhatsApp Sync</label>
                      <div className="relative">
                         <input
                           name="phone"
                           value={formData.phone}
                           onChange={handleInputChange}
                           className="w-full pl-16 pr-8 py-6 bg-[#F7F5F0] rounded-[2rem] font-bold text-[#111111] outline-none border border-[#111111]/5 focus:border-[#8B0000]/30 transition-all placeholder:text-[#111111]/20"
                           placeholder="+91 XXXXX XXXXX"
                         />
                         <Phone className="absolute left-6 top-1/2 -translate-y-1/2 text-[#6B6B6B]" size={20} />
                      </div>
                   </div>
                </div>

                <div className="space-y-4">
                   <label className="text-[9px] font-bold text-[#6B6B6B] uppercase tracking-[0.4em] ml-6">Vault Shipping Destination</label>
                   <div className="relative">
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full pl-16 pr-8 py-6 bg-[#F7F5F0] rounded-[2rem] font-bold text-[#111111] outline-none border border-[#111111]/5 focus:border-[#8B0000]/30 transition-all min-h-[140px] placeholder:text-[#111111]/20"
                        placeholder="Complete Street Address & Landmarks"
                      />
                      <MapPin className="absolute left-6 top-8 text-[#6B6B6B]" size={20} />
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   <div className="space-y-4">
                      <label className="text-[9px] font-bold text-[#6B6B6B] uppercase tracking-[0.4em] ml-6">Province</label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-8 py-6 bg-[#F7F5F0] rounded-[2rem] font-bold text-[#111111] outline-none border border-[#111111]/5 focus:border-[#8B0000]/30 transition-all appearance-none cursor-pointer"
                      >
                         <option value="">Select State</option>
                         {indiaData.states.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                   </div>
                   <div className="space-y-4">
                      <label className="text-[9px] font-bold text-[#6B6B6B] uppercase tracking-[0.4em] ml-6">Metro / City</label>
                      {indiaData.citiesByState[formData.state] ? (
                        <select
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-8 py-6 bg-[#F7F5F0] rounded-[2rem] font-bold text-[#111111] outline-none border border-[#111111]/5 focus:border-[#8B0000]/30 transition-all appearance-none cursor-pointer"
                        >
                           <option value="">Select City</option>
                           {indiaData.citiesByState[formData.state].map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      ) : (
                        <input
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-8 py-6 bg-[#F7F5F0] rounded-[2rem] font-bold text-[#111111] outline-none border border-[#111111]/5 focus:border-[#8B0000]/30 transition-all placeholder:text-[#111111]/20"
                          placeholder="Enter City"
                        />
                      )}
                   </div>
                   <div className="space-y-4">
                      <label className="text-[9px] font-bold text-[#6B6B6B] uppercase tracking-[0.4em] ml-6">Postal Code</label>
                      <input
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full px-8 py-6 bg-[#F7F5F0] rounded-[2rem] font-bold text-[#111111] outline-none border border-[#111111]/5 focus:border-[#8B0000]/30 transition-all placeholder:text-[#111111]/20"
                        placeholder="6 Digits"
                      />
                   </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-12 rounded-[4rem] border border-[#111111]/5 shadow-xl">
               <h3 className="text-2xl font-editorial font-bold text-[#111111] uppercase tracking-tighter mb-10 flex items-center gap-4">
                  <Zap className="text-[#8B0000]" size={24} /> Payment Channel
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <button
                    onClick={() => setPaymentMethod('whatsapp')}
                    className={`p-8 rounded-[2.5rem] border-2 transition-all flex flex-col items-center gap-6 group ${paymentMethod === 'whatsapp' ? 'border-[#8B0000] bg-[#8B0000]/5' : 'border-[#111111]/5 bg-[#F7F5F0] hover:border-[#8B0000]/20'}`}
                  >
                     <MessageCircle size={36} className={paymentMethod === 'whatsapp' ? 'text-[#8B0000]' : 'text-[#6B6B6B]'} />
                     <div className="text-center">
                        <p className="font-bold text-[#111111] uppercase text-xs tracking-widest">WhatsApp Direct</p>
                        <p className="text-[9px] text-[#6B6B6B] font-bold uppercase mt-2 tracking-widest italic">Fastest Clearance</p>
                     </div>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('online')}
                    className={`p-8 rounded-[2.5rem] border-2 transition-all flex flex-col items-center gap-6 group ${paymentMethod === 'online' ? 'border-[#8B0000] bg-[#8B0000]/5' : 'border-[#111111]/5 bg-[#F7F5F0] hover:border-[#8B0000]/20'}`}
                  >
                     <ShieldCheck size={36} className={paymentMethod === 'online' ? 'text-[#8B0000]' : 'text-[#6B6B6B]'} />
                     <div className="text-center">
                        <p className="font-bold text-[#111111] uppercase text-xs tracking-widest">Secure Gateway</p>
                        <p className="text-[9px] text-[#6B6B6B] font-bold uppercase mt-2 tracking-widest italic">UPI / Cards / Net Banking</p>
                     </div>
                  </button>
               </div>
            </div>
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-12 rounded-[4rem] border border-[#111111]/5 shadow-xl sticky top-32">
               <div className="absolute top-0 right-0 p-8 opacity-5">
                   <ShoppingBag size={140} />
               </div>

               <h3 className="text-2xl font-editorial font-bold uppercase tracking-tighter mb-10 flex items-center gap-4 relative z-10">
                  <ShoppingBag className="text-[#8B0000]" size={24} /> Review Order
               </h3>

               <div className="space-y-6 mb-12 max-h-[350px] overflow-y-auto pr-4 custom-scrollbar relative z-10">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="flex gap-5 p-5 bg-[#F7F5F0] rounded-[2rem] border border-[#111111]/5 group hover:border-[#8B0000]/20 transition-colors">
                       <div className="w-20 h-20 rounded-2xl overflow-hidden bg-white shrink-0 border border-[#111111]/5 flex items-center justify-center p-2">
                          <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain" />
                       </div>
                       <div className="flex-grow min-w-0">
                          <p className="text-[8px] font-bold text-[#8B0000] uppercase tracking-[0.3em] mb-1">{item.brand}</p>
                          <h4 className="text-xs font-bold truncate uppercase tracking-tight text-[#111111]">{item.name}</h4>
                          <div className="flex justify-between items-center mt-3">
                             <p className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest">Sz {item.size} x {item.qty}</p>
                             <p className="text-sm font-black text-[#111111] tracking-tighter tabular-nums">₹{(item.price * item.qty).toLocaleString()}</p>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>

               <div className="space-y-6 pt-10 border-t border-[#111111]/5 relative z-10">
                  <div className="flex justify-between items-center">
                     <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#6B6B6B]">Subtotal</span>
                     <span className="text-sm font-black tabular-nums">₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-emerald-600">Priority logistics</span>
                     <span className="text-[9px] font-bold uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full text-emerald-600 border border-emerald-500/10">FREE</span>
                  </div>
                  <div className="pt-6 flex flex-col gap-2">
                     <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#8B0000]">Final Valuation</span>
                     <span className="text-5xl font-black tracking-tighter text-[#111111] tabular-nums">₹{cartTotal.toLocaleString()}</span>
                  </div>
               </div>

               <button
                 onClick={processPayment}
                 disabled={loading}
                 className="w-full mt-12 bg-[#111111] text-white py-7 rounded-[2rem] text-xs font-bold uppercase tracking-[0.3em] transition-all shadow-lg flex items-center justify-center gap-4 group disabled:opacity-50 relative overflow-hidden"
               >
                  {loading ? "Transmitting..." : <>Finalize Order <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" /></>}
               </button>

               <div className="mt-8 flex items-center gap-4 p-5 bg-[#F7F5F0] rounded-[2rem] border border-[#111111]/5">
                   <ShieldCheck className="text-[#8B0000]" size={24} />
                   <p className="text-[9px] text-[#6B6B6B] font-bold uppercase tracking-[0.2em] leading-relaxed italic">Encryption active. Identity verified as {user?.name}.</p>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
