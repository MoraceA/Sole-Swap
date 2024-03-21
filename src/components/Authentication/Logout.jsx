import React from 'react';
import { auth } from '/Users/ariana/Documents/Sole-Swap/firebase.js';
import { useHistory } from 'react-router-dom';

function LogoutButton() {
  const history = useHistory();

  function handleLogout() {
    auth.signOut().then(() => {
      // Redirect the user to the login page after successful logout
      history.push('/login');
    }).catch((error) => {
      console.error('Logout error:', error.message);
    });
  }

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default LogoutButton;
