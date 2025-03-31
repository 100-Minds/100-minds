// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios"; // If using axios for API calls
// import { useAuth } from "../../context/AuthContext";
// import Loader2 from "../../components/Loaders/Loader2";
// import NavHeader from "../../layouts/NavHeader";
// import Back from "../../components/Back";
// import RolePlayCards from "../Role-play/components/RolePlayCards";
// import difficultbg from "../../assets/img/dashboards/rolePlay/difficult-bg.png";
// import difficult from "../../assets/img/dashboards/rolePlay/difficult-convo.png";
// import difficulticon from "../../assets/img/dashboards/rolePlay/music.svg";
// import activebg from "../../assets/img/dashboards/rolePlay/active-bg.png";
// import active from "../../assets/img/dashboards/rolePlay/active-listen.png";
// import activeicon from "../../assets/img/dashboards/rolePlay/chat.svg";

// import givingbg from "../../assets/img/dashboards/rolePlay/giving-bg.png";
// import giving from "../../assets/img/dashboards/rolePlay/giving.png";
// import givingicon from "../../assets/img/dashboards/rolePlay/giving-icon.svg";

// const CourseLessons = () => {
//   const { courseId } = useParams(); // Get courseId from URL
//   const { loading, getCourseLessons, setCourseId } = useAuth();
//   const [lessons, setLessons] = useState(null);

//   useEffect(() => {
//     if (courseId) {
//       getCourseLessons(courseId).then((data) => {
//         console.log("Fetched Lessons:", data?.data); // Debugging
//         setLessons(data?.data || []); // Update local state safely
//       });
//     }
//   }, [courseId]);
//   console.log("Fetched Lessons:", lessons);
//   const imageConfigs = [
//     {
//       bgImg: difficult,
//       colorBg: difficultbg,
//       icon: difficulticon,
//       polygon: "polygon-1",
//       btnStyle: "text-tint-orange !text-[10px] font-bold",
//       shadowStyle: "shadow-2xl shadow-tint-orange font-bold",
//     },
//     {
//       bgImg: active,
//       colorBg: activebg,
//       icon: activeicon,
//       polygon: "polygon-2",
//       btnStyle: "text-shade-green text-xs font-bold",
//       shadowStyle: "shadow-2xl shadow-shade-green font-bold",
//     },
//     {
//       bgImg: giving,
//       colorBg: givingbg,
//       icon: givingicon,
//       polygon: "polygon-3",
//       btnStyle: "text-shade-purple text-xs font-bold",
//       shadowStyle: "shadow-2xl shadow-shade-purple font-bold",
//     },
//   ];
//   const handleStartLesson = (lesson, video) => {
//     console.log("Setting session storage for lesson:", lesson);
//     sessionStorage.setItem("currentLesson", JSON.stringify({ lesson, video }));
//   };

//   console.log("lez", lessons);
//   return (
//     <div className="h-full w-full overflow-hidden !py-4 scrollbar-hide  no-scrollbar ">
//       <div className="bg-[#F3F3F3] overflow-scroll scroll-hide h-full rounded-3xl !mx-3">
//         {loading && (
//           <div>
//             <Loader2 />
//           </div>
//         )}
//         <div className="backdrop-blur-xs !py-4 !px-10 sticky top-0 z-40">
//           <NavHeader header={"Courses Lessons"} />
//         </div>
//         <div className="!px-10">
//           <Back route={"/courses"} />
//         </div>
//         <div className="flex md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 !mt-4 gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-smooth scrollbar-hide !px-10">
//           {lessons ? (
//             lessons.map(
//               (
//                 course // Extract course object
//               ) =>
//                 course?.chapters.map((lesson, index) =>
//                   lesson.videos.map((video) => (
//                     <RolePlayCards
//                       key={video.id} // Use video ID as key
//                       bgImg={imageConfigs[index % imageConfigs.length].bgImg}
//                       icon={imageConfigs[index % imageConfigs.length].icon}
//                       shadowStyle={
//                         imageConfigs[index % imageConfigs.length].shadowStyle
//                       }
//                       text1={lesson.title}
//                       text2={lesson.description}
//                       time={video.duration} // Show video-specific duration
//                       chapter={` ${lesson.chapterNumber}`}
//                       btntext="Start Lesson"
//                       btnStyle={
//                         imageConfigs[index % imageConfigs.length].btnStyle
//                       }
//                       polygon={
//                         imageConfigs[index % imageConfigs.length].polygon
//                       }
//                       route={`/courses/${course.course.id}/lessons/${lesson.id}`}
//                       onClick={() => handleStartLesson(lesson, video)}
//                       override="!mx-2 text-sm"
//                       smallTxt="text-xs"
//                       textStyle={"w-60"}
//                     />
//                   ))
//                 )
//             )
//           ) : (
//             <p>No modules available.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseLessons;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion } from "framer-motion";
import Loader2 from "../../components/Loaders/Loader2";
import NavHeader from "../../layouts/NavHeader";
import Back from "../../components/Back";
import RolePlayCards from "../Role-play/components/RolePlayCards";

