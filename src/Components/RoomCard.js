import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Import your firebase auth
import '../styles/Modal.css';

const RoomModal = ({ room, onClose }) => {
  const navigate = useNavigate();

  if (!room) return null;

  const handleCheckout = () => {
    const user = auth.currentUser; // Check if user is logged in

    if (user) {
      // User is logged in, proceed to payment page
      navigate('/paymentpage', { state: { room } });
    } else {
      // User is not logged in, redirect to login page
      navigate('/login'); // Change to your actual login route
    }
  };

  // Ensure amenities is treated as an array for .join to work
  const formattedAmenities = Array.isArray(room.amenities)
    ? room.amenities.join(', ')
    : room.amenities;

  // Create a dynamic rating display
  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.round(rating);
    return '★'.repeat(filledStars) + '☆'.repeat(totalStars - filledStars);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="room-card-container">
          <div className="background-image">
            <img src={room.image} alt={room.name} className="room-image" />
          </div>
          <div className="room-details">
            <h3 className="room-title">
              <span className="room-name">{room.name}</span>
            </h3>
            <p className="room-info">Room Type: {room.type || 'N/A'}</p>
            <p className="room-info">Max Guests: {room.maxGuests || 'N/A'}</p>
            <p className="room-info">Amenities: {formattedAmenities || 'N/A'}</p>
            <p className="room-price">Price: R{room.price ? room.price.toFixed(2) : '0.00'}</p>
            <p className="room-rating">
              Rating: <span className="stars">{renderStars(room.rating || 0)}</span>
            </p>

            <div className="button-group">
              <button className="checkout-btn" onClick={handleCheckout}>
                Proceed To Checkout R{room.price ? room.price.toFixed(2) : '0.00'}
              </button>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="close-modal">Close</button>
      </div>
    </div>
  );
};

export default RoomModal;
