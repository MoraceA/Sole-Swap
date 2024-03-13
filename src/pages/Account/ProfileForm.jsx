import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProfileForm.css';

function ProfileForm() {
  const [profile, setProfile] = useState({
    username: '',
    description: '',
    image: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files.length) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userProfile', JSON.stringify(profile));
    navigate('/userdashboard'); 
  };

  return (
    <div className="profile-form-container">
      <form onSubmit={handleSubmit} className="profile-form">
        <h2>Edit Your Profile</h2>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          name="username"
          value={profile.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="profilePicture" className="input-file-trigger">Profile Picture</label>
        <input
          id="profilePicture"
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="input-file"
          required
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={profile.description}
          onChange={handleChange}
          required
        />

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default ProfileForm;
