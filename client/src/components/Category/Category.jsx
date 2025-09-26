import React from "react";
import Heading from "../Heading/Heading";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import Valo from "../../assets/Valo_game_poster.jpg";
import Bgmi from "../../assets/bgmi_game_poster_2.jpg";
import Cod from "../../assets/cod_game_poster.jpg";
import Freefire from "../../assets/free_fire_live.jpeg";
const images = {
  Valorant: Valo,
  "Battlegrounds Mobile India": Bgmi,
  "Call of Duty": Cod,
  "Free Fire": Freefire,
};

const Category = ({ tournaments }) => {
  return (
    <section className="bg-[linear-gradient(176deg,rgba(0,0,0,1)_16%,rgba(25,31,52,0.6)_40%,rgba(100,100,100,0.2)_62%,rgba(0,0,0,1)_80%)] py-12">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <Heading highlight="Featured" nohighlight="Tournaments" />

        <div className="flex overflow-x-auto space-x-6 mt-10 pb-4 custom-scroll justify-center">
          {tournaments.map((card, index) => {
            return (
              <div
                key={index}
                className="bg-black/70 p-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-red-600/40 backdrop-blur-md min-w-[280px] sm:min-w-[320px] md:min-w-[360px] "
              >
                <div className="flex flex-col h-full">
                  {/* Card Image */}
                  <div className="w-full h-48 sm:h-56 md:h-64 overflow-hidden rounded-lg relative">
                    <img
                      src={images[card.game]}
                      alt={card.title}
                      className="w-full h-full object-top rounded-lg transition-transform duration-500 hover:scale-110"
                    />
                    <span
                      className="absolute top-2 left-2 bg-red-700/80 text-white text-xs font-Lex font-bold px-2 py-1 rounded-md shadow-lg"
                      aria-label={`Tournament type: ${card.type}`}
                    >
                      {card.type}
                    </span>
                    {/* Optional spark/overlay effect */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-transparent to-red-900/40 mix-blend-overlay"></div>
                  </div>

                  {/* Card Content */}
                  <div className="flex flex-col flex-grow p-4 text-white font-Lex">
                    <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-wider uppercase mb-3 drop-shadow-lg">
                      {card.title}
                    </h3>

                    <div className="flex justify-between text-sm sm:text-base font-semibold mb-2">
                      <span className="text-gray-400">Entry:</span>
                      <span className="text-red-500 font-bold">
                        ₹{card.entryFee.amount}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm sm:text-base font-semibold mb-2">
                      <span className="text-gray-400">Prize:</span>
                      <span className="text-red-400 font-bold">
                        ₹{card.prizePool.totalCurrency}
                      </span>
                    </div>

                    {/* Button at bottom */}
                    <div className="mt-auto pt-2">
                      <Link to={`/tournaments/${card._id}`}>
                        <button className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-sm sm:text-base border border-red-500/50 animate-pulse">
                          {card.entryFee.amount === 0
                            ? "Join For Free"
                            : "Join Now"}
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        {/* <div className="mt-8 flex justify-center">
          <Link to="/tournaments">
            <Button content="View All" />
          </Link>
        </div> */}
      </div>
    </section>
  );
};

export default Category;
