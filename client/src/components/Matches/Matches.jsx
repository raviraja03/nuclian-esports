import React, { useState, useEffect } from "react";
import { useGetMyTournamentsQuery } from "../../globalState/api/tournamentApi"; // Adjust path to RTK Query API
import LoadingScreen from "../shared/LoadingScreen"; // Adjust path to LoadingScreen
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { formatDate12Hour } from "../../helpers/timeFormat"; // Adjust path to your date utility
const RegisteredTournamentsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [timers, setTimers] = useState({}); // Store countdown timers

  const {
    data: registrationsData = {},
    isLoading,
    isError,
  } = useGetMyTournamentsQuery({
    page: currentPage,
    limit: 6,
  });

  const tournaments = registrationsData?.data || [];
  const { count, page, totalPages } = registrationsData;
  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Generate page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    toast.error("Failed to load registered tournaments.", {
      style: {
        background: "#0a141d",
        color: "#fff",
        border: "1px solid #FC4E5B",
        borderRadius: "8px",
        padding: "12px",
      },
      iconTheme: { primary: "#E11D48", secondary: "#fff" },
    });
    return (
      <div className="flex h-screen bg-black/95 text-white font-Lex items-center justify-center animate-in fade-in duration-500">
        <div className="text-center">
          <p className="text-[#FC4E5B] text-lg sm:text-xl mb-4">
            Failed to load registered tournaments. Please try again later.
          </p>
          <Link to="/tournaments">
            <button className="bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base font-Lex">
              Browse Tournaments
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-black/95 text-white font-Lex relative min-h-screen mt-[12vh] px-4 sm:px-6 lg:px-12">
      <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] bg-clip-text text-transparent mb-6 sm:mb-8 text-center animate-in fade-in duration-500">
        Registered Tournaments
      </h1>

      {/* Tournament Grid */}
      <section className="relative z-10 mb-8">
        {tournaments.length === 0 ? (
          <div className="text-center py-12 bg-[#0a141d]/60 backdrop-blur-md rounded-2xl border border-white/10 animate-in fade-in duration-500">
            <p
              className="text-gray-300 text-sm sm:text-base mb-4"
              aria-live="polite"
            >
              You haven't registered for any tournaments yet.
            </p>
            <Link to="/tournaments">
              <button className="bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base font-Lex">
                Browse Tournaments
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {tournaments.map((cardData) => (
              <div
                key={cardData._id || cardData.id}
                className="relative animate-in fade-in duration-500"
              >
                {/* Tournament Info Card (no image) */}
                <div className="bg-[#0a141d]/60 backdrop-blur-md rounded-lg p-4 border border-white/10 shadow-md hover:shadow-lg transition-all duration-300">
                  <h2 className="text-lg sm:text-xl font-semibold text-[#FC4E5B] mb-2">
                    {cardData.title}
                  </h2>
                  {/* <p className="text-sm text-gray-300 mb-1">
                    <span className="font-semibold text-white">Game:</span>{" "}
                    {cardData.game || "N/A"}
                  </p> */}
                  <p className="text-sm text-gray-300 mb-1">
                    <span className="font-semibold text-white">Platform:</span>{" "}
                    {cardData.platform || "N/A"}
                  </p>
                  <p className="text-sm text-gray-300 mb-1">
                    <span className="font-semibold text-white">Status:</span>{" "}
                    <span
                      className={`${
                        cardData.status === "registration-open"
                          ? "text-yellow-400"
                          : cardData.status === "completed"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {cardData.status}
                    </span>
                  </p>
                  <p className="text-sm text-gray-300 mb-1">
                    <span className="font-semibold text-white">Entry Fee:</span>{" "}
                    {cardData.entryFee
                      ? `${
                          cardData.entryFee.amount === 0
                            ? "Free"
                            : `₹ ${cardData.entryFee.amount}`
                        }`
                      : "Free"}
                  </p>
                  <p className="text-sm text-gray-300 mb-3">
                    <span className="font-semibold text-white">
                      Prize Pool:
                    </span>{" "}
                    {cardData.prizePool
                      ? `₹ ${cardData.prizePool.totalCurrency}`
                      : "N/A"}
                  </p>

                  
                  <div className="mt-2 ">
                    <p
                      className="text-[#FC4E5B] text-sm sm:text-base font-Lex font-semibold"
                      aria-label={`Room ID for ${cardData.title}`}
                    >
                      <span className="text-[#FC4E5B]">Room ID:</span>{" "}
                      <span className="text-white">
                        {cardData.roomId == null
                          ? ` will be shown soon`
                          : cardData.roomId}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 mb-8">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className={`px-4 py-2 rounded-lg font-semibold text-sm sm:text-base font-Lex transition-all duration-300 ${
              page > 1
                ? "bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] text-white shadow-md hover:shadow-xl hover:-translate-y-0.5"
                : "bg-gray-600/50 text-gray-400 cursor-not-allowed"
            }`}
            aria-label="Previous page"
          >
            Previous
          </button>
          {pageNumbers.map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-3 py-2 rounded-lg font-semibold text-sm sm:text-base font-Lex transition-all duration-300 ${
                page === pageNum
                  ? "bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] text-white shadow-md"
                  : "bg-[#0a141d]/60 text-gray-300 border border-white/20 hover:bg-[#FC4E5B]/20 hover:text-[#FC4E5B]"
              }`}
              aria-label={`Page ${pageNum}`}
            >
              {pageNum}
            </button>
          ))}
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded-lg font-semibold text-sm sm:text-base font-Lex transition-all duration-300 ${
              page < totalPages
                ? "bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] text-white shadow-md hover:shadow-xl hover:-translate-y-0.5"
                : "bg-gray-600/50 text-gray-400 cursor-not-allowed"
            }`}
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
};

export default RegisteredTournamentsPage;
