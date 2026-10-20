import React, { useEffect } from 'react';

const AdComponent = ({ adSlot, style = { display: 'block' }, adFormat = 'auto', fullWidthResponsive = true }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('AdSense error:', e);
    }
  }, []);

  return (
    <div className="ad-container my-8 flex justify-center overflow-hidden">
      <ins
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
