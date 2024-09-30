import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Signup.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // List of mock users with roles for demonstration
  const users = [
    { username: 'admin@example.com', password: 'admin123', role: 'admin' },
    { username: 'user1', password: 'user123', role: 'user' },
  ];

  // Handle the form submission for regular user login
  const handleSubmit = (e) => {
    e.preventDefault();

    // Find the user based on entered username and password
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      localStorage.setItem('userRole', user.role);
      if (user.role === 'admin') {
        navigate('/admin'); // Redirect admin to the admin dashboard
      } else {
        navigate('/'); // Redirect regular users to the homepage
      }
    } else {
      setError('Invalid credentials. Please try again.');
    }
  };

  // Function to navigate to the Admin Login Page
  const handleAdminLogin = () => {
    navigate('/adminlogin'); // Navigate to the dedicated admin login page
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-btn">Login</button>
        {error && <p className="error-message">{error}</p>}
      </form>
      <hr />
      {/* Button to redirect to the admin login page */}
      <button onClick={handleAdminLogin} className="admin-login-btn" style={{ marginTop: '10px' }}>
        Login as Admin
      </button>
    </div>
  );
};

export default Login;
