// src/components/RoomModal.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Update the import
import '../styles/Modal.css';

const RoomModal = ({ room, onClose }) => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  if (!room) return null;

  const handleCheckout = () => {
    // Navigate to the payment page, passing the room details if necessary
    navigate('/payment', { state: { room } }); // Updated usage
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
            <p className="room-info">Room Type: {room.type}</p>
            <p className="room-info">Max Guests: {room.bedType}</p>
            <p className="room-info">Amenities: {room.amenities}</p>
            <p className="room-price">Price: R{room.price.toFixed(2)}</p>
            <p className="room-rating">
              Rating: <span className="stars">★★★★★</span>
            </p>

            <div className="button-group">
              <button className="view-more-btn" onClick={() => alert('View More clicked!')}>View More</button>
              <button className="checkout-btn" onClick={handleCheckout}>
                Proceed To Checkout R{(room.price).toFixed(2)}
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
