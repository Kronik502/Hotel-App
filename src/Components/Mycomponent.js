import React, { createContext, useContext, useState } from 'react';

const BookingContext = createContext();

const initialBookingDetails = {
  room: null,
  payment: null,
};

export const BookingProvider = ({ children }) => {
  const [bookingDetails, setBookingDetails] = useState(initialBookingDetails);

  const resetBookingDetails = () => setBookingDetails(initialBookingDetails);

  return (
    <BookingContext.Provider value={{ bookingDetails, setBookingDetails, resetBookingDetails }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
