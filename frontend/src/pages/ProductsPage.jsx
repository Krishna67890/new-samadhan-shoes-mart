import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { AuthContext } from '../context/AuthContext';
import useFetch from '../hooks/useFetch';
import { Star, ChevronRight, Sparkles, ShoppingBag, MessageCircle } from 'lucide-react';

import localProducts from '../utils/localProducts';

const ProductsPage = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const { loading, error, request } = useFetch();
  const [products, setProducts] = useState(localProducts);

  const isVerified = user?.role === 'admin' || user?.identityVerified;

  // PRICE SANITIZER: Handles "₹ 18,500" or undefined
  const sanitizePrice = (rawPrice) => {
    if (typeof rawPrice === 'number') return rawPrice;
    if (typeof rawPrice === 'string') {
      const clean = parseInt(rawPrice.replace(/[^\d]/g, ''));
      return isNaN(clean) ? 0 : clean;
    }
    return 0;
  };

  const handleProductClick = (productId) => {
    if (!isAuthenticated) {
      sessionStorage.setItem('redirectAfterLogin', `/product/${productId}`);
      navigate('/login');
    } else if (user?.role !== 'admin' && !user?.identityVerified) {
      navigate('/identity');
    } else {
      navigate(`/product/${productId}`);
    }
  };

  const handleWhatsAppOrder = (product) => {
    if (!isAuthenticated) {
      sessionStorage.setItem('redirectAfterLogin', `/product/${product._id}`);
      navigate('/login');
      return;
    }

    if (user?.role !== 'admin' && !user?.identityVerified) {
      navigate('/identity');
      return;
    }

    const cleanPrice = sanitizePrice(product?.price);
    const message = `Hello New Samadhan Shoe Mart! 👋\n\nI want to order this Masterpiece:\n\n👟 *Product:* ${product?.name}\n🏷️ *Brand:* ${product?.brand}\n💰 *Price:* ₹${cleanPrice.toLocaleString()}\n📏 *Size:* To be confirmed\n📦 *Quantity:* 1\n\n--- CUSTOMER DETAILS ---\n👤 *Name:* ${user?.name || 'Guest'}\n📍 *Address:* ${user?.address || 'Not Provided'}\n🏙️ *City:* ${user?.city || 'Not Provided'}\n📮 *Pincode:* ${user?.pincode || 'Not Provided'}\n\n--- PAYMENT INTENT ---\nI am ready to proceed with the online payment via UPI/Bank Transfer. Please share the QR code or Payment Link.`;

    // Dual Shopkeeper Protocol
    window.open(`https://wa.me/919423228843?text=${encodeURIComponent(message)}`, '_blank');
    setTimeout(() => {
      window.open(`https://wa.me/918888644021?text=${encodeURIComponent(message)}`, '_blank');
    }, 600);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await request('/api/products');
        if (data && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(localProducts);
        }

        setTimeout(() => {
          gsap.fromTo('.product-card',
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
          );
        }, 100);
      } catch (err) {
        console.error("Fetch Error:", err);
        setProducts(localProducts);
      }
    };
    fetchProducts();
  }, [request]);

  return (
    <div className="bg-[#050505] min-h-screen pt-32 pb-24 relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-blue-600/10 blur-[120px] rounded-full"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* Clean Luxury Header */}
        <div className="mb-24 text-center">
          <div className="flex justify-center mb-6">
            <div className="px-5 py-2 bg-white/5 border border-white/10 text-blue-400 text-[10px] font-black uppercase tracking-[0.4em] rounded-full flex items-center gap-2 shadow-2xl backdrop-blur-md">
               <Sparkles size={12} /> Established Vision 2026
            </div>
          </div>
          <h1 className="text-4xl sm:text-7xl md:text-9xl font-black text-white mb-8 tracking-tighter uppercase leading-none mix-blend-difference">The Vault.</h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.6em] max-w-xl mx-auto leading-loose italic">
            "Curated Artisanal Footwear for the Elite Member"
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
             <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-8 shadow-[0_0_30px_rgba(37,99,235,0.3)]"></div>
             <p className="text-slate-500 font-black tracking-[0.5em] uppercase text-[10px]">Accessing Secure Server...</p>
          </div>
        ) : (products && products.length > 0) ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {products.map((product) => {
              const cleanPrice = sanitizePrice(product?.price);
              return (
                <div
                  key={product._id}
                  className="product-card group bg-white/[0.03] backdrop-blur-xl rounded-[3rem] overflow-hidden border border-white/5 hover:border-white/20 hover:bg-white/[0.07] transition-all duration-700 shadow-2xl"
                >
                  <div
                    className="relative overflow-hidden aspect-square m-3 rounded-[2.5rem] cursor-pointer bg-[#111]"
                    onClick={() => handleProductClick(product._id)}
                  >
                      <img
                        src={product?.images?.[0] || 'https://via.placeholder.com/400'}
                        alt={product?.name}
                        className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000 opacity-90 group-hover:opacity-100"
                      />
                    <div className="absolute top-5 left-5">
                      <div className="bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-[8px] font-black text-white shadow-xl uppercase tracking-widest border border-white/10">
                         {product?.brand}
                      </div>
                    </div>
                  </div>

                  <div className="px-10 py-8">
                    <h3
                      onClick={() => handleProductClick(product?._id)}
                      className="text-lg font-black text-white/90 hover:text-blue-400 transition-colors mb-4 line-clamp-1 uppercase tracking-tight cursor-pointer"
                    >
                      {product?.name}
                    </h3>

                    <div className="flex items-center gap-1 mb-8 opacity-50">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} className={`${i < product?.rating ? 'fill-blue-500 text-blue-500' : 'text-white/10'}`} />
                      ))}
                    </div>

                    <div className="flex justify-between items-center pt-6 border-t border-white/5">
                      <div className="flex flex-col">
                        <span className="text-[8px] font-black text-slate-500 uppercase tracking-[0.3em] mb-1">Elite Valuation</span>
                        <span className="text-2xl font-black text-white tracking-tighter">₹{cleanPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleWhatsAppOrder(product)}
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg ${isVerified ? 'bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 hover:bg-emerald-500 hover:text-white' : 'bg-white/5 text-white/10 cursor-not-allowed border border-white/5'}`}
                          title={isVerified ? "WhatsApp Order" : "Verify Identity to Order"}
                        >
                           <MessageCircle size={18} />
                        </button>
                        <button
                          onClick={() => handleProductClick(product?._id)}
                          className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg ${isVerified ? 'bg-white text-black hover:bg-blue-600 hover:text-white' : 'bg-white/5 text-white/10 cursor-not-allowed border border-white/5'}`}
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-40">
            <p className="text-slate-600 font-black tracking-widest uppercase text-xs">No Artifacts Found in the Vault.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
