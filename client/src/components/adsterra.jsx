import React, { useEffect } from 'react';

const AdComponent = () => {
  useEffect(() => {
    // Définir les options
    window.atOptions = {
      'key': 'c6bd1332f58177333dd6b90cb11a7fe9',
      'format': 'iframe',
      'height': 60,
      'width': 468,
      'params': {}
    };

    // Créer et ajouter le script
    const script = document.createElement('script');
    script.src = '//www.highperformanceformat.com/c6bd1332f58177333dd6b90cb11a7fe9/invoke.js';
    script.async = true;
    
    // Ajouter le script au document
    document.body.appendChild(script);

    // Nettoyage lors du démontage du composant
    return () => {
      document.body.removeChild(script);
    };
  }, []); // Le tableau vide signifie que cela ne s'exécute qu'une fois au montage

  return (
    <div id="ad-container">
      {/* Le script créera l'iframe ici */}
    </div>
  );
};

export default AdComponent;