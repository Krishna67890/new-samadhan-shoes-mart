import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useLocation } from 'react-router-dom';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    // Initial state
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    const moveCursor = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.4,
        ease: "power3.out"
      });
    };

    const handleMouseEnter = () => {
      gsap.to(cursor, { scale: 0.5, backgroundColor: "#8B0000", duration: 0.3 });
      gsap.to(follower, { scale: 2.5, borderColor: "#8B0000", backgroundColor: "rgba(139,0,0,0.05)", duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, { scale: 1, backgroundColor: "#111111", duration: 0.3 });
      gsap.to(follower, { scale: 1, borderColor: "#111111/30", backgroundColor: "transparent", duration: 0.3 });
    };

    const addListeners = () => {
      const interactiveElements = document.querySelectorAll('button, a, input, textarea, [role="button"], .group');
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnter);
        el.addEventListener('mouseleave', handleMouseLeave);
      });
    };

    window.addEventListener('mousemove', moveCursor);

    // Initial listeners
    addListeners();

    // Re-add listeners on DOM changes (important for React apps)
    const observer = new MutationObserver(() => {
      addListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    // Handle cursor active state
    const handleFirstMove = () => {
      document.body.classList.add('custom-cursor-active');
      window.removeEventListener('mousemove', handleFirstMove);
    };
    window.addEventListener('mousemove', handleFirstMove);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousemove', handleFirstMove);
      observer.disconnect();
      document.body.classList.remove('custom-cursor-active');
    };
  }, [location]); // Re-run on route change to ensure new elements get listeners

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed w-2 h-2 rounded-full pointer-events-none z-[10000] hidden md:block bg-[#111111]"
      />
      <div
        ref={followerRef}
        className="fixed w-8 h-8 border border-[#111111]/20 rounded-full pointer-events-none z-[9999] hidden md:block"
      />
    </>
  );
};

export default CustomCursor;
