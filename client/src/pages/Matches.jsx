import React, { useState } from "react";
import { useGetMyTournamentsQuery } from "../globalState/api/tournamentApi";
import LoadingScreen from "../components/shared/LoadingScreen";
import { Link } from "react-router-dom";
import { formatDate12Hour } from "../helpers/timeFormat";
import ModalManager from "../components/shared/ModalManager";
import { useDispatch } from "react-redux";
import { openModal } from "../globalState/slices/modal";

const RegisteredTournamentsPage = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: registrationsData = {},
    isLoading,
    isError,
  } = useGetMyTournamentsQuery({
    page: currentPage,
    limit: 6,
  });

  const tournaments = registrationsData?.data || [];
  const { page, totalPages } = registrationsData;

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, page - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    for (let i = startPage; i <= endPage; i++) pages.push(i);
    return pages;
  };

  const handleOpenModal = (cardData) => {
    dispatch(
      openModal({
        modalType: "EDIT_TEAM",
        modalProps: {
          isOpen: true,
          teamData: cardData.team,
          id: cardData._id,
          totalMember: cardData.tournament.teamSize,
        },
      })
    );
  };

  if (isLoading) return <LoadingScreen />;

  if (isError) {
    return (
      <div className="flex h-screen bg-black/95 text-white font-Lex items-center justify-center">
        <div className="text-center">
          <p className="text-[#FC4E5B] text-lg mb-4">
            Failed to load registered tournaments. Please try again later.
          </p>
          <Link to="/tournaments">
            <button className="bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-xl transition-all">
              Browse Tournaments
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-black/95 text-white font-Lex relative min-h-screen mt-[12vh] px-4 sm:px-6 lg:px-12">
      <ModalManager />
      <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] bg-clip-text text-transparent mb-8 text-center">
        Registered Tournaments
      </h1>

      <section className="relative z-10 mb-8">
        {tournaments.length === 0 ? (
          <div className="text-center py-12 bg-[#0a141d]/60 backdrop-blur-md rounded-2xl border border-white/10">
            <p className="text-gray-300 mb-4">
              You haven’t registered for any tournaments yet.
            </p>
            <Link to="/tournaments">
              <button className="bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-xl transition-all">
                Browse Tournaments
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {tournaments.map((cardData, index) => {
                const t = cardData.tournament;
                const isCompleted = t.status === "completed";
                const isCancelled = t.status === "cancelled";
                const isRegOpen = t.status === "registration-open";

                return (
                  <div
                    key={index}
                    className={`group relative bg-gradient-to-b from-[#111a24] to-[#0a141d] rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 ${
                      isCancelled ? "opacity-70" : ""
                    }`}
                  >
                    {/* Tournament Header */}
                    <div className="mb-5">
                      <h2 className="text-xl font-bold text-[#FC4E5B] truncate">
                        {t.title}
                      </h2>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDate12Hour(t.schedule.matchStart)}
                      </p>
                      <p className="text-xs mt-1 text-gray-400">
                        Event ID:{" "}
                        <span className="text-[#FC4E5B] font-semibold">
                          {t.eventCode}
                        </span>
                      </p>
                    </div>

                    {/* Tournament Details */}
                    <div className="space-y-2 text-sm text-gray-300">
                      <p>
                        <span className="font-medium text-white">Game:</span>{" "}
                        {t.game}
                      </p>
                      <p>
                        <span className="font-medium text-white">Platform:</span>{" "}
                        {t.platform}
                      </p>
                      <p>
                        <span className="font-medium text-white">Status:</span>{" "}
                        <span
                          className={`font-semibold ${
                            isRegOpen
                              ? "text-yellow-400"
                              : isCompleted
                              ? "text-green-400"
                              : isCancelled
                              ? "text-red-500"
                              : "text-gray-400"
                          }`}
                        >
                          {t.status.replace("-", " ")}
                        </span>
                      </p>
                      <p>
                        <span className="font-medium text-white">
                          Entry Fee:
                        </span>{" "}
                        {t.entryFee.amount === 0
                          ? "Free"
                          : `₹ ${t.entryFee.amount}`}
                      </p>
                      <p>
                        <span className="font-medium text-white">
                          Prize Pool:
                        </span>{" "}
                        ₹ {t.prizePool.totalCurrency}
                      </p>
                    </div>

                    {/* Room Info */}
                    {!isCompleted && !isCancelled && (
                      <div className="mt-4 p-3 rounded-lg bg-[#1a232e]/70 border border-dashed border-[#FC4E5B]/30 text-center">
                        <p className="text-[10px] uppercase tracking-wide text-gray-400">
                          Room ID
                        </p>
                        <p className="text-base font-semibold text-white mt-1">
                          {t.roomId ?? "Will be shared soon"}
                        </p>
                        {t.roomPassword && (
                          <div className="mt-2 bg-[#0b1620] rounded-md border border-white/5 px-3 py-2">
                            <p className="text-[10px] uppercase tracking-wide text-gray-400">
                              Password
                            </p>
                            <p className="text-sm font-mono text-white break-all mt-0.5">
                              {t.roomPassword}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Cancelled Notice */}
                    {isCancelled && (
                      <div className="mt-4 text-center text-red-400 font-semibold text-sm italic">
                        Tournament Cancelled
                      </div>
                    )}

                    {/* Completed Notice */}
                    {isCompleted && (
                      <div className="mt-4 text-center text-green-400 font-semibold text-sm italic">
                        Tournament Completed
                      </div>
                    )}

                    {/* Edit Button */}
                    {isRegOpen && (
                      <div className="mt-5">
                        <button
                          onClick={() => handleOpenModal(cardData)}
                          className="w-full bg-[#FC4E5B] hover:bg-[#E11D48] text-white text-sm font-semibold py-2 px-4 rounded-md transition-all"
                        >
                          Edit Team
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 mb-8">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className={`px-4 py-2 rounded-lg font-semibold text-sm ${
              page > 1
                ? "bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] text-white shadow-md hover:shadow-xl"
                : "bg-gray-700/50 text-gray-500 cursor-not-allowed"
            }`}
          >
            Previous
          </button>

          {getPageNumbers().map((num) => (
            <button
              key={num}
              onClick={() => handlePageChange(num)}
              className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all ${
                page === num
                  ? "bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] text-white shadow-md"
                  : "bg-[#0a141d]/60 text-gray-300 border border-white/20 hover:bg-[#FC4E5B]/20 hover:text-[#FC4E5B]"
              }`}
            >
              {num}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded-lg font-semibold text-sm ${
              page < totalPages
                ? "bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] text-white shadow-md hover:shadow-xl"
                : "bg-gray-700/50 text-gray-500 cursor-not-allowed"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
};

export default RegisteredTournamentsPage;
