import Valo from "../../assets/Valo_game_poster.jpg";
import Bgmi from "../../assets/bgmi_game_poster_2.jpg";
import Cod from "../../assets/cod_game_poster.jpg";
import Freefire from "../../assets/ff_game_poster.jpg";
import { Link } from "react-router-dom";


const FeaturedCard = ({ card }) => {
  const images = {
    Valorant: Valo,
    "Battlegrounds Mobile India": Bgmi,
    "Call of Duty": Cod,
    "Free Fire": Freefire,
  };
  return (
    <div className="bg-white/20 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 backdrop-blur-sm border border-white/10 min-w-[280px] sm:min-w-[320px] md:min-w-[360px]">
      {/* Card Container with Flex to Stick Button to Bottom */}
      <div className="flex flex-col h-full">
        {/* Card Image */}
        <div className="w-full h-48 sm:h-56 md:h-64 overflow-hidden rounded-lg relative">
          <img
            src={images[card.game]}
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
            <span className="text-gray-300">Entry:</span>
            <span className="text-[#E11D48] font-bold">
              ₹{card.entryFee.amount}
            </span>
          </div>

          <div className="flex justify-between text-sm sm:text-base font-medium mb-2">
            <span className="text-gray-300">Prize:</span>
            <span className="text-[#FC4E5B] font-bold">
              ₹{card.prizePool.totalCurrency}
            </span>
          </div>

          <div className="flex justify-between text-sm sm:text-base font-medium mb-4">
            <span className="text-gray-300">Players:</span>
            <span className="text-yellow-400">{`${card.registeredPlayersCount}/${card.maxParticipants}`}</span>
          </div>

          {/* Button Pushed to Bottom */}
          <div className="mt-auto pt-2">
            <Link to={`/tournaments/${card._id}`}>
              <button className="w-full bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] hover:from-[#FC4E5B] hover:to-[#E11D48] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base border border-[#E11D48]/50 animate-pulse-hover">
                {card.entryFee.amount === 0 ? "Join For Free" : "Join Now"}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FeaturedCard;