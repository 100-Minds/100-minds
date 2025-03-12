import MainContent from "../../layouts/MainContent";
import NavHeader from "../../layouts/NavHeader";

const Index = () => {
  return (
    <div className=" w-full !py-4 !pr-4 h-screen ">
      <div className="h-full overflow-hidden scroll-hide  rounded-xl ">
        <div className="bg-[#F3F3F3] overflow-scroll scroll-hide h-full rounded-3xl !mx-3 no-scrollbar overscroll-none  ">
          <div className="!backdrop-blur-md !py-4 !px-5 !lg:px-10 sticky top-0 z-40 rounded-3xl">
            <NavHeader header={"DASHBOARD"} />
          </div>
          <div className="bg-[#F3F3F3] rounded-3xl ">
            <MainContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
