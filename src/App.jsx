import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './App.css';

const App = () => {
  // Sample data for placeholder images and text
  const carouselItems = [
    { id: 1, imageUrl: 'https://via.placeholder.com/800x400', text: 'Placeholder 1' },
    { id: 2, imageUrl: 'https://via.placeholder.com/800x400', text: 'Placeholder 2' },
    { id: 3, imageUrl: 'https://via.placeholder.com/800x400', text: 'Placeholder 3' },
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
          <img src="/path/to/sole-swap-logo.png" alt="Sole Swap Logo" className="logo" />
        </div>

        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button>Search</button>
        </div>

        <div className="sign-up-login">
          <button>🛒</button>
          <button>Sign Up</button>
          <button>Login</button>
         
        </div>
      </div>

      {/* Navigation Section */}
      <nav>
        <ul>
          <li><a href="/womens">Women's</a></li>
          <li><a href="/mens">Men's</a></li>
          <li><a href="/kids">Kids</a></li>
          <li><a href="/brands">Brands</a></li>
        </ul>
      </nav>

      {/* Carousel Section */}
      <div className="carousel-container">
        <Slider {...carouselSettings}>
          {carouselItems.map((item) => (
            <div key={item.id}>
              <img src={item.imageUrl} alt={`Slide ${item.id}`} />
              <p>{item.text}</p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default App;

