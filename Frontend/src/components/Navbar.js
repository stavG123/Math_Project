import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./CSS/Navbar.css"; // Import CSS for styling

const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        {/* Left Section - Logo */}
        <div className="navbar-left">
          <Link to="/" className="logo">
            <img src="/logo.png" alt="Logo" className="navbar-logo" />
          </Link>
        </div>

        {/* Center Section - Navigation Links */}
        <div className="navbar-center">
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>  {/* Uses React Router navigation */}
            <li><Link to="/swimmer">Swimmer</Link></li> 
            <li><Link to="/team">Team</Link></li>
            <li><Link to="/support">Support</Link></li>
          </ul>
        </div>

        {/* Right Section - Call-to-Action Button */}
        <div className="navbar-right">
          <Link to="/pro" className="cta-button">Swim Predictor PRO</Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
