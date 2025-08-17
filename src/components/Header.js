// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="main-header">
      <h1><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Alina</Link></h1>
      <p>Model (21 Years Old)</p>
      {/* Opcional: puedes dejar la <nav> vacía o eliminarla por completo */}
    </header>
  );
};

export default Header;