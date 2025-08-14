import React from 'react';
import Header from './components/Header';
import SocialLinks from './components/SocialLinks';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import galleriesData from './galleries.json'; // Importamos los datos
import './App.css'; // Importamos los estilos

function App() {
  return (
    <div className="App">
      <Header />
      <SocialLinks />
      <main>
        {galleriesData.map((gallery, index) => (
          <Gallery
            key={index}
            title={gallery.title}
            description={gallery.description}
            images={gallery.images}
          />
        ))}
      </main>
      <Footer />
    </div>
  );
}

export default App;