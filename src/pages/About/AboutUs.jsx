import React from 'react';
import './AboutUs.css';
import aboutUsImage from '../../assets/aboutus.png';
import ourMissionImage from '../../assets/ourmission.png';

function AboutUs() {
  return (
    <div className="about-container">
      <div className="header-content">
        <div>
          <a href="/">
            <img src="src/assets/SOLE SWAP transparent.png" alt="Sole Swap Logo" className="logo" />
          </a>
        </div>
       
        <div className="sign-up-login">
          <button>❤️</button>
          <button><a href="/createaccount">Sign Up</a></button>
          <button><a href="/login">Login</a></button>
        </div>
      </div>

      {/* Navigation Section */}
      <nav>
        <ul>
          <li><a href="/women's">Women's</a></li>
          <li><a href="/mens">Men's</a></li>
          <li><a href="/kid's">Kids</a></li>
          <li><a href="/brands">Brands</a></li>
        </ul>
      </nav>

      <div className="section about-section">
        <img src={aboutUsImage} alt="About Us" className="section-image" />
        <div className="section-text">
          <h1>ABOUT US</h1>
          <p>WELCOME TO SOLE SWAP, THE PREMIER DESTINATION FOR SNEAKER ENTHUSIASTS LOOKING TO TRADE THEIR WAY TO THE PERFECT PAIR. AT SOLE SWAP, WE UNDERSTAND THE PASSION AND CULTURE SURROUNDING SNEAKER COLLECTING. OUR PLATFORM IS DESIGNED EXCLUSIVELY FOR TRADING SNEAKERS, PROVIDING A SEAMLESS AND SECURE ENVIRONMENT FOR ENTHUSIASTS TO CONNECT, SWAP, AND ELEVATE THEIR COLLECTIONS.</p>
          <p>AT SOLE SWAP, WE BELIEVE THAT EVERY SNEAKER HAS A STORY, AND TRADING ALLOWS ENTHUSIASTS TO NOT ONLY DIVERSIFY THEIR COLLECTIONS BUT ALSO TO SHARE THOSE STORIES WITH FELLOW SNEAKERHEADS. WHETHER YOU'RE HUNTING FOR RARE GEMS, SEEKING TO COMPLETE A SET, OR SIMPLY LOOKING TO REFRESH YOUR ROTATION, SOLE SWAP IS YOUR GATEWAY TO ENDLESS POSSIBILITIES.</p>
        </div>
      </div>
      <div className="section mission-section">
        <div className="section-text">
          <h2>OUR MISSION</h2>
          <p>AT SOLE SWAP, OUR MISSION IS SIMPLE: TO EMPOWER SNEAKER ENTHUSIASTS WORLDWIDE TO CONNECT, TRADE, AND ELEVATE THEIR COLLECTIONS. WE ARE DEDICATED TO FOSTERING A VIBRANT COMMUNITY BUILT ON TRUST, RESPECT, AND A SHARED PASSION FOR SNEAKERS.</p>
          <p>OUR MISSION IS ROOTED IN THE BELIEF THAT EVERY SNEAKER TELLS A STORY, AND BY FACILITATING TRADES, WE ENABLE OUR MEMBERS TO ENRICH THEIR COLLECTIONS WHILE FORGING MEANINGFUL CONNECTIONS WITH FELLOW ENTHUSIASTS. WE STRIVE TO PROVIDE A SEAMLESS AND SECURE PLATFORM WHERE SNEAKERHEADS CAN CONFIDENTLY ENGAGE IN TRADES, KNOWING THAT THEY ARE PART OF A SUPPORTIVE COMMUNITY THAT VALUES AUTHENTICITY AND TRANSPARENCY.</p>
          <p>THROUGH INNOVATION, INTEGRITY, AND A RELENTLESS DEDICATION TO OUR USERS, WE AIM TO REDEFINE THE SNEAKER TRADING EXPERIENCE, MAKING IT MORE ACCESSIBLE, ENJOYABLE, AND REWARDING FOR ALL. AT SOLE SWAP, WE ARE COMMITTED TO FUELING THE PASSION FOR SNEAKERS AND ENABLING OUR MEMBERS TO SWAP THEIR WAY TO SNEAKER GREATNESS. JOIN US IN OUR MISSION AND LET'S SWAP SNEAKERS, ONE STORY AT A TIME.</p>
        </div>
        <img src={ourMissionImage} alt="Our Mission" className="section-image" />
      </div>
    </div>
  );
}

export default AboutUs;
