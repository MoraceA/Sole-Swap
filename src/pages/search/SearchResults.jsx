import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../../firebase'; // Adjust the import path to where your firebase.js is located relative to this file
import { collection, query, where, getDocs } from "firebase/firestore";
import './search.css';

function SearchResults() {
  const [searchQuery, setSearchQuery] = useState("");
  const [shoes, setShoes] = useState([]);
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
    if (!queryParam.trim()) {
      setLoading(false);
      return;
    }

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

  const handleSearch = () => {
    navigate(`?query=${searchQuery}`);
    performSearch(searchQuery);
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for shoes by brand..."
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">Search</button>
      {loading ? (
        <p>Searching...</p>
      ) : (
        <div className="shoes-container">
          {shoes.length > 0 ? (
            shoes.map(shoe => (
              <div key={shoe.id} className="shoe-item">
                {shoe.imageURL && <img src={shoe.imageURL} alt={shoe.name} />}
                <h3>Name: {shoe.name}</h3>
                <p>Type: {shoe.type}</p>
                <p>Price: {shoe.value}</p>
              </div>
            ))
          ) : (
            !loading && <p>No results found for "{searchQuery}".</p>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
