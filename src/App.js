// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GalleryDetailPage from './pages/GalleryDetailPage'; // Importamos la nueva página
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* RUTA DINÁMICA: :tag será reemplazado por "Urban", "Portraits", etc. */}
          <Route path="/gallery/:tag" element={<GalleryDetailPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;