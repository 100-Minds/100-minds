import React from "react";

const PerformanceStatCard = ({ image, title, value, timeFrame }) => {
  return (
    <div className="bg-white !p-4  rounded-2xl flex items-center justify-between shadow-md ">
      {/* Left Side - Icon & Text */}
      <div className="flex items-center gap-3">
        <img
          src={image}
          alt={title}
          className="w-11 h-11 object-contain bg-whitish !p-2 rounded-xl"
        />
        <div>
          <h3 className="text-sm font-bold">{title}</h3>
          <p className="text-gray-500 text-xs">{timeFrame}</p>
        </div>
      </div>

      {/* Right Side - Number */}
      <h2 className="text-2xl font-extrabold">{value}</h2>
    </div>
  );
};

export default PerformanceStatCard;
