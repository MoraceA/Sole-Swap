import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './likedShoes.css'; // Ensure this CSS file is updated as below

function LikedShoes() {
  const location = useLocation();
  const { likedShoes } = location.state ?? { likedShoes: [] }; // Fallback to empty array if state is undefined

  return (
    <div className="liked-shoes-page">
      <div className="header">
        <Link to="/">
          <img src="src/assets/SOLE SWAP transparent.png" alt="Sole Swap Logo" className="logo" /> {/* Update your logo path */}
        </Link>
        <h1>Liked Shoes</h1>
      </div>
      <div className="content">
        {likedShoes.length > 0 ? (
          <div className="shoes-container">
            {likedShoes.map((shoe) => (
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
        ) : (
          <p>No liked shoes yet.</p>
        )}
      </div>
    </div>
  );
}

export default LikedShoes;
