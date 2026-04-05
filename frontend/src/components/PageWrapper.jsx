import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const PageWrapper = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Advanced Page Entrance
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current,
        { opacity: 0, y: 20, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "expo.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen">
      {children}
    </div>
  );
};

export default PageWrapper;
