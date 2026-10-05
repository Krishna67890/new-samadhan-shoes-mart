import React, { useState, useEffect, useRef, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { useCart } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
import {
  Star, ShoppingCart, MessageCircle, ArrowLeft, CheckCircle,
  Shield, Truck, RefreshCw, CreditCard, Box, Zap, Info,
  Search, ShieldCheck, MapPin, Smartphone, HelpCircle
} from 'lucide-react';
import { resolveImageUrl } from '../utils/urlConfig';

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useContext(AuthContext);
  const { loading, error, request } = useFetch();
  const { addToCart } = useCart();
  const containerRef = useRef(null);
  const mainShoeRef = useRef(null);

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

  // Entrance Animation & ScrollTrigger for Main-Shoe.png
  useEffect(() => {
    if (product) {
        const mm = gsap.matchMedia();
        const ctx = gsap.context(() => {
            // Existing entrance for content
            gsap.from('.reveal-item', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out'
            });

            // 1. Initial Main Shoe Reveal - High-End "Macro-to-Micro" Entrance
            gsap.from(mainShoeRef.current, {
                x: 2000,
                y: -500,
                rotationY: -180,
                rotationX: 45,
                rotationZ: -30,
                z: -5000,
                opacity: 0,
                duration: 4,
                ease: "expo.out"
            });

            // 2. Ambient Floating - Organic "Breath" Motion
            const ambientTl = gsap.timeline({ repeat: -1, yoyo: true });
            ambientTl.to(mainShoeRef.current, {
                y: "+=25",
                x: "+=15",
                rotationZ: "+=2",
                rotationY: "+=6",
                rotationX: "+=3",
                duration: 5,
                ease: "sine.inOut"
            });

            // 3. ADVANCED SCROLL SEQUENCE - Hyper-Realistic 3D Scan
            mm.add({
              isDesktop: "(min-width: 1024px)",
              isMobile: "(max-width: 1023px)"
            }, (context) => {
              let { isDesktop } = context.conditions;

              const tl = gsap.timeline({
                  scrollTrigger: {
                      trigger: containerRef.current,
                      start: "top top",
                      end: "bottom bottom",
                      scrub: 2.2, // Higher scrub for ultra-smooth buttery feel
                      toggleActions: "play none none reverse"
                  }
              });

              tl
              // PHASE 1: Straight Profile - The "Gallery" View
              .to(mainShoeRef.current, {
                  x: isDesktop ? '-42vw' : '0vw',
                  y: isDesktop ? '5vh' : '10vh',
                  rotationY: 0,
                  rotationX: 0,
                  rotationZ: 0,
                  z: isDesktop ? 800 : 400,
                  scale: isDesktop ? 1.2 : 1,
                  opacity: 0.8,
                  filter: `brightness(1.3) contrast(1.2) drop-shadow(0 ${isDesktop ? '150px 250px' : '80px 150px'} rgba(139,0,0,0.4))`,
                  ease: "power2.inOut"
              })
              .to(".tech-node-1", { opacity: 1, x: 0, scale: 1, duration: 1 }, "-=0.8")

              // PHASE 2: Sole & Traction - The "Inspection" View
              .to(mainShoeRef.current, {
                  x: isDesktop ? '15vw' : '0vw',
                  y: isDesktop ? '35vh' : '20vh',
                  rotationX: 170,
                  rotationY: -15,
                  rotationZ: 25,
                  z: isDesktop ? 1200 : 600,
                  scale: isDesktop ? 1.5 : 1.1,
                  opacity: 0.7,
                  filter: `brightness(0.9) contrast(1.4) drop-shadow(0 ${isDesktop ? '200px 300px' : '100px 200px'} rgba(0,0,0,0.8))`,
                  ease: "expo.inOut"
              })
              .to(".tech-node-2", { opacity: 1, x: 0, scale: 1, duration: 1 }, "-=0.8")

              // PHASE 3: Top-Down "Anatomy" View
              .to(mainShoeRef.current, {
                  x: isDesktop ? '-10vw' : '0vw',
                  y: isDesktop ? '55vh' : '30vh',
                  rotationX: 75,
                  rotationY: 45,
                  rotationZ: -10,
                  z: isDesktop ? 400 : 200,
                  scale: isDesktop ? 1.3 : 1,
                  opacity: 0.9,
                  filter: 'brightness(1.1) contrast(1.1) drop-shadow(0 50px 100px rgba(0,0,0,0.3))',
                  ease: "power3.inOut"
              })

              // PHASE 4: Hyper-Macro Exit - The "Material" View
              .to(mainShoeRef.current, {
                  x: isDesktop ? '-25vw' : '0vw',
                  y: isDesktop ? '90vh' : '80vh',
                  rotationX: -30,
                  rotationY: -60,
                  rotationZ: 5,
                  z: isDesktop ? 5500 : 3500,
                  scale: isDesktop ? 22 : 12,
                  opacity: 0,
                  filter: isDesktop
                    ? 'brightness(2.5) contrast(1.6)'
                    : 'brightness(1.8) contrast(1.4)',
                  force3D: true,
                  ease: "power4.in"
              });
            });

        }, containerRef);

        return () => {
          ctx.revert();
          mm.revert();
        };
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
    const message = `Hello New Samadhan Shoe Mart! 👋\n\nI want to order this Masterpiece:\n\n👟 *Product:* ${product?.name}\n🏷️ *Brand:* ${product?.brand}\n💰 *Price:* ₹${((cleanPrice || 0) * qty).toLocaleString()}\n📏 *Size:* ${selectedSize} (UK/IN)\n📦 *Quantity:* ${qty}\n🖼️ *Image:* ${product?.images?.[0]}\n\n--- CUSTOMER DETAILS ---\n👤 *Name:* ${user?.name || 'Guest'}\n📍 *Address:* ${user?.address || 'Not Provided'}\n🏙️ *City:* ${user?.city || 'Not Provided'}\n📮 *Pincode:* ${user?.pincode || 'Not Provided'}\n\n--- PAYMENT INTENT ---\nI am ready to proceed with the online payment via UPI/Bank Transfer. Please share the QR code or Payment Link.`;
    const encodedMessage = encodeURIComponent(message);

    // Dual Shopkeeper Protocol - Use business numbers 9423228843 or 8888644021
    const targetNum = Math.random() > 0.5 ? '9423228843' : '8888644021';
    window.open(`https://wa.me/91${targetNum}?text=${encodedMessage}`, '_blank');
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505]">
      <div className="w-16 h-16 border-[6px] border-blue-600 border-t-transparent rounded-full animate-spin shadow-[0_0_30px_rgba(37,99,235,0.3)]"></div>
    </div>
  );

  if (!product) return null;

  const cleanPrice = sanitizePrice(product?.price);

  return (
    <div className="bg-[#050505] min-h-[300vh] pt-32 pb-24 relative overflow-hidden" ref={containerRef}>
      {/* 3D FLOATING HERITAGE SHOE (Main-Shoe.png) */}
      <div
        ref={mainShoeRef}
        className="fixed top-1/4 right-[5%] w-[45vw] max-w-[850px] pointer-events-none z-0 hidden lg:block"
        style={{
            perspective: '6000px',
            transformStyle: 'preserve-3d',
            willChange: 'transform, filter',
            backfaceVisibility: 'hidden',
            filter: 'drop-shadow(0 180px 350px rgba(0,0,0,0.6))'
        }}
      >
        <div className="relative w-full h-full group transform-gpu">
          {/* Virtual Shine Layer */}
          <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-20 transition-opacity duration-1000 mix-blend-soft-light pointer-events-none"
               style={{ background: 'linear-gradient(135deg, transparent 40%, white 50%, transparent 60%)', backgroundSize: '200% 200%', animation: 'shine 8s infinite linear' }}>
          </div>

          <img
            src="/New-Samadhan-Shoe-Mart/Main-Shoe.png"
            alt="New Samadhan Heritage"
            className="w-full h-auto filter drop-shadow-[0_120px_250px_rgba(0,0,0,0.8)] opacity-60 brightness-115 contrast-110 transition-all duration-1000"
          />
        </div>

        {/* Advanced Technical Nodes */}
        <div className="tech-node-1 absolute top-0 left-[-200px] opacity-0 translate-x-[-50px] transition-all duration-700">
            <div className="bg-blue-600/90 border border-blue-500/30 p-6 rounded-2xl">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400 block mb-2">Build Quality</span>
                <p className="text-white text-xs font-bold uppercase leading-tight">Reinforced <br/> Side-Wall Stitching</p>
            </div>
        </div>

        <div className="tech-node-2 absolute bottom-[20%] right-[-100px] opacity-0 translate-x-[50px] transition-all duration-700">
            <div className="bg-emerald-500/90 border border-emerald-500/30 p-6 rounded-2xl">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 block mb-2">Traction Tech</span>
                <p className="text-white text-xs font-bold uppercase leading-tight">Industrial Grade <br/> Non-Slip Sole</p>
            </div>
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* --- TOP NAV & BREADCRUMB --- */}
        <div className="flex justify-between items-center mb-16 reveal-item">
            <button
                onClick={() => navigate(-1)}
                className="group flex items-center gap-4 text-slate-500 hover:text-white transition-all"
            >
                <div className="w-12 h-12 bg-white/10 rounded-2xl border border-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <ArrowLeft size={20} />
                </div>
                <span className="font-black text-[10px] uppercase tracking-[0.3em]">Back to Vault</span>
            </button>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/10 shadow-sm text-[9px] font-black text-slate-400 uppercase tracking-widest">
               <ShieldCheck size={14} className="text-emerald-500" /> Authenticity Verified By New Samadhan Shoe Mart
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* --- LEFT: PRODUCT VISUALS --- */}
          <div className="lg:col-span-7 space-y-8 reveal-item">
            <div className="relative aspect-square bg-[#111] rounded-[4rem] overflow-hidden shadow-2xl border border-white/5 group">
              <img
                src={resolveImageUrl(product?.images?.[activeImg])}
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
                    <img src={resolveImageUrl(img)} alt={`${product.name} ${index}`} className="w-full h-full object-cover rounded-[1.5rem]" />
                  </button>
                ))}
              </div>
            ) : null}

            {/* PRODUCT PATTERNS & TECH */}
            <div className="bg-white/10 rounded-[3.5rem] p-12 border border-white/5 shadow-sm">
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
            <div className="bg-white/10 p-12 rounded-[4rem] border border-white/10 shadow-2xl">
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
                <span className="text-5xl font-black text-white tracking-tighter">₹{((cleanPrice || 0) * qty).toLocaleString()}</span>
                <span className="text-slate-500 font-bold mb-2 uppercase text-[9px] tracking-widest">INC. ALL TAXES</span>
              </div>

              {/* RATING DISPLAY */}
              <div className="flex items-center gap-4 mb-12 p-4 bg-white/10 rounded-2xl border border-white/5">
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
                      className={`w-16 h-16 flex items-center justify-center rounded-2xl border-4 font-black transition-all text-lg
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
                <div className="flex items-center bg-white/10 border border-white/5 rounded-2xl p-2">
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
                className="w-full flex items-center justify-center gap-4 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 py-6 rounded-[2rem] font-black uppercase tracking-[0.2em] transition-all hover:bg-emerald-500 hover:text-white shadow-lg shadow-emerald-500/10 text-xs"
              >
                <MessageCircle size={22} />
                <span>Order via WhatsApp</span>
              </button>
            </div>

            {/* --- PAYMENT EXPLANATION --- */}
            <div className="bg-white/10 rounded-[4rem] p-12 text-white relative overflow-hidden shadow-2xl border border-white/10">
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
