import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerSuccess } from '../redux/slices/userSlice';
import { auth } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { db } from '../firebase'; // Import Firestore instance
import { setDoc, doc } from 'firebase/firestore'; // Import Firestore methods
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Signup.css'; // Import your custom CSS

const SignupModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
        // Create user with Firebase Authentication
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        
        // Get user UID
        const userId = userCredential.user.uid;

        // Save user details in Firestore
        await setDoc(doc(db, 'users', userId), {
          emailAddress: formData.email,
          fullNames: formData.email.split('@')[0], // You can modify this as needed
          role: 'User', // Default role
          status: 'Active', // Default status
          createdAt: new Date(),
        });

        dispatch(registerSuccess({ username: formData.email, email: formData.email }));
        setSuccessMessage('Sign-up successful!');
        onClose();
        navigate('/personaldetails');
      } catch (error) {
        setApiError(error.message);
      }
    }
  };

  return (
    <div className="modal fade show" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-primary text-white">
            <h5 className="modal-title">Sign Up</h5>
            <button type="button" className="close text-white" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            {successMessage && <div className="alert alert-success">{successMessage}</div>}
            {apiError && <div className="alert alert-danger">{apiError}</div>}
            <form onSubmit={handleSubmit}>
              {['email', 'password', 'confirmPassword'].map((field, index) => (
                <div className="form-group" key={index}>
                  <label htmlFor={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</label>
                  <input
                    type={field.includes('password') ? 'password' : 'text'}
                    className={`form-control ${errors[field] ? 'is-invalid' : ''}`}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    required
                  />
                  {errors[field] && <div className="invalid-feedback">{errors[field]}</div>}
                </div>
              ))}
              <button type="submit" className="btn btn-primary px-4 py-2 mr-2">Sign Up</button>
              <button type="button" className="btn btn-secondary px-4 py-2" onClick={onClose}>Close</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
