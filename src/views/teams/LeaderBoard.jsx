import React from "react";
import Back from "../../components/Back";
import LeaderboardItems from "./components/LeaderboardItems";

const LeaderBoard = () => {
  return (
    <div className="lg:!px-10 !px-4 font-nueue !mb-12 ">
      <Back route={"../mining-teams"} />
      <div>
        <LeaderboardItems />
      </div>
    </div>
  );
};

export default LeaderBoard;
