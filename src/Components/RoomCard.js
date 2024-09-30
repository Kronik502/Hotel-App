import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Modal.css';

const RoomModal = ({ room, onClose }) => {
  const navigate = useNavigate();

  if (!room) return null;

  const handleCheckout = () => {
    navigate('/paymentpage', { state: { room } });
  };

  // Ensure amenities is treated as an array for .join to work
  const formattedAmenities = Array.isArray(room.amenities)
    ? room.amenities.join(', ')
    : room.amenities;

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
            <p className="room-info">Amenities: {formattedAmenities}</p>
            <p className="room-price">Price: R{room.price.toFixed(2)}</p>
            <p className="room-rating">
              Rating: <span className="stars">★★★★★</span>
            </p>

            <div className="button-group">
              <button className="checkout-btn" onClick={handleCheckout}>
                Proceed To Checkout R{room.price.toFixed(2)}
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
