import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ShoppingBag,
  Heart,
  Search,
  Star,
  ShieldCheck,
  Truck,
  RefreshCw,
  Facebook,
  Instagram,
  Twitter,
  ChevronRight,
  Maximize2,
  X
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import localProducts from '../utils/localProducts';
import { calculateProductStats, getReviews } from '../utils/reviewService';

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const heroShoeRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('Men');
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const isCardFlippedRef = useRef(false);

  useEffect(() => {
    isCardFlippedRef.current = isCardFlipped;
  }, [isCardFlipped]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [globalStats, setGlobalStats] = useState({ avg: 4.8, total: 1420 });
  const [recentReviews, setRecentReviews] = useState([
    { name: "Rahul P.", review: "Very comfortable and the fitting is excellent. Looks even better in person. The sole grip is perfect for daily wear.", date: "Oct 24, 2023", rating: 5, avatar: "RP" },
    { name: "Sneha M.", review: "Good quality and stylish design. Delivery was also smooth. Highly recommended for college students.", date: "Sep 12, 2023", rating: 4, avatar: "SM" },
    { name: "Amit S.", review: "The formal collection at New Samadhan is unbeatable. Perfect fit and premium leather quality.", date: "Aug 05, 2023", rating: 5, avatar: "AS" }
  ]);

  // Select unique products for a more diverse showcase
  const featuredProducts = [
    localProducts.find(p => p.id === 's2'), // Street Master Low-Top
    localProducts.find(p => p.id === 'm2'), // Elite Black Leather Formal
    localProducts.find(p => p.id === 'w3'), // Office Wear Ladies Formal
    localProducts.find(p => p.id === 'k2')  // Little Steps Black Shoes
  ].filter(Boolean);

  useEffect(() => {
    // Load real stats if they exist
    const allReviews = getReviews();
    if (allReviews.length > 0) {
      const sum = allReviews.reduce((acc, r) => acc + r.rating, 0);
      setGlobalStats({
        avg: (sum / allReviews.length).toFixed(1),
        total: 1420 + allReviews.length
      });

      // Merge real recent reviews with defaults
      const realRecent = allReviews.slice(-3).reverse().map(r => ({
        name: r.name,
        review: r.review,
        date: new Date(r.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        rating: r.rating,
        avatar: r.avatar
      }));
      if (realRecent.length > 0) {
        setRecentReviews(prev => [...realRecent, ...prev].slice(0, 3));
      }
    }
    const ctx = gsap.context(() => {
      // Hero Animation Timeline
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "+=1500",
          pin: true,
          scrub: 1,
        }
      });

      heroTl
        .to(heroShoeRef.current, {
          scale: 1.8,
          rotation: 25,
          y: 80,
          duration: 2,
          ease: "power2.inOut"
        })
        .to(".hero-text", {
          y: -150,
          scale: 0.8,
          opacity: 0,
          duration: 1.5
        }, "<")
        .to(".luxury-bg", {
          y: -400,
          scale: 2,
          opacity: 0.25,
          letterSpacing: "15vw",
          duration: 2.5,
          ease: "expo.inOut"
        }, "<")
        .from(".category-labels span", {
          opacity: 0,
          y: 50,
          scale: 0.5,
          stagger: {
            amount: 0.5,
            from: "random"
          },
          duration: 1
        });

      // Split Text Effect (Simulated with section-reveal enhancement)
      gsap.utils.toArray(".section-reveal h2").forEach(text => {
        gsap.from(text, {
          scrollTrigger: {
            trigger: text,
            start: "top 90%",
          },
          letterSpacing: "-0.5em",
          opacity: 0,
          duration: 1.5,
          ease: "expo.out"
        });
      });

      // Category Card Floating Animation
      gsap.utils.toArray(".category-card").forEach((card, i) => {
        gsap.to(card, {
          y: -20,
          duration: 2 + i * 0.5,
          repeat: -1,
          yoyo: true,
          ease: "power1.inOut"
        });
      });

      // Immersive Section 3D Shoe Rotation
      gsap.to(".immersive-shoe", {
        scrollTrigger: {
          trigger: ".immersive-section",
          start: "top bottom",
          end: "bottom top",
          scrub: 2
        },
        rotation: 360,
        x: 100,
        scale: 1.5,
        ease: "none"
      });

      // Visiting Card 3D Tilt & Flip Control
      const card = document.querySelector('.visiting-card-container');
      const cardInner = document.querySelector('.visiting-card-inner');

      if (card && cardInner) {
        const handleMove = (x, y) => {
          if (isCardFlippedRef.current) return;

          const rect = card.getBoundingClientRect();
          const xc = rect.width / 2;
          const yc = rect.height / 2;
          const dx = x - rect.left - xc;
          const dy = y - rect.top - yc;

          gsap.to(cardInner, {
            rotationY: dx / 15,
            rotationX: -dy / 15,
            duration: 0.5,
            ease: "power2.out"
          });
        };

        const handleReset = () => {
          gsap.to(cardInner, {
            rotationY: isCardFlippedRef.current ? 180 : 0,
            rotationX: 0,
            duration: 0.8,
            ease: "power2.out"
          });
        };

        card.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY));
        card.addEventListener('mouseleave', handleReset);
      }

      // Luxury Text Entrance
      gsap.from(".luxury-text-reveal span", {
        scrollTrigger: {
          trigger: ".luxury-text-reveal",
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        rotateX: -90,
        stagger: 0.05,
        duration: 1.2,
        ease: "expo.out"
      });

      // Magnetic Buttons Effect
      const magneticBtns = document.querySelectorAll('.magnetic-btn');
      magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
          const rect = btn.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(btn, {
            x: x * 0.3,
            y: y * 0.3,
            duration: 0.3,
            ease: "power2.out"
          });
        });
        btn.addEventListener('mouseleave', () => {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.3)"
          });
        });
      });

      // Section Header Reveals
      gsap.utils.toArray(".section-reveal").forEach(el => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
          },
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power4.out"
        });
      });

      // Category Section Stagger
      gsap.from(".category-card", {
        scrollTrigger: {
          trigger: ".category-section",
          start: "top 80%",
        },
        y: 100,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out"
      });

      // Product Cards Parallax & Scale
      gsap.utils.toArray(".product-card").forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
          },
          x: i % 2 === 0 ? -100 : 100,
          opacity: 0,
          scale: 0.9,
          duration: 1.5,
          ease: "expo.out"
        });
      });

      // Immersive View Parallax
      gsap.to(".immersive-bg", {
        scrollTrigger: {
          trigger: ".immersive-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        },
        y: 250,
        ease: "none"
      });

      // Final Conversion Stagger
      gsap.from(".final-cat-btn", {
        scrollTrigger: {
          trigger: ".final-conversion-section",
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.7)"
      });

      gsap.to(".legacy-bg", {
        scrollTrigger: {
          trigger: ".final-conversion-section",
          start: "top bottom",
          end: "bottom top",
          scrub: true
        },
        y: -150,
        scale: 1.1,
        ease: "none"
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-white text-[#1a1a1a] font-sans selection:bg-[#d4af37] selection:text-white overflow-x-hidden pt-24">
      {/* Redundant Pre-Header and Nav removed as they are global in App.jsx */}

      {/* PHASE 1: HERO */}
      <section className="hero-section relative h-screen flex items-center justify-center overflow-hidden px-8">
        <div className="luxury-bg absolute inset-0 z-0 opacity-5 pointer-events-none flex items-center justify-center text-[25vw] font-black text-gray-400 select-none">
          LUXURY
        </div>

        <div className="relative z-10 text-center hero-text">
          <h1 className="text-[clamp(3rem,10vw,8rem)] font-black uppercase leading-[0.9] tracking-tighter mb-6">
            STEP INTO <br /> <span className="text-[#d4af37] italic">YOUR STYLE.</span>
          </h1>
          <p className="text-xl text-gray-500 font-medium mb-12 max-w-xl mx-auto">
            Premium footwear engineered for every occasion. Experience the legacy of comfort and elegance.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button
              onClick={() => navigate('/products')}
              className="magnetic-btn bg-[#1a1a1a] text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-[#d4af37] transition-all shadow-xl flex items-center justify-center gap-4"
            >
              SHOP COLLECTION <ArrowRight size={18} />
            </button>
            <button
              onClick={() => navigate('/products')}
              className="magnetic-btn border-2 border-[#1a1a1a] px-12 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-[#1a1a1a] hover:text-white transition-all"
            >
              EXPLORE SHOES
            </button>
          </div>
        </div>

        {/* HERO SHOE */}
        <div ref={heroShoeRef} className="absolute z-20 pointer-events-none drop-shadow-[0_50px_80px_rgba(0,0,0,0.15)]">
          <img
            src="/New-Samadhan-Shoe-Mart/Main-Shoe.png"
            alt="Hero Shoe"
            className="w-[50vw] max-w-[700px] h-auto object-contain"
          />
        </div>

        {/* Floating Labels - Now Clickable */}
        <div className="category-labels absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
          <button
            onClick={() => navigate('/products?category=Sneakers')}
            className="absolute top-[20%] left-[20%] pointer-events-auto bg-white/95 px-6 py-2 rounded-full text-xs font-bold border border-gray-100 shadow-lg uppercase tracking-widest hover:bg-[#d4af37] hover:text-white transition-all transform hover:scale-110 active:scale-95"
          >
            Sneakers
          </button>
          <button
            onClick={() => navigate('/products?category=Formal')}
            className="absolute top-[30%] right-[25%] pointer-events-auto bg-white/95 px-6 py-2 rounded-full text-xs font-bold border border-gray-100 shadow-lg uppercase tracking-widest hover:bg-[#d4af37] hover:text-white transition-all transform hover:scale-110 active:scale-95"
          >
            Formal
          </button>
          <button
            onClick={() => navigate('/products?category=Men')}
            className="absolute bottom-[25%] left-[28%] pointer-events-auto bg-white/95 px-6 py-2 rounded-full text-xs font-bold border border-gray-100 shadow-lg uppercase tracking-widest hover:bg-[#d4af37] hover:text-white transition-all transform hover:scale-110 active:scale-95"
          >
            Premium
          </button>
        </div>
      </section>

      {/* PHASE 2: CATEGORIES */}
      <section className="category-section py-[15vh] px-8 md:px-[6vw] bg-gray-50">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 section-reveal">
          <div>
            <span className="text-[#d4af37] font-black uppercase tracking-[0.4em] text-sm block mb-4">// COLLECTIONS</span>
            <h2 className="text-6xl font-black uppercase tracking-tighter">DISCOVER BY CATEGORY</h2>
          </div>
          <div className="flex gap-4 border-b-2 border-gray-200 w-full md:w-auto">
             {['Men', 'Women', 'Sneakers', 'Formal', 'Kids'].map(cat => (
               <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`pb-4 px-6 text-sm font-bold uppercase tracking-widest transition-all ${activeCategory === cat ? 'border-b-4 border-[#d4af37] text-[#d4af37]' : 'text-gray-400 hover:text-black'}`}
               >
                 {cat}
               </button>
             ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {[
            { name: 'Men', desc: 'Smart everyday footwear', img: '/New-Samadhan-Shoe-Mart/Shoes-grey-men-1.jpg', path: '/products?category=Men' },
            { name: 'Women', desc: 'Elegant styles for every occasion', img: '/New-Samadhan-Shoe-Mart/IMG-20260928-WA0011.jpg', path: '/products?category=Women' },
            { name: 'Sneakers', desc: 'Street style meets comfort', img: '/New-Samadhan-Shoe-Mart/IMG-20260928-WA0006.jpg', path: '/products?category=Sneakers' },
            { name: 'Formal', desc: 'Sharp looks for professionals', img: '/New-Samadhan-Shoe-Mart/IMG-20260928-WA0008.jpg', path: '/products?category=Formal' },
            { name: 'Kids', desc: 'Durable steps for little ones', img: '/New-Samadhan-Shoe-Mart/IMG-20260928-WA0016.jpg', path: '/products?category=Kids' }
          ].map((item, idx) => (
            <div
              key={idx}
              onClick={() => navigate(item.path)}
              className="category-card group relative h-[500px] rounded-[3rem] overflow-hidden cursor-pointer shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
              <img src={item.img} alt={item.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute bottom-12 left-12 z-20 text-white">
                <h3 className="text-4xl font-black uppercase italic tracking-tighter mb-2">{item.name}</h3>
                <p className="text-white/60 font-medium mb-6">{item.desc}</p>
                <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center group-hover:bg-[#d4af37] group-hover:text-white transition-colors">
                  <ArrowRight size={20} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PHASE 3: PRODUCT SHOWCASE */}
      <section className="py-[15vh] px-8 md:px-[6vw]">
        <div className="text-center mb-24 luxury-text-reveal">
          <h2 className="text-7xl font-black uppercase tracking-tighter mb-8 flex flex-wrap justify-center gap-x-4">
            {"FEATURED RELEASES".split(" ").map((word, i) => (
              <span key={i} className="inline-block">{word}</span>
            ))}
          </h2>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto section-reveal">Explore our most popular styles, crafted with precision and designed for the modern lifestyle.</p>
        </div>

        <div className="flex flex-col gap-[15vh]">
          {featuredProducts.map((product, i) => (
            <div key={product.id} className={`product-card flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-20`}>
              {/* Product Image Stage */}
              <div className="flex-1 relative group p-12 bg-gray-50 rounded-[4rem] overflow-hidden cursor-pointer" onClick={() => navigate(`/product/${product.id}`)}>
                 <div className="absolute top-8 right-8 z-20">
                    <button className="p-4 bg-white rounded-full shadow-lg hover:bg-[#d4af37] hover:text-white transition-all">
                       <Heart size={20} />
                    </button>
                 </div>
                 <img
                  src={product.images ? product.images[0] : product.image}
                  alt={product.name}
                  loading="lazy"
                  className="w-full h-auto drop-shadow-[0_40px_60px_rgba(0,0,0,0.1)] group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-700"
                 />
                 <div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-white/90 px-8 py-3 rounded-full text-xs font-black uppercase tracking-[0.3em] border border-gray-100">
                    {product.category}
                 </div>
              </div>

              {/* Product Info */}
              <div className="flex-1 max-w-xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex text-[#d4af37]">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < Math.floor(calculateProductStats(product.id).average || product.rating || 5) ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-gray-400">
                    {calculateProductStats(product.id).average || product.rating || 4.9} / 5.0
                    ({calculateProductStats(product.id).total + (product.reviews || 48)} Reviews)
                  </span>
                </div>

                <h3 className="text-6xl font-black uppercase tracking-tighter mb-4 cursor-pointer hover:text-[#d4af37] transition-colors" onClick={() => navigate(`/product/${product.id}`)}>{product.name}</h3>
                <span className="text-4xl font-light text-gray-400 block mb-8 italic">₹{(product.price || 0).toLocaleString()}</span>

                <p className="text-lg text-gray-500 leading-relaxed mb-10">{product.description}</p>

                <div className="mb-12">
                   <h5 className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-6">SELECT SIZE</h5>
                   <div className="flex gap-4">
                      {(product.sizes || [6, 7, 8, 9, 10]).map(size => (
                        <button key={size} className="w-14 h-14 border-2 border-gray-100 rounded-2xl flex items-center justify-center font-bold hover:border-[#d4af37] hover:text-[#d4af37] transition-all">
                          {size}
                        </button>
                      ))}
                   </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-6">
                  <button
                    onClick={() => navigate(`/product/${product.id}`)}
                    className="flex-1 bg-[#1a1a1a] text-white py-6 rounded-[2rem] font-bold uppercase tracking-widest hover:bg-[#d4af37] transition-all shadow-xl">
                    VIEW COLLECTION
                  </button>
                  <button className="flex-1 border-2 border-[#1a1a1a] py-6 rounded-[2rem] font-bold uppercase tracking-widest hover:bg-[#1a1a1a] hover:text-white transition-all">
                    WISHLIST
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PHASE 4: IMMERSIVE 3D HIGHLIGHT */}
      <section className="immersive-section relative min-h-screen bg-[#1a1a1a] text-white py-[20vh] overflow-hidden">
        <div className="immersive-bg absolute inset-0 opacity-10 pointer-events-none text-[30vw] font-black whitespace-nowrap flex items-center select-none uppercase italic">
           ELITE COLLECTION • ELITE COLLECTION •
        </div>

        <div className="relative z-10 px-8 md:px-[6vw]">
           <div className="grid lg:grid-cols-2 gap-32 items-center">
              <div>
                 <span className="text-[#d4af37] font-black tracking-[0.5em] text-sm uppercase block mb-8">EXCLUSIVE PREVIEW</span>
                 <h2 className="text-[clamp(3rem,8vw,6rem)] font-black leading-[0.9] uppercase tracking-tighter mb-12">
                   THE ART OF <br /> <span className="text-[#d4af37]">CRAFTMANSHIP.</span>
                 </h2>
                 <ul className="space-y-8 mb-16">
                    {[
                      { icon: ShieldCheck, title: "Durable Construction", text: "Built to withstand the elements of time." },
                      { icon: RefreshCw, title: "Adaptive Sole Tech", text: "Reacts to your movement for all-day comfort." },
                      { icon: Truck, title: "Genuine Materials", text: "Ethically sourced premium leather and mesh." }
                    ].map((feat, i) => (
                      <li key={i} className="flex gap-6 group">
                         <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#d4af37] transition-colors">
                            <feat.icon size={28} className="text-[#d4af37] group-hover:text-white transition-colors" />
                         </div>
                         <div>
                            <h5 className="text-xl font-bold uppercase tracking-tight">{feat.title}</h5>
                            <p className="text-white/40">{feat.text}</p>
                         </div>
                      </li>
                    ))}
                 </ul>
                 <button
                    onClick={() => navigate('/workshop')}
                    className="bg-white text-black px-12 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-[#d4af37] hover:text-white transition-all"
                 >
                    EXPLORE THE TECH
                 </button>
              </div>

              <div className="relative">
                 <div className="absolute inset-0 bg-[#d4af37]/20 rounded-full" />
                 <img
                  src="/New-Samadhan-Shoe-Mart/Main-Shoe.png"
                  alt="3D View"
                  className="immersive-shoe relative z-10 w-full h-auto drop-shadow-[0_80px_100px_rgba(0,0,0,0.5)] rotate-12 hover:rotate-0 transition-transform duration-1000 scale-125"
                 />
              </div>
           </div>
        </div>
      </section>

      {/* PHASE 5: RATINGS & REVIEWS */}
      <section className="py-[15vh] px-8 md:px-[6vw] bg-white">
         <div className="grid lg:grid-cols-3 gap-24 section-reveal">
            <div className="lg:col-span-1">
               <h2 className="text-5xl font-black uppercase tracking-tighter mb-8">VOICES OF <br /> COMFORT.</h2>
               <div className="bg-gray-50 p-12 rounded-[3rem] border border-gray-100">
                  <div className="text-8xl font-black text-[#d4af37] mb-4">{globalStats.avg}</div>
                  <div className="flex text-[#d4af37] mb-4">
                     {[...Array(5)].map((_, i) => <Star key={i} size={24} fill={i < Math.floor(globalStats.avg) ? "currentColor" : "none"} />)}
                  </div>
                  <p className="text-gray-400 font-bold uppercase tracking-widest text-sm mb-12">Based on {globalStats.total.toLocaleString()} Reviews</p>

                  <div className="space-y-4">
                     {[
                       { stars: 5, perc: '85%' },
                       { stars: 4, perc: '10%' },
                       { stars: 3, perc: '3%' },
                       { stars: 2, perc: '1%' },
                       { stars: 1, perc: '1%' }
                     ].map(r => (
                       <div key={r.stars} className="flex items-center gap-4">
                          <span className="text-xs font-bold w-4">{r.stars}</span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                             <div className="h-full bg-[#d4af37]" style={{ width: r.perc }} />
                          </div>
                          <span className="text-xs font-bold text-gray-400">{r.perc}</span>
                       </div>
                     ))}
                  </div>
                  <button
                    onClick={() => navigate('/products')}
                    className="w-full mt-12 py-5 border-2 border-black rounded-full font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all"
                  >
                    SHARE YOUR STORY
                  </button>
               </div>
            </div>

            <div className="lg:col-span-2 space-y-12">
               {recentReviews.map((rev, i) => (
                 <div key={i} className="p-12 bg-white border border-gray-100 rounded-[3rem] shadow-sm hover:shadow-xl transition-all group">
                    <div className="flex justify-between items-start mb-6">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-[#d4af37] text-white flex items-center justify-center font-black text-sm">
                             {rev.avatar}
                          </div>
                          <div>
                             <h6 className="text-xl font-bold uppercase tracking-tight italic">{rev.name}</h6>
                             <div className="flex text-[#d4af37] mt-1">
                                {[...Array(5)].map((_, idx) => <Star key={idx} size={12} fill={idx < rev.rating ? "currentColor" : "none"} />)}
                             </div>
                          </div>
                       </div>
                       <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">{rev.date}</span>
                    </div>
                    <p className="text-lg text-gray-500 italic leading-relaxed">"{rev.review}"</p>
                    <div className="mt-8 flex items-center gap-2 text-[#d4af37] text-xs font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                       <ShieldCheck size={14} /> Verified Experience
                    </div>
                 </div>
               ))}
               <button className="text-sm font-black uppercase tracking-[0.4em] flex items-center gap-4 hover:text-[#d4af37] transition-colors">
                  VIEW ALL REVIEWS <ChevronRight size={18} />
               </button>
            </div>
         </div>
      </section>

      {/* PHASE 6: FINAL CONVERSION */}
      <section className="final-conversion-section relative py-[20vh] px-8 text-center bg-gray-50 overflow-hidden">
         <div className="legacy-bg absolute inset-0 opacity-[0.03] select-none pointer-events-none text-[25vw] font-black uppercase flex items-center justify-center">
            LEGACY
         </div>

         <div className="relative z-10 max-w-5xl mx-auto">
            <h2 className="text-7xl md:text-[8rem] font-black uppercase tracking-tighter leading-[0.85] mb-12 section-reveal">
               YOUR NEXT STEP <br /> <span className="text-[#d4af37] italic">STARTS HERE.</span>
            </h2>
            <p className="text-2xl text-gray-500 font-medium mb-20 max-w-2xl mx-auto leading-relaxed section-reveal">
               Discover footwear designed for your everyday moments, special occasions and everything in between.
            </p>

            <div className="flex flex-wrap justify-center gap-6">
               {['Men', 'Women', 'Sneakers', 'Formal', 'Kids'].map(cat => (
                 <button
                   key={cat}
                   onClick={() => navigate(`/products?category=${cat}`)}
                   className="final-cat-btn px-10 py-5 bg-white border-2 border-gray-100 rounded-full font-bold uppercase tracking-widest hover:border-[#d4af37] hover:bg-[#d4af37] hover:text-white transition-all shadow-md"
                 >
                   SHOP {cat}
                 </button>
               ))}
            </div>
         </div>
      </section>

      {/* PHASE 5.5: DIGITAL VISITING CARD (3D EXPERIENCE) */}
      <section className="py-[15vh] px-8 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 section-reveal">
            <span className="text-[#d4af37] font-black tracking-[0.4em] text-sm uppercase block mb-4">// LEGACY CARD</span>
            <h2 className="text-6xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">CARRY THE <br /> HERITAGE.</h2>
            <p className="text-xl text-gray-500 mb-12 max-w-lg">
              Our digital visiting card encapsulates decades of trust. Scan the map or reach out directly to our master craftsmen.
            </p>
            <div className="flex gap-6">
              <button
                onClick={() => window.open('https://www.google.com/maps/place/New+Samadhan+Shoe+Mart+(+factory+)/@19.9993642,73.8348839,17z/data=!4m6!3m5!1s0x3bddc0286896cc9f:0x9694b51a2be99c9c!8m2!3d19.9996768!4d73.8364879!16s%2Fg%2F11hbnc5jrd?entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D', '_blank')}
                className="bg-[#1a1a1a] text-white px-10 py-5 rounded-full font-bold uppercase tracking-widest hover:bg-[#d4af37] transition-all flex items-center gap-3"
              >
                LOCATE ATELIER <ArrowRight size={18} />
              </button>
            </div>
          </div>

          <div className="flex-1 perspective-2000 w-full max-w-2xl mx-auto lg:mx-0">
            <div className="visiting-card-container relative w-full aspect-[16/9] md:aspect-[16/9] sm:aspect-[4/3] xs:aspect-[4/3]">
              <div
                onClick={() => {
                  const newFlipped = !isCardFlipped;
                  setIsCardFlipped(newFlipped);
                  gsap.to('.visiting-card-inner', {
                    rotationY: newFlipped ? 180 : 0,
                    rotationX: 0,
                    duration: 0.8,
                    ease: "back.out(1.2)"
                  });
                }}
                className="visiting-card-inner relative w-full h-full preserve-3d cursor-pointer"
              >
                {/* Front Face */}
                <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl overflow-hidden shadow-2xl border border-gray-200 group/card bg-white">
                  <img
                    src="/New-Samadhan-Shoe-Mart/New-Card.jpg"
                    alt="Visiting Card Front"
                    loading="lazy"
                    className="w-full h-full object-cover md:object-fill"
                    onError={(e) => { e.target.src = 'https://placehold.co/600x400/8B0000/FFF?text=New+Samadhan+Shoe+Mart'; }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover/card:opacity-100">
                     <button
                       onClick={(e) => {
                         e.stopPropagation();
                         setModalImage('/New-Samadhan-Shoe-Mart/New-Card.jpg');
                         setIsModalOpen(true);
                       }}
                       className="bg-white text-black p-4 rounded-full shadow-xl transform scale-75 group-hover/card:scale-100 transition-all hover:bg-[#d4af37] hover:text-white"
                     >
                       <Maximize2 size={24} />
                     </button>
                  </div>
                </div>

                {/* Back Face */}
                <div className="absolute inset-0 w-full h-full backface-hidden rounded-3xl overflow-hidden shadow-2xl border border-gray-200 rotate-y-180 bg-white p-2 group/card">
                  <img
                    src="/New-Samadhan-Shoe-Mart/Screenshot_20260928_230702_Snapchat.jpg"
                    alt="Visiting Card Back"
                    loading="lazy"
                    className="w-full h-full object-contain rounded-2xl"
                    onError={(e) => { e.target.src = 'https://placehold.co/600x400/8B0000/FFF?text=Scan+QR+to+Connect'; }}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover/card:bg-black/20 transition-all flex items-center justify-center opacity-0 group-hover/card:opacity-100">
                     <button
                       onClick={(e) => {
                         e.stopPropagation();
                         setModalImage('/New-Samadhan-Shoe-Mart/Screenshot_20260928_230702_Snapchat.jpg');
                         setIsModalOpen(true);
                       }}
                       className="bg-white text-black p-4 rounded-full shadow-xl transform scale-75 group-hover/card:scale-100 transition-all hover:bg-[#d4af37] hover:text-white"
                     >
                       <Maximize2 size={24} />
                     </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Image Zoom Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-4 md:p-12 animate-in fade-in duration-300"
          onClick={() => setIsModalOpen(false)}
        >
          <button
            className="absolute top-8 right-8 text-white hover:text-[#d4af37] transition-colors p-2"
            onClick={() => setIsModalOpen(false)}
          >
            <X size={40} />
          </button>

          <div className="relative max-w-6xl w-full h-full flex items-center justify-center">
            <img
              src={modalImage}
              alt="Zoomed Card"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in duration-500"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}

      {/* FOOTER REMOVED - Using Global Footer Component */}

      {/* Global Utility Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,900;1,900&family=Inter:wght@400;500;700;900&display=swap');

        body {
          font-family: 'Inter', sans-serif;
        }

        h1, h2, h3, h4, .font-playfair {
          font-family: 'Playfair Display', serif;
        }

        .hero-section {
          background: radial-gradient(circle at 50% 50%, #f9f9f9 0%, #ffffff 100%);
        }

        .category-card {
           perspective: 1000px;
           transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .category-card:hover {
          transform: translateY(-15px) scale(1.02);
        }

        .product-card {
          will-change: transform, opacity;
        }

        .perspective-2000 {
          perspective: 2000px;
        }

        .preserve-3d {
          transform-style: preserve-3d;
        }

        .backface-hidden {
          backface-visibility: hidden;
        }

        .rotate-y-180 {
          transform: rotateY(180deg);
        }

        .visiting-card-container {
           box-shadow: 0 50px 100px -20px rgba(0,0,0,0.1);
        }

        .visiting-card-inner {
           transform-style: preserve-3d;
           width: 100%;
           height: 100%;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
