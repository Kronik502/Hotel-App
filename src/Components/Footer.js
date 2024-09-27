import React, { useState } from 'react';
import '../styles/Footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Footer() {
  const [formData, setFormData] = useState({
    email: '',
    query: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.query) {
      alert('Please fill in all fields');
    } else {
      // Handle form submission (e.g., send form data to backend)
      alert('Thank you for your enquiry!');
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="social-icons">
          <a href="https://facebook.com" aria-label="Facebook">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" aria-label="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" aria-label="Instagram">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://whatsapp.com" aria-label="WhatsApp">
            <i className="fab fa-whatsapp"></i>
          </a>
        </div>

        <div className="personal-info">
          <img src={require('../images/ceo.jpg')} alt="CEO" className="ceo-image" />
          <p className="ceo-title">CEO</p>
          <p className="ceo-name">Kgabo Kwenaite</p>

        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2024 Deluxe Hotel. All Rights Reserved. Unparalleled luxury, unforgettable experiences.</p>
      </div>
    </footer>
  );
}

export default Footer;
