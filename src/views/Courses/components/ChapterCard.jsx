import React from "react";
import { PiClock } from "react-icons/pi";

const ChapterCard = ({ imgSrc, chapter, time, progress }) => {
  return (
    <div className="flex items-center gap-4 !p-4 bg-gray-100  !mb-5 rounded-lg shadow-md">
      {/* Image Section */}
      <div className="w-12 h-12 flex-shrink-0">
        <img
          src={imgSrc}
          alt="Chapter"
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Text + Progress Section */}
      <div className="flex-1">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold font-bebas">
            Chapter {chapter}
          </h3>
          <p className="text-sm text-gray-500 font-nueue flex gap-1.5 items-center">
            <PiClock /> {time} Mins
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-300 rounded-full h-1.5 !mt-2">
          <div
            className="bg-sidebar-color h-1.5 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ChapterCard;
