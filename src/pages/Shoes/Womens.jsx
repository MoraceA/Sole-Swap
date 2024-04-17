import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase'; 
import { collection, query, where, getDocs } from "firebase/firestore";

function Womens() {
  const [womensShoes, setWomensShoes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchWomensShoes = async () => {
      const shoesQuery = query(collection(db, "shoedisplay"), where("gender", "==", "Womens"));
      try {
        const querySnapshot = await getDocs(shoesQuery);
        const fetchedShoes = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setWomensShoes(fetchedShoes);
      } catch (error) {
        console.error("Error fetching women's shoes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWomensShoes();
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
      <Link to="/userhome"> Home</Link>
      <h2>Women's Shoes</h2>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Womens;
