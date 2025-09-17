import React from "react";
import herobg from "../../assets/hero_image_2.png";
import es from "../../assets/es.png";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
     <section className="relative min-h-[80vh] sm:min-h-screen flex items-center justify-center overflow-hidden  mt-[4vh] ">
      <div
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transform transition-transform duration-300"
        style={{ backgroundImage: `url(${es})` }}
      >
        {/* <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30 backdrop-blur-md"></div> */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/30"></div> */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black/10"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 text-center text-white">
        {/* Hero Content */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight tracking-tight font-Lex animate-fade-in">
          JOIN THE ULTIMATE
          <br />
          <span className="text-[#E11D48]">ESPORTS</span> EXPERIENCE
          <br />
          TODAY!
        </h1>

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed opacity-90 font-Lex animate-slide-up">
          Dive into thrilling tournaments and connect with fellow gamers.
          <br className="hidden sm:block" />
          Discover your next favorite game and be part of our vibrant community!
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center">
          <Link to="/tournaments">
            <Button
              content="Tournaments"
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] text-white font-bold rounded-xl text-sm sm:text-base lg:text-lg tracking-wide border-2 border-white/20 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E11D48]/50 animate-slide-up"
            />
          </Link>
          <Link to="/leaderboard">
            <Button
              content="Leaderboard"
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] text-white font-bold rounded-xl text-sm sm:text-base lg:text-lg tracking-wide border-2 border-white/20 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#E11D48]/50 animate-slide-up"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
