import React, { useState } from 'react';
import './Signup.css';

const Login = () => {
  // 1. State to handle login input and errors
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loginMessage, setLoginMessage] = useState('');

  // 2. Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // 3. Validate form input
  const validate = () => {
    let tempErrors = {};
    if (!formData.email) tempErrors.email = 'Email is required';
    if (!formData.password) tempErrors.password = 'Password is required';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  // 4. Submit login data
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        // Simulate API call for login
        // Example: await loginUser(formData);

        setLoginMessage('Login successful!');
      } catch (error) {
        setErrors({ apiError: 'Login failed, please try again' });
      }
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>

      {/* Success message */}
      {loginMessage && <div className="login-message">{loginMessage}</div>}

      <form onSubmit={handleSubmit} className="login-form">
        {/* Email Field */}
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

        {/* Password Field */}
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

        {/* API Error */}
        {errors.apiError && <div className="error-text">{errors.apiError}</div>}

        {/* Submit Button */}
        <button type="submit" className="submit-btn">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
