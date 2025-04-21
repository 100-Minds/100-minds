// import React from "react";
// import { PiClock } from "react-icons/pi";

// const ChapterCard = ({
//   imgSrc,
//   chapter,
//   time,
//   isActive,
//   progress,
//   onClick,
// }) => {
//   return (
//     <div
//       className={`flex items-center gap-4 !p-4 bg-gray-100  !mb-5 rounded-lg shadow-md cursor-pointer ${
//         isActive ? "border border-green-tint" : ""
//       }`}
//       onClick={onClick}
//     >
//       {/* Image Section */}
//       <div className="w-12 h-12 flex-shrink-0">
//         <img
//           src={imgSrc}
//           alt="Chapter"
//           className="w-full h-full object-cover rounded-md"
//         />
//       </div>

//       {/* Text + Progress Section */}
//       <div className="flex-1">
//         <div className="flex justify-between items-center">
//           <h3 className="text-lg font-semibold font-bebas">
//             Chapter {chapter}
//           </h3>
//           <p className="text-sm text-gray-500 font-nueue flex gap-1.5 items-center">
//             <PiClock /> {time} Mins
//           </p>
//         </div>

//         {/* Progress Bar */}
//         <div className="w-full bg-gray-300 rounded-full h-1.5 !mt-2">
//           {/* <div
//             className="bg-sidebar-color h-1.5 rounded-full"
//             style={{ width: `${progress}%` }}
//           ></div> */}
//           <div
//             className={`h-1.5 rounded-full ${
//               progress >= 75 || progress === 100
//                 ? "bg-green-tint"
//                 : "bg-sidebar-color"
//             } transition-width`}
//             style={{ width: `${progress}%` }}
//           ></div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChapterCard;

import React from "react"; // Import React
import { PiClock } from "react-icons/pi";

const ChapterCard = ({
  // Props remain the same
  imgSrc,
  chapter,
  title, // Assuming title is used
  time,
  isActive,
  progress,
  onClick,
  disabled = false,
}) => {
  // console.log(`Rendering ChapterCard ${chapter} - Active: ${isActive}, Progress: ${progress}`); // Optional: Debug log
  const disabledStyle = disabled
    ? {
        opacity: 0.6,
        cursor: "not-allowed",
        position: "relative",
      }
    : {};
  return (
    <div
      className={`flex items-center gap-4 p-3 mb-3 rounded-lg shadow-sm transition-colors duration-150 ${
        disabled
          ? "bg-gray-100 cursor-not-allowed opacity-60"
          : isActive
          ? "bg-[#50999914] border border-green-tint cursor-pointer"
          : "bg-gray-50 hover:bg-gray-100 cursor-pointer"
      }`}
      style={disabledStyle}
      onClick={disabled ? undefined : onClick}
    >
      {/* Image Section */}
      <div className="w-16 h-16 flex-shrink-0">
        {" "}
        {/* Slightly larger image */}
        <img
          src={imgSrc}
          alt={`Chapter ${chapter}`} // Improved alt text
          className="w-full h-full object-contain border border-gray-200 p-1  rounded-md"
        />
      </div>

      {/* Text + Progress Section */}
      <div className="flex-1 min-w-0">
        {" "}
        {/* Added min-w-0 for flex truncation */}
        <div className="flex justify-between items-start mb-1">
          {" "}
          {/* Adjusted alignment */}
          <h3 className="text-base font-semibold font-bebas truncate pr-2">
            {" "}
            {/* Added truncate */}
            Chapter {chapter}: {title || "Untitled Chapter"}{" "}
            {/* Display title */}
          </h3>
          <p className="text-xs text-gray-500 font-nueue flex gap-1 items-center flex-shrink-0 pt-0.5">
            {" "}
            {/* Adjusted alignment and size */}
            <PiClock /> {time}
          </p>
        </div>
        {/* Progress Bar */}
        {/* Consider removing progress > 0 check if you always want to show the bar */}
        {progress >= 0 && ( // Render even if 0%
          <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
            {/* <div
              className={`h-1.5 rounded-full transition-all duration-300 ease-out ${
                // Smoother transition
                progress >= 100
                  ? "bg-green-tint"
                  : progress > 0
                  ? "bg-indigo-500"
                  : "bg-transparent" // Green for complete, Indigo for progress
              }`}
              style={{ width: `${progress}%` }}
            ></div> */}
            <div
              className={`h-1.5 rounded-full transition-all duration-300 ease-out bg-green-tint`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

// *** Wrap the export in React.memo ***
export default React.memo(ChapterCard);
