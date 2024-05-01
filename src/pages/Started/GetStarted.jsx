import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../../firebase'; // Import your CSS file for styling

function GetStarted() {
  return (
    <div className="section1">
      <header className="top-header">
        <h1>Sole Swap</h1>
        <h3>Start Trading Today. </h3>
        <Link to="/createaccount"><button>Sign Up Now</button></Link> 
        <Link to="/login"><button>Sign In</button></Link> 
      </header>

      <section className="section2">
        <h2>Find the Latest Sneakers</h2>
        <h3>Trade for hot sneakers.</h3>
      </section>

      <section className="section3">
        <h2>Upload Your Unwanted Sneakers.</h2>
        <h3>Have a ton of sneakers you would like to get rid of? Don't toss them, trade them!</h3>
      </section>

      <section className="section4">
        <h2>Like Your Wanted Sneakers</h2>
        <h3>Recycle your unwanted sneakers for a new hot pair!</h3>
      </section>

      <section className="get-started">
        <h2>Trade & Leave Reviews</h2>
        <h3>After each trade, leave reviews about who you traded with.</h3>
      </section>
    </div>
  );
}

export default GetStarted;
