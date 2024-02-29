import React from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css'; // Make sure your CSS file is correctly linked
import soleSwapLogo from '../../assets/SOLE SWAP.png'; // Adjust the path as needed for your project structure

function AboutUs() {
  return (
    <div className="about-container">
      {/* Logo with Link to Home */}
      <Link to="/">
        <img src={soleSwapLogo} alt="SoleSwap Logo" className="soleSwap-logo" />
      </Link>

      <h1>About Us</h1>
      <p>Welcome to our project! We're a passionate team dedicated to delivering the best experience through our work.</p>
      
      <div className="team">
        {/* Team member 1 */}
        <div className="team-member">
          <img src="path_to_member_1_image" alt="Member 1" className="team-photo"/>
          <h3>Member 1</h3>
          <p>Role / Position</p>
        </div>

        {/* Repeat for each team member */}
        <div className="team-member">
          <img src="path_to_member_2_image" alt="Member 2" className="team-photo"/>
          <h3>Member 2</h3>
          <p>Role / Position</p>
        </div>

        <div className="team-member">
          <img src="path_to_member_3_image" alt="Member 3" className="team-photo"/>
          <h3>Member 3</h3>
          <p>Role / Position</p>
        </div>

        <div className="team-member">
          <img src="path_to_member_4_image" alt="Member 4" className="team-photo"/>
          <h3>Member 4</h3>
          <p>Role / Position</p>
        </div>

        <div className="team-member">
          <img src="path_to_member_5_image" alt="Member 5" className="team-photo"/>
          <h3>Member 5</h3>
          <p>Role / Position</p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
