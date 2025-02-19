// ProgressBar.jsx
import React from "react";

const ProgressBar = ({ segments }) => {
  return (
    <div className="w-full bg-gray-200 h-[3px] rounded overflow-hidden !mb-2">
      <div className="flex h-full">
        {segments.map((segment, index) => (
          <div
            key={index}
            className="h-full"
            style={{
              width: `${segment.percentage}%`,
              backgroundColor: segment.color,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
