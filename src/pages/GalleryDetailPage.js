// src/pages/GalleryDetailPage.js

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MediaDisplay from '../components/MediaDisplay';

const GalleryDetailPage = () => {
  const { tag } = useParams();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
          alt: `Gallery image ${tag}`,
          resource_type: 'image'
        }));

        // Mapeamos videos y añadimos el tipo
        const formattedVideos = videoData.resources.map(video => ({
          id: video.public_id,
          url: `https://res.cloudinary.com/${cloudName}/video/upload/v${video.version}/${video.public_id}.${video.format}`,
          alt: `Gallery video ${tag}`,
          resource_type: 'video'
        }));

        // Combinamos ambos arrays en uno solo (NO barajamos ni cortamos aquí)
        const allAssets = [...formattedImages, ...formattedVideos];
        setAssets(allAssets);

      } catch (err) {
        setError("There was a problem loading the gallery.");
      } finally {
        setLoading(false);
      }
    };

    if (tag) {
      fetchAssets();
    }
  }, [tag, cloudName]);

  const renderContent = () => {
    if (loading) return <p>Loading full gallery...</p>;
    if (error) return <p>Error: {error}</p>;
    if (assets.length === 0) return <p>No content found with tag "{tag}".</p>;
    
    return (
      <div className="image-grid">
        {assets.map(asset => (
          <div key={asset.id} className="image-item">
            <MediaDisplay asset={asset} />
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="gallery-detail-container">
        <h2>Complete Gallery: {tag}</h2>
        <Link to="/" className="back-link">← Back to main page</Link>
        
        <div style={{ marginTop: '20px' }}>
          {renderContent()}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GalleryDetailPage;