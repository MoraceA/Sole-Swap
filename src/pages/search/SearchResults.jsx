import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../../firebase'; // Adjust based on your directory structure
import { collection, query, where, getDocs } from "firebase/firestore";
import './search.css';

function SearchResults() {
  const [searchQuery, setSearchQuery] = useState("");
  const [shoes, setShoes] = useState([]);
  const [likedShoes, setLikedShoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const brandQuery = searchParams.get('query');
    if (brandQuery) {
      setSearchQuery(brandQuery);
      performSearch(brandQuery);
    }
  }, [location]);

  const performSearch = async (queryParam) => {
    setLoading(true);
    const shoesQuery = query(collection(db, "shoedisplay"), where("brand", "==", queryParam));
    try {
      const querySnapshot = await getDocs(shoesQuery);
      const fetchedShoes = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setShoes(fetchedShoes);
    } catch (error) {
      console.error("Error fetching shoes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = (shoeId) => {
    const shoeToAdd = shoes.find(shoe => shoe.id === shoeId);
    if (!likedShoes.some(shoe => shoe.id === shoeId)) {
      setLikedShoes([...likedShoes, shoeToAdd]);
    }
  };

  const navigateToLikedShoes = () => {
    navigate('/likedShoes', { state: { likedShoes } });
  };

  return (
    <div className="search-results-page">
      <header className="search-header">
        <img src="src/assets/SOLE SWAP.png" alt="Sole Swap Logo" className="logo" onClick={() => navigate('/')} />
        <div>
          <button onClick={() => navigate('/signup')}>Sign Up</button>
          <button onClick={() => navigate('/login')}>Login</button>
          <button onClick={navigateToLikedShoes}>❤️ ({likedShoes.length})</button>
        </div>
      </header>
      <div className="search-panel">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for shoes by brand..."
          className="search-input"
        />
        <button onClick={() => performSearch(searchQuery)} className="search-button">Search</button>
      </div>

      {loading ? <p>Searching...</p> : (
        <div className="shoes-container">
          {shoes.length > 0 ? shoes.map(shoe => (
            <div key={shoe.id} className="shoe-item">
              {shoe.imageURL && <img src={shoe.imageURL} alt={shoe.name} />}
              <h3>{shoe.name}</h3>
              <p>Brand: {shoe.brand}</p>
              <p>Size: {shoe.size}</p>
              <p>Condition: {shoe.condition}</p>
              <p>Price: ${shoe.value}</p>
              <button onClick={() => handleLike(shoe.id)}>Like</button>
            </div>
          )) : (!loading && <p>No results found for "{searchQuery}".</p>)}
        </div>
      )}
    </div>
  );
}

export default SearchResults;