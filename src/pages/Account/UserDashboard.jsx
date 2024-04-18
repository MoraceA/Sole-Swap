import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './UserDashboard.css';
import profilePicUrl from '../../assets/userdashboard.png';
import { db } from '../../firebase'; // Adjust based on your directory structure
import { collection, addDoc, getDocs } from 'firebase/firestore';

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
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]); // State variable for reviews
  const [isReviewPopupOpen, setIsReviewPopupOpen] = useState(false); // State variable to control review popup visibility
  const [isReviewFormOpen, setIsReviewFormOpen] = useState(false); // State variable to control review form visibility

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
  
    // Fetch shoes from the database
    const fetchShoes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'shoeupload'));
        const shoesData = [];
        querySnapshot.forEach((doc) => {
          shoesData.push({ id: doc.id, ...doc.data() });
        });
        setShoes(shoesData);
      } catch (error) {
        console.error('Error fetching shoes: ', error);
      }
    };

    fetchShoes(); // Load shoes

    fetchReviews(); // Load reviews
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
  const handleShoePost = async () => {
    const { title, description, brand, size, gender, condition, price, image } = shoeFormData;
    if (title.trim() === '' || description.trim() === '' || brand.trim() === '' || size.trim() === '' || gender.trim() === '' || condition.trim() === '' || price.trim() === '') {
      alert('Please provide all shoe details.');
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'shoeupload'), {
        title,
        description,
        brand,
        size,
        gender,
        condition,
        price,
        imageURL: image ? URL.createObjectURL(image) : '' // Set the uploaded image URL if available
      });
      console.log('Document written with ID: ', docRef.id);

      // Add the posted shoe to the local state for immediate display
      const newShoe = {
        id: docRef.id,
        title,
        description,
        brand,
        size,
        gender,
        condition,
        price,
        imageURL: image ? URL.createObjectURL(image) : ''
      };
      setShoes(prevShoes => [...prevShoes, newShoe]);
    } catch (e) {
      console.error('Error adding document: ', e);
    }

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

  // Handle opening the review popup
  const openReviewPopup = () => {
    setIsReviewPopupOpen(true);
  };

  // Handle closing the review popup
  const closeReviewPopup = () => {
    setIsReviewPopupOpen(false);
  };

  // Handle user review submission
  const handleReviewSubmit = async () => {
    try {
      await addDoc(collection(db, 'user_reviews'), {
        userId: userProfile.username, // Assuming username is the user ID
        reviewerName: 'Logged In User', // Change this to the actual reviewer's name
        rating: rating,
        reviewText: review
      });

      // Update user profile with the new review
      const updatedRating = (userProfile.rating + parseInt(rating)) / 2;
      setUserProfile((prevProfile) => ({
        ...prevProfile,
        rating: updatedRating
      }));

      // Fetch updated reviews
      fetchReviews();

      console.log('Review submitted successfully.');
    } catch (error) {
      console.error('Error adding review: ', error);
    }
  };

  // Fetch reviews for the user
  const fetchReviews = async () => {
    const querySnapshot = await getDocs(collection(db, 'user_reviews'));
    const reviewsData = [];
    querySnapshot.forEach((doc) => {
      reviewsData.push(doc.data());
    });
    setReviews(reviewsData);
  };

  // Navigate to sign up page
  const goToSignUp = () => navigate('/createaccount');

  // Navigate to login page
  const goToLogin = () => navigate('/login');

  // Open review form popup
  const openReviewForm = () => {
    setIsReviewFormOpen(true);
  };

  // Close review form popup
  const closeReviewForm = () => {
    setIsReviewFormOpen(false);
  };

  return (
    <div className="dashboard-root">
      <div className="header-content">
        <Link to="/">
          <img src="src/assets/SOLE SWAP.png" alt="Sole Swap Logo" className="logo" />
        </Link>
       
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
                <span className="rating" onClick={openReviewPopup}>* * * * * ({userProfile.rating})</span>
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
                  <button onClick={openReviewForm}>Leave a Review</button>
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

      {/* Review form popup */}
      {isReviewFormOpen && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Leave a Review</h2>
            <textarea placeholder="Write your review here..." value={review} onChange={(e) => setReview(e.target.value)}></textarea>
            <input type="number" placeholder="Rating (1-5)" min="1" max="5" value={rating} onChange={(e) => setRating(e.target.value)} />
            <button onClick={closeReviewForm}>Cancel</button>
            <button onClick={handleReviewSubmit}>Submit</button>
          </div>
        </div>
      )}

    {/* Render shoes under the "All" tab */}
{activeTab === 'All' && (
  <div className="shoes-container">
    {shoes.filter(shoe => shoe.title && shoe.description).map(shoe => (
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

      {/* Review popup */}
      {isReviewPopupOpen && (
        <div className="popup">
          <div className="popup-inner">
            <button onClick={closeReviewPopup}>Close</button>
            <div className="reviews-container">
              <h3>User Reviews</h3>
              {reviews.map((review, index) => (
                <div key={index} className="review-item">
                  <p className="reviewer-name">{review.reviewerName}</p>
                  <p className="review-rating">Rating: {review.rating}</p>
                  <p className="review-text">Review: {review.reviewText}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
