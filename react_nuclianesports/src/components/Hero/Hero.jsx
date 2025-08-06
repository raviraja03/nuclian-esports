import React from "react";
import herobg from "../../assets/hero_image_2.png";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section>
      <div className="max-w-full min-h-[80vh] p-15 bg-contain bg-center mt-18 rounded-lg bg-black/30 bg-blend-color" style={{ backgroundImage: `url(${herobg})` }}>
        <div className="flex flex-col text-white justify-start mt-40 font-Lex">
            {/* Hero Content */}
            <h1 className="text-6xl font-bold text-shadow-sm/20 text-shadow-white">
                JOIN THE ULTIMATE
                <br />ESPORTS EXPERIENCE
                <br />TODAY!
            </h1>
            <p className="text-white text-lg mt-5 text-shadow-sm/20 text-shadow-white font-semibold">
                Dive into thrilling tournaments and connect with fellow gamers.
                <br />
                Discover your next favorite game and be part of our vibrant community!
            </p>
            {/* Buttons */}
            <div className="flex gap-7 mt-5">
                <Link to="/tournaments">
                  <Button content="Tournaments"/>
                </Link>
                <Link to="/leaderboard">
                  <Button content="Leaderboard"/>
                </Link>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
