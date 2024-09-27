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
import './App.css';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/room/:id" element={<RoomDetails />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/rooms" element={<RoomManagement />}/>
        <Route path ="/personaldetails" element ={<PersonalDetails/>} />
        <Route path ="/roomcard" element ={<RoomCard/>} />
        <Route path ="paymentpage" element ={<PaymentPage/>} />
      
      </Routes>
      <Footer />
    </>
  );
}

export default App;
