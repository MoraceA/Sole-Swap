
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import ReactDOM from 'react-dom'; // Import ReactDOM
import UserHome from '../Home/user_HomePage.jsx';
import usernameIcon from '../../assets/username.png';
import passwordIcon from '../../assets/password.png';
import showPasswordIcon from '../../assets/showpassword.png';
import hidePasswordIcon from '../../assets/hidepassword.png';
import soleSwapLogo from '../../assets/SOLE SWAP.png';
import './Login.css';
import { auth } from '/Users/2018v/OneDrive/Documents/GitHub/Sole-Swap/src/firebase.js';  //get your file path 


function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [userCredentials, setUserCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null); // State for handling errors

  function handleCredentials(e) {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  }

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  function handleLogin() {
    signInWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Logged in:', user);
        renderHomePageForLoggedInUser();
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage); // Set error state
        console.error('Login error:', errorMessage);
      });
  }

  function renderHomePageForLoggedInUser() {
    // Check if the user is logged in
    const currentUser = auth.currentUser;
    if (currentUser) {
      // User is logged in, render the home page for logged-in users
      // You can navigate to a new page, render a component, or update the UI accordingly
      // For example, you can render a component that represents the home page
      ReactDOM.createRoot(document.getElementById('root')).render(<UserHome />);
    }
  }

  return (
    <div id="login-root">
      <div className="header-content">
        <div>
          <Link to="/">
            <img src={soleSwapLogo} alt="Sole Swap Logo" className="logo" />
          </Link>
        </div>
        <div className="sign-up-login">
          <button>❤️</button>
          <Link to="/createaccount"><button>Sign Up</button></Link>
          <Link to="/login"><button>Login</button></Link>
        </div>
      </div>

      <div className="image-container">
        <img src="src\assets\loginpagecoverart.jpg" alt="Promotional" className="promo-image" />
      </div>

      <div className="login-form-container">
        <h3 className="login-title">LOGIN</h3>

        <div className="input-container">
          <img src={usernameIcon} alt="Username" className="input-icon" />
          <input onChange={(e) => { handleCredentials(e) }} className="login-input" type="text" name="email" placeholder="Username" />
        </div>

        <div className="input-container">
          <img src={passwordIcon} alt="Password" className="input-icon" />
          <input onChange={(e) => { handleCredentials(e) }}
            className="login-input"
            type={showPassword ? "text" : "password"}
            name="password"
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
          <Link to="/forgot-password" className="forgot-password-link">Forgot password?</Link>
        </div>

        {/* Display error message if there is an error */}
        {error && <p>{error}</p>}

        <button className="login-button" onClick={handleLogin}>Log In</button>
        <Link to="/createaccount"><button className="create-account-button">Create Account</button></Link>
      </div>
    </div>
  );
}

export default Login;


