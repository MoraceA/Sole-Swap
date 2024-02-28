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

  const handleChange = (e) => {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userCredentials); // Check the form data
    // You can handle form submission logic here if needed
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log('signup');

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, userCredentials.email, userCredentials.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user); // Successfully signed up user
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage); // Log any errors
      });
  };

  return (
    <div className="createaccount">
      <img src="src/assets/LoginPicture.png" alt="Login" />
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
    </div>
  );
};

export default CreateAccount;
