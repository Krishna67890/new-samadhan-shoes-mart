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

    const message = `Hello New Samadhan Shoes Mart! 👋\n\nI want to order this Masterpiece:\n\n👟 *Product:* ${product.name}\n🏷️ *Brand:* ${product.brand}\n💰 *Price:* ₹${product.price.toLocaleString()}\n📏 *Size:* To be confirmed\n📦 *Quantity:* 1\n\n--- CUSTOMER DETAILS ---\n👤 *Name:* ${user?.name || 'Guest'}\n📍 *Address:* ${user?.address || 'Not Provided'}\n🏙️ *City:* ${user?.city || 'Not Provided'}\n📮 *Pincode:* ${user?.pincode || 'Not Provided'}\n\n--- PAYMENT INTENT ---\nI am ready to proceed with the online payment via UPI/Bank Transfer. Please share the QR code or Payment Link.`;
    window.open(`https://wa.me/917058564508?text=${encodeURIComponent(message)}`, '_blank');
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
        setProducts(localProducts); // Fail gracefully to local data
      }
    };
    fetchProducts();
  }, [request]);

  return (
    <div className="bg-slate-50 min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Clean Luxury Header */}
        <div className="mb-24 text-center">
          <div className="flex justify-center mb-6">
            <div className="px-5 py-2 bg-blue-600/10 border border-blue-600/20 text-blue-600 text-[10px] font-black uppercase tracking-[0.4em] rounded-full flex items-center gap-2 shadow-2xl">
               <Sparkles size={12} /> Established Vision 2026
            </div>
          </div>
          <h1 className="text-7xl md:text-8xl font-black text-slate-950 mb-8 tracking-tighter uppercase leading-none">The Vault.</h1>
          <p className="text-slate-400 text-xs font-black uppercase tracking-[0.6em] max-w-xl mx-auto leading-loose italic">
            "Curated Artisanal Footwear for the Elite Member"
          </p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
             <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-8"></div>
             <p className="text-slate-400 font-black tracking-[0.5em] uppercase text-[10px]">Synchronizing Catalog...</p>
          </div>
        ) : (products && products.length > 0) ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
            {products.map((product) => (
              <div
                key={product._id}
                className="product-card group bg-white rounded-[3rem] overflow-hidden border border-slate-100 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.02)] hover:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.08)] transition-all duration-1000"
              >
                <div
                  className="relative overflow-hidden aspect-square m-3 rounded-[2.5rem] cursor-pointer"
                  onClick={() => handleProductClick(product._id)}
                >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000"
                    />
                  <div className="absolute top-5 left-5">
                    <div className="bg-white px-4 py-1.5 rounded-full text-[8px] font-black text-slate-950 shadow-xl uppercase tracking-widest border border-slate-100">
                       {product.brand}
                    </div>
                  </div>
                </div>

                <div className="px-10 py-8">
                  <h3
                    onClick={() => handleProductClick(product._id)}
                    className="text-xl font-black text-slate-950 hover:text-blue-600 transition-colors mb-4 line-clamp-1 uppercase tracking-tight cursor-pointer"
                  >
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-1 mb-8">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className={`${i < product.rating ? 'fill-blue-600 text-blue-600' : 'text-slate-100'}`} />
                    ))}
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t border-slate-50">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-black text-slate-400 uppercase tracking-[0.3em] mb-1">Elite Price</span>
                      <span className="text-2xl font-black text-slate-950 tracking-tighter">₹{product.price.toLocaleString()}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleWhatsAppOrder(product)}
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg ${isVerified ? 'bg-emerald-500 text-white hover:bg-emerald-600' : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-50'}`}
                        title={isVerified ? "WhatsApp Order" : "Verify Identity to Order"}
                      >
                         <MessageCircle size={20} />
                      </button>
                      <button
                        onClick={() => handleProductClick(product._id)}
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg ${isVerified ? 'bg-slate-950 text-white hover:bg-blue-600' : 'bg-slate-200 text-slate-400 cursor-not-allowed opacity-50'}`}
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ProductsPage;
