import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState("fadeIn");
  const curtainRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage("fadeOut");
    }
  }, [location, displayLocation]);

  useEffect(() => {
    if (transitionStage === "fadeOut") {
      const tl = gsap.timeline({
        onComplete: () => {
          setDisplayLocation(location);
          setTransitionStage("fadeIn");
          window.scrollTo(0, 0);
        }
      });

      // Cinematic Clip-Path Entrance
      tl.set(curtainRef.current, {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
        opacity: 1,
        visibility: "visible"
      })
      .to(curtainRef.current, {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 0.5,
        ease: "power2.inOut"
      })
      .to(logoRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      }, "-=0.2");
    } else if (transitionStage === "fadeIn") {
      const tl = gsap.timeline();

      tl.to(logoRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.2,
        ease: "power2.in"
      })
      .to(curtainRef.current, {
        clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
        duration: 0.5,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(curtainRef.current, { visibility: "hidden" });
        }
      });
    }
  }, [transitionStage, location]);

  return (
    <>
      <div
        ref={curtainRef}
        className="fixed inset-0 z-[999999] bg-[#111111] flex items-center justify-center pointer-events-none will-change-[clip-path,opacity]"
        style={{
          visibility: "hidden",
          clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)"
        }}
      >
        <div ref={logoRef} className="text-center opacity-0 translate-y-10">
            <h2 className="text-white text-5xl font-black italic tracking-tighter uppercase">
                New <span className="text-[#d4af37]">Samadhan</span>
            </h2>
            <p className="text-[#d4af37] text-[10px] font-black tracking-[0.8em] uppercase mt-4">Legacy of Comfort</p>
            <div className="w-24 h-1 bg-[#d4af37] mx-auto mt-6"></div>
        </div>
      </div>
      <div className={`transition-opacity duration-700 ${transitionStage === "fadeIn" ? "opacity-100" : "opacity-0"}`}>
        {children(displayLocation)}
      </div>
    </>
  );
};

export default PageTransition;
