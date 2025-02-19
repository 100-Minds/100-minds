import React from "react";
import RolePlayCards from "../../Role-play/components/RolePlayCards";
import difficultbg from "../../../assets/img/dashboards/rolePlay/difficult-bg.png";
import difficult from "../../../assets/img/dashboards/rolePlay/difficult-convo.png";
import difficulticon from "../../../assets/img/dashboards/rolePlay/difficult icon.svg";
import activebg from "../../../assets/img/dashboards/rolePlay/active-bg.png";
import active from "../../../assets/img/dashboards/rolePlay/active-listen.png";
import activeicon from "../../../assets/img/dashboards/rolePlay/active-icon.svg";

const RolePlaySection = () => {
  return (
    <div className="!py-20 ">
      <h1 className="font-bebas tracking-tight lg:text-5xl text-3xl !pb-5">
        ROLE PLAY
      </h1>
      {/* <div className="!py-4 grid  lg:grid-cols-2 gap-[20px]">
        <RolePlayCards
          bgImg={difficult}
          colorBg={difficultbg}
          icon={difficulticon}
          text1={"Difficult"}
          text2={"conversations"}
          className="bg-role-1 bg-red-400"
          time={"35:55"}
          chapter={6}
          btntext={"Get Started"}
          polygon={"polygon-1"}
          btnStyle="text-tint-orange  md:text-sm text-[10px]"
          shadowStyle="shadow-2xl shadow-tint-orange"
          override="md:!mx-10 mx-4"
          smallTxt="md:text-xs text-[10px]"
        />
        <RolePlayCards
          bgImg={active}
          colorBg={activebg}
          icon={activeicon}
          text1={"Active"}
          text2={"listening"}
          time={"35:55"}
          chapter={6}
          btntext={"Get Started"}
          polygon={"polygon-2"}
          btnStyle="text-shade-green md:text-sm text-[10px]"
          shadowStyle="shadow-2xl shadow-shade-green"
          override="md:!mx-10 mx-4"
          smallTxt="md:text-xs text-[10px]"
        />
      </div> */}

      <div className="flex lg:grid lg:grid-cols-2 gap-[20px] overflow-x-auto lg:overflow-visible snap-x snap-mandatory scroll-smooth scrollbar-hide">
        <RolePlayCards
          bgImg={difficult}
          colorBg={difficultbg}
          icon={difficulticon}
          text1={"Difficult"}
          text2={"conversations"}
          className="bg-role-1 bg-red-400"
          time={"35:55"}
          chapter={6}
          btntext={"Get Started"}
          polygon={"polygon-1"}
          btnStyle="text-tint-orange md:text-sm text-[10px]"
          shadowStyle="shadow-2xl shadow-tint-orange"
          override="md:!mx-10 mx-2"
          smallTxt="md:text-xs text-[9px]"
        />
        <RolePlayCards
          bgImg={active}
          colorBg={activebg}
          icon={activeicon}
          text1={"Active"}
          text2={"listening"}
          time={"35:55"}
          chapter={6}
          btntext={"Get Started"}
          polygon={"polygon-2"}
          btnStyle="text-shade-green md:text-sm text-[10px]"
          shadowStyle="shadow-2xl shadow-shade-green"
          override="md:!mx-10 mx-2"
          smallTxt="md:text-xs text-[9px]"
        />
      </div>
    </div>
  );
};

export default RolePlaySection;
