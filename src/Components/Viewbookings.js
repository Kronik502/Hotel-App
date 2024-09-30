// src/Components/BookingHistory.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase'; // Ensure this imports your Firestore instance
import { collection, getDocs, query, where } from 'firebase/firestore';

const BookingHistory = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const userEmail = localStorage.getItem('userEmail'); // Assuming you store user email on login

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const q = query(collection(db, 'bookings'), where('userEmail', '==', userEmail));
        const querySnapshot = await getDocs(q);
        const bookingsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBookings(bookingsData);
      } catch (err) {
        setError('Error fetching booking history.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (userEmail) {
      fetchBookings();
    }
  }, [userEmail]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Your Booking History</h2>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              <h3>{booking.roomName}</h3>
              <p>Date: {booking.date}</p>
              <p>Amount: ${booking.amount}</p>
              <p>Status: {booking.status}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingHistory;
