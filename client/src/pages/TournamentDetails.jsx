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
import { ArrowLeft, Clock9, ChevronRight, X } from "lucide-react";
const TournamentDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetTournamentByIdQuery(id);
  const { data: tournamentData } = data || {};
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
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
    if (tournamentData?.entryFee.amount >= 0) {
      // Paid Tournament
      try {
        const res = await registerInTournament({
          tournamentId: tournamentId,
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
          error?.data?.message ||
            "Failed to join the tournament. Please try again."
        );
      }
    } else {
      // Free Tournament
      try {
        const res = await registerInTournament({
          tournamentId: tournamentId,
          teamName: teamName,
          players: players,
        }).unwrap();

        toast.success(res?.message || "Successfully joined the tournament.");

        // navigate("/free-tournament-success", {
        //   state: {
        //     tournament: {
        //       title: tournamentData?.data?.title,
        //       game: tournamentData?.data?.game,
        //       platform: tournamentData?.data?.platform,
        //       startTime: tournamentData?.data?.schedule?.startTime,
        //     },
        //   },
        // });
      } catch (error) {
        toast.error(
          error?.data?.message ||
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
            className="inline-flex gap-1 items-center text-sm sm:text-base text-gray-300 hover:text-[#FC4E5B] transition-colors duration-300 mb-6"
          >
            <ArrowLeft />
            Back to Tournaments
          </Link>

          {/*  Hero Section  */}
          <div className="relative bg-[#0a141d]/60 backdrop-blur-md rounded-2xl border border-white/10 mb-8 shadow-lg overflow-hidden">
            <div className="relative">
              <img
                src={images[tournamentData?.game]}
                alt={tournamentData?.title}
                className="w-full h-68 sm:h-84 md:h-110 object-bottom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
              <div className="absolute top-4 left-4 flex items-center gap-3">
                <span
                  className="bg-green-700 text-white text-xs sm:text-sm font-Lex font-semibold px-3 py-1 rounded-md shadow-sm hover:bg-[#FC4E5B]/80 transition-colors duration-300"
                  aria-label={`Tournament type: ${tournamentData?.type}`}
                >
                  {tournamentData?.type}
                </span>

                <span
                  className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold text-white ${
                    tournamentData?.status === "registration-open"
                      ? "bg-green-700"
                      : tournamentData?.status === "published"
                      ? "bg-yellow-600 "
                      : "bg-gray-700"
                  }`}
                >
                  {tournamentData?.status.replace("-", " ").toUpperCase()}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#E11D48] tracking-tight mb-4 text-shadow-md">
                {tournamentData?.title}
              </h1>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div
                  className="flex items-center gap-2 text-sm sm:text-base text-gray-300"
                  aria-live="polite"
                >
                  <Clock9 className="w-5 h-5" />
                  Starts in:{" "}
                  {formatDate12Hour(tournamentData?.schedule.matchStart)}
                </div>
                <Button_2
                  content={
                    tournamentData?.isRegistered
                      ? "Already Registered"
                      : tournamentData?.maxTeams ===
                        tournamentData?.registeredCount
                      ? "Tournament is Full"
                      : tournamentData?.status === "published"
                      ? "Registration is not Open"
                      : [
                          "registration-closed",
                          "in-progress",
                          "completed",
                          "cancelled",
                        ].includes(tournamentData?.status)
                      ? tournamentData?.status.replace("-", " ")
                      : "Join"
                  }
                  func={() => openModal()}
                  disabled={
                    isSubmitting ||
                    tournamentData?.status !== "registration-open" ||
                    tournamentData?.maxTeams ===
                      tournamentData?.registeredCount ||
                    tournamentData?.isRegistered
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
                    <X />
                  </button>
                </div>

                <form
                  onSubmit={handleSubmit((data) =>
                    onSubmit({
                      ...data,
                      tournamentId: tournamentData?._id,
                    })
                  )}
                  className="space-y-4"
                >
                  {/* Team Name */}
                  {tournamentData?.teamSize > 1 && (
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
                  )}

                  {/* Players */}
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-3">
                      Players
                    </h3>
                    <div className="space-y-3">
                      {new Array(tournamentData?.teamSize)
                        .fill(2)
                        .map((_, index) => (
                          <div
                            key={index}
                            className="bg-[#1a2634]/30 rounded-lg p-3 border border-white/10"
                          >
                            <div className="flex items-center gap-2 mb-2">
                              {/* <div className="w-5 h-5 bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] rounded-full flex items-center justify-center text-white text-xs font-bold">
                                {index + 1}
                              </div> */}
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
                                <div>
                                  <input
                                    {...register(`players.${index}.gameId`, {
                                      required:
                                        index === 0 ? "ID is required" : false,
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
                                  {errors.players?.[index]?.gameId && (
                                    <p className="text-red-400 text-xs mt-1">
                                      {errors.players[index].gameId.message}
                                    </p>
                                  )}
                                </div>
                                <div>
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
                                  {errors.players?.[index]?.gameName && (
                                    <p className="text-red-400 text-xs mt-1">
                                      {errors.players[index].gameName.message}
                                    </p>
                                  )}
                                </div>
                              </div>
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
                  {tournamentData?.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Game:</span>
                    <span className="text-white font-semibold">
                      {tournamentData?.game}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Platform:</span>
                    <span className="text-white font-semibold">
                      {tournamentData?.platform}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Max Teams:</span>
                    <span className="text-white font-semibold">
                      {tournamentData?.maxTeams}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Max Players:</span>
                    <span className="text-white font-semibold">
                      {tournamentData?.maxPlayers}
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
                        tournamentData?.schedule.registrationStart
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Registration End:</span>
                    <span className="text-white font-semibold">
                      {formatDate12Hour(
                        tournamentData?.schedule.registrationEnd
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Match Start:</span>
                    <span className="text-white font-semibold">
                      {formatDate12Hour(tournamentData?.schedule.matchStart)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-1 bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] rounded-full mb-8"></div>

            {/* Entry & Prize Pool */}
            <div className="mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#E11D48] mb-4 text-shadow-sm">
                Entry & Prize Pool
              </h3>
              <div
                className={`bg-[#1a2634]/50 rounded-lg p-4 sm:p-6 border border-white/10 animate-in slide-in-from-bottom-10 duration-300 
                `}
              >
                <div className="space-y-4">
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-300">Entry Fee:</span>
                    <span className="text-[#E11D48] font-bold">
                      {tournamentData?.entryFee.coins > 0
                        ? `${tournamentData?.entryFee.coins} Coins`
                        : `₹${tournamentData?.entryFee.amount}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm sm:text-base">
                    <span className="text-gray-300">Total Prize Pool:</span>
                    <span className="text-[#FC4E5B] font-bold">
                      ₹{tournamentData?.prizePool.totalCurrency}
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
                        {tournamentData?.prizePool.distribution.map((prize) => (
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
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-1 bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] rounded-full mb-8"></div>

            {/* Rules */}
            <div className="mb-8">
              <h3 className="text-2xl sm:text-3xl font-bold text-[#E11D48] mb-4 text-shadow-sm">
                Rules
              </h3>

              <div
                className={`bg-[#1a2634]/50 rounded-lg p-4 sm:p-6 border border-white/10 animate-in slide-in-from-bottom-10 duration-300`}
              >
                <ul className="space-y-2 text-sm sm:text-base text-gray-300">
                  {tournamentData?.rules.map((rule, index) => (
                    <li
                      key={index}
                      className="flex  items-start gap-2 hover:text-[#FC4E5B] transition-colors duration-200"
                    >
                      <ChevronRight className="w-6 h-6 text-[#E11D48]" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* <div className="h-1 bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] rounded-full mb-8"></div> */}

            {/* Stream */}

            {/* <div>
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
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default TournamentDetails;
