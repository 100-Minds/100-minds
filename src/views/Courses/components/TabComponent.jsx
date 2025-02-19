import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import Video from "./Video";

const TabComponent = () => {
  const [activeTab, setActiveTab] = useState("video");

  const tabs = [
    { name: "Video", key: "video" },
    { name: "Role Play", key: "roleplay" },
    { name: "Quiz", key: "quiz" },
  ];

  return (
    <div>
      {/* Tabs */}
      <div className="flex gap-7.5 !pb-6 text-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-medium  ${
              activeTab === tab.key
                ? "bg-white  text-gray-800 !p-1 !px-3 rounded-2xl font-extrabold"
                : "text-gray-500"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4">
        <ProgressBar percentage={40} />
        {activeTab === "video" && <Video />}
        {activeTab === "roleplay" && <p>🎭 Role Play content goes here...</p>}
        {activeTab === "quiz" && <p>📝 Quiz content goes here...</p>}
      </div>
    </div>
  );
};

export default TabComponent;
