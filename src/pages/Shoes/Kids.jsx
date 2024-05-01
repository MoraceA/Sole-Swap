import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase'; 
import { collection, query, where, getDocs } from "firebase/firestore";

function Kids() {
  const [kidsShoes, setKidsShoes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchKidsShoes = async () => {
      const shoesQuery = query(collection(db, "shoedisplay"), where("gender", "==", "Kids"));
      try {
        const querySnapshot = await getDocs(shoesQuery);
        const fetchedShoes = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setKidsShoes(fetchedShoes);
      } catch (error) {
        console.error("Error fetching kids shoes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchKidsShoes();
  }, []);

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
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="shoes-container">
          {kidsShoes.map(shoe => (
            <div key={shoe.id} className="shoe-item">
              {shoe.imageURL && <img src={shoe.imageURL} alt={shoe.name} />}
              <h3>{shoe.name}</h3>
              <p>Brand: {shoe.brand}</p>
              <p>Size: {shoe.size}</p>
              <p>Condition: {shoe.condition}</p>
              <p>Price: ${shoe.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Kids;
