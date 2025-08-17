// src/pages/BeachPage.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProtectedImage from '../components/ProtectedImage'; // Ojo con la ruta ../

const BeachPage = () => {
  // Estados para manejar los datos, la carga y los errores
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Constantes para tu configuración de Cloudinary
  const cloudName = 'dirudaby9';
  const tag = 'Beach';

  useEffect(() => {
    // Definimos una función asíncrona para obtener los datos
    const fetchImages = async () => {
      try {
        // Esta es la URL mágica de la API de Cloudinary para listar recursos por tag
        const response = await fetch(
          `https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`
        );
        if (!response.ok) {
          throw new Error('La respuesta de la red no fue correcta');
        }
        const data = await response.json();
        

        // Transformamos los datos recibidos para que sea más fácil usarlos
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

    fetchImages();
  }, [cloudName, tag]); // El efecto se vuelve a ejecutar si estos valores cambian

  // Renderizado condicional basado en el estado
  const renderContent = () => {
    if (loading) {
      return <p>Cargando galería...</p>;
    }
    if (error) {
      return <p>Error al cargar la galería: {error}</p>;
    }
    if (images.length === 0) {
      return <p>No se encontraron imágenes con la etiqueta "{tag}".</p>
    }
    return (
    <div className="image-grid">
        {images.map(image => (
        <div key={image.id} className="image-item">
            {/* Reemplaza <img> por <ProtectedImage /> */}
            <ProtectedImage src={image.url} alt={image.alt} />
        </div>
        ))}
    </div>
    );
  };

  return (
    <>
      <Header />
      <div className="beach-page-container">
        <h2>Galería: {tag}</h2>
        <p>Explora todas las fotos con la etiqueta "{tag}".</p>
        <Link to="/" className="back-link">← Volver a la página principal</Link>
        
        <div style={{ marginTop: '20px' }}>
          {renderContent()}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BeachPage;