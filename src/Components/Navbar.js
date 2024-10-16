import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, getDoc } from "firebase/firestore";
import '../styles/Navbar.css';

function Navbar({ onOpenContact, onOpenLogin, onOpenSignup }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [error, setError] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            setUserData(userDoc.data());
          } else {
            setError("No user data found.");
          }
        } catch (error) {
          setError("Error fetching user data: " + error.message);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log("User logged out");
    } catch (error) {
      setError("Error logging out: " + error.message);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <NavLink to="/" className="navbar-title">
          <h1>Deluxe</h1> <h2>Hotel</h2>
        </NavLink>
      </div>
      <ul className="navbar-links">
        <li><NavLink to="/" className="nav-link" activeClassName="active">Home</NavLink></li>
        <li><NavLink to="/rooms" className="nav-link" activeClassName="active">Rooms</NavLink></li>
        <li onClick={onOpenContact}><span className="nav-link contact-link">Contact</span></li>
        {user ? (
          <li className="user-avatar" onClick={toggleDropdown}>
            <img 
              src={userData.avatar || "/path/to/default-avatar.png"} 
              alt="User Avatar" 
              aria-label="User Avatar"
              onError={(e) => { e.target.onerror = null; e.target.src = "/path/to/default-avatar.png"; }} // Fallback for broken images
            />
            <div className="user-info">
              <span>{userData.fullNames || "Full Name"}</span>
              <span>{userData.surname || "Surname"}</span>
            </div>
            {dropdownOpen && (
              <div className={`dropdown-menu ${dropdownOpen ? 'show' : ''}`} onMouseLeave={() => setDropdownOpen(false)}>
                <NavLink to="/user/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>View Profile</NavLink>
                <button onClick={handleLogout} className="dropdown-item">Logout</button>
              </div>
            )}
          </li>
        ) : (
          <>
            <li onClick={onOpenLogin}><span className="nav-link login-link">Login</span></li>
            <li onClick={onOpenSignup}><span className="nav-link signup-link">Signup</span></li>
          </>
        )}
      </ul>
      {error && <div className="error-message">{error}</div>}
    </nav>
  );
}

export default Navbar;
