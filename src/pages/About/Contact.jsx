import React from 'react';
import emailjs from 'emailjs-com';
import './Contact.css';
import soleSwapLogo from '../../assets/SOLE SWAP transparent.png';
import { Link } from 'react-router-dom';




function Contact() { 

   // Function to handle form submission
  const sendEmail = (e) => {
    e.preventDefault(); //prevent default submision

    // Sending form data to EmailJS service
    emailjs.sendForm('service_ted287k', 'template_2bdskeb', e.target, 'kIev1I-QO2hBowJKf')
      .then((result) => {
        alert('Message sent successfully!');
        e.target.reset();
      }, (error) => {
        alert('Failed to send the message, please try again.');
      });
  };

  return (
    <div className="contact-page">
      <div className="header-content">
        <Link to="/"><img src={soleSwapLogo} alt="Sole Swap Logo" className="logo" /></Link>
      
        <div className="sign-up-login">
          <button>❤️</button>
          <button><Link to="/createaccount">Sign Up</Link></button>
          <button><Link to="/login">Login</Link></button>
        </div>
      </div>
      <nav>
        <ul>
          <li><Link to="/women's">Women's</Link></li>
          <li><Link to="/mens">Men's</Link></li>
          <li><Link to="/kid's">Kids</Link></li>
          <li><Link to="/brands">Brands</Link></li>
        </ul>
      </nav>
      <div className="content">
        <div className="contact-container">
          <h2>Contact Us</h2>
          <p>If you have any questions or inquiries, feel free to reach out to us using the form below:</p>
          <form className="contact-form" onSubmit={sendEmail}>
            <input type="text" id="name" name="name" placeholder="Your name..." required />
            <input type="email" id="email" name="email" placeholder="Your email..." required />
            <textarea id="message" name="message" placeholder="Your message..." required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>
        <div className="info-box">
          <p>EMAIL:</p>
          <p>GENERAL:<br />INFO@SOLESWAP.COM</p>
          <p>CUSTOMER SUPPORT:<br />SUPPORT@SOLESWAP.COM</p>
          <p>PARTNERSHIPS:<br />PARTNERSHIPS@SOLESWAP.COM</p>
          <br />
          <p>SOCIAL MEDIA:<br />CONNECT WITH US ON SOCIAL MEDIA FOR<br />UPDATES, NEWS, AND COMMUNITY ENGAGEMENT:</p>
          <br />
          <p>INSTAGRAM: @SOLESWAPOFFICIAL<br />TWITTER: @SOLESWAP<br />FACEBOOK: /SOLESWAP</p>
        </div>
      </div>
    </div>

    
  );
}

export default Contact;
