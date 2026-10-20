import React, { useEffect, useRef } from 'react';

const AdComponent = ({ adSlot, style = { display: 'block' }, adFormat = 'auto', fullWidthResponsive = true }) => {
  const adRef = useRef(null);

  useEffect(() => {
    const pushAd = () => {
      try {
        if (window.adsbygoogle && adRef.current && !adRef.current.getAttribute('data-adsbygoogle-status')) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (e) {
        console.error('AdSense error:', e);
      }
    };

    // Small delay to ensure the DOM is fully rendered and has width
    const timer = setTimeout(pushAd, 500);
    return () => clearTimeout(timer);
  }, [adSlot]);

  return (
    <div className="ad-container my-8 flex justify-center overflow-hidden w-full min-h-[90px]">
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={style}
        data-ad-client="ca-pub-1889923922299467"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive.toString()}
      ></ins>
    </div>
  );
};

export default AdComponent;
