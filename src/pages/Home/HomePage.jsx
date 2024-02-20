import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../Home/home.css';


function Homepage() {
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
    <div className="homepage">
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
            {/* Update or remove the empty button tag based on your needs */}
            <button>Sample Button</button>
            <button>
              <a to="/signup">Sign Up</a>
            </button>
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
        <div className="carousel-text">
          <h2>STYLE. SWAP. TRADE YOUR SHOES TODAY.</h2>
        </div>

        {/* Main Content Section (placeholder) */}
        <div className="main-content">
          {/* Add your main content here (product listings, etc.) */}
        </div>

        {/* Footer Section (placeholder) */}
        <footer>
          {/* Add your footer content (copyright, social media links, etc.) */}
        </footer>

        
      </div>
    </div>
  );
}

export default Homepage;
