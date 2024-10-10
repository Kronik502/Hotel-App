import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import InputMask from 'react-input-mask';
import { useBooking } from '../Components/BookingContext';
import Mastercard from '../images/Mastercard.png';
import '../styles/Payment.css';

const PaymentPage = () => {
  const { state } = useLocation();
  const { room, nights } = state || {};
  const totalPrice = (room?.price * nights).toFixed(2); // Calculate total price based on room price and nights

  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    cardholderName: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  const { setBookingDetails } = useBooking();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateInputs = () => {
    const { cardNumber, expiryDate, cvc, cardholderName } = formData;
    if (!cardNumber || !expiryDate || !cvc || !cardholderName) {
      return 'Please fill out all fields correctly.';
    }
    if (!validateCardNumber(cardNumber)) return 'Invalid card number.';
    if (!validateExpiryDate(expiryDate)) return 'Invalid expiry date.';
    if (!validateCVC(cvc)) return 'Invalid CVC.';
    return '';
  };

  const validateCardNumber = (number) => /^[0-9]{16}$/.test(number.replace(/\s/g, ''));
  const validateExpiryDate = (date) => {
    const [month, year] = date.split('/');
    const currentDate = new Date();
    return (
      month > 0 && month <= 12 &&
      (year > currentDate.getFullYear() % 100 ||
      (year === currentDate.getFullYear() % 100 && month >= currentDate.getMonth() + 1))
    );
  };

  const validateCVC = (cvc) => /^[0-9]{3}$/.test(cvc);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setConfirmation(true);
  };

  const confirmPayment = () => {
    setLoading(true);
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      payment: { ...formData },
    }));

    // Simulate a network request (replace with actual payment processing logic)
    setTimeout(() => {
      setLoading(false);
      navigate(`/bookingconfirmation/${room?.id || 'default-room-id'}`);
    }, 2000);
  };

  return (
    <div className="payment-container">
      <h2>Payment Page</h2>
      <form onSubmit={handlePaymentSubmit} className="payment-form">
        <div className="input-group">
          <img src={Mastercard} alt="MasterCard Logo" className="card-logo" />
          <label htmlFor="cardholderName">Cardholder Name</label>
          <input
            type="text"
            name="cardholderName"
            id="cardholderName"
            value={formData.cardholderName}
            onChange={handleChange}
            placeholder="Name on Card"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="cardNumber">Card Number</label>
          <InputMask
            mask="9999 9999 9999 9999"
            name="cardNumber"
            id="cardNumber"
            value={formData.cardNumber}
            onChange={handleChange}
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="expiryDate">Expiry Date</label>
          <InputMask
            mask="99/99"
            name="expiryDate"
            id="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            placeholder="MM/YY"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="cvc">CVC</label>
          <InputMask
            mask="999"
            name="cvc"
            id="cvc"
            value={formData.cvc}
            onChange={handleChange}
            placeholder="123"
            required
          />
        </div>
        <div className="input-group">
          <label>Total Amount (R)</label>
          <div className="amount-display">
            R{totalPrice} {/* Display the calculated total amount */}
          </div>
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-button">Submit Payment</button>
      </form>

      {confirmation && (
        <div className="confirmation-modal">
          <h3>Confirm Payment</h3>
          <p>Cardholder: {formData.cardholderName}</p>
          <p>Amount: R{totalPrice}</p> {/* Display the total price again in confirmation */}
          <button onClick={confirmPayment} className="confirm-button">Confirm</button>
          <button onClick={() => setConfirmation(false)} className="cancel-button">Cancel</button>
        </div>
      )}

      {loading && <div className="loading-indicator">Processing payment...</div>}
    </div>
  );
};

export default PaymentPage;
