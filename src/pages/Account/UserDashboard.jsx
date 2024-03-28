import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './UserDashboard.css';
import profilePicUrl from '../../assets/userdashboard.png';

function UserDashboard() {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({
    username: "ARV247",
    rating: 0,
    followers: 0,
    following: 0,
    description: "Open to trading. Message me if you find something you like.",
    image: profilePicUrl 
  });
  const [activeTab, setActiveTab] = useState('All');
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserProfile, setEditedUserProfile] = useState({});
  const [newProfilePic, setNewProfilePic] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [shoeTitle, setShoeTitle] = useState('');
  const [shoeDescription, setShoeDescription] = useState('');

  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (storedProfile) {
      setUserProfile(prevState => ({
        ...prevState,
        ...storedProfile,
        image: storedProfile.image || profilePicUrl
      }));
    }
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedUserProfile(userProfile);
  };

  const handleSave = () => {
    const updatedProfile = { ...editedUserProfile };
    if (newProfilePic) {
      updatedProfile.image = URL.createObjectURL(newProfilePic);
    }
    setUserProfile(updatedProfile);
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUserProfile(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewProfilePic(file);
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  const handlePost = () => {
    // Here you can handle the post action, for now, let's just log the shoe details
    console.log("Shoe Title:", shoeTitle);
    console.log("Shoe Description:", shoeDescription);
    console.log("Shoe Image:", newProfilePic);
    closePopup(); // Close the popup after posting
  };

  const goToSignUp = () => navigate('/createaccount');
  const goToLogin = () => navigate('/login');

  return (
    <div className="dashboard-root">
      <div className="header-content">
        <Link to="/">
          <img src="src/assets/SOLE SWAP.png" alt="Sole Swap Logo" className="logo" />
        </Link>
        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>
        <div className="sign-up-login">
          <button>❤️</button>
          <button onClick={goToSignUp}>Sign Up</button>
          <button onClick={goToLogin}>Login</button>
        </div>
      </div>

      <div className="user-dashboard">
        <div className="profile-section">
          <img src={isEditing ? editedUserProfile.image : userProfile.image} alt="Profile" className="profile-pic" />
          <div className="profile-info">
            {isEditing ? (
              <>
                <input type="text" name="username" value={editedUserProfile.username} onChange={handleChange} />
                <textarea name="description" value={editedUserProfile.description} onChange={handleChange} />
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </>
            ) : (
              <>
                <h2>{userProfile.username}</h2>
                <span className="rating">* * * * * ({userProfile.rating})</span>
                <div className="social-counts">
                  <Link to="/followers">{userProfile.followers} Followers</Link>
                  <span> · </span>
                  <Link to="/following">{userProfile.following} Following</Link>
                </div>
                <p className="description">{userProfile.description}</p>
              </>
            )}
            <div className="profile-buttons">
              {isEditing ? (
                <>
                  <button onClick={handleSave}>Save</button>
                  <button onClick={handleCancel}>Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={handleEdit}>Edit Profile</button>
                  <button onClick={openPopup}>Post</button>
                </>
              )}
              <button className={activeTab === 'All' ? 'active' : ''} onClick={() => setActiveTab('All')}>All</button>
              <button className={activeTab === 'Selling' ? 'active' : ''} onClick={() => setActiveTab('Selling')}>Selling</button>
              <button className={activeTab === 'Sold' ? 'active' : ''} onClick={() => setActiveTab('Sold')}>Sold</button>
              <button className={activeTab === 'Likes' ? 'active' : ''} onClick={() => setActiveTab('Likes')}>Likes</button>
            </div>
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Post Picture</h2>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <input type="text" placeholder="Shoe Title" value={shoeTitle} onChange={(e) => setShoeTitle(e.target.value)} />
            <textarea placeholder="Enter description..." value={shoeDescription} onChange={(e) => setShoeDescription(e.target.value)} />
            <button onClick={closePopup}>Close</button>
            <button onClick={handlePost}>Post</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
