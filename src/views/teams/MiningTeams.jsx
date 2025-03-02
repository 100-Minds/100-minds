import React from "react";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiScales2Line,
  RiScales3Line,
  RiScalesFill,
} from "react-icons/ri";
import { Link } from "react-router-dom";
import Back from "../../components/Back";
import profile from "./../../assets/img/dashboards/teams/avatar7.jpg";
import profile2 from "./../../assets/img/dashboards/teams/avatar2.jpg";
import performance from "../../assets/img/dashboards/teams/3d-pt-box.svg";
import userMinus from "../../assets/img/dashboards/teams/user-minus.svg";
import leader from "../../assets/img/dashboards/teams/leadership.svg";
import compare from "../../assets/img/dashboards/teams/performance.svg";
import Miningcard from "./components/Miningcard";
import KeyStats from "./components/KeyStats";

const MiningTeams = () => {
  const handleSeePerformance = () => {};
  const handleRemoveUser = () => {};
  const handleLeaderboardClick = () => {};
  return (
    <section className="lg:!px-10 !px-4">
      <div>
        <Back route={"/teams"} />
      </div>
      <div className="grid lg:grid-cols-5 gap-10 !py-8 font-nueue">
        <div className="flex flex-col  gap-4 !p-4 bg-white  !mb-5 rounded-3xl shadow-md lg:col-span-3  col-span-5 ">
          <h1 className="text-2xl text-center font-bold  tracking-tight !py-6">
            Mining Team
          </h1>
          <Miningcard
            profile={profile}
            email="Sarahmartins@gmail.com"
            teamCount={1}
            onSeePerformance={handleSeePerformance}
            onRemove={handleRemoveUser}
          />
          <Miningcard
            profile={profile2}
            email="WilliamsJackob@gmail.com"
            teamCount={3}
            onSeePerformance={handleSeePerformance}
            onRemove={handleRemoveUser}
          />
          <Miningcard
            profile={profile}
            email="Sarahmartins@gmail.com"
            teamCount={1}
            onSeePerformance={handleSeePerformance}
            onRemove={handleRemoveUser}
          />
          <Miningcard
            profile={profile2}
            email="WilliamsJackob@gmail.com"
            teamCount={3}
            onSeePerformance={handleSeePerformance}
            onRemove={handleRemoveUser}
          />
        </div>
        <div className="lg:col-span-2 col-span-5 self-start flex flex-col  gap-4 !p-4 bg-white rounded-3xl shadow-md !mb-5">
          <h1 className="text-2xl text-center font-bold  tracking-tight !py-6">
            Key Stats
          </h1>

          <KeyStats
            icon={leader}
            text="See Leadership boards"
            onClick={handleLeaderboardClick}
          />
          <KeyStats
            icon={compare}
            text="Compare Performance"
            onClick={handleLeaderboardClick}
          />
        </div>
      </div>
    </section>
  );
};

export default MiningTeams;
