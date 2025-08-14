// src/components/AdBanner.js
import React, { useEffect } from 'react';

const AdBanner = () => {
  useEffect(() => {
    // Esta función se ejecutará solo una vez, después de que el componente se monte
    
    // Comprobamos si el script ya existe para no añadirlo múltiples veces
    if (document.getElementById('ad-script-67a88')) {
      return;
    }

    const script = document.createElement('script');

    script.id = 'ad-script-67a88'; // Le damos un id para poder encontrarlo
    script.src = '//cockpiteconomicspayroll.com/67a88038c9879a467e92de3ea448cc98/invoke.js';
    script.async = true;
    script.setAttribute('data-cfasync', 'false');

    // Añadimos el script al final del body
    document.body.appendChild(script);

    // Opcional pero recomendado: Función de limpieza que se ejecuta cuando el componente se desmonta
    return () => {
      const existingScript = document.getElementById('ad-script-67a88');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []); // El array vacío [] asegura que el efecto se ejecute solo una vez

  return (
    <div className="banner-container">
      {/* Este es el div donde el script debería dibujar el anuncio */}
      <div id="container-67a88038c9879a467e92de3ea448cc98"></div>
    </div>
  );
};

export default AdBanner;