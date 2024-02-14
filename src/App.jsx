import React from 'react';
import './App.css';

const App = () => {
  return (
    <div id="root">
      <div className="header-content">
        <div>
          <img src="/path/to/sole-swap-logo.png" alt="Sole Swap Logo" className="logo" />
        </div>

        <div className="search-bar">
          <input type="text" placeholder="Search..." />
          <button>Search</button>
        </div>

        <div className="sign-up-login">
          <button>Sign Up</button>
          <button>Login</button>
          <button>🛒</button>
        </div>
      </div>

      <nav>
        <ul>
          <li><a href="/womens">Women's</a></li>
          <li><a href="/mens">Men's</a></li>
          <li><a href="/kids">Kids</a></li>
          <li><a href="/brands">Brands</a></li>
        </ul>
      </nav>
    </div>
  );
}

export default App;

