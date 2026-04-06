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
  MoveRight,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

// --- DUMMY DATA (Elite Themed) ---
const sliderShoes = [
  { id: 1, name: 'Air Jordan 1 Retro High', brand: 'Jordan', image: 'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?auto=format&fit=crop&w=800&q=80' },
  { id: 2, name: 'Yeezy Boost 350 V2', brand: 'Adidas', image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80' },
  { id: 3, name: 'Nike Dunk Low Panda', brand: 'Nike', image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80' },
  { id: 4, name: 'New Balance 550', brand: 'New Balance', image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80' },
  { id: 5, name: 'Forum Low 84', brand: 'Adidas', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80' },
];

const featuredProducts = [
  { id: 'p1', name: 'Nike Air Max 270', brand: 'Nike', price: 12999, originalPrice: 15999, discount: '18%', coupon: 'NIKE20', rating: 4.8, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80' },
  { id: 'p2', name: 'Adidas Ultraboost 5.0', brand: 'Adidas', price: 14999, originalPrice: 18999, discount: '21%', coupon: 'RUN25', rating: 4.9, image: 'https://images.unsplash.com/photo-1551107644-79bb0c590d1a?auto=format&fit=crop&w=500&q=80' },
  { id: 'p3', name: 'Puma RS-X Reinvent', brand: 'Puma', price: 7999, originalPrice: 9999, discount: '20%', coupon: 'PUMA15', rating: 4.5, image: 'https://images.unsplash.com/photo-1584735175315-9d5df23860e6?auto=format&fit=crop&w=500&q=80' },
  { id: 'p4', name: 'Reebok Classic Leather', brand: 'Reebok', price: 5999, originalPrice: 7499, discount: '20%', coupon: 'OLD70', rating: 4.6, image: 'https://images.unsplash.com/photo-1512374382149-4332c6c021f1?auto=format&fit=crop&w=500&q=80' },
];

const ProductCard = ({ product }) => {
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const totalPrice = product.price * qty;

  const handleAdd = () => {
    addToCart({ ...product, _id: product.id, images: [product.image] }, qty, '8'); // Default size 8
  };

  return (
    <div className="product-card group bg-white/[0.03] backdrop-blur-xl rounded-[3rem] overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-700 p-6 flex flex-col h-full shadow-2xl relative">
      <div
        className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-[#111] mb-8 cursor-pointer"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform scale-100 group-hover:scale-110 transition-transform duration-1000 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute top-5 left-5">
           <div className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest shadow-xl border border-blue-500/50">
              {product.discount} OFF
           </div>
        </div>
      </div>

      <div className="flex-grow">
        <div className="flex justify-between items-start mb-4">
           <div>
              <p className="text-[9px] font-black text-blue-500 uppercase tracking-[0.3em] mb-2">{product.brand}</p>
              <h3 className="text-xl font-black text-white truncate max-w-[180px] uppercase tracking-tighter leading-none">{product.name}</h3>
           </div>
           <div className="flex items-center gap-1.5 text-blue-400 font-black text-[10px] bg-white/5 px-3 py-1.5 rounded-xl border border-white/5">
              <Star size={12} className="fill-current" /> {product.rating}
           </div>
        </div>

        <div className="flex items-baseline gap-3 mb-8">
           <span className="text-3xl font-black text-white tracking-tighter">₹{product.price.toLocaleString()}</span>
           <span className="text-sm text-slate-600 line-through font-bold">₹{product.originalPrice.toLocaleString()}</span>
        </div>

        <div className="space-y-4">
           <div className="flex items-center justify-between bg-white/5 p-2 rounded-[1.5rem] border border-white/5 backdrop-blur-md">
              <div className="flex items-center">
                 <button
                   onClick={() => setQty(Math.max(1, qty - 1))}
                   className="w-10 h-10 flex items-center justify-center hover:bg-white/10 text-white transition-all rounded-xl"
                 >
                   <Minus size={16} />
                 </button>
                 <span className="font-black text-white min-w-[30px] text-center text-lg">{qty}</span>
                 <button
                   onClick={() => setQty(qty + 1)}
                   className="w-10 h-10 flex items-center justify-center hover:bg-white/10 text-white transition-all rounded-xl"
                 >
                   <Plus size={16} />
                 </button>
              </div>
              <div className="pr-4 text-right">
                 <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Valuation</p>
                 <p className="text-sm font-black text-blue-500 leading-none">₹{totalPrice.toLocaleString()}</p>
              </div>
           </div>

           <button
             onClick={handleAdd}
             className="w-full bg-white text-black py-5 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.3em] hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-3 shadow-2xl group/btn overflow-hidden relative"
           >
             <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></div>
             <ShoppingCart size={18} /> Acquire Pair
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderShoes.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % sliderShoes.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + sliderShoes.length) % sliderShoes.length);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.home-reveal', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen pb-32 overflow-hidden" ref={containerRef}>
      {/* Hero Section with Slider */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
           <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full animate-pulse"></div>
           <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-600/5 blur-[180px] rounded-full"></div>
        </div>

        <div className="absolute inset-0 transition-all duration-1000 ease-in-out">
          {sliderShoes.map((shoe, index) => (
            <div
              key={shoe.id}
              className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 transform ${index === currentSlide ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-110 z-0'}`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/40 via-transparent to-[#050505] z-10"></div>
              <img
                src={shoe.image}
                alt={shoe.name}
                className="w-full h-full object-cover opacity-60"
              />
              <div className="container mx-auto px-6 relative z-20 h-full flex items-center">
                 <div className="max-w-4xl space-y-10 home-reveal">
                    <div className="inline-flex items-center gap-4 px-6 py-2 rounded-full bg-blue-600/20 border border-blue-500/30 text-blue-400 text-[10px] font-black uppercase tracking-[0.5em] shadow-2xl backdrop-blur-md">
                       <Sparkles size={14} className="animate-spin-slow" /> Elite Artifact {shoe.id}
                    </div>
                    <h2 className="text-4xl sm:text-7xl md:text-[10rem] font-black text-white leading-[0.85] tracking-tighter uppercase mix-blend-difference">
                       {shoe.brand} <br />
                       <span className="text-blue-600">{shoe.name.split(' ')[0]}</span>
                    </h2>
                    <p className="text-slate-400 text-base sm:text-xl font-medium italic max-w-xl border-l-2 border-blue-600 pl-4 sm:pl-8">
                       "Precision engineered for the urban elite. Redefining the boundaries of artisanal footwear."
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 pt-6">
                       <button
                         onClick={() => navigate('/products')}
                         className="w-full sm:w-auto bg-white text-black px-8 sm:px-12 py-5 sm:py-6 rounded-[1.5rem] sm:rounded-[2rem] text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] hover:bg-blue-600 hover:text-white transition-all shadow-2xl flex items-center justify-center gap-4 sm:gap-6 group"
                       >
                         Enter The Vault <ArrowRight size={18} className="group-hover:translate-x-3 transition-transform" />
                       </button>
                       <button
                         onClick={() => navigate('/identity')}
                         className="w-full sm:w-auto bg-white/5 backdrop-blur-md border border-white/10 text-white px-8 sm:px-12 py-5 sm:py-6 rounded-[1.5rem] sm:rounded-[2rem] text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] hover:bg-white/10 transition-all flex items-center justify-center gap-4 sm:gap-6"
                       >
                         Sync Identity <ShieldCheck size={18} />
                       </button>
                    </div>
                 </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows (Minimalist) */}
        <div className="absolute bottom-12 right-6 sm:right-12 z-30 flex gap-4 sm:gap-6">
           <button
             onClick={prevSlide}
             className="w-12 h-12 sm:w-16 sm:h-16 bg-white/5 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center transition-all border border-white/10 backdrop-blur-xl"
           >
             <ChevronLeft size={24} />
           </button>
           <button
             onClick={nextSlide}
             className="w-12 h-12 sm:w-16 sm:h-16 bg-white/5 hover:bg-white text-white hover:text-black rounded-full flex items-center justify-center transition-all border border-white/10 backdrop-blur-xl"
           >
             <ChevronRight size={24} />
           </button>
        </div>

        {/* Pagination Indicators */}
        <div className="absolute bottom-12 left-12 z-30 flex flex-col gap-6">
           {sliderShoes.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`w-1 transition-all duration-700 ${i === currentSlide ? 'h-16 bg-blue-600' : 'h-8 bg-white/20 hover:bg-white/40'}`}
              />
           ))}
        </div>
      </section>

      {/* Featured Drops Section */}
      <section className="container mx-auto px-6 pt-32 sm:pt-48 relative">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-16 sm:mb-24 home-reveal">
           <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-4">
                 <div className="w-12 sm:w-16 h-1 bg-blue-600 rounded-full"></div>
                 <span className="text-[9px] sm:text-[11px] font-black uppercase tracking-[0.4em] sm:tracking-[0.6em] text-blue-500">The Collection</span>
              </div>
              <h2 className="text-4xl sm:text-6xl md:text-8xl font-black text-white tracking-tighter uppercase leading-none">Curated Drops.</h2>
           </div>
           <Link
             to="/products"
             className="text-slate-500 hover:text-white font-black uppercase text-[9px] sm:text-[10px] tracking-[0.4em] flex items-center gap-4 transition-all pb-2 sm:pb-4 border-b border-white/10 group"
           >
             View Entire Vault <MoveRight size={18} sm:size={20} className="group-hover:translate-x-3 transition-transform" />
           </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 home-reveal">
           {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
           ))}
        </div>
      </section>

      {/* Identity Banner */}
      <section className="container mx-auto px-6 pt-32 sm:pt-48 home-reveal">
         <div className="relative bg-white/[0.03] backdrop-blur-3xl rounded-[2.5rem] sm:rounded-[4rem] border border-white/10 p-10 sm:p-16 md:p-32 overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] bg-blue-600/5 blur-[100px] sm:blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2"></div>

            <div className="max-w-4xl relative z-10 space-y-8 sm:space-y-10">
               <ShieldCheck size={60} sm:size={80} className="text-blue-600 mb-4 sm:mb-6" />
               <h2 className="text-3xl sm:text-5xl md:text-7xl font-black text-white tracking-tighter uppercase leading-none">Access Restricted to Verified Members.</h2>
               <p className="text-slate-400 text-lg sm:text-xl font-medium italic leading-relaxed max-w-2xl">
                 "Our most exclusive artifacts require Identity Sync. Prove your status and unlock the high-tier catalog today."
               </p>
               <button
                 onClick={() => navigate('/identity')}
                 className="w-full sm:w-auto bg-white text-black px-10 sm:px-12 py-5 sm:py-7 rounded-[1.5rem] sm:rounded-[2.5rem] text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] hover:bg-blue-600 hover:text-white transition-all shadow-2xl flex items-center justify-center gap-4 sm:gap-6 group"
               >
                 Sync Identity Now <ChevronRight size={20} sm:size={24} className="group-hover:translate-x-3 transition-transform" />
               </button>
            </div>
         </div>
      </section>

      {/* Trust Pillars */}
      <section className="container mx-auto px-6 pt-48">
         <div className="grid md:grid-cols-3 gap-16 home-reveal">
            {[
              { icon: <Truck size={36} />, title: "Elite Logistics", desc: "Insured, double-boxed priority dispatch within 24 hours of clearance." },
              { icon: <Zap size={36} />, title: "Authenticity Vowed", desc: "Every artifact undergoes a 24-point professional verification process." },
              { icon: <MessageCircle size={36} />, title: "Elite Concierge", desc: "Direct 24/7 WhatsApp access to our master curators and technicians." }
            ].map((pillar, i) => (
              <div key={i} className="space-y-8 p-12 bg-white/[0.02] border border-white/5 rounded-[3.5rem] hover:bg-white/[0.05] hover:border-white/10 transition-all group">
                 <div className="w-20 h-20 bg-blue-600/10 text-blue-500 rounded-3xl flex items-center justify-center border border-blue-500/20 shadow-lg group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                    {pillar.icon}
                 </div>
                 <h4 className="text-2xl font-black uppercase tracking-tight text-white">{pillar.title}</h4>
                 <p className="text-slate-500 font-medium leading-relaxed italic">{pillar.desc}</p>
              </div>
            ))}
         </div>
      </section>

      {/* Footer-like CTA */}
      <section className="container mx-auto px-6 pt-32 sm:pt-64 pb-20 text-center home-reveal">
         <h3 className="text-7xl sm:text-[10rem] md:text-[20rem] font-black text-white/5 uppercase leading-none tracking-tighter mb-8 sm:mb-12 select-none">GRAILS</h3>
         <p className="text-slate-600 font-black uppercase tracking-[0.5em] sm:tracking-[1em] text-[8px] sm:text-xs">New Samadhan Shoe Mart © 2026 Vision</p>
      </section>
    </div>
  );
};

export default HomePage;
