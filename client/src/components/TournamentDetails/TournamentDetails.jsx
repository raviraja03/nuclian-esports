import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Button_2 from "../Button/Button_2";
import Valo from "../../assets/Valo_game_poster.jpg";
import Bgmi from "../../assets/bgmi_game_poster_2.jpg";
import Cod from "../../assets/cod_game_poster.jpg";
import Freefire from "../../assets/ff_game_poster.jpg";
import axios from "axios";
import { useGetTournamentByIdQuery } from "../../globalState/api/tournamentApi";
import LoadingScreen from "../shared/LoadingScreen";
import { useParams } from "react-router-dom";

const TournamentDetails = () => {
  const { id } = useParams();
  const {
    data: tournamentData = {},
    isLoading,
    isError,
  } = useGetTournamentByIdQuery(id);
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const [isJoining, setIsJoining] = useState(false);
  const [isPrizePoolOpen, setIsPrizePoolOpen] = useState(true);
  const [isRulesOpen, setIsRulesOpen] = useState(true);
  const [timeLeft, setTimeLeft] = useState("");
  const navigate = useNavigate();

  // Map game to image
const images={
  "Valorant":Valo,
  "Battlegrounds Mobile India":Bgmi,
  "Call of Duty":Cod,
  "Free Fire":Freefire
}

  // Countdown timer
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const startTime = new Date(tournamentData?.data?.schedule?.startTime);
      const diff = startTime - now;
      if (diff <= 0) {
        setTimeLeft("Tournament Started");
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(
        `${days > 0 ? `${days}d ` : ""}${hours}h ${minutes}m ${seconds}s`
      );
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [tournamentData]);

  const joinTournament = async (tournamentId) => {
    if (!isUserLoggedIn) {
      toast.error("Please log in to join the tournament", {
        style: {
          background: "#0a141d",
          color: "#fff",
          border: "1px solid #FC4E5B",
          borderRadius: "8px",
          padding: "12px",
        },
        iconTheme: {
          primary: "#E11D48",
          secondary: "#fff",
        },
      });
      return;
    }
    setIsJoining(true);
    if (!(tournamentData?.data?.entryFee.amount == 0)) {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/payments/register-in`,
          {
            tournament: tournamentId,
          },
          { withCredentials: true }
        );

        navigate("/payment", {
          state: {
            orderId: res.data.orderId,
            paymentSessionId: res.data.paymentSessionId,
          },
        });
        toast.success(res.data.message, {
          style: {
            background: "#0a141d",
            color: "#fff",
            border: "1px solid #FC4E5B",
            borderRadius: "8px",
            padding: "12px",
          },
          iconTheme: {
            primary: "#E11D48",
            secondary: "#fff",
          },
        });
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to join the tournament. Please try again.",
          {
            style: {
              background: "#0a141d",
              color: "#fff",
              border: "1px solid #FC4E5B",
              borderRadius: "8px",
              padding: "12px",
            },
            iconTheme: {
              primary: "#E11D48",
              secondary: "#fff",
            },
          }
        );
      } finally {
        setIsJoining(false);
      }
    } else {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/payments/register-in`,
          {
            tournament: tournamentId,
          },
          { withCredentials: true }
        );
        if (res.data.success) {
          toast.success(
            res?.data?.message ||
              "Failed to join the tournament. Please try again.",
            {
              style: {
                background: "#0a141d",
                color: "#fff",
                border: "1px solid #FC4E5B",
                borderRadius: "8px",
                padding: "12px",
              },
              iconTheme: {
                primary: "#E11D48",
                secondary: "#fff",
              },
            }
          );


          navigate("/free-tournament-success",{
            state:{
              tournament:{
                title:tournamentData?.data?.title,
                game:tournamentData?.data?.game,
                platform:tournamentData?.data?.platform,
                startTime:tournamentData?.data?.schedule?.startTime,
              }

            }
          });


        }
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Failed to join the tournament. Please try again.",
          {
            style: {
              background: "#0a141d",
              color: "#fff",
              border: "1px solid #FC4E5B",
              borderRadius: "8px",
              padding: "12px",
            },
            iconTheme: {
              primary: "#E11D48",
              secondary: "#fff",
            },
          }
        );
      } finally {
        setIsJoining(false);
      }
    }
  };

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

          {/* Hero Section */}
          <div className="relative bg-[#0a141d]/60 backdrop-blur-md rounded-2xl border border-white/10 mb-8 shadow-lg overflow-hidden">
            <div className="relative">
              <img
                src={images[tournamentData?.data?.game] }
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
                  Starts in: {timeLeft}
                </div>
                <Button_2
                  content={
                    tournamentData?.data?.isRegistered
                      ? "Already Registered"
                      : isJoining
                      ? "Joining..."
                      : "Join"
                  }
                  func={() => joinTournament(tournamentData?.data?._id)}
                  disabled={
                    isJoining ||
                    tournamentData?.data?.status !== "registration-open" ||
                    tournamentData?.data?.isRegistered
                  }
                />
              </div>
            </div>
          </div>

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
                </div>
              </div>
            </div>

            <div className="h-1 bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] rounded-full mb-8"></div>

            {/* Schedule */}
            <div className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#E11D48] mb-4 text-shadow-sm">
                Schedule
              </h2>
              <div className="bg-[#1a2634]/50 rounded-lg p-4 sm:p-6 border border-white/10 animate-in slide-in-from-bottom-10 duration-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Start Time:</span>
                    <span className="text-white font-semibold">
                      {new Date(
                        tournamentData?.data?.schedule.startTime
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">End Time:</span>
                    <span className="text-white font-semibold">
                      {new Date(
                        tournamentData?.data?.schedule.endTime
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Check-In Start:</span>
                    <span className="text-white font-semibold">
                      {new Date(
                        tournamentData?.data?.schedule.checkInStart
                      ).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Check-In End:</span>
                    <span className="text-white font-semibold">
                      {new Date(
                        tournamentData?.data?.schedule.checkInEnd
                      ).toLocaleString()}
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
                        : `₹${tournamentData?.data?.entryFee.currency}`}
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
