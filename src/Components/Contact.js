import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Contact({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      alert('Message sent successfully!');
      setFormData({ name: '', email: '', message: '' });
      onClose();
    } catch (err) {
      setError('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className="modal fade show" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-info text-white">
            <h5 className="modal-title">Contact Us</h5>
            <button type="button" className="close text-white" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              {['name', 'email', 'message'].map((field, index) => (
                <div className="form-group" key={index}>
                  <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  {field === 'message' ? (
                    <textarea
                      className="form-control"
                      id={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                      required
                    />
                  ) : (
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      className="form-control"
                      id={field}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      placeholder={`Your ${field.charAt(0).toUpperCase() + field.slice(1)}`}
                      required
                    />
                  )}
                </div>
              ))}
              <button type="submit" className="btn btn-info">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
