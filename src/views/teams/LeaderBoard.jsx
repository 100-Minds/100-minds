import React from "react";
import Back from "../../components/Back";
import LeaderboardItems from "./components/LeaderboardItems";
import LeaderTabItems from "./components/LeaderTabItems";
import trophy from "../../assets/img/dashboards/teams/trophy.png";

const LeaderBoard = () => {
  const tabs = [
    "All Modules",
    "Difficult conversations",
    "Active listening",
    "Managing difficult conversations",
    "Empathy",
  ];

  const tabContent = {
    "All Modules": <LeaderboardItems />,
    "Difficult conversations": <p>Content for Difficult Conversations</p>,
    "Active listening": <p>Content for Active Listening</p>,
    "Managing difficult conversations": (
      <p>Content for Managing Difficult Conversations</p>
    ),
    Empathy: <p>Content for Empathy</p>,
  };
  return (
    <div className="lg:!px-10 !px-4 font-nueue !mb-12   ">
      <Back route={"../mining-teams"} />
      <div className="flex flex-col justify-center items-center  ">
        {/* <LeaderTabItems /> */}
        {/* <LeaderboardItems /> */}

        <LeaderTabItems
          tabs={tabs}
          tabContent={tabContent}
          header={
            <div className="flex flex-col justify-center items-center font-nueue ">
              <img src={trophy} alt="Trophy" className="w-20 h-20" />
              <h1 className="!pt-3 font-extrabold text-2xl">
                Leadership Board
              </h1>
              <div className="flex gap-3.5 !py-3">
                <p className="bg-white rounded-xl !p-1 !px-2 text-sm">
                  Power Skill
                </p>
                <p className="text-sm">Role Play</p>
              </div>
            </div>
          }
        />
      </div>
    </div>
  );
};

export default LeaderBoard;
