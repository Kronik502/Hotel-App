// src/Components/Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Deluxe</h1> <h2>Hotel</h2>
      </div>
      <ul className="navbar-links">
        <li><NavLink to="/" activeClassName="active">Home</NavLink></li>
        <li><NavLink to="/rooms" activeClassName="active">Rooms</NavLink></li>
        <li><NavLink to="/contact" activeClassName="active">Contact</NavLink></li> 
        <li><NavLink to="/signup" activeClassName="active">Signup</NavLink></li> 
      </ul>
    </nav>
  );
}

export default Navbar;
