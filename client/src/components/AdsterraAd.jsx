import { useEffect } from "react";

const AdsterraAd = () => {
  useEffect(() => {
    // 1️⃣ Créer un script pour la configuration
    const scriptConfig = document.createElement("script");
    scriptConfig.type = "text/javascript";
    scriptConfig.innerHTML = `
      atOptions = {
        'key' : 'c6bd1332f58177333dd6b90cb11a7fe9',
        'format' : 'iframe',
        'height' : 60,
        'width' : 468,
        'params' : {}
      };
    `;
    document.body.appendChild(scriptConfig);

    // 2️⃣ Charger le script d'Adsterra
    const scriptAd = document.createElement("script");
    scriptAd.type = "text/javascript";
    scriptAd.src = "//www.highperformanceformat.com/c6bd1332f58177333dd6b90cb11a7fe9/invoke.js";
    scriptAd.async = true;
    document.body.appendChild(scriptAd);

    // 🧹 Nettoyage lors du démontage du composant
    return () => {
      document.body.removeChild(scriptConfig);
      document.body.removeChild(scriptAd);
    };
  }, []);

  return (
    <div style={{ textAlign: "center", margin: "20px 0" }}>
      <h3>Publicité :</h3>
      <div id="adsterra-container" style={{ width: 468, height: 60 }}></div>
    </div>
  );
};

export default AdsterraAd;