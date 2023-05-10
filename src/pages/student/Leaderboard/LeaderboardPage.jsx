/** @format */

import React from "react";
import Leaderboard from "../../../components/StudentPortal/Leaderboard/Leaderboard";

const LeaderboardPage = () => {
  return (
    <>
      <section className="py-6 bg-primary">
        <div className="mx-auto max-w-7xl px-5 lg:px-0">
          <Leaderboard />
        </div>
      </section>
    </>
  );
};

export default LeaderboardPage;
