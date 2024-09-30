import React, { useState } from 'react';
import '../styles/ManageRooms.css';

const ManageRooms = () => {
  const [rooms, setRooms] = useState([
    // Sample room data
    { id: 1, name: 'Standard Deluxe', price: 1858.99, type: 'Standard Room' },
    { id: 2, name: 'Business Meeting Deluxe', price: 3050.00, type: 'Meeting Room' },
  ]);
  const [newRoom, setNewRoom] = useState({ name: '', price: '', type: '' });

  const handleAddRoom = () => {
    setRooms([...rooms, { id: rooms.length + 1, ...newRoom }]);
    setNewRoom({ name: '', price: '', type: '' }); // Reset form
  };

  return (
    <div>
      <h2>Manage Rooms</h2>
      <h3>Add New Room</h3>
      <input
        type="text"
        placeholder="Room Name"
        value={newRoom.name}
        onChange={(e) => setNewRoom({ ...newRoom, name: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={newRoom.price}
        onChange={(e) => setNewRoom({ ...newRoom, price: e.target.value })}
      />
      <input
        type="text"
        placeholder="Room Type"
        value={newRoom.type}
        onChange={(e) => setNewRoom({ ...newRoom, type: e.target.value })}
      />
      <button onClick={handleAddRoom}>Add Room</button>

      <h3>Existing Rooms</h3>
      <ul>
        {rooms.map(room => (
          <li key={room.id}>
            {room.name} - R{room.price.toFixed(2)} ({room.type})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageRooms;
