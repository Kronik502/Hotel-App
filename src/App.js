import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import Footer from './Components/Footer';
import Rooms from './Components/Rooms';
import Contact from './Components/Contact';
import Signup from './Components/Signup';
import Login from './Components/Login';
import RoomDetails from './Components/RoomDetails';
import AdminDashboard from './Components/AdminDashboard';
import RoomManagement from './Components/RoomManagement';
import PersonalDetails from "./Components/PersonalDetails";
import RoomCard from "./Components/RoomCard";
import PaymentPage from './Components/Payment';
import ManageUsers from './Components/Usermanagement';
import AdminLogin from './Components/Adminlogin';
import BookingHistory from './Components/Viewbookings';
import UserProfile from './Components/UserProfile';
import './App.css';
import BookingConfirmation from './Components/Confirmation';
import { BookingProvider } from './Components/BookingContext'; 

function App() {
  return (
    <BookingProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/room/:id" element={<RoomDetails />} />
        
        {/* Admin Routes */}
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/rooms" element={<RoomManagement />} />
        <Route path="/admin/manageusers" element={<ManageUsers />} />
        
        {/* User Management */}
        <Route path="/personaldetails" element={<PersonalDetails />} />
        <Route path="/user/profile" element={<UserProfile />} />
        <Route path="/booking/history" element={<BookingHistory />} />

        {/* Other routes */}
        <Route path="/roomcard" element={<RoomCard />} />
        <Route path="/paymentpage" element={<PaymentPage />} />
        <Route path="/bookingconfirmation/:roomId" element={<BookingConfirmation />} />

        {/* Catch-all route */}
        <Route path="/userprofile" element={<UserProfile />} /> 
      </Routes>
      <Footer />
    </BookingProvider>
  );
}

export default App;
