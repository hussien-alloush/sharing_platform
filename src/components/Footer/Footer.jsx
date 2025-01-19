import React from 'react';

import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
    <div className="footer-links">
      <ul>
        <li><a href="#">About</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </div>
    <div className="social-media">
      <ul>
        <li><a href="#" aria-label="Facebook">Facebook</a></li>
        <li><a href="#" aria-label="Twitter">Twitter</a></li>
        <li><a href="#" aria-label="Instagram">Instagram</a></li>
      </ul>
    </div>
    <p className="footer-note">&copy; 2025 My Website. All rights reserved.</p>
  </footer>
);
};
  

export default Footer;