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
  // Simple Image Selection Logic
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);

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
    const message = `Hello New Samadhan Shoe Mart! 👟\n\nI want to order this Masterpiece:\n\n*Product:* ${product?.name}\n*Brand:* ${product?.brand || 'New Samadhan'}\n*Quantity:* ${quantity}\n*Size:* ${selectedSize || 'Standard'}\n*Price:* ₹${(cleanPrice || 0).toLocaleString()}\n*Total Amount:* ₹${(total || 0).toLocaleString()}\n\n*--- CUSTOMER DETAILS ---*\n*Name:* ${customerName}\n*Contact:* ${user?.phone || 'Not Provided'}\n*Address:* ${user?.address || 'Nashik Store / Delivery'}\n*City:* ${user?.city || 'Nashik'}\n*Pincode:* ${user?.pincode || '422003'}\n\n*--- ORDER METADATA ---*\n*Ref ID:* #NSSM-${Math.floor(100000 + Math.random() * 900000)}\n\nPlease confirm availability and share payment details.`;

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
    <div className="bg-[#F7F5F0] min-h-screen relative text-[#111111] overflow-x-hidden pt-32 pb-20 no-blur-zone">

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

        <div className="grid lg:grid-cols-12 gap-8 md:gap-16 xl:gap-24 items-start">

          {/* LEFT: STATIC IMAGE VIEWER (RESPONSIVE) */}
          <div className="lg:col-span-7 reveal-item w-full">
            <div
              className="relative aspect-square md:aspect-[4/3] bg-white rounded-2xl md:rounded-[4rem] overflow-hidden border border-[#111111]/5 shadow-xl flex items-center justify-center p-4 md:p-12 transition-all duration-500"
            >
              {/* Luxury HUD elements */}
              <div className="absolute top-6 left-6 md:top-10 md:left-10 z-20">
                <span className="bg-[#8B0000] text-white px-4 py-1 md:px-6 md:py-2 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest shadow-lg">
                  {product?.category || 'Premium'}
                </span>
              </div>

              {/* Static Image Display */}
              <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={displayImages[activeImage]}
                    alt={product?.name}
                    loading="lazy"
                    className="w-[90%] md:w-[85%] h-auto object-contain drop-shadow-[0_10px_30px_rgba(0,0,0,0.1)] transition-transform duration-500 hover:scale-105"
                  />
              </div>
            </div>

            {/* THUMBNAILS (Always 4 or more simple display) */}
            <div className="mt-6 md:mt-10 flex gap-3 md:gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x">
              {displayImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`shrink-0 w-16 h-16 md:w-24 md:h-24 rounded-xl md:rounded-3xl overflow-hidden border-2 transition-all p-1 md:p-2 bg-white snap-center ${activeImage === i ? 'border-[#8B0000] shadow-xl scale-105' : 'border-[#111111]/5 opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt={`View ${i}`} className="w-full h-full object-contain rounded-lg md:rounded-2xl" />
                </button>
              ))}
              {/* If fewer than 4 images, repeat first as placeholder to ensure "4 photos" look if needed, or just let it be */}
            </div>
          </div>

          {/* RIGHT: PRODUCT INFO */}
          <div className="lg:col-span-5 space-y-6 md:space-y-10 reveal-item w-full">
            <div className="bg-white/95 p-6 md:p-16 rounded-3xl md:rounded-[4rem] border border-[#111111]/5 shadow-xl">
              <div className="flex items-center gap-2 mb-4 md:mb-8">
                 <div className="flex text-[#8B0000]">
                    {[...Array(5)].map((_, i) => <Star key={i} size={12} md:size={14} fill={i < Math.floor(product?.rating || 5) ? "currentColor" : "none"} />)}
                 </div>
                 <span className="text-[#6B6B6B] font-bold text-[8px] md:text-[10px] ml-2 md:ml-4 uppercase tracking-[0.2em]">{product?.rating || '5.0'} / 5.0 Elite Score</span>
              </div>

              <h1 className="text-3xl md:text-6xl font-editorial font-black text-[#111111] mb-4 md:mb-8 tracking-tighter uppercase leading-[0.9]">
                {product?.name}
              </h1>

              <p className="text-[#6B6B6B] font-medium leading-relaxed text-sm md:text-lg italic border-l-4 border-[#8B0000] pl-4 md:pl-6 mb-8 md:mb-12">
                "{product?.description}"
              </p>

              <div className="space-y-8 md:space-y-12 mb-8 md:mb-16 pt-6 md:pt-10 border-t border-[#111111]/5">
                 <div className="flex flex-col sm:flex-row sm:items-end gap-6 md:gap-12">
                    <div className="flex flex-col">
                       <span className="text-[8px] md:text-[9px] font-black text-[#6B6B6B] uppercase tracking-[0.3em] mb-2 md:mb-3">Market Valuation</span>
                       <span className="text-3xl md:text-5xl font-black text-[#111111] tracking-tighter tabular-nums">₹{( (sanitizePrice(product?.price) || 0) * quantity).toLocaleString()}</span>
                    </div>

                    <div className="flex flex-col">
                        <span className="text-[8px] md:text-[9px] font-black text-[#6B6B6B] uppercase tracking-[0.3em] mb-2 md:mb-3">Quantity</span>
                        <div className="flex items-center border-2 border-[#111111]/5 rounded-xl md:rounded-2xl overflow-hidden bg-[#F7F5F0] w-fit">
                           <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 md:px-6 md:py-3 hover:bg-[#111111] hover:text-white text-[#111111] font-bold text-lg md:text-xl transition-colors">-</button>
                           <span className="px-4 py-2 md:px-6 md:py-3 font-bold text-lg md:text-xl border-x-2 border-[#111111]/5 min-w-[50px] md:min-w-[70px] text-center text-[#111111]">{quantity}</span>
                           <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 md:px-6 md:py-3 hover:bg-[#111111] hover:text-white text-[#111111] font-bold text-lg md:text-xl transition-colors">+</button>
                        </div>
                    </div>
                 </div>

                 <div className="flex flex-col gap-4 md:gap-6">
                    <div className="flex justify-between items-center">
                       <span className="text-[8px] md:text-[9px] font-black text-[#6B6B6B] uppercase tracking-[0.3em]">Vault Fit (UK/IN)</span>
                       <span className="text-[8px] md:text-[9px] font-bold text-[#8B0000] underline uppercase cursor-help">Size Guide</span>
                    </div>
                    <div className="flex flex-wrap gap-2 md:gap-4">
                       {product?.sizes?.map((size) => (
                          <button
                             key={size}
                             onClick={() => setSelectedSize(size)}
                             className={`w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-2xl font-black text-xs md:text-sm border-2 transition-all ${selectedSize === size ? 'bg-[#111111] text-white border-[#111111] shadow-xl scale-110' : 'bg-white text-[#6B6B6B] border-[#111111]/5 hover:border-[#8B0000]/30'}`}
                          >
                             {size}
                          </button>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                 <button
                   onClick={handleAddToCart}
                   className={`py-6 md:py-8 rounded-2xl md:rounded-3xl text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] transition-all shadow-xl flex items-center justify-center gap-3 md:gap-4 group ${added ? 'bg-emerald-500 text-white' : 'bg-[#111111] text-white hover:bg-[#8B0000]'}`}
                 >
                    {added ? <Check size={18} /> : <ShoppingBag size={18} />} {added ? 'Secured' : 'Add to Collection'}
                 </button>
                 <button
                   onClick={handleWhatsAppOrder}
                   className="bg-emerald-500/10 text-emerald-600 border-2 border-emerald-500/20 py-6 md:py-8 rounded-2xl md:rounded-3xl text-[8px] md:text-[10px] font-black uppercase tracking-[0.3em] hover:bg-emerald-500 hover:text-white transition-all shadow-lg flex items-center justify-center gap-3 md:gap-4 group"
                 >
                    <MessageCircle size={18} /> Pay via WhatsApp
                 </button>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION: TECH SPECS (RESPONSIVE) */}
        <div className="mt-16 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 reveal-item">
          {[
            { icon: ShieldCheck, title: "Authentic Heritage", text: "Direct from the Nashik workshop. We use only selected full-grain hides." },
            { icon: Layers, title: "Dual-Density Sole", text: "Engineered for 18-hour deployment. Multi-layered shock absorption." },
            { icon: RefreshCw, title: "Lifetime Polish", text: "Complimentary refurbishing service for all premium leather collections." }
          ].map((item, i) => (
            <div key={i} className="bg-white p-8 md:p-12 rounded-3xl md:rounded-[3rem] border border-[#111]/5 hover:shadow-xl transition-all group">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-[#8B0000]/10 rounded-xl md:rounded-2xl flex items-center justify-center text-[#8B0000] mb-6 md:mb-8 group-hover:bg-[#8B0000] group-hover:text-white transition-all">
                <item.icon size={24} />
              </div>
              <h4 className="text-lg md:text-xl font-editorial font-black uppercase tracking-tight mb-3 md:mb-4">{item.title}</h4>
              <p className="text-xs md:text-sm text-[#6B6B6B] leading-relaxed font-medium">{item.text}</p>
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
