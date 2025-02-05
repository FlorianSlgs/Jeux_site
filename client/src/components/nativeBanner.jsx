import React, { useEffect } from 'react';

const NativeBanner = () => {
  useEffect(() => {
    // Créez une balise script
    const script = document.createElement('script');
    script.src = '//pl25778275.profitablecpmrate.com/81342dbb2838e4cd69b11cd16c157382/invoke.js';
    script.async = true;
    script.setAttribute('data-cfasync', 'false');

    // Insérez la balise script dans le DOM
    const container = document.getElementById('container-81342dbb2838e4cd69b11cd16c157382');
    if (container) {
      container.appendChild(script);
    }

    // Nettoyage lorsque le composant est démonté
    return () => {
      if (container) {
        container.removeChild(script);
      }
    };
  }, []);

  return <div id="container-81342dbb2838e4cd69b11cd16c157382"></div>;
};

export default NativeBanner;