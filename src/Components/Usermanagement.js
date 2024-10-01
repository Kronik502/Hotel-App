import React, { useState, useEffect } from 'react';
import { db } from '../firebase'; // Import Firestore instance
import { collection, getDocs, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import '../styles/Usermanagement.css'; // Professional CSS file

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ id: '', name: '', email: '', cellNumber: '', role: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const userList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          fullNames: doc.data().fullNames || "",
          email: doc.data().emailAddress || "",
          cellNumber: doc.data().cellNumber || "",
          role: doc.data().role || "User",
          status: doc.data().status || "Active",
          createdAt: doc.data().createdAt || null
        }));
        console.log(userList); // Log user data for debugging
        setUsers(userList);
        setLoading(false);
      } catch (error) {
        setError("Error fetching users: " + error.message);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleAddUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.role) {
      alert("Please fill in all fields.");
      return;
    }

    // Here you would normally add the user to Firestore as well
    // e.g., await addDoc(collection(db, 'users'), newUser);
    
    setUsers([...users, { id: users.length + 1, ...newUser }]);
    setNewUser({ id: '', name: '', email: '', cellNumber: '', role: '' }); // Reset form
  };

  const handleEditUser = (user) => {
    setNewUser(user); // Populate the form with the selected user's data
  };

  const handleUpdateUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.role) {
      alert("Please fill in all fields.");
      return;
    }

    const userDocRef = doc(db, 'users', newUser.id);
    await updateDoc(userDocRef, {
      fullNames: newUser.name,
      emailAddress: newUser.email,
      cellNumber: newUser.cellNumber,
      role: newUser.role,
    });

    const updatedUsers = users.map(user =>
      user.id === newUser.id ? { ...user, ...newUser } : user
    );
    setUsers(updatedUsers);
    setNewUser({ id: '', name: '', email: '', cellNumber: '', role: '' }); // Reset form
  };

  const handleRemoveUser = async (id) => {
    await deleteDoc(doc(db, 'users', id));
    setUsers(users.filter(user => user.id !== id));
  };

  return (
    <div className="manage-users-container">
      <h2>Manage Users</h2>

      {loading ? (
        <div className="loading">Loading users...</div>
      ) : error ? (
        <div className="error-text">{error}</div>
      ) : (
        <div className="user-management-content">
          <h3>{newUser.id ? "Edit User" : "Add New User"}</h3>
          <div className="user-form">
            <input
              type="text"
              placeholder="User Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
              className="form-input"
            />
            <input
              type="email"
              placeholder="User Email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              className="form-input"
            />
            <input
              type="text"
              placeholder="Cell Number"
              value={newUser.cellNumber}
              onChange={(e) => setNewUser({ ...newUser, cellNumber: e.target.value })}
              className="form-input"
            />
            <input
              type="text"
              placeholder="User Role"
              value={newUser.role}
              onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
              className="form-input"
            />
            {newUser.id ? (
              <button onClick={handleUpdateUser} className="add-user-btn">Update User</button>
            ) : (
              <button onClick={handleAddUser} className="add-user-btn">Add User</button>
            )}
          </div>

          <h3>Existing Users</h3>
          <table className="user-table">
            <thead>
              <tr>
                <th>Full Names</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Cell Number</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.fullNames}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.status || "Active"}</td>
                  <td>{user.cellNumber}</td>
                  <td>
                    <button onClick={() => handleEditUser(user)} className="edit-user-btn">Edit</button>
                    <button onClick={() => handleRemoveUser(user.id)} className="remove-user-btn">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
