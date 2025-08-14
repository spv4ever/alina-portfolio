// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
// 1. Asegúrate de que esta línea esté presente
import { HelmetProvider } from 'react-helmet-async'; 
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* 2. Asegúrate de que <App /> esté envuelto por <HelmetProvider> */}
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);