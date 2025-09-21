import React from "react";
import Heading from "../Heading/Heading";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { useGetTournamentsQuery } from "../../globalState/api/tournamentApi";
import FeaturedCard from "../shared/FeaturedCard";
import PageLoader from "../shared/PageLoader";



const Category = () => {
  const {
    data: tournaments = [],
    isError,
    isLoading,
  } = useGetTournamentsQuery({ limit: 3, status: "registration-open" });
  console.log("Fetched Tournaments:", tournaments.data); 
  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) {
    return <p className="text-red-500 text-center py-10">Error loading tournaments. Please try again later.</p>;
  }
  return (
    <section className="bg-[linear-gradient(176deg,rgba(0,0,0,1)_16%,rgba(25,31,52,0.6)_40%,rgba(100,100,100,0.2)_62%,rgba(0,0,0,1)_80%)] py-12">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <Heading highlight="Featured" nohighlight="Tournaments" />

        <div className="flex overflow-x-auto space-x-6 mt-10 pb-4 custom-scroll ">
          {tournaments.data.map((card, index) => (
            <FeaturedCard key={index} card={card} />))}
        </div>

        {/* View All Button */}
        <div className="mt-8 flex justify-center">
          <Link to="/tournaments">
            <Button content="View All" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Category;
