// src/redux/paymentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    amount: '',
    email: '',
    error: '',
    success: '',
  },
  reducers: {
    setAmount(state, action) {
      state.amount = action.payload;
    },
    setEmail(state, action) {
      state.email = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setSuccess(state, action) {
      state.success = action.payload;
    },
    clearState(state) {
      state.amount = '';
      state.email = '';
      state.error = '';
      state.success = '';
    },
  },
});

export const { setAmount, setEmail, setError, setSuccess, clearState } = paymentSlice.actions;

export default paymentSlice.reducer;
