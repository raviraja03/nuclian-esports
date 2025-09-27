import React from "react";
import Heading from "./Heading";
import Valo from "../assets/Valo_game_poster.jpg";
import Bgmi from "../assets/bgmi_game_poster.jpg";
import Cod from "../assets/cod_game_poster.jpg";
import Freefire from "../assets/ff_game_poster_2.jpg";
import F1 from "../assets/f1_game_poster.jpg";
import Fortnite from "../assets/fortnite_game_poster.jpg";

const Games = () => {
  return (
    <section className="bg-[linear-gradient(176deg,rgba(0,0,0,1)_16%,rgba(25,31,52,0.6)_40%,rgba(100,100,100,0.2)_62%,rgba(0,0,0,1)_80%)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-10 text-white">
        <Heading highlight="Featured" nohighlight="Games" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-10">
          {/* F1 - spans 2 columns on large screens */}
          <div className="lg:col-span-2 relative group hover:scale-105 transition-transform duration-300 ease-out cursor-pointer aspect-[16/9] rounded-lg overflow-hidden shadow-lg">
            <img
              src={F1}
              alt="F1 Racing"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="font-Lex font-semibold text-sm sm:text-base">
                F1
              </span>
            </div>
          </div>

          {/* Bgmi */}
          <div className="relative group hover:scale-105 transition-transform duration-300 ease-out cursor-pointer aspect-[16/9] rounded-lg overflow-hidden shadow-lg">
            <img
              src={Bgmi}
              alt="Battlegrounds Mobile India"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="font-Lex font-semibold text-sm sm:text-base">
                BGMI
              </span>
            </div>
          </div>

          {/* Cod */}
          <div className="relative group hover:scale-105 transition-transform duration-300 ease-out cursor-pointer aspect-[16/9] rounded-lg overflow-hidden shadow-lg">
            <img
              src={Cod}
              alt="Call of Duty Mobile"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="font-Lex font-semibold text-sm sm:text-base">
                COD
              </span>
            </div>
          </div>

          {/* Valo */}
          <div className="relative group hover:scale-105 transition-transform duration-300 ease-out cursor-pointer aspect-[16/9] rounded-lg overflow-hidden shadow-lg">
            <img
              src={Valo}
              alt="Valorant"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="font-Lex font-semibold text-sm sm:text-base">
                Valorant
              </span>
            </div>
          </div>

          {/* Freefire */}
          <div className="relative group hover:scale-105 transition-transform duration-300 ease-out cursor-pointer aspect-[16/9] rounded-lg overflow-hidden shadow-lg">
            <img
              src={Freefire}
              alt="Free Fire"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="font-Lex font-semibold text-sm sm:text-base">
                Free Fire
              </span>
            </div>
          </div>

          {/* Fortnite - spans 2 columns on large screens */}
          <div className="lg:col-span-2 relative group hover:scale-105 transition-transform duration-300 ease-out cursor-pointer aspect-[16/9] rounded-lg overflow-hidden shadow-lg">
            <img
              src={Fortnite}
              alt="Fortnite"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="font-Lex font-semibold text-sm sm:text-base">
                Fortnite
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Games;
