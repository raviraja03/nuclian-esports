import React from 'react';
import Valo from "../../assets/Valo_game_poster.jpg";
import Bgmi from "../../assets/bgmi_game_poster_2.jpg";
import Cod from "../../assets/cod_game_poster.jpg";
import Freefire from "../../assets/ff_game_poster.jpg";
import herobg from "../../assets/hero_image_3.png";
import Button_2 from '../Button/Button_2';
import Coins from '../Coins/Coins';


// --- Data for Tournament Cards ---
// Updated to match the property names in your new card component
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


// --- Sub-Components ---

const Banner = () => (
  <section className="relative">
    <div className="absolute left-0 z-10 h-[55vh] w-full bg-gradient-to-b from-white/20 to-black/20 pointer-events-none"></div>
    <div className="min-h-[55vh] bg-cover bg-center" style={{ backgroundImage: `url(${herobg})` }}></div>
  </section>
);

const FilterBar = () => (
  <div className="relative z-20 flex w-full items-center justify-center bg-[#b0123a]">
    <button className="mx-1.5 cursor-pointer border-b-4 border-transparent bg-transparent py-[18px] px-7 text-[1.2rem] font-bold text-white outline-none transition-all duration-200 hover:border-white">Upcoming tournament</button>
    <button className="mx-1.5 cursor-pointer border-b-4 border-transparent bg-transparent py-[18px] px-7 text-[1.2rem] font-bold text-white outline-none transition-all duration-200 hover:border-white">Ongoing tournament</button>
    <button className="mx-1.5 cursor-pointer border-b-4 border-transparent bg-transparent py-[18px] px-7 text-[1.2rem] font-bold text-white outline-none transition-all duration-200 hover:border-white">Past tournament</button>
  </div>
);

// --- TournamentCard component exactly matching your provided code ---
const TournamentCard = ({ card }) => {
    return (
        // Card container
        <div className="bg-[#0a141d] p-2 rounded-lg border-2 border-[#fc4e5b]" key={card.id}>
        
            {/* Card Image */}
            <div className="h-64 overflow-hidden">
                <img 
                    src={card.image} 
                    alt={card.title} 
                    className="h-full w-full object-cover rounded-lg" 
                />
            </div>

            {/* Card Content */}
            <div className="p-2 text-white font-['Lexend',_sans-serif]">
                <h3 className="text-3xl font-bold">{card.title}</h3>
                <div className="flex justify-between font-semibold mt-4">
                    <h4>Entry Amount:</h4>
                    <h4>{card.entry_amount}</h4>
                </div>
                <div className="flex justify-between font-semibold">
                    <h4>Price Pool:</h4>
                    <h4>{card.price_pool}</h4>
                </div>
                <div className="flex justify-between font-semibold">
                    <h4>Room ID:</h4>
                    <h4>{card.room_id}</h4>
                </div>
                <div className="flex justify-between font-semibold mb-6">
                    <h4>Participants:</h4>
                    <h4>{card.participants}</h4>
                </div>
                {/* Standard button replacing <Button_2 /> */}
                <Button_2 content="Join Now"/>
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
      <section className="px-4 md:px-12 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 px-10">
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
