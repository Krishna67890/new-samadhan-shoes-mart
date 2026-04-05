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
    <div className="bg-[#050505] min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/10 blur-[120px] rounded-full"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex items-center gap-6 mb-16 reveal-item">
          <div className="w-16 h-16 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white shadow-[0_0_30px_rgba(37,99,235,0.3)]">
            <ShoppingBag size={28} />
          </div>
          <div>
            <h1 className="text-5xl font-black text-white tracking-tighter uppercase leading-none">The Vault</h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em] mt-2 italic">Secured Collection</p>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-3xl p-24 rounded-[4rem] text-center max-w-3xl mx-auto border border-white/10 shadow-2xl">
            <div className="w-32 h-32 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-10 border border-white/5">
              <ShoppingBag size={56} className="text-slate-700" />
            </div>
            <h2 className="text-4xl font-black text-white mb-6 uppercase tracking-tight">Vault is Empty</h2>
            <p className="text-slate-500 mb-12 text-lg font-bold italic">"Your elite collection starts with a single pair."</p>
            <Link to="/products" className="bg-white text-black px-12 py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs inline-flex items-center gap-4 hover:bg-blue-600 hover:text-white transition-all shadow-2xl">
              Browse Trends <ArrowRight size={20} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Items List */}
            <div className="lg:col-span-8 space-y-8">
              {cartItems.map((item) => (
                <div key={`${item._id}-${item.size}`} className="group relative bg-white/[0.03] backdrop-blur-xl p-8 rounded-[3.5rem] border border-white/5 hover:border-white/20 transition-all duration-500 flex flex-col sm:flex-row items-center gap-10 overflow-hidden shadow-2xl">
                  <div className="w-40 h-40 bg-[#111] rounded-[2.5rem] overflow-hidden shrink-0 border border-white/5 shadow-inner">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                  </div>

                  <div className="flex-grow text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-4 mb-4">
                      <span className="px-4 py-1 bg-blue-600/10 border border-blue-600/20 rounded-full text-[9px] font-black text-blue-500 uppercase tracking-widest">{item.brand}</span>
                      <span className="px-4 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-widest text-white/50">Size: {item.size}</span>
                    </div>
                    <h3 className="text-2xl font-black text-white mb-4 tracking-tight uppercase leading-none">{item.name}</h3>
                    <div className="text-3xl font-black text-white tracking-tighter">₹{item.price.toLocaleString()}</div>
                  </div>

                  <div className="flex flex-col items-center sm:items-end gap-6">
                    <div className="flex items-center bg-white/5 p-2 rounded-2xl border border-white/5 backdrop-blur-md">
                      <button onClick={() => addToCart(item, -1, item.size)} className="w-10 h-10 font-black text-white hover:text-blue-500 transition-colors">-</button>
                      <span className="w-12 text-center font-black text-white text-lg">{item.qty}</span>
                      <button onClick={() => addToCart(item, 1, item.size)} className="w-10 h-10 font-black text-white hover:text-blue-500 transition-colors">+</button>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-black text-blue-500 tracking-tighter">₹{(item.price * item.qty).toLocaleString()}</p>
                    </div>
                  </div>

                  <button onClick={() => removeFromCart(item._id, item.size)} className="absolute top-8 right-8 text-white/10 hover:text-rose-500 transition-all hover:scale-125">
                    <Trash2 size={24} />
                  </button>
                </div>
              ))}
            </div>

            {/* Checkout Summary */}
            <aside className="lg:col-span-4 lg:sticky lg:top-32">
              <div className="bg-white/5 backdrop-blur-3xl p-12 rounded-[4rem] border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <ShieldCheck size={120} className="text-white" />
                </div>

                <h2 className="text-2xl font-black text-white mb-10 uppercase tracking-tighter relative z-10">Vault Summary</h2>

                <div className="space-y-8 mb-12 relative z-10">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Items Valuation</span>
                    <span className="text-lg font-black text-white">₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Elite Delivery</span>
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">FREE</span>
                  </div>
                  <div className="pt-8 border-t border-white/10">
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Total Commitment</span>
                      <span className="text-5xl font-black text-blue-500 tracking-tighter">₹{cartTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-white text-black py-7 rounded-[2rem] font-black uppercase tracking-[0.3em] text-[11px] flex items-center justify-center gap-4 hover:bg-blue-600 hover:text-white transition-all shadow-[0_20px_40px_rgba(0,0,0,0.3)] group relative overflow-hidden mb-8"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                  {isSent ? 'Order Transmitted' : 'Secure via WhatsApp'} <MessageCircle size={22} className="group-hover:scale-125 transition-transform" />
                </button>

                <div className="flex items-center gap-4 p-5 bg-white/5 rounded-[2rem] border border-white/5 backdrop-blur-md">
                  <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center text-blue-500">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <p className="text-[9px] text-slate-500 font-black uppercase tracking-widest leading-none mb-1">Authenticated By</p>
                    <p className="text-[10px] text-white font-black uppercase tracking-widest leading-none">{user?.name || 'Guest'}</p>
                  </div>
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
