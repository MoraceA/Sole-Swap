import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate along with useLocation for searching// may need to add to router too
import { db } from '../../../firebase'; // Adjust the import path accordingly
import { collection, query, where, getDocs } from "firebase/firestore";

function SearchResults() {
  const [searchQuery, setSearchQuery] = useState("");
  const [shoes, setShoes] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation(); 
  const navigate = useNavigate(); 

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const brandQuery = searchParams.get('query'); // Get the brand
    if (brandQuery) {
      setSearchQuery(brandQuery); 
      performSearch(brandQuery); 
    }
  }, [location.search]);

  const performSearch = async (queryParam) => {
    if (!queryParam.trim()) {
      setLoading(false);
      return; // Exit if no query parameter is present
    }

    setLoading(true);
    const shoesQuery = query(collection(db, "shoedisplay"), where("brand", "==", queryParam));

    try {
      const querySnapshot = await getDocs(shoesQuery);
      const fetchedShoes = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data() // assuming the data exist
      }));
      setShoes(fetchedShoes);
    } catch (error) {
      console.error("Error fetching shoes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    // Use the performSearch function also for handling manual searches
    performSearch(searchQuery);
    // Update the URL to reflect the new search query
    navigate(`?query=${searchQuery}`);
  };

  //Style below is used for output can be changed for a css file in the future
  return (
    <>
    
      <style>{`
        .shoes-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
        }
        .shoe-item {
          border: 2px solid #000;
          padding: 10px;
          margin-bottom: 20px;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 200px;
        }
        .shoe-item img {
          margin-bottom: 10px;
          width: 100px;
          height: auto;
        }
      `}</style>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for shoes by brand..."
        />
        <button onClick={handleSearch}>Search</button>
        {loading ? (
          <p>Searching...</p>
        ) : (
          <div className="shoes-container">
            {shoes.length > 0 ? (
              shoes.map(shoe => (
                <div key={shoe.id} className="shoe-item">
                  {shoe.imageURL && <img src={shoe.imageURL} alt={shoe.name} style={{ width: '100px', height: 'auto' }} />}
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
    </>
  );
}

export default SearchResults;
