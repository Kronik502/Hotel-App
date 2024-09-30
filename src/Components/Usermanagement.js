import React, { useState } from 'react';
import '../styles/Usermanagement.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([
    // Sample user data
    { id: 1, name: 'Admin User', email: 'admin@example.com' },
    { id: 2, name: 'Guest User', email: 'guest@example.com' },
  ]);
  const [newUser, setNewUser] = useState({ name: '', email: '' });

  const handleAddUser = () => {
    setUsers([...users, { id: users.length + 1, ...newUser }]);
    setNewUser({ name: '', email: '' }); // Reset form
  };

  return (
    <div>
      <h2>Manage Users</h2>
      <h3>Add New User</h3>
      <input
        type="text"
        placeholder="User Name"
        value={newUser.name}
        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="User Email"
        value={newUser.email}
        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
      />
      <button onClick={handleAddUser}>Add User</button>

      <h3>Existing Users</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers;
