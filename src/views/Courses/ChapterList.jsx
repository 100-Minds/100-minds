import React from "react";
import ChapterCard from "./components/ChapterCard";
import profile from "../../assets/img/dashboards/profile-image.jpg";
import NavHeader from "../../layouts/NavHeader";
import TabComponent from "./components/TabComponent";
import Back from "../../components/Back";
import { useAuth } from "../../context/AuthContext";
import Loader2 from "../../components/Loaders/Loader2";

const ChapterList = () => {
  const { loading } = useAuth();
  return (
    <div className="h-full w-full overflow-hidden   !py-4 scroll-hide ">
      <div className="bg-[#F3F3F3] overflow-scroll scroll-hide h-full rounded-3xl !mx-3">
        {loading ? (
          <div>
            <Loader2 />
          </div>
        ) : (
          <div className="backdrop-blur-xs !py-4 lg:!px-10 px-4 sticky top-0 z-40">
            <NavHeader header={"DIFFICULT CONVERSATIONS"} />

            <div className=" gap-10 !py-8">
              <h1 className="font-bebas text-2xl  text-nowrap lg:hidden">
                DIFFICULT CONVERSATIONS
              </h1>
              <div className="lg:col-span-3  col-span-5">
                <Back route={"/courses"} />

                <TabComponent />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChapterList;
