import React, { useState } from 'react';
import './CreateAccount.css';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const CreateAccount = () => {
  const [userCredentials, setUserCredentials] = useState({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    confirmpassword: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const password = userCredentials.password;
    const confirmPassword = userCredentials.confirmpassword;

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (!/\d/.test(password)) {
      setError("Password must contain at least one number.");
      return;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setError("Password must contain at least one special character.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Clear error if validation passes
    setError("");

    // Handle form submission logic here
  };

  const handleSignUp = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
  
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user); // Successfully signed up user
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage); // Set error message
        console.log(errorCode, errorMessage); // Log any errors
      });
  };

  return (
    <div className="createaccount">
      <div className="section1">
        <img src="src/assets/LoginPicture.png" alt="Login" />
      </div>
  
      <div className="section2">
        <h1>Sign Up</h1>
  
        <form onSubmit={handleSubmit}>
          <label>
            <input type="text" name="firstname" id="firstname" className="input-field" placeholder="First Name" value={userCredentials.firstname} onChange={handleChange} />
          </label>
          <label>
            <input type="text" name="lastname" id="lastname" className="input-field" placeholder="Last Name" value={userCredentials.lastname} onChange={handleChange} />
          </label>
          <label>
            <input type="email" name="email" id="email" className="input-field" placeholder="Email" value={userCredentials.email} onChange={handleChange} />
          </label>
          <label>
            <input type="text" name="username" id="username" className="input-field" placeholder="Username" value={userCredentials.username} onChange={handleChange} />
          </label>
          <label>
            <input type="password" name="password" id="password" className="input-field" placeholder="Password" value={userCredentials.password} onChange={handleChange} />
          </label>
          <label>
            <input type="password" name="confirmpassword" id="confirmpassword" className="input-field" placeholder="Confirm Password" value={userCredentials.confirmpassword} onChange={handleChange} />
          </label>
          <button type="submit" className="signup-button" onClick={handleSignUp}>Create Account</button>
        </form>
  
        {/* Error message */}
        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
};

export default CreateAccount;

