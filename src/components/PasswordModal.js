// src/components/PasswordModal.js
import React, { useState } from 'react';

const PasswordModal = ({ galleryTitle, onSubmit, onClose, error }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue
    onSubmit(password);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h3>Private gallery, only for best friends</h3>
        <p>Enter the password to view the gallery "{galleryTitle}"</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Keyword"
            autoFocus
          />
          <button type="submit">Unblock</button>
        </form>
        {error && <p className="modal-error">{error}</p>}
      </div>
    </div>
  );
};

export default PasswordModal;