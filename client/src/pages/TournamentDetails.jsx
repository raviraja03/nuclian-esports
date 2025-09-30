import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Button_2 from "../components/Button/Button_2";
import Valo from "../assets/Valo_game_poster.jpg";
import Bgmi from "../assets/bgmi_game_poster_2.jpg";
import Cod from "../assets/cod_game_poster.jpg";
import Freefire from "../assets/free_fire_live.jpeg";
import { useGetTournamentByIdQuery } from "../globalState/api/tournamentApi";
import LoadingScreen from "../components/shared/LoadingScreen";
import { useParams } from "react-router-dom";
import { formatDate12Hour } from "../helpers/timeFormat";
import { useForm } from "react-hook-form";
import { useRegisterInTournamentMutation } from "../globalState/api/tournamentApi";

const TournamentDetails = () => {
  const { id } = useParams();
  const {
    data: tournamentData = {},
    isLoading,
    isError,
    error,
  } = useGetTournamentByIdQuery(id);
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const [isPrizePoolOpen, setIsPrizePoolOpen] = useState(true);
  const [isRulesOpen, setIsRulesOpen] = useState(true);
  const navigate = useNavigate();
  const [registerInTournament] = useRegisterInTournamentMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async ({ teamName, players, tournamentId }) => {
    if (!(tournamentData?.data?.entryFee.amount == 0)) {
      // Paid Tournament
      try {
        const res = await registerInTournament({
          tournament: tournamentId,
          teamName: teamName,
          players: players,
        }).unwrap();

        navigate("/payment", {
          state: {
            orderId: res.orderId,
            paymentSessionId: res.paymentSessionId,
          },
        });

        toast.success(res.message);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to join the tournament. Please try again."
        );
      }
    } else {
      // Free Tournament
      try {
        const res = await registerInTournament({
          tournament: tournamentId,
          teamName: teamName,
          players: players,
        }).unwrap();

        if (res.success) {
          toast.success(
            res?.message || "Failed to join the tournament. Please try again."
          );

          navigate("/free-tournament-success", {
            state: {
              tournament: {
                title: tournamentData?.data?.title,
                game: tournamentData?.data?.game,
                platform: tournamentData?.data?.platform,
                startTime: tournamentData?.data?.schedule?.startTime,
              },
            },
          });
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to join the tournament. Please try again."
        );
      }
    }
  };

  // Map game to image
  const images = {
    Valorant: Valo,
    "Battlegrounds Mobile India": Bgmi,
    "Call of Duty": Cod,
    "Free Fire": Freefire,
  };

  const openModal = () => {
    if (!isUserLoggedIn) {
      toast.error("Please log in to join the tournament");
      return;
    }
    setIsModalOpen(true);
  };

  // All return stared from here
  // console.log(tournamentData);
  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return (
      <div className="flex h-screen bg-black/95 text-white font-Lex items-center justify-center">
        <p className="text-red-500 text-center text-lg sm:text-xl">
          {error?.data?.message}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="font-Lex bg-black/95 text-white min-h-screen mt-[11dvh] sm:px-6 lg:px-12 px-6  ">
        <div className="max-w-5xl mx-auto">
          {/* Back Link */}
          <Link
            to="/tournaments"
            className="inline-flex items-center text-sm sm:text-base text-gray-300 hover:text-[#FC4E5B] transition-colors duration-300 mb-6"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            Back to Tournaments
          </Link>

          {/*  Hero Section  */}
          <div className="relative bg-[#0a141d]/60 backdrop-blur-md rounded-2xl border border-white/10 mb-8 shadow-lg overflow-hidden">
            <div className="relative">
              <img
                src={images[tournamentData?.data?.game]}
                alt={tournamentData?.data?.title}
                className="w-full h-68 sm:h-84 md:h-110 object-bottom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
              <div className="absolute top-4 left-4 flex items-center gap-3">
                {tournamentData?.data?.type && (
                  <span
                    className="bg-[#E11D48]/80 text-white text-xs sm:text-sm font-Lex font-semibold px-3 py-1 rounded-md shadow-sm hover:bg-[#FC4E5B]/80 transition-colors duration-300"
                    aria-label={`Tournament type: ${tournamentData?.data?.type}`}
                  >
                    {tournamentData?.data?.type}
                  </span>
                )}
                <span
                  className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold ${
                    tournamentData?.data?.status === "registration-open"
                      ? "bg-green-600/80 text-white"
                      : "bg-gray-600/80 text-gray-300"
                  }`}
                >
                  {tournamentData?.data?.status.replace("-", " ").toUpperCase()}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#E11D48] tracking-tight mb-4 text-shadow-md">
                {tournamentData?.data?.title}
              </h1>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div
                  className="flex items-center gap-2 text-sm sm:text-base text-gray-300"
                  aria-live="polite"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Starts in:{" "}
                  {formatDate12Hour(
                    tournamentData?.data?.schedule.checkInStart
                  )}
                </div>
                <Button_2
                  content={
                    tournamentData?.data?.isRegistered
                      ? "Already Registered"
                      : tournamentData?.data?.totalTeams ===
                        tournamentData?.data?.registeredCount
                      ? "Tournament is Full"
                      : "Join"
                  }
                  func={() => openModal()}
                  disabled={
                    isSubmitting ||
                    tournamentData?.data?.status !== "registration-open" ||
                    tournamentData?.data?.totalTeams ===
                      tournamentData?.data?.registeredCount ||
                    tournamentData?.data?.isRegistered
                  }
                />
              </div>
            </div>
          </div>

          {/* Team Registration Modal */}
          {isModalOpen && (
            <div
              className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              aria-modal="true"
              role="dialog"
            >
              <div className="bg-[#0a141d] border border-[#E11D48]/30 rounded-xl p-6 max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl">
                {/* Modal Header */}
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-[#E11D48]">
                    Join Tournament
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-[#FC4E5B] transition-colors p-1"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                <form
                  onSubmit={handleSubmit((data) =>
                    onSubmit({
                      ...data,
                      tournamentId: tournamentData?.data?._id,
                    })
                  )}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">
                      Team Name <span className="text-[#FC4E5B]">*</span>
                    </label>
                    <input
                      {...register("teamName", {
                        required: "Team name is required",
                        minLength: { value: 3, message: "Min 3 characters" },
                      })}
                      className={`w-full bg-[#1a2634]/50 border ${
                        errors.teamName ? "border-red-500" : "border-white/20"
                      } rounded-lg py-2 px-3 text-white placeholder-gray-500 focus:border-[#FC4E5B] focus:outline-none text-sm`}
                      placeholder="Enter team name"
                    />
                    {errors.teamName && (
                      <p className="text-red-400 text-xs mt-1">
                        {errors.teamName.message}
                      </p>
                    )}
                  </div>

                  {/* Players */}
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">
                      Team Players
                    </h3>
                    <div className="space-y-3">
                      {new Array(tournamentData?.data?.totalMember)
                        .fill(2)
                        .map((_, index) => (
                          <div
                            key={index}
                            className="bg-[#1a2634]/30 rounded-lg p-3 border border-white/10"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-5 h-5 bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] rounded-full flex items-center justify-center text-white text-xs font-bold">
                                {index + 1}
                              </div>
                              <span className="text-xs text-gray-300">
                                Player {index + 1}{" "}
                                {index === 0 && (
                                  <span className="text-[#FC4E5B]">
                                    (Captain)
                                  </span>
                                )}
                              </span>
                            </div>
                            <div className="space-y-2">
                              <div className="grid grid-cols-2 gap-2">
                                <input
                                  {...register(`players.${index}.gameId`, {
                                    required:
                                      index === 0 ? "Game ID required" : false,
                                    validate: (value, allValues) => {
                                      // Check duplicates among all players
                                      const allGameIds = allValues.players
                                        .map((p) => p?.gameId?.trim())
                                        .filter(Boolean);
                                      const duplicates = allGameIds.filter(
                                        (id) => id === value.trim()
                                      );
                                      return duplicates.length > 1
                                        ? "Game ID must be unique"
                                        : true;
                                    },
                                  })}
                                  className={`w-full bg-[#0a141d]/50 border ${
                                    errors.players?.[index]?.gameId
                                      ? "border-red-500"
                                      : "border-white/20"
                                  } rounded py-2 px-2 text-white text-xs placeholder-gray-500 focus:border-[#FC4E5B] focus:outline-none`}
                                  placeholder="Game ID"
                                />
                                <input
                                  {...register(`players.${index}.gameName`, {
                                    required:
                                      index === 0 ? "Name required" : false,
                                  })}
                                  className={`w-full bg-[#0a141d]/50 border ${
                                    errors.players?.[index]?.gameName
                                      ? "border-red-500"
                                      : "border-white/20"
                                  } rounded py-2 px-2 text-white text-xs placeholder-gray-500 focus:border-[#FC4E5B] focus:outline-none`}
                                  placeholder="In-game Name"
                                />
                              </div>
                              {(errors.players?.[index]?.gameId ||
                                errors.players?.[index]?.gameName) && (
                                <div className="space-y-1">
                                  {errors.players?.[index]?.gameId && (
                                    <p className="text-red-400 text-xs">
                                      {errors.players[index].gameId.message}
                                    </p>
                                  )}
                                  {errors.players?.[index]?.gameName && (
                                    <p className="text-red-400 text-xs">
                                      {errors.players[index].gameName.message}
                                    </p>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 pt-4">
                    <button
                      disabled={isSubmitting}
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 bg-[#1a2634]/80 hover:bg-[#2a3644] text-white py-2 px-4 rounded-lg text-sm transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] text-white py-2 px-4 rounded-lg text-sm disabled:opacity-50 transition-all"
                    >
                      Join
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Details Sections */}
          <div className="bg-[#0a141d]/60 backdrop-blur-md rounded-2xl border border-white/10 p-6 sm:p-8 shadow-lg animate-in fade-in duration-500">
            {/* Overview */}
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#E11D48] mb-4 text-shadow-sm">
                Overview
              </h2>
              <div className="bg-[#1a2634]/50 rounded-lg p-4 sm:p-6 border border-white/10 animate-in slide-in-from-bottom-10 duration-300">
                <p className="text-gray-300 text-sm sm:text-base mb-4">
                  {tournamentData?.data?.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Game:</span>
                    <span className="text-white font-semibold">
                      {tournamentData?.data?.game}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Platform:</span>
                    <span className="text-white font-semibold">
                      {tournamentData?.data?.platform}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Max Participants:</span>
                    <span className="text-white font-semibold">
                      {tournamentData?.data?.maxParticipants}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Max Teams:</span>
                    <span className="text-white font-semibold">
                      {tournamentData?.data?.totalTeams}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-1 bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] rounded-full mb-8"></div>

            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#E11D48] mb-4 text-shadow-sm">
                Schedule
              </h2>
              <div className="bg-[#1a2634]/50 rounded-lg p-4 sm:p-6 border border-white/10 animate-in slide-in-from-bottom-10 duration-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Registration Start:</span>
                    <span className="text-white font-semibold">
                      {formatDate12Hour(
                        tournamentData?.data?.schedule.registrationStart
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Registration End:</span>
                    <span className="text-white font-semibold">
                      {formatDate12Hour(
                        tournamentData?.data?.schedule.registrationEnd
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Match Start:</span>
                    <span className="text-white font-semibold">
                      {formatDate12Hour(
                        tournamentData?.data?.schedule.matchStart
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">ID Password Release:</span>
                    <span className="text-white font-semibold">
                      {formatDate12Hour(
                        tournamentData?.data?.schedule.idPasswordRelease
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-1 bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] rounded-full mb-8"></div>

            {/* Entry & Prize Pool */}
            <div className="mb-8">
              <button
                onClick={() => setIsPrizePoolOpen(!isPrizePoolOpen)}
                className="text-2xl sm:text-3xl font-bold text-[#E11D48] mb-4 text-shadow-sm w-full text-left flex items-center justify-between"
                aria-expanded={isPrizePoolOpen}
              >
                Entry & Prize Pool
                <svg
                  className={`w-6 h-6 transform transition-transform duration-300 ${
                    isPrizePoolOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`bg-[#1a2634]/50 rounded-lg p-4 sm:p-6 border border-white/10 animate-in slide-in-from-bottom-10 duration-300 ${
                  isPrizePoolOpen ? "" : "hidden"
                }`}
              >
                <div className="space-y-4">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-300">Entry Fee:</span>
                    <span className="text-[#E11D48] font-bold">
                      {tournamentData?.data?.entryFee.coins > 0
                        ? `${tournamentData?.data?.entryFee.coins} Coins`
                        : `₹${tournamentData?.data?.entryFee.amount}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-300">Total Prize Pool:</span>
                    <span className="text-[#FC4E5B] font-bold">
                      ₹{tournamentData?.data?.prizePool.totalCurrency}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-semibold text-gray-300 mb-2">
                      Prize Distribution:
                    </h3>
                    <table className="w-full table-auto border-collapse">
                      <thead>
                        <tr className="bg-white/5">
                          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">
                            Position
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-semibold text-gray-300">
                            Prize
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tournamentData?.data?.prizePool.distribution.map(
                          (prize) => (
                            <tr
                              key={prize.position}
                              className="border-b border-white/10 hover:bg-white/5 transition-colors duration-200"
                            >
                              <td className="px-4 py-3 text-sm text-white">
                                {prize.position}
                              </td>
                              <td className="px-4 py-3 text-sm text-white">
                                ₹{prize.amount}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-1 bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] rounded-full mb-8"></div>

            {/* Rules */}
            <div className="mb-8">
              <button
                onClick={() => setIsRulesOpen(!isRulesOpen)}
                className="text-2xl sm:text-3xl font-bold text-[#E11D48] mb-4 text-shadow-sm w-full text-left flex items-center justify-between"
                aria-expanded={isRulesOpen}
              >
                Rules
                <svg
                  className={`w-6 h-6 transform transition-transform duration-300 ${
                    isRulesOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`bg-[#1a2634]/50 rounded-lg p-4 sm:p-6 border border-white/10 animate-in slide-in-from-bottom-10 duration-300 ${
                  isRulesOpen ? "" : "hidden"
                }`}
              >
                <ul className="space-y-2 text-sm sm:text-base text-gray-300">
                  {tournamentData?.data?.rules.map((rule, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 hover:text-[#FC4E5B] transition-colors duration-200"
                    >
                      <svg
                        className="w-5 h-5 mt-1 text-[#E11D48]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="h-1 bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] rounded-full mb-8"></div>

            {/* Stream */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#E11D48] mb-4 text-shadow-sm">
                Stream
              </h2>
              <div className="bg-[#1a2634]/50 rounded-lg p-4 sm:p-6 border border-white/10 animate-in slide-in-from-bottom-10 duration-300">
                <a
                  href={tournamentData?.data?.streamLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] py-3 px-6 font-semibold text-white shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base border border-[#E11D48]/50"
                >
                  Watch Live Stream
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TournamentDetails;
