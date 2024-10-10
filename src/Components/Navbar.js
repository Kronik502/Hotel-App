// src/Components/Navbar.js
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { auth, db } from '../firebase'; // Import your Firebase config
import { doc, getDoc } from "firebase/firestore";
import '../styles/Navbar.css';

function Navbar() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({}); // To store user data from Firestore
  const [error, setError] = useState(null); // Error handling
  const [dropdownOpen, setDropdownOpen] = useState(false); // State to manage dropdown visibility

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

    return () => unsubscribe(); // Cleanup subscription
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

  const handleViewProfile = () => {
    // Redirect to profile page or handle view profile action
    console.log("View Profile clicked");
  };

  if (loading) return <div>Loading...</div>; // Loading state

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Deluxe</h1> <h2>Hotel</h2>
      </div>
      <ul className="navbar-links">
        <li><NavLink to="/" activeClassName="active">Home</NavLink></li>
        <li><NavLink to="/rooms" activeClassName="active">Rooms</NavLink></li>
        <li><NavLink to="/contact" activeClassName="active">Contact</NavLink></li>
        {user ? (
          <>
            <li className="user-avatar" onClick={toggleDropdown}>
              <img 
                src={userData.avatar || "/path/to/default-avatar.png"} 
                alt="User Avatar" 
                aria-label="User Avatar"
              />
              <div className="user-info">
                <span>{userData.fullNames || "Full Name"}</span>
                <span>{userData.surname || "Surname"}</span>
              </div>
              {dropdownOpen && (
                <div className="dropdown-menu">
                  <button onClick={handleViewProfile} className="dropdown-item">View Profile</button>
                  <button onClick={handleLogout} className="dropdown-item">Logout</button>
                </div>
              )}
            </li>
          </>
        ) : (
          <li><NavLink to="/signup" activeClassName="active">Signup</NavLink></li>
        )}
      </ul>
      {error && <div className="error-message">{error}</div>} {/* Display error message */}
    </nav>
  );
}

export default Navbar;
