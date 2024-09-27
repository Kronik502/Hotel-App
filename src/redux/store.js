// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import roomReducer from './slices/roomSlice';
import paymentReducer from './slices/PaymentSlice';


export const store = configureStore({
  reducer: {
    users: userReducer,
    rooms: roomReducer,
    payment: paymentReducer,
  },
});

export default store;
