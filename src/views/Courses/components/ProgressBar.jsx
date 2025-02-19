import React from "react";

const ProgressBar = ({ percentage }) => {
  return (
    <div className="relative w-full">
      {/* Percentage Label (Moves with Progress) */}
      <div
        className="absolute -bottom-1 text-[10px] font-semibold text-gray-700 transition-all duration-300 bg-white rounded !p-0.5"
        style={{ left: `${percentage}%`, transform: "translateX(-50%)" }}
      >
        {percentage}%
      </div>

      {/* Progress Bar Background */}
      <div className="w-full h-2 bg-gray-200 rounded-lg overflow-hidden">
        {/* Progress Fill */}
        <div
          className="h-full bg-black transition-all duration-300"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
