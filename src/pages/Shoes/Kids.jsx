import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../firebase'; 
import { collection, query, where, getDocs } from "firebase/firestore";

function Kids() {
  const [kidsShoes, setKidsShoes] = useState([]);
  const [likedShoes, setLikedShoes] = useState([]);
  const [loading, setLoading] = useState(false);



  // Fetching kids' shoes from Firestore
  useEffect(() => {
    setLoading(true);
    const fetchKidsShoes = async () => {
      const shoesQuery = query(collection(db, "shoedisplay"), where("gender", "==", "Kids"));
      try {
        const querySnapshot = await getDocs(shoesQuery);
        const fetchedShoes = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));  // Mapping fetched documents to shoe objects
        setKidsShoes(fetchedShoes);  // Setting state with fetched shoes
      } catch (error) {
        console.error("Error fetching kids shoes:", error); // Handling errors
      } finally {
        setLoading(false);  // Set loading state to false after data is fetched
      }
    };
    fetchKidsShoes();  // Calling fetchKidsShoes function
  }, []);  // Dependency array ensures useEffect runs only once when component mounts



  //function to handle liking a shoe 
  const handleLike = (shoeId) => {
    const shoeToAdd = kidsShoes.find(shoe => shoe.id === shoeId);
    if (!likedShoes.some(shoe => shoe.id === shoeId)) {
      setLikedShoes([...likedShoes, shoeToAdd]);
    }
  };

  const handleTrade = (shoeId) => {
    const shoeToTrade = kidsShoes.find(shoe => shoe.id === shoeId);
    navigate('/tradepage', { state: { shoeToTrade } });
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
      <Link to="/userhome">Go to Home Page</Link>
      <h2>Kids Shoes</h2>
      <Link to={{ pathname: "/likedShoes", state: { likedShoes } }}>❤️ ({likedShoes.length})</Link>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="shoes-container">
          {kidsShoes.map(shoe => (
            <Link to={`/description/${shoe.id}`} key={shoe.id} className="shoe-item"> {/* Updated Link component */}
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

export default Kids;
