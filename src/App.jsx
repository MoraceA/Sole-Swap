import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from '../src/pages/Home/HomePage'; 
import CreateAccount from '../src/pages/Authentication/CreateAccount'; 
import Login from '../src/pages/Authentication/Login.jsx';
import AboutUs from '../src/pages/About/AboutUs.jsx';
import Contact from '../src/pages/About/Contact.jsx';
import FAQ from '../src/pages/About/FAQ.jsx';
import Profile from '../src/pages/Account/ProfilePage.jsx';
import Kids from '../src/pages/Shoes/Kids.jsx';
import Mens from '../src/pages/Shoes/Mens.jsx';
import Womens from '../src/pages/Shoes/Womens.jsx';
import Brands from '../src/pages/Shoes/Brands.jsx'
import UserHome from '../src/pages/Home/user_HomePage.jsx';
import UserDashboard from '../src/pages/Account/UserDashboard.jsx';
import ForgotPassword from '../src/pages/Authentication/ForgotPassword';
import UserDashboard from '../src/pages/Account/UserDashboard';
//import SearchResults from '../src/pages/search/SearchResults'; 


function App() {
  return (
    <Router>
      <Routes> 
    
        <Route exact path="/" element={<Homepage />} />
        <Route path="/home" element={<Homepage />} />
        <Route exact path="/createaccount" element={<CreateAccount />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/about" element={<AboutUs/>} />
        <Route exact path="/contact" element={<Contact/>} />
        <Route exact path="/FAQ" element={<FAQ/>} />
        <Route exact path="/profile" element={<Profile/>} />
        <Route exact path="/kid's" element={<Kids/>} />
        <Route exact path="/mens" element={<Mens/>} />
        <Route exact path="/women's" element={<Womens/>} />
        <Route exact path="/brands" element={<Brands/>} />
        <Route exact path="/userhome" element={<UserHome/>} />
        <Route exact path="/dashboard" element={<UserDashboard/>} />

        

      </Routes>
    </Router>
  );
}

export default App;


// <Route path="/" element={<SearchResults />} /> *this should go under the womens route path*







