import React from "react";
import Hero from "../Hero/Hero";
import Banner from "../Banner/Banner";
import Category from "../Category/Category";
import Step from "../Step/Step";
import Games from "../Games/Games";
import Testimonials from "../Testimonials/Testimonials";
import CommunitySection from "../Community/Community";
import Coins from "../Coins/Coins";
import { useGetTournamentsQuery } from "../../globalState/api/tournamentApi";
import PageLoader from "../shared/PageLoader";

const Home = () => {
  const {
    data: tournaments = {},

    isLoading,
  } = useGetTournamentsQuery({ limit: 3 })

  return (
    <div>
      <Hero />
      <Banner />
      {isLoading ? (
        <PageLoader />
      ) : (
        <>
          {tournaments?.data?.length > 0 && (
            <Category tournaments={tournaments.data} />
          )}
        </>
      )}
      <Step />
      <Games />
      {/* <Coins /> */}
      {/* <Achievement /> */}
      <CommunitySection />
      <Testimonials />
    </div>
  );
};

export default Home;
