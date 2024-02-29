import React from 'react';
import emailjs from 'emailjs-com';
import './Contact.css';
import soleSwapLogo from '../../assets/SOLE SWAP.png'; 
import { Link } from 'react-router-dom';

function Contact() {
  const sendEmail = (e) => {
    e.preventDefault(); 
    emailjs.sendForm('service_ted287k', 'template_2bdskeb', e.target, 'kIev1I-QO2hBowJKf')
    .then((result) => {
          console.log(result.text);
          alert('Message sent successfully!');
          e.target.reset();
      }, (error) => {
          console.log(error.text);
          alert('Failed to send the message, please try again.');
      });
  };

  return (
    <div className="contact-container">
      <Link to="/">
        <img src={soleSwapLogo} alt="SoleSwap Logo" className="soleSwap-logo" />
      </Link>

      <h2>Contact Us</h2>
      <p>If you have any questions or inquiries, feel free to reach out to us using the form below:</p>
      <form className="contact-form" onSubmit={sendEmail}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" placeholder="Your name..." required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" placeholder="Your email..." required />

        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" rows="4" placeholder="Your message..." required></textarea>

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}

export default Contact;
