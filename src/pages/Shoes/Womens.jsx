import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../firebase'; 
import { collection, query, where, getDocs } from "firebase/firestore";

function Womens() {
  const [womensShoes, setWomensShoes] = useState([]);
  const [likedShoes, setLikedShoes] = useState([]);
  const [loading, setLoading] = useState(false);


    // Fetching women's shoes from Firestore
  useEffect(() => {
    setLoading(true);
    const fetchWomensShoes = async () => {
      const shoesQuery = query(collection(db, "shoedisplay"), where("gender", "==", "Womens"));
      try {
        const querySnapshot = await getDocs(shoesQuery);
        const fetchedShoes = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })); // Mapping fetched documents to shoe objects
        setWomensShoes(fetchedShoes);
      } catch (error) {
        console.error("Error fetching women's shoes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWomensShoes();
  }, []);


    // Function to handle liking a shoe
  const handleLike = (shoeId) => {
    const shoeToAdd = womensShoes.find(shoe => shoe.id === shoeId);
    if (!likedShoes.some(shoe => shoe.id === shoeId)) {
      setLikedShoes([...likedShoes, shoeToAdd]);
    }
  };

  const handleTrade = (shoeId) => {
    const shoeToTrade = womensShoes.find(shoe => shoe.id === shoeId);
    navigate('/tradepage', { state: { shoeToTrade } });
  };

  const navigateToLikedShoes = () => {
    navigate('/likedShoes', { state: { likedShoes } });
  };

  return (
    <div>
      <nav>
        <ul>
          <li><a href="/women's">Women's</a></li>
          <li><a href="/mens">Men's</a></li>
          <li><a href="/kid's">Kids</a></li>
          <li><a href="/brands">Brands</a></li>
        </ul>
      </nav>
      <Link to="/userhome"> Home</Link>
      <h2>Women's Shoes</h2>
      <button onClick={navigateToLikedShoes}>❤️ ({likedShoes.length})</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="shoes-container">
          {womensShoes.map(shoe => (
            <div key={shoe.id} className="shoe-item">
              {shoe.imageURL && <img src={shoe.imageURL} alt={shoe.name} />}
              <h3>{shoe.name}</h3>
              <p>Brand: {shoe.brand}</p>
              <p>Size: {shoe.size}</p>
              <p>Condition: {shoe.condition}</p>
              <p>Price: ${shoe.value}</p>
              <button onClick={() => handleLike(shoe.id)}>Like</button>
              <button onClick={() => handleTrade(shoe.id)}>Trade</button> {/* Integrate trade functionality */}
            </div>
            <Link to={`/description/${shoe.id}`} key={shoe.id} className="shoe-item"> 
              <div className="shoe-item-content">
                {shoe.imageURL && <img src={shoe.imageURL} alt={shoe.name} />}
                <h3>{shoe.name}</h3>
                <p>Brand: {shoe.brand}</p>
                <p>Size: {shoe.size}</p>
                <p>Condition: {shoe.condition}</p>
                <p>Price: ${shoe.value}</p>
                <button onClick={() => handleLike(shoe.id)}>Like</button>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default Womens;
