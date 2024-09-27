// src/redux/slices/bookingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
  name: 'bookings',
  initialState: {
    bookings: [],
  },
  reducers: {
    addBooking: (state, action) => {
      state.bookings.push(action.payload);
    },
    updateBooking: (state, action) => {
      const index = state.bookings.findIndex((booking) => booking.id === action.payload.id);
      if (index !== -1) state.bookings[index] = action.payload;
    },
    deleteBooking: (state, action) => {
      state.bookings = state.bookings.filter((booking) => booking.id !== action.payload);
    },
  },
});

export const { addBooking, updateBooking, deleteBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
