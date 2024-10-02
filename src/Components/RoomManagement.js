import React, { useState, useEffect } from 'react';
import '../styles/ManageRooms.css';
import { collection, addDoc, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [newRoom, setNewRoom] = useState({
    id: '',
    name: '',
    price: '',
    type: '',
    image: null,
    available: true,
    amenities: '',
    bedType: '',
    rating: ''
  });
  const [error, setError] = useState("");

  const roomTypes = ["Standard", "Deluxe", "Suite"];
  const bedTypes = ["Single", "Double", "Queen", "King"];
  const ratings = [1, 2, 3, 4, 5];

  useEffect(() => {
    const fetchRooms = async () => {
      const roomsCollection = collection(db, 'rooms');
      const roomDocs = await getDocs(roomsCollection);
      const roomsData = roomDocs.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setRooms(roomsData);
    };

    fetchRooms();
  }, []);

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

  const resetForm = () => {
    setNewRoom({ id: '', name: '', price: '', type: '', image: null, available: true, amenities: '', bedType: '', rating: '' });
    setError(""); // Clear error message
  };

  const handleAddRoom = async () => {
    if (!newRoom.name || !newRoom.price || !newRoom.type || !newRoom.image || !newRoom.bedType || !newRoom.rating) {
      setError("Please fill in all fields and upload an image.");
      return;
    }

    try {
      const roomToAdd = {
        ...newRoom,
        price: parseFloat(newRoom.price),
        amenities: newRoom.amenities.split(',').map(item => item.trim()), // Convert to array
      };
      const docRef = await addDoc(collection(db, 'rooms'), roomToAdd);
      setRooms([...rooms, { ...roomToAdd, id: docRef.id }]);
      resetForm();
    } catch (e) {
      setError("Error adding room. Please try again.");
    }
  };

  const handleEditRoom = async () => {
    if (!newRoom.name || !newRoom.price || !newRoom.type || !newRoom.image || !newRoom.bedType || !newRoom.rating) {
      setError("Please fill in all fields and upload an image.");
      return;
    }

    try {
      const roomRef = doc(db, 'rooms', newRoom.id);
      await updateDoc(roomRef, {
        ...newRoom,
        price: parseFloat(newRoom.price),
        amenities: newRoom.amenities.split(',').map(item => item.trim()), // Convert to array
      });
      setRooms(rooms.map(room => (room.id === newRoom.id ? { ...newRoom } : room)));
      resetForm();
    } catch (e) {
      setError("Error updating room. Please try again.");
    }
  };

  const handleDeleteRoom = async (id) => {
    try {
      const roomRef = doc(db, 'rooms', id);
      await deleteDoc(roomRef);
      setRooms(rooms.filter(room => room.id !== id));
    } catch (e) {
      setError("Error deleting room. Please try again.");
    }
  };

  const handleRoomClick = (room) => {
    setNewRoom(room); // Populate form for editing
  };

  const toggleAvailability = (id) => {
    const updatedRooms = rooms.map(room =>
      room.id === id ? { ...room, available: !room.available } : room
    );
    setRooms(updatedRooms);
    const roomRef = doc(db, 'rooms', id);
    updateDoc(roomRef, { available: !updatedRooms.find(r => r.id === id).available });
  };

  return (
    <div className="manage-rooms-container">
      <h2>Manage Rooms</h2>

      <h3>{newRoom.id ? "Edit Room" : "Add New Room"}</h3>
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
        <select
          value={newRoom.type}
          onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
          className="form-input"
        >
          <option value="">Select Room Type</option>
          {roomTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <select
          value={newRoom.bedType}
          onChange={(e) => setNewRoom({ ...newRoom, bedType: e.target.value })}
          className="form-input"
        >
          <option value="">Select Bed Type</option>
          {bedTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <select
          value={newRoom.rating}
          onChange={(e) => setNewRoom({ ...newRoom, rating: e.target.value })}
          className="form-input"
        >
          <option value="">Select Rating</option>
          {ratings.map((rate) => (
            <option key={rate} value={rate}>{rate} Stars</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Amenities (comma separated)"
          value={newRoom.amenities}
          onChange={(e) => setNewRoom({ ...newRoom, amenities: e.target.value })}
          className="form-input"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="form-input"
        />
        <button onClick={newRoom.id ? handleEditRoom : handleAddRoom} className="add-room-btn">
          {newRoom.id ? "Update Room" : "Add Room"}
        </button>
      </div>

      <h3>Existing Rooms</h3>
      <table className="room-table">
        <thead>
          <tr>
            <th>Room Name</th>
            <th>Price (R)</th>
            <th>Type</th>
            <th>Bed Type</th>
            <th>Amenities</th>
            <th>Image</th>
            <th>Rating</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rooms.length > 0 ? rooms.map(room => (
            <tr key={room.id}>
              <td onClick={() => handleRoomClick(room)}>{room.name}</td>
              <td>R{Number(room.price).toFixed(2)}</td>
              <td>{room.type}</td>
              <td>{room.bedType}</td>
              <td>{Array.isArray(room.amenities) ? room.amenities.join(', ') : room.amenities}</td>
              <td><img src={room.image} alt={room.name} width="50" /></td>
              <td>{room.rating} Stars</td>
              <td>
                <button onClick={() => toggleAvailability(room.id)} className="availability-btn">
                  {room.available ? "Room Available" : "Room Unavailable"}
                </button>
              </td>
              <td>
                <button onClick={() => handleRoomClick(room)} className="edit-room-btn">Edit</button>
                <button onClick={() => handleDeleteRoom(room.id)} className="delete-room-btn">Delete</button>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="9">No rooms available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageRooms;
