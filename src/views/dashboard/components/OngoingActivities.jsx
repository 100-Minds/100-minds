import React from "react";
import OngoingCard from "../../../components/ongoing cards/OngoingCard";
import difficult from "../../../assets/img/dashboards/ongoing/difficult.png";
import icondifficult from "../../../assets/img/dashboards/ongoing/difficult-icon.png";
import active from "../../../assets/img/dashboards/ongoing/active.png";
import iconactive from "../../../assets/img/dashboards/ongoing/difficult-icon.png";

import giving from "../../../assets/img/dashboards/ongoing/giving.png";
import icongiving from "../../../assets/img/dashboards/ongoing/giving icon.png";

import manage from "../../../assets/img/dashboards/ongoing/managing.png";
import iconmanage from "../../../assets/img/dashboards/ongoing/manging icon.png";

import ProgressBar from "./ProgressBar";
const OngoingActivities = () => {
  const segments = [
    { percentage: 20, color: "#FCECA8" },
    { percentage: 30, color: "#34D399" },
    { percentage: 20, color: "#60A5FA" },
    { percentage: 50, color: "#F87171" },
  ];

  return (
    <section>
      <h1 className=" text-3xl lg:text-5xl font-bebas">ONGOING ACTIVITIES</h1>
      <div className="flex items-center gap-2.5 !mt-4">
        <span className="font-nueue font-bold !p-1 !px-2 rounded-xl bg-white">
          Practice/role-play
        </span>
        <p className="font-nueue text-gray-500">Learning modules</p>
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 !mt-4 gap-4">
        <OngoingCard
          img={difficult}
          icon={icondifficult}
          icontext1={"Difficult"}
          icontext2={"Conversations"}
          progress={<ProgressBar segments={[segments[0]]} />}
          progressText={`${[segments[0].percentage]}% COMPLETE`}
        />
        <OngoingCard
          img={active}
          icon={icondifficult}
          icontext1={"Active"}
          icontext2={"Listening"}
          progress={<ProgressBar segments={[segments[1]]} />}
          progressText={`${[segments[1].percentage]}% COMPLETE`}
        />
        <OngoingCard
          img={giving}
          icon={icongiving}
          icontext1={"Giving"}
          icontext2={"Feedback"}
          progress={<ProgressBar segments={[segments[2]]} />}
          progressText={`${[segments[2].percentage]}% COMPLETE`}
        />
        <OngoingCard
          img={manage}
          icon={iconmanage}
          icontext1={"Managing difficult"}
          icontext2={"situations"}
          progress={<ProgressBar segments={[segments[3]]} />}
          progressText={`${[segments[3].percentage]}% COMPLETE`}
        />
      </div> */}
      <div className="flex md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 !mt-4 gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-smooth scrollbar-hide">
        <OngoingCard
          img={difficult}
          icon={icondifficult}
          icontext1={"Difficult"}
          icontext2={"Conversations"}
          progress={<ProgressBar segments={[segments[0]]} />}
          progressText={`${segments[0].percentage}% COMPLETE`}
          className="min-w-[80%] md:min-w-0 snap-start"
        />
        <OngoingCard
          img={active}
          icon={icondifficult}
          icontext1={"Active"}
          icontext2={"Listening"}
          progress={<ProgressBar segments={[segments[1]]} />}
          progressText={`${segments[1].percentage}% COMPLETE`}
          className="min-w-[80%] md:min-w-0 snap-start"
        />
        <OngoingCard
          img={giving}
          icon={icongiving}
          icontext1={"Giving"}
          icontext2={"Feedback"}
          progress={<ProgressBar segments={[segments[2]]} />}
          progressText={`${segments[2].percentage}% COMPLETE`}
          className="min-w-[80%] md:min-w-0 snap-start"
        />
        <OngoingCard
          img={manage}
          icon={iconmanage}
          icontext1={"Managing difficult"}
          icontext2={"situations"}
          progress={<ProgressBar segments={[segments[3]]} />}
          progressText={`${segments[3].percentage}% COMPLETE`}
          className="min-w-[80%] md:min-w-0 snap-start"
        />
      </div>
    </section>
  );
};

export default OngoingActivities;
