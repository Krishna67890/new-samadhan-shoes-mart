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

    let message = `🚀 *NEW ORDER RECEIVED - NEW SAMADHAN SHOE MART*\n`;
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
    message += `🏢 *ORIGIN:* New Samadhan Shoe Mart Factory, Nashik\n`;
    message += `--------------------------------------\n`;
    message += `🏪 *SHOP CONTACTS: 9423228843 | 8888644021*`;

    const encodedMsg = encodeURIComponent(message);

    // 3. Dual Shopkeeper Protocol - Load Balancing
    const targetNum = Math.random() > 0.5 ? '9423228843' : '8888644021';
    const shopkeeperUrl = `https://wa.me/91${targetNum}?text=${encodedMsg}`;

    // Open Selected Shopkeeper
    window.open(shopkeeperUrl, '_blank');

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
    <div className="bg-[#F7F5F0] min-h-screen pt-32 pb-24 relative overflow-hidden text-[#111111]">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#8B0000]/5 blur-[120px] rounded-full"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex items-center gap-6 mb-16 reveal-item">
          <div className="w-16 h-16 bg-[#8B0000] rounded-[2rem] flex items-center justify-center text-white shadow-lg">
            <ShoppingBag size={28} />
          </div>
          <div>
            <h1 className="text-5xl font-editorial font-black text-[#111111] tracking-tighter uppercase leading-none">The Vault</h1>
            <p className="text-[#6B6B6B] text-[10px] font-bold uppercase tracking-[0.4em] mt-2 italic">Secured Collection</p>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white p-24 rounded-[4rem] text-center max-w-3xl mx-auto border border-[#111111]/5 shadow-xl">
            <div className="w-32 h-32 bg-[#F7F5F0] rounded-full flex items-center justify-center mx-auto mb-10 border border-[#111111]/5">
              <ShoppingBag size={56} className="text-[#6B6B6B]" />
            </div>
            <h2 className="text-4xl font-editorial font-bold text-[#111111] mb-6 uppercase tracking-tight">Vault is Empty</h2>
            <p className="text-[#6B6B6B] mb-12 text-lg font-medium italic">"Your elite collection starts with a single pair."</p>
            <Link to="/products" className="bg-[#111111] text-white px-12 py-6 rounded-[2rem] font-bold uppercase tracking-[0.2em] text-xs inline-flex items-center gap-4 hover:bg-[#8B0000] transition-all shadow-md">
              Browse Trends <ArrowRight size={20} />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Items List */}
            <div className="lg:col-span-8 space-y-8">
              {cartItems.map((item) => (
                <div key={`${item._id}-${item.size}`} className="group relative bg-white p-8 rounded-[3.5rem] border border-[#111111]/5 hover:border-[#8B0000]/20 transition-all duration-500 flex flex-col sm:flex-row items-center gap-10 shadow-lg">
                  <div className="w-40 h-40 bg-[#F7F5F0] rounded-[2.5rem] overflow-hidden shrink-0 border border-[#111111]/5 flex items-center justify-center p-4">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-contain" />
                  </div>

                  <div className="flex-grow text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start gap-4 mb-4">
                      <span className="px-4 py-1 bg-[#8B0000]/10 border border-[#8B0000]/20 rounded-full text-[9px] font-bold text-[#8B0000] uppercase tracking-widest">{item.brand}</span>
                      <span className="px-4 py-1 bg-[#111111]/5 border border-[#111111]/10 rounded-full text-[9px] font-bold text-[#6B6B6B] uppercase tracking-widest">Size: {item.size}</span>
                    </div>
                    <h3 className="text-2xl font-editorial font-bold text-[#111111] mb-4 tracking-tight uppercase leading-none">{item.name}</h3>
                    <div className="text-3xl font-black text-[#111111] tracking-tighter tabular-nums">₹{item.price.toLocaleString()}</div>
                  </div>

                  <div className="flex flex-col items-center sm:items-end gap-6">
                    <div className="flex items-center bg-[#F7F5F0] p-2 rounded-2xl border border-[#111111]/5">
                      <button onClick={() => addToCart(item, -1, item.size)} className="w-10 h-10 font-bold text-[#111111] hover:text-[#8B0000] transition-colors">-</button>
                      <span className="w-12 text-center font-bold text-[#111111] text-lg">{item.qty}</span>
                      <button onClick={() => addToCart(item, 1, item.size)} className="w-10 h-10 font-bold text-[#111111] hover:text-[#8B0000] transition-colors">+</button>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-black text-[#8B0000] tracking-tighter tabular-nums">₹{(item.price * item.qty).toLocaleString()}</p>
                    </div>
                  </div>

                  <button onClick={() => removeFromCart(item._id, item.size)} className="absolute top-8 right-8 text-[#111111]/20 hover:text-rose-600 transition-all hover:scale-125">
                    <Trash2 size={24} />
                  </button>
                </div>
              ))}
            </div>

            {/* Checkout Summary */}
            <aside className="lg:col-span-4 lg:sticky lg:top-32">
              <div className="bg-white p-12 rounded-[4rem] border border-[#111111]/5 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <ShieldCheck size={120} className="text-[#111111]" />
                </div>

                <h2 className="text-2xl font-editorial font-bold text-[#111111] mb-10 uppercase tracking-tighter relative z-10">Vault Summary</h2>

                <div className="space-y-8 mb-12 relative z-10">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-[0.3em]">Items Valuation</span>
                    <span className="text-lg font-black text-[#111111] tabular-nums">₹{cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-[0.3em]">Elite Delivery</span>
                    <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">FREE</span>
                  </div>
                  <div className="pt-8 border-t border-[#111111]/5">
                    <div className="flex flex-col gap-2">
                      <span className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-[0.4em]">Total Commitment</span>
                      <span className="text-5xl font-black text-[#8B0000] tracking-tighter tabular-nums">₹{cartTotal.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-[#111111] text-white py-7 rounded-[2rem] font-bold uppercase tracking-[0.3em] text-[11px] flex items-center justify-center gap-4 hover:bg-[#8B0000] transition-all shadow-md group relative overflow-hidden mb-8"
                >
                  {isSent ? 'Order Transmitted' : 'Secure via WhatsApp'} <MessageCircle size={22} className="group-hover:scale-125 transition-transform" />
                </button>

                <div className="flex items-center gap-4 p-5 bg-[#F7F5F0] rounded-[2rem] border border-[#111111]/5">
                  <div className="w-10 h-10 bg-[#8B0000]/10 rounded-xl flex items-center justify-center text-[#8B0000]">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <p className="text-[9px] text-[#6B6B6B] font-bold uppercase tracking-widest leading-none mb-1">Authenticated By</p>
                    <p className="text-[10px] text-[#111111] font-bold uppercase tracking-widest leading-none">{user?.name || 'Guest'}</p>
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
