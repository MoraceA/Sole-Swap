// Import necessary modules
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './UserDashboard.css';
import profilePicUrl from '../../assets/userdashboard.png';

function UserDashboard() {
  const navigate = useNavigate();

  // State variables
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
  const [shoes, setShoes] = useState([]);
  const [shoeFormData, setShoeFormData] = useState({
    title: '',
    description: '',
    brand: '',
    size: '',
    gender: '',
    condition: '',
    price: '',
    image: null
  });

  useEffect(() => {
    // Load user profile from local storage
    const storedProfile = JSON.parse(localStorage.getItem('userProfile'));
    if (storedProfile) {
      setUserProfile(prevState => ({
        ...prevState,
        ...storedProfile,
        image: storedProfile.image || profilePicUrl
      }));
    }

    // Dummy data for testing
    const dummyShoes = [
      { id: 1, title: "Nike Air Force 1", description: "Classic sneaker", brand: "Nike", size: 9, gender: "Male", condition: "New", price: 100, imageURL: '' },
      { id: 2, title: "Adidas Superstar", description: "Iconic shell-toe sneaker", brand: "Adidas", size: 8, gender: "Female", condition: "Used", price: 80, imageURL: '' },
      // Add more shoes as needed
    ];
    setShoes(dummyShoes);
  }, []);

  // Handle edit button click
  const handleEdit = () => {
    setIsEditing(true);
    setEditedUserProfile(userProfile);
  };

  // Handle save button click
  const handleSave = () => {
    const updatedProfile = { ...editedUserProfile };
    if (newProfilePic) {
      updatedProfile.image = URL.createObjectURL(newProfilePic);
    }
    setUserProfile(updatedProfile);
    localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
    setIsEditing(false);
  };

  // Handle cancel button click
  const handleCancel = () => {
    setIsEditing(false);
  };

  // Handle changes in profile edit form fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUserProfile(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle image upload for profile picture
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewProfilePic(file);
  };

  // Open the shoe post popup
  const openPopup = () => {
    setIsPopupOpen(true);
  };

  // Close the shoe post popup
  const closePopup = () => {
    setIsPopupOpen(false);
  };

  // Handle shoe form input changes
  const handleShoeFormChange = (e) => {
    const { name, value } = e.target;
    setShoeFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  // Handle image upload for shoe
  const handleShoeImageChange = (e) => {
    const file = e.target.files[0];
    setShoeFormData(prevState => ({
      ...prevState,
      image: file
    }));
  };

  // Handle shoe post submission
  const handleShoePost = () => {
    const { title, description, brand, size, gender, condition, price, image } = shoeFormData;
    if (title.trim() === '' || description.trim() === '' || brand.trim() === '' || size.trim() === '' || gender.trim() === '' || condition.trim() === '' || price.trim() === '') {
      alert('Please provide all shoe details.');
      return;
    }

    const newShoe = {
      id: shoes.length + 1,
      title,
      description,
      brand,
      size,
      gender,
      condition,
      price,
      imageURL: image ? URL.createObjectURL(image) : '' // Set the uploaded image URL if available
    };

    setShoes(prevShoes => [...prevShoes, newShoe]);
    setShoeFormData({
      title: '',
      description: '',
      brand: '',
      size: '',
      gender: '',
      condition: '',
      price: '',
      image: null
    });

    closePopup();
  };

  // Navigate to sign up page
  const goToSignUp = () => navigate('/createaccount');

  // Navigate to login page
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
            {/* Profile editing section */}
            {isEditing ? (
              <>
                <input type="text" name="username" value={editedUserProfile.username} onChange={handleChange} />
                <textarea name="description" value={editedUserProfile.description} onChange={handleChange} />
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </>
            ) : (
              // Profile display section
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
            {/* Profile action buttons */}
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
              {/* Tab buttons */}
              <button className={activeTab === 'All' ? 'active' : ''} onClick={() => setActiveTab('All')}>All</button>
              <button className={activeTab === 'Trading' ? 'active' : ''} onClick={() => setActiveTab('Trading')}>Trading</button>
              <button className={activeTab === 'Traded' ? 'active' : ''} onClick={() => setActiveTab('Traded')}>Traded</button>
              <button className={activeTab === 'Likes' ? 'active' : ''} onClick={() => setActiveTab('Likes')}>Likes</button>
            </div>
          </div>
        </div>
      </div>

      {/* Shoe post popup */}
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Post Shoe</h2>
            <input type="file" accept="image/*" onChange={handleShoeImageChange} />
            <input type="text" name="title" placeholder="Shoe Title" value={shoeFormData.title} onChange={handleShoeFormChange} />
            <textarea name="description" placeholder="Enter description..." value={shoeFormData.description} onChange={handleShoeFormChange} />
            <input type="text" name="brand" placeholder="Brand" value={shoeFormData.brand} onChange={handleShoeFormChange} />
            <input type="text" name="size" placeholder="Size" value={shoeFormData.size} onChange={handleShoeFormChange} />
            <input type="text" name="gender" placeholder="Gender" value={shoeFormData.gender} onChange={handleShoeFormChange} />
            <input type="text" name="condition" placeholder="Condition" value={shoeFormData.condition} onChange={handleShoeFormChange} />
            <input type="text" name="price" placeholder="Price" value={shoeFormData.price} onChange={handleShoeFormChange} />
            <button onClick={closePopup}>Close</button>
            <button onClick={handleShoePost}>Post</button>
          </div>
        </div>
      )}

      {/* Render shoes under the "All" tab */}
      {activeTab === 'All' && (
        <div className="shoes-container">
          {shoes.filter(shoe => shoe.title.trim() !== '' && shoe.description.trim() !== '').map(shoe => (
            <div key={shoe.id} className="shoe-item">
              <h3>{shoe.title}</h3>
              <p>{shoe.description}</p>
              <img src={shoe.imageURL} alt="Shoe" /> {/* Display shoe image */}
              <p>Brand: {shoe.brand}</p>
              <p>Size: {shoe.size}</p>
              <p>Gender: {shoe.gender}</p>
              <p>Condition: {shoe.condition}</p>
              <p>Price: ${shoe.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
