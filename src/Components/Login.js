import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Import your Firebase auth instance
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(auth, username, password);
      const user = userCredential.user;

      // Fetch user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        localStorage.setItem('userEmail', userData.emailAddress); // Save email or other user data if needed
        localStorage.setItem('userRole', 'user'); // Adjust based on your role logic
        console.log("User logged in:", userData);

        navigate('/'); // Redirect to home or specific route based on user role
        onClose();
      } else {
        setError('User data not found.');
      }
    } catch (error) {
      setError('Invalid credentials. Please try again.');
      console.error("Login error:", error);
    }
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="modal fade show" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header bg-success text-white">
            <h5 className="modal-title">Login</h5>
            <button type="button" className="close text-white" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Username (Email)</label>
                <input
                  type="email"
                  className="form-control"
                  value={username}
                  onChange={handleInputChange(setUsername)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={handleInputChange(setPassword)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success mb-2">Login</button>
              {error && <p className="text-danger">{error}</p>}
            </form>
            <hr />
            <button onClick={() => navigate('/adminlogin')} className="btn btn-warning">
              Login as Admin
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
