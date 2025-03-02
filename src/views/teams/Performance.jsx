import React from "react";
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiScales2Line,
} from "react-icons/ri";
import Back from "../../components/Back";
import sarah from "../../assets/img/dashboards/sarah.png";
import { Link } from "react-router-dom";
import { FiUserMinus } from "react-icons/fi";
import progress from "../../assets/img/dashboards/dashboard component/Content.png";
import PerformanceStatCard from "./PerformanceStatCard";
import starIcon from "../../assets/img/dashboards/teams/star-dashed.svg";
import boxIcon from "../../assets/img/dashboards/teams/3d-pt-box.svg";
import timeIcon from "../../assets/img/dashboards/teams/time.svg";
const Performance = () => {
  const performanceData = [
    {
      title: "Daily Performance Rating",
      value: "15%",
      description: "Increase compared to yesterday",
      day: "Today",
    },
    {
      title: "Completed Sessions",
      value: "70%",
      description: "Learnt 96 out of 100 Power skills",
      day: "Deals",
    },
    // {
    //   title: "Average Quiz Score",
    //   value: "18",
    //   description: "Member Quiz Score is average",
    // },
  ];
  return (
    <div className="lg:!px-10 !px-4 font-nueue !mb-12 ">
      <Back route={"../mining-teams"} />
      <div className="w-full flex flex-col items-center justify-center ">
        <img
          src={sarah}
          alt=""
          className="w-36 h-36 object-contain rounded-full"
        />
        <div className=" flex flex-col items-center justify-center !py-4">
          <h3 className="text-xl font-bold ">Sarah Adams</h3>
          <p className="text-sm text-gray-500 !py-1.5">Added 4 weeks ago</p>
          <div className="flex justify-end items-center gap-3 !py-2">
            <Link
              to={"../performance"}
              //   onClick={onSeePerformance}
              className="bg-green-tint !p-2 !px-4 rounded-3xl text-white text-xs flex items-center gap-2"
            >
              See Performance <RiScales2Line />
            </Link>
            <button
              //   onClick={onRemove}
              className="text-xs flex items-center bg-white !p-2 gap-2 !px-4 text-red-500 rounded-3xl"
            >
              Remove <FiUserMinus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {performanceData.map((item, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-2xl flex flex-col !py-9 justify-between shadow-md"
          >
            {/* Text Content */}
            <h3 className="font-bold text-lg ">{item.title}</h3>
            <div>
              <p className="text-3xl font-extrabold">
                {item.value} {}
              </p>
              <p className="text-gray-400 text-xs flex items-center gap-1">
                {item.description}
              </p>
            </div>
            <p className="text-gray-400 text-xs flex items-center gap-1">
              {item.day}
              <RiArrowDownSLine className="" size={22} />
            </p>
          </div>
        ))}

        <div className="bg-white !p-3 !pb-7 rounded-[20px] flex flex-col justify-center items-center">
          <h1 className="font-nueue text-grey-tint tracking-tight !py-2 font-extrabold">
            Average Quiz score
          </h1>
          <div className="w-full h-26  translate-x-4">
            <img
              src={progress}
              alt=""
              className="w-full h-full object-contain object-center"
            />
          </div>
          <h4 className="font-nueue text-black text-4xl font-bold tracking-tight !-mt-6 !mb-2">
            18
          </h4>
          <p className="font-nueue tracking-tight font-extrabold">
            Member Quiz Score is average
          </p>
          <p className="font-nueue text-xs text-grey-tint tracking-tighter">
            Last Check on 21 Apr
          </p>
        </div>

        <PerformanceStatCard
          image={starIcon}
          title="Minutes Watched"
          value="15"
          timeFrame="This Week"
        />
        <PerformanceStatCard
          image={boxIcon}
          title="Total learning module"
          value="15"
          timeFrame="This Week"
        />
        <PerformanceStatCard
          image={timeIcon}
          title="Minutes Watched"
          value="15"
          timeFrame="All Time"
        />
      </div>
    </div>
  );
};

export default Performance;
