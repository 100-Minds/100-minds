import React from "react";
import { PiClock } from "react-icons/pi";
import { Link } from "react-router-dom";
import ask from "../../../assets/img/dashboards/learningModules/starz.svg";

const RolePlayJourneyCards = ({
  bgModule = "",
  courseName,
  courseId,
  para1,
  para2,
  para3,
}) => {
  return (
    <div
      className={`w-full h-96 rounded-[20px] min-w-[85%] lg:min-w-0 snap-start ${bgModule} `}
    >
      <div className="!px-5 !pt-8 relative z-0 flex flex-col justify-between h-full">
        <div>
          <p className="font-bebas text-3xl text-white">{courseName}</p>
          <p className="text-white font-nueue text-base !pt-2">
            {para1}
            <span>
              {" "}
              <br />{" "}
            </span>{" "}
            {para2}
            <span>
              {" "}
              <br />{" "}
            </span>{" "}
            {para3}
          </p>
        </div>
        <div className="flex justify-between items-center !py-8 text-nowrap">
          <div className="flex gap-3.5 items-center text-white">
            <span className="flex gap-1.5 items-center bg-[#0000001F] text-[9px] lg:text-sm  !p-2 !px-3 rounded-2xl">
              <PiClock size={14} className="font-bold" /> 12:30 PM
            </span>
          </div>
          <Link
            className={`bg-white text-sidebar-color  font-semibold text-[9px] lg:text-sm !p-2 !px-3 rounded-4xl flex gap-1.5 items-center hover:scale-[1.02] transition`}
            // to={`/journey/${courseId}`}
            to={`/courses/${courseId}/lessons/:lessonId`}
          >
            Get Started{" "}
            <img
              src={ask}
              alt=""
              className="w-5 h-5 !p-1 drop custom-gradient bg-[#312F4C] rounded-full !object-cover"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RolePlayJourneyCards;
