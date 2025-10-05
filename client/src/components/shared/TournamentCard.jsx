import Valo from "../../assets/Valo_game_poster.jpg";
import Bgmi from "../../assets/bgmi_game_poster_2.jpg";
import Cod from "../../assets/cod_game_poster.jpg";
import Freefire from "../../assets/free_fire_live.jpeg";

import { Link } from "react-router-dom";

const TournamentCard = ({ card }) => {
  const images = {
    "Valorant": Valo,
    "Battlegrounds Mobile India": Bgmi,
    "Call of Duty": Cod,
    "Free Fire": Freefire
  };


  return (
    <div className="bg-[#0a141d]/80 backdrop-blur-sm p-4 sm:p-6 rounded-2xl border border-white/10 hover:border-[#FC4E5B]/50 hover:shadow-xl hover:shadow-[#E11D48]/20 transition-all duration-300 flex flex-col h-full group">
      
      {/* Square Image Container */}
      <div className="w-full aspect-square overflow-hidden rounded-xl mb-4 relative group bg-black flex items-center justify-center">
        <img
          src={images[card.game]}
          alt={card.title}
          className="max-h-full max-w-full object-contain rounded-xl group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Cinematic overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 mix-blend-overlay pointer-events-none rounded-xl"></div> */}

        {/* Badges on image */}
        <span
          className="absolute top-3 left-3 bg-green-700 text-white text-xs sm:text-sm font-Lex font-semibold px-2 py-1 rounded-md shadow-sm transition-colors duration-300"
          aria-label={`Tournament type: ${card.type}`}
        >
          {card.type}
        </span>

        <span
          className={`absolute top-3 right-3 text-xs sm:text-sm font-Lex font-semibold px-2 py-1 rounded-full shadow-sm text-white transition-colors duration-300 ${
            card.status === "registration-open"
              ? "bg-green-700"
              : card.status === "published"
              ? "bg-yellow-600 "
              : "bg-gray-700"
          }`}
          aria-label={`Tournament status: ${card.status}`}
        >
          {card.status}
        </span>
        </div>

        {/* Content below image */}
        <div className="flex flex-col flex-grow text-white font-Lex">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold line-clamp-2 mb-3 tracking-tight group-hover:text-white/90 transition-colors duration-300">
            {card.title}
          </h3>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between font-semibold text-xs sm:text-sm md:text-base">
              <span className="text-gray-400">Entry fee</span>
              <span className="text-red-500 font-bold">
                ₹{Number(card.entryFee?.amount ?? 0).toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between font-semibold text-xs sm:text-sm md:text-base">
              <span className="text-gray-400">Prize Pool</span>
              <span className="text-green-500 font-bold">
                ₹{Number(card.prizePool?.totalCurrency ?? 0).toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between font-semibold text-xs sm:text-sm md:text-base">
              <span className="text-gray-400">Registered</span>
              <span className="text-white font-bold">
                {`${card.registeredCount ?? 0}/${card.maxTeams ?? "-"}`}
              </span>
            </div>
          </div>

          {/* Call to action */}
          <div className="mt-auto pt-2">
            <Link to={`/tournaments/${card._id}`}>
              <button
                className="w-full bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] hover:from-[#FC4E5B] hover:to-[#E11D48] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base border border-[#E11D48]/50"
                aria-label={card.entryFee?.amount === 0 ? "Join for free" : "Join now"}
              >
                {card.entryFee?.amount === 0 ? "Join For Free" : "Join Now"}
              </button>
            </Link>
          </div>
        
      </div>
    </div>
  );
};

export default TournamentCard;
