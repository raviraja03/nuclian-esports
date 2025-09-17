import React from "react";
import Heading from "../Heading/Heading";
import Valo from "../../assets/Valo_game_poster.jpg";
import Bgmi from "../../assets/bgmi_game_poster_2.jpg";
import Cod from "../../assets/cod_game_poster.jpg";
import Button from "../Button/Button";
import Button_2 from "../Button/Button_2";
import { Link } from "react-router-dom";

const Category = () => {
  
const renderCards = category.map((card) => {
  return (
    <div
      className="bg-white/20 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/10 min-w-[280px] sm:min-w-[320px] md:min-w-[360px]"
      key={card.id}
    >
      {/* Card Container with Flex to Stick Button to Bottom */}
      <div className="flex flex-col h-full">
        {/* Card Image */}
        <div className="w-full h-48 sm:h-56 md:h-64 overflow-hidden rounded-lg relative">
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover rounded-lg transition-transform duration-300 hover:scale-105"
          />
            <span
              className="absolute top-2 left-2 bg-[#E11D48]/80 text-white text-xs font-Lex font-semibold px-2 py-1 rounded-md shadow-sm hover:bg-[#FC4E5B]/80 transition-colors duration-300"
              aria-label={`Tournament type: ${card.type}`}
            >
              {card.type}
            </span>
        
        </div>

        {/* Card Content */}
        <div className="flex flex-col flex-grow p-4 text-white font-Lex">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight mb-3">
            {card.title}
          </h3>

          <div className="flex justify-between text-sm sm:text-base font-medium mb-2">
            <span>Entry Amount:</span>
            <span>₹{card.entry_amount}</span>
          </div>

          <div className="flex justify-between text-sm sm:text-base font-medium mb-2">
            <span>Prize Pool:</span>
            <span>₹{card.price_pool}</span>
          </div>

          <div className="flex justify-between text-sm sm:text-base font-medium mb-4">
            <span>Participants:</span>
            <span>{card.participants}</span>
          </div>

          {/* Button Pushed to Bottom */}
          <div className="mt-auto">
            <Button_2 content="JOIN NOW" />
          </div>
        </div>
      </div>
    </div>
  );
});

  return (
        // <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-black py-12">

     <section className="bg-[linear-gradient(176deg,rgba(0,0,0,1)_16%,rgba(25,31,52,0.6)_40%,rgba(100,100,100,0.2)_62%,rgba(0,0,0,1)_80%)] py-12">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <Heading highlight="Featured" nohighlight="Tournaments" />

        {/* Category Cards Horizontal Scroll */}
<div className="flex overflow-x-auto space-x-6 mt-10 pb-4 custom-scroll ">
          {renderCards}
        </div>

        {/* View All Button */}
        <div className="mt-8 flex justify-center">
          <Link to="/tournaments">
            <Button content="View All" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Category;

const category = [
  {
    type:"solo",
    id: 1,
    title: "Valorant 5 GWB3",
    entry_amount: 200,
    price_pool: 7000,
    room_id: "valoi_2025_1",
    participants: "88 / 100",
    image: Valo,
  },
  {
    type:"squad",
    id: 2,
    title: "BGMI Championship",
    entry_amount: 150,
    price_pool: 7500,
    room_id: "bgmit_2025_2",
    participants: "68 / 100",
    image: Bgmi,
  },
  {
    type:"squad",
    id: 3,
    title: "COD: Mobile Summer Cup",
    entry_amount: 250,
    price_pool: 1500,
    room_id: "codt_2025_3",
    participants: "28 / 100",
    image: Cod,
  },
];