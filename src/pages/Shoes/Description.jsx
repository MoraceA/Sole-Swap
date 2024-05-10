import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase'; 
import { doc, getDoc } from "firebase/firestore";
import './Description.css'; 

function Description() {
  const { id } = useParams();
  const [shoeData, setShoeData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetching shoe data from Firestore based on id
  useEffect(() => {
    setLoading(true);
    const fetchShoeData = async () => {
      try {
        const shoeDoc = doc(db, "shoedisplay", id);  // Reference to the shoe document
        const shoeSnapshot = await getDoc(shoeDoc);// Fetching the shoe document
        if (shoeSnapshot.exists()) {
          setShoeData(shoeSnapshot.data());  // Setting shoe data if document exists
        } else {
          console.log("No such document!");  // Logging if document doesn't exist
        }
      } catch (error) {
        console.error("Error fetching shoe data:", error);  // Handling errors
      } finally {
        setLoading(false);  // Updating loading state
      }
    };
    fetchShoeData();   // Calling the fetchShoeData function
  }, [id]);   // Dependency array ensures useEffect runs when id changes



    // Rendering loading message while data is being fetched
  if (loading) {
    return <p>Loading...</p>;
  }
  // Rendering message if shoe data is not found
  if (!shoeData) {
    return <p>Shoe data not found!</p>;
  }

  // Rendering shoe description
  return (
    <div className="img-container">
      <img src={shoeData.imageURL} alt="Shoe" />
      <div className="figma-container">
        <h2>{shoeData.name}</h2>
        <p>Brand: {shoeData.brand}</p>
        <p>Size: {shoeData.size}</p>
        <p>Condition: {shoeData.condition}</p>
        <p>Price: ${shoeData.value}</p>
        <p>Description: {shoeData.description}</p>
      </div>
    </div>
  );
}

export default Description;
