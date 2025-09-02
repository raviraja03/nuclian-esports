import React from "react";
import herobg from "../../assets/hero_image_2.png";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${herobg})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
            {/* Hero Content */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                JOIN THE ULTIMATE
          <br />
          <span className="text-[#E11D48]">ESPORTS</span> EXPERIENCE
          <br />
          TODAY!
            </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed opacity-90">
                Dive into thrilling tournaments and connect with fellow gamers.
                <br />
                Discover your next favorite game and be part of our vibrant community!
            </p>
        
            {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                <Link to="/tournaments">
                  <Button content="Tournaments"/>
                </Link>
                <Link to="/leaderboard">
                  <Button content="Leaderboard"/>
                </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;