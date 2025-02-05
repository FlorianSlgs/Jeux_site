import React, { useEffect } from 'react';

const AdBanner = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.innerHTML = `
      (function(clrybo){
        var d = document,
            s = d.createElement('script'),
            l = d.scripts[d.scripts.length - 1];
        s.settings = clrybo || {};
        s.src = "//arcticattention.com/bqX.VMsvdyGMlo0jYlW-d/imYfWf5vuRZdXUIo/-ePmh9HuBZ/UYlykmPCTJYcwwNjzZABzENBD/Ept/NgjtAe3-MzD/Mf0/Mcgr";
        s.async = true;
        s.referrerPolicy = 'no-referrer-when-downgrade';
        l.parentNode.insertBefore(s, l);
      })({})
    `;
    script.async = true;
    document.body.appendChild(script);

    // Cleanup the script when the component is unmounted
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
};

export default AdBanner;