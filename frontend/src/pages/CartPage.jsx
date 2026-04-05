import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus, ShieldCheck, Truck, Zap, MessageCircle } from 'lucide-react';

const CartPage = () => {
  const { cartItems, removeFromCart, addToCart, cartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSent, setIsSent] = useState(false);

  const speakVaultGuide = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance();
      msg.text = `Welcome to your Vault. Your total is ${cartTotal.toLocaleString()} rupees. When you click Confirm, I will copy your order details and open our official WhatsApp group. Just paste the message there so our Shopkeeper and Developer can process your shoes immediately.`;
      msg.lang = 'en-IN';
      msg.rate = 0.9;
      window.speechSynthesis.speak(msg);
    }
  };

  useEffect(() => {
    if (cartItems.length > 0) {
      speakVaultGuide();
    }
  }, [cartItems.length]);

  const handleWhatsAppOrder = () => {
    if (!user || !user.identityVerified) {
      alert("Please sync your identity in the Identity Sync section before placing an order.");
      navigate('/identity');
      return;
    }

    // 1. Technical Fixes: Quota & GSAP
    try {
      localStorage.removeItem('gsap_cache');
      const keysToKeep = ['ssm_user_identity', 'cartItems', 'token'];
      Object.keys(localStorage).forEach(key => {
        if (!keysToKeep.includes(key)) localStorage.removeItem(key);
      });
      sessionStorage.clear();
    } catch (e) { console.warn("Vault Cleanup failed"); }

    // 2. Data Preparation
    const userName = user.name || "Elite Customer";
    const userPhone = user.phone || "Not Provided";
    const userAddress = `${user.address}, ${user.city}, ${user.state} - ${user.pincode}`;
    const total = cartTotal.toLocaleString();

    let message = `🚀 *NEW ORDER RECEIVED - SAMADHAN SHOES MART*\n`;
    message += `--------------------------------------\n`;
    message += `👤 *CUSTOMER:* ${userName.toUpperCase()}\n`;
    message += `📞 *PHONE:* ${userPhone}\n`;
    message += `📍 *SHIPPING ADDRESS:* ${userAddress}\n`;
    message += `--------------------------------------\n`;
    message += `👟 *PRODUCTS:*\n`;
    cartItems.forEach(item => {
      message += `  - ${item.name} (Size ${item.size}) x${item.qty}\n`;
    });
    message += `💰 *TOTAL AMOUNT:* ₹${total}\n`;
    message += `🏢 *ORIGIN:* Samadhan Shoes Mart Factory, Nashik\n`;
    message += `--------------------------------------\n`;
    message += `🏪 *SHOP CONTACTS: 9423228843 | 8888644021*`;

    const encodedMsg = encodeURIComponent(message);

    // 3. Strict Shopkeeper-Only Logic
    const shopkeeper1 = `https://wa.me/919423228843?text=${encodedMsg}`;
    const shopkeeper2 = `https://wa.me/918888644021?text=${encodedMsg}`;

    // Open Shopkeeper 1
    window.open(shopkeeper1, '_blank');

    // Open Shopkeeper 2 with delay to avoid popup blockers
    setTimeout(() => {
      window.open(shopkeeper2, '_blank');
    }, 500);

    // 4. AI Voice & Feedback
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance(`Order total: ${total} rupees. I am sending your order details to our shopkeepers now. Please confirm the messages to finalize your delivery to Nashik.`);
      msg.lang = 'en-IN';
      msg.rate = 0.9;
      window.speechSynthesis.speak(msg);
    }

    setIsSent(true);

    // 5. Technical Cleanup
    setTimeout(() => {
      localStorage.removeItem('cartItems');
    }, 2000);
  };

  return (
    <div className="bg-slate-50 min-h-screen pt-28 pb-20 no-blur">
      <style dangerouslySetInnerHTML={{ __html: `
        * { backdrop-filter: none !important; -webkit-backdrop-filter: none !important; filter: none !important; }
      `}} />

      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg">
            <ShoppingBag size={24} />
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight uppercase">The Vault</h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white p-20 rounded-[3rem] text-center max-w-2xl mx-auto border border-slate-200 shadow-2xl">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingBag size={48} className="text-slate-300" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4">Vault is Empty</h2>
            <p className="text-slate-500 mb-10 text-lg font-bold">Your elite collection starts with a single pair.</p>
            <Link to="/products" className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest inline-flex items-center gap-4 hover:bg-slate-950 transition-all">
              Browse Trends <ArrowRight size={20} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Items List */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div key={`${item._id}-${item.size}`} className="group relative bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center gap-8 overflow-hidden">
                  <div className="w-32 h-32 bg-slate-50 rounded-2xl overflow-hidden shrink-0 border border-slate-100">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                  </div>

                  <div className="flex-grow text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                      <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">{item.brand}</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Size: {item.size}</span>
                    </div>
                    <h3 className="text-xl font-black text-slate-900 mb-2">{item.name}</h3>
                    <div className="text-2xl font-black text-slate-900">₹{item.price.toLocaleString()}</div>
                  </div>

                  <div className="flex flex-col items-center sm:items-end gap-4">
                    <div className="flex items-center bg-slate-100 p-2 rounded-xl border border-slate-200">
                      <button onClick={() => addToCart(item, -1, item.size)} className="w-8 h-8 font-black text-slate-900">-</button>
                      <span className="w-10 text-center font-black text-slate-900">{item.qty}</span>
                      <button onClick={() => addToCart(item, 1, item.size)} className="w-8 h-8 font-black text-slate-900">+</button>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-blue-600">₹{(item.price * item.qty).toLocaleString()}</p>
                    </div>
                  </div>

                  <button onClick={() => removeFromCart(item._id, item.size)} className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 transition-colors">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            {/* Checkout Summary */}
            <aside className="lg:sticky lg:top-28">
              <div className="bg-white p-10 rounded-[3rem] border border-slate-200 shadow-2xl">
                <h2 className="text-2xl font-black text-slate-900 mb-8 uppercase tracking-tight">Order Receipt</h2>

                <div className="space-y-6 mb-10">
                  <div className="flex justify-between text-slate-950 font-black uppercase text-[10px] tracking-widest">
                    <span>Items Total</span>
                    <span>₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-950 font-black uppercase text-[10px] tracking-widest">
                    <span>Delivery</span>
                    <span className="text-emerald-600">FREE</span>
                  </div>
                  <div className="pt-6 border-t-2 border-slate-900">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-black text-slate-900 uppercase">Grand Total</span>
                      <span className="text-3xl font-black text-blue-600">₹{cartTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-slate-950 text-white py-6 rounded-2xl font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4 hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                  {isSent ? 'Sent to Both' : 'Confirm & WhatsApp'} <MessageCircle size={20} className="group-hover:scale-125 transition-transform" />
                </button>

                <div className="mt-8 flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <ShieldCheck className="text-blue-600" size={24} />
                  <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-relaxed">Identity Synced: {user?.name || 'Guest'}</p>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
