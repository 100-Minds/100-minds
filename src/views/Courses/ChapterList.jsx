import React from "react";
import ChapterCard from "./components/ChapterCard";
import profile from "../../assets/img/dashboards/profile-image.jpg";
import NavHeader from "../../layouts/NavHeader";
import { PiClock } from "react-icons/pi";
import { Link } from "react-router-dom";
import { RiArrowLeftLine, RiArrowLeftSLine } from "react-icons/ri";
import TabComponent from "./components/TabComponent";
import Back from "../../components/Back";

const ChapterList = () => {
  const chapters = [
    { imgSrc: profile, chapter: 1, time: "34:55", progress: 60 },
    { imgSrc: profile, chapter: 2, time: "30:20", progress: 40 },
    { imgSrc: profile, chapter: 3, time: "28:10", progress: 80 },
    { imgSrc: profile, chapter: 4, time: "45:00", progress: 20 },
  ];

  return (
    <div className="h-full w-full overflow-hidden   !pt-4 ">
      <div className="bg-[#F3F3F3] overflow-scroll scroll-hide h-full rounded-3xl !mx-3">
        <div className="backdrop-blur-xs !py-4 lg:!px-10 px-4 sticky top-0 z-40">
          <NavHeader header={"DIFFICULT CONVERSATIONS"} />

          <div className="grid lg:grid-cols-5 gap-10 !py-8">
            <h1 className="font-bebas text-2xl  text-nowrap lg:hidden">
              DIFFICULT CONVERSATIONS
            </h1>
            <div className="lg:col-span-3  col-span-5">
              <Back route={"/"} />

              <TabComponent />
            </div>
            <div className="lg:col-span-2 col-span-5">
              <h3 className="font-bebas text-2xl flex items-center gap-2.5 !pb-3">
                CHAPTERS{" "}
                <span className="bg-white !p-1 !px-2 rounded-xl text-lg">
                  6
                </span>
              </h3>
              <div className="space-y-4 bg-white !p-5 rounded-2xl ">
                {chapters.map((item, index) => (
                  <ChapterCard key={index} {...item} />
                ))}
                {/* Total Time Display */}
                <div className="flex justify-between font-nueue font-bold text-lg !my-4 !mt-8">
                  Total Time:{" "}
                  <span className="text-grey-tint flex items-center gap-1 text-sm">
                    <PiClock /> 54:32 Mins
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterList;
