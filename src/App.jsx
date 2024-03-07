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


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/home" element={<Homepage />} />
        <Route exact path="/createaccount" element={<CreateAccount />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/forgot-password" element={<ForgotPassword />} />
        <Route exact path="/UserDashboard" element={<UserDashboard />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/FAQ" element={<FAQ />} />
        <Route exact path="/brands" element={<Brands/>} />
        <Route exact path="/kid's" element={<Kids/>} />
        <Route exact path="/mens" element={<Mens/>} />
        <Route exact path="/women's" element={<Womens/>} />
        <Route path="/displaysearchresults" element={<DisplaySearchResults />} />
      </Routes>
    </Router>
  );
}

export default App;

