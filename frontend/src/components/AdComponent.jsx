import React, { useEffect, useRef } from 'react';

const AdComponent = ({ adSlot, style = { display: 'block' }, adFormat = 'auto', fullWidthResponsive = true }) => {
  const adRef = useRef(null);

  useEffect(() => {
    let retryInterval = null;
    let retries = 0;
    const MAX_RETRIES = 10;

    const pushAd = () => {
      try {
        if (!adRef.current) return;

        // 1. Check if AdSense script is loaded/ready
        if (!window.adsbygoogle) {
          if (retries < MAX_RETRIES) {
            retries++;
            setTimeout(pushAd, 1000); // Wait longer for script load
          }
          return;
        }

        // 2. Prevent duplicate initialization
        const status = adRef.current.getAttribute('data-adsbygoogle-status');
        if (status === 'done' || status === 'processed' || adRef.current.innerHTML.trim().length > 0) {
          return;
        }

        // 3. Ensure width is available and element is actually visible in DOM
        const width = adRef.current.offsetWidth;
        if (width > 0) {
          // Final check to prevent race conditions
          if (!adRef.current.getAttribute('data-adsbygoogle-status')) {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          }
        } else {
          // Retry logic if width is not yet available (common on slow refreshes or hidden tabs)
          if (!retryInterval && retries < MAX_RETRIES) {
            retryInterval = setInterval(() => {
              retries++;
              if (adRef.current && adRef.current.offsetWidth > 0) {
                if (!adRef.current.getAttribute('data-adsbygoogle-status')) {
                  try {
                    (window.adsbygoogle = window.adsbygoogle || []).push({});
                  } catch (innerErr) {
                    // Silent catch for internal AdSense settling
                  }
                }
                clearInterval(retryInterval);
              }
              if (retries >= MAX_RETRIES) clearInterval(retryInterval);
            }, 1000);
          }
        }
      } catch (e) {
        // Silencing common AdSense initialization noise during page transitions/refreshes
        if (process.env.NODE_ENV === 'development') {
          console.debug('AdSense init (expected during refresh):', e.message);
        }
      }
    };

    // Delay initialization to allow React DOM and CSS to fully settle
    const timer = setTimeout(pushAd, 2000);

    return () => {
      clearTimeout(timer);
      if (retryInterval) clearInterval(retryInterval);
    };
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
