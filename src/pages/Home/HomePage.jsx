import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../Home/home.css';
//add photo for search bar 

function Homepage() {
  const carouselItems = [
    { id: 1, imageUrl: 'https://via.placeholder.com/800x400', text: 'Shoe 1' },
    { id: 2, imageUrl: 'https://via.placeholder.com/800x400', text: 'Shoe 2' },
    { id: 3, imageUrl: 'https://via.placeholder.com/800x400', text: 'Shoe 3' },
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
          <input type="text" placeholder="Search..." />
         
        </div>

        <div className="sign-up-login">
          <button>🛒</button>
          <button> <a href="/createaccount">Sign Up</a></button>
          <button>Login</button>
         
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
              <img src={item.imageUrl} alt={`Slide ${item.id}`} />
              <p>{item.text}</p>
            </div>
          ))}
        </Slider>
      </div>
      <div className="carousel-text">
        <h2>STYLE. SWAP. TRADE YOUR SHOES TODAY.</h2>
        <button className="start-trading-button">Start Trading</button>
      </div>

     
     

<footer class="footer">
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
