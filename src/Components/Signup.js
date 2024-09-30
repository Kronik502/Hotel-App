import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerSuccess } from '../redux/slices/userSlice';
import { auth } from '../firebase'; // Import Firebase Auth
import { createUserWithEmailAndPassword } from 'firebase/auth'; // Import the function to create a user
import '../styles/Signup.css';
import { useDispatch } from 'react-redux';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [apiError, setApiError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const errors = {};
    if (!formData.username) errors.username = 'Username is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.password) errors.password = 'Password is required';
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        // Create user with Firebase
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        // Dispatch success action
        dispatch(registerSuccess({ 
          username: formData.username, 
          email: formData.email 
        }));

        setSuccessMessage('Sign-up successful!');
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        setErrors({});
        setApiError('');

        // Navigate to personal details page
        navigate('/personaldetails');
      } catch (error) {
        setApiError(error.message); // Set API error message
      }
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {apiError && <div className="error-text">{apiError}</div>}

      <form onSubmit={handleSubmit} className="signup-form">
        {/* Form Fields */}
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className={errors.username ? 'error' : ''}
          />
          {errors.username && <span className="error-text">{errors.username}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={errors.password ? 'error' : ''}
          />
          {errors.password && <span className="error-text">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={errors.confirmPassword ? 'error' : ''}
          />
          {errors.confirmPassword && (
            <span className="error-text">{errors.confirmPassword}</span>
          )}
        </div>

        <button type="submit" className="submit-btn">
          Sign Up
        </button>
        <div className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
