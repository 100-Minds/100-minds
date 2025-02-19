import React from "react";
import NavHeader from "../../layouts/NavHeader";

const Ongoing = () => {
  return (
    <div className="h-full w-full overflow-hidden   !pt-4 ">
      <div className="bg-[#F3F3F3] overflow-scroll scroll-hide h-full rounded-3xl !mx-3">
        <div className="backdrop-blur-xs !py-4 !px-10 sticky top-0 z-40">
          <NavHeader header={"ONGOING"} />
        </div>
      </div>
    </div>
  );
};

export default Ongoing;
