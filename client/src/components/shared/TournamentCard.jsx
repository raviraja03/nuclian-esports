import { Link } from "react-router-dom";

const TournamentCard = ({ card }) => {
  const {
    _id,
    title,
    type,
    status,
    entryFee,
    prizePool,
    registeredCount,
    maxTeams,
    thumbnail,
    round,
    eventCode,
    
  } = card;

  const thumbnailUrl = thumbnail?.url
    ? thumbnail.url.replace("/upload/", "/upload/f_auto,q_auto,dpr_auto/")
    : "/placeholder.jpg";

  const showRegisteredInfo = [
    "registration-open",
    "registration-closed",
    "check-in",
    "in-progress",
  ].includes(status);

  const isFull = maxTeams && registeredCount >= maxTeams;
  const showJoinButton = status === "registration-open" && !isFull;

  const statusColors = {
    "registration-open": "bg-green-700",
    published: "bg-yellow-600",
    "registration-closed": "bg-orange-600",
    "check-in": "bg-blue-600",
    "in-progress": "bg-purple-600",
    completed: "bg-gray-600",
    cancelled: "bg-red-700",
  };

  return (
    <div className="bg-[#0b141d]/80 backdrop-blur-sm p-3 sm:p-4 md:p-5 rounded-2xl border border-white/10 hover:border-[#FC4E5B]/40 hover:shadow-md hover:shadow-[#E11D48]/20 transition-all duration-300 flex flex-col h-full group w-full max-w-[380px] mx-auto">
      {/* 🖼️ Thumbnail */}
      <div className="w-full aspect-[4/3] overflow-hidden rounded-xl mb-3 relative group bg-black flex items-center justify-center">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Type Badge */}
        <span className="absolute top-2 left-2 bg-[#22c55e]/90 text-white text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-md shadow-md uppercase">
          {type || "Online"}
        </span>

        {/* Status Badge */}
        <span
          className={`absolute top-2 right-2 text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-full shadow-md text-white uppercase ${
            statusColors[status] || "bg-gray-700"
          }`}
        >
          {status.replace("-", " ")}
        </span>
      </div>

      {/* 🧾 Content */}
      <div className="flex flex-col text-white font-Lex gap-2">
        {/* Title */}
        <h3 className="text-base sm:text-lg md:text-xl font-bold line-clamp-2 tracking-tight group-hover:text-white/90 transition-colors duration-300">
          {title}
        </h3>

        {/* Event Info */}
        <div className="text-xs sm:text-sm text-gray-400 space-y-1">
          {eventCode && (
            <div className="flex justify-between">
              <span className="text-gray-400">Event Code</span>
              <span className="text-white font-semibold">{eventCode}</span>
            </div>
          )}

          {round && (
            <div className="flex justify-between">
              <span className="text-gray-400">Round</span>
              <span className="text-[#E11D48] font-semibold">{round}</span>
            </div>
          )}

          {/* {mainTournamentID && (
            <div className="flex justify-between">
              <span className="text-gray-400">Parent</span>
              <span className="text-gray-300 truncate max-w-[120px]">
                {mainTournamentID}
              </span>
            </div>
          )} */}
        </div>

        {/* Entry & Prize */}
        <div className="space-y-1 border-t border-white/10 pt-2">
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-gray-400">Entry Fee</span>
            <span className="text-red-500 font-bold">
              ₹{Number(entryFee?.amount ?? 0).toLocaleString()}
            </span>
          </div>

          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-gray-400">Prize Pool</span>
            <span className="text-green-500 font-bold">
              ₹{Number(prizePool?.totalCurrency ?? 0).toLocaleString()}
            </span>
          </div>

          {showRegisteredInfo && (
            <div className="flex justify-between text-xs sm:text-sm">
              <span className="text-gray-400">Registered</span>
              <span className={`font-bold ${isFull ? "text-red-400" : "text-white"}`}>
                {`${registeredCount}/${maxTeams ?? "-"}`}
                {isFull && " (Full)"}
              </span>
            </div>
          )}
        </div>

        {/* 🚀 CTA */}
        <div className="mt-3">
          {showJoinButton ? (
            <Link to={`/tournaments/${_id}`}>
              <button className="w-full bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] hover:from-[#FC4E5B] hover:to-[#E11D48] text-white font-semibold py-2.5 px-4 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-xs sm:text-sm border border-[#E11D48]/40">
                {entryFee?.amount === 0 ? "Join For Free" : "Join Now"}
              </button>
            </Link>
          ) : status === "published" ? (
            <Link to={`/tournaments/${_id}`}>
              <button className="w-full bg-yellow-500 text-black font-semibold py-2.5 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-xs sm:text-sm border border-yellow-600/50">
                View Tournament
              </button>
            </Link>
          ) : (
            <button
              disabled
              className="w-full bg-gray-700 text-gray-300 font-semibold py-2.5 px-4 rounded-lg shadow-md cursor-not-allowed text-xs sm:text-sm border border-gray-600/50"
            >
              {status === "completed"
                ? "Completed"
                : status === "cancelled"
                ? "Cancelled"
                : isFull
                ? "Full"
                : "Closed"}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default TournamentCard;
