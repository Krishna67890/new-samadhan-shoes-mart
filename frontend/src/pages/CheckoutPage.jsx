import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
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

  const sendWhatsAppOrder = () => {
    setLoading(true);

    const orderRef = `SSM-${Date.now()}`;
    const shopkeeperNumber = "918080690631";
    const developerNumber = "918888644021";

    const message = `👞 *NEW ORDER: SAMADHAN SHOES MART* 👞
--------------------------------------
👤 *CUSTOMER DETAILS:*
Name: ${formData.name}
Phone: ${formData.phone}
Address: ${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}

📦 *ORDER SUMMARY:*
${cartItems.map(item => `Item: ${item.name}
Price: ₹${item.price.toLocaleString()} x ${item.qty}
Total: ₹${(item.price * item.qty).toLocaleString()}
Ref: ${window.location.origin}/product/${item._id}`).join('\n\n')}

✅ *VERIFICATION:*
Order Ref: #${orderRef}
Dev Support: +91 ${developerNumber}
--------------------------------------
_Sent via Elite Portal_`;

    const shopkeeperUrl = `https://wa.me/${shopkeeperNumber}?text=${encodeURIComponent(message)}`;

    // Background Notification Log for Developer (8888644021)
    console.log(`🚀 SYNCING ORDER DATA TO DEVELOPER CLOUD (+91 ${developerNumber})...`, {
        orderRef,
        customer: formData.name,
        total: cartTotal,
        items: cartItems
    });

    // Open Shopkeeper Link
    window.open(shopkeeperUrl, '_blank');

    // Clear cart and redirect
    setTimeout(() => {
      clearCart();
      navigate('/profile');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-24 px-6 no-blur">
      <div className="max-w-7xl mx-auto">

        <button
          onClick={() => navigate('/cart')}
          className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors mb-12"
        >
          <ArrowLeft size={20} /> <span className="text-[10px] font-black uppercase tracking-widest">Return to Cart</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* LEFT: CHECKOUT FORM */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-white rounded-[3.5rem] p-10 md:p-16 border border-slate-100 shadow-2xl shadow-slate-200/50">
              <div className="flex items-center gap-4 mb-12">
                 <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                    <User size={24} />
                 </div>
                 <h2 className="text-4xl font-black text-slate-950 tracking-tighter uppercase">Delivery Protocol</h2>
              </div>

              <div className="space-y-8">
                {/* ... (Existing form fields remain same) ... */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-4">Full Identity</label>
                      <div className="relative">
                         <input
                           name="name"
                           value={formData.name}
                           onChange={handleInputChange}
                           className="w-full pl-14 pr-8 py-5 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none focus:bg-white border-2 border-transparent focus:border-blue-100 transition-all"
                           placeholder="Enter your name"
                         />
                         <User className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                      </div>
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-4">WhatsApp Contact</label>
                      <div className="relative">
                         <input
                           name="phone"
                           value={formData.phone}
                           onChange={handleInputChange}
                           className="w-full pl-14 pr-8 py-5 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none focus:bg-white border-2 border-transparent focus:border-blue-100 transition-all"
                           placeholder="10-digit number"
                         />
                         <Phone className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                      </div>
                   </div>
                </div>

                <div className="space-y-3">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-4">Street Address</label>
                   <div className="relative">
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        className="w-full pl-14 pr-8 py-5 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none focus:bg-white border-2 border-transparent focus:border-blue-100 transition-all min-h-[120px]"
                        placeholder="House No, Building, Area, Landmark"
                      />
                      <MapPin className="absolute left-5 top-8 text-slate-300" size={20} />
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-4">State</label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-8 py-5 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none focus:bg-white border-2 border-transparent focus:border-blue-100 transition-all appearance-none"
                      >
                         <option value="">Select State</option>
                         {indiaData.states.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-4">City</label>
                      {indiaData.citiesByState[formData.state] ? (
                        <select
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-8 py-5 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none focus:bg-white border-2 border-transparent focus:border-blue-100 transition-all appearance-none"
                        >
                           <option value="">Select City</option>
                           {indiaData.citiesByState[formData.state].map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      ) : (
                        <input
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          className="w-full px-8 py-5 bg-slate-50 rounded-2xl font-bold text-slate-950 outline-none focus:bg-white border-2 border-transparent focus:border-blue-100 transition-all"
                          placeholder="City"
                        />
                      )}
                   </div>
                   <div className="space-y-3">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-4">Pincode</label>
                      <input
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleInputChange}
                        className="w-full px-8 py-5 bg-slate-50 rounded-2xl font-bold text-slate-900 outline-none focus:bg-white border-2 border-transparent focus:border-blue-100 transition-all"
                        placeholder="6 Digits"
                      />
                   </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-[3.5rem] p-10 border border-slate-100 shadow-2xl shadow-slate-200/50">
               <h3 className="text-2xl font-black text-slate-950 uppercase tracking-tighter mb-8 flex items-center gap-3">
                  <Zap className="text-blue-600" size={24} /> Payment Method
               </h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <button
                    onClick={() => setPaymentMethod('whatsapp')}
                    className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 ${paymentMethod === 'whatsapp' ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-blue-200'}`}
                  >
                     <MessageCircle size={32} className={paymentMethod === 'whatsapp' ? 'text-blue-600' : 'text-slate-300'} />
                     <div className="text-center">
                        <p className="font-black text-slate-950 uppercase text-xs">WhatsApp Pay</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Direct Confirmation</p>
                     </div>
                  </button>
                  <button
                    onClick={() => setPaymentMethod('online')}
                    className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-4 ${paymentMethod === 'online' ? 'border-blue-600 bg-blue-50' : 'border-slate-100 hover:border-blue-200'}`}
                  >
                     <ShieldCheck size={32} className={paymentMethod === 'online' ? 'text-blue-600' : 'text-slate-300'} />
                     <div className="text-center">
                        <p className="font-black text-slate-950 uppercase text-xs">Online Payment</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Stripe / Razorpay</p>
                     </div>
                  </button>
               </div>
            </div>
          </div>

          {/* RIGHT: ORDER SUMMARY */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-slate-950 rounded-[3.5rem] p-10 text-white shadow-2xl shadow-slate-900/50">
               <h3 className="text-2xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
                  <ShoppingBag className="text-blue-500" size={24} /> The Vault
               </h3>

               <div className="space-y-6 mb-10 max-h-[400px] overflow-y-auto pr-4 custom-scrollbar">
                  {cartItems.map((item, idx) => (
                    <div key={idx} className="flex gap-4 p-4 bg-white/5 rounded-3xl border border-white/10 group">
                       <div className="w-16 h-16 rounded-xl overflow-hidden bg-white shrink-0">
                          <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                       </div>
                       <div className="flex-grow min-w-0">
                          <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest truncate">{item.brand}</p>
                          <h4 className="text-sm font-black truncate uppercase tracking-tight">{item.name}</h4>
                          <div className="flex justify-between items-center mt-1">
                             <p className="text-[10px] font-bold text-slate-400">Size: {item.size} | Qty: {item.qty}</p>
                             <p className="text-xs font-black text-white">₹{(item.price * item.qty).toLocaleString()}</p>
                          </div>
                       </div>
                    </div>
                  ))}
               </div>

               <div className="space-y-4 pt-8 border-t border-white/10">
                  <div className="flex justify-between items-center text-slate-400">
                     <span className="text-[10px] font-black uppercase tracking-widest">Subtotal</span>
                     <span className="font-bold">₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-emerald-400">
                     <span className="text-[10px] font-black uppercase tracking-widest">Logistics</span>
                     <span className="font-bold uppercase text-[10px]">Complimentary</span>
                  </div>
                  <div className="pt-4 flex justify-between items-end">
                     <span className="text-xs font-black uppercase tracking-widest text-blue-400">Total Valuation</span>
                     <span className="text-4xl font-black tracking-tighter text-white">₹{cartTotal.toLocaleString()}</span>
                  </div>
               </div>

               <button
                 onClick={processPayment}
                 disabled={loading}
                 className="w-full mt-10 bg-blue-600 hover:bg-white hover:text-slate-950 text-white py-6 rounded-3xl text-sm font-black uppercase tracking-[0.2em] transition-all duration-500 shadow-2xl flex items-center justify-center gap-4 group disabled:opacity-50"
               >
                  {loading ? "Processing..." : <>Confirm & Complete <ChevronRight size={20} className="group-hover:translate-x-2 transition-transform" /></>}
               </button>
            </div>

            <div className="bg-white rounded-[3rem] p-8 border border-slate-100 flex items-start gap-4">
               <Info className="text-blue-600 shrink-0" size={24} />
               <div>
                  <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-950 mb-2">Checkout Logic</h5>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed italic">"Upon confirmation, a formal receipt will be generated. {paymentMethod === 'whatsapp' ? 'Your payment link (UPI/QR) will be provided via WhatsApp.' : 'You will be redirected to our secure online gateway.'}"</p>
               </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
