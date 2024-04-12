// Navbar.js

import React from "react";
import './Navbar.css';
import profileGif from "./profile.gif";
const Navbar = ({ showBackButton }) => {
  return (
    <nav className="navbar">
        <div className="gif-container">
        {/* GIF on the right side */}
        <img src={profileGif} alt="Profile GIF" className="profile-gif" />
      </div>
      <div className="profile">
        {/* Admin profile information */}
        <span>Admin Profile</span>
      </div>
      {showBackButton && (
        <div className="back-button">
          {/* Back button */}
          <button>Back</button>
        </div>
      )}
      
    </nav>
  );
};

export default Navbar;
