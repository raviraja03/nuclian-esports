import React from 'react';
import { Link } from 'react-router-dom';

const Matches = () => {
  // Placeholder match data
  const matches = [
    {
      id: 1,
      date: '2025-09-10',
      game: 'Valorant',
      opponent: 'Team Phantom',
      result: 'Win',
      score: '13-7',
    },
    {
      id: 2,
      date: '2025-09-08',
      game: 'CS:GO',
      opponent: 'Shadow Strikers',
      result: 'Loss',
      score: '10-16',
    },
    {
      id: 3,
      date: '2025-09-05',
      game: 'Rocket League',
      opponent: 'Blaze Runners',
      result: 'Win',
      score: '4-2',
    },
  ];

  return (
    <div className="bg-black min-h-screen text-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-20">
        <h1 className="text-3xl sm:text-4xl font-bold font-Lex text-white tracking-tight mb-8">
          {/* My Matches <span className="text-[#E11D48]">History</span> */}
        </h1>

        {/* Matches Table */}
        <div className="bg-black/90 rounded-lg shadow-md shadow-white/5 overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden xl:block">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#E11D48]/10">
                  <th className="px-6 py-4 font-Lex font-semibold text-lg text-white">Date</th>
                  <th className="px-6 py-4 font-Lex font-semibold text-lg text-white">Game</th>
                  <th className="px-6 py-4 font-Lex font-semibold text-lg text-white">Opponent</th>
                  <th className="px-6 py-4 font-Lex font-semibold text-lg text-white">Result</th>
                  <th className="px-6 py-4 font-Lex font-semibold text-lg text-white">Score</th>
                  <th className="px-6 py-4 font-Lex font-semibold text-lg text-white">Details</th>
                </tr>
              </thead>
              <tbody>
                {matches.map((match) => (
                  <tr
                    key={match.id}
                    className="border-b border-white/10 hover:bg-white/5 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 font-Lex text-base">{match.date}</td>
                    <td className="px-6 py-4 font-Lex text-base">{match.game}</td>
                    <td className="px-6 py-4 font-Lex text-base">{match.opponent}</td>
                    <td
                      className={`px-6 py-4 font-Lex text-base ${
                        match.result === 'Win' ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {match.result}
                    </td>
                    <td className="px-6 py-4 font-Lex text-base">{match.score}</td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/matches/${match.id}`}
                        className="font-Lex text-base text-[#E11D48] hover:text-[#FC4E5B] transition-colors duration-300"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card Layout */}
          <div className="xl:hidden">
            {matches.map((match) => (
              <div
                key={match.id}
                className="border-b border-white/10 p-6 last:border-b-0 hover:bg-white/5 transition-colors duration-200"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-Lex text-lg font-semibold">{match.game}</span>
                  <span
                    className={`font-Lex text-base ${
                      match.result === 'Win' ? 'text-green-400' : 'text-red-400'
                    }`}
                  >
                    {match.result}
                  </span>
                </div>
                <p className="font-Lex text-sm text-white/70">Date: {match.date}</p>
                <p className="font-Lex text-sm text-white/70">Opponent: {match.opponent}</p>
                <p className="font-Lex text-sm text-white/70">Score: {match.score}</p>
                <Link
                  to={`/matches/${match.id}`}
                  className="font-Lex text-base text-[#E11D48] hover:text-[#FC4E5B] transition-colors duration-300 inline-block mt-2"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* No Matches Fallback */}
        {matches.length === 0 && (
          <div className="text-center py-12">
            <p className="font-Lex text-lg text-white/70">No matches played yet.</p>
            <Link
              to="/tournaments"
              className="font-Lex text-base text-[#E11D48] hover:text-[#FC4E5B] transition-colors duration-300 inline-block mt-4"
            >
              Join a Tournament
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Matches;