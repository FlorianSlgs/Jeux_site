import React, { useEffect } from 'react';

const AdsterraAd = () => {
  useEffect(() => {
    // Crée le premier script pour atOptions
    const atScript = document.createElement('script');
    atScript.type = 'text/javascript';
    atScript.innerHTML = `
      atOptions = {
        'key' : 'c6bd1332f58177333dd6b90cb11a7fe9',
        'format' : 'iframe',
        'height' : 60,
        'width' : 468,
        'params' : {}
      };
    `;

    // Crée le second script pour invoquer le script externe
    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = 'https://www.highperformanceformat.com/c6bd1332f58177333dd6b90cb11a7fe9/invoke.js';

    // Ajoute les scripts au DOM
    document.body.appendChild(atScript);
    document.body.appendChild(invokeScript);

    // Nettoyage des scripts après le démontage du composant
    return () => {
      document.body.removeChild(atScript);
      document.body.removeChild(invokeScript);
    };
  }, []);

  return (
    <div>
      {/* La bannière sera insérée par les scripts */}
      <div id="ad-container"></div>
    </div>
  );
};

export default AdsterraAd;