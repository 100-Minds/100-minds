// import NavHeader from "../../../layouts/NavHeader";
// import { useAuth } from "../../../context/AuthContext";
// import { useEffect, useState } from "react";

// import RolePlayJourneyCards from "./RolePlayJourneyCards";
// import Loader2 from "../../../components/Loaders/Loader2";

// const ITEMS_PER_PAGE = 6; // Maximum number of items per page
// const RolePlay = () => {
//   const [journeyCourse, setJourneyCourse] = useState([]);
//   const { getLearningJourneyCourses, loading } = useAuth();
//   const [currentPage, setCurrentPage] = useState(1);
//   useEffect(() => {
//     const fetchJourneyCourses = async () => {
//       try {
//         const data = await getLearningJourneyCourses(); // Fetch profile data
//         setJourneyCourse(data.data || []); // Store it in state
//         console.log("object");
//         console.log(journeyCourse);
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       }
//     };

//     fetchJourneyCourses();
//   }, []);

//   // Calculate pagination details
//   const totalPages = Math.ceil(journeyCourse.length / ITEMS_PER_PAGE);
//   const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
//   const currentItems = journeyCourse.slice(
//     startIndex,
//     startIndex + ITEMS_PER_PAGE
//   );

//   // Pagination Handlers
//   const nextPage = () =>
//     setCurrentPage((prev) => Math.min(prev + 1, totalPages));
//   const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
//   return (
//     <div className="h-full w-full overflow-hidden !py-4 ">
//       <div className="bg-[#F3F3F3] overflow-scroll scroll-hide h-full rounded-3xl !mx-3">
//         {loading ? (
//           <div className="flex justify-center items-center h-full">
//             <Loader2 />
//           </div>
//         ) : (
//           <>
//             <div className="backdrop-blur-xs !py-4 !px-10 sticky top-0 z-40">
//               <NavHeader header={"LEARNING JOURNEY"} />
//             </div>
//             <div className="flex lg:grid lg:grid-cols-3 gap-[20px] overflow-x-auto lg:overflow-visible snap-x snap-mandatory scroll-smooth scrollbar-hide !px-10 ">
//               {journeyCourse?.length > 0 ? (
//                 journeyCourse?.map((module, index) => (
//                   <RolePlayJourneyCards
//                     key={module.courseId}
//                     // bgModule={index % 2 === 0 ? "bg-green-tint" : "bg-green-500"}
//                     bgModule="learning-module-1"
//                     title={module.courseName}
//                     courseId={module.courseId}
//                     courseName={module.courseName}
//                     para1={"Whether you’re using our API or"}
//                     para2={"plugin, we’re here to help you every"}
//                     para3={"step of the way"}
//                     description={
//                       module.chapters.length > 0
//                         ? module.chapters[0].chapterName
//                         : "No chapters available"
//                     }
//                   />
//                 ))
//               ) : (
//                 <p>No modules available.</p>
//               )}
//             </div>
//             {/* Pagination Controls */}
//             {totalPages > 1 && (
//               <div className="flex justify-center items-center gap-4 !my-6">
//                 <button
//                   onClick={prevPage}
//                   disabled={currentPage === 1}
//                   className={`!px-4 !py-2 rounded-full ${
//                     currentPage === 1
//                       ? "bg-gray-300 cursor-not-allowed"
//                       : "bg-green-tint text-white hover:opacity-85"
//                   } transition duration-300`}
//                 >
//                   Prev
//                 </button>

//                 <div className="flex gap-2">
//                   {Array.from({ length: totalPages }, (_, index) => (
//                     <button
//                       key={index + 1}
//                       onClick={() => setCurrentPage(index + 1)}
//                       className={`w-8 h-8 flex items-center justify-center rounded-full ${
//                         currentPage === index + 1
//                           ? "bg-green-tint text-white"
//                           : "bg-gray-300 hover:bg-gray-400"
//                       } transition duration-300`}
//                     >
//                       {index + 1}
//                     </button>
//                   ))}
//                 </div>

//                 <button
//                   onClick={nextPage}
//                   disabled={currentPage === totalPages}
//                   className={`!px-4 !py-2 rounded-full ${
//                     currentPage === totalPages
//                       ? "bg-gray-300 cursor-not-allowed"
//                       : "bg-green-tint text-white hover:opacity-85"
//                   } transition duration-300`}
//                 >
//                   Next
//                 </button>
//               </div>
//             )}
//           </>
//         )}
//       </div>
//     </div>
//   );
// };

// export default RolePlay;
import NavHeader from "../../../layouts/NavHeader";
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";
import { motion } from "framer-motion"; // Import framer-motion
import RolePlayJourneyCards from "./RolePlayJourneyCards";
import Loader2 from "../../../components/Loaders/Loader2";

const ITEMS_PER_PAGE = 6;

const RolePlay = () => {
  const [journeyCourse, setJourneyCourse] = useState([]);
  const { getLearningJourneyCourses, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchJourneyCourses = async () => {
      try {
        const data = await getLearningJourneyCourses();
        setJourneyCourse(data.data || []);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchJourneyCourses();
  }, []);

  // Pagination Logic
  const totalPages = Math.ceil(journeyCourse.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = journeyCourse.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );
  console.log("current journey", currentItems);
  // Pagination Handlers
  const nextPage = () =>
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Page Load Animation
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full w-full overflow-hidden !py-4"
    >
      <div className="bg-[#F3F3F3] overflow-scroll scroll-hide h-full rounded-3xl !mx-3">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 />
          </div>
        ) : (
          <>
            <div className="backdrop-blur-xs !py-4 !px-10 sticky top-0 z-40">
              <NavHeader header={"LEARNING JOURNEY"} />
            </div>

            {/* Cards Section with Animations */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { staggerChildren: 0.4 },
                },
              }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] !px-10 transition"
            >
              {currentItems.length > 0 ? (
                currentItems.map((module, index) => (
                  <motion.div
                    key={module.courseId}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.3 },
                      },
                    }}
                  >
                    <RolePlayJourneyCards
                      bgModule="learning-module-1"
                      title={module.courseName}
                      courseId={module.courseId}
                      courseName={module.courseName}
                      para1={"Whether you’re using our API or"}
                      para2={"plugin, we’re here to help you every"}
                      para3={"step of the way"}
                      description={
                        module.chapters.length > 0
                          ? module.chapters[0].chapterName
                          : "No chapters available"
                      }
                    />
                  </motion.div>
                ))
              ) : (
                <p>No modules available.</p>
              )}
            </motion.div>

            {/* Pagination Controls with Animation */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 !my-6">
                <motion.button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`!px-4 !py-2 rounded-full transition duration-300 ${
                    currentPage === 1
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-green-tint text-white hover:opacity-85"
                  }`}
                >
                  Prev
                </motion.button>

                <div className="flex gap-2">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <motion.button
                      key={index + 1}
                      onClick={() => setCurrentPage(index + 1)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-8 h-8 flex items-center justify-center rounded-full transition duration-300 ${
                        currentPage === index + 1
                          ? "bg-green-tint text-white"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    >
                      {index + 1}
                    </motion.button>
                  ))}
                </div>

                <motion.button
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className={`!px-4 !py-2 rounded-full transition duration-300 ${
                    currentPage === totalPages
                      ? "bg-gray-300 cursor-not-allowed"
                      : "bg-green-tint text-white hover:opacity-85"
                  }`}
                >
                  Next
                </motion.button>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default RolePlay;
