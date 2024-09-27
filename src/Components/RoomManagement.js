// src/Components/RoomManagement.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addRoom, updateRoom, deleteRoom } from '../redux/slices/roomSlice';


const RoomManagement = () => {
  const dispatch = useDispatch();
  const rooms = useSelector((state) => state.rooms.rooms);
  
  const [newRoom, setNewRoom] = useState({ id: '', name: '', price: '', available: true });
  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    setNewRoom({ ...newRoom, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      dispatch(updateRoom(newRoom));
    } else {
      dispatch(addRoom(newRoom));
    }
    setNewRoom({ id: '', name: '', price: '', available: true });
    setEditMode(false);
  };

  const handleEdit = (room) => {
    setNewRoom(room);
    setEditMode(true);
  };

  return (
    <div className="room-management">
      <h2>Room Management</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="id"
          value={newRoom.id}
          onChange={handleChange}
          placeholder="Room ID"
          required
        />
        <input
          type="text"
          name="name"
          value={newRoom.name}
          onChange={handleChange}
          placeholder="Room Name"
          required
        />
        <input
          type="number"
          name="price"
          value={newRoom.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <button type="submit">{editMode ? 'Update Room' : 'Add Room'}</button>
      </form>

      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            {room.name} - ${room.price} - {room.available ? 'Available' : 'Booked'}
            <button onClick={() => handleEdit(room)}>Edit</button>
            <button onClick={() => dispatch(deleteRoom(room.id))}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomManagement;
