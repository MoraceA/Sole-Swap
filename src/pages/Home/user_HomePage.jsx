import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../Home/home.css';
import { signOut } from "firebase/auth";
import { getAuth } from "firebase/auth"; 

import { auth } from '/Users/shaniabrown/Documents/GitHub/Sole-Swap/src/firebase.js';



function Homepage() {
  const carouselItems = [
    { id: 1, imageUrl: 'src/assets/c3.jpg', text: 'Shoe 1' },
    { id: 2, imageUrl: 'src/assets/c1.jpg', text: 'Shoe 2' },
    { id: 3, imageUrl: 'src/assets/c2.jpg', text: 'Shoe 3' },
  ];

  function handleLogout() {
    window.localStorage.removeItem("isLoggedIn");
    if (window.confirm('Are you sure you want to log out?')) { // Use window.confirm for confirmation dialog
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          console.log('User signed out successfully');
        })
        .catch((error) => {
          // An error happened.
          console.error('Error signing out:', error);
        });
    }
  }

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div id="root">
      {/* Header Section */}
      <div className="header-content">
        <div>
          <img src="src/assets/SOLE SWAP.png" alt="Sole Swap Logo" className="logo" />
        </div>

        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>

        <div className="sign-up-login">
          <button>❤️</button>
          <button><a href="/UserDashboard">👤</a></button>
          <button onClick={handleLogout}>Logout</button> {/* Attach onClick event handler */}
        </div>
      </div>

      {/* Navigation Section */}
      <nav>
        <ul>
          <li><a href="/women's">Women's</a></li>
          <li><a href="/mens">Men's</a></li>
          <li><a href="/kid's">Kids</a></li>
          <li><a href="/brands">Brands</a></li>
        </ul>
      </nav>

      {/* Carousel Section */}
      <div className="carousel-container">
        <Slider {...carouselSettings}>
          {carouselItems.map((item) => (
            <div key={item.id}>
              <img
                src={item.imageUrl}
                alt={`Slide ${item.id}`}
                style={{ width: '800px', height: '400px' }}
              />
              <p>{item.text}</p>
            </div>
          ))}
        </Slider>
      </div>
      <div className="carousel-text">
        <h2>STYLE. SWAP. TRADE YOUR SHOES TODAY.</h2>
      </div>

      <div className="start-trade">
        <button className="start-trading-button">Start Trading</button>

        <div className="start-trading-background"></div>
      </div>

      <footer className="footer"> {/* Changed class to className for JSX */}
        <ul>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/faq">FAQ</a></li>
        </ul>
      </footer>
    </div>
  );
}

export default Homepage;
