import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { useCart } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { gsap } from 'gsap';
import {
  Star, ShoppingCart, MessageCircle, ArrowLeft, CheckCircle,
  Shield, Truck, RefreshCw, CreditCard, Box, Zap, Info,
  Search, ShieldCheck, MapPin, Smartphone, HelpCircle
} from 'lucide-react';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useContext(AuthContext);
  const { loading, error, request } = useFetch();
  const { addToCart } = useCart();
  const containerRef = useRef(null);

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  // PRICE SANITIZER
  const sanitizePrice = (rawPrice) => {
    if (typeof rawPrice === 'number') return rawPrice;
    if (typeof rawPrice === 'string') {
      const clean = parseInt(rawPrice.replace(/[^\d]/g, ''));
      return isNaN(clean) ? 0 : clean;
    }
    return 0;
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await request(`/api/products/${id}`);
        setProduct(data);
        if (data?.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchProduct();
  }, [id, request]);

  // Entrance Animation
  useEffect(() => {
    if (product) {
        gsap.from('.reveal-item', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
        });
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product, qty, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 3000);
  };

  const handleWhatsAppOrder = () => {
    if (!isAuthenticated) {
      sessionStorage.setItem('redirectAfterLogin', `/product/${id}`);
      navigate('/login');
      return;
    }

    const cleanPrice = sanitizePrice(product?.price);
    const message = `Hello New Samadhan Shoe Mart! 👋\n\nI want to order this Masterpiece:\n\n👟 *Product:* ${product?.name}\n🏷️ *Brand:* ${product?.brand}\n💰 *Price:* ₹${(cleanPrice * qty).toLocaleString()}\n📏 *Size:* ${selectedSize} (UK/IN)\n📦 *Quantity:* ${qty}\n🖼️ *Image:* ${product?.images?.[0]}\n\n--- CUSTOMER DETAILS ---\n👤 *Name:* ${user?.name || 'Guest'}\n📍 *Address:* ${user?.address || 'Not Provided'}\n🏙️ *City:* ${user?.city || 'Not Provided'}\n📮 *Pincode:* ${user?.pincode || 'Not Provided'}\n\n--- PAYMENT INTENT ---\nI am ready to proceed with the online payment via UPI/Bank Transfer. Please share the QR code or Payment Link.`;
    const encodedMessage = encodeURIComponent(message);

    // Dual Shopkeeper Protocol
    window.open(`https://wa.me/919423228843?text=${encodedMessage}`, '_blank');
    setTimeout(() => {
      window.open(`https://wa.me/918888644021?text=${encodedMessage}`, '_blank');
    }, 600);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505]">
      <div className="w-16 h-16 border-[6px] border-blue-600 border-t-transparent rounded-full animate-spin shadow-[0_0_30px_rgba(37,99,235,0.3)]"></div>
    </div>
  );

  if (!product) return null;

  const cleanPrice = sanitizePrice(product?.price);

  return (
    <div className="bg-[#050505] min-h-screen pt-32 pb-24 relative overflow-hidden" ref={containerRef}>
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* --- TOP NAV & BREADCRUMB --- */}
        <div className="flex justify-between items-center mb-16 reveal-item">
            <button
                onClick={() => navigate(-1)}
                className="group flex items-center gap-4 text-slate-500 hover:text-white transition-all"
            >
                <div className="w-12 h-12 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all backdrop-blur-md">
                    <ArrowLeft size={20} />
                </div>
                <span className="font-black text-[10px] uppercase tracking-[0.3em]">Back to Vault</span>
            </button>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10 shadow-sm text-[9px] font-black text-slate-400 uppercase tracking-widest backdrop-blur-md">
               <ShieldCheck size={14} className="text-emerald-500" /> Authenticity Verified By New Samadhan Shoe Mart
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* --- LEFT: PRODUCT VISUALS --- */}
          <div className="lg:col-span-7 space-y-8 reveal-item">
            <div className="relative aspect-square bg-[#111] rounded-[4rem] overflow-hidden shadow-2xl border border-white/5 group">
              <img
                src={product?.images?.[activeImg]}
                alt={product?.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
              />
              <div className="absolute top-10 left-10">
                 <div className="bg-blue-600 px-6 py-2 rounded-full border border-blue-500/50 shadow-xl text-[10px] font-black uppercase tracking-widest text-white">
                    PREMIUM GRAIL
                 </div>
              </div>
            </div>

            {product?.images?.length > 1 ? (
              <div className="grid grid-cols-4 gap-6">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImg(index)}
                    className={`aspect-square bg-[#111] rounded-[2rem] overflow-hidden border-4 transition-all p-1
                      ${activeImg === index ? 'border-blue-600 shadow-xl shadow-blue-500/20 scale-105' : 'border-transparent opacity-50 hover:opacity-100'}`}
                  >
                    <img src={img} alt={`${product.name} ${index}`} className="w-full h-full object-cover rounded-[1.5rem]" />
                  </button>
                ))}
              </div>
            ) : null}

            {/* PRODUCT PATTERNS & TECH */}
            <div className="bg-white/5 backdrop-blur-xl rounded-[3.5rem] p-12 border border-white/5 shadow-sm">
                <h3 className="text-2xl font-black text-white mb-8 tracking-tighter uppercase">Pattern & Construction</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-blue-500 border border-white/5"><Zap size={20} /></div>
                            <span className="text-xs font-black uppercase tracking-widest text-white">High-Grip Tread</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium italic pl-14">Laser-etched rubber patterns for maximum floor contact and stability in 2026 urban terrain.</p>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-indigo-500 border border-white/5"><Box size={20} /></div>
                            <span className="text-xs font-black uppercase tracking-widest text-white">Breathable Knit</span>
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium italic pl-14">Micro-perforated premium mesh ensuring constant airflow during long-duration wear.</p>
                    </div>
                </div>
            </div>
          </div>

          {/* --- RIGHT: PURCHASE ACTIONS & EXPLANATION --- */}
          <div className="lg:col-span-5 space-y-10 reveal-item">
            <div className="bg-white/5 backdrop-blur-3xl p-12 rounded-[4rem] border border-white/10 shadow-2xl">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-5 py-2 bg-blue-600 text-white rounded-full text-[9px] font-black uppercase tracking-[0.3em] shadow-lg shadow-blue-500/20">
                  {product?.brand}
                </span>
                <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${product?.countInStock > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
                  <div className={`w-2 h-2 rounded-full ${product?.countInStock > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`}></div>
                  {product?.countInStock > 0 ? `${product?.countInStock} LEFT IN VAULT` : 'SOLD OUT'}
                </div>
              </div>

              <h1 className="text-5xl font-black text-white mb-6 leading-[0.9] tracking-tighter uppercase">
                {product?.name}
              </h1>

              <div className="flex items-end gap-4 mb-10">
                <span className="text-5xl font-black text-white tracking-tighter">₹{(cleanPrice * qty).toLocaleString()}</span>
                <span className="text-slate-500 font-bold mb-2 uppercase text-[9px] tracking-widest">INC. ALL TAXES</span>
              </div>

              {/* RATING DISPLAY */}
              <div className="flex items-center gap-4 mb-12 p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-md">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={18} className={i < product?.rating ? 'fill-current' : 'text-white/10'} />
                    ))}
                  </div>
                  <div className="w-px h-6 bg-white/10"></div>
                  <span className="text-xs font-black text-white uppercase tracking-widest">{product?.rating} Global Rating</span>
                  <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">({product?.numReviews} Reviews)</span>
              </div>

              {/* SIZE SELECTION */}
              <div className="mb-10">
                <div className="flex justify-between items-center mb-6">
                  <p className="font-black text-slate-400 uppercase tracking-[0.2em] text-[10px]">Select Your Fit (UK/IN)</p>
                  <button className="text-blue-500 text-[9px] font-black uppercase tracking-widest flex items-center gap-2">Size Guide <HelpCircle size={12} /></button>
                </div>
                <div className="flex flex-wrap gap-4">
                  {product?.sizes?.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-16 h-16 flex items-center justify-center rounded-2xl border-4 font-black transition-all text-lg backdrop-blur-md
                        ${selectedSize === size
                          ? 'border-blue-600 bg-blue-600 text-white shadow-xl shadow-blue-500/20 scale-110'
                          : 'border-white/5 bg-white/5 hover:border-white/20 text-slate-500'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* QUANTITY & ADD */}
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
                <div className="flex items-center bg-white/5 border border-white/5 rounded-2xl p-2 backdrop-blur-md">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-white/10 text-xl font-black rounded-xl text-slate-500 hover:text-white transition-all"
                  >-</button>
                  <span className="w-14 text-center font-black text-2xl text-white">{qty}</span>
                  <button
                    onClick={() => setQty(Math.min(product?.countInStock || 99, qty + 1))}
                    className="w-12 h-12 flex items-center justify-center hover:bg-white/10 text-xl font-black rounded-xl text-slate-500 hover:text-white transition-all"
                  >+</button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={product?.countInStock === 0 || cleanPrice === 0}
                  className={`flex-1 w-full flex items-center justify-center gap-4 py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] transition-all text-xs
                    ${added ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20' : 'bg-white text-black hover:bg-blue-600 hover:text-white shadow-2xl'}
                    disabled:bg-white/5 disabled:text-white/10 disabled:shadow-none disabled:cursor-not-allowed border border-white/5`}
                >
                  {added ? (
                    <> <CheckCircle size={22} /> <span>Secured</span> </>
                  ) : (
                    <> <ShoppingCart size={22} /> <span>Add To Bag</span> </>
                  )}
                </button>
              </div>

              {/* WHATSAPP ACTION */}
              <button
                onClick={handleWhatsAppOrder}
                className="w-full flex items-center justify-center gap-4 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] transition-all hover:bg-emerald-500 hover:text-white shadow-lg shadow-emerald-500/10 text-xs backdrop-blur-md"
              >
                <MessageCircle size={22} />
                <span>Order via WhatsApp</span>
              </button>
            </div>

            {/* --- PAYMENT EXPLANATION --- */}
            <div className="bg-white/5 rounded-[4rem] p-12 text-white relative overflow-hidden shadow-2xl border border-white/10 backdrop-blur-xl">
                <div className="absolute top-0 right-0 p-8 opacity-5">
                    <CreditCard size={120} />
                </div>
                <h3 className="text-2xl font-black tracking-tighter mb-10 flex items-center gap-4 relative z-10">
                   <Smartphone className="text-blue-500" /> HOW PAYMENT WORKS
                </h3>

                <div className="space-y-10 relative z-10">
                    {[
                        { step: '01', title: 'INITIATE ORDER', desc: 'Add product to bag or click the WhatsApp button to start your inquiry.' },
                        { step: '02', title: 'PAYMENT LINK', desc: 'Our team will share a secure UPI QR Code or Payment Link directly on WhatsApp.' },
                        { step: '03', title: 'CONFIRM & SHIP', desc: 'Once paid, share the screenshot. Your grail is dispatched within 4 hours.' }
                    ].map((step, i) => (
                        <div key={i} className="flex gap-6 group">
                            <span className="text-4xl font-black text-white/5 group-hover:text-blue-500 transition-colors duration-500 leading-none">{step.step}</span>
                            <div>
                                <h4 className="text-xs font-black uppercase tracking-[0.2em] mb-2">{step.title}</h4>
                                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
