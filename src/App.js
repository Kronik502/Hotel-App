import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
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
import PersonalDetails from './Components/PersonalDetails';
import RoomCard from './Components/RoomCard';
import PaymentPage from './Components/Payment';
import ManageUsers from './Components/Usermanagement'; // Ensure filename matches
import AdminLogin from './Components/Adminlogin'; // Check filename
import BookingHistory from './Components/Viewbookings'; // Check filename
import UserProfile from './Components/UserProfile';
import './App.css';
import BookingConfirmation from './Components/Confirmation';
import { BookingProvider } from './Components/BookingContext';



function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const openContactModal = () => setIsContactModalOpen(true);
  const closeContactModal = () => setIsContactModalOpen(false);
  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);
  const openSignupModal = () => setIsSignupModalOpen(true);
  const closeSignupModal = () => setIsSignupModalOpen(false);

  return (
    <BookingProvider>
      <>
        <Navbar 
          onOpenContact={openContactModal} 
          onOpenLogin={openLoginModal} 
          onOpenSignup={openSignupModal} 
        />
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Hero />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/room/:id" element={<RoomDetails />} />
          <Route path="/roomcard" element={<RoomCard />} />
          <Route path="/paymentpage" element={<PaymentPage />} />
          <Route path="/bookingconfirmation/:roomId" element={<BookingConfirmation />} />
          
          {/* User Routes */}
          <Route path="/personaldetails" element={<PersonalDetails />} />
          <Route path="/user/profile" element={<UserProfile />} />
          <Route path="/booking/history" element={<BookingHistory />} />

          {/* Admin Routes */}
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/rooms" element={<RoomManagement />} />
          <Route path="/admin/manageusers" element={<ManageUsers />} />
          
        </Routes>
        
        {/* Modals */}
        {isContactModalOpen && <Contact onClose={closeContactModal} />}
        {isLoginModalOpen && <Login onClose={closeLoginModal} />}
        {isSignupModalOpen && <Signup onClose={closeSignupModal} />}
        <Footer />
      </>
    </BookingProvider>
  );
}

export default App;
