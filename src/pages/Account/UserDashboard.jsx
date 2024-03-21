import React, { useState, useEffect } from 'react'; // Import useEffect
import { useNavigate, Link } from 'react-router-dom';
import './UserDashboard.css';
import profilePicUrl from '../../assets/userdashboard.png'; // Make sure this path is correct

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

  // Load user profile from local storage
  useEffect(() => {
    const storedProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (storedProfile) {
      setUserProfile(prevState => ({
        ...prevState,
        ...storedProfile, // This will overwrite the username, description, and image
        image: storedProfile.image || profilePicUrl // Use stored image or default
      }));
    }
  }, []);

  const goToSignUp = () => navigate('/createaccount');
  const goToLogin = () => navigate('/login');

  return (
    <div className="dashboard-root">
      <div className="header-content">
        {/* Logo wrapped in Link to navigate to home */}
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
          <img src={userProfile.image || profilePicUrl} alt="Profile" className="profile-pic" />
          <div className="profile-info">
            <h2>{userProfile.username}</h2>
            <span className="rating">* * * * * ({userProfile.rating})</span>
            <div className="social-counts">
              <Link to="/followers">{userProfile.followers} Followers</Link>
              <span> · </span>
              <Link to="/following">{userProfile.following} Following</Link>
            </div>
            <p className="description">{userProfile.description}</p>
            <div className="profile-buttons">
              <button className={activeTab === 'All' ? 'active' : ''} onClick={() => setActiveTab('All')}>All</button>
              <button className={activeTab === 'Selling' ? 'active' : ''} onClick={() => setActiveTab('Selling')}>Selling</button>
              <button className={activeTab === 'Sold' ? 'active' : ''} onClick={() => setActiveTab('Sold')}>Sold</button>
              <button className={activeTab === 'Likes' ? 'active' : ''} onClick={() => setActiveTab('Likes')}>Likes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
