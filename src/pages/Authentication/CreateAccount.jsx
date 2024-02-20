import React, { useState } from 'react';
import './CreateAccount.css';

const CreateAccount = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    confirmpassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, for example, submit the formData to a server
    console.log(formData);
  };

  return (
    <div className="createaccount">
      <h1>Join Now!</h1>
      <p>Create an account to get started.</p>
      <form onSubmit={handleSubmit}>
        <label>
         First Name:
          <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} />
        </label>
        <label>
         Last Name:
          <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>
          Username:
          <input type="text" name="username" value={formData.username} onChange={handleChange} />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
        </label>
        <label>
          Confirm Password:
          <input type="password" name="confirmpassword" value={formData.confirmpassword} onChange={handleChange} />
        </label>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default CreateAccount;
