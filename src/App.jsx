import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from '../src/pages/Home/HomePage'; // Assuming this is the path to your homepage
import CreateAccount from '../src/pages/Authentication/CreateAccount'; 
function App() {
  return (
    <Router>
      <Routes>
      <Route exact path="/" element={<Homepage />} />
        <Route path="/home" element={<Homepage />} />
        <Route exact path="/createaccount" element={<CreateAccount />} />
      </Routes>
    </Router>
  );
}

export default App;





