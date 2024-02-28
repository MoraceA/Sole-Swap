import React from 'react';
import { Link } from 'react-router-dom';
import './Contact.css'; 
import soleSwapLogo from '../../assets/SOLE SWAP.png';

function Contact() {
  return (
    <div className="contact-container">
      {/* Logo with Link to Home */}
      <Link to="/">
        <img src={soleSwapLogo} alt="SoleSwap Logo" className="soleSwap-logo" />
      </Link>
      
      <h2>Contact Us</h2>
      <p>If you have any questions or inquiries, feel free to reach out to us using the form below:</p>
      <form className="contact-form">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" placeholder="Your name..." />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="Your email..." />

        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" rows="4" placeholder="Your message..."></textarea>

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default Contact;
