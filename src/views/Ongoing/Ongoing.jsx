import NavHeader from "../../layouts/NavHeader";
import OngoingActivities from "../dashboard/components/OngoingActivities";

const Ongoing = () => {
  return (
    <div className="h-full w-full overflow-hidden   !py-7 ">
      <div className="bg-[#F3F3F3] overflow-scroll scroll-hide h-full rounded-3xl !mx-3 lg:!px-6 !px-4">
        <div className="backdrop-blur-xs !py-4  sticky top-0 z-40">
          <NavHeader header={"ONGOING"} />
        </div>

        <OngoingActivities />
      </div>
    </div>
  );
};

export default Ongoing;
