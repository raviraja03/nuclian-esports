import React, { useState, useEffect } from "react";
import { useGetMyTournamentsQuery } from "../globalState/api/tournamentApi";
// import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import LoadingScreen from "../components/shared/LoadingScreen";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { formatDate12Hour } from "../helpers/timeFormat";
import EditTeamModal from "../components/modals/EditTeamModal";
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
  const { count, page, totalPages } = registrationsData;

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

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  const handleOpenModal = (cardData) => {
    dispatch(
      openModal({
        modalType: "EDIT_TEAM",
        modalProps: {
          isOpen: true,
          teamData: cardData.team,
          id: cardData._id,
          totalMember: cardData.tournament.totalMember,
        },
      })
    );
  };


  if (isLoading) return <LoadingScreen />;

  if (isError) {
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
      <ModalManager />
      <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] bg-clip-text text-transparent mb-6 sm:mb-8 text-center animate-in fade-in duration-500">
        Registered Tournaments
      </h1>

      <section className="relative z-10 mb-8">
        {tournaments.length === 0 ? (
          <div className="text-center py-12 bg-[#0a141d]/60 backdrop-blur-md rounded-2xl border border-white/10 animate-in fade-in duration-500">
            <p className="text-gray-300 text-sm sm:text-base mb-4">
              You haven't registered for any tournaments yet.
            </p>
            <Link to="/tournaments">
              <button className="bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base font-Lex">
                Browse Tournaments
              </button>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {tournaments.map((cardData, index) => (
                <div
                  key={index}
                  className="group relative bg-gradient-to-b from-[#111a24] to-[#0a141d] rounded-2xl p-6 border border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* modal for edit team */}

                  {/* Tournament Header */}
                  <div className="mb-5">
                    <h2 className="text-xl font-bold text-[#FC4E5B] group-hover:text-[#ff6b75] transition-colors">
                      {cardData.tournament.title}
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">
                      {formatDate12Hour(cardData.tournament.schedule.matchStart)}
                    </p>
                  </div>

                  {/* Tournament Details */}
                  <div className="space-y-2 text-sm text-gray-300">
                    <p>
                      <span className="font-medium text-white">Game:</span>{" "}
                      {cardData.tournament.game}
                    </p>
                    <p>
                      <span className="font-medium text-white">Platform:</span>{" "}
                      {cardData.tournament.platform}
                    </p>
                    <p>
                      <span className="font-medium text-white">Status:</span>{" "}
                      <span
                        className={`font-semibold ${
                          cardData.tournament.status === "registration-open"
                            ? "text-yellow-400"
                            : cardData.tournament.status === "completed"
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {cardData.tournament.status}
                      </span>
                    </p>
                    <p>
                      <span className="font-medium text-white">Entry Fee:</span>{" "}
                      {cardData.tournament.entryFee.amount === 0
                        ? "Free"
                        : `₹ ${cardData.tournament.entryFee.amount}`}
                    </p>
                    <p>
                      <span className="font-medium text-white">
                        Prize Pool:
                      </span>{" "}
                      ₹ {cardData.tournament.prizePool.totalCurrency}
                    </p>
                  </div>

                  <div className="mt-4 p-3 rounded-lg bg-[#1a232e]/70 border border-dashed border-[#FC4E5B]/30 text-center">
                    {/* Room ID */}
                    <p className="text-[10px] uppercase tracking-wide text-gray-400">
                      Room ID
                    </p>
                    <p className="text-base font-semibold text-white mt-1">
                      {cardData.tournament.roomId ?? "Will be shown soon"}
                    </p>

                    {/* Room Password */}
                    {cardData.tournament.roomPassword && (
                      <div className="mt-2 bg-[#0b1620] rounded-md border border-white/5 px-3 py-2">
                        <p className="text-[10px] uppercase tracking-wide text-gray-400">
                          Password
                        </p>
                        <p className="text-sm font-mono text-white break-all mt-0.5">
                          {cardData.tournament.roomPassword}
                        </p>
                      </div>
                    )}
                  </div>

                  {cardData.tournament.status === "registration-open" && (
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
              ))}
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
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
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
              className={`px-3 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
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
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-300 ${
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
