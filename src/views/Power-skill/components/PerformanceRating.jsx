import React from "react";
import star from "../../../assets/img/dashboards/star_perfomance.png";
const PerformanceRating = () => {
  return (
    <div className="hidden lg:flex items-center bg-white shadow-lg rounded-3xl !p-4 w-full max-w-md font-nueue">
      {/* <Star className="text-yellow-500 w-10 h-10" /> */}
      <img
        src={star}
        alt=""
        className="text-yellow-500 w-14 h-14 object-cover"
      />
      <div className="!ml-4">
        <h2 className="text-lg font-semibold">PERFORMANCE RATINGS</h2>
        <p className="text-gray-600 text-sm">
          Your performance rating would be seen here after the end of your
          session.
        </p>
      </div>
    </div>
  );
};

export default PerformanceRating;
