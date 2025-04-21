// import React, { useEffect, useState } from "react";
// import ProgressBar from "./ProgressBar";
// import Video from "./Video";
// import ChapterList from "../ChapterList";
// import Quiz from "./Quiz";
// import { div } from "framer-motion/client";
// import GetAssessments from "./GetAssessments";

// const TabComponent = ({
//   courseName,
//   chapterName,
//   isChapterLoading,
//   videoCourseLesson,
// }) => {
//   const [activeTab, setActiveTab] = useState("video");

//   const tabs = [
//     { name: "Video", key: "video" },
//     { name: "Quiz", key: "quiz" },
//     { name: "Role Play", key: "roleplay" },
//   ];
//   const handleTabClick = (tabKey) => {
//     console.log("tabKey", tabKey);
//     setActiveTab(tabKey);
//   };
//   useEffect(() => {
//     if (activeTab) {
//       // Store the activeTab (tabKey) in sessionStorage
//       sessionStorage.setItem("activeTab", activeTab);
//     }
//   }, [activeTab]);
//   // Add event listener for tab switching
//   useEffect(() => {
//     const handleTabSwitch = (event) => {
//       if (event.detail?.chapterId === chapterName?.id) {
//         setActiveTab("quiz");
//       }
//     };

//     window.addEventListener("switchToQuizTab", handleTabSwitch);

//     // Also check sessionStorage on mount
//     const pendingQuiz = sessionStorage.getItem("pendingQuiz");
//     const storedActiveTab = sessionStorage.getItem("activeTab");

//     if (
//       pendingQuiz &&
//       pendingQuiz === chapterName?.id &&
//       storedActiveTab === "quiz"
//     ) {
//       setActiveTab("quiz");
//     }

//     return () => {
//       window.removeEventListener("switchToQuizTab", handleTabSwitch);
//     };
//   }, [chapterName?.id]);

//   return (
//     <div>
//       {/* Tabs */}
//       <div className="flex lg:gap-7.5 gap-1.5 !pb-6 text-gray-300">
//         {tabs.map((tab) => (
//           <button
//             key={tab.key}
//             onClick={() => handleTabClick(tab.key)}
//             className={`px-4 py-2 text-sm font-medium  ${
//               activeTab === tab.key
//                 ? "bg-white  text-gray-800 !p-1 !px-3 rounded-2xl font-extrabold"
//                 : "text-gray-500"
//             }`}
//           >
//             {tab.name}
//           </button>
//         ))}
//       </div>

//       {/* Tab Content */}
//       <div className="p-4">
//         {/* <ProgressBar percentage={40} /> */}
//         {activeTab === "video" && (
//           <div>
//             <Video
//               courseName={courseName}
//               chapterName={chapterName}
//               isChapterLoading={isChapterLoading}
//               videoCourseLesson={videoCourseLesson}
//             />
//             {/* <ChapterList /> */}
//           </div>
//         )}
//         {activeTab === "quiz" && (
//           <div>
//             <Quiz
//               activeTab={activeTab}
//               onQuizComplete={() => {
//                 // When quiz is completed, clear the pending quiz flag
//                 sessionStorage.removeItem("pendingQuiz");
//                 // Optionally switch back to video tab
//                 setActiveTab("video");
//               }}
//             />
//           </div>
//         )}

//         {activeTab === "roleplay" && (
//           <p className="!py-3">🎭 Role Play content goes here...</p>
//         )}
//       </div>
//       <GetAssessments />
//     </div>
//   );
// };

// export default TabComponent;

import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProgressBar from "./ProgressBar";
import Video from "./Video";
import ChapterList from "../ChapterList";
import Quiz from "./Quiz";
import { div } from "framer-motion/client";
import GetAssessments from "./GetAssessments";

const TabComponent = ({
  courseName,
  chapterName,
  isChapterLoading,
  videoCourseLesson,
}) => {
  // Use search params for tab navigation
  const [searchParams, setSearchParams] = useSearchParams();
  const tabFromUrl = searchParams.get("tab");

  // Set initial state from URL or default to "video"
  const [activeTab, setActiveTab] = useState(tabFromUrl || "video");

  // Update both state and URL when tab changes
  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);
    setSearchParams({ tab: tabKey }, { replace: true });
  };

  // Update state if URL changes
  useEffect(() => {
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);

  // Add this function to your component to be passed to the Video component
  const switchToQuizTab = () => {
    handleTabClick("quiz");
  };

  const tabs = [
    { name: "Video", key: "video" },
    { name: "Quiz", key: "quiz" },
    { name: "Role Play", key: "roleplay" },
  ];
  // Add this to your TabComponent
  useEffect(() => {
    const handleUrlChange = (event) => {
      if (event.detail?.tab) {
        setActiveTab(event.detail.tab);
      }
    };

    document.addEventListener("urlParamChanged", handleUrlChange);
    return () => {
      document.removeEventListener("urlParamChanged", handleUrlChange);
    };
  }, []);

  return (
    <div>
      {/* Tabs */}
      <div className="flex lg:gap-7.5 gap-1.5 !pb-6 text-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => handleTabClick(tab.key)}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === tab.key
                ? "bg-white text-gray-800 !p-1 !px-3 rounded-2xl font-extrabold"
                : "text-gray-500"
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4">
        {activeTab === "video" && (
          <div>
            <Video
              courseName={courseName}
              chapterName={chapterName}
              isChapterLoading={isChapterLoading}
              videoCourseLesson={{
                ...videoCourseLesson,
                setActiveTab: switchToQuizTab,
              }}
            />
          </div>
        )}
        {activeTab === "quiz" && (
          <div>
            <Quiz
              activeTab={activeTab}
              onQuizComplete={() => {
                handleTabClick("video");
              }}
            />
          </div>
        )}

        {activeTab === "roleplay" && (
          <p className="!py-3">🎭 Role Play content goes here...</p>
        )}
      </div>
    </div>
  );
};

export default TabComponent;
