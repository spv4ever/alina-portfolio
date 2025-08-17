// src/components/Gallery.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProtectedImage from './ProtectedImage';

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
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalImageCount, setTotalImageCount] = useState(0); // Para saber si mostrar el botón "Ver todas"

  const { title, description, tag, private: isPrivate } = galleryData;
  const cloudName = 'dirudaby9';

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`);
        if (!response.ok) throw new Error('Error al cargar la galería.');
        const data = await response.json();
        
        setTotalImageCount(data.resources.length); // Guardamos el número total de imágenes

        const shuffledResources = shuffleArray(data.resources);
        const randomThree = shuffledResources.slice(0, 3);

        const formattedImages = randomThree.map(image => ({
          id: image.public_id,
          url: `https://res.cloudinary.com/${cloudName}/image/upload/v${image.version}/${image.public_id}.${image.format}`,
          alt: `Imagen de la galería ${title}`
        }));

        setImages(formattedImages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (!isPrivate || isUnlocked) {
      fetchImages();
    } else {
      setImages([]);
    }
  }, [tag, isUnlocked, isPrivate, cloudName, title]);

  const renderGalleryContent = () => {
    if (loading) return <p>Cargando imágenes...</p>;
    if (error) return <p>{error}</p>;
    if (images.length === 0) return <p>No hay imágenes en esta galería todavía.</p>;
    
    return (
      <>
        <div className="image-grid">
          {images.map(image => (
            <div key={image.id} className="image-item">
              <ProtectedImage src={image.url} alt={image.alt} />
            </div>
          ))}
        </div>
        {/* Solo mostramos el botón si hay más de 3 imágenes en total */}
        {totalImageCount > 3 && (
          <div className="view-all-container">
            <Link to={`/gallery/${tag}`} className="view-all-link">
              Ver todas ({totalImageCount})
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