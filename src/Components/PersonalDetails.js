import React, { useState } from "react";
import "../styles/PersonalDetails.css"; // Create a CSS file for styling

const PersonalDetails = () => {
  const [avatar, setAvatar] = useState("/path/to/default-avatar.png"); // Default avatar
  const [formData, setFormData] = useState({
    fullNames: "",
    surname: "",
    idNumber: "",
    cellphoneNumber: "",
    residentialAddress: "",
    dependantFullNames: "",
    emailAddress: "",
    cellNumber: ""
  });
  
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to a server)
    console.log("Form submitted:", formData);
  };

  return (
    <div className="personal-details-container">
      <h2 className="page-title">Enter Your Personal Details</h2>
      <div className="photo-section">
        <div className="photo-upload">
          <img src={avatar} alt="User Avatar" className="avatar" />
          <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} id="file-upload" />
          <label htmlFor="file-upload" className="upload-btn">Upload Photo</label>
        </div>
      </div>
      
      <form className="details-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Full Names</label>
          <input type="text" name="fullNames" value={formData.fullNames} onChange={handleChange} disabled={!isEditing} placeholder="Full Names" />
        </div>
        <div className="input-group">
          <label>Surname</label>
          <input type="text" name="surname" value={formData.surname} onChange={handleChange} disabled={!isEditing} placeholder="Surname" />
        </div>
        <div className="input-group">
          <label>ID Number</label>
          <input type="text" name="idNumber" value={formData.idNumber} onChange={handleChange} disabled={!isEditing} placeholder="ID Number" />
        </div>
        <div className="input-group">
          <label>Cellphone Number</label>
          <input type="text" name="cellphoneNumber" value={formData.cellphoneNumber} onChange={handleChange} disabled={!isEditing} placeholder="Cellphone Number" />
        </div>
        <div className="input-group">
          <label>Residential Address</label>
          <input type="text" name="residentialAddress" value={formData.residentialAddress} onChange={handleChange} disabled={!isEditing} placeholder="Residential Address" />
          <input type="text" name="residentialAddress" value={formData.residentialAddress} onChange={handleChange} disabled={!isEditing} placeholder="Line Address 2" />
          <input type="text" name="residentialAddress" value={formData.residentialAddress} onChange={handleChange} disabled={!isEditing} placeholder="Line Address 3" />
        </div>
        <div className="input-group">
          <label>Dependant Full Names</label>
          <input type="text" name="dependantFullNames" value={formData.dependantFullNames} onChange={handleChange} disabled={!isEditing} placeholder="Dependant Full Names" />
        </div>
        <div className="input-group-row">
          <div className="input-group">
            <label>Email Address</label>
            <input type="email" name="emailAddress" value={formData.emailAddress} onChange={handleChange} disabled={!isEditing} placeholder="Email Address" />
          </div>
          <div className="input-group">
            <label>Cell Number</label>
            <input type="text" name="cellNumber" value={formData.cellNumber} onChange={handleChange} disabled={!isEditing} placeholder="Cell Number" />
          </div>
        </div>
        
        <div className="form-buttons">
          <button type="submit" className="submit-btn" disabled={!isEditing}>Submit</button>
          <button type="button" className="edit-btn" onClick={handleEditToggle}>{isEditing ? "Cancel" : "Edit"}</button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetails;
