import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { AuthContext } from '../context/AuthContext';
import useFetch from '../hooks/useFetch';
import { Star, ChevronRight, Sparkles, ShoppingBag, MessageCircle, Filter, Check, PlusCircle, Edit, Trash2 } from 'lucide-react';

import localProducts from '../utils/localProducts';
import { getMergedProducts } from '../utils/productUtils';
import { calculateProductStats } from '../utils/reviewService';

const CATEGORIES = ['All', 'Men', 'Women', 'Sneakers', 'Formal', 'Kids'];

const ProductsPage = () => {
  const { user, isAuthenticated, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { loading, error, request } = useFetch();
  const [products, setProducts] = useState(localProducts);

  const activeCategory = searchParams.get('category') || 'All';

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
    navigate(`/product/${productId}`);
  };

  const handleWhatsAppOrder = (product) => {
    const cleanPrice = sanitizePrice(product?.price);
    const customerName = user?.name || 'Valued Shopper';
    const message = `Hello New Samadhan Shoe Mart! 👋\n\nI want to order this Masterpiece:\n\n👟 *Product:* ${product?.name}\n🏷️ *Brand:* ${product?.brand || 'New Samadhan'}\n💰 *Price:* ₹${(cleanPrice || 0).toLocaleString()}\n📏 *Size:* To be confirmed\n📦 *Quantity:* 1\n\n--- CUSTOMER DETAILS ---\n👤 *Name:* ${customerName}\n📞 *Phone:* ${user?.phone || 'Not Provided'}\n📍 *Address:* ${user?.address || 'Nashik Store Pickup / Delivery'}\n🏙️ *City:* ${user?.city || 'Nashik'}\n📮 *Pincode:* ${user?.pincode || '422003'}\n\n--- PAYMENT INTENT ---\nI am ready to proceed with online payment or UPI. Please confirm availability and share the payment details.`;

    const encodedMsg = encodeURIComponent(message);
    // Dual Shopkeeper Protocol - Use business numbers 9423228843 or 8888644021
    window.open(`https://wa.me/919423228843?text=${encodedMsg}`, '_blank');
    setTimeout(() => {
      window.open(`https://wa.me/918888644021?text=${encodedMsg}`, '_blank');
    }, 600);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await request('/api/products');
        const allProducts = getMergedProducts(data);
        setProducts(allProducts);
      } catch (err) {
        console.warn("Using local product catalog:", err);
        const allProducts = getMergedProducts([]);
        setProducts(allProducts);
      }
    };
    fetchProducts();
  }, [request]);

  useEffect(() => {
    // Only simple reveal animation for product grid
    gsap.fromTo('.product-card',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: 'power2.out' }
    );
  }, [activeCategory, products]);

  // Comprehensive category filtering
  const filteredProducts = products.filter(p => {
    if (activeCategory === 'All') return true;
    const cat = (p.category || '').toLowerCase();
    const gender = (p.targetGender || '').toLowerCase();
    const name = (p.name || '').toLowerCase();

    if (activeCategory === 'Men') {
      return cat === 'men' || gender === 'men' || cat === 'formal' || (cat === 'sneakers' && gender !== 'women' && gender !== 'kids');
    }
    if (activeCategory === 'Women') {
      return cat === 'women' || gender === 'women' || name.includes('women') || name.includes('stiletto') || name.includes('ballet') || name.includes('femme') || name.includes('lady');
    }
    if (activeCategory === 'Kids') {
      return cat === 'kids' || gender === 'kids' || name.includes('kid') || name.includes('junior') || name.includes('youth') || name.includes('child');
    }
    if (activeCategory === 'Sneakers') {
      return cat === 'sneakers' || name.includes('boost') || name.includes('sneaker') || name.includes('jordan') || name.includes('air max');
    }
    if (activeCategory === 'Formal') {
      return cat === 'formal' || name.includes('derby') || name.includes('oxford') || name.includes('loafer');
    }
    return cat === activeCategory.toLowerCase();
  });

  return (
    <div className="bg-[#F7F5F0] min-h-screen pt-32 pb-24 relative overflow-hidden no-blur-zone">
      {/* Background Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#8B0000]/5 rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        {/* Clean Luxury Header */}
        <div className="mb-16 text-center">
          <div className="flex justify-center mb-6">
            <div className="px-5 py-2 bg-white/70 border border-[#111111]/5 text-[#8B0000] text-[10px] font-black uppercase tracking-[0.4em] rounded-full flex items-center gap-2 shadow-sm">
               <Sparkles size={12} /> Established 1990 · Nashik Atelier
            </div>
          </div>
          <h1 className="text-4xl sm:text-7xl md:text-8xl font-editorial font-black text-[#111111] mb-6 tracking-tighter uppercase leading-none">
            The Collection.
          </h1>
          {isAdmin && (
            <div className="flex justify-center mb-8">
              <button
                onClick={() => navigate(`/admin/product/new?category=${activeCategory !== 'All' ? activeCategory : 'Formal'}`)}
                className="bg-[#8B0000] text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-black transition-all flex items-center shadow-xl shadow-red-100"
              >
                <PlusCircle className="w-4 h-4 mr-2" /> Add New {activeCategory !== 'All' ? activeCategory : 'Product'}
              </button>
            </div>
          )}
          <p className="text-[#6B6B6B] text-[11px] font-bold uppercase tracking-[0.5em] max-w-xl mx-auto leading-loose italic">
            "Artisanal Footwear Crafted with 34 Years of Dedication"
          </p>

          {/* Interactive Category Filter Bar */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 mt-10 flex-wrap">
            {CATEGORIES.map(cat => {
              const isActive = (cat === 'All' && !searchParams.get('category')) || activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    if (cat === 'All') {
                      searchParams.delete('category');
                      setSearchParams(searchParams);
                    } else {
                      setSearchParams({ category: cat });
                    }
                  }}
                  className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                    isActive
                      ? 'bg-[#111111] text-white shadow-lg scale-105'
                      : 'bg-white/80 text-[#6B6B6B] hover:text-[#111111] border border-[#111111]/10 hover:border-[#8B0000]/30'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-40">
             <div className="w-16 h-16 border-4 border-[#8B0000] border-t-transparent rounded-full animate-spin mb-8 shadow-[0_0_30px_rgba(139,0,0,0.1)]"></div>
             <p className="text-[#6B6B6B] font-bold tracking-[0.5em] uppercase text-[10px]">Accessing Vault Catalog...</p>
          </div>
        ) : (filteredProducts && filteredProducts.length > 0) ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => {
              const cleanPrice = sanitizePrice(product?.price);
              const prodId = product._id || product.id;
              const prodImage = product?.images?.[0] || product?.image || '/Shoes.png';

              return (
                <div
                  key={prodId}
                  className="product-card group bg-white p-5 rounded-[2.5rem] overflow-hidden border border-[#111111]/5 hover:border-[#8B0000]/30 transition-all duration-500 shadow-md hover:shadow-2xl flex flex-col justify-between"
                >
                  <div
                    className="relative overflow-hidden aspect-square rounded-[2rem] cursor-pointer bg-[#F7F5F0] flex items-center justify-center p-6"
                    onClick={() => handleProductClick(prodId)}
                  >
                    <img
                      src={prodImage}
                      alt={product?.name}
                      className="w-full h-full object-contain transform scale-95 group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => { e.target.src = '/Shoes.png'; }}
                    />
                    <div className="absolute top-4 left-4">
                      <div className="bg-white/95 px-3.5 py-1 rounded-full text-[9px] font-bold text-[#111111] shadow-sm uppercase tracking-widest border border-[#111111]/5">
                         {product?.brand || 'Samadhan'}
                      </div>
                    </div>
                    {product?.category && (
                      <div className="absolute bottom-4 right-4">
                        <div className="bg-[#111111]/80 px-3 py-1 rounded-full text-[8px] font-bold text-white shadow-sm uppercase tracking-wider">
                           {product.category}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="pt-6 pb-2">
                    <h3
                      onClick={() => handleProductClick(prodId)}
                      className="text-base font-editorial font-bold text-[#111111] hover:text-[#8B0000] transition-colors mb-2 line-clamp-1 uppercase tracking-tight cursor-pointer"
                    >
                      {product?.name}
                    </h3>

                    <div className="flex items-center gap-1 mb-4 opacity-75">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={11} className={`${i < Math.floor(calculateProductStats(prodId).average || product?.rating || 5) ? 'fill-[#8B0000] text-[#8B0000]' : 'text-[#111111]/15'}`} />
                      ))}
                      <span className="text-[10px] text-[#6B6B6B] font-bold ml-2">({calculateProductStats(prodId).average || product?.rating || '4.9'})</span>
                    </div>

                    <div className="flex justify-between items-center pt-4 border-t border-[#111111]/5">
                      <div className="flex flex-col">
                        <span className="text-[8px] font-bold text-[#6B6B6B] uppercase tracking-[0.25em] mb-0.5">Price</span>
                        <span className="text-xl font-black text-[#111111] tracking-tight tabular-nums">₹{(cleanPrice || 0).toLocaleString()}</span>
                      </div>
                      <div className="flex gap-2">
                        {isAdmin && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/admin/product/${prodId}/edit`);
                              }}
                              className="w-11 h-11 rounded-xl flex items-center justify-center transition-all shadow-sm bg-blue-500/10 text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-500/20 active:scale-95"
                              title="Edit Product"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={async (e) => {
                                e.stopPropagation();
                                if (window.confirm('Delete this masterpiece permanently?')) {
                                  const prodIdStr = String(prodId);
                                  // A real MongoDB ID is exactly 24 hex characters.
                                  const isGlobalProduct = /^[0-9a-fA-F]{24}$/.test(prodIdStr);

                                  try {
                                    if (isGlobalProduct) {
                                      await request(`/api/products/${prodId}`, 'DELETE');
                                    }

                                    // Remove from UI state
                                    setProducts(prev => prev.filter(p => (p._id || p.id) !== prodId));

                                    // Remove from local storage cache
                                    const demoProducts = JSON.parse(localStorage.getItem('ssm_demo_products') || '[]');
                                    localStorage.setItem('ssm_demo_products', JSON.stringify(
                                      demoProducts.filter(p => (p._id || p.id) !== prodId)
                                    ));

                                    console.log("Product successfully removed.");
                                  } catch (err) {
                                    console.error("Delete failed:", err);
                                    // If it's NOT a global product, we just remove it from view anyway since it's only local
                                    if (!isGlobalProduct) {
                                       setProducts(prev => prev.filter(p => (p._id || p.id) !== prodId));
                                    } else {
                                       alert('FAILED TO SYNC: The server could not delete this product. It will stay in the catalog until the database is connected. Please check your Vercel/MongoDB connection.');
                                    }
                                  }
                                }
                              }}
                              className="w-11 h-11 rounded-xl flex items-center justify-center transition-all shadow-sm bg-rose-500/10 text-rose-600 hover:bg-rose-600 hover:text-white border border-rose-500/20 active:scale-95"
                              title="Delete Product"
                            >
                              <Trash2 size={18} />
                            </button>
                          </>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWhatsAppOrder(product);
                          }}
                          className="w-11 h-11 rounded-xl flex items-center justify-center transition-all shadow-sm bg-emerald-500/10 text-emerald-600 hover:bg-emerald-600 hover:text-white border border-emerald-500/20 active:scale-95"
                          title="Instant WhatsApp Order"
                        >
                          <MessageCircle size={18} />
                        </button>
                        <button
                          onClick={() => handleProductClick(prodId)}
                          className="w-11 h-11 rounded-xl flex items-center justify-center transition-all shadow-sm bg-[#111111] text-white hover:bg-[#8B0000] active:scale-95"
                          title="View Product"
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
          <div className="text-center py-40 bg-white rounded-3xl border border-[#111111]/5 p-12">
            <p className="text-[#6B6B6B] font-bold tracking-widest uppercase text-sm mb-4">No Footwear Found for "{activeCategory}".</p>
            <button
              onClick={() => {
                searchParams.delete('category');
                setSearchParams(searchParams);
              }}
              className="px-6 py-3 bg-[#111111] text-white rounded-xl text-xs font-bold uppercase tracking-wider hover:bg-[#8B0000] transition-colors"
            >
              View All Collections
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
