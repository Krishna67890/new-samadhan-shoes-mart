import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import useFetch from '../hooks/useFetch';
import localProducts from '../utils/localProducts';
import Reviews from '../components/Reviews';
import {
  Star,
  ChevronLeft,
  ShoppingBag,
  MessageCircle,
  Truck,
  ShieldCheck,
  RefreshCw,
  Zap,
  Check,
  Maximize2,
  Layers,
  Box
} from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { addToCart } = useCart();
  const { loading, request } = useFetch();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);

  const viewerRef = useRef(null);
  const shoeRef = useRef(null);
  const shadowRef = useRef(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await request(`/api/products/${id}`);
        if (data && (data._id || data.id)) {
          setProduct(data);
          return;
        }
      } catch (err) {
        console.warn("API Fetch failed, using local catalog fallback:", err);
      }
      const local = localProducts.find(p => String(p._id) === String(id) || String(p.id) === String(id));
      if (local) {
        setProduct(local);
      }
    };
    fetchProduct();
  }, [id, request]);

  useEffect(() => {
    if (product) {
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      } else if (!product.sizes) {
        product.sizes = [7, 8, 9, 10, 11];
        setSelectedSize(7);
      }

      // Entrance Animation
      gsap.from('.reveal-item', {
         y: 20,
         opacity: 0,
         duration: 0.8,
         stagger: 0.1,
         ease: 'power3.out'
      });
    }
  }, [product]);

  // ADVANCED 3D INTERACTION LOGIC (Drag & Move Around)
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const lastMousePos = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleMouseMove = (e) => {
    if (!viewerRef.current || !shoeRef.current) return;

    if (isDragging) {
      const deltaX = e.clientX - lastMousePos.current.x;
      const deltaY = e.clientY - lastMousePos.current.y;

      const newRotY = rotation.y + deltaX * 0.8;
      const newRotX = rotation.x - deltaY * 0.8;

      setRotation({ x: newRotX, y: newRotY });
      lastMousePos.current = { x: e.clientX, y: e.clientY };

      gsap.to(shoeRef.current, {
        rotationX: newRotX,
        rotationY: newRotY,
        duration: 0.1,
        ease: "none"
      });

      gsap.to(shadowRef.current, {
        x: newRotY * 0.3,
        scale: 1 - (Math.abs(newRotX) / 500),
        duration: 0.1
      });
    } else {
      // Subtle parallax when just hovering
      const rect = viewerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const hoverX = (y - centerY) / 20;
      const hoverY = (centerX - x) / 20;

      gsap.to(shoeRef.current, {
        x: (x - centerX) / 20,
        y: (y - centerY) / 20,
        rotationX: rotation.x + hoverX,
        rotationY: rotation.y + hoverY,
        duration: 0.8,
        ease: "power2.out"
      });
    }
  };

  const handleTouchMove = (e) => {
    if (!viewerRef.current || !shoeRef.current || !isDragging) return;

    const deltaX = e.touches[0].clientX - lastMousePos.current.x;
    const deltaY = e.touches[0].clientY - lastMousePos.current.y;

    const newRotY = rotation.y + deltaX * 0.8;
    const newRotX = rotation.x - deltaY * 0.8;

    setRotation({ x: newRotX, y: newRotY });
    lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

    gsap.to(shoeRef.current, {
      rotationX: newRotX,
      rotationY: newRotY,
      duration: 0.1,
      ease: "none"
    });

    gsap.to(shadowRef.current, {
      x: newRotY * 0.3,
      scale: 1 - (Math.abs(newRotX) / 500),
      duration: 0.1
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    gsap.to([shoeRef.current, shadowRef.current], {
      rotationX: 0,
      rotationY: 0,
      x: 0,
      y: 0,
      scale: 1,
      opacity: 0.4,
      duration: 1.5,
      ease: "elastic.out(1, 0.6)"
    });
    setRotation({ x: 0, y: 0 });
  };

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select your size first!");
      return;
    }
    addToCart(product, quantity, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const sanitizePrice = (rawPrice) => {
    if (typeof rawPrice === 'number') return rawPrice;
    if (typeof rawPrice === 'string') {
      const clean = parseInt(rawPrice.replace(/[^\d]/g, ''));
      return isNaN(clean) ? 0 : clean;
    }
    return 0;
  };

  const handleWhatsAppOrder = () => {
    const cleanPrice = sanitizePrice(product?.price);
    const total = cleanPrice * quantity;
    const customerName = user?.name || 'Valued Shopper';
    const message = `Hello New Samadhan Shoe Mart! 👟\n\nI want to order this Masterpiece:\n\n*Product:* ${product?.name}\n*Brand:* ${product?.brand || 'New Samadhan'}\n*Quantity:* ${quantity}\n*Size:* ${selectedSize || 'Standard'}\n*Price:* ₹${cleanPrice.toLocaleString()}\n*Total Amount:* ₹${total.toLocaleString()}\n\n*--- CUSTOMER DETAILS ---*\n*Name:* ${customerName}\n*Contact:* ${user?.phone || 'Not Provided'}\n*Address:* ${user?.address || 'Nashik Store / Delivery'}\n*City:* ${user?.city || 'Nashik'}\n*Pincode:* ${user?.pincode || '422003'}\n\n*--- ORDER METADATA ---*\n*Ref ID:* #NSSM-${Math.floor(100000 + Math.random() * 900000)}\n\nPlease confirm availability and share payment details.`;

    // Rotate between primary business numbers (1. 9423228843, 2. 8888644021)
    const targetNum = Math.random() > 0.5 ? '9423228843' : '8888644021';
    window.open(`https://wa.me/91${targetNum}?text=${encodeURIComponent(message)}`, '_blank');
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F5F0]">
       <div className="w-16 h-16 border-4 border-[#8B0000] border-t-transparent rounded-full animate-spin mb-8"></div>
       <p className="text-[#6B6B6B] font-bold tracking-[0.5em] uppercase text-[10px]">Loading Masterpiece...</p>
    </div>
  );

  if (!product) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F5F0] pt-32 pb-24 text-center px-6">
      <h2 className="text-3xl font-editorial font-bold uppercase text-[#111111] mb-4">Masterpiece Not Found</h2>
      <button onClick={() => navigate('/products')} className="px-8 py-4 bg-[#111111] text-white rounded-2xl text-xs font-bold uppercase tracking-widest">
        Return to Catalog
      </button>
    </div>
  );

  const displayImages = (product?.images && product.images.length > 0)
    ? product.images
    : (product?.image ? [product.image] : ['/Shoes.png']);

  return (
    <div className="bg-[#F7F5F0] min-h-screen relative text-[#111111] overflow-x-hidden pt-32 pb-20">

      <div className="container mx-auto max-w-[1440px] px-6 md:px-12">

        {/* BREADCRUMB */}
        <button
          onClick={() => navigate(-1)}
          className="reveal-item flex items-center gap-4 text-[#6B6B6B] hover:text-[#111111] transition-colors font-bold uppercase text-[10px] tracking-widest mb-12 group"
        >
          <div className="w-10 h-10 bg-white border border-[#111111]/5 rounded-xl flex items-center justify-center group-hover:bg-[#111111] group-hover:text-white transition-all shadow-sm">
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          </div>
          Back to Catalog
        </button>

        <div className="grid lg:grid-cols-12 gap-16 xl:gap-24 items-start">

          {/* LEFT: 3D INTERACTIVE VIEWER */}
          <div className="lg:col-span-7 reveal-item">
            <div
              ref={viewerRef}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className={`relative aspect-square md:aspect-[4/3] bg-white rounded-[4rem] overflow-hidden border border-[#111111]/5 shadow-2xl flex items-center justify-center p-12 group transition-all duration-500 ${isDragging ? 'cursor-grabbing scale-[1.02]' : 'cursor-grab'} touch-none`}
              style={{ perspective: '2000px' }}
            >
              {/* Luxury HUD elements */}
              <div className="absolute top-10 left-10 z-20">
                <span className="bg-[#8B0000] text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                  {product?.category || 'Premium'}
                </span>
              </div>
              <div className="absolute top-10 right-10 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="p-4 bg-[#F7F5F0] rounded-2xl border border-[#111]/5 text-[#6B6B6B]">
                  <Maximize2 size={18} />
                </div>
              </div>

              {/* 3D SHOE STAGE */}
              <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
                {/* Dynamic Shadow */}
                <div
                  ref={shadowRef}
                  className="absolute bottom-[10%] w-[60%] h-[40px] bg-black/40 blur-[40px] rounded-full opacity-40 transition-transform duration-300"
                />

                {/* The Shoe Asset */}
                <div
                  ref={shoeRef}
                  className="relative w-full flex items-center justify-center will-change-transform transform-gpu"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Gloss Overlay */}
                  <div className="absolute inset-0 z-10 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 mix-blend-overlay" />

                  <img
                    src={displayImages[activeImage]}
                    alt={product?.name}
                    loading="lazy"
                    className="w-[85%] h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)] brightness-105 contrast-105"
                  />
                </div>
              </div>

              {/* Interactive Prompt */}
              <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-3 transition-opacity duration-500 ${isDragging ? 'opacity-0' : 'opacity-30 group-hover:opacity-60'}`}>
                <Box size={14} className="animate-bounce" />
                <span className="text-[10px] font-black uppercase tracking-widest">Click & Drag to Rotate</span>
              </div>
            </div>

            {/* THUMBNAILS */}
            {displayImages.length > 1 && (
              <div className="mt-10 flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
                {displayImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`shrink-0 w-24 h-24 rounded-3xl overflow-hidden border-2 transition-all p-2 bg-white ${activeImage === i ? 'border-[#8B0000] shadow-xl scale-105' : 'border-[#111111]/5 opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} alt={`View ${i}`} className="w-full h-full object-contain rounded-2xl" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: PRODUCT INFO */}
          <div className="lg:col-span-5 space-y-10 reveal-item">
            <div className="bg-white/80 backdrop-blur-xl p-10 md:p-16 rounded-[4rem] border border-[#111111]/5 shadow-2xl">
              <div className="flex items-center gap-2 mb-8">
                 <div className="flex text-[#8B0000]">
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill={i < Math.floor(product?.rating || 5) ? "currentColor" : "none"} />)}
                 </div>
                 <span className="text-[#6B6B6B] font-bold text-[10px] ml-4 uppercase tracking-[0.2em]">{product?.rating || '5.0'} / 5.0 Elite Score</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-editorial font-black text-[#111111] mb-8 tracking-tighter uppercase leading-[0.9]">
                {product?.name}
              </h1>

              <p className="text-[#6B6B6B] font-medium leading-relaxed text-lg italic border-l-4 border-[#8B0000] pl-6 mb-12">
                "{product?.description}"
              </p>

              <div className="space-y-12 mb-16 pt-10 border-t border-[#111111]/5">
                 <div className="flex flex-wrap items-end gap-12">
                    <div className="flex flex-col">
                       <span className="text-[9px] font-black text-[#6B6B6B] uppercase tracking-[0.3em] mb-3">Market Valuation</span>
                       <span className="text-5xl font-black text-[#111111] tracking-tighter tabular-nums">₹{(sanitizePrice(product?.price) * quantity).toLocaleString()}</span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-[9px] font-black text-[#6B6B6B] uppercase tracking-[0.3em] mb-3">Quantity</span>
                        <div className="flex items-center border-2 border-[#111111]/5 rounded-2xl overflow-hidden bg-[#F7F5F0]">
                           <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-6 py-3 hover:bg-[#111111] hover:text-white text-[#111111] font-bold text-xl transition-colors">-</button>
                           <span className="px-6 py-3 font-bold text-xl border-x-2 border-[#111111]/5 min-w-[70px] text-center text-[#111111]">{quantity}</span>
                           <button onClick={() => setQuantity(quantity + 1)} className="px-6 py-3 hover:bg-[#111111] hover:text-white text-[#111111] font-bold text-xl transition-colors">+</button>
                        </div>
                    </div>
                 </div>

                 <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                       <span className="text-[9px] font-black text-[#6B6B6B] uppercase tracking-[0.3em]">Vault Fit (UK/IN)</span>
                       <span className="text-[9px] font-bold text-[#8B0000] underline uppercase cursor-help">Size Guide</span>
                    </div>
                    <div className="flex flex-wrap gap-4">
                       {product?.sizes?.map((size) => (
                          <button
                             key={size}
                             onClick={() => setSelectedSize(size)}
                             className={`w-14 h-14 rounded-2xl font-black text-sm border-2 transition-all ${selectedSize === size ? 'bg-[#111111] text-white border-[#111111] shadow-xl scale-110' : 'bg-white text-[#6B6B6B] border-[#111111]/5 hover:border-[#8B0000]/30'}`}
                          >
                             {size}
                          </button>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <button
                   onClick={handleAddToCart}
                   className={`py-8 rounded-3xl text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-2xl flex items-center justify-center gap-4 group ${added ? 'bg-emerald-500 text-white' : 'bg-[#111111] text-white hover:bg-[#8B0000]'}`}
                 >
                    {added ? <Check size={20} /> : <ShoppingBag size={20} />} {added ? 'Secured' : 'Add to Collection'}
                 </button>
                 <button
                   onClick={handleWhatsAppOrder}
                   className="bg-emerald-500/10 text-emerald-600 border-2 border-emerald-500/20 py-8 rounded-3xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-emerald-500 hover:text-white transition-all shadow-lg flex items-center justify-center gap-4 group backdrop-blur-md"
                 >
                    <MessageCircle size={20} /> Pay via WhatsApp
                 </button>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: TECH SPECS */}
        <div className="mt-32 grid md:grid-cols-3 gap-10 reveal-item">
          {[
            { icon: ShieldCheck, title: "Authentic Heritage", text: "Direct from the Nashik workshop. We use only selected full-grain hides." },
            { icon: Layers, title: "Dual-Density Sole", text: "Engineered for 18-hour deployment. Multi-layered shock absorption." },
            { icon: RefreshCw, title: "Lifetime Polish", text: "Complimentary refurbishing service for all premium leather collections." }
          ].map((item, i) => (
            <div key={i} className="bg-white p-12 rounded-[3rem] border border-[#111]/5 hover:shadow-xl transition-all group">
              <div className="w-16 h-16 bg-[#8B0000]/10 rounded-2xl flex items-center justify-center text-[#8B0000] mb-8 group-hover:bg-[#8B0000] group-hover:text-white transition-all">
                <item.icon size={28} />
              </div>
              <h4 className="text-xl font-editorial font-black uppercase tracking-tight mb-4">{item.title}</h4>
              <p className="text-sm text-[#6B6B6B] leading-relaxed font-medium">{item.text}</p>
            </div>
          ))}
        </div>

        {/* REVIEWS SYSTEM */}
        <div className="reveal-item">
          <Reviews productId={product.id || product._id} isAdmin={user?.role === 'admin'} />
        </div>

      </div>

      {/* Global CSS for Glow & Shine */}
      <style>{`
        @keyframes shine {
          0% { background-position: -200% -200%; }
          100% { background-position: 200% 200%; }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ProductDetails;
