// src/components/ProtectedVideo.js
import React from 'react';

const ProtectedVideo = ({ src, alt }) => {
  const preventContextMenu = (e) => e.preventDefault();
  const preventDragStart = (e) => e.preventDefault();

  return (
    <video
      src={src}
      // muted y playsInline son cruciales para que el autoplay funcione en la mayoría de navegadores
      muted 
      loop
      autoPlay
      playsInline
      // Deshabilitamos los controles para que no se pueda descargar fácilmente
      controls={false} 
      onContextMenu={preventContextMenu}
      onDragStart={preventDragStart}
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      aria-label={alt}
    />
  );
};

export default ProtectedVideo;