import React from "react";
import Valo from "../../assets/Valo_game_poster.jpg";
import Bgmi from "../../assets/bgmi_game_poster_2.jpg";
import Cod from "../../assets/cod_game_poster.jpg";
import Freefire from "../../assets/ff_game_poster.jpg";
import herobg from "../../assets/hero_image_3.png";
import Button_2 from "../Button/Button_2";
import Coins from "../Coins/Coins";
import axios from "axios";
import { Link } from "react-router-dom";

// --- Tournament Data ---
const tournamentsData = [
  {
    type:"5v5",
    id: 1,
    title: "Valorant 5 GWB3",
    image: Valo,
    entry_amount: 200,
    price_pool: 70000,
    room_id: "valoi_2025_1",
    participants: "88 / 100",
  },
  {
      type:"4v4",
    id: 2,
    title: "BGMI Championship",
    image: Bgmi,
    entry_amount: 150,
    price_pool: 75000,
    room_id: "bgmit_2025_2",
    participants: "68 / 100",
  },
  {
      type:"4v4",
    id: 3,
    title: "COD: Mobile Summer Cup",
    image: Cod,
    entry_amount: 250,
    price_pool: 15000,
    room_id: "codt_2025_3",
    participants: "28 / 100",
  },
  {
      type:"3v3",
    id: 4,
    title: "Apex Legends Showdown",
    image: Freefire,
    entry_amount: 300,
    price_pool: 100000,
    room_id: "apex_2025_1",
    participants: "50 / 60",
  },
  {
      type:"solo",
    id: 5,
    title: "Fortnite Elite Clash",
    image: Bgmi,
    entry_amount: 100,
    price_pool: 50000,
    room_id: "fort_2025_5",
    participants: "95 / 100",
  },
  {
      type:"5v5",
    id: 6,
    title: "League of Legends Finals",
    image: Valo,
    entry_amount: 500,
    price_pool: 250000,
    room_id: "lol_2025_9",
    participants: "12 / 16",
  },
];





// --- Banner Component ---
const Banner = () => (
  <section className="relative overflow-hidden">
    <div
      className="min-h-[55vh] sm:min-h-[60vh] bg-cover bg-center bg-no-repeat transform transition-transform duration-300"
      style={{ backgroundImage: `url(${herobg})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80 backdrop-blur-sm"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-[#E11D48]/10 via-transparent to-[#FC4E5B]/10"></div>
    </div>
  </section>
);

// --- Filter Bar Component ---
const FilterBar = () => (
  <div className="relative z-20 bg-gradient-to-r from-[#b0123a] to-[#E11D48] px-4 sm:px-6 lg:px-12 py-4">
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
      <button className="border-b-2 border-transparent bg-transparent py-2 px-4 sm:px-6 text-sm sm:text-base lg:text-lg font-bold text-white outline-none transition-all duration-300 hover:border-white/80 hover:-translate-y-0.5 rounded-md">
        Upcoming
      </button>
      <button className="border-b-2 border-transparent bg-transparent py-2 px-4 sm:px-6 text-sm sm:text-base lg:text-lg font-bold text-white outline-none transition-all duration-300 hover:border-white/80 hover:-translate-y-0.5 rounded-md">
        Ongoing
      </button>
      <button className="border-b-2 border-transparent bg-transparent py-2 px-4 sm:px-6 text-sm sm:text-base lg:text-lg font-bold text-white outline-none transition-all duration-300 hover:border-white/80 hover:-translate-y-0.5 rounded-md">
        Past
      </button>
    </div>
  </div>
);

// --- TournamentCard Component ---
const TournamentCard = ({ card }) => {
  return (
    <div className="bg-[#0a141d]/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-white/10 hover:border-[#FC4E5B]/50 hover:shadow-xl hover:shadow-[#E11D48]/20 transition-all duration-300 flex flex-col h-full group">
      {/* Image */}
      <div className="h-48 sm:h-52 md:h-56 lg:h-64 overflow-hidden rounded-xl mb-4 relative">
        <img
          src={card.image}
          alt={card.title}
          className="h-full w-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      
          <span
            className="absolute top-2 left-2 bg-[#E11D48]/80 text-white text-xs sm:text-sm font-Lex font-semibold px-2 py-1 rounded-md shadow-sm hover:bg-[#FC4E5B]/80 transition-colors duration-300"
            aria-label={`Tournament type: ${card.type}`}
          >
            {card.type}
          </span>
      
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow text-white font-Lex">
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold line-clamp-2 mb-3 tracking-tight group-hover:text-[#FC4E5B] transition-colors duration-300">
          {card.title}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex justify-between font-semibold text-xs sm:text-sm md:text-base">
            <span className="text-gray-300">Entry:</span>
            <span className="text-[#E11D48] font-bold">
              ₹{card.entry_amount}
            </span>
          </div>
          <div className="flex justify-between font-semibold text-xs sm:text-sm md:text-base">
            <span className="text-gray-300">Prize:</span>
            <span className="text-[#FC4E5B] font-bold">
              ₹{card.price_pool.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between font-semibold text-xs sm:text-sm md:text-base">
            <span className="text-gray-300">Players:</span>
            <span className="text-yellow-400">{card.participants}</span>
          </div>
        </div>

        {/* Button - Sticky to bottom */}
        <div className="mt-auto pt-2">
          <Link to={`/tournaments/${card.id}`}>
            <Button_2
              content="Join Now"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Content ---
const TournamentsPageContent = () => {
  return (
    <main className="bg-black/95 text-white font-Lex relative">
      <Banner />
      <FilterBar />
      <section className="px-4 sm:px-6 lg:px-12 py-8 sm:py-10 lg:py-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {tournamentsData.map((cardData) => (
            <TournamentCard key={cardData.id} card={cardData} />
          ))}
        </div>
      </section>
      <Coins />
    </main>
  );
};

export default TournamentsPageContent;
