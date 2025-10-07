import React from "react";
import Heading from "./Heading";
import TournamentCard from "./shared/TournamentCard";

const UpcomingTournaments = ({ tournaments }) => {
  return (
    <section className="bg-[linear-gradient(176deg,rgba(0,0,0,1)_16%,rgba(25,31,52,0.6)_40%,rgba(100,100,100,0.2)_62%,rgba(0,0,0,1)_80%)] py-12">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <Heading highlight="Featured" nohighlight="Tournaments" />

        <div className="flex overflow-x-auto gap-6 mt-10 pb-4 snap-x snap-mandatory scroll-smooth scrollbar-hide justify-center">
          {tournaments.map((cardData, index) => (
            <div
              key={index}
              className="
                snap-center
                flex-shrink-0
                w-[90%] sm:w-[60%] md:w-[40%] lg:w-[33.33%]
              "
            >
              <TournamentCard card={cardData} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingTournaments;
