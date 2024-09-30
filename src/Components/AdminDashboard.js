import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <nav>
        <ul>
          <li><Link to="/admin/managerooms">Manage Rooms</Link></li>
          <li><Link to="/admin/viewbookings">View Bookings</Link></li>
          <li><Link to="/admin/manageusers">Manage Users</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminDashboard;
