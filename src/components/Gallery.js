// src/components/Gallery.js
import React from 'react';

const Gallery = ({ gallery, onUnlock, isUnlocked }) => {
  const isPrivate = gallery.private;

  return (
    <section className="gallery">
      <h2>{gallery.title} {isPrivate && '🔒'}</h2>
      <p className="gallery-description">{gallery.description}</p>
      
      {isPrivate && !isUnlocked ? (
        <div className="locked-content">
          <p>This gallery is private. If you want access, ask me on Instagram</p>
          <button onClick={() => onUnlock(gallery)}>Unblock</button>
        </div>
      ) : (
        <div className="image-grid">
          {gallery.images.map(image => (
            <div key={image.id} className="image-item">
              <img src={image.url} alt={image.alt} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Gallery;