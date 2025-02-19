import { PiBell, PiMagnifyingGlass } from "react-icons/pi";

import OngoingActivities from "../views/dashboard/components/OngoingActivities";
import DashboardCard from "../views/dashboard/components/DashboardCard";
import RolePlaySection from "../views/dashboard/components/RolePlaySection";
import LearningModule from "../components/Learning Modules/LearningModule";
import Search from "../views/dashboard/components/Search";

const MainContent = () => {
  return (
    <div className=" !px-5 !lg:px-10 !py-7 h-full  overflow-scroll ">
      <h1 className="font-bebas text-3xl  md:hidden">dashboard</h1>
      {/* Mobile maincontent menu */}
      <section className="w-full !pt-7 !pb-14">
        <DashboardCard />
      </section>
      <OngoingActivities />
      <RolePlaySection />
      <LearningModule />
    </div>
  );
};

export default MainContent;
