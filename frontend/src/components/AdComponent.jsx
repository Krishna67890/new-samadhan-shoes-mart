import React, { useEffect, useRef } from 'react';

const AdComponent = ({ adSlot, style = { display: 'block' }, adFormat = 'auto', fullWidthResponsive = true }) => {
  const adRef = useRef(null);

  useEffect(() => {
    const pushAd = () => {
      try {
        if (window.adsbygoogle && adRef.current) {
          // Prevent duplicate initialization
          if (adRef.current.getAttribute('data-adsbygoogle-status')) {
            return;
          }

          // Ensure the element is visible and has width to prevent "availableWidth=0" error
          if (adRef.current.offsetWidth > 0) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } else {
            // If width is 0, wait for a bit and try again (up to a few times)
            let retries = 0;
            const retryInterval = setInterval(() => {
              retries++;
              if (adRef.current && adRef.current.offsetWidth > 0) {
                (window.adsbygoogle = window.adsbygoogle || []).push({});
                clearInterval(retryInterval);
              }
              if (retries > 5) clearInterval(retryInterval); // Stop after 5 retries
            }, 1000);
          }
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
