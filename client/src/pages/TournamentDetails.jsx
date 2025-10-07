import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Button_2 from "../components/Button/Button_2";
import { motion, AnimatePresence } from "framer-motion";
import { useGetTournamentByIdQuery } from "../globalState/api/tournamentApi";
import LoadingScreen from "../components/shared/LoadingScreen";
import { useParams } from "react-router-dom";
import { formatDate12Hour } from "../helpers/timeFormat";
import { useForm } from "react-hook-form";
import { useRegisterInTournamentMutation } from "../globalState/api/tournamentApi";
import { ArrowLeft, Clock9, ChevronRight, CheckCircle2, X } from "lucide-react";
const TournamentDetails = () => {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetTournamentByIdQuery(id);
  const { data: tournamentData } = data || {};
  const isUserLoggedIn = useSelector((state) => state.auth.isUserLoggedIn);
  const navigate = useNavigate();
  const [registerInTournament] = useRegisterInTournamentMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    reset,
  } = useForm();

  const onSubmit = async ({ teamName, players, tournamentId }) => {
    if (tournamentData?.entryFee.amount > 0) {
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
        setShowSuccessModal(true);
        setIsModalOpen(false); // close registration modal
     
      } catch (error) {
        toast.error(
          error?.data?.message ||
            "Failed to join the tournament. Please try again."
        );
      }
    }
  };
 const statusColors = {
    "registration-open": "bg-green-700",
    published: "bg-yellow-600",
    "registration-closed": "bg-orange-600",
    "check-in": "bg-blue-600",
    "in-progress": "bg-purple-600",
    completed: "bg-gray-600",
    cancelled: "bg-red-700",
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
    <div className="font-Lex bg-black/95 text-white min-h-screen mt-[11dvh] sm:px-6 lg:px-12 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Back Link */}
        <Link
          to="/tournaments"
          className="inline-flex gap-1 items-center text-sm sm:text-base text-gray-300 hover:text-[#FC4E5B] transition-colors duration-300 mb-6"
        >
          <ArrowLeft /> Back to Tournaments
        </Link>

        {/* Hero */}
        <div className="relative bg-[#0a141d]/60 backdrop-blur-md rounded-2xl border border-white/10 mb-8 shadow-lg overflow-hidden">
          <img
            src={
              tournamentData?.thumbnail?.url
                ? tournamentData.thumbnail.url.replace("/upload/", "/upload/f_auto,q_auto,dpr_auto/")
                : "/placeholder.jpg"
            }
            alt={tournamentData?.title}
            className="w-full h-68 sm:h-84 md:h-110 object-fill rounded-2xl"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div> */}
          <div className="absolute top-4 left-4 flex flex-wrap items-center gap-3">
            <span className="bg-green-700 text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded-md shadow-sm">
              {tournamentData?.type}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs sm:text-sm font-semibold text-white ${statusColors[tournamentData?.status]}`}>
              {tournamentData?.status.replace("-", " ").toUpperCase()}
            </span>
          </div>
          <div className="p-6 sm:p-8 flex flex-col gap-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#E11D48] tracking-tight">{tournamentData?.title}</h1>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm sm:text-base text-gray-300">
                <Clock9 className="w-5 h-5" />
                Starts: {formatDate12Hour(tournamentData?.schedule.matchStart)}
              </div>
              <Button_2
                content={
                  tournamentData?.isRegistered
                    ? "Already Registered"
                    : tournamentData?.registeredCount >= tournamentData?.maxTeams
                    ? "Full"
                    : tournamentData?.status !== "registration-open"
                    ? "Cannot Join"
                    : "Join"
                }
                func={openModal}
                disabled={isSubmitting || tournamentData?.isRegistered || tournamentData?.registeredCount >= tournamentData?.maxTeams || tournamentData?.status !== "registration-open"}
              />
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="bg-[#0a141d]/60 backdrop-blur-md rounded-2xl border border-white/10 p-6 sm:p-8 shadow-lg space-y-8">
          {/* Overview */}
          <Section title="Overview">
            <InfoRow label="Game" value={tournamentData?.game} />
            <InfoRow label="Platform" value={tournamentData?.platform} />
            <InfoRow label="Max Teams" value={tournamentData?.maxTeams} />
            <InfoRow label="Max Players" value={tournamentData?.maxPlayers} />
            <InfoRow label="Team Size" value={tournamentData?.teamSize} />
            <InfoRow label="Round" value={tournamentData?.round} />
            <InfoRow label="Event Code" value={tournamentData?.eventCode} />
            <InfoRow label="Registered" value={`${tournamentData?.registeredCount}/${tournamentData?.maxTeams}`} />
            {/* {tournamentData?.roomId && <InfoRow label="Room ID" value={tournamentData?.roomId} />} */}
            {/* {tournamentData?.roomPassword && <InfoRow label="Room Password" value={tournamentData?.roomPassword} />} */}
            {/* <p className="mt-2 text-gray-300">{tournamentData?.description}</p> */}
          </Section>

          {/* Schedule */}
          <Section title="Schedule">
            <InfoRow label="Registration Start" value={formatDate12Hour(tournamentData?.schedule.registrationStart)} />
            <InfoRow label="Registration End" value={formatDate12Hour(tournamentData?.schedule.registrationEnd)} />
            <InfoRow label="Match Start" value={formatDate12Hour(tournamentData?.schedule.matchStart)} />
          </Section>

          {/* Entry & Prize */}
          <Section title="Entry & Prize Pool">
            <InfoRow label="Entry Fee" value={tournamentData?.entryFee.coins > 0 ? `${tournamentData?.entryFee.coins} Coins` : `₹${tournamentData?.entryFee.amount}`} />
            <InfoRow label="Total Prize Pool" value={`₹${tournamentData?.prizePool.totalCurrency}`} />
            <div>
              <h4 className="text-sm sm:text-base font-semibold text-gray-300 mb-2">Prize Distribution:</h4>
              <table className="w-full table-auto border-collapse text-white text-sm sm:text-base">
                <thead>
                  <tr className="bg-white/5">
                    <th className="px-4 py-2 text-left font-semibold">Position</th>
                    <th className="px-4 py-2 text-left font-semibold">Prize</th>
                  </tr>
                </thead>
                <tbody>
                  {tournamentData?.prizePool.distribution.map((p) => (
                    <tr key={p.position} className="border-b border-white/10 hover:bg-white/5 transition-colors duration-200">
                      <td className="px-4 py-3">{p.position}</td>
                      <td className="px-4 py-3">₹{p.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          {/* Rules */}
          <Section title="Rules">
            <ul className="space-y-2">
              {tournamentData?.rules.map((rule, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-300 hover:text-[#FC4E5B] transition-colors duration-200">
                  <ChevronRight className="w-5 h-5 text-[#E11D48]" />
                  {rule}
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </div>
    </div>


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

     <AnimatePresence>
  {showSuccessModal && (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="relative bg-[#0a141d] border border-white/10 rounded-2xl p-6 sm:p-8 text-center shadow-2xl max-w-sm w-full mx-4"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        {/* Close (X) button */}
        <button
          onClick={() => setShowSuccessModal(false)}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#FC4E5B] transition-colors"
          aria-label="Close"
        >
          <X/>
        </button>

        <CheckCircle2 className="mx-auto text-[#E11D48] w-16 h-16 mb-4" />
        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-white">
          Registration Confirmed!
        </h2>

        <p className="text-gray-400 mb-4">
          You’ve successfully registered for{' '}
          <span className="text-[#FC4E5B] font-semibold">
            {tournamentData?.title}
          </span>
          .
        </p>

        {/* Event Code Display */}
        {tournamentData?.eventCode && (
          <div className="bg-white/5 border border-white/10 rounded-lg py-3 px-4 mb-6">
            <p className="text-sm text-gray-300">
              <span className="font-semibold text-white">Event ID:</span>{' '}
              <span className="text-[#FC4E5B]">{tournamentData.eventCode}</span>
            </p>
          </div>
        )}

        <button
          onClick={() => navigate('/matches')}
          className="w-full bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] hover:from-[#FC4E5B] hover:to-[#E11D48] text-white px-5 py-3 rounded-lg font-semibold transition-all shadow-md"
        >
          Go to My Matches
        </button>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

    </>
  );
};


// ---------- Helper Components ----------
const Section = ({ title, children }) => (
  <div>
    <h2 className="text-2xl sm:text-3xl font-bold text-[#E11D48] mb-4">{title}</h2>
    <div className="bg-[#1a2634]/50 rounded-lg p-4 sm:p-6 border border-white/10">{children}</div>
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between text-sm sm:text-base mb-2">
    <span className="text-gray-300">{label}:</span>
    <span className="text-white font-semibold">{value}</span>
  </div>
);


export default TournamentDetails;
