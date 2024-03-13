import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FAQ.css';
import soleSwapLogo from '../../assets/SOLE SWAP.png';

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = index => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const questionsAnswers = [
    { question: "How do I return a product?", answer: "You can return a product within 30 days of purchase. Please visit our returns page for detailed instructions." },
    { question: "How can I track my order?", answer: "Once your order is shipped, you will receive a tracking number via email. You can use this number to track your order on our carrier's website." },
    { question: "Do you offer international shipping?", answer: "Yes, we offer international shipping. Shipping costs will vary depending on the destination country." },
    // Add more questions and answers here
  ];

  return (
    <div id="root">
      {/* Header Section */}
      <div className="header-content">
        <div>
          <Link to="/"><img src={soleSwapLogo} alt="Sole Swap Logo" className="logo" /></Link>
        </div>
        <div className="sign-up-login">
          <button>❤️</button>
          <button><Link to="/createaccount">Sign Up</Link></button>
          <button><Link to="/login">Login</Link></button>
        </div>
      </div>

      {/* Navigation Section */}
      <nav>
        <ul>
          <li><Link to="/women's">Women's</Link></li>
          <li><Link to="/mens">Men's</Link></li>
          <li><Link to="/kid's">Kids</Link></li>
          <li><Link to="/brands">Brands</Link></li>
        </ul>
      </nav>

      {/* FAQ Section */}
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        {questionsAnswers.map((qa, index) => (
          <div className={`faq-item ${activeIndex === index ? "active" : ""}`} key={index} onClick={() => toggleFAQ(index)}>
            <div className="faq-question">
              {qa.question}
              <span className="faq-toggle">{activeIndex === index ? '-' : '+'}</span>
            </div>
            <div className="faq-answer">{activeIndex === index ? qa.answer : ""}</div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="footer">
        <ul>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
        </ul>
      </footer>
    </div>
  );
}

export default FAQ;
