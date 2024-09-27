// src/PaymentPage.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAmount, setEmail, setError, setSuccess, clearState } from '../redux/slices/PaymentSlice';
import axios from 'axios';

const PaymentPage = () => {
  const dispatch = useDispatch();
  const { amount, email, error, success } = useSelector((state) => state.payment);

  const handlePayment = async (e) => {
    e.preventDefault();
    dispatch(setError(''));
    dispatch(setSuccess(''));

    if (!amount || !email) {
      dispatch(setError('Please fill in all fields.'));
      return;
    }

    try {
      // Replace with your payment gateway API URL
      const response = await axios.post('https://your-payment-gateway-url', {
        amount,
        email,
      });

      if (response.data.status === 'success') {
        dispatch(setSuccess('Payment successful!'));
      } else {
        dispatch(setError('Payment failed. Please try again.'));
      }
    } catch (err) {
      dispatch(setError('An error occurred. Please try again later.'));
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Payment Page</h1>
      <form onSubmit={handlePayment}>
        <div>
          <label htmlFor="amount">Amount (ZAR)</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => dispatch(setAmount(e.target.value))}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
            required
          />
        </div>
        <button type="submit">Pay Now</button>
      </form>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {success && <div style={{ color: 'green' }}>{success}</div>}
    </div>
  );
};

export default PaymentPage;
