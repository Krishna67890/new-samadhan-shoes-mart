import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import {
  Sparkles,
  Truck,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  ShoppingCart,
  Tag,
  Star,
  Zap,
  MoveRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

// --- DUMMY DATA ---
const sliderShoes = [
  { id: 1, name: 'Air Jordan 1 Retro High', brand: 'Jordan', image: 'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?auto=format&fit=crop&w=800&q=80', color: 'bg-rose-500' },
  { id: 2, name: 'Yeezy Boost 350 V2', brand: 'Adidas', image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80', color: 'bg-slate-500' },
  { id: 3, name: 'Nike Dunk Low Panda', brand: 'Nike', image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80', color: 'bg-black' },
  { id: 4, name: 'New Balance 550', brand: 'New Balance', image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80', color: 'bg-blue-600' },
  { id: 5, name: 'Forum Low 84', brand: 'Adidas', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80', color: 'bg-emerald-600' },
];

const productsData = [
  { id: 'p1', name: 'Nike Air Max 270', brand: 'Nike', price: 12999, originalPrice: 15999, discount: '18%', coupon: 'NIKE20', rating: 4.8, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80' },
  { id: 'p2', name: 'Adidas Ultraboost 5.0', brand: 'Adidas', price: 14999, originalPrice: 18999, discount: '21%', coupon: 'RUN25', rating: 4.9, image: 'https://images.unsplash.com/photo-1551107644-79bb0c590d1a?auto=format&fit=crop&w=500&q=80' },
  { id: 'p3', name: 'Puma RS-X Reinvent', brand: 'Puma', price: 7999, originalPrice: 9999, discount: '20%', coupon: 'PUMA15', rating: 4.5, image: 'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?auto=format&fit=crop&w=500&q=80' },
  { id: 'p4', name: 'Reebok Classic Leather', brand: 'Reebok', price: 5999, originalPrice: 7499, discount: '20%', coupon: 'OLD70', rating: 4.6, image: 'https://images.unsplash.com/photo-1512374382149-4332c6c021f1?auto=format&fit=crop&w=500&q=80' },
  { id: 'p5', name: 'Vans Old Skool', brand: 'Vans', price: 4499, originalPrice: 5499, discount: '18%', coupon: 'VANS10', rating: 4.7, image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=500&q=80' },
  { id: 'p6', name: 'Converse Chuck 70', brand: 'Converse', price: 5499, originalPrice: 6499, discount: '15%', coupon: 'ALLSTAR', rating: 4.8, image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=500&q=80' },
  { id: 'p7', name: 'Asics Gel-Lyte III', brand: 'Asics', price: 9999, originalPrice: 11999, discount: '16%', coupon: 'GELRUN', rating: 4.6, image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&w=500&q=80' },
  { id: 'p8', name: 'Under Armour HOVR', brand: 'Under Armour', price: 11499, originalPrice: 13999, discount: '17%', coupon: 'HOVR20', rating: 4.5, image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&w=500&q=80' },
];

const ProductCard = ({ product }) => {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const totalPrice = product.price * qty;

  const handleAdd = () => {
    addToCart({ ...product, _id: product.id, images: [product.image] }, qty, '8'); // Default size 8
    alert(`Added ${qty} x ${product.name} to cart!`);
  };

  return (
    <div className="product-card group bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700 p-4 flex flex-col h-full">
      <div className="relative aspect-square rounded-[2rem] overflow-hidden bg-slate-50 mb-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000"
        />
        {/* Discount Badge with Glowing Highlight */}
        <div className="absolute top-4 left-4">
           <div className="relative">
              <div className="absolute inset-0 bg-blue-600 opacity-20 animate-pulse rounded-full"></div>
              <div className="relative bg-blue-600 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">
                 {product.discount} OFF
              </div>
           </div>
        </div>
        {/* Coupon Badge */}
        <div className="absolute top-4 right-4">
           <div className="bg-slate-950 text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-white/20 flex items-center gap-1.5 shadow-xl">
              <Tag size={10} className="text-blue-400" /> {product.coupon}
           </div>
        </div>
      </div>

      <div className="px-2 flex-grow">
        <div className="flex justify-between items-start mb-2">
           <div>
              <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">{product.brand}</p>
              <h3 className="text-lg font-black text-slate-950 truncate max-w-[150px] uppercase tracking-tight">{product.name}</h3>
           </div>
           <div className="flex items-center gap-1 text-amber-500 font-bold text-xs bg-amber-50 px-2 py-1 rounded-lg">
              <Star size={12} className="fill-current" /> {product.rating}
           </div>
        </div>

        <div className="flex items-baseline gap-2 mb-6">
           <span className="text-2xl font-black text-slate-950 tracking-tighter">₹{product.price.toLocaleString()}</span>
           <span className="text-sm text-slate-400 line-through font-bold">₹{product.originalPrice.toLocaleString()}</span>
        </div>

        <div className="space-y-4">
           {/* Quantity Controls */}
           <div className="flex items-center justify-between bg-slate-50 p-2 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-3">
                 <button
                   onClick={() => setQty(Math.max(1, qty - 1))}
                   className="w-8 h-8 flex items-center justify-center bg-white rounded-xl shadow-sm hover:bg-blue-600 hover:text-white transition-all text-slate-600"
                 >
                   <Minus size={14} />
                 </button>
                 <span className="font-black text-slate-950 min-w-[20px] text-center">{qty}</span>
                 <button
                   onClick={() => setQty(qty + 1)}
                   className="w-8 h-8 flex items-center justify-center bg-white rounded-xl shadow-sm hover:bg-blue-600 hover:text-white transition-all text-slate-600"
                 >
                   <Plus size={14} />
                 </button>
              </div>
              <div className="text-right">
                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Total</p>
                 <p className="text-sm font-black text-blue-600 leading-none">₹{totalPrice.toLocaleString()}</p>
              </div>
           </div>

           <button
             onClick={handleAdd}
             className="w-full bg-slate-950 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-blue-600 transition-all flex items-center justify-center gap-3 shadow-xl shadow-slate-200"
           >
             <ShoppingCart size={16} /> Add To Cart
           </button>
        </div>
      </div>
    </div>
  );
};

const HomePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // --- AUTO SLIDER ---
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderShoes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % sliderShoes.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + sliderShoes.length) % sliderShoes.length);

  // --- ANIMATIONS ---
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.home-reveal', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen pb-24" ref={containerRef}>
      {/* FORCE NO BLUR */}
      <style dangerouslySetInnerHTML={{ __html: `* { filter: none !important; backdrop-filter: none !important; }` }} />

      {/* --- TOP POPULAR SLIDER --- */}
      <section className="relative h-[70vh] w-full overflow-hidden bg-slate-950">
        <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
          {sliderShoes.map((shoe, index) => (
            <div
              key={shoe.id}
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
            >
              <div className="absolute inset-0 bg-slate-950/40 z-10 pointer-events-none"></div>
              <img
                src={shoe.image}
                alt={shoe.name}
                className="w-full h-full object-cover transform scale-105"
              />
              <div className="container mx-auto px-6 relative z-20 h-full flex items-center">
                 <div className="max-w-2xl space-y-6">
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.4em] shadow-2xl">
                       <Sparkles size={12} /> Popular This Week
                    </div>
                    <h2 className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter uppercase">
                       {shoe.brand} <br />
                       <span className="text-blue-500">{shoe.name.split(' ').slice(0, 2).join(' ')}</span>
                    </h2>
                    <p className="text-slate-300 text-lg font-medium italic">Experience the next generation of performance and style.</p>
                    <button
                      onClick={() => navigate('/products')}
                      className="bg-white text-slate-950 px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 hover:text-white transition-all shadow-2xl flex items-center gap-4 group"
                    >
                      Shop Collection <MoveRight className="group-hover:translate-x-2 transition-transform" />
                    </button>
                 </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-16 h-16 bg-white/10 hover:bg-white text-white hover:text-slate-950 rounded-full flex items-center justify-center transition-all border border-white/20"
        >
          <ChevronLeft size={32} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-16 h-16 bg-white/10 hover:bg-white text-white hover:text-slate-950 rounded-full flex items-center justify-center transition-all border border-white/20"
        >
          <ChevronRight size={32} />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-4">
           {sliderShoes.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${i === currentSlide ? 'bg-blue-600 w-10' : 'bg-white/30'}`}
              />
           ))}
        </div>
      </section>

      {/* --- PRODUCT GRID SECTION --- */}
      <section className="container mx-auto px-6 pt-24">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16 home-reveal">
           <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="w-12 h-1 bg-blue-600 rounded-full"></div>
                 <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-600">The Collection</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-slate-950 tracking-tighter uppercase leading-none">Curated Drops.</h2>
           </div>
           <Link
             to="/products"
             className="text-slate-400 hover:text-blue-600 font-black uppercase text-[10px] tracking-widest flex items-center gap-3 transition-colors pb-2"
           >
             View Entire Catalog <ChevronRight size={16} />
           </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 home-reveal">
           {productsData.map((product) => (
              <ProductCard key={product.id} product={product} />
           ))}
        </div>
      </section>

      {/* --- SERVICES / TRUST --- */}
      <section className="container mx-auto px-6 pt-40 pb-20">
         <div className="grid md:grid-cols-3 gap-12 bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm home-reveal">
            <div className="space-y-4">
               <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                  <Truck size={28} />
               </div>
               <h4 className="text-lg font-black uppercase tracking-tight text-slate-950">Insured Shipping</h4>
               <p className="text-sm text-slate-500 font-medium leading-relaxed">Every pair is shipped in double-boxed, insured packaging within 24 hours.</p>
            </div>
            <div className="space-y-4">
               <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                  <Zap size={28} />
               </div>
               <h4 className="text-lg font-black uppercase tracking-tight text-slate-950">Authentic Seal</h4>
               <p className="text-sm text-slate-500 font-medium leading-relaxed">100% authenticity guaranteed. Every product undergoes strict quality checks.</p>
            </div>
            <div className="space-y-4">
               <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                  <MessageCircle size={28} />
               </div>
               <h4 className="text-lg font-black uppercase tracking-tight text-slate-950">Expert Concierge</h4>
               <p className="text-sm text-slate-500 font-medium leading-relaxed">Need help with sizing or finding a grail? Our curators are active on WhatsApp 24/7.</p>
            </div>
         </div>
      </section>
    </div>
  );
};

export default HomePage;
