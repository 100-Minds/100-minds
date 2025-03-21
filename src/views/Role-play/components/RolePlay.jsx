// import Search from "../../dashboard/components/Search";
// import RolePlayCards from "./RolePlayCards";
// import difficultbg from "../../../assets/img/dashboards/rolePlay/difficult-bg.png";
// import difficult from "../../../assets/img/dashboards/rolePlay/difficult-convo.png";
// import difficulticon from "../../../assets/img/dashboards/rolePlay/music.svg";
// import activebg from "../../../assets/img/dashboards/rolePlay/active-bg.png";
// import active from "../../../assets/img/dashboards/rolePlay/active-listen.png";
// import activeicon from "../../../assets/img/dashboards/rolePlay/chat.svg";

// import givingbg from "../../../assets/img/dashboards/rolePlay/giving-bg.png";
// import giving from "../../../assets/img/dashboards/rolePlay/giving.png";
// import givingicon from "../../../assets/img/dashboards/rolePlay/giving-icon.svg";
import NavHeader from "../../../layouts/NavHeader";
import { useAuth } from "../../../context/AuthContext";
import { useEffect, useState } from "react";

import RolePlayJourneyCards from "./RolePlayJourneyCards";
import { div } from "framer-motion/client";
import Loader from "../../../components/Loaders/Loader";
import Loader2 from "../../../components/Loaders/Loader2";

const RolePlay = () => {
  const [journeyCourse, setJourneyCourse] = useState(null);
  const { getLearningJourneyCourses, loading } = useAuth();
  useEffect(() => {
    const fetchJourneyCourses = async () => {
      try {
        const data = await getLearningJourneyCourses(); // Fetch profile data
        setJourneyCourse(data.data); // Store it in state
        console.log("object");
        console.log(journeyCourse);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchJourneyCourses();
  }, []);

  return (
    <div className="h-full w-full overflow-hidden !py-4 ">
      <div className="bg-[#F3F3F3] overflow-scroll scroll-hide h-full rounded-3xl !mx-3">
        {loading && (
          <div>
            <Loader2 />
          </div>
        )}
        <div className="backdrop-blur-xs !py-4 !px-10 sticky top-0 z-40">
          <NavHeader header={"LEARNING JOURNEY"} />
        </div>

        <div className="flex lg:grid lg:grid-cols-3 gap-[20px] overflow-x-auto lg:overflow-visible snap-x snap-mandatory scroll-smooth scrollbar-hide !px-10 ">
          {journeyCourse?.length > 0 ? (
            journeyCourse?.map((module, index) => (
              <RolePlayJourneyCards
                key={module.courseId}
                // bgModule={index % 2 === 0 ? "bg-blue-500" : "bg-green-500"}
                bgModule="learning-module-1"
                title={module.courseName}
                courseId={module.courseId}
                courseName={module.courseName}
                description={
                  module.chapters.length > 0
                    ? module.chapters[0].chapterName
                    : "No chapters available"
                }
              />
            ))
          ) : (
            <p>No modules available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RolePlay;
