import Search from "../../dashboard/components/Search";
import RolePlayCards from "./RolePlayCards";
import difficultbg from "../../../assets/img/dashboards/rolePlay/difficult-bg.png";
import difficult from "../../../assets/img/dashboards/rolePlay/difficult-convo.png";
import difficulticon from "../../../assets/img/dashboards/rolePlay/music.svg";
import activebg from "../../../assets/img/dashboards/rolePlay/active-bg.png";
import active from "../../../assets/img/dashboards/rolePlay/active-listen.png";
import activeicon from "../../../assets/img/dashboards/rolePlay/chat.svg";

import givingbg from "../../../assets/img/dashboards/rolePlay/giving-bg.png";
import giving from "../../../assets/img/dashboards/rolePlay/giving.png";
import givingicon from "../../../assets/img/dashboards/rolePlay/giving-icon.svg";
import NavHeader from "../../../layouts/NavHeader";

const RolePlay = () => {
  return (
    <div className="h-full w-full overflow-hidden   !pt-4 ">
      <div className="bg-[#F3F3F3] overflow-scroll scroll-hide h-full rounded-3xl !mx-3">
        <div className="backdrop-blur-xs !py-4 !px-10 sticky top-0 z-40">
          <NavHeader header={"ROLE PLAY"} />
        </div>

        <div className="lg:!px-6 px-4  h-full  bg-[#F3F3F3] rounded-xl   ">
          <div className="grid lg:grid-cols-3 gap-5 !py-8">
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
              btnStyle="text-tint-orange text-xs font-bold"
              shadowStyle="shadow-2xl shadow-tint-orange  font-bold"
              override="!mx-4"
              smallTxt="!text-[10px]"
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
              btnStyle="text-shade-green text-xs font-bold "
              shadowStyle="shadow-2xl shadow-shade-green   font-bold"
              override="!mx-4"
              smallTxt="!text-[10px]"
            />

            <RolePlayCards
              bgImg={giving}
              colorBg={givingbg}
              icon={givingicon}
              text1={"Giving"}
              text2={"feedback"}
              time={"47:52"}
              chapter={6}
              btntext={"Get Started"}
              polygon={"polygon-3"}
              btnStyle="text-shade-purple  text-xs font-bold "
              shadowStyle="shadow-2xl shadow-shade-purple   font-bold"
              override="!mx-4"
              smallTxt="!text-[10px]"
            />

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
              btnStyle="text-tint-orange text-xs font-bold"
              shadowStyle="shadow-2xl shadow-tint-orange  font-bold"
              override="!mx-4"
              smallTxt="!text-[10px]"
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
              btnStyle="text-shade-green text-xs font-bold "
              shadowStyle="shadow-2xl shadow-shade-green   font-bold"
              override="!mx-4"
              smallTxt="!text-[10px]"
            />

            <RolePlayCards
              bgImg={giving}
              colorBg={givingbg}
              icon={givingicon}
              text1={"Giving"}
              text2={"feedback"}
              time={"47:52"}
              chapter={6}
              btntext={"Get Started"}
              polygon={"polygon-3"}
              btnStyle="text-shade-purple  text-xs font-bold "
              shadowStyle="shadow-2xl shadow-shade-purple   font-bold"
              override="!mx-4"
              smallTxt="!text-[10px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolePlay;
