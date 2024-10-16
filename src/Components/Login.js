import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = ({ onClose }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const users = [
    { username: 'admin@example.com', password: 'admin123', role: 'admin' },
    { username: 'user1', password: 'user123', role: 'user' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = users.find((u) => u.username === username && u.password === password);

    if (user) {
      localStorage.setItem('userRole', user.role);
      navigate(user.role === 'admin' ? '/admin' : '/');
      onClose();
    } else {
      setError('Invalid credentials. Please try again.');
    }
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
                <label>Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-success">Login</button>
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
