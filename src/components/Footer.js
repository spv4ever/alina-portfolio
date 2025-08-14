import React from 'react';

const Footer = () => {
  return (
    <footer className="main-footer">
      <p>&copy; {new Date().getFullYear()} Alina. All rights reserved.</p>
      {/* <p>Contact: <a href="mailto:contact@alina-model.com">contact@alina-model.com</a></p> */}
    </footer>
  );
};

export default Footer;