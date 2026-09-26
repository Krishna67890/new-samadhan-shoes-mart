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
        if (data && (data._id || data.id)) {
          setProduct(data);
          return;
        }
      } catch (err) {
        console.warn("API Fetch failed, using local catalog fallback:", err);
      }
      // Fallback to local products by _id or id
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
      gsap.from('.product-reveal', {
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
      alert("Please select your size first!");
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
    const cleanPrice = sanitizePrice(product?.price);
    const total = cleanPrice * quantity;
    const customerName = user?.name || 'Valued Shopper';
    const message = `Hello New Samadhan Shoe Mart! 👟\n\nI want to order this Masterpiece:\n\n*Product:* ${product?.name}\n*Brand:* ${product?.brand || 'New Samadhan'}\n*Quantity:* ${quantity}\n*Size:* ${selectedSize || 'Standard'}\n*Price:* ₹${cleanPrice.toLocaleString()}\n*Total Amount:* ₹${total.toLocaleString()}\n\n*--- CUSTOMER DETAILS ---*\n*Name:* ${customerName}\n*Contact:* ${user?.phone || 'Not Provided'}\n*Address:* ${user?.address || 'Nashik Store / Delivery'}\n*City:* ${user?.city || 'Nashik'}\n*Pincode:* ${user?.pincode || '422003'}\n\n*--- ORDER METADATA ---*\n*Ref ID:* #NSSM-${Math.floor(100000 + Math.random() * 900000)}\n\nPlease confirm availability and share payment details.`;

    // Dual Shopkeeper Protocol
    window.open(`https://wa.me/919423228843?text=${encodeURIComponent(message)}`, '_blank');
    setTimeout(() => {
      window.open(`https://wa.me/918888644021?text=${encodeURIComponent(message)}`, '_blank');
    }, 600);
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
      <p className="text-[#6B6B6B] text-xs uppercase tracking-widest mb-8">This shoe could not be retrieved from the atelier collection.</p>
      <button onClick={() => navigate('/products')} className="px-8 py-4 bg-[#111111] text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-[#8B0000] transition-colors">
        Return to Catalog
      </button>
    </div>
  );

  const displayImages = (product?.images && product.images.length > 0)
    ? product.images
    : (product?.image ? [product.image] : ['/Shoes.png']);

  return (
    <div className="bg-[#F7F5F0] min-h-screen pt-32 pb-24 relative overflow-hidden text-[#111111]">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#8B0000]/5 blur-[120px] rounded-full"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-4 text-[#6B6B6B] hover:text-[#111111] transition-colors font-bold uppercase text-[10px] tracking-widest mb-12 group"
        >
          <div className="w-10 h-10 bg-white border border-[#111111]/5 rounded-xl flex items-center justify-center group-hover:bg-[#111111] group-hover:text-white transition-all shadow-sm">
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          </div>
          Back to Catalog
        </button>

        <div className="grid lg:grid-cols-2 gap-20 items-start">

          {/* LEFT: VISUALS */}
          <div className="space-y-8 product-reveal">
             <div className="aspect-square bg-white rounded-[4rem] overflow-hidden border border-[#111111]/5 shadow-xl relative group flex items-center justify-center p-12">
                <img
                   src={displayImages[activeImage] || displayImages[0]}
                   alt={product?.name}
                   className="w-full h-full object-contain transform hover:scale-105 transition-transform duration-1000"
                   onError={(e) => { e.target.src = '/Shoes.png'; }}
                />
                <div className="absolute top-10 left-10">
                   <span className="bg-[#8B0000] text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg border border-[#8B0000]/50">
                      {product?.brand || 'Samadhan'}
                   </span>
                </div>
             </div>

             {displayImages.length > 1 && (
               <div className="grid grid-cols-4 gap-6">
                  {displayImages.map((img, i) => (
                     <button
                        key={i}
                        onClick={() => setActiveImage(i)}
                        className={`aspect-square rounded-[2rem] overflow-hidden border-2 transition-all p-2 bg-white ${activeImage === i ? 'border-[#8B0000] shadow-lg' : 'border-[#111111]/5 opacity-60 hover:opacity-100'}`}
                     >
                        <img src={img} alt="Thumbnail" className="w-full h-full object-contain rounded-[1.5rem]" onError={(e) => { e.target.src = '/Shoes.png'; }} />
                     </button>
                  ))}
               </div>
             )}
          </div>

          {/* RIGHT: INFO & ACTION */}
          <div className="space-y-10 product-reveal">
             <div className="bg-white/80 backdrop-blur-xl p-12 rounded-[4rem] border border-[#111111]/5 shadow-xl">
                <div className="flex items-center gap-1 mb-8 opacity-80">
                   {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} className={`${i < product?.rating ? 'fill-[#8B0000] text-[#8B0000]' : 'text-[#111111]/10'}`} />
                   ))}
                   <span className="text-[#6B6B6B] font-bold text-[10px] ml-4 uppercase tracking-widest">({product?.rating}.0 Elite Score)</span>
                </div>
                <h1 className="text-5xl font-editorial font-black text-[#111111] mb-8 tracking-tighter uppercase leading-[0.9]">{product?.name}</h1>
                <p className="text-[#6B6B6B] font-medium leading-relaxed text-lg italic border-l-2 border-[#8B0000] pl-6">"{product?.description}"</p>

                <div className="flex flex-col gap-10 mt-12 pt-10 border-t border-[#111111]/5">
                   <div className="flex flex-wrap items-end gap-12">
                      <div className="flex flex-col">
                         <span className="text-[9px] font-bold text-[#6B6B6B] uppercase tracking-[0.3em] mb-3">Market Valuation</span>
                         <span className="text-5xl font-black text-[#111111] tracking-tighter tabular-nums">₹{(sanitizePrice(product?.price) * quantity).toLocaleString()}</span>
                      </div>
                      <div className="flex flex-col">
                          <span className="text-[9px] font-bold text-[#6B6B6B] uppercase tracking-[0.3em] mb-3">Quantity</span>
                          <div className="flex items-center border border-[#111111]/10 rounded-2xl overflow-hidden bg-[#F7F5F0]">
                             <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-6 py-3 hover:bg-[#111111] hover:text-white text-[#111111] font-bold text-xl transition-colors">-</button>
                             <span className="px-6 py-3 font-bold text-xl border-x border-[#111111]/10 min-w-[70px] text-center text-[#111111]">{quantity}</span>
                             <button onClick={() => setQuantity(quantity + 1)} className="px-6 py-3 hover:bg-[#111111] hover:text-white text-[#111111] font-bold text-xl transition-colors">+</button>
                          </div>
                      </div>
                   </div>

                   <div className="flex flex-col gap-5">
                      <span className="text-[9px] font-bold text-[#6B6B6B] uppercase tracking-[0.3em]">Vault Fit (UK/IN)</span>
                      <div className="flex flex-wrap gap-4">
                         {product?.sizes?.map((size) => (
                            <button
                               key={size}
                               onClick={() => setSelectedSize(size)}
                               className={`w-14 h-14 rounded-2xl font-bold text-sm border-2 transition-all ${selectedSize === size ? 'bg-[#111111] text-white border-[#111111] shadow-lg scale-110' : 'bg-white text-[#6B6B6B] border-[#111111]/5 hover:border-[#8B0000]/20'}`}
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
                     className={`py-8 rounded-[2rem] text-[10px] font-bold uppercase tracking-[0.2em] transition-all shadow-xl flex items-center justify-center gap-4 group ${added ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-[#111111] text-white hover:bg-[#8B0000]'}`}
                   >
                      {added ? <Check size={20} /> : <ShoppingBag size={20} />} {added ? 'Secured' : 'Add to Collection'}
                   </button>
                   <button
                     onClick={handleWhatsAppOrder}
                     className="bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 py-8 rounded-[2rem] text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-emerald-500 hover:text-white transition-all shadow-lg flex items-center justify-center gap-4 group backdrop-blur-md"
                   >
                      <MessageCircle size={20} /> Pay via WhatsApp
                   </button>
                </div>
             </div>

             {/* TRUST BADGES */}
             <div className="grid grid-cols-3 gap-8 pt-6 px-12">
                <div className="flex flex-col items-center text-center gap-4">
                   <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#6B6B6B] border border-[#111111]/5 shadow-sm">
                      <ShieldCheck size={24} />
                   </div>
                   <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#6B6B6B]">Authentic Seal</span>
                </div>
                <div className="flex flex-col items-center text-center gap-4">
                   <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#6B6B6B] border border-[#111111]/5 shadow-sm">
                      <Truck size={24} />
                   </div>
                   <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#6B6B6B]">Lightning Ship</span>
                </div>
                <div className="flex flex-col items-center text-center gap-4">
                   <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#6B6B6B] border border-[#111111]/5 shadow-sm">
                      <RefreshCw size={24} />
                   </div>
                   <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#6B6B6B]">Easy Exchange</span>
                </div>
             </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
