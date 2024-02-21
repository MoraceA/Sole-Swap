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
        <img src="src/assets/LoginPicture.png"/>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
    
          <input type="text" name="firstname" id="firstname" className="input-field" placeholder="First Name" value={formData.firstname} onChange={handleChange} />
        </label>
        <label>
       
          <input type="text" name="lastname" id="lastname" className="input-field" placeholder="Last Name"value={formData.lastname} onChange={handleChange} />
        </label>
        <label>
      
          <input type="email" name="email" id="email" className="input-field" placeholder="Email"value={formData.email} onChange={handleChange} />
        </label>
        <label>
    
          <input type="text" name="username" id="username" className="input-field" placeholder="Username" value={formData.username} onChange={handleChange} />
        </label>
        <label>
          
          <input type="password" name="password" id="password" className="input-field" placeholder="Password" value={formData.password} onChange={handleChange} />
        </label>
        <label>
         
          <input type="password" name="confirmpassword" id="confirmpassword" className="input-field" placeholder="Confirm Password" value={formData.confirmpassword} onChange={handleChange} />
        </label>
        <button type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default CreateAccount;
