// src/pages/GalleryDetailPage.js
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProtectedImage from '../components/ProtectedImage';

const GalleryDetailPage = () => {
  // Hook de React Router para leer los parámetros de la URL (nuestro :tag)
  const { tag } = useParams();

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cloudName = 'dirudaby9';

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`);
        if (!response.ok) throw new Error('No se pudo cargar la galería.');
        const data = await response.json();
        
        const formattedImages = data.resources.map(image => ({
          id: image.public_id,
          url: `https://res.cloudinary.com/${cloudName}/image/upload/v${image.version}/${image.public_id}.${image.format}`,
          alt: `Imagen de la galería ${tag}`
        }));
        
        setImages(formattedImages);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (tag) {
      fetchImages();
    }
  }, [tag, cloudName]); // El efecto se ejecuta si el tag en la URL cambia

  const renderContent = () => {
    if (loading) return <p>Cargando galería completa...</p>;
    if (error) return <p>Error: {error}</p>;
    if (images.length === 0) return <p>No se encontraron imágenes con la etiqueta "{tag}".</p>;
    
    return (
      <div className="image-grid">
        {images.map(image => (
          <div key={image.id} className="image-item">
            <ProtectedImage src={image.url} alt={image.alt} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="gallery-detail-container">
        <h2>Galería Completa: {tag}</h2>
        <Link to="/" className="back-link">← Volver a la página principal</Link>
        <div style={{ marginTop: '20px' }}>
          {renderContent()}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GalleryDetailPage;