import React from "react";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import Category from "../components/Category";
import Step from "../components/Step";
import Games from "../components/Games";
import Testimonials from "../components/Testimonials";
import CommunitySection from "../components/Community";
import Coins from "../components/Coins";
import { useGetTournamentsQuery } from "../globalState/api/tournamentApi";
import PageLoader from "../components/shared/PageLoader";

const Home = () => {
  const {
    data: tournaments = {},

    isLoading,
  } = useGetTournamentsQuery({
    limit: 3,
    status: "registration-open",
    isVisible: true,
  });

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
