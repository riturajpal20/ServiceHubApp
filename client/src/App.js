import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Registration from './components/ServicemenRegistration.';
import Services from './components/allservices';
import { Booking } from "./components/booking";
import Navbar from "./components/Navbar";
import Home from "./components/Home.js";
import Login from "./components/Login.js";
import Signup from './components/Signup';
import React from "react";
import About from "./components/about.jsx";
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import BookingComplete from "./components/bookingcomplete";
const AuthContext=React.createContext();
export const backendUrl="https://servicehubb.onrender.com";
// export const backendUrl="http://localhost/5000";
function App() {
  return (
    <Router>
    <Navbar/>
    <Toaster/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/registration" element={<Registration />}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup />}/>
      <Route path="/services" element={<Services />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/bookingcomplete" element={<BookingComplete/>}/>
      <Route path="/about" element={<About/>}/>
    </Routes>
  </Router>
  );
}

export default App;
