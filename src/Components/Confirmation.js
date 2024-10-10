import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { doc, getDoc, query, collection, where, getDocs } from 'firebase/firestore';
import { useParams, useLocation } from 'react-router-dom';
import '../styles/BookingConfirmation.css';

const BookingConfirmation = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const { checkInDate, checkOutDate } = location.state || {};
  const [room, setRoom] = useState(null);
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      setLoading(true);
      const user = auth.currentUser;

      if (!user) {
        setError('User not authenticated.');
        setLoading(false);
        return;
      }

      try {
        const roomDoc = await getDoc(doc(db, 'rooms', roomId));
        if (roomDoc.exists()) {
          const roomData = { 
            id: roomDoc.id, 
            ...roomDoc.data(), 
            amenities: roomDoc.data().amenities || [] 
          };
          setRoom(roomData);
        } else {
          setError('Room not found.');
          return;
        }

        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUser(userDoc.data());
        } else {
          setError('User not found.');
          return;
        }

        const bookingsQuery = query(collection(db, 'bookings'), where('userId', '==', user.uid));
        const bookingDocs = await getDocs(bookingsQuery);
        const bookings = bookingDocs.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBookingHistory(bookings);

      } catch (err) {
        setError('Error fetching data: ' + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [roomId]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="booking-confirmation-container">
      <h2>Booking Confirmation</h2>
      {room && (
        <div className="room-details">
          <h3>Room Details</h3>
          <img src={room.image} alt={room.name} className="room-image" />
          <p><strong>Name:</strong> {room.name}</p>
          <p><strong>Type:</strong> {room.type}</p>
          <p><strong>Price:</strong> R{room.price.toFixed(2)} per night</p>
          <p><strong>Bed Type:</strong> {room.bedType}</p>
          <p><strong>Amenities:</strong> {room.amenities.length > 0 ? room.amenities.join(', ') : 'No amenities available'}</p>
          <p><strong>Check-In Date:</strong> {checkInDate || 'N/A'}</p>
          <p><strong>Check-Out Date:</strong> {checkOutDate || 'N/A'}</p>
        </div>
      )}

      {user && (
        <div className="user-details">
          <h3>Your Details</h3>
          <p><strong>Full Name:</strong> {user.fullNames} {user.surname}</p>
          <p><strong>ID Number:</strong> {user.idNumber}</p>
          <p><strong>Email:</strong> {user.emailAddress}</p>
          <p><strong>Cellphone:</strong> {user.cellphoneNumber}</p>
          <p><strong>Address:</strong> {user.residentialAddress}</p>
        </div>
      )}

      {bookingHistory.length > 0 ? (
        <div className="booking-history">
          <h3>Your Booking History</h3>
          <ul>
            {bookingHistory.map((booking) => (
              <li key={booking.id}>
                <p><strong>Room Name:</strong> {booking.roomName}</p>
                <p><strong>Check-In:</strong> {booking.checkInDate}</p>
                <p><strong>Check-Out:</strong> {booking.checkOutDate}</p>
                <p><strong>Price:</strong> R{booking.price}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No booking history available.</p>
      )}

      <button className="back-btn" onClick={() => window.history.back()}>Back to Rooms</button>
    </div>
  );
};

export default BookingConfirmation;
