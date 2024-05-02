import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './TradePage.css'; // Import CSS for TradePage styling

function TradePage() {
  const [tradeInfo, setTradeInfo] = useState('');
  const [shoeToTrade, setShoeToTrade] = useState(null); // State to store the shoe to trade
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
  const [uploadedShoe, setUploadedShoe] = useState(null); // State to store the uploaded shoe
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control the popup form
  const [isFormValid, setIsFormValid] = useState(false); // State to track form validity
  const [showSubmitError, setShowSubmitError] = useState(false); // State to control the display of the submit error message

  const location = useLocation();
  const navigate = useNavigate(); // React Router's navigate function

  // Extract the shoe to trade from the location state
  useEffect(() => {
    const { shoeToTrade } = location.state;
    setShoeToTrade(shoeToTrade);
  }, [location.state]);

  // Update form validity whenever shoeFormData changes
  useEffect(() => {
    const isValid = Object.values(shoeFormData).every(value => value !== '');
    setIsFormValid(isValid);
  }, [shoeFormData]);

  const handleTradeInfoChange = (e) => {
    setTradeInfo(e.target.value);
  };

  const handleTradeSubmit = () => {
    // Check if the form is valid
    if (!isFormValid) {
      setShowSubmitError(true);
      return;
    }

    // Handle trade submission logic here
    console.log("Trade info:", tradeInfo);
    alert('Trade sent successfully'); // Show success message
    navigate('/'); // Redirect to homepage using navigate function
  };

  const handleShoeFormChange = (e) => {
    const { name, value } = e.target;
    setShoeFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleShoeImageChange = (e) => {
    const file = e.target.files[0];
    setShoeFormData(prevState => ({
      ...prevState,
      image: file
    }));
  };

  const handleShoePost = () => {
    // Handle shoe posting logic here
    console.log("Shoe data:", shoeFormData);
    setUploadedShoe(shoeFormData); // Store the uploaded shoe data
    setShowSubmitError(false); // Reset the submit error state
    closePopup(); // Close the popup form after posting shoe information
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="trade-page">
      <h1>Trade Shoe</h1>
      <div className="shoe-details">
        <h2>Shoe Details</h2>
        {/* Display details of the shoe to trade */}
        {shoeToTrade && (
          <div className="shoe-tile">
            <img src={shoeToTrade.imageURL} alt={shoeToTrade.name} />
            <p>Name: {shoeToTrade.name}</p>
            <p>Brand: {shoeToTrade.brand}</p>
            <p>Size: {shoeToTrade.size}</p>
            <p>Gender: {shoeToTrade.gender}</p>
            <p>Condition: {shoeToTrade.condition}</p>
            <p>Price: ${shoeToTrade.value}</p>
          </div>
        )}
        {/* Display details of the uploaded shoe */}
        {uploadedShoe && (
          <div className="shoe-tile uploaded">
            <img src={URL.createObjectURL(uploadedShoe.image)} alt={uploadedShoe.title} />
            <p>Name: {uploadedShoe.title}</p>
            <p>Description: {uploadedShoe.description}</p>
            <p>Brand: {uploadedShoe.brand}</p>
            <p>Size: {uploadedShoe.size}</p>
            <p>Gender: {uploadedShoe.gender}</p>
            <p>Condition: {uploadedShoe.condition}</p>
            <p>Price: ${uploadedShoe.price}</p>
          </div>
        )}
      </div>
      <div className="trade-form">
        <h2>Trade Information</h2>
        <textarea
          value={tradeInfo}
          onChange={handleTradeInfoChange}
          placeholder="Enter trade information..."
        ></textarea>
        {showSubmitError && <p className="error-message">Please upload shoe information before submitting.</p>}
        <button disabled={!isFormValid} onClick={handleTradeSubmit}>Submit Trade</button>
      </div>
      {/* Popup form for uploading information about the shoe to trade */}
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Upload Shoe Information</h2>
            <input type="file" accept="image/*" onChange={handleShoeImageChange} />
            <input type="text" name="title" placeholder="Shoe Title" value={shoeFormData.title} onChange={handleShoeFormChange} />
            <textarea name="description" placeholder="Enter description..." value={shoeFormData.description} onChange={handleShoeFormChange} />
            <input type="text" name="brand" placeholder="Brand" value={shoeFormData.brand} onChange={handleShoeFormChange} />
            <input type="text" name="size" placeholder="Size" value={shoeFormData.size} onChange={handleShoeFormChange} />
            <input type="text" name="gender" placeholder="Gender" value={shoeFormData.gender} onChange={handleShoeFormChange} />
            <input type="text" name="condition" placeholder="Condition" value={shoeFormData.condition} onChange={handleShoeFormChange} />
            <input type="text" name="price" placeholder="Price" value={shoeFormData.price} onChange={handleShoeFormChange} />
            <button onClick={closePopup}>Close</button>
            <button onClick={handleShoePost} disabled={!isFormValid}>Upload Shoe Information</button>
          </div>
        </div>
      )}
      {/* Button to open the popup form */}
      <button onClick={openPopup}>Upload Shoe Information</button>
    </div>
  );
}

export default TradePage;
