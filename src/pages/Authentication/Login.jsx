import React, { useState } from 'react';
import usernameIcon from '../../assets/username.png'; 
import passwordIcon from '../../assets/password.png'; 
import showPasswordIcon from '../../assets/showpassword.png'; 
import hidePasswordIcon from '../../assets/hidepassword.png'; 
import './Login.css'; 

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  return (
    <div className="login-form-container">
      <h3 className="login-title">LOGIN</h3>
      
      <div className="input-container">
        <img src={usernameIcon} alt="Username" className="input-icon" />
        <input className="login-input" type="text" placeholder="Username" />
      </div>
      
      <div className="input-container">
        <img src={passwordIcon} alt="Password" className="input-icon" />
        <input
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
      
      <div className="login-utilities">
        <label className="remember-me">
          <input type="checkbox" />
          Remember me
        </label>
        <a href="/forgot-password" className="forgot-password-link">Forgot password?</a>
      </div>
      
      <button className="login-button">Log In</button>
      <button className="create-account-button">Create Account</button>
    </div>
  );
}

export default Login;