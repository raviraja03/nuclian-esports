import { Link, useLocation } from "react-router-dom";
import Button_2 from "../Button/Button_2"; // adjust path if needed

const FreeTournamentSuccess = () => {
  const { state } = useLocation();
  const tournament = state?.tournament;

  return (
    <>
      <div className="font-Lex bg-black/95 text-white min-h-screen pt-[10vh] px-4 sm:px-6 lg:px-12 py-8 sm:py-10 lg:py-12">
        <div className="max-w-md mx-auto">
          {/* Back Button */}
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

          {/* Success Card */}
          <section className="bg-[#0a141d]/60 backdrop-blur-md rounded-2xl border border-[#E11D48]/50 p-6 sm:p-8 shadow-lg hover:shadow-xl hover:shadow-[#E11D48]/20 transition-all duration-300 animate-in fade-in duration-500">
            <div className="text-center">
              {/* Success Icon */}
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <svg
                  className="w-6 h-6 sm:w-8 sm:h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-[#E11D48] mb-2 text-shadow-sm">
                Registration Successful!
              </h2>
              <p className="text-gray-300 text-sm sm:text-base mb-6">
                You have successfully registered for the free tournament.
              </p>

              {/* Tournament Details */}
              {tournament && (
                <div className="bg-black/40 rounded-lg p-4 mb-6 border border-white/10 text-left">
                  <p className="text-sm text-gray-300 mb-1">
                    <span className="font-semibold text-white">Title:</span>{" "}
                    {tournament.title}
                  </p>
                  <p className="text-sm text-gray-300 mb-1">
                    <span className="font-semibold text-white">Game:</span>{" "}
                    {tournament.game}
                  </p>
                  <p className="text-sm text-gray-300 mb-1">
                    <span className="font-semibold text-white">Platform:</span>{" "}
                    {tournament.platform}
                  </p>
                  <p className="text-sm text-gray-300">
                    <span className="font-semibold text-white">Start Time:</span>{" "}
                    {tournament.startTime
                      ? new Date(tournament.startTime).toLocaleString()
                      : "To Be Announced"}
                  </p>
                </div>
              )}

              {/* Buttons */}
              <div className="space-y-3">
                <Button_2
                  content="Join Another Tournament"
                  func={() => (window.location.href = "/tournaments")}
                  className="w-full bg-gradient-to-r from-[#E11D48] to-[#FC4E5B] hover:from-[#FC4E5B] hover:to-[#E11D48] text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base border border-[#E11D48]/50 animate-pulse-hover"
                />
                <p className="text-xs sm:text-sm text-gray-400">
                  A confirmation email will be sent shortly.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default FreeTournamentSuccess;
