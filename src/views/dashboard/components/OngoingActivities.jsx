import React, { useState } from "react";
import PropTypes from "prop-types";
import OngoingCard from "../../../components/ongoing cards/OngoingCard";
import ProgressBar from "./ProgressBar";

// Importing Learning Modules Images
import difficult from "../../../assets/img/dashboards/ongoing/difficult.png";
import icondifficult from "../../../assets/img/dashboards/ongoing/difficult-icon.png";
import active from "../../../assets/img/dashboards/ongoing/active.png";
import iconactive from "../../../assets/img/dashboards/ongoing/difficult-icon.png";
import giving from "../../../assets/img/dashboards/ongoing/giving.png";
import icongiving from "../../../assets/img/dashboards/ongoing/giving icon.png";
import manage from "../../../assets/img/dashboards/ongoing/managing.png";
import iconmanage from "../../../assets/img/dashboards/ongoing/manging icon.png";

// Importing Role Play Images
import role1 from "../../../assets/img/dashboards/learningModules/module-purple.svg";
import roleicon1 from "../../../assets/img/dashboards/ongoing/difficult-icon.png";
import role2 from "../../../assets/img/dashboards/learningModules/module-purple.svg";
import roleicon2 from "../../../assets/img/dashboards/ongoing/difficult-icon.png";
import role3 from "../../../assets/img/dashboards/learningModules/module-purple.svg";
import roleicon3 from "../../../assets/img/dashboards/ongoing/difficult-icon.png";
import role4 from "../../../assets/img/dashboards/learningModules/module-purple.svg";
import roleicon4 from "../../../assets/img/dashboards/ongoing/difficult-icon.png";

const OngoingActivities = ({ limit }) => {
  const [activeTab, setActiveTab] = useState("learning");

  const segments = [
    { percentage: 20, color: "#FCECA8" },
    { percentage: 30, color: "#34D399" },
    { percentage: 20, color: "#60A5FA" },
    { percentage: 50, color: "#F87171" },
  ];

  // Learning Modules Data
  const learningActivities = [
    {
      img: difficult,
      icon: icondifficult,
      icontext1: "Difficult",
      icontext2: "Conversations",
      progress: <ProgressBar segments={[segments[0]]} />,
      progressText: `${segments[0].percentage}% COMPLETE`,
    },
    {
      img: active,
      icon: iconactive,
      icontext1: "Active",
      icontext2: "Listening",
      progress: <ProgressBar segments={[segments[1]]} />,
      progressText: `${segments[1].percentage}% COMPLETE`,
    },
    {
      img: giving,
      icon: icongiving,
      icontext1: "Giving",
      icontext2: "Feedback",
      progress: <ProgressBar segments={[segments[2]]} />,
      progressText: `${segments[2].percentage}% COMPLETE`,
    },
    {
      img: giving,
      icon: icongiving,
      icontext1: "Giving",
      icontext2: "Feedback",
      progress: <ProgressBar segments={[segments[2]]} />,
      progressText: `${segments[2].percentage}% COMPLETE`,
    },
    {
      img: manage,
      icon: iconmanage,
      icontext1: "Managing",
      icontext2: "Situations",
      progress: <ProgressBar segments={[segments[3]]} />,
      progressText: `${segments[3].percentage}% COMPLETE`,
    },
  ];

  // Role Play Data
  const rolePlayActivities = [
    {
      img: role1,
      icon: roleicon1,
      icontext1: "Handling",
      icontext2: "Objections",
      progress: <ProgressBar segments={[segments[0]]} />,
      progressText: `${segments[0].percentage}% COMPLETE`,
    },
    {
      img: role2,
      icon: roleicon2,
      icontext1: "Negotiation",
      icontext2: "Skills",
      progress: <ProgressBar segments={[segments[1]]} />,
      progressText: `${segments[1].percentage}% COMPLETE`,
    },
    {
      img: role3,
      icon: roleicon3,
      icontext1: "Building",
      icontext2: "Rapport",
      progress: <ProgressBar segments={[segments[2]]} />,
      progressText: `${segments[2].percentage}% COMPLETE`,
    },
    {
      img: role4,
      icon: roleicon4,
      icontext1: "Persuasive",
      icontext2: "Speaking",
      progress: <ProgressBar segments={[segments[3]]} />,
      progressText: `${segments[3].percentage}% COMPLETE`,
    },
  ];

  const activities =
    activeTab === "learning"
      ? learningActivities.slice(0, limit)
      : rolePlayActivities.slice(0, limit);

  return (
    <section>
      {/* Tabs */}
      <div className="flex gap-4 !pt-4 font-nueue">
        <button
          className={`font-bold !px-4 !py-1 rounded-3xl  ${
            activeTab === "learning" ? " text-black bg-white " : ""
          }`}
          onClick={() => setActiveTab("learning")}
        >
          Learning Modules
        </button>

        <button
          className={`font-bold !px-4 !py-1 rounded-3xl ${
            activeTab === "roleplay" ? " bg-white" : ""
          }`}
          onClick={() => setActiveTab("roleplay")}
        >
          Role Play
        </button>
      </div>

      {/* Content */}
      <div className="flex md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 !mt-4 gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-smooth scrollbar-hide">
        {activities.map((activity, index) => (
          <OngoingCard
            key={index}
            img={activity.img}
            icon={activity.icon}
            icontext1={activity.icontext1}
            icontext2={activity.icontext2}
            progress={activity.progress}
            progressText={activity.progressText}
            className="min-w-[80%] md:min-w-0 snap-start"
          />
        ))}
      </div>
    </section>
  );
};

OngoingActivities.propTypes = {
  limit: PropTypes.number,
};

OngoingActivities.defaultProps = {
  limit: 4, // Default limit if not provided
};

export default OngoingActivities;
