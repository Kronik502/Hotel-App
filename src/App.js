// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import Footer from './Components/Footer';
import Rooms from './Components/Rooms';
import Contact from './Components/Contact'; // Import the Contact component
import Signup from './Components/Signup';
import './App.css';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} /> {/* Home route */}
        <Route path="/rooms" element={<Rooms />} /> {/* Rooms route */}
        <Route path="/contact" element={<Contact />} /> {/* Contact route */}
        <Route path="/signup" element={<Signup />}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
