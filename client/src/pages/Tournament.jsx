import React, { useState } from "react";
import { useGetTournamentsQuery } from "../globalState/api/tournamentApi";
import TournamentCard from "../components/shared/TournamentCard";
import LoadingScreen from "../components/shared/LoadingScreen";

const TournamentsPageContent = () => {
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);

  const {
    data: tournamentsResponse = {},
    isLoading,
    isError,
  } = useGetTournamentsQuery({
    page,
    limit: 6,
    isVisible: true,
    status: `
      published,
      registration-open,
      registration-closed,
      check-in,
      in-progress,
      completed,
      cancelled,
    `,
  });

  const { data: tournamentsData = [], pagination = {} } = tournamentsResponse;
  const filteredTournaments = tournamentsData.filter((tournament) => {
    if (filter === "all") return true;
    return tournament.status === filter;
  });

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPage(newPage);
    }
  };

  // Create pagination numbers with ellipsis
  const getPaginationRange = () => {
    const total = pagination.totalPages || 1;
    const delta = 2;
    const range = [];
    for (
      let i = Math.max(2, page - delta);
      i <= Math.min(total - 1, page + delta);
      i++
    ) {
      range.push(i);
    }
    if (page - delta > 2) range.unshift("...");
    if (page + delta < total - 1) range.push("...");
    range.unshift(1);
    if (total > 1) range.push(total);
    return range;
  };

  if (isLoading) return <LoadingScreen />;

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
    <main className="bg-black/95 text-white font-Lex relative min-h-screen mt-[12vh] px-4 sm:px-6 lg:px-12 py-10">
      {/* Dropdown Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-wide">
          Tournaments
        </h1>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full sm:w-64 bg-[#0a141d]/60 backdrop-blur-md border border-white/20 text-white rounded-lg px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#E11D48] transition-all duration-300 hover:border-[#FC4E5B]/50"
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
          <p className="text-gray-400 text-center py-10 text-base sm:text-lg">
            No tournaments found for this filter.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 [@media(min-width:1450px)]:grid-cols-4 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredTournaments.map((cardData, index) => (
              <div
                key={index}
                className="transition-transform transform hover:-translate-y-1 hover:scale-[1.02] duration-300"
              >
                <TournamentCard card={cardData} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="mt-12 flex justify-center">
          <nav
            className="bg-[#0a141d]/60 backdrop-blur-md border border-white/10 rounded-xl p-4 flex items-center gap-2 sm:gap-3"
            aria-label="Pagination"
          >
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={!pagination.hasPrevPage}
              className={`px-4 py-2 text-sm sm:text-base rounded-md border border-white/20 transition-all duration-300 ${
                !pagination.hasPrevPage
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-[#E11D48]/20 hover:border-[#FC4E5B]/50"
              }`}
            >
              Prev
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1 sm:gap-2">
              {getPaginationRange().map((num, idx) =>
                num === "..." ? (
                  <span
                    key={idx}
                    className="px-2 text-gray-400 select-none text-sm"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={num}
                    onClick={() => handlePageChange(num)}
                    className={`px-3 sm:px-4 py-2 text-sm sm:text-base rounded-md border border-white/20 transition-all duration-300 ${
                      page === num
                        ? "bg-[#E11D48] text-white border-[#FC4E5B]"
                        : "hover:bg-[#E11D48]/20 hover:border-[#FC4E5B]/50"
                    }`}
                  >
                    {num}
                  </button>
                )
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={!pagination.hasNextPage}
              className={`px-4 py-2 text-sm sm:text-base rounded-md border border-white/20 transition-all duration-300 ${
                !pagination.hasNextPage
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-[#E11D48]/20 hover:border-[#FC4E5B]/50"
              }`}
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
