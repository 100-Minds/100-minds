import React from "react";
import sandro from "../../../assets/img/dashboards/teams/avatar5.jpg";
import performance from "../../../assets/img/dashboards/teams/performance.svg";
import LeaderBarChart from "./LeaderBarChart";

const CompareStatItems = () => {
  return (
    <div className="lg:w-full mx-auto space-y-3 bg-white lg:p-8 p-4 rounded-3xl font-nueue">
      <p className=" tracking-tight text-gray-400">Comparing Stats</p>
      <div className="mt-7 ">
        <div className="flex gap-7 items-center pb-6">
          <div className="flex gap-3 items-center">
            <div className="w-10 h-10 rounded-full bg-purple-shade"></div>
            <p className="text-3xl text-black">Sandro Trey</p>
          </div>
          <div>
            <img src={performance} alt="" />
          </div>
          <div className="flex gap-3 items-center">
            <div className="w-10 h-10 rounded-full bg-light-purple-shade"></div>
            <p className="text-3xl text-black">Andy Adams</p>
          </div>
        </div>
        <div>
          <LeaderBarChart />
        </div>
      </div>
      <div className="flex items-center gap-3 py-4">
        <img
          src={sandro}
          alt=""
          className="w-8 h-8 object-contain rounded-full"
        />
        <p>Sandro Trey came out on top by 15%</p>
      </div>
    </div>
  );
};

export default CompareStatItems;
