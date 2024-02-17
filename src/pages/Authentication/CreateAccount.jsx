import React, { useState } from 'react';




const CreateAccountForm = () => {
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
    <form onSubmit={handleSubmit}>
      <label>
       First Name:
        <input type="text" name="firstname" value={formData.name} onChange={handleChange} />
      </label>
      <label>
       Last Name:
        <input type="text" name="lastname" value={formData.name} onChange={handleChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <label>
        username:
        <textarea name="username" value={formData.message} onChange={handleChange} />
      </label>
      <button type="submit">Create Account</button>
    </form>
  );
};

export default CreateAccountForm;
