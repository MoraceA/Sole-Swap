
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import usernameIcon from '../../assets/username.png';
import passwordIcon from '../../assets/password.png';
import showPasswordIcon from '../../assets/showpassword.png';
import hidePasswordIcon from '../../assets/hidepassword.png';
import soleSwapLogo from '../../assets/SOLE SWAP.png';
import './Login.css';
// Adjusted import path
import { auth } from '../../../firebase.js';




function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [userCredentials, setUserCredentials]= useState({});


  function handleCredentials(e) {

    setUserCredentials({...userCredentials, [e.target.name]: e.target.value});
    console.log(userCredentials, auth);
  }












  // Toggle password visibility
  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  return (
    <div id="login-root">
      {/* Header Content */}
      <div className="header-content">
        <div>
          <img src={soleSwapLogo} alt="Sole Swap Logo" className="logo" />
        </div>
        <div className="sign-up-login">
          <button>🛒</button>
          <Link to="/createaccount"><button>Sign Up</button></Link> 
          <Link to="/login"><button>Login</button></Link> 
        </div>
      </div>

      {/* Promotional Image */}
      <div className="image-container">
        <img src="src\assets\loginpagecoverart.jpg" alt="Promotional" className="promo-image" />
      </div>

      {/* Login Form Container */}
      <div className="login-form-container">
        <h3 className="login-title">LOGIN</h3>

        {/* Username Input */}
        <div className="input-container">
          <img src={usernameIcon} alt="Username" className="input-icon" />
          <input onChange={(e)=>{handleCredentials(e)}} className="login-input" type="text" placeholder="Username" />
        </div>

        {/* Password Input */}
        <div className="input-container">
          <img src={passwordIcon} alt="Password" className="input-icon" />
          <input onChange={(e)=>{handleCredentials(e)}} 
            className="login-input"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
          />
          <img
            src={showPassword ? hidePasswordIcon : showPasswordIcon}
            alt="Toggle Password Visibility"
            className="password-toggle-icon"
            onClick={togglePasswordVisibility}
          />
        </div>

        {/* Login Utilities */}
        <div className="login-utilities">
          <label className="remember-me">
            <input type="checkbox" />
            Remember me
          </label>
          <Link to="/forgot-password" className="forgot-password-link">Forgot password?</Link>
        </div>

        {/* Login and Create Account Buttons */}
        <button className="login-button">Log In</button>
        <Link to="/createaccount"><button className="create-account-button">Create Account</button></Link>
      </div>
    </div> 
  );
}

export default Login;