// Import Images
import difficultbg from "../../assets/img/dashboards/rolePlay/difficult-bg.png";
import difficult from "../../assets/img/dashboards/rolePlay/difficult-convo.png";
import difficulticon from "../../assets/img/dashboards/rolePlay/music.svg";
import activebg from "../../assets/img/dashboards/rolePlay/active-bg.png";
import active from "../../assets/img/dashboards/rolePlay/active-listen.png";
import activeicon from "../../assets/img/dashboards/rolePlay/chat.svg";
import givingbg from "../../assets/img/dashboards/rolePlay/giving-bg.png";
import giving from "../../assets/img/dashboards/rolePlay/giving.png";
import givingicon from "../../assets/img/dashboards/rolePlay/giving-icon.svg";

const CourseLessons = () => {
  const { courseId } = useParams();
  const { loading, getCourseLessons } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Ensure full loading state

  useEffect(() => {
    if (courseId) {
      getCourseLessons(courseId).then((data) => {
        setLessons(data?.data || []);
        setIsLoading(false); // Mark as loaded
      });
    }
  }, [courseId]);

  const imageConfigs = [
    {
      bgImg: difficult,
      colorBg: difficultbg,
      icon: difficulticon,
      polygon: "polygon-1",
      btnStyle: "text-tint-orange !text-[10px] font-bold",
      shadowStyle: "shadow-2xl shadow-tint-orange font-bold",
    },
    {
      bgImg: active,
      colorBg: activebg,
      icon: activeicon,
      polygon: "polygon-2",
      btnStyle: "text-shade-green !text-[10px] font-bold",
      shadowStyle: "shadow-2xl shadow-shade-green font-bold",
    },
    {
      bgImg: giving,
      colorBg: givingbg,
      icon: givingicon,
      polygon: "polygon-3",
      btnStyle: "text-shade-purple !text-[10px] font-bold",
      shadowStyle: "shadow-2xl shadow-shade-purple font-bold",
    },
  ];

  const handleStartLesson = (lesson, video) => {
    sessionStorage.setItem("currentLesson", JSON.stringify({ lesson, video }));
  };

  return (
    <div className="h-full w-full overflow-hidden !py-4 scrollbar-hide no-scrollbar">
      <div className="bg-[#F3F3F3] overflow-scroll h-full rounded-3xl !mx-3  !pb-12">
        {/* Show Loader Until Data is Fully Loaded */}
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Loader2 />
          </div>
        ) : (
          <>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="backdrop-blur-xs !py-4  lg:!px-10 sticky top-0 z-40"
            >
              <NavHeader header={"Course Lessons"} />
            </motion.div>

            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="lg:!px-10"
            >
              <Back route={"/courses"} />
            </motion.div>

            {/* Lessons List */}
            <div className=" flex flex-col md:grid  md:grid-cols-2 lg:grid-cols-3 !mt-4  gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-smooth scrollbar-hide lg:!px-10">
              {lessons.length > 0 ? (
                lessons.map((course) =>
                  course.chapters.length > 0 ? (
                    course.chapters.map((lesson, index) =>
                      lesson.videos.map((video) => (
                        <motion.div
                          key={video.id}
                          initial={{ opacity: 0, scale: 0.9, y: 10 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className=" "
                        >
                          <RolePlayCards
                            bgImg={
                              imageConfigs[index % imageConfigs.length].bgImg
                            }
                            icon={
                              imageConfigs[index % imageConfigs.length].icon
                            }
                            shadowStyle={
                              imageConfigs[index % imageConfigs.length]
                                .shadowStyle
                            }
                            text1={lesson.title}
                            text2={lesson.description}
                            time={video.duration}
                            chapter={` ${lesson.chapterNumber}`}
                            btntext="Start Lesson"
                            btnStyle={
                              imageConfigs[index % imageConfigs.length].btnStyle
                            }
                            polygon={
                              imageConfigs[index % imageConfigs.length].polygon
                            }
                            route={`/courses/${course.course.id}/lessons/${lesson.id}`}
                            onClick={() => handleStartLesson(lesson, video)}
                            override="!mx-2 text-sm"
                            smallTxt="text-[10px]"
                            textStyle={"w-60"}
                          />
                        </motion.div>
                      ))
                    )
                  ) : (
                    <motion.div
                      key={course.course.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="flex justify-center items-center col-span-full !mt-10"
                    >
                      <p className="text-gray-500 text-lg font-semibold">
                        No Chapters Available
                      </p>
                    </motion.div>
                  )
                )
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex justify-center items-center col-span-full !mt-10"
                >
                  <p className="text-gray-500 text-lg font-semibold font-nueue">
                    No Chapters Available
                  </p>
                </motion.div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CourseLessons;
