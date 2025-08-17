// src/pages/HomePage.js
import React, { useState } from 'react';
import Header from '../components/Header';
import SocialLinks from '../components/SocialLinks';
import Gallery from '../components/Gallery';
import Footer from '../components/Footer';
import CountdownTimer from '../components/CountdownTimer';
import PasswordModal from '../components/PasswordModal';
import galleriesData from '../galleries.json';
import AdBanner from '../components/AdBanner';


// Este componente es básicamente tu antiguo App.js
const HomePage = () => {
  const [unlockedGalleries, setUnlockedGalleries] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [passwordError, setPasswordError] = useState('');

  const handleUnlockClick = (gallery) => {
    setSelectedGallery(gallery);
    setPasswordError('');
    setModalOpen(true);
  };

  const handlePasswordSubmit = (password) => {
    if (password === selectedGallery.password) {
      setUnlockedGalleries([...unlockedGalleries, selectedGallery.title]);
      setModalOpen(false);
      setSelectedGallery(null);
    } else {
      setPasswordError('Incorrect password. Please try again.');
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedGallery(null);
  }

  return (
    <>
      {modalOpen && (
        <PasswordModal
          galleryTitle={selectedGallery.title}
          onSubmit={handlePasswordSubmit}
          onClose={handleCloseModal}
          error={passwordError}
        />
      )}

      <Header />
      
      <SocialLinks />
      <AdBanner />
      <main>
        {galleriesData.map((gallery, index) => (
          <Gallery
            key={index}
            // Pasamos el objeto completo de la galería
            galleryData={gallery} 
            onUnlock={handleUnlockClick}
            isUnlocked={unlockedGalleries.includes(gallery.title)}
          />
        ))}
      </main>
      <CountdownTimer />
      <Footer />
    </>
  );
};

export default HomePage;