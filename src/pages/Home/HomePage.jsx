import React, { useState } from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom'; 
import DisplaySearchResults from '../DisplaySearchResults/DisplaySearchResults'; 
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../Home/home.css';

function Homepage() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate(); // changed this line becuase it was causing errors


  //Search results function when a user types something into the search bar and presses the
  // enter key button it will redirect them tot he displayresultspage
  
  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      // Redirect to DisplaySearchResults page with search query as URL parameter
      navigate(`/DisplaySearchResults?query=${searchQuery}`); 
    }
  };


  const carouselItems = [
    { id: 1, imageUrl: 'src/assets/c3.jpg', text: 'Shoe 1' },
    { id: 2, imageUrl: 'src/assets/c1.jpg', text: 'Shoe 2' },
    { id: 3, imageUrl: 'src/assets/c2.jpg', text: 'Shoe 3' },
  ];

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
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleSearch}
          />
        </div>

        <div className="sign-up-login">
          <button>🛒</button>
          <button> <a href="/createaccount">Sign Up</a></button>
          <button>< a href ="/Login">Login</a></button>
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

      <footer className="footer">
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
