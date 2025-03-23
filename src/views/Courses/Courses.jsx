import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Loader2 from "../../components/Loaders/Loader2";
import NavHeader from "../../layouts/NavHeader";
import { toast } from "sonner";
import OngoingCard from "../../components/ongoing cards/OngoingCard";
import ProgressBar from "./components/ProgressBar";
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

  // console.log("courses from courss", courses.data);
  const segments = [
    { percentage: 20, color: "#FCECA8" },
    { percentage: 30, color: "#34D399" },
    { percentage: 20, color: "#60A5FA" },
    { percentage: 50, color: "#F87171" },
  ];
  // Learning Modules Data
  const learningActivities = [
    {
      img: difficult,
      icon: icondifficult,
      icontext1: "Difficult",
      icontext2: "Conversations",
      progress: <ProgressBar segments={[segments[0]]} />,
      progressText: `${segments[0].percentage}% COMPLETE`,
    },
    {
      img: active,
      icon: iconactive,
      icontext1: "Active",
      icontext2: "Listening",
      progress: <ProgressBar segments={[segments[1]]} />,
      progressText: `${segments[1].percentage}% COMPLETE`,
    },
    {
      img: giving,
      icon: icongiving,
      icontext1: "Giving",
      icontext2: "Feedback",
      progress: <ProgressBar segments={[segments[2]]} />,
      progressText: `${segments[2].percentage}% COMPLETE`,
    },
    {
      img: giving,
      icon: icongiving,
      icontext1: "Giving",
      icontext2: "Feedback",
      progress: <ProgressBar segments={[segments[2]]} />,
      progressText: `${segments[2].percentage}% COMPLETE`,
    },
    {
      img: manage,
      icon: iconmanage,
      icontext1: "Managing",
      icontext2: "Situations",
      progress: <ProgressBar segments={[segments[3]]} />,
      progressText: `${segments[3].percentage}% COMPLETE`,
    },
  ];
  return (
    <div className="h-full w-full overflow-hidden !py-4 scrollbar-hide  no-scrollbar ">
      <div className="bg-[#F3F3F3] overflow-scroll scroll-hide h-full rounded-3xl !mx-3">
        {loading && (
          <div>
            <Loader2 />
          </div>
        )}
        <div className="backdrop-blur-xs !py-4 !px-10 sticky top-0 z-40">
          <NavHeader header={"Courses"} />
        </div>
        <div>
          {/* {courses.data ? (
            "theres data"
          ) : (
            <div className="flex justify-center items-center w-full">
              <p>No Courses Available</p>
            </div>
          )} */}
        </div>
        <div className="flex md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 !mt-4 gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-smooth scrollbar-hide !px-10">
          {courses?.data && courses.data.length > 0 ? (
            courses.data.map((course, index) => (
              <OngoingCard
                key={index}
                img={learningActivities[index]?.img || "default-image-path.png"}
                icon={
                  learningActivities[index]?.icon || "default-icon-path.png"
                }
                icontext1={course.name || "Unknown"}
                // icontext2={learningActivities[index]?.icontext2 || "Category"}

                className="min-w-[80%] md:min-w-0 snap-start h-88"
                textsty={"text-sm"}
                courseId={course.id}
              />
            ))
          ) : (
            <div className="flex justify-center items-center w-full">
              <p>No Courses Available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
