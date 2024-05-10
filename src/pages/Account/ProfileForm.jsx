import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './ProfileForm.css';
import soleSwapLogo from '../../assets/SOLE SWAP.png';

function ProfileForm() {
    // State variables for profile information
  const [profile, setProfile] = useState({
    username: '',
    description: '',
    image: null,
  });
   // Hook for navigation
  const navigate = useNavigate();
// Function to handle changes in form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };
  // Function to handle changes in profile picture
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
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('userProfile', JSON.stringify(profile));
    navigate('/userdashboard');
  };

  return (
    <div id="profile-root">
      <div className="header-content">
        <Link to="/">
          <img src={soleSwapLogo} alt="Sole Swap Logo" className="logo" />
        </Link>
        <div className="sign-up-login">
          <button>❤️</button>
          <Link to="/createaccount"><button>Sign Up</button></Link>
          <Link to="/login"><button>Login</button></Link>
        </div>
      </div>

      <div className="profile-form-container">
        <form onSubmit={handleSubmit} className="profile-form">
          <h2>Edit Your Profile</h2>
          <div className="form-field">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              value={profile.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="profilePicture">Profile Picture</label>
            <input
              id="profilePicture"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={profile.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          
          <button type="submit" className="update-btn">Update Profile</button>
        </form>
      </div>
    </div>
  );
}

export default ProfileForm;
