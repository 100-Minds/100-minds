import OngoingActivities from "../views/dashboard/components/OngoingActivities";
import DashboardCard from "../views/dashboard/components/DashboardCard";
import RolePlaySection from "../views/dashboard/components/RolePlaySection";
import LearningModule from "../components/Learning Modules/LearningModule";

const MainContent = () => {
  return (
    <div className=" !px-5 !lg:px-10 !py-7 h-full  overflow-scroll scrollbar-hide ">
      <h1 className="font-bebas text-3xl  md:hidden">dashboard</h1>
      {/* Mobile maincontent menu */}
      <section className="w-full !pt-7 !pb-14">
        <DashboardCard />
      </section>
      <div>
        <h1 className=" text-3xl lg:text-5xl font-bebas">ONGOING ACTIVITIES</h1>
        <OngoingActivities limit={4} />
      </div>
      <RolePlaySection />
      <LearningModule />
    </div>
  );
};

export default MainContent;
