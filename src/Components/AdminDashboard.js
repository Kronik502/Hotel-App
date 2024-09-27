// src/Components/AdminDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="dashboard-links">
        <Link to="/admin/rooms">Manage Rooms</Link>
        <Link to="/admin/bookings">View Bookings</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
