// // // Importing Learning Modules Images
import difficult from "../../../assets/img/dashboards/ongoing/difficult.png";
import icondifficult from "../../../assets/img/dashboards/ongoing/difficult-icon.png";
import active from "../../../assets/img/dashboards/ongoing/active.png";
import iconactive from "../../../assets/img/dashboards/ongoing/difficult-icon.png";
import giving from "../../../assets/img/dashboards/ongoing/giving.png";
import icongiving from "../../../assets/img/dashboards/ongoing/giving icon.png";
import manage from "../../../assets/img/dashboards/ongoing/managing.png";
import iconmanage from "../../../assets/img/dashboards/ongoing/manging icon.png";

// // Importing Role Play Images
import role1 from "../../../assets/img/dashboards/learningModules/module-purple.svg";
import roleicon1 from "../../../assets/img/dashboards/ongoing/difficult-icon.png";
import role2 from "../../../assets/img/dashboards/learningModules/module-purple.svg";
import roleicon2 from "../../../assets/img/dashboards/ongoing/difficult-icon.png";
import role3 from "../../../assets/img/dashboards/learningModules/module-purple.svg";
import roleicon3 from "../../../assets/img/dashboards/ongoing/difficult-icon.png";
import role4 from "../../../assets/img/dashboards/learningModules/module-purple.svg";
import roleicon4 from "../../../assets/img/dashboards/ongoing/difficult-icon.png";

// import React, { useEffect, useState } from "react";
// import PropTypes from "prop-types";
// import { motion, AnimatePresence } from "framer-motion";
// import OngoingCard from "../../../components/ongoing cards/OngoingCard";
// import ProgressBar from "./ProgressBar";
// import { useAuth } from "../../../context/AuthContext";
// import Loader2 from "../../../components/Loaders/Loader2";
// import { useLocation } from "react-router-dom";

// const OngoingActivities = ({ limit }) => {
//   const [activeTab, setActiveTab] = useState("learning");
//   const { ongoing, getOngoingUser, loading } = useAuth();
//   const user = JSON.parse(sessionStorage.getItem("loggedInUser"));
//   const location = useLocation();
//   const isHomePage = location.pathname === "/";

//   useEffect(() => {
//     if (user?.id) {
//       getOngoingUser().catch((error) =>
//         console.error("Error fetching profile:", error)
//       );
//     }
//   }, []);

//   if (loading) return <Loader2 />;

//   // const ongoingModules = ongoing?.data?.[0]?.courses || []; //getting just one module
//   const ongoingModules =
//     ongoing?.data?.flatMap((item) => item.courses || []) || [];
//   const rolePlayModules = ongoingModules.flatMap(
//     (module) => module.chapters || []
//   );

//   console.log("ongoing modules mod", ongoingModules);
//   const allChapters = ongoingModules.flatMap((module) =>
//     (module.chapters || []).map((chapter) => ({
//       ...chapter,
//       courseName: module.courseName,
//       courseId: module.courseId,
//     }))
//   );
//   console.log("all chapters", allChapters);
//   const completedChapters = allChapters.filter(
//     (status) => status.status === "completed"
//   );
//   console.log("complete", completedChapters);
//   const imageCycle = [difficult, active, giving, manage];
//   const roleImageCycle = [role1, role2, role3, role4];
//   const roleIcons = [roleicon1, roleicon2, roleicon3, roleicon4];

//   const getActivityData = (modules, isRolePlay) => {
//     return modules.map((module, index) => ({
//       img: isRolePlay
//         ? roleImageCycle[index % roleImageCycle.length]
//         : imageCycle[index % imageCycle.length],
//       icon: roleIcons[index % roleIcons.length] || "default-icon.png",
//       icontext1: module.courseName || "Course",
//       icontext2: module.chapterNumber,
//       progress: (
//         <ProgressBar
//           segments={[{ percentage: module.progress || 0, color: "#34D399" }]}
//         />
//       ),
//       courseId: module.courseId,
//       lessonId: module.chapterId,
//       progressText: `${Math.round(
//         ((module.chapters?.filter((c) => c.status === "completed").length ||
//           0) /
//           (module.chapters?.length || 1)) *
//           100
//       )}% COMPLETE`,
//     }));
//   };

//   const activities =
//     activeTab === "learning"
//       ? getActivityData(completedChapters, false)
//       : getActivityData(rolePlayModules, true);

//   return (
//     <section>
//       {/* Tab Buttons */}
//       <div className="flex gap-4 !pt-4 font-nueue">
//         {["learning", "roleplay"].map((tab) => (
//           <motion.button
//             key={tab}
//             className={`font-bold !px-4 !py-1 rounded-3xl ${
//               activeTab === tab ? "text-black bg-white" : ""
//             }`}
//             onClick={() => setActiveTab(tab)}
//             whileTap={{ scale: 0.95 }}
//             whileHover={{ scale: 1.05 }}
//           >
//             {/* {tab === "learning" ? "Learning Modules" : "Role Play"} */}
//             {tab === "learning" ? "Learning Chapters" : "Role Play"}
//           </motion.button>
//         ))}
//       </div>

