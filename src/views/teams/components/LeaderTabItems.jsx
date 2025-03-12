// import { useState } from "react";
// import trophy from "../../../assets/img/dashboards/teams/trophy.png";
// import LeaderboardItems from "./LeaderboardItems";

// const LeaderTabItems = () => {
//   const tabs = [
//     "All Modules",
//     "Difficult conversations",
//     "Active listening",
//     "Managing difficult conversations",
//     "Empathy",
//   ];

//   const [activeTab, setActiveTab] = useState(tabs[0]);
//   return (
//     <div className="w-full lg:max-w-3xl mx-auto">
//       <div className="flex flex-col justify-center items-center  font-nueue">
//         <img src={trophy} alt="" className="w-20 h-20" />
//         <h1 className="pt-3 font-extrabold text-2xl">Leadership board</h1>
//         <div className="flex gap-3.5 py-3">
//           <div>
//             <p className="bg-white  rounded-xl p-1 px-2 text-sm">Power skill</p>
//           </div>
//           <div>
//             <p className="text-sm">Role play</p>
//           </div>
//         </div>
//       </div>
//       {/* Tabs */}
//       <div className="flex border-b justify-between border-gray-300  bg-white rounded-2xl py-2 px-4">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-4 py-2 text-sm font-medium focus:outline-none transition-all
//               ${
//                 activeTab === tab
//                   ? " bg-whitish text-black rounded-xl"
//                   : "text-gray-500 hover:text-green-tint"
//               }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Tab Content */}
//       <div className="p-4 text-gray-700">
//         {activeTab === "All Modules" && <LeaderboardItems />}
//         {activeTab === "Difficult conversations" && (
//           <p>Content for Difficult Conversations</p>
//         )}
//         {activeTab === "Active listening" && (
//           <p>Content for Active Listening</p>
//         )}
//         {activeTab === "Managing difficult conversations" && (
//           <p>Content for Managing Difficult Conversations</p>
//         )}
//         {activeTab === "Empathy" && <p>Content for Empathy</p>}
//       </div>
//     </div>
//   );
// };

// export default LeaderTabItems;

import { useState } from "react";

const LeaderTabItems = ({ tabs, tabContent, header }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <div className="w-full lg:max-w-3xl text-nowrap mx-auto ">
      {/* Header Section (Passed as Prop) */}
      {header && <div className="!mb-4 lg:!mb-2">{header}</div>}

      {/* Tabs */}
      {/* <div className="flex  border-b justify-between border-gray-300 bg-white rounded-2xl py-2 px-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium focus:outline-none transition-all tracking-tight
              ${
                activeTab === tab
                  ? "bg-whitish text-black rounded-xl"
                  : "text-gray-500 hover:text-green-tint"
              }`}
          >
            {tab}
          </button>
        ))}
      </div> */}

      <div className="relative flex  lg:border-b justify-between border-gray-300 bg-white rounded-2xl !py-2 !px-4 !mb-4">
        {/* Left Fade */}
        <div className="absolute left-0 top-0 h-full w-6 bg-gradient-to-r from-white to-transparent pointer-events-non rounded-2xl"></div>

        <div className="flex justify-between overflow-x-auto whitespace-nowrap scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`!px-4 !py-2 text-sm font-medium focus:outline-none transition-all tracking-tight
          ${
            activeTab === tab
              ? "bg-whitish text-black rounded-xl"
              : "text-gray-500 hover:text-green-tint"
          }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Right Fade */}
        <div className="absolute right-0 top-0 h-full w-6 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
      </div>

      {/* Tab Content */}
      <div className="lg:!p-4 text-gray-700">{tabContent[activeTab]}</div>
    </div>
  );
};

export default LeaderTabItems;
