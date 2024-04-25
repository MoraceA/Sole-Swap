import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, setPersistence, browserSessionPersistence, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import ReactDOM from 'react-dom';
import Home from '../Home/user_HomePage.jsx';
import usernameIcon from '../../assets/username.png';
import passwordIcon from '../../assets/password.png';
import showPasswordIcon from '../../assets/showpassword.png';
import hidePasswordIcon from '../../assets/hidepassword.png';
import soleSwapLogo from '../../assets/SOLE SWAP transparent.png';
import './Login.css';


import { auth } from '/Users/shaniabrown/Documents/GitHub/Sole-Swap/src/firebase.js';




function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [userCredentials, setUserCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    // Set session persistence
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        console.log('Session persistence set successfully.');
      })
      .catch((error) => {
        console.error('Error setting session persistence:', error);
      });
  }, []);

  useEffect(() => {
    // Check authentication state on component mount
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        renderHomePageForLoggedInUser();
      }
    });

    return () => {
      // Clean up the listener when the component unmounts
      unsubscribe();
    };
  }, []);

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
        window.localStorage.setItem("isLoggedIn", true);
        console.log('Logged in:', user);
        renderHomePageForLoggedInUser();
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        console.error('Incorrect Password', errorMessage);
      });
  }

  function renderHomePageForLoggedInUser() {
    ReactDOM.createRoot(document.getElementById('root')).render(<Home />);
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
          <img src={usernameIcon} alt="Email" className="input-icon" />
          <input onChange={(e) => { handleCredentials(e) }} className="login-input" type="text" name="email" placeholder="Email" />
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

        {/* Display error message if there is an error */}
        {error && <p>{error}</p>}

        <button className="login-button" onClick={handleLogin}>Log In</button>
        <Link to="/createaccount"><button className="create-account-button">Create Account</button></Link>
      </div>
    </div>
  );
}

export default Login;
