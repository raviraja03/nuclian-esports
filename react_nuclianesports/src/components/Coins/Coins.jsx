import React from "react";
import coin_image from "../../assets/coin_image.png";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

// from-[#C0103F] via-[#260E27] to-[#000]
// #230957
// 7338AD

const Coins = () => {
  return (
    <section>
      <div className="max-w-full mx-auto px-15 py-10 text-white font-Lex mt-8 mb-5">
        <div className="flex justify-between rounded-lg mx-[50px] min-h-[30vh] bg-gradient-to-r from-indigo-800 via-indigo-700 to-indigo-600 overflow-hidden">
          <div className="flex flex-col p-5">
            <h1 className="text-3xl font-bold">Buy Coins</h1>
            <p className="mt-5 ">
                Battle for top-tier coin prizes in elite competitions <br />
                Unlock special discounts and in-game bundles <br />
                Experience fair matchmaking with players at your skill level
            </p>
            <Link to="/walletpage">
              <button className=" max-w-64 text-black text-xl mt-14 px-3 py-3 bg-white font-Lex font-semibold rounded-lg tracking-wide border-2 border-white  transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-none">
                Buy coins here
              </button>
            </Link>
          </div>

          <div className="flex flex-col relative">
            <img
              src={coin_image}
              className="h-full w-full object-fill rounded-lg z-10"
            />
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 size-96 rounded-full bg-gradient-to-r from-yellow-300/88 to-yellow-300/88 shadow-lg shadow-pink-400/50 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Coins;
