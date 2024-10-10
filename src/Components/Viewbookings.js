// src/Components/BookingHistory.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import '../styles/History.css';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingBooking, setEditingBooking] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingsCollection = collection(db, 'bookings');
        const querySnapshot = await getDocs(bookingsCollection);
        const bookingsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBookings(bookingsData);
      } catch (err) {
        setError('Error fetching booking history.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleEditClick = (booking) => {
    setEditingBooking(booking);
    setUpdatedData({ ...booking });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (id) => {
    try {
      const bookingRef = doc(db, 'bookings', id);
      await updateDoc(bookingRef, updatedData);
      setBookings((prev) => prev.map(booking => (booking.id === id ? updatedData : booking)));
      setEditingBooking(null);
    } catch (err) {
      setError('Error updating booking.');
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>All Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>User Info</th>
              <th>Room Info</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>
                  <strong>Name:</strong> {booking.userName}<br />
                  <strong>Email:</strong> {booking.userEmail}<br />
                  <strong>Phone:</strong> {booking.userPhone}
                </td>
                <td>
                  <strong>Room:</strong> {booking.roomName}<br />
                  <strong>Type:</strong> {booking.roomType}<br />
                  <strong>Price:</strong> ${booking.amount}
                </td>
                <td>{booking.date}</td>
                <td>{booking.status}</td>
                <td>
                  <button onClick={() => handleEditClick(booking)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {editingBooking && (
        <div className="edit-modal">
          <h3>Edit Booking</h3>
          <input
            type="text"
            name="userName"
            value={updatedData.userName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="userEmail"
            value={updatedData.userEmail}
            onChange={handleChange}
          />
          <input
            type="text"
            name="userPhone"
            value={updatedData.userPhone}
            onChange={handleChange}
          />
          <input
            type="text"
            name="roomName"
            value={updatedData.roomName}
            onChange={handleChange}
          />
          <input
            type="text"
            name="roomType"
            value={updatedData.roomType}
            onChange={handleChange}
          />
          <input
            type="number"
            name="amount"
            value={updatedData.amount}
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            value={updatedData.date}
            onChange={handleChange}
          />
          <button onClick={() => handleUpdate(editingBooking.id)}>Save</button>
          <button onClick={() => setEditingBooking(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
