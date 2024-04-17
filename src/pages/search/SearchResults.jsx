import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../Home/home.css';
import { db } from '../../firebase'; // Adjust based on your directory structure
import { collection, getDocs } from 'firebase/firestore'; // Firestore imports

function Homepage() {
  const navigate = useNavigate();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationShoes, setNotificationShoes] = useState([]);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    // Start fetching random shoes every 15 seconds when component mounts
    const id = setInterval(fetchRandomShoe, 15000);
    setIntervalId(id);

    // Clear interval when component unmounts
    return () => clearInterval(id);
  }, []);

  const fetchRandomShoe = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'shoedisplay'));
      const shoes = [];
      querySnapshot.forEach((doc) => {
        shoes.push(doc.data());
      });
      // Choose a random shoe from the fetched data
      const randomIndex = Math.floor(Math.random() * shoes.length);
      setNotificationShoes([shoes[randomIndex]]);
      setShowNotification(true);
    } catch (error) {
      console.error('Error fetching shoes:', error);
    }
  };

  const handleClearNotification = () => {
    setNotificationShoes([]);
    setShowNotification(false);
  };

  const handleHeartClick = () => {
    navigate('/likedShoes'); // Navigate to liked shoes page
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

  const handleStartTradingClick = () => {
    navigate('/SearchResults');
  };

  return (
    <div id="root">
      <div className="header-content">
        <div>
          <img src="src/assets/SOLE SWAP.png" alt="Sole Swap Logo" className="logo" />
        </div>
        <div className="sign-up-login">
          <button onClick={handleHeartClick}>❤️</button>
          <button onClick={() => setShowNotification(!showNotification)}>🔔</button>
          <button><a href="/createaccount">Sign Up</a></button>
          <button><a href="/login">Login</a></button>
        </div>
      </div>
      <nav>
        <ul>
          <li><a href="/women's">Women's</a></li>
          <li><a href="/mens">Men's</a></li>
          <li><a href="/kid's">Kids</a></li>
          <li><a href="/brands">Brands</a></li>
        </ul>
      </nav>
      <div className="carousel-container">
        <Slider {...carouselSettings}>
          {carouselItems.map((item) => (
            <div key={item.id}>
              <img src={item.imageUrl} alt={`Slide ${item.id}`} style={{ width: '100%', height: 'auto' }} />
              <p>{item.text}</p>
            </div>
          ))}
        </Slider>
      </div>
      <div className="carousel-text">
        <h2>STYLE. SWAP. TRADE YOUR SHOES TODAY.</h2>
      </div>
      <div className="start-trade">
        <button className="start-trading-button" onClick={handleStartTradingClick}>Start Trading</button>
        <div className="start-trading-background"></div>
      </div>
      <footer className="footer">
        <ul>
          <li><a href="/about">About Us</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/faq">FAQ</a></li>
        </ul>
      </footer>
      {showNotification && (
        <div className="notification-popup">
          <div className="notification-content">
            <h3>Hot Shoes Alert!</h3>
            <div className="notification-shoes">
              {notificationShoes.map((shoe, index) => (
                <div key={index} className="shoe-item">
                  {shoe.imageURL && <img src={shoe.imageURL} alt={shoe.name} />}
                  <h3>{shoe.name}</h3>
                  <p>Brand: {shoe.brand}</p>
                  <p>Size: {shoe.size}</p>
                  <p>Gender:{shoe.gender}</p>
                  <p>Condition: {shoe.condition}</p>
                  <p>Price: ${shoe.value}</p>
                  <button onClick={() => handleHeartClick(shoe.id)}>Like</button>
                </div>
              ))}
            </div>
            <button onClick={handleClearNotification}>Clear Notifications</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Homepage;
