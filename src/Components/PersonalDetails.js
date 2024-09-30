import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import "../styles/PersonalDetails.css";

const PersonalDetails = () => {
  const [avatar, setAvatar] = useState("/path/to/default-avatar.png");
  const [formData, setFormData] = useState({
    fullNames: "",
    surname: "",
    idNumber: "",
    cellphoneNumber: "",
    residentialAddress: "",
    dependantFullNames: "",
    emailAddress: "",
    cellNumber: "",
    residentialAddressLine2: "",
    residentialAddressLine3: "",
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [apiError, setApiError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setFormData(userDoc.data());
          if (userDoc.data().avatar) {
            setAvatar(userDoc.data().avatar);
          }
        } else {
          setApiError("No user data found.");
        }
      } catch (error) {
        setApiError("Error fetching user data: " + error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size < 5 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setApiError("File size exceeds 5MB.");
    }
  };

  const handleEditToggle = () => {
    setIsEditing(prev => !prev);
    if (isEditing) {
      setApiError("");
      setSuccessMessage("");
    }
  };

  const validateFormData = () => {
    const { emailAddress, idNumber } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailAddress)) {
      setApiError("Invalid email address.");
      return false;
    }
    if (!idNumber) {
      setApiError("ID Number is required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const user = auth.currentUser;
    if (!user) {
      setApiError("User not authenticated.");
      return;
    }

    if (!validateFormData()) return;

    setLoading(true);
    try {
      const userId = user.uid;
      await setDoc(doc(db, "users", userId), {
        ...formData,
        avatar,
      });
      setSuccessMessage("Data saved successfully!");
      setApiError(""); 
      setFormData({
        fullNames: "",
        surname: "",
        idNumber: "",
        cellphoneNumber: "",
        residentialAddress: "",
        dependantFullNames: "",
        emailAddress: "",
        cellNumber: "",
        residentialAddressLine2: "",
        residentialAddressLine3: "",
      });

      navigate('/rooms');
    } catch (error) {
      setApiError("Error saving data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="personal-details-container">
      <h2 className="page-title">Enter Your Personal Details</h2>
      {apiError && <div className="error-text">{apiError}</div>}
      {successMessage && <div className="success-text">{successMessage}</div>}

      <div className="photo-section">
        <div className="photo-upload">
          <img src={avatar} alt="User Avatar" className="avatar" />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="file-upload"
          />
          <label htmlFor="file-upload" className="upload-btn">Upload Photo</label>
        </div>
      </div>

      <form className="details-form" onSubmit={handleSubmit}>
        {Object.entries(formData).map(([key, value]) => (
          <div className="input-group" key={key}>
            <label htmlFor={key}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
            <input
              type={key === "emailAddress" ? "email" : "text"}
              name={key}
              value={value}
              onChange={handleChange}
              placeholder={key.replace(/([A-Z])/g, ' $1')}
              id={key}
              disabled={!isEditing} // Disable inputs if not editing
            />
          </div>
        ))}

        <div className="form-buttons">
          <button type="submit" className="submit-btn" disabled={!isEditing}>
            {loading ? "Submitting..." : "Submit"}
          </button>
          <button type="button" className="edit-btn" onClick={handleEditToggle}>
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>
      </form>

      {loading && <div className="loading-spinner">Loading...</div>}
    </div>
  );
};

export default PersonalDetails;
