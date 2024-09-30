import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import '../styles/Signup.css'; // Shared CSS styles for both login pages

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Define your admin credentials
  const adminEmail = 'admin@example.com'; // Replace with your admin email
  const adminPassword = 'admin123'; // Replace with your admin password

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if the input credentials match the admin credentials
    if (email === adminEmail && password === adminPassword) {
      // If credentials match, set role in local storage
      localStorage.setItem('userRole', 'admin');
      navigate('/admin'); // Redirect to admin dashboard
    } else {
      // If using Firebase Authentication
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          localStorage.setItem('userRole', 'user'); // Set user role if regular user
          navigate('/'); // Redirect to home or user dashboard
        })
        .catch((error) => {
          setError('Login failed. Please check your credentials.');
          console.error(error);
        });
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter email"
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter password"
            />
          </div>
          <button type="submit" className="auth-button">
            Login
          </button>
        </form>
        {error && <p className="auth-error">{error}</p>}
        <p className="auth-link-text">
          Not an admin? <span onClick={() => navigate('/login')} className="auth-link">Login as User</span>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
