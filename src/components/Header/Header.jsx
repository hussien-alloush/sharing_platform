import React from 'react';

import './Header.css';

const Header = () => {
  return (
     <header className="header">
      <div className="logo">
        <h1>Sharing</h1>
      </div>
      <nav>
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#">Profile</a></li>
          <li><a href="#">Create Post</a></li>
          <li><a href="#">Login/Logout</a></li>
        </ul>
      </nav>
    </header>
  );
};
  

export default Header;