//       {/* Cards Container */}
//       <motion.div
//         key={activeTab}
//         initial={{ opacity: 0, y: 10 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -10 }}
//         transition={{ duration: 0.5 }}
//         className={`!mt-4 gap-4 scrollbar-hide ${
//           isHomePage
//             ? "lg:grid lg:grid-cols-4 flex overflow-x-auto snap-x snap-mandatory scroll-smooth"
//             : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
//         }`}
//       >
//         <AnimatePresence>
//           {activities.map((activity, index) => (
//             <motion.div
//               key={index}
//               initial={{ opacity: 0, scale: 0.9, y: 10 }}
//               animate={{ opacity: 1, scale: 1, y: 0 }}
//               exit={{ opacity: 0, scale: 0.9, y: -10 }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//               className="min-w-[80%] md:min-w-0 snap-start"
//             >
//               <OngoingCard
//                 img={activity.img}
//                 icon={activity.icon}
//                 icontext1={activity.icontext1}
//                 icontext2={activity.icontext2}
//                 progress={activity.progress}
//                 progressText={activity.progressText}
//                 courseId={activity.courseId}
//                 lessonId={activity.lessonId}
//               />
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </motion.div>
//     </section>
//   );
// };

// OngoingActivities.propTypes = {
//   limit: PropTypes.number,
// };

// OngoingActivities.defaultProps = {
//   limit: 4,
// };

// export default OngoingActivities;

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";
import OngoingCard from "../../../components/ongoing cards/OngoingCard";
import ProgressBar from "./ProgressBar";
import { useAuth } from "../../../context/AuthContext";
import Loader2 from "../../../components/Loaders/Loader2";
import { useLocation } from "react-router-dom";

const OngoingActivities = ({ limit }) => {
  const [activeTab, setActiveTab] = useState("learning");
  const { ongoing, getOngoingUser, loading } = useAuth();
  const user = JSON.parse(sessionStorage.getItem("loggedInUser"));
  const location = useLocation();
  const isHomePage = location.pathname === "/"; // Check if on homepage

  useEffect(() => {
    if (user?.id) {
      getOngoingUser().catch((error) =>
        console.error("Error fetching profile:", error)
      );
    }
  }, []);

  if (loading) return <Loader2 />;

  const ongoingModules =
    ongoing?.data?.flatMap((item) => item.courses || []) || [];
  const rolePlayModules = ongoingModules.flatMap(
    (module) => module.chapters || []
  );

  const allChapters = ongoingModules.flatMap((module) =>
    (module.chapters || []).map((chapter) => ({
      ...chapter,
      courseName: module.courseName,
      courseId: module.courseId,
    }))
  );

  const completedChapters = allChapters.filter(
    (status) => status.status === "completed"
  );

  const imageCycle = [difficult, active, giving, manage];
  const roleImageCycle = [role1, role2, role3, role4];
  const roleIcons = [roleicon1, roleicon2, roleicon3, roleicon4];

  const getActivityData = (modules, isRolePlay) => {
    return modules.map((module, index) => ({
      img: isRolePlay
        ? roleImageCycle[index % roleImageCycle.length]
        : imageCycle[index % imageCycle.length],
      icon: roleIcons[index % roleIcons.length] || "default-icon.png",
      icontext1: module.courseName || "Course",
      icontext2: module.chapterNumber,
      progress: (
        <ProgressBar
          segments={[{ percentage: module.progress || 0, color: "#34D399" }]}
        />
      ),
      courseId: module.courseId,
      lessonId: module.chapterId,
      progressText: `${Math.round(
        ((module.chapters?.filter((c) => c.status === "completed").length ||
          0) /
          (module.chapters?.length || 1)) *
          100
      )}% COMPLETE`,
    }));
  };

  // Determine which data to show based on the active tab
  const activities =
    activeTab === "learning"
      ? getActivityData(completedChapters, false)
      : getActivityData(rolePlayModules, true);

  // If on homepage, show only the last `limit` number of items, else show all
  const displayedActivities = isHomePage
    ? activities.slice(-limit)
    : activities;

  return (
    <section>
      {/* Tab Buttons */}
      <div className="flex gap-4 !pt-4 font-nueue">
        {["learning", "roleplay"].map((tab) => (
          <motion.button
            key={tab}
            className={`font-bold !px-4 !py-1 rounded-3xl ${
              activeTab === tab ? "text-black bg-white" : ""
            }`}
            onClick={() => setActiveTab(tab)}
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
          >
            {tab === "learning" ? "Learning Chapters" : "Role Play"}
          </motion.button>
        ))}
      </div>

      {/* Cards Container */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.5 }}
        className={`!mt-4 gap-4 scrollbar-hide ${
          isHomePage
            ? "lg:grid lg:grid-cols-4 flex overflow-x-auto snap-x snap-mandatory scroll-smooth"
            : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        }`}
      >
        <AnimatePresence>
          {displayedActivities.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="min-w-[80%] md:min-w-0 snap-start"
            >
              <OngoingCard
                img={activity.img}
                icon={activity.icon}
                icontext1={activity.icontext1}
                icontext2={activity.icontext2}
                progress={activity.progress}
                progressText={activity.progressText}
                courseId={activity.courseId}
                lessonId={activity.lessonId}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

OngoingActivities.propTypes = {
  limit: PropTypes.number,
};

OngoingActivities.defaultProps = {
  limit: 4,
};

export default OngoingActivities;
