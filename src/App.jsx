import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from '../src/pages/Home/HomePage'; 
import CreateAccount from '../src/pages/Authentication/CreateAccount'; 
import Login from '../src/pages/Authentication/Login'; 
import Profile from '../src/pages/Account/ProfilePage.jsx';
import Contact from '../src/pages/About/Contact.jsx';
import About from '../src/pages/About/AboutUs.jsx';
import FAQ from '../src/pages/About/FAQ.jsx';
import Brands from '../src/pages/Shoes/Brands.jsx';
import Kids from '../src/pages/Shoes/Kids.jsx';
import Mens from '../src/pages/Shoes/Mens.jsx';
import Womens from '../src/pages/Shoes/Womens.jsx';
import ForgotPassword from '../src/pages/Authentication/ForgotPassword';
import UserDashboard from '../src/pages/Account/UserDashboard';
//import SearchResults from '../src/pages/search/SearchResults'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/createaccount" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/mens" element={<Mens />} />
        <Route path="/womens" element={<Womens />} />

      </Routes>
    </Router>
  );
}

export default App;

// <Route path="/" element={<SearchResults />} /> *this should go under the womens route path*






