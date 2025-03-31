import React from "react";
import { useAuth } from "../../context/AuthContext";
import Loader2 from "../../components/Loaders/Loader2";
import NavHeader from "../../layouts/NavHeader";
import RolePlayJourneyCards from "../Role-play/components/RolePlayJourneyCards";

const PowerskillPage = () => {
  const { loading, powerSkill } = useAuth();
  console.log(powerSkill);
  return (
    <div className="h-full w-full overflow-hidden !py-4 scrollbar-hide  no-scrollbar ">
      <div className="bg-[#F3F3F3] overflow-scroll scroll-hide h-full rounded-3xl !mx-3">
        {loading && (
          <div>
            <Loader2 />
          </div>
        )}
        <div className="backdrop-blur-xs !py-4 !px-10 sticky top-0 z-40">
          <NavHeader header={"POWER SKILLS"} />
        </div>
        <div className="flex md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 !mt-4 gap-4 gap-y-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-smooth scrollbar-hide !px-10">
          {powerSkill ? (
            powerSkill?.data.map((power, index) => (
              <RolePlayJourneyCards
                key={power.courseId}
                // bgpower={index % 2 === 0 ? "bg-blue-500" : "bg-green-500"}
                bgModule="learning-module-1"
                title={"hjhg"}
                courseId={power.courseId}
                courseName={power.powerskill}
              />
            ))
          ) : (
            <p>No Power skills available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PowerskillPage;
