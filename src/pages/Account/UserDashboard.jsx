import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './UserDashboard.css';
import profilePicUrl from '../../assets/userdashboard.png';

function UserDashboard() {
  const navigate = useNavigate();

  const goToSignUp = () => navigate('/createaccount');
  const goToLogin = () => navigate('/login');

  const userProfile = {
    username: "ARV247",
    rating: 503,
    status: "Active today",
    followers: 1000,
    following: 200,
    description: "Open to trading. Message me if you find something you like."
  };

  const [activeTab, setActiveTab] = useState('All');

  return (
    <div className="dashboard-root">
      <div className="header-content">
        <img src="src/assets/SOLE SWAP.png" alt="Sole Swap Logo" className="logo" />
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
          <img src={profilePicUrl} alt="Profile" className="profile-pic" />
          <div className="profile-info">
            <h2>{userProfile.username}</h2>
            <span className="rating">* * * * * ({userProfile.rating})</span>
            <p className="status">{userProfile.status}</p>
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
