import React from 'react';
import Valo from "../../assets/Valo_game_poster.jpg";
import Bgmi from "../../assets/bgmi_game_poster_2.jpg";
import Cod from "../../assets/cod_game_poster.jpg";
import Freefire from "../../assets/ff_game_poster.jpg";
import herobg from "../../assets/hero_image_3.png";
import Button_2 from '../Button/Button_2';
import Coins from '../Coins/Coins';

// --- Tournament Data ---
const tournamentsData = [
  {
    id: 1,
    title: "Valorant 5 GWB3",
    image: Valo,
    entry_amount: 200,
    price_pool: 70000,
    room_id: "valoi_2025_1",
    participants: "88 / 100",
  },
  {
    id: 2,
    title: "BGMI Championship",
    image: Bgmi,
    entry_amount: 150,
    price_pool: 75000,
    room_id: "bgmit_2025_2",
    participants: "68 / 100",
  },
  {
    id: 3,
    title: "COD: Mobile Summer Cup",
    image: Cod,
    entry_amount: 250,
    price_pool: 15000,
    room_id: "codt_2025_3",
    participants: "28 / 100",
  },
  {
    id: 4,
    title: "Apex Legends Showdown",
    image: Freefire,
    entry_amount: 300,
    price_pool: 100000,
    room_id: "apex_2025_1",
    participants: "50 / 60",
  },
  {
    id: 5,
    title: "Fortnite Elite Clash",
    image: Bgmi,
    entry_amount: 100,
    price_pool: 50000,
    room_id: "fort_2025_5",
    participants: "95 / 100",
  },
  {
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
  <section className="relative">
    <div className="absolute left-0 z-10 h-[55vh] w-full bg-gradient-to-b from-black/40 to-black/80 pointer-events-none"></div>
    <div
      className="min-h-[55vh] bg-cover bg-center"
      style={{ backgroundImage: `url(${herobg})` }}
    ></div>
  </section>
);

// --- Filter Bar Component ---
const FilterBar = () => (
  <div className="relative z-20 flex flex-wrap items-center justify-center bg-[#b0123a] px-2">
    <button className="mx-1.5 my-2 border-b-4 border-transparent bg-transparent py-3 px-5 text-[1rem] md:text-[1.2rem] font-bold text-white outline-none transition-all duration-200 hover:border-white">
      Upcoming
    </button>
    <button className="mx-1.5 my-2 border-b-4 border-transparent bg-transparent py-3 px-5 text-[1rem] md:text-[1.2rem] font-bold text-white outline-none transition-all duration-200 hover:border-white">
      Ongoing
    </button>
    <button className="mx-1.5 my-2 border-b-4 border-transparent bg-transparent py-3 px-5 text-[1rem] md:text-[1.2rem] font-bold text-white outline-none transition-all duration-200 hover:border-white">
      Past
    </button>
  </div>
);

// --- TournamentCard Component ---
const TournamentCard = ({ card }) => {
  return (
    <div className="bg-[#0a141d] p-3 rounded-lg border-2 border-[#fc4e5b] flex flex-col">
      {/* Image */}
      <div className="h-48 md:h-64 overflow-hidden rounded-lg">
        <img
          src={card.image}
          alt={card.title}
          className="h-full w-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-3 text-white font-['Lexend',_sans-serif] flex flex-col flex-grow">
        <h3 className="text-xl md:text-2xl font-bold line-clamp-2">{card.title}</h3>
        <div className="flex justify-between font-semibold mt-3 text-sm md:text-base">
          <span>Entry:</span>
          <span>₹{card.entry_amount}</span>
        </div>
        <div className="flex justify-between font-semibold text-sm md:text-base">
          <span>Prize:</span>
          <span>₹{card.price_pool}</span>
        </div>
        <div className="flex justify-between font-semibold text-sm md:text-base">
          <span>Room ID:</span>
          <span>{card.room_id}</span>
        </div>
        <div className="flex justify-between font-semibold mb-4 text-sm md:text-base">
          <span>Players:</span>
          <span>{card.participants}</span>
        </div>

        {/* Button */}
        <div className="mt-auto">
          <Button_2 content="Join Now" />
        </div>
      </div>
    </div>
  );
};

// --- Main Page Content ---
const TournamentsPageContent = () => {
  return (
    <main className="bg-black text-white font-['Lexend',_sans-serif]">
      <Banner />
      <FilterBar />
      <section className="px-4 md:px-12 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
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
