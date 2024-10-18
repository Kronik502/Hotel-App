import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const UserProfile = () => {
  const [userData, setUserData] = useState({
    fullNames: '',
    surname: '',
    idNumber: '',
    cellphoneNumber: '',
    residentialAddress: '',
    dependantFullNames: '',
    emailAddress: '',
    cellNumber: '',
    residentialAddressLine2: '',
    residentialAddressLine3: '',
    avatar: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [file, setFile] = useState(null);

  const userEmail = localStorage.getItem('userEmail');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = doc(db, 'users', userEmail);
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
    setError('');
    setSuccessMessage('');

    try {
      let updatedUserData = { ...userData };

      if (file) {
        const storage = getStorage();
        const avatarRef = ref(storage, `avatars/${userEmail}`);
        await uploadBytes(avatarRef, file);
        const avatarURL = await getDownloadURL(avatarRef);
        updatedUserData.avatar = avatarURL;
      }

      const userDoc = doc(db, 'users', userEmail);
      await updateDoc(userDoc, updatedUserData);
      setSuccessMessage('Profile updated successfully!');
      setIsEditing(false);
      setFile(null); // Clear file input after save
    } catch (err) {
      setError('Error updating user data.');
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div>
      <h2>User Profile</h2>
      {successMessage && <p className="success-text">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        {Object.entries(userData).map(([key, value]) => (
          <div key={key}>
            <label>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}:</label>
            <input
              type={key === 'emailAddress' ? 'email' : 'text'}
              name={key}
              value={value}
              onChange={handleChange}
              disabled={key === 'emailAddress' || !isEditing}
              required={key !== 'dependantFullNames'} // Make dependant optional
            />
          </div>
        ))}
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
        <button type="submit">{isEditing ? 'Save' : 'Edit'}</button>
        {isEditing && (
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        )}
      </form>
      {!isEditing && (
        <button type="button" onClick={() => {
          setIsEditing(true);
          setSuccessMessage(''); // Clear success message when editing
        }}>Edit</button>
      )}
    </div>
  );
};

export default UserProfile;
