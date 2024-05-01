import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
{/*import Homepage from '../src/pages/Home/HomePage'; */}
import CreateAccount from '../src/pages/Authentication/CreateAccount'; 
import Login from '../src/pages/Authentication/Login.jsx';
import AboutUs from '../src/pages/About/AboutUs.jsx';
import Contact from '../src/pages/About/Contact.jsx';
import FAQ from '../src/pages/About/FAQ.jsx';
import Kids from '../src/pages/Shoes/Kids.jsx';
import Mens from '../src/pages/Shoes/Mens.jsx';
import Womens from '../src/pages/Shoes/Womens.jsx';
import Brands from '../src/pages/Shoes/Brands.jsx'
import Home from '../src/pages/Home/user_HomePage.jsx';
import UserDashboard from '../src/pages/Account/UserDashboard.jsx';
import SearchResults from '../src/pages/search/SearchResults.jsx';
import ProfileForm from '../src/pages/Account/ProfileForm.jsx'
import LikedShoes from '../src/pages/search/likedShoes.jsx';
import Description from '../src/pages/Shoes/Description.jsx';
import Messages from '../src/pages/Home/Messages.jsx';
import TradePage from '../src/pages/Shoes/TradePage.jsx'
import GetStarted from '../src/pages/Started/GetStarted.jsx';



function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<GetStarted/>} />
       {/* <Route path="/home" element={<Homepage />} /> */}
        <Route exact path="/createaccount" element={<CreateAccount />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/about" element={<AboutUs/>} />
        <Route exact path="/contact" element={<Contact/>} />
        <Route exact path="/FAQ" element={<FAQ/>} />
        <Route exact path="/kid's" element={<Kids/>} />
        <Route exact path="/mens" element={<Mens/>} />
        <Route exact path="/women's" element={<Womens/>} />
        <Route exact path="/brands" element={<Brands/>} />
        <Route exact path="/userhome" element={<Home/>} />
        <Route exact path="/SearchResults" element={<SearchResults/>} />
        <Route exact path="/ProfileForm" element={<ProfileForm/>} />
        <Route exact path="/UserDashboard" element={<UserDashboard/>} />
        <Route exact path="/likedShoes" element={<LikedShoes />} />
        <Route exact path="/description" element={<Description />} />

        <Route exact path="/messages" element={<Messages />} /> 
        <Route exact path="/tradepage" element={<TradePage />} /> 

        <Route exact path="/GetStarted" element={<GetStarted />} />

      </Routes>
    </Router>
  );
}

export default App;

