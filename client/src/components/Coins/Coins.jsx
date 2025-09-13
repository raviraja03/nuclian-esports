import React from "react";
import coin_image from "../../assets/coin_image.png";
import { Link } from "react-router-dom";

const Coins = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl min-h-[40vh] bg-gradient-to-r from-[#E11D48] via-[#FC4E5B] to-[#E11D48] overflow-hidden shadow-2xl backdrop-blur-sm border border-white/10">
          <div className="flex flex-col lg:flex-row items-center">
            {/* Left Content */}
            <div className="flex-1 flex flex-col p-6 sm:p-8 lg:p-12 text-center lg:text-left text-white">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 tracking-tight">
                Buy Coins
              </h1>
              <p className="text-base sm:text-lg md:text-xl leading-relaxed opacity-90 mb-6 sm:mb-8">
                Battle for top-tier coin prizes in elite competitions<br />
                Unlock special discounts and in-game bundles<br />
                Experience fair matchmaking with players at your skill level
              </p>
              <Link to="/walletpage" className="inline-block">
                <button className="w-full sm:w-auto text-white text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] font-bold rounded-xl tracking-wide border-2 border-white/20 transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-2xl hover:shadow-white/30 focus:outline-none focus:ring-2 focus:ring-white/50">
                  Buy Coins Here
                </button>
              </Link>
            </div>

            {/* Right Content */}
            <div className="flex-1 relative flex justify-center items-center mt-6 lg:mt-0 py-8 lg:py-0">
              <img
                src={coin_image}
                alt="NuclianEsports Coins"
                className="w-40 sm:w-56 md:w-72 lg:w-96 object-contain relative z-10 drop-shadow-2xl transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/3 size-64 sm:size-80 md:size-96 lg:size-112 rounded-full bg-gradient-to-r from-yellow-300/50 to-yellow-400/50 shadow-2xl shadow-yellow-400/40 blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Coins;