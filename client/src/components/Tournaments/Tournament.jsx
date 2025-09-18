import React, { useState } from "react";
import Valo from "../../assets/Valo_game_poster.jpg";
import Bgmi from "../../assets/bgmi_game_poster_2.jpg";
import Cod from "../../assets/cod_game_poster.jpg";
import Freefire from "../../assets/ff_game_poster.jpg";
import Button_2 from "../Button/Button_2";
import Coins from "../Coins/Coins";
import { Link } from "react-router-dom";
import { useGetTournamentsQuery } from "../../globalState/api/tournamentApi";
import LoadingScreen from "../shared/LoadingScreen";


// --- TournamentCard Component (Unchanged) ---
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
            <span className="text-[#E11D48] font-bold">₹{card.entryFee.amount}</span>
          </div>
          <div className="flex justify-between font-semibold text-xs sm:text-sm md:text-base">
            <span className="text-gray-300">Prize:</span>
            <span className="text-[#FC4E5B] font-bold">₹{card.prizePool.totalCurrency}</span>
          </div>
          <div className="flex justify-between font-semibold text-xs sm:text-sm md:text-base">
            <span className="text-gray-300">Players:</span>
            <span className="text-yellow-400">{`${card.registeredPlayersCount}/${card.maxParticipants}`}</span>
          </div>
        </div>

        {/* Button - Sticky to bottom */}
        <div className="mt-auto pt-2">
          <Link to={`/tournaments/${card._id}`}>
            <button
              className="w-full bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] hover:from-[#FC4E5B] hover:to-[#E11D48] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base border border-[#E11D48]/50 animate-pulse-hover"
            >
              {card.entryFee.amount === 0 ? "Join For Free" : "Join Now"}
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

// --- Main Page Content ---
const TournamentsPageContent = () => {
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);

  const {
    data:tournamentsResponse={} ,
    isLoading,
    isError,

  } = useGetTournamentsQuery({ page, limit: 6 });

  console.log(tournamentsResponse);

  const { data: tournamentsDatas = [], pagination } = tournamentsResponse;
// console.log(tournamentsDatas);
  // Filter tournaments based on status
  const filteredTournaments = tournamentsDatas.filter((tournament) => {
    if (filter === "all") return true;
    return tournament.status === filter;
  });

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPage(newPage);
    }
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return (
      <div className="flex h-screen bg-black/95 text-white font-Lex items-center justify-center">
        <p className="text-red-500 text-center text-lg sm:text-xl">
          Failed to load tournaments. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <main className="bg-black/95 text-white font-Lex relative min-h-screen mt-[12vh] px-4 sm:px-6 lg:px-12 py-8 sm:py-10 lg:py-12">
      {/* Dropdown Filter */}
      <div className="mb-6 sm:mb-8">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full sm:w-64 bg-[#0a141d]/60 backdrop-blur-md border border-white/20 text-white rounded-lg px-4 py-3 text-sm sm:text-base font-Lex focus:outline-none focus:ring-2 focus:ring-[#E11D48] transition-all duration-300 hover:border-[#FC4E5B]/50"
          aria-label="Filter tournaments by status"
        >
          <option value="all">All Tournaments</option>
          <option value="registration-open">Upcoming</option>
          <option value="in-progress">Ongoing</option>
          <option value="completed">Past</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Tournament Grid */}
      <section className="relative z-10">
        {filteredTournaments.length === 0 ? (
          <p
            className="text-gray-300 text-sm sm:text-base text-center"
            aria-live="polite"
          >
            No tournaments found for this filter.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {filteredTournaments.map((cardData, index) => (
              <TournamentCard key={cardData.id || index} card={cardData} />
            ))}
          </div>
        )}
      </section>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="mt-8 sm:mt-10 flex justify-center">
          <nav
            className="bg-[#0a141d]/60 backdrop-blur-md border border-white/10 rounded-lg p-3 sm:p-4 flex items-center gap-2 sm:gap-3"
            aria-label="Pagination"
          >
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={!pagination.hasPrevPage}
              className={`px-3 sm:px-4 py-2 text-sm sm:text-base font-Lex text-white rounded-md border border-white/20 hover:bg-[#E11D48]/20 hover:border-[#FC4E5B]/50 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#E11D48] ${
                !pagination.hasPrevPage ? "bg-gray-700/50" : "bg-[#0a141d]/80"
              }`}
              aria-label="Previous page"
            >
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex gap-1 sm:gap-2">
              {[...Array(pagination.totalPages)].map((_, index) => {
                const pageNum = index + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-3 sm:px-4 py-2 text-sm sm:text-base font-Lex rounded-md border border-white/20 transition-all duration-300 ${
                      pageNum === page
                        ? "bg-[#E11D48] text-white border-[#FC4E5B]"
                        : "bg-[#0a141d]/80 text-white hover:bg-[#E11D48]/20 hover:border-[#FC4E5B]/50 hover:-translate-y-0.5"
                    } focus:outline-none focus:ring-2 focus:ring-[#E11D48]`}
                    aria-current={pageNum === page ? "page" : undefined}
                    aria-label={`Page ${pageNum}`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={!pagination.hasNextPage}
              className={`px-3 sm:px-4 py-2 text-sm sm:text-base font-Lex text-white rounded-md border border-white/20 hover:bg-[#E11D48]/20 hover:border-[#FC4E5B]/50 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#E11D48] ${
                !pagination.hasNextPage ? "bg-gray-700/50" : "bg-[#0a141d]/80"
              }`}
              aria-label="Next page"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </main>
  );
};

export default TournamentsPageContent;