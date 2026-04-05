import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import useFetch from '../hooks/useFetch';
import localProducts from '../utils/localProducts';
import {
  Star,
  ChevronLeft,
  ShoppingBag,
  MessageCircle,
  Truck,
  ShieldCheck,
  RefreshCw,
  Info,
  Check
} from 'lucide-react';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useContext(AuthContext);
  const { addToCart } = useCart();
  const { loading, error, request } = useFetch();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await request(`/api/products/${id}`);
        if (data && data._id) {
          setProduct(data);
        } else {
          // Fallback to local products if API fails or returns empty
          const local = localProducts.find(p => String(p._id) === String(id));
          if (local) setProduct(local);
        }
      } catch (err) {
        console.error("API Fetch failed, using local fallback:", err);
        const local = localProducts.find(p => String(p._id) === String(id));
        if (local) setProduct(local);
      }
    };
    fetchProduct();
  }, [id, request]);

  useEffect(() => {
    if (product) {
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      } else if (!product.sizes) {
        // Default sizes for local fallback if missing
        product.sizes = [7, 8, 9, 10, 11];
        setSelectedSize(7);
      }

      // Entrance Animation
      gsap.from('.product-reveal', {
         y: 30,
         opacity: 0,
         duration: 1,
         stagger: 0.1,
         ease: 'power3.out'
      });
    }
  }, [product]);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!selectedSize) {
      alert("Please select a size first!");
      return;
    }

    addToCart(product, quantity, selectedSize);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // PRICE SANITIZER
  const sanitizePrice = (rawPrice) => {
    if (typeof rawPrice === 'number') return rawPrice;
    if (typeof rawPrice === 'string') {
      const clean = parseInt(rawPrice.replace(/[^\d]/g, ''));
      return isNaN(clean) ? 0 : clean;
    }
    return 0;
  };

  const handleWhatsAppOrder = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const cleanPrice = sanitizePrice(product?.price);
    const total = cleanPrice * quantity;
    const message = `Hello Samadhan Shoes Mart! 👟\n\nI want to buy the following elite pair:\n\n*Product:* ${product?.name}\n*Quantity:* ${quantity}\n*Size:* ${selectedSize}\n*Price:* ₹${cleanPrice.toLocaleString()}\n*Total Amount:* ₹${total.toLocaleString()}\n\n*--- CUSTOMER IDENTITY ---*\n*Name:* ${user?.name}\n*Contact:* ${user?.phone}\n*Address:* ${user?.address}\n*City:* ${user?.city}\n*Pincode:* ${user?.pincode}\n\n*--- SYSTEM METADATA ---*\n*Developer ID:* KRISHNA-DEV-001\n*Order Ref:* #${Math.floor(100000 + Math.random() * 900000)}\n\nPlease confirm payment details and availability.`;

    // Dual Shopkeeper Protocol
    window.open(`https://wa.me/919423228843?text=${encodeURIComponent(message)}`, '_blank');
    setTimeout(() => {
      window.open(`https://wa.me/918888644021?text=${encodeURIComponent(message)}`, '_blank');
    }, 600);
  };

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950">
       <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-8"></div>
       <p className="text-slate-400 font-black tracking-[0.5em] uppercase text-[10px]">Accessing Vault Data...</p>
    </div>
  );

  if (!product) return null;

  return (
    <div className="bg-[#050505] min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-4 text-slate-500 hover:text-white transition-colors font-black uppercase text-[10px] tracking-widest mb-12 group"
        >
          <div className="w-10 h-10 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center group-hover:bg-blue-600 transition-all">
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          </div>
          Back to Catalog
        </button>

        <div className="grid lg:grid-cols-2 gap-20 items-start">

          {/* LEFT: VISUALS */}
          <div className="space-y-8 product-reveal">
             <div className="aspect-square bg-[#111] rounded-[4rem] overflow-hidden border border-white/5 shadow-2xl relative group">
                <img
                   src={product?.images?.[activeImage]}
                   alt={product?.name}
                   className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-1000 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute top-10 left-10">
                   <span className="bg-blue-600 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl border border-blue-500/50">
                      {product?.brand}
                   </span>
                </div>
             </div>

             <div className="grid grid-cols-4 gap-6">
                {product?.images?.map((img, i) => (
                   <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`aspect-square rounded-[2rem] overflow-hidden border-4 transition-all p-1 ${activeImage === i ? 'border-blue-600 shadow-xl shadow-blue-500/20' : 'border-transparent opacity-40 hover:opacity-100 bg-white/5'}`}
                   >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover rounded-[1.5rem]" />
                   </button>
                ))}
             </div>
          </div>

          {/* RIGHT: INFO & ACTION */}
          <div className="space-y-10 product-reveal">
             <div className="bg-white/5 backdrop-blur-3xl p-12 rounded-[4rem] border border-white/10 shadow-2xl">
                <div className="flex items-center gap-1 mb-8 opacity-80">
                   {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={`${i < product?.rating ? 'fill-blue-500 text-blue-500' : 'text-white/10'}`} />
                   ))}
                   <span className="text-slate-500 font-black text-[10px] ml-4 uppercase tracking-widest">({product?.rating}.0 Elite Score)</span>
                </div>
                <h1 className="text-5xl font-black text-white mb-8 tracking-tighter uppercase leading-[0.9]">{product?.name}</h1>
                <p className="text-slate-400 font-medium leading-relaxed text-lg italic border-l-2 border-blue-600 pl-6">"{product?.description}"</p>

                <div className="flex flex-col gap-10 mt-12 pt-10 border-t border-white/5">
                   <div className="flex flex-wrap items-end gap-12">
                      <div className="flex flex-col">
                         <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3">Market Valuation</span>
                         <span className="text-5xl font-black text-white tracking-tighter">₹{(sanitizePrice(product?.price) * quantity).toLocaleString()}</span>
                      </div>
                      <div className="flex flex-col">
                          <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em] mb-3">Quantity</span>
                          <div className="flex items-center border border-white/10 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-md">
                             <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-6 py-3 hover:bg-white/10 text-white font-black text-xl transition-colors">-</button>
                             <span className="px-6 py-3 font-black text-xl border-x border-white/10 min-w-[70px] text-center text-white">{quantity}</span>
                             <button onClick={() => setQuantity(quantity + 1)} className="px-6 py-3 hover:bg-white/10 text-white font-black text-xl transition-colors">+</button>
                          </div>
                      </div>
                   </div>

                   <div className="flex flex-col gap-5">
                      <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.3em]">Vault Fit (UK/IN)</span>
                      <div className="flex flex-wrap gap-4">
                         {product?.sizes?.map((size) => (
                            <button
                               key={size}
                               onClick={() => setSelectedSize(size)}
                               className={`w-14 h-14 rounded-2xl font-black text-sm border-2 transition-all backdrop-blur-md ${selectedSize === size ? 'bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-500/20 scale-110' : 'bg-white/5 text-slate-400 border-white/5 hover:border-white/20'}`}
                            >
                               {size}
                            </button>
                         ))}
                      </div>
                   </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
                   <button
                     onClick={handleAddToCart}
                     className={`py-6 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-2xl flex items-center justify-center gap-4 group ${added ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-white text-black hover:bg-blue-600 hover:text-white'}`}
                   >
                      {added ? <Check size={20} /> : <ShoppingBag size={20} />} {added ? 'Secured' : 'Add to Collection'}
                   </button>
                   <button
                     onClick={handleWhatsAppOrder}
                     className="bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 py-6 rounded-[2rem] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-emerald-500 hover:text-white transition-all shadow-xl flex items-center justify-center gap-4 group backdrop-blur-md"
                   >
                      <MessageCircle size={20} /> Pay via WhatsApp
                   </button>
                </div>
             </div>

             {/* TRUST BADGES */}
             <div className="grid grid-cols-3 gap-8 pt-6 px-12">
                <div className="flex flex-col items-center text-center gap-4">
                   <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-500 border border-white/5">
                      <ShieldCheck size={24} />
                   </div>
                   <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-500">Authentic Seal</span>
                </div>
                <div className="flex flex-col items-center text-center gap-4">
                   <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-500 border border-white/5">
                      <Truck size={24} />
                   </div>
                   <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-500">Lightning Ship</span>
                </div>
                <div className="flex flex-col items-center text-center gap-4">
                   <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-slate-500 border border-white/5">
                      <RefreshCw size={24} />
                   </div>
                   <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-500">Easy Exchange</span>
                </div>
             </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
