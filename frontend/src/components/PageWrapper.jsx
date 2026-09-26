import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const PageWrapper = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Advanced Page Entrance without leaving persistent CSS transform that breaks position: fixed
    const ctx = gsap.context(() => {
      gsap.fromTo(containerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          clearProps: "transform,scale,translate"
        }
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
