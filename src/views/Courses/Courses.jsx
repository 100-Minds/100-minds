import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Loader2 from "../../components/Loaders/Loader2";
import NavHeader from "../../layouts/NavHeader";
import OngoingCard from "../../components/ongoing cards/OngoingCard";
import ProgressBar from "./components/ProgressBar";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

// Importing Learning Modules Images
import difficult from "../../assets/img/dashboards/ongoing/difficult.png";
import icondifficult from "../../assets/img/dashboards/ongoing/difficult-icon.png";
import active from "../../assets/img/dashboards/ongoing/active.png";
import iconactive from "../../assets/img/dashboards/ongoing/difficult-icon.png";
import giving from "../../assets/img/dashboards/ongoing/giving.png";
import icongiving from "../../assets/img/dashboards/ongoing/giving icon.png";
import manage from "../../assets/img/dashboards/ongoing/managing.png";
import iconmanage from "../../assets/img/dashboards/ongoing/manging icon.png";

const Courses = () => {
  const { loading, courses } = useAuth();
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 8;

  const segments = [
    { percentage: 20, color: "#FCECA8" },
    { percentage: 30, color: "#34D399" },
    { percentage: 20, color: "#60A5FA" },
    { percentage: 50, color: "#F87171" },
  ];

  const learningActivities = [
    { img: difficult, icon: icondifficult },
    { img: active, icon: iconactive },
    { img: giving, icon: icongiving },
    { img: manage, icon: iconmanage },
  ];

  // Ensure courses exist before slicing
  const totalCourses = courses?.data?.length || 0;
  const totalPages = Math.ceil(totalCourses / coursesPerPage);

  // Slice courses for the current page
  const paginatedCourses =
    totalCourses > coursesPerPage
      ? courses?.data?.slice(
          (currentPage - 1) * coursesPerPage,
          currentPage * coursesPerPage
        )
      : courses?.data;

  return (
    <div className="h-full w-full overflow-hidden !py-4 scrollbar-hide no-scrollbar">
      <div className="bg-[#F3F3F3] overflow-scroll h-full rounded-3xl !mx-3 !px-6 !pb-12">
        {loading ? (
          <Loader2 />
        ) : (
          <>
            <div className="backdrop-blur-xs !py-4 lg:!px-10 sticky top-0 z-40">
              <NavHeader header={"Courses"} />
            </div>
            <div
              className={`!mt-4 gap-4 scrollbar-hide  ${
                isHomePage
                  ? "flex overflow-x-auto snap-x snap-mandatory scroll-smooth"
                  : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-y-16 "
              } `}
            >
              {paginatedCourses?.length > 0 ? (
                paginatedCourses?.map((course, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="min-w-[80%] md:min-w-0 snap-start md:h-88 "
                  >
                    <OngoingCard
                      img={
                        learningActivities[index % learningActivities.length]
                          .img
                      }
                      icon={
                        learningActivities[index % learningActivities.length]
                          .icon
                      }
                      icontext1={course.name || "Unknown"}
                      textsty={"text-sm"}
                      courseId={course.id}
                    />
                  </motion.div>
                ))
              ) : (
                <div className="flex justify-center items-center w-full">
                  <p>No Courses Available</p>
                </div>
              )}
            </div>

            {/* Conditional Pagination Controls */}
            {totalCourses > coursesPerPage && (
              <div className="flex items-center justify-center !mt-16 gap-4 text-sm font-nueue">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`!px-4 !py-2 rounded-full ${
                    currentPage === 1
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-green-tint text-white"
                  }`}
                >
                  Previous
                </button>
                <span className="text-sm font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className={`!px-4 !py-2 rounded-full ${
                    currentPage === totalPages
                      ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                      : "bg-green-tint text-white transition hover:scale-105 hover:opacity-85"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Courses;
