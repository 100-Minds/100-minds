import React from "react";
import LeaderTabItems from "./components/LeaderTabItems";
import vs from "../../assets/img/dashboards/teams/vs.png";
import CompareStatItems from "./components/CompareStatItems";

const CompareStats = () => {
  const tabs = [
    "All Modules",
    "Difficult conversations",
    "Active listening",
    "Managing difficult conversations",
    "Empathy",
  ];

  const tabContent = {
    "All Modules": <CompareStatItems />,
    "Difficult conversations": <p>Content for Difficult Conversations</p>,
    "Active listening": <p>Content for Active Listening</p>,
    "Managing difficult conversations": (
      <p>Content for Managing Difficult Conversations</p>
    ),
    Empathy: <p>Content for Empathy</p>,
  };
  return (
    <div className="">
      <LeaderTabItems
        tabs={tabs}
        tabContent={tabContent}
        header={
          <div className="flex flex-col justify-center items-center font-nueue">
            <img src={vs} alt="Trophy" className="w-20 h-20" />
            <h1 className="pt-3 font-extrabold text-2xl">Comparing Stats</h1>
            <div className="flex gap-3.5 py-3">
              <p className="bg-white rounded-xl p-1 px-2 text-sm">
                Power Skill
              </p>
              <p className="text-sm">Role Play</p>
            </div>
          </div>
        }
      />
    </div>
  );
};

export default CompareStats;
