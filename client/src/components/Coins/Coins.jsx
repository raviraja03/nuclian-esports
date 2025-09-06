import React from "react";
import coin_image from "../../assets/coin_image.png";
import { Link } from "react-router-dom";

const Coins = () => {
  return (
    <section className="py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl min-h-[40vh] bg-gradient-to-r from-[#E11D48] via-[#FC4E5B] to-[#E11D48] overflow-hidden shadow-2xl">
          
          {/* Left Content */}
          <div className="flex-1 flex flex-col p-8 lg:p-12 text-center lg:text-left text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Buy Coins
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl leading-relaxed opacity-90 mb-8">
              Battle for top-tier coin prizes in elite competitions <br />
              Unlock special discounts and in-game bundles <br />
              Experience fair matchmaking with players at your skill level
            </p>
            <Link to="/walletpage" className="inline-block">
              <button className="w-full sm:w-auto text-[#E11D48] text-lg sm:text-xl px-8 sm:px-10 py-3 sm:py-4 bg-white font-bold rounded-xl tracking-wide border-2 border-white transition-all duration-300 cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:shadow-white/20 transform">
                Buy Coins Here
              </button>
            </Link>
          </div>

          {/* Right Content */}
          <div className="flex-1 relative flex justify-center items-center mt-8 lg:mt-0">
            <img
              src={coin_image}
              alt="Coins"
              className="w-48 sm:w-64 md:w-80 lg:w-96 object-contain relative z-10 drop-shadow-2xl"
            />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 size-72 sm:size-80 md:size-96 rounded-full bg-gradient-to-r from-yellow-300/60 to-yellow-400/60 shadow-2xl shadow-yellow-400/50 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Coins;
