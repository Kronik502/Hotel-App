// src/Components/UserProfile.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    avatar: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState(null); // To store the selected file

  const userEmail = localStorage.getItem('userEmail'); // Assuming you store user email on login

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = doc(db, 'users', userEmail); // Assuming user email is used as document ID
        const docSnap = await getDoc(userDoc);
        
        if (docSnap.exists()) {
          setUserData(docSnap.data());
        } else {
          setError('User not found.');
        }
      } catch (err) {
        setError('Error fetching user data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchUserData();
    }
  }, [userEmail]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Upload avatar to Firebase Storage
      if (file) {
        const storage = getStorage();
        const avatarRef = ref(storage, `avatars/${userEmail}`); // Use email as the filename
        await uploadBytes(avatarRef, file);

        // Get the download URL
        const avatarURL = await getDownloadURL(avatarRef);
        userData.avatar = avatarURL; // Add avatar URL to userData
      }

      // Update user data in Firestore
      const userDoc = doc(db, 'users', userEmail);
      await updateDoc(userDoc, userData);
      setIsEditing(false);
    } catch (err) {
      setError('Error updating user data.');
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>User Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            disabled={!isEditing}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            disabled={!isEditing}
            required
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            disabled={!isEditing}
            required
          />
        </div>
        <div>
          <label>Avatar:</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*"
            disabled={!isEditing}
          />
          {userData.avatar && (
            <img
              src={userData.avatar}
              alt="Avatar"
              style={{ width: '100px', height: '100px', borderRadius: '50%' }}
            />
          )}
        </div>
        {isEditing ? (
          <button type="submit">Save</button>
        ) : (
          <button type="button" onClick={() => setIsEditing(true)}>Edit</button>
        )}
      </form>
    </div>
  );
};

export default UserProfile;
