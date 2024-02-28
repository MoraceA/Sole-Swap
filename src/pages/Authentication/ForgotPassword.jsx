import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ForgotPassword.css';
import soleSwapLogo from '../../assets/SOLE SWAP.png'; // Update this path as needed
import forgotPasswordImage from '../../assets/forgotpassword.jpg'; // Update path as needed

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Password reset email sent to:', email);
  };

  return (
    <div className="forgot-password-root">
      <Link to="/">
        <img src={soleSwapLogo} alt="SoleSwap Logo" className="soleSwap-logo" />
      </Link>
      <div className="content">
        <div className="forgot-password-image-container">
          <img src={forgotPasswordImage} alt="Forgot Password" />
        </div>
        <div className="forgot-password-container">
          <h1>Forgot Password</h1>
          <p>Enter your email address and we'll send you a link to reset your password.</p>
          <form onSubmit={handleSubmit} className="forgot-password-form">
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email Address"
              className="input-field"
            />
            <button type="submit" className="signup-button">Send Reset Link</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
