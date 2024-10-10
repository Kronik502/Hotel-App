import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import '../styles/Modal.css';

const RoomModal = ({ room, onClose }) => {
  const navigate = useNavigate();
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [showFullImage, setShowFullImage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleCheckout = () => {
    const user = auth.currentUser;

    if (!checkInDate || !checkOutDate) {
      setErrorMessage('Please select both check-in and check-out dates.');
      return;
    }

    const checkIn = new Date(checkInDate).setHours(0, 0, 0, 0);
    const checkOut = new Date(checkOutDate).setHours(0, 0, 0, 0);

    if (checkIn >= checkOut) {
      setErrorMessage('Check-out date must be after check-in date.');
      return;
    }

    const nights = Math.max((checkOut - checkIn) / (1000 * 60 * 60 * 24), 1);
    if (user) {
      navigate('/paymentpage', { state: { room, nights } });
    } else {
      setErrorMessage('You need to be logged in to proceed. Please log in.');
      // Optionally, you could navigate to the login page here after displaying the message
      navigate('/login');
    }
  };

  const handleCheckInChange = (e) => {
    const value = e.target.value;
    const selectedDate = new Date(value).setHours(0, 0, 0, 0);
    const today = new Date().setHours(0, 0, 0, 0);

    if (selectedDate >= today) {
      setCheckInDate(value);
      if (checkOutDate && selectedDate >= new Date(checkOutDate).setHours(0, 0, 0, 0)) {
        setCheckOutDate('');
        setErrorMessage('Check-out date must be after check-in date.');
      } else {
        setErrorMessage('');
      }
    } else {
      setErrorMessage('Check-in date must be today or in the future.');
    }
  };

  const handleCheckOutChange = (e) => {
    const value = e.target.value;
    const selectedDate = new Date(value).setHours(0, 0, 0, 0);
    const checkInDateObj = new Date(checkInDate).setHours(0, 0, 0, 0);

    if (selectedDate > checkInDateObj) {
      setCheckOutDate(value);
      setErrorMessage('');
    } else {
      setErrorMessage('Check-out date must be after check-in date.');
    }
  };

  const formattedAmenities = Array.isArray(room.amenities)
    ? room.amenities.join(', ')
    : room.amenities || 'N/A';

  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.round(rating);
    return '★'.repeat(filledStars) + '☆'.repeat(totalStars - filledStars);
  };

  const toggleFullImage = () => {
    setShowFullImage((prev) => !prev);
  };

  const calculateTotalPrice = () => {
    if (!checkInDate || !checkOutDate) return '0.00';
    const nights = Math.max((new Date(checkOutDate) - new Date(checkInDate)) / (1000 * 60 * 60 * 24), 1);
    return (room.price * nights).toFixed(2);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="room-card-container">
          <div className="background-image" onClick={toggleFullImage}>
            <img src={room.image} alt={room.name} className="room-image" />
            <div className="hover-info">Click to view full image</div>
          </div>
          {showFullImage && (
            <div className="full-image-modal" onClick={toggleFullImage}>
              <img src={room.image} alt={room.name} className="full-image" />
            </div>
          )}
          <div className="room-details">
            <h3 className="room-title">
              <span className="room-name">{room.name}</span>
            </h3>
            <p className="room-info">Room Type: {room.type || 'N/A'}</p>
            <p className="room-info">Max Guests: {room.maxGuests || 'N/A'}</p>
            <p className="room-info">Amenities: {formattedAmenities}</p>
            <p className="room-price">Price per Night: R{room.price.toFixed(2)}</p>
            <div className="date-selection">
              <label>
                Check-In:
                <input
                  type="date"
                  value={checkInDate}
                  onChange={handleCheckInChange}
                  className="date-input"
                  aria-label="Check-in date"
                />
              </label>
              <label>
                Check-Out:
                <input
                  type="date"
                  value={checkOutDate}
                  onChange={handleCheckOutChange}
                  className="date-input"
                  aria-label="Check-out date"
                />
              </label>
            </div>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <p className="room-total-price">
              Total Price: R{calculateTotalPrice()}
            </p>
            <p className="room-rating">
              Rating: <span className="stars">{renderStars(room.rating || 0)}</span>
            </p>
            <div className="button-group">
              <button
                className="checkout-btn"
                onClick={handleCheckout}
                aria-label="Proceed to checkout"
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
        <button onClick={onClose} className="close-modal" aria-label="Close modal">Close</button>
      </div>
    </div>
  );
};

export default RoomModal;
                                                                                                                                                