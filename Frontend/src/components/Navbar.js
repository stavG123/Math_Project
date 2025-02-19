import React from "react";
import "./CSS/Navbar.css"; // Import CSS for styling

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Left Section - Logo */}
      <div className="navbar-left">
        <a href="/" className="logo">Swim Predictor</a>
      </div>

      {/* Center Section - Navigation Links */}
      <div className="navbar-center">
        <ul className="nav-links">
          <li><a href="/vsl">VSL</a></li>
          <li><a href="/team">Team</a></li>
          <li><a href="/swimmer">Swimmer</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/support">Support</a></li>
        </ul>
      </div>

      {/* Right Section - Call-to-Action Button */}
      <div className="navbar-right">
        <a href="/pro" className="cta-button">Swim Predictor PRO</a>
      </div>
    </nav>
  );
};

export default Navbar;
