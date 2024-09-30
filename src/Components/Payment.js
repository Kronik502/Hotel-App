import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Payment.css';
import Mastercard from '../images/Mastercard.png'; // Update image import

const PaymentPage = () => {
  const location = useLocation();
  const { room } = location.state || {};

  if (!room) return <div>No room details available</div>;

  return (
    <div className="payment-container">
      <h2>PAYMENT</h2>
      <div className="payment-details">
        <p><strong>{room.name}</strong></p>
        <p><strong>Amenities:</strong></p>
        <ul>
          {room.amenities.map((amenity, index) => (
            <li key={index}>{amenity}</li>
          ))}
        </ul>
        <p><strong>Total Price: </strong>R {room.price.toFixed(2)}</p>
      </div>

      <form className="payment-form">
        <div className="input-field">
          <label htmlFor="card-number">Card Number</label>
          <input type="text" id="card-number" placeholder="Card Number" />
        </div>
        <div className="input-group">
          <div className="input-field">
            <label htmlFor="exp">Exp</label>
            <input type="text" id="exp" placeholder="MM/YY" />
          </div>
          <div className="input-field">
            <label htmlFor="cvc">CVC</label>
            <input type="text" id="cvc" placeholder="CVC" />
          </div>
        </div>
        <div className="input-field">
          <label htmlFor="account-holder">Account Holder</label>
          <input type="text" id="account-holder" placeholder="Account Holder Name" />
        </div>

        <div className="payment-icons">
          <img src={Mastercard} alt="MasterCard" /> {/* Use imported image */}
        </div>

        <button type="submit" className="pay-button">PAY R {room.price.toFixed(2)}</button>
      </form>
    </div>
  );
};

export default PaymentPage;
