import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../firebase'; 
import { collection, query, where, getDocs } from "firebase/firestore";

function Brands() {
  const [brandsData, setBrandsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchBrandsData = async () => {
      const brandsQuery = query(collection(db, "shoedisplay"), where("gender", "!=", "Kids"));
      try {
        const querySnapshot = await getDocs(brandsQuery);
        const fetchedBrandsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setBrandsData(fetchedBrandsData);
      } catch (error) {
        console.error("Error fetching brands:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBrandsData();
  }, []);

  const groupShoesByBrand = () => {
    const groupedBrands = {};
    brandsData.forEach(shoe => {
      if (!groupedBrands[shoe.brand]) {
        groupedBrands[shoe.brand] = [];
      }
      groupedBrands[shoe.brand].push(shoe);
    });
    return groupedBrands;
  };

  const groupedBrands = groupShoesByBrand();

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
      <Link to="/">Go to Home Page</Link>
      <h2>Brands</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {Object.keys(groupedBrands).map((brand, index) => (
            <div key={index}>
              <h3>{brand}</h3>
              <div className="shoes-container">
                {groupedBrands[brand].map(shoe => (
                  <div key={shoe.id} className="shoe-item">
                    {shoe.imageURL && <img src={shoe.imageURL} alt={shoe.name} />}
                    <h3>{shoe.name}</h3>
                    <p>Brand: {shoe.brand}</p>
                    <p>Size: {shoe.size}</p>
                    <p>Gender: {shoe.gender}</p>
                    <p>Condition: {shoe.condition}</p>
                    <p>Price: ${shoe.value}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Brands;
