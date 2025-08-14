import React from 'react';

const Gallery = ({ title, description, images }) => {
  return (
    <section className="gallery">
      <h2>{title}</h2>
      <p className="gallery-description">{description}</p>
      <div className="image-grid">
        {images.map(image => (
          <div key={image.id} className="image-item">
            <img src={image.url} alt={image.alt} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;