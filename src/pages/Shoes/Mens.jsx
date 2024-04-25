import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase'; 
import { collection, query, where, getDocs } from "firebase/firestore";

function Mens() {
  const [mensShoes, setMensShoes] = useState([]);
  const [likedShoes, setLikedShoes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchMensShoes = async () => {
      const shoesQuery = query(collection(db, "shoedisplay"), where("gender", "==", "Mens"));
      try {
        const querySnapshot = await getDocs(shoesQuery);
        const fetchedShoes = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMensShoes(fetchedShoes);
      } catch (error) {
        console.error("Error fetching men's shoes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMensShoes();
  }, []);

  const handleLike = (shoeId) => {
    const shoeToAdd = mensShoes.find(shoe => shoe.id === shoeId);
    if (!likedShoes.some(shoe => shoe.id === shoeId)) {
      setLikedShoes([...likedShoes, shoeToAdd]);
    }
  };

  return (
    <div>
      <Link to="/">Go to Home Page</Link>
      <h2>Men's Shoes</h2>
      <Link to={{ pathname: "/likedShoes", state: { likedShoes } }}>❤️ ({likedShoes.length})</Link>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="shoes-container">
          {mensShoes.map(shoe => (
            <div key={shoe.id} className="shoe-item">
              {shoe.imageURL && <img src={shoe.imageURL} alt={shoe.name} />}
              <h3>{shoe.name}</h3>
              <p>Brand: {shoe.brand}</p>
              <p>Size: {shoe.size}</p>
              <p>Condition: {shoe.condition}</p>
              <p>Price: ${shoe.value}</p>
              <button onClick={() => handleLike(shoe.id)}>Like</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Mens;
