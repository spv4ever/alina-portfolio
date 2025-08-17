// src/components/MediaDisplay.js
import React from 'react';
import ProtectedImage from './ProtectedImage';
import ProtectedVideo from './ProtectedVideo';

const MediaDisplay = ({ asset }) => {
  // Comprobamos el tipo de recurso que nos llega en los datos
  if (asset.resource_type === 'video') {
    return <ProtectedVideo src={asset.url} alt={asset.alt} />;
  }

  // Por defecto, asumimos que es una imagen
  return <ProtectedImage src={asset.url} alt={asset.alt} />;
};

export default MediaDisplay;