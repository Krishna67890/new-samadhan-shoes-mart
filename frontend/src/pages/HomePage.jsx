import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowRight, Shield, Zap, Layers, ChevronRight, X, ShoppingBag,
  Sparkles, Award, Footprints, Compass, CheckCircle2,
  Calendar, Eye, Hammer, Scissors, Wrench, ShieldCheck
} from 'lucide-react';
import { useCart } from '../context/CartContext';

gsap.registerPlugin(ScrollTrigger);

const SHOE_IMAGE = '/Shoes.png';

const featuredProducts = [
  { id: 'v1', name: 'Aero Craft Alpha', category: 'Sneakers', price: 4999, originalPrice: 8999, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80', sizes: [7,8,9,10], desc: 'Precision engineered lifestyle silhouette.' },
  { id: 'v2', name: 'Monarch Luxe', category: 'Formal', price: 5499, originalPrice: 9999, image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=800&q=80', sizes: [8,9,10,11], desc: 'Timeless tailored aesthetic.' },
  { id: 'v3', name: 'Neo Kinetic', category: 'Sports', price: 3899, originalPrice: 6499, image: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=800&q=80', sizes: [7,8,9,10], desc: 'Aerodynamic responsiveness.' },
  { id: 'v4', name: 'Urban Legacy', category: 'Casual', price: 2999, originalPrice: 4999, image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80', sizes: [6,7,8,9,10], desc: 'Minimalist leather everyday icon.' },
];

const CRAFT_STEPS = [
  {
    step: '01',
    companyTitle: 'THE NASHIK HERITAGE (EST. 1990)',
    companySubtitle: '34 Years of Pure Cobbler Dedication',
    companyDesc: 'New Samadhan Shoe Mart began in the cultural core of Nashik, Maharashtra with a singular manifesto: elevate everyday footwear into generational heirlooms. We reject automated mass-moulding in favour of anatomical precision.',
    companyMetric: '50,000+ Pairs Handcrafted',
    craftTitle: 'ANATOMICAL LAST SCULPTING',
    craftSubtitle: 'Step 1: 32 Ergonomic Kinetic Points',
    craftDesc: 'Every pair begins with an aged hornbeam hardwood last. Over 32 anatomical points are measured to relieve plantar pressure, contour natural arches, and ensure zero break-in fatigue from day one.',
    craftHighlight: 'Hornbeam Hardwood · Glove-Like Fit',
    shoeAngle: { xPercent: 0, yPercent: 0, z: 80, rotY: 32, rotX: 12, rotZ: -3, scale: 1.15 },
  },
  {
    step: '02',
    companyTitle: 'SUSTAINABLE TUSCAN SOURCING',
    companySubtitle: 'Gold-Rated Full-Grain Leather',
    companyDesc: 'We source vegetable-tanned calfskin hides directly from certified European and premier Maharashtra tanneries. Zero chemical PVC coatings—allowing true breathability and rich natural aging.',
    companyMetric: '100% Genuine Full-Grain',
    craftTitle: 'MASTER CLICKING & GRAIN CUT',
    craftSubtitle: 'Step 2: Precision Fiber Orientation',
    craftDesc: 'Using hand-sharpened clicking knives, master clickers inspect every hide millimeter by millimeter. Patterns are cut parallel to natural leather tension lines to prevent creasing fatigue.',
    craftHighlight: 'Hand Clicked · Zero Grain Distortion',
    shoeAngle: { xPercent: -14, yPercent: 2, z: 60, rotY: -35, rotX: 14, rotZ: 4, scale: 1.2 },
  },
  {
    step: '03',
    companyTitle: 'THE MASTER COBBLER GUILD',
    companySubtitle: '12 Generational Master Artisans',
    companyDesc: 'Our workshop houses 12 master artisans boasting over 280 cumulative years of leather craftsmanship. Every pair is individually checked and signed off by our Guild Elder.',
    companyMetric: '280+ Yrs Collective Mastery',
    craftTitle: '12-SPI SEAMING & EDGE SKIVING',
    craftSubtitle: 'Step 3: Rot-Proof Lockstitch Seams',
    craftDesc: 'Leather edges are skived down to 0.4mm feathered tapers before assembly. Twin-needle machines stitch at 12 stitches per inch with bonded German nylon threads for indestructible durability.',
    craftHighlight: '0.4mm Skiving · 12 Stitches/Inch',
    shoeAngle: { xPercent: 14, yPercent: -2, z: 70, rotY: 42, rotX: -10, rotZ: -6, scale: 1.18 },
  },
  {
    step: '04',
    companyTitle: 'LIFETIME SERVICE PROMISE',
    companySubtitle: 'Infinite Resoleability Guarantee',
    companyDesc: 'Unlike cemented fast-fashion shoes that end up in landfills, our Goodyear welt construction allows the outsole to be replaced multiple times at our dedicated Nashik Service Hub.',
    companyMetric: '100% Resoleable Construction',
    craftTitle: 'GOODYEAR WELT & CORK BEDDING',
    craftSubtitle: 'Step 4: The Benchmark of Footwear Mastery',
    craftDesc: 'A solid leather welt is lockstitched directly into the ribbed insole. The inner cavity is packed with natural granulated Portuguese cork that warms and moulds to the exact imprint of your feet.',
    craftHighlight: 'Natural Cork Fill · Goodyear Welting',
    shoeAngle: { xPercent: -2, yPercent: 4, z: 50, rotY: -165, rotX: -18, rotZ: 14, scale: 1.14 },
  },
  {
    step: '05',
    companyTitle: 'ORTHO-COMFORT ARCHITECTURE',
    companySubtitle: 'Aerodynamic All-Day Comfort',
    companyDesc: 'Engineered for real-world life. We marry old-world English bench construction with modern dual-density orthotic shock dampening for 12 hours of effortless walking comfort.',
    companyMetric: 'Zero Fatigue Guarantee',
    craftTitle: 'DUAL-DENSITY SOLE FUSION',
    craftSubtitle: 'Step 5: 80-Bar Pneumatic Pressing',
    craftDesc: 'Outsoles are fused under 80-bar pneumatic pressure with thermo-reactive adhesives, followed by channel lockstitching and solid brass heel pegging for impervious all-weather grip.',
    craftHighlight: 'Vibram / Oak Leather · 80-Bar Press',
    shoeAngle: { xPercent: 12, yPercent: 2, z: 80, rotY: 55, rotX: 16, rotZ: -4, scale: 1.22 },
  },
  {
    step: '06',
    companyTitle: 'THE "SAMADHAN" PHILOSOPHY',
    companySubtitle: 'True Serenity & Unmatched Satisfaction',
    companyDesc: 'In Sanskrit and Marathi, "Samadhan" signifies absolute inner contentment. That emotional resonance is woven into the unboxing of every single pair we ship.',
    companyMetric: '30-Day Comfort Warranty',
    craftTitle: '24-HOUR BONE-BURNISHED PATINA',
    craftSubtitle: 'Step 6: Hand-Rubbed Mirror Luster',
    craftDesc: 'Finished by hand using organic carnauba waxes and genuine deer bone to close leather pores. Glazed with horsehair wheels to achieve an iridescent museum-grade patina that matures over years.',
    craftHighlight: 'Carnauba Wax · 24-Hr Patina Glaze',
    shoeAngle: { xPercent: 0, yPercent: 0, z: 90, rotY: 360, rotX: 8, rotZ: 0, scale: 1.28 },
  },
];

// Interactive Hotspot Component
const Hotspot = ({ x, y, title, subtitle, tag }) => {
  const [active, setActive] = useState(false);
  return (
    <div
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onClick={(e) => {
        e.stopPropagation();
        setActive((prev) => !prev);
      }}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: 'translate(-50%, -50%)',
        cursor: 'pointer',
        zIndex: 60,
        pointerEvents: 'auto',
      }}
    >
      <div style={{ position: 'relative', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="hotspot-pulse-ring" />
        <div style={{
          width: '11px',
          height: '11px',
          borderRadius: '50%',
          background: '#8B0000',
          border: '2px solid #ffffff',
          boxShadow: '0 0 16px rgba(139,0,0,0.9)',
          transition: 'transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          transform: active ? 'scale(1.4)' : 'scale(1)',
        }} />
      </div>

      <div
        style={{
          position: 'absolute',
          left: '36px',
          top: '50%',
          transform: `translateY(-50%) ${active ? 'scale(1)' : 'scale(0.92)'}`,
          background: 'rgba(17, 17, 17, 0.94)',
          backdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.16)',
          borderRadius: '12px',
          padding: '10px 16px',
          whiteSpace: 'nowrap',
          color: '#ffffff',
          boxShadow: '0 15px 35px rgba(0,0,0,0.4)',
          opacity: active ? 1 : 0,
          pointerEvents: active ? 'auto' : 'none',
          transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
          <span style={{ fontSize: '9px', fontWeight: 800, color: '#ff4d4d', letterSpacing: '0.15em' }}>{tag}</span>
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{title}</span>
        </div>
        <p style={{ margin: 0, fontSize: '10px', opacity: 0.8, fontStyle: 'italic' }}>{subtitle}</p>
      </div>
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const artisanJourneyRef = useRef(null);
  const walkthroughRef = useRef(null);
  const horizontalSectionRef = useRef(null);
  const horizontalTrackRef = useRef(null);
  const destinationRef = useRef(null);

  // 3D Shoe Stage Refs
  const shoeStageRef = useRef(null);
  const shoeWrapperRef = useRef(null);
  const shoeVelocityRef = useRef(null);
  const shoeTiltRef = useRef(null);
  const shoeFloatRef = useRef(null);
  const shoeShadowRef = useRef(null);
  const specularRef = useRef(null);
  const laserScanRef = useRef(null);
  const techHudRef = useRef(null);
  const heroHotspotsRef = useRef(null);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeSize, setActiveSize] = useState(null);

  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      size: activeSize || product.sizes[0],
      qty: 1,
    });
    setSelectedProduct(null);
  };

  useEffect(() => {
    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleResize);
    window.addEventListener('load', handleResize);
    const t1 = setTimeout(() => ScrollTrigger.refresh(), 300);
    const t2 = setTimeout(() => ScrollTrigger.refresh(), 1200);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('load', handleResize);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ==================================================
      // 1. INDEPENDENT AMBIENT LEVITATION & REALISTIC SHADOW
      // ==================================================
      if (shoeFloatRef.current) {
        gsap.to(shoeFloatRef.current, {
          y: -12,
          rotationZ: -1.5,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      }

      // Shadow removed per user request

      // ==================================================
      // 2. MOUSE 3D PARALLAX TILT & SPECULAR HIGHLIGHT
      // ==================================================
      let handleMouseMove = null;
      if (shoeTiltRef.current) {
        const xTo = gsap.quickTo(shoeTiltRef.current, 'rotationY', { duration: 0.7, ease: 'power3.out' });
        const yTo = gsap.quickTo(shoeTiltRef.current, 'rotationX', { duration: 0.7, ease: 'power3.out' });
        const specXTo = specularRef.current
          ? gsap.quickTo(specularRef.current, 'x', { duration: 0.6, ease: 'power2.out' })
          : null;
        const specYTo = specularRef.current
          ? gsap.quickTo(specularRef.current, 'y', { duration: 0.6, ease: 'power2.out' })
          : null;

        handleMouseMove = (e) => {
          const x = (e.clientX / window.innerWidth - 0.5) * 24;
          const y = (e.clientY / window.innerHeight - 0.5) * -24;
          xTo(x);
          yTo(y);

          // Shift 3D specular light glare across the leather surface
          if (specXTo && specYTo) {
            specXTo((e.clientX / window.innerWidth - 0.5) * 50);
            specYTo((e.clientY / window.innerHeight - 0.5) * 35);
          }
        };
        window.addEventListener('mousemove', handleMouseMove);
      }

      // ==================================================
      // 3. MOUSE SCROLLDOWN SPEED = 3D SHOE MOMENTUM PITCH
      // ==================================================
      if (shoeVelocityRef.current) {
        const pitchTo = gsap.quickTo(shoeVelocityRef.current, 'rotationX', { duration: 0.35, ease: 'power2.out' });
        const squishYTo = gsap.quickTo(shoeVelocityRef.current, 'scaleY', { duration: 0.35, ease: 'power2.out' });
        const squishXTo = gsap.quickTo(shoeVelocityRef.current, 'scaleX', { duration: 0.35, ease: 'power2.out' });

        let velocityTimeout = null;

        ScrollTrigger.create({
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => {
            const vel = self.getVelocity();
            const absVel = Math.abs(vel);

            // Dynamic forward lean into scroll speed (clamped up to +-22deg)
            const clampedPitch = Math.max(-22, Math.min(22, vel * 0.015));
            pitchTo(clampedPitch);

            // Subtle aerodynamic kinetic compression
            const stretchY = 1 + Math.min(0.15, absVel * 0.0001);
            const stretchX = 1 - Math.min(0.08, absVel * 0.00005);
            squishYTo(stretchY);
            squishXTo(stretchX);

            clearTimeout(velocityTimeout);
            velocityTimeout = setTimeout(() => {
              pitchTo(0);
              squishYTo(1);
              squishXTo(1);
            }, 140);
          },
        });
      }

      // ==================================================
      // 4. ADVANCED 3D SCROLLTRIGGER SHOE TRAJECTORY
      // ==================================================
      mm.add({
        isDesktop: "(min-width: 1024px)",
        isTablet: "(min-width: 768px) and (max-width: 1023px)",
        isMobile: "(max-width: 767px)"
      }, (context) => {
        const { isDesktop, isMobile } = context.conditions;

        // Base Initial Setup for Hero Section in 3D
        gsap.set(shoeWrapperRef.current, {
          xPercent: isDesktop ? 24 : 0,
          yPercent: isDesktop ? -2 : 0,
          z: 30,
          scale: isDesktop ? 1.08 : 0.72,
          rotation: isDesktop ? -8 : -4,
          rotationY: isDesktop ? -18 : -10,
          rotationX: isDesktop ? 10 : 6,
          rotationZ: 0,
          opacity: 1,
          transformOrigin: '50% 50%',
        });

        // ----------------------------------------------------
        // A. HERO -> CRAFT JOURNEY TRANSITION
        // ----------------------------------------------------
        if (heroRef.current && artisanJourneyRef.current) {
          const heroToCraftTl = gsap.timeline({
            scrollTrigger: {
              trigger: heroRef.current,
              start: 'center 40%',
              endTrigger: artisanJourneyRef.current,
              end: 'top 30%',
              scrub: 1,
              invalidateOnRefresh: true,
            }
          });

          heroToCraftTl
            .to(heroHotspotsRef.current, { opacity: 0, duration: 0.3 }, 0)
            .to(shoeWrapperRef.current, {
              xPercent: 0,
              yPercent: isMobile ? 0 : 0,
              z: 80,
              scale: isDesktop ? 1.15 : 0.82,
              rotation: 0,
              rotationY: 32,
              rotationX: 12,
              rotationZ: -3,
              ease: 'power2.inOut',
            }, 0);
        }

        // ----------------------------------------------------
        // B. 6 CRAFT STEPS 3D SCROLLTRIGGER
        // ----------------------------------------------------
        CRAFT_STEPS.forEach((step, idx) => {
          const stepEl = document.getElementById(`craft-step-${idx}`);
          if (!stepEl) return;

          const stepTl = gsap.timeline({
            scrollTrigger: {
              trigger: stepEl,
              start: 'top 75%',
              end: 'bottom 45%',
              scrub: 0.8,
              invalidateOnRefresh: true,
            }
          });

          const targetAngle = step.shoeAngle;
          stepTl.to(shoeWrapperRef.current, {
            xPercent: isDesktop ? targetAngle.xPercent : 0,
            yPercent: isMobile ? 4 : targetAngle.yPercent,
            z: targetAngle.z || 50,
            scale: isDesktop ? targetAngle.scale : targetAngle.scale * 0.72,
            rotationY: targetAngle.rotY,
            rotationX: targetAngle.rotX,
            rotationZ: targetAngle.rotZ,
            ease: 'power2.out',
          }, 0);

          // Card reveals on left and right
          const leftCard = stepEl.querySelector('.craft-left-card');
          const rightCard = stepEl.querySelector('.craft-right-card');

          if (leftCard) {
            gsap.fromTo(leftCard,
              { x: isDesktop ? -60 : 0, y: isMobile ? 30 : 0, opacity: 0.2 },
              {
                x: 0, y: 0, opacity: 1,
                scrollTrigger: {
                  trigger: stepEl,
                  start: 'top 80%',
                  end: 'center center',
                  scrub: 0.8,
                }
              }
            );
          }

          if (rightCard) {
            gsap.fromTo(rightCard,
              { x: isDesktop ? 60 : 0, y: isMobile ? 30 : 0, opacity: 0.2 },
              {
                x: 0, y: 0, opacity: 1,
                scrollTrigger: {
                  trigger: stepEl,
                  start: 'top 80%',
                  end: 'center center',
                  scrub: 0.8,
                }
              }
            );
          }
        });

        // ----------------------------------------------------
        // C. JOURNEY -> WALKTHROUGH (Holographic Laser & 360 Spin)
        // ----------------------------------------------------
        if (walkthroughRef.current) {
          const walkPinTl = gsap.timeline({
            scrollTrigger: {
              trigger: walkthroughRef.current,
              start: 'top top',
              end: '+=140%',
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            }
          });

          walkPinTl
            .to('.pin-headline-word', { y: 0, opacity: 1, stagger: 0.12, ease: 'power4.out' }, 0)
            .to('.pin-orbit', { rotation: -180, opacity: 0.6, ease: 'none' }, 0)
            .to(shoeWrapperRef.current, {
              xPercent: 0,
              yPercent: isMobile ? 2 : 4,
              z: 120,
              rotationY: 720,
              rotationX: 12,
              rotationZ: -4,
              scale: isDesktop ? 1.35 : 0.88,
              ease: 'power1.inOut',
            }, 0)
            .to(techHudRef.current, { opacity: 1, duration: 0.4 }, 0.2)
            .fromTo(laserScanRef.current,
              { left: '10%', opacity: 0 },
              { left: '90%', opacity: 1, repeat: 1, yoyo: true, ease: 'sine.inOut' },
              0.15
            )
            .to('.pin-reveal-item', { y: 0, opacity: 1, stagger: 0.15, ease: 'back.out(1.7)' }, 0.35)
            .fromTo('.tech-badge',
              { scale: 0.85, opacity: 0 },
              { scale: 1, opacity: 1, stagger: 0.1, ease: 'power2.out' },
              0.25
            );
        }

        // ----------------------------------------------------
        // D. WALKTHROUGH -> HORIZONTAL COLLECTIONS PINNED SCROLL
        // ----------------------------------------------------
        const hTrack = horizontalTrackRef.current;
        const hSection = horizontalSectionRef.current;
        if (hTrack && hSection) {
          const panels = gsap.utils.toArray('.h-panel');
          const totalScroll = hTrack.scrollWidth - window.innerWidth;

          const hScrollTl = gsap.timeline({
            scrollTrigger: {
              trigger: hSection,
              start: 'top top',
              end: () => '+=' + totalScroll,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
              anticipatePin: 1,
            },
          });

          hScrollTl
            .to(techHudRef.current, { opacity: 0, duration: 0.2 }, 0)
            .to(laserScanRef.current, { opacity: 0, duration: 0.2 }, 0)
            .to(hTrack, { x: () => -totalScroll, ease: 'none' }, 0)
            .to(shoeWrapperRef.current, {
              xPercent: isDesktop ? -26 : 0,
              yPercent: isDesktop ? 16 : 14,
              z: 30,
              scale: isDesktop ? 0.92 : 0.68,
              rotation: isDesktop ? -12 : -6,
              rotationY: isDesktop ? 24 : 12,
              ease: 'sine.inOut',
            }, 0);

          panels.forEach((panel) => {
            const title = panel.querySelector('.h-panel-title');
            if (title) {
              gsap.from(title, {
                x: 100,
                opacity: 0,
                duration: 1,
                scrollTrigger: {
                  trigger: panel,
                  containerAnimation: hScrollTl,
                  start: 'left 80%',
                  toggleActions: 'play none none reverse',
                },
              });
            }
          });
        }

        // ----------------------------------------------------
        // E. HORIZONTAL -> DESTINATION LANDING
        // ----------------------------------------------------
        if (horizontalSectionRef.current && destinationRef.current) {
          const hToFinalTl = gsap.timeline({
            scrollTrigger: {
              trigger: horizontalSectionRef.current,
              start: 'bottom top',
              endTrigger: destinationRef.current,
              end: 'center center',
              scrub: 1.2,
              invalidateOnRefresh: true,
            }
          });

          hToFinalTl.to(shoeWrapperRef.current, {
            xPercent: 0,
            yPercent: isMobile ? 4 : 4,
            z: 70,
            scale: isDesktop ? 1.15 : 0.82,
            rotation: 0,
            rotationY: 0,
            rotationX: 0,
            rotationZ: 0,
            opacity: 1,
            ease: 'power2.out',
          }, 0);
        }

        // ----------------------------------------------------
        // F. DESTINATION -> CATALOG FADE DISSOLVE
        // ----------------------------------------------------
        if (destinationRef.current) {
          const finalToCatalogTl = gsap.timeline({
            scrollTrigger: {
              trigger: destinationRef.current,
              start: 'center center',
              end: 'bottom top',
              scrub: 1,
              invalidateOnRefresh: true,
            }
          });

          finalToCatalogTl.to(shoeWrapperRef.current, {
            opacity: 0,
            scale: isDesktop ? 0.6 : 0.45,
            yPercent: -20,
            ease: 'power2.in',
          }, 0);
        }

        return () => {};
      });

      // ==================================================
      // 5. SECTION COLOR THEME SHIFTS
      // ==================================================
      const themeSections = [
        { ref: heroRef, theme: 'light' },
        { ref: artisanJourneyRef, theme: 'light' },
        { ref: walkthroughRef, theme: 'dark' },
        { ref: horizontalSectionRef, theme: 'dark' },
        { ref: destinationRef, theme: 'light' },
      ];

      themeSections.forEach((item) => {
        if (!item.ref.current) return;
        ScrollTrigger.create({
          trigger: item.ref.current,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => {
            document.body.style.transition = 'background-color 0.8s ease, color 0.8s ease';
            if (item.theme === 'dark') {
              document.body.style.background = '#0a0a0a';
              document.body.style.color = '#F7F5F0';
            } else {
              document.body.style.background = '#F7F5F0';
              document.body.style.color = '#111111';
            }
          },
          onEnterBack: () => {
            if (item.theme === 'dark') {
              document.body.style.background = '#0a0a0a';
              document.body.style.color = '#F7F5F0';
            } else {
              document.body.style.background = '#F7F5F0';
              document.body.style.color = '#111111';
            }
          },
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        background: '#F7F5F0',
        color: '#111111',
        position: 'relative',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* ==================== FIXED 3D MASTER SHOE STAGE (ALWAYS TOP LEVEL & CLEAN 3D) ==================== */}
      <div
        ref={shoeStageRef}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 50,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          perspective: '1600px',
          perspectiveOrigin: '50% 50%',
        }}
      >
        {/* Layer 1: Master ScrollTrigger 3D coordinates */}
        <div
          ref={shoeWrapperRef}
          style={{
            position: 'relative',
            transformStyle: 'preserve-3d',
            willChange: 'transform, opacity',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Layer 2: Dynamic Scroll Speed Momentum Pitch */}
          <div
            ref={shoeVelocityRef}
            style={{
              position: 'relative',
              transformStyle: 'preserve-3d',
              willChange: 'transform',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Layer 3: Interactive 3D Cursor Tilt */}
            <div
              ref={shoeTiltRef}
              style={{
                position: 'relative',
                transformStyle: 'preserve-3d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Layer 4: Ambient levitation floating */}
              <div
                ref={shoeFloatRef}
                style={{
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {/* Shadow removed per user request */}
                <div ref={shoeShadowRef} style={{ display: 'none' }} />

                {/* 3D Volumetric Leather Specular Glare (Reacts to 3D rotation & light) */}
                <div
                  ref={specularRef}
                  style={{
                    position: 'absolute',
                    inset: '8%',
                    background: 'radial-gradient(ellipse at 40% 30%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.12) 35%, transparent 70%)',
                    mixBlendMode: 'overlay',
                    borderRadius: '50%',
                    filter: 'blur(14px)',
                    pointerEvents: 'none',
                    zIndex: 3,
                    transform: 'translateZ(20px)',
                  }}
                />

                {/* The Master Shoe Visual (shoes.png with 3D Depth) */}
                <img
                  src={SHOE_IMAGE}
                  alt="New Samadhan Handcrafted Derby Boot"
                  onError={(e) => {
                    if (e.target.src.indexOf('shoes.png') === -1) {
                      e.target.src = '/shoes.png';
                    }
                  }}
                  style={{
                    width: 'clamp(260px, 44vw, 780px)',
                    height: 'auto',
                    objectFit: 'contain',
                    filter: 'none',
                    userSelect: 'none',
                    pointerEvents: 'none',
                    position: 'relative',
                    zIndex: 2,
                    transform: 'translateZ(10px)',
                  }}
                />

                {/* Holographic Laser Scan Line */}
                <div
                  ref={laserScanRef}
                  style={{
                    position: 'absolute',
                    top: '-8%',
                    bottom: '-8%',
                    width: '3px',
                    left: '10%',
                    background: 'linear-gradient(180deg, transparent, #ff2a2a 20%, #ffffff 50%, #ff2a2a 80%, transparent)',
                    boxShadow: '0 0 18px 4px rgba(255, 42, 42, 0.85), 0 0 35px 8px rgba(139, 0, 0, 0.55)',
                    opacity: 0,
                    pointerEvents: 'none',
                    zIndex: 10,
                    transform: 'translateX(-50%) translateZ(25px)',
                  }}
                />

                {/* Interactive Inspection Hotspots in Hero */}
                <div
                  ref={heroHotspotsRef}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    pointerEvents: 'auto',
                    zIndex: 60,
                    transition: 'opacity 0.4s ease',
                    transform: 'translateZ(30px)',
                  }}
                >
                  <Hotspot
                    x="65%"
                    y="68%"
                    title="Full-Grain Calfskin"
                    subtitle="Hand-burnished tonal patina"
                    tag="01"
                  />
                  <Hotspot
                    x="50%"
                    y="40%"
                    title="Waxed Eyelet Lacing"
                    subtitle="Pressure-relieving anatomical fit"
                    tag="02"
                  />
                  <Hotspot
                    x="24%"
                    y="76%"
                    title="Goodyear Welt"
                    subtitle="Hand-stitched stacked heel"
                    tag="03"
                  />
                </div>

                {/* Holographic Tech Telemetry HUD */}
                <div
                  ref={techHudRef}
                  style={{
                    position: 'absolute',
                    inset: '-35px',
                    pointerEvents: 'none',
                    opacity: 0,
                    zIndex: 12,
                    transition: 'opacity 0.5s ease',
                    transform: 'translateZ(40px)',
                  }}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '24px', height: '24px', borderTop: '2px solid #8B0000', borderLeft: '2px solid #8B0000' }} />
                  <div style={{ position: 'absolute', top: 0, right: 0, width: '24px', height: '24px', borderTop: '2px solid #8B0000', borderRight: '2px solid #8B0000' }} />
                  <div style={{ position: 'absolute', bottom: 0, left: 0, width: '24px', height: '24px', borderBottom: '2px solid #8B0000', borderLeft: '2px solid #8B0000' }} />
                  <div style={{ position: 'absolute', bottom: 0, right: 0, width: '24px', height: '24px', borderBottom: '2px solid #8B0000', borderRight: '2px solid #8B0000' }} />

                  <div className="tech-badge tech-badge-tl">
                    <span className="tech-label">CALIBER</span>
                    <span className="tech-val">380g FEATHERLIGHT</span>
                  </div>
                  <div className="tech-badge tech-badge-tr">
                    <span className="tech-label">TORSION</span>
                    <span className="tech-val">94.8% RIGIDITY</span>
                  </div>
                  <div className="tech-badge tech-badge-bl">
                    <span className="tech-label">MIDSOLE</span>
                    <span className="tech-val">DUAL-DENSITY ORTHO</span>
                  </div>
                  <div className="tech-badge tech-badge-br">
                    <span className="tech-label">HEEL DROP</span>
                    <span className="tech-val">12mm ANATOMICAL</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Global Keyframes */}
        <style>{`
          @keyframes hotspotPulseRing {
            0% { transform: scale(0.7); opacity: 0.9; }
            50% { transform: scale(1.6); opacity: 0.25; }
            100% { transform: scale(2.4); opacity: 0; }
          }
          .hotspot-pulse-ring {
            position: absolute;
            inset: -6px;
            border-radius: 50%;
            border: 1.5px solid #8B0000;
            animation: hotspotPulseRing 2.4s infinite cubic-bezier(0.2, 0.8, 0.4, 1);
            pointer-events: none;
          }
          .tech-badge {
            position: absolute;
            background: rgba(10, 10, 10, 0.88);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(139, 0, 0, 0.45);
            padding: 8px 14px;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            gap: 3px;
            font-family: 'Inter', monospace, sans-serif;
            box-shadow: 0 10px 25px rgba(0,0,0,0.5);
            pointer-events: none;
          }
          .tech-badge-tl { top: -25px; left: -15px; }
          .tech-badge-tr { top: -25px; right: -15px; text-align: right; }
          .tech-badge-bl { bottom: -25px; left: -15px; }
          .tech-badge-br { bottom: -25px; right: -15px; text-align: right; }
          .tech-label { font-size: 8px; font-weight: 800; letter-spacing: 0.2em; color: #ff4d4d; text-transform: uppercase; }
          .tech-val { font-size: 10px; font-weight: 700; color: #f7f5f0; letter-spacing: 0.08em; }

          @media (max-width: 768px) {
            .tech-badge { padding: 5px 8px; }
            .tech-val { font-size: 8px; }
            .tech-badge-tl { top: -15px; left: -5px; }
            .tech-badge-tr { top: -15px; right: -5px; }
            .tech-badge-bl { bottom: -15px; left: -5px; }
            .tech-badge-br { bottom: -15px; right: -5px; }
          }
        `}</style>
      </div>

      {/* ==================== 01 · HERO ==================== */}
      <section
        id="hero"
        ref={heroRef}
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          padding: '96px 24px',
          zIndex: 10,
        }}
      >
        <div style={{
          position: 'absolute',
          bottom: '10%',
          left: '-4vw',
          fontSize: '26vw',
          fontFamily: "'Playfair Display', serif",
          fontWeight: 900,
          color: 'rgba(17,17,17,0.03)',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          letterSpacing: '-0.05em',
          userSelect: 'none',
        }}>
          SAMADHAN
        </div>

        <div style={{ maxWidth: '1280px', width: '100%', margin: '0 auto', position: 'relative', zIndex: 5 }}>
          <div style={{ maxWidth: '600px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
              <Sparkles size={15} color="#8B0000" />
              <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.45em', color: '#8B0000', textTransform: 'uppercase' }}>
                Est. 1990 · Nashik Flagship
              </span>
            </div>

            <h1 style={{
              margin: 0,
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              lineHeight: 0.9,
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              fontSize: 'clamp(2.8rem, 8.5vw, 7.2rem)',
            }}>
              STEP INTO <br />
              YOUR NEXT <br />
              <span style={{ fontStyle: 'italic', fontWeight: 300, color: '#8B0000' }}>STORY.</span>
            </h1>

            <p style={{ fontSize: '16px', opacity: 0.65, maxWidth: '440px', marginTop: '28px', lineHeight: 1.7 }}>
              Artisanal Goodyear welted footwear crafted with generational passion. Scroll down to experience our mastercraft journey and see how each pair is sculpted.
            </p>

            <div style={{ display: 'flex', gap: '14px', marginTop: '36px', flexWrap: 'wrap' }}>
              <button
                onClick={() => navigate('/products')}
                style={{
                  background: '#111',
                  color: 'white',
                  padding: '18px 36px',
                  border: 'none',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  borderRadius: '12px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.15)'
                }}
              >
                Shop Collection <ArrowRight size={16} />
              </button>
              <Link
                to="/workshop"
                style={{
                  background: 'white',
                  color: '#111',
                  padding: '18px 30px',
                  border: '1px solid rgba(17,17,17,0.15)',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                The Workshop <Compass size={15} />
              </Link>
            </div>
          </div>

          {/* Desktop Hero Info Badges */}
          <div className="hidden lg:flex flex-col gap-4" style={{
            position: 'absolute',
            right: '2vw',
            bottom: '4vh',
            zIndex: 10,
          }}>
            <div style={{
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(12px)',
              padding: '14px 20px',
              borderRadius: '16px',
              border: '1px solid rgba(17,17,17,0.08)',
              boxShadow: '0 10px 25px rgba(0,0,0,0.04)',
              width: '240px',
            }}>
              <span style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.2em', color: '#8B0000', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                Flagship Atelier
              </span>
              <p style={{ fontSize: '12px', margin: 0, fontWeight: 600, lineHeight: 1.4 }}>
                Plot No 29, Santkrupa Niwas, Nashik 422003
              </p>
            </div>
            <div style={{
              background: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(12px)',
              padding: '14px 20px',
              borderRadius: '16px',
              border: '1px solid rgba(17,17,17,0.08)',
              boxShadow: '0 10px 25px rgba(0,0,0,0.04)',
              width: '240px',
            }}>
              <span style={{ fontSize: '9px', fontWeight: 900, letterSpacing: '0.2em', color: '#8B0000', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                Direct Concierge
              </span>
              <p style={{ fontSize: '13px', margin: 0, fontWeight: 800 }}>+91 9423228843</p>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: 0.5,
        }}>
          <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.4em', textTransform: 'uppercase' }}>
            SCROLL DOWN TO MOVE SHOE
          </span>
          <div style={{ width: '1px', height: '36px', background: 'linear-gradient(to bottom, #111, transparent)' }} />
        </div>
      </section>

      {/* ==================== 02 · CRAFT & COMPANY JOURNEY (NATURAL 3D SCROLL) ==================== */}
      <section
        id="artisan-journey"
        ref={artisanJourneyRef}
        style={{
          position: 'relative',
          padding: '80px 0 140px',
          zIndex: 20,
          background: '#F7F5F0',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 24px' }}>

          {/* Section Introduction */}
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 100px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', background: 'rgba(139,0,0,0.08)', borderRadius: '20px', marginBottom: '16px' }}>
              <Sparkles size={14} color="#8B0000" />
              <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.35em', color: '#8B0000', textTransform: 'uppercase' }}>
                The Anatomy of Excellence
              </span>
            </div>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              fontSize: 'clamp(2.4rem, 6vw, 5rem)',
              textTransform: 'uppercase',
              lineHeight: 0.95,
              margin: '0 0 20px',
            }}>
              HOW WE MAKE SHOES · <br />
              <span style={{ color: '#8B0000', fontStyle: 'italic', fontWeight: 300 }}>OUR HERITAGE STORY</span>
            </h2>
            <p style={{ fontSize: '15px', color: '#6B6B6B', lineHeight: 1.7, margin: 0 }}>
              As you scroll down, the handcrafted shoe glides, tilts, and rotates in full 3D. On the left: our 34-year company heritage. On the right: the 6 artisanal steps of how each pair is sculpted.
            </p>
          </div>

          {/* 6 Step Rows (Shoe travels through the center space between Left and Right cards) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
            {CRAFT_STEPS.map((step, idx) => (
              <div
                key={idx}
                id={`craft-step-${idx}`}
                style={{
                  minHeight: '80vh',
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                }}
              >
                <div style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '24px',
                  flexWrap: 'wrap',
                }}>

                  {/* LEFT CARD: COMPANY INFORMATION */}
                  <div
                    className="craft-left-card"
                    style={{
                      flex: '1 1 360px',
                      maxWidth: '460px',
                      background: 'rgba(255, 255, 255, 0.82)',
                      backdropFilter: 'blur(16px)',
                      border: '1px solid rgba(17, 17, 17, 0.08)',
                      borderRadius: '24px',
                      padding: '36px 30px',
                      boxShadow: '0 20px 45px rgba(0,0,0,0.05)',
                      position: 'relative',
                      zIndex: 10,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <Award size={15} color="#8B0000" />
                        <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.25em', color: '#8B0000', textTransform: 'uppercase' }}>
                          Company Information
                        </span>
                      </div>
                      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '26px', fontWeight: 900, color: 'rgba(139,0,0,0.18)' }}>
                        {step.step}
                      </span>
                    </div>

                    <h3 style={{
                      fontSize: '19px',
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      margin: '0 0 6px',
                      color: '#111',
                      lineHeight: 1.25
                    }}>
                      {step.companyTitle}
                    </h3>

                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#6B6B6B', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '14px' }}>
                      {step.companySubtitle}
                    </span>

                    <p style={{ fontSize: '13px', color: '#555', lineHeight: 1.7, margin: '0 0 18px' }}>
                      {step.companyDesc}
                    </p>

                    <div style={{
                      padding: '10px 16px',
                      background: '#F7F5F0',
                      borderRadius: '12px',
                      border: '1px solid rgba(17,17,17,0.06)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      <ShieldCheck size={16} color="#8B0000" />
                      <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#111' }}>
                        {step.companyMetric}
                      </span>
                    </div>
                  </div>

                  {/* CENTER CLEARANCE ZONE: Designated width where shoes.png floats and tilts */}
                  <div
                    style={{
                      flex: '0 0 180px',
                      minHeight: '260px',
                      pointerEvents: 'none',
                    }}
                    className="hidden lg:block"
                  />

                  {/* RIGHT CARD: HOW WE MAKE SHOES */}
                  <div
                    className="craft-right-card"
                    style={{
                      flex: '1 1 360px',
                      maxWidth: '460px',
                      marginLeft: 'auto',
                      background: 'rgba(255, 255, 255, 0.82)',
                      backdropFilter: 'blur(16px)',
                      border: '1px solid rgba(139, 0, 0, 0.16)',
                      borderRadius: '24px',
                      padding: '36px 30px',
                      boxShadow: '0 20px 45px rgba(139,0,0,0.06)',
                      position: 'relative',
                      zIndex: 10,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                        <Hammer size={15} color="#8B0000" />
                        <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.25em', color: '#8B0000', textTransform: 'uppercase' }}>
                          How We Make Shoes
                        </span>
                      </div>
                      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '26px', fontWeight: 900, color: 'rgba(139,0,0,0.22)' }}>
                        PHASE {step.step}
                      </span>
                    </div>

                    <h3 style={{
                      fontSize: '19px',
                      fontFamily: "'Playfair Display', serif",
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      margin: '0 0 6px',
                      color: '#111',
                      lineHeight: 1.25
                    }}>
                      {step.craftTitle}
                    </h3>

                    <span style={{ fontSize: '11px', fontWeight: 700, color: '#8B0000', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '14px' }}>
                      {step.craftSubtitle}
                    </span>

                    <p style={{ fontSize: '13px', color: '#555', lineHeight: 1.7, margin: '0 0 18px' }}>
                      {step.craftDesc}
                    </p>

                    <div style={{
                      padding: '10px 16px',
                      background: 'rgba(139,0,0,0.06)',
                      borderRadius: '12px',
                      border: '1px solid rgba(139,0,0,0.18)',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '10px'
                    }}>
                      <CheckCircle2 size={16} color="#8B0000" />
                      <span style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#8B0000' }}>
                        {step.craftHighlight}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* Quick Bridge to Workshop and Gallery */}
          <div style={{
            marginTop: '80px',
            background: 'white',
            borderRadius: '24px',
            padding: '40px',
            border: '1px solid rgba(17,17,17,0.08)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            boxShadow: '0 15px 35px rgba(0,0,0,0.03)'
          }}>
            <div>
              <span style={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.3em', color: '#8B0000', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                Atelier Exploration
              </span>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', margin: 0 }}>
                Explore The Complete Nashik Workshop & Atelier
              </h3>
              <p style={{ fontSize: '13px', color: '#6B6B6B', margin: '6px 0 0' }}>
                Book an in-person bespoke foot measurement consultation or view the curated artisan gallery.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link
                to="/workshop"
                style={{
                  background: '#111',
                  color: 'white',
                  padding: '16px 28px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Enter Workshop <ArrowRight size={15} />
              </Link>
              <Link
                to="/gallery"
                style={{
                  background: '#F7F5F0',
                  color: '#111',
                  padding: '16px 28px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: 700,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                Browse Gallery <Eye size={15} />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* ==================== 03 · PINNED CINEMATIC WALKTHROUGH (HOLOGRAPHIC LASER & HUD) ==================== */}
      <section
        id="walkthrough"
        ref={walkthroughRef}
        style={{
          position: 'relative',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: '#0a0a0a',
          color: '#F7F5F0',
          zIndex: 20,
        }}
      >
        <div className="pin-orbit" style={{
          position: 'absolute',
          width: '80vw',
          height: '80vw',
          maxWidth: '1000px',
          maxHeight: '1000px',
          borderRadius: '50%',
          border: '1px dashed rgba(139,0,0,0.3)',
          pointerEvents: 'none',
        }} />
        <div className="pin-orbit" style={{
          position: 'absolute',
          width: '55vw',
          height: '55vw',
          maxWidth: '700px',
          maxHeight: '700px',
          borderRadius: '50%',
          border: '1px solid rgba(247,245,240,0.08)',
          pointerEvents: 'none',
        }} />

        <div style={{ maxWidth: '1280px', width: '100%', position: 'relative', zIndex: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 24px' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
            textAlign: 'center',
            lineHeight: 0.9,
            fontSize: 'clamp(2.4rem, 7vw, 6.5rem)',
            margin: '0 0 40px',
            overflow: 'hidden',
          }}>
            <span className="pin-headline-word" style={{ display: 'inline-block', marginRight: '20px', transform: 'translateY(110%)', opacity: 0 }}>ENGINEERED</span>
            <br />
            <span className="pin-headline-word" style={{ display: 'inline-block', fontStyle: 'italic', fontWeight: 300, color: '#8B0000', transform: 'translateY(110%)', opacity: 0 }}>FOR SPEED.</span>
          </h2>

          <div style={{
            position: 'relative',
            width: '100%',
            height: 'clamp(280px, 36vh, 420px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}>
            <div style={{
              width: 'clamp(280px, 46vw, 680px)',
              height: '50px',
              borderRadius: '50%',
              border: '1.5px solid rgba(139, 0, 0, 0.45)',
              background: 'radial-gradient(ellipse at center, rgba(139, 0, 0, 0.18) 0%, rgba(139, 0, 0, 0.04) 60%, transparent 80%)',
              boxShadow: '0 0 35px rgba(139, 0, 0, 0.35), inset 0 0 25px rgba(139, 0, 0, 0.25)',
              position: 'absolute',
              bottom: '12px',
              transform: 'rotateX(72deg)',
            }} />
          </div>

          <div style={{ display: 'flex', gap: '48px', marginTop: '48px', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[
              { icon: <Zap size={18} />, label: 'Zero Gravity' },
              { icon: <Shield size={18} />, label: 'Armor Flex' },
              { icon: <Layers size={18} />, label: 'Multi-Layer' },
            ].map((item, i) => (
              <div key={i} className="pin-reveal-item" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#F7F5F0' }}>
                <div style={{ color: '#8B0000' }}>{item.icon}</div>
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase' }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== 04 · HORIZONTAL COLLECTIONS ==================== */}
      <section
        id="horizontal"
        ref={horizontalSectionRef}
        style={{
          position: 'relative',
          height: '100vh',
          overflow: 'hidden',
          background: '#0a0a0a',
          color: '#F7F5F0',
          zIndex: 20,
        }}
      >
        <div
          ref={horizontalTrackRef}
          style={{
            display: 'flex',
            height: '100%',
            willChange: 'transform',
            alignItems: 'center',
          }}
        >
          {/* Intro panel */}
          <div className="h-panel" style={{ flexShrink: 0, width: '100vw', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 8vw' }}>
            <div style={{ maxWidth: '800px' }}>
              <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.5em', color: '#8B0000', textTransform: 'uppercase' }}>
                04 · Collections
              </span>
              <h2 className="h-panel-title" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, textTransform: 'uppercase', fontSize: 'clamp(2.8rem, 8vw, 7.5rem)', margin: '16px 0', lineHeight: 0.9 }}>
                FIND YOUR<br /><span style={{ color: '#8B0000', fontStyle: 'italic', fontWeight: 300 }}>NEXT STEP.</span>
              </h2>
              <p style={{ fontSize: '14px', opacity: 0.5, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '24px' }}>
                → Scroll horizontally to explore categories
              </p>
            </div>
          </div>

          {/* Category panels */}
          {[
            { name: 'Men', sub: 'Bold & Refined', icon: '01', link: '/products?category=Men' },
            { name: 'Women', sub: 'Elegance & Grace', icon: '02', link: '/products?category=Women' },
            { name: 'Sports', sub: 'Engineered Motion', icon: '03', link: '/products?category=Sports' },
            { name: 'Casual', sub: 'Everyday Icons', icon: '04', link: '/products?category=Casual' },
            { name: 'Formal', sub: 'Timeless Tailoring', icon: '05', link: '/products?category=Formal' },
            { name: 'Kids', sub: 'Playful Comfort', icon: '06', link: '/products?category=Kids' },
          ].map((cat, i) => (
            <div
              key={i}
              className="h-panel"
              onClick={() => navigate(cat.link)}
              style={{
                flexShrink: 0,
                width: '70vw',
                maxWidth: '900px',
                height: '100%',
                padding: '0 8vw',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                borderRight: '1px solid rgba(247,245,240,0.08)',
                cursor: 'pointer',
                position: 'relative',
              }}
            >
              <span style={{ position: 'absolute', top: '15%', right: '8vw', fontFamily: "'Playfair Display', serif", fontSize: '14vw', fontWeight: 900, color: 'rgba(139,0,0,0.1)', lineHeight: 1 }}>
                {cat.icon}
              </span>
              <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.5em', color: '#8B0000', textTransform: 'uppercase', marginBottom: '16px' }}>
                {cat.sub}
              </span>
              <h3 className="h-panel-title" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, textTransform: 'uppercase', fontSize: 'clamp(3.5rem, 9vw, 8.5rem)', margin: 0, lineHeight: 0.9, fontStyle: 'italic' }}>
                {cat.name}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '32px' }}>
                <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase' }}>Explore</span>
                <ArrowRight size={20} color="#8B0000" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== 05 · DESTINATION CTA ==================== */}
      <section
        id="destination"
        ref={destinationRef}
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '96px 24px',
          zIndex: 20,
        }}
      >
        <div style={{ maxWidth: '1280px', width: '100%', textAlign: 'center', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
            <Award size={16} color="#8B0000" />
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.5em', color: '#8B0000', textTransform: 'uppercase' }}>
              05 · Destination
            </span>
          </div>

          <h2 style={{
            margin: 0,
            fontFamily: "'Playfair Display', serif",
            fontWeight: 900,
            textTransform: 'uppercase',
            lineHeight: 0.88,
            fontSize: 'clamp(2.8rem, 8.5vw, 7.5rem)',
            letterSpacing: '-0.03em',
          }}>
            READY FOR YOUR <br />
            <span style={{ color: '#8B0000', fontStyle: 'italic', fontWeight: 300 }}>NEXT STEP?</span>
          </h2>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '44px', flexWrap: 'wrap' }}>
            <button
              onClick={() => navigate('/products')}
              style={{
                background: '#111',
                color: 'white',
                padding: '24px 56px',
                border: 'none',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                borderRadius: '14px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '14px',
                boxShadow: '0 15px 35px rgba(0,0,0,0.15)'
              }}
            >
              Shop New Samadhan <ChevronRight size={18} />
            </button>
            <Link
              to="/gallery"
              style={{
                background: 'white',
                color: '#111',
                padding: '24px 44px',
                border: '1px solid rgba(17,17,17,0.15)',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                cursor: 'pointer',
                borderRadius: '14px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              Explore Gallery <Eye size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== ARCHIVAL DROPS CATALOG ==================== */}
      <section style={{ background: '#111', padding: '120px 24px', position: 'relative', zIndex: 60, color: 'white' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto 64px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.6em', color: '#ff4d4d', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
              Archival Drops
            </span>
            <h2 style={{ fontSize: 'clamp(2.4rem, 6vw, 5.5rem)', fontFamily: "'Playfair Display', serif", fontWeight: 900, textTransform: 'uppercase', margin: 0, letterSpacing: '-0.02em' }}>
              THE CATALOG.
            </h2>
          </div>
          <button onClick={() => navigate('/products')} style={{ background: 'transparent', border: '1px solid rgba(247,245,240,0.25)', color: 'white', padding: '16px 28px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px', borderRadius: '12px' }}>
            View All Drops <ArrowRight size={14} />
          </button>
        </div>
        <div className="featured-grid-container" style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px' }}>
          {featuredProducts.map((product) => (
            <div key={product.id} className="product-card-item" onClick={() => setSelectedProduct(product)} style={{ cursor: 'pointer' }}>
              <div style={{ aspectRatio: '3/4', background: '#F7F5F0', borderRadius: '20px', padding: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', position: 'relative' }}>
                <img src={product.image} alt={product.name} style={{ width: '85%', height: 'auto', objectFit: 'contain' }} />
              </div>
              <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <span style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', color: '#ff4d4d', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>{product.category}</span>
                  <h3 style={{ fontSize: '18px', fontFamily: "'Playfair Display', serif", fontWeight: 700, textTransform: 'uppercase', margin: 0, color: '#F7F5F0' }}>{product.name}</h3>
                </div>
                <span style={{ fontSize: '16px', fontWeight: 700, color: '#F7F5F0' }}>₹{product.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== PRODUCT MODAL ==================== */}
      {selectedProduct && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10001, background: 'rgba(17,17,17,0.92)', backdropFilter: 'blur(12px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: 'white', maxWidth: '1000px', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', overflow: 'hidden', position: 'relative', boxShadow: '0 40px 80px rgba(0,0,0,0.5)', borderRadius: '32px', color: '#111' }}>
            <button
              onClick={() => setSelectedProduct(null)}
              style={{ position: 'absolute', top: '24px', right: '24px', zIndex: 20, width: '48px', height: '48px', background: '#F7F5F0', border: 'none', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
            >
              <X size={20} />
            </button>
            <div style={{ background: '#F7F5F0', padding: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
              <img src={selectedProduct.image} alt={selectedProduct.name} style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
            </div>
            <div style={{ padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.4em', color: '#8B0000', textTransform: 'uppercase' }}>Premium Archival</span>
                <h3 style={{ fontSize: '36px', fontFamily: "'Playfair Display', serif", fontWeight: 900, textTransform: 'uppercase', lineHeight: 1, marginTop: '16px' }}>{selectedProduct.name}</h3>
                <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <span style={{ fontSize: '28px', fontWeight: 700 }}>₹{selectedProduct.price}</span>
                  <span style={{ fontSize: '16px', opacity: 0.3, textDecoration: 'line-through' }}>₹{selectedProduct.originalPrice}</span>
                </div>
                <p style={{ fontSize: '13px', opacity: 0.55, fontStyle: 'italic', marginTop: '16px' }}>{selectedProduct.desc}</p>
                <div style={{ marginTop: '32px' }}>
                  <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '12px' }}>Select Size</p>
                  <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    {selectedProduct.sizes.map(sz => (
                      <button
                        key={sz}
                        onClick={() => setActiveSize(sz)}
                        style={{
                          width: '48px', height: '48px', borderRadius: '12px', fontWeight: 700,
                          border: activeSize === sz ? '2px solid #111' : '2px solid rgba(17,17,17,0.1)',
                          background: activeSize === sz ? '#111' : 'white',
                          color: activeSize === sz ? 'white' : '#111',
                          cursor: 'pointer',
                        }}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleAddToCart(selectedProduct)}
                style={{ marginTop: '40px', width: '100%', background: '#111', color: 'white', padding: '22px', border: 'none', borderRadius: '14px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}
              >
                <ShoppingBag size={18} /> Add to Vault
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;