import React from "react";
import { RiArrowRightSLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const KeyStats = ({ icon, text, onClick }) => {
  return (
    <div
      className="bg-whitish !p-3 rounded-2xl flex justify-between items-center cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <img
          src={icon}
          alt="Leaderboard Icon"
          className="bg-white w-10 h-10 !p-2 rounded-xl"
        />
        <Link to={"../leader-board"} className="text-sm font-bold">
          {text}
        </Link>
      </div>
      <RiArrowRightSLine size={20} />
    </div>
  );
};

export default KeyStats;
