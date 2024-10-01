import React, { useState } from 'react';
import '../styles/ManageRooms.css';
import { collection, addDoc } from 'firebase/firestore'; // Import Firestore functions
import { db } from '../firebase'; // Import your Firestore configuration

const ManageRooms = ({ rooms = [], onRoomAdd, onRoomDelete }) => {
  const [newRoom, setNewRoom] = useState({ name: '', price: '', type: '', image: null });
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setNewRoom({ ...newRoom, image: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAddRoom = async () => {
    if (!newRoom.name || !newRoom.price || !newRoom.type || !newRoom.image) {
      setError("Please fill in all fields and upload an image.");
      return;
    }

    try {
      // Add a new document with a generated ID
      const roomToAdd = { ...newRoom, price: parseFloat(newRoom.price) }; // Ensure price is a number
      const docRef = await addDoc(collection(db, 'rooms'), roomToAdd); // Replace 'rooms' with your Firestore collection name
      console.log("Document written with ID: ", docRef.id);

      // Call the parent function to update local state
      onRoomAdd({ ...roomToAdd, id: docRef.id }); // Update local state with the new room including the ID

      setNewRoom({ name: '', price: '', type: '', image: null });
      setError(""); // Clear error message
    } catch (e) {
      console.error("Error adding document: ", e);
      setError("Error adding room. Please try again.");
    }
  };

  const handleDeleteRoom = (id) => {
    onRoomDelete(id); // Use parent function to delete the room
  };

  return (
    <div className="manage-rooms-container">
      <h2>Manage Rooms</h2>

      <h3>Add New Room</h3>
      {error && <div className="error-message">{error}</div>}
      <div className="room-form">
        <input
          type="text"
          placeholder="Room Name"
          value={newRoom.name}
          onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
          className="form-input"
        />
        <input
          type="number"
          placeholder="Price"
          value={newRoom.price}
          onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })}
          className="form-input"
        />
        <input
          type="text"
          placeholder="Room Type"
          value={newRoom.type}
          onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
          className="form-input"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="form-input"
        />
        <button onClick={handleAddRoom} className="add-room-btn">Add Room</button>
      </div>

      <h3>Existing Rooms</h3>
      <table className="room-table">
        <thead>
          <tr>
            <th>Room Name</th>
            <th>Price</th>
            <th>Type</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.length > 0 ? rooms.map(room => (
            <tr key={room.id}>
              <td>{room.name}</td>
              <td>R{Number(room.price).toFixed(2)}</td>
              <td>{room.type}</td>
              <td><img src={room.image} alt={room.name} width="50" /></td>
              <td>
                <button onClick={() => handleDeleteRoom(room.id)} className="delete-room-btn">Delete</button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="5">No rooms available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageRooms;
