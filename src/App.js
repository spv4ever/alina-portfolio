// src/App.js
import React, { useState } from 'react';
import Header from './components/Header';
import SocialLinks from './components/SocialLinks';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import CountdownTimer from './components/CountdownTimer';
import PasswordModal from './components/PasswordModal'; // Importar el modal
import galleriesData from './galleries.json';
import './App.css';

// El AdBanner es opcional, lo quito para simplificar pero puedes dejarlo si quieres
import AdBanner from './components/AdBanner';

function App() {
  // Un estado para saber qué galerías ha desbloqueado el usuario
  const [unlockedGalleries, setUnlockedGalleries] = useState([]);

  // Estados para controlar el modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [passwordError, setPasswordError] = useState('');

  // Esta función se llama cuando se hace clic en "Desbloquear"
  const handleUnlockClick = (gallery) => {
    setSelectedGallery(gallery);
    setPasswordError(''); // Limpiar errores anteriores
    setModalOpen(true);
  };

  // Esta función se llama cuando se envía la contraseña desde el modal
  const handlePasswordSubmit = (password) => {
    if (password === selectedGallery.password) {
      // Si la contraseña es correcta, añadimos el título de la galería a la lista de desbloqueadas
      setUnlockedGalleries([...unlockedGalleries, selectedGallery.title]);
      setModalOpen(false); // Cerramos el modal
      setSelectedGallery(null);
    } else {
      // Si es incorrecta, mostramos un error
      setPasswordError('Contraseña incorrecta. Inténtalo de nuevo.');
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedGallery(null);
  }

  return (
    <div className="App">
      {/* Si el modal está abierto, lo mostramos */}
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
            gallery={gallery}
            onUnlock={handleUnlockClick}
            // Pasamos un booleano que indica si esta galería está en la lista de desbloqueadas
            isUnlocked={unlockedGalleries.includes(gallery.title)}
          />
        ))}
      </main>

      <CountdownTimer />
      
      <Footer />
    </div>
  );
}

export default App;