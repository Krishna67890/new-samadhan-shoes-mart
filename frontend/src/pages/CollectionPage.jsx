import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { gsap } from 'gsap';
import { Star, ShoppingBag, MessageCircle, ArrowRight, Sparkles, Heart, Maximize2, Filter, X } from 'lucide-react';
import { resolveImageUrl } from '../utils/urlConfig';
import { getMergedProducts } from '../utils/productUtils';

const CollectionPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(() => getMergedProducts());
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const activeCategory = searchParams.get('category') || 'All';
  const activeSort = searchParams.get('sort') || 'featured';
  const activeType = searchParams.get('type');
  const activeCollection = searchParams.get('collection');

  const categories = ['All', 'Men', 'Women', 'Sneakers', 'Formal', 'Kids', 'Sandals', 'Slippers'];

  useEffect(() => {
    let result = getMergedProducts();

    // Filter by category
    if (activeCategory !== 'All') {
      const term = activeCategory.toLowerCase();
      result = result.filter(p =>
        (p.category || '').toLowerCase() === term ||
        (p.name || '').toLowerCase().includes(term) ||
        (p.description || '').toLowerCase().includes(term) ||
        (p.collection || '').toLowerCase().includes(term) ||
        (p.purpose || []).some(prp => prp.toLowerCase().includes(term)) ||
        (p.professions || []).some(prof => prof.toLowerCase().includes(term))
      );
    }

    // Filter by Type (Sub-category from mega menu)
    if (activeType) {
      const term = activeType.toLowerCase();
      result = result.filter(p =>
        (p.name || '').toLowerCase().includes(term) ||
        (p.description || '').toLowerCase().includes(term) ||
        (p.purpose || []).some(prp => prp.toLowerCase().includes(term)) ||
        (p.category || '').toLowerCase().includes(term)
      );
    }

    // Filter by Collection
    if (activeCollection) {
      const term = activeCollection.toLowerCase();
      result = result.filter(p =>
        (p.collection || '').toLowerCase().includes(term) ||
        (p.name || '').toLowerCase().includes(term)
      );
    }

    // Sort
    if (activeSort === 'price-low') {
      result.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (activeSort === 'price-high') {
      result.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (activeSort === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    setFilteredProducts(result);

    // Animation
    gsap.fromTo('.product-card',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'power3.out' }
    );

    const handleUpdate = () => {
      let fresh = getMergedProducts();
      setFilteredProducts(fresh);
    };
    window.addEventListener('products_updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('products_updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, [activeCategory, activeSort, activeType, activeCollection]);

  const toggleCategory = (cat) => {
    const params = new URLSearchParams(searchParams);
    if (cat === 'All') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    params.delete('type'); // Clear sub-type when main category changes
    params.delete('collection');
    setSearchParams(params);
  };

  const handleWhatsAppOrder = (product) => {
    const message = `Hello New Samadhan Shoe Mart! I'm interested in: ${product.name} (Price: ₹${product.price})`;
    const encodedMsg = encodeURIComponent(message);
    window.open(`https://wa.me/919423228843?text=${encodedMsg}`, '_blank');
  };

  return (
    <div className="bg-[#FBFBFB] min-h-screen pt-32 pb-24 font-sans selection:bg-[#d4af37] selection:text-white">
      {/* Decorative Background Elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-[10%] left-[5%] w-[30vw] h-[30vw] bg-[#d4af37]/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[40vw] h-[40vw] bg-black/[0.02] rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 relative z-10">

        {/* Header Section - More Dramatic */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12 border-b border-black/5 pb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-6 reveal-item">
              <span className="w-16 h-px bg-[#d4af37]"></span>
              <span className="text-[#d4af37] font-black uppercase tracking-[0.5em] text-[10px]">THE ARCHIVE • 2024 EDITION</span>
            </div>
            <h1 className="text-6xl md:text-[9rem] font-black uppercase tracking-tighter leading-[0.8] mb-8">
              CURATED <br /> <span className="text-[#d4af37] italic">SELECTION.</span>
            </h1>
            <p className="text-gray-400 font-bold uppercase tracking-[0.3em] text-[10px] max-w-xl">
              Exploring the intersection of traditional shoemaking and modern ergonomic performance. Every pair is a testament to our Nashik heritage.
            </p>
          </div>

          <div className="hidden lg:flex flex-col items-end text-right">
            <div className="w-32 h-32 border border-black/5 rounded-full flex items-center justify-center mb-6 animate-spin-slow">
              <Sparkles size={40} className="text-[#d4af37]" />
            </div>
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Inventory Status</span>
            <span className="text-3xl font-black italic tracking-tighter">{filteredProducts.length} ARTICLES IN VAULT</span>
          </div>
        </div>

        {/* Filter Bar - Floating Glassmorphism */}
        <div className="sticky top-24 z-40 mb-20">
          <div className="bg-white/70 backdrop-blur-2xl border border-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] p-4 flex flex-wrap items-center justify-between gap-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide px-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-black text-white shadow-xl scale-105'
                      : 'text-gray-400 hover:text-black hover:bg-black/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-6 pr-4">
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Search:</span>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="E.G. POLICE, MEDICAL..."
                    className="bg-black/5 border-none rounded-xl px-6 py-3 text-[9px] font-black uppercase tracking-widest w-48 focus:ring-2 focus:ring-[#d4af37] outline-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        toggleCategory(e.target.value);
                      }
                    }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Sort:</span>
                <select
                  value={activeSort}
                  onChange={(e) => {
                    const params = new URLSearchParams(searchParams);
                    params.set('sort', e.target.value);
                    setSearchParams(params);
                  }}
                  className="bg-transparent text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer border-b border-black/10 pb-1"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center hover:bg-[#d4af37] transition-all shadow-lg"
              >
                <Filter size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Product Grid - More Space & Drama */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-20">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card group relative flex flex-col">
                <div
                  className="relative aspect-[3/4] bg-white rounded-[3.5rem] overflow-hidden mb-8 cursor-pointer shadow-[0_20px_40px_rgba(0,0,0,0.03)] border border-black/[0.03] group-hover:shadow-[0_60px_100px_rgba(0,0,0,0.1)] transition-all duration-700 group-hover:-translate-y-4"
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  {/* Quick Action Dock */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/90 backdrop-blur-xl px-6 py-3 rounded-full translate-y-20 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <button className="text-white hover:text-[#d4af37] transition-colors"><Heart size={16} /></button>
                    <div className="w-px h-4 bg-white/20 mx-2"></div>
                    <button className="text-white hover:text-[#d4af37] transition-colors"><Maximize2 size={16} /></button>
                    <div className="w-px h-4 bg-white/20 mx-2"></div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleWhatsAppOrder(product);
                      }}
                      className="text-white hover:text-[#25D366] transition-colors"
                    >
                      <MessageCircle size={16} />
                    </button>
                  </div>

                  {/* Corner Badge */}
                  {product.rating >= 4.9 && (
                    <div className="absolute top-8 left-8 z-20">
                       <span className="flex items-center gap-2 bg-[#d4af37] text-white px-4 py-2 rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg">
                          <Sparkles size={10} /> ELITE
                       </span>
                    </div>
                  )}

                  <img
                    src={resolveImageUrl(product.images ? product.images[0] : product.image)}
                    alt={product.name}
                    className="w-full h-full object-contain p-12 group-hover:scale-110 transition-transform duration-1000 rotate-[-8deg] group-hover:rotate-0"
                    onError={(e) => { e.target.src = resolveImageUrl('/New-Samadhan-Shoe-Mart/Shoes.png'); }}
                  />
                </div>

                <div className="px-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-[9px] font-black text-[#d4af37] uppercase tracking-[0.4em] mb-2 block">{product.category}</span>
                      <h3 className="text-2xl font-black uppercase tracking-tighter leading-none group-hover:text-[#d4af37] transition-colors">
                        {product.name}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-black/5 rounded-full">
                      <Star size={10} className="text-[#d4af37] fill-[#d4af37]" />
                      <span className="text-[10px] font-black">{product.rating || 4.9}</span>
                    </div>
                  </div>

                  <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8 line-clamp-2 leading-relaxed italic">
                    {product.description || "Handcrafted with precision for unmatched elegance."}
                  </p>

                  <div className="flex justify-between items-center border-t border-black/5 pt-6">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Price</span>
                      <span className="text-3xl font-black tracking-tighter italic">₹{product.price?.toLocaleString()}</span>
                    </div>
                    <button
                      onClick={() => navigate(`/product/${product.id}`)}
                      className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center group-hover:bg-[#d4af37] transition-all shadow-lg group-hover:scale-110 active:scale-95"
                    >
                      <ShoppingBag size={22} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-40 bg-[#F7F5F0] rounded-[4rem] border-2 border-dashed border-black/5">
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">No Match Found.</h3>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mb-8">Try adjusting your filters to find your perfect fit.</p>
            <button
              onClick={() => toggleCategory('All')}
              className="px-12 py-5 bg-black text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-[#d4af37] transition-all"
            >
              RESET ALL FILTERS
            </button>
          </div>
        )}

      </div>

      {/* Advanced Filter Drawer (Simplified for UX) */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-[100] flex justify-end">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)} />
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl p-12 overflow-y-auto">
            <button onClick={() => setIsFilterOpen(false)} className="absolute top-12 right-12 hover:rotate-90 transition-transform">
              <X size={32} />
            </button>

            <h2 className="text-4xl font-black uppercase tracking-tighter mb-16">ADVANCED <br /> <span className="text-[#d4af37]">FILTERS.</span></h2>

            <div className="space-y-12">
              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 text-[#d4af37]">Price Range</h4>
                <div className="grid grid-cols-2 gap-4">
                  <button className="px-6 py-4 border border-black/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">Under ₹2,000</button>
                  <button className="px-6 py-4 border border-black/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">₹2,000 - ₹5,000</button>
                  <button className="px-6 py-4 border border-black/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">₹5,000 - ₹10,000</button>
                  <button className="px-6 py-4 border border-black/10 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">Over ₹10,000</button>
                </div>
              </div>

              <div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] mb-6 text-[#d4af37]">Materials</h4>
                <div className="flex flex-wrap gap-3">
                  {['Leather', 'Suede', 'Mesh', 'Canvas', 'Knit'].map(mat => (
                    <button key={mat} className="px-6 py-3 bg-[#F7F5F0] rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all">{mat}</button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsFilterOpen(false)}
              className="w-full py-6 bg-black text-white rounded-[2rem] font-black uppercase tracking-widest text-[10px] mt-24 hover:bg-[#d4af37] transition-all"
            >
              APPLY SETTINGS
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollectionPage;
