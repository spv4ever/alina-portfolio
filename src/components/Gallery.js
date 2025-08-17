// src/components/Gallery.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MediaDisplay from './MediaDisplay';

// Helper para barajar un array (Algoritmo Fisher-Yates)
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const Gallery = ({ galleryData, onUnlock, isUnlocked }) => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalAssetCount, setTotalAssetCount] = useState(0);

  const { title, description, tag, private: isPrivate } = galleryData;
  const cloudName = 'dirudaby9';

  useEffect(() => {
    const fetchAssets = async () => {
      setLoading(true);
      setError(null);
      try {
        const [imageRes, videoRes] = await Promise.all([
          fetch(`https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`),
          fetch(`https://res.cloudinary.com/${cloudName}/video/list/${tag}.json`)
        ]);

        // Manejamos los errores 404 de Cloudinary: Si no hay un tipo de archivo, usamos un array vacío
        const imageData = imageRes.ok ? await imageRes.json() : { resources: [] };
        const videoData = videoRes.ok ? await videoRes.json() : { resources: [] };
        
        // Mapeamos imágenes y añadimos el tipo
        const formattedImages = imageData.resources.map(image => ({
          id: image.public_id,
          url: `https://res.cloudinary.com/${cloudName}/image/upload/v${image.version}/${image.public_id}.${image.format}`,
          alt: `Imagen de la galería ${title}`,
          resource_type: 'image'
        }));

        // Mapeamos videos y añadimos el tipo
        const formattedVideos = videoData.resources.map(video => ({
          id: video.public_id,
          url: `https://res.cloudinary.com/${cloudName}/video/upload/v${video.version}/${video.public_id}.${video.format}`,
          alt: `Video de la galería ${title}`,
          resource_type: 'video'
        }));

        // Combinamos, barajamos y seleccionamos 3 aleatorios
        const allAssets = [...formattedImages, ...formattedVideos];
        setTotalAssetCount(allAssets.length);
        
        const shuffledAssets = shuffleArray(allAssets);
        const randomThree = shuffledAssets.slice(0, 3);

        setAssets(randomThree);
      } catch (err) {
        // Capturamos errores de red generales
        setError("Hubo un problema al cargar el contenido.");
      } finally {
        setLoading(false);
      }
    };

    // Solo cargamos si es pública o si ya está desbloqueada
    if (!isPrivate || isUnlocked) {
      fetchAssets();
    } else {
      setAssets([]);
    }
  }, [tag, isUnlocked, isPrivate, cloudName, title]);

  const renderGalleryContent = () => {
    if (loading) return <p>Cargando imágenes...</p>;
    if (error) return <p>{error}</p>;
    if (assets.length === 0) return <p>No hay contenido en esta galería todavía.</p>;
    
    return (
      <>
        <div className="image-grid">
          {assets.map(asset => (
            <div key={asset.id} className="image-item">
              <MediaDisplay asset={asset} />
            </div>
          ))}
        </div>
        {/* Solo mostramos el botón si hay más de 3 elementos en total */}
        {totalAssetCount > 3 && (
          <div className="view-all-container">
            <Link to={`/gallery/${tag}`} className="view-all-link">
              Ver todo ({totalAssetCount})
            </Link>
          </div>
        )}
      </>
    );
  };

  return (
    <section className="gallery">
      <h2>{title} {isPrivate && '🔒'}</h2>
      <p className="gallery-description">{description}</p>
      
      {isPrivate && !isUnlocked ? (
        <div className="locked-content">
          <p>Esta galería es privada.</p>
          <button onClick={() => onUnlock(galleryData)}>Desbloquear</button>
        </div>
      ) : (
        renderGalleryContent()
      )}
    </section>
  );
};

export default Gallery;