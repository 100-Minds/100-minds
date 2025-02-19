import React from "react";
import { PiClock } from "react-icons/pi";
import { Link } from "react-router-dom";

const RolePlayCards = ({
  bgImg,
  icon,
  shadowStyle = "",
  text1,
  text2,
  time,
  chapter,
  btntext,
  btnStyle = " ",
  override = " ",
  smallTxt = "",
  polygon,
}) => {
  return (
    <div
      className={` w-full h-96 rounded-2xl  font-nueue relative min-w-[90%] lg:min-w-0 snap-start ${shadowStyle} `}
    >
      <div className="h-full w-full">
        <img
          src={bgImg}
          alt=""
          className="w-full h-full object-cover rounded-2xl "
        />
      </div>
      <div
        className={`w-full  absolute bottom-0 lg:h-[220px] h-[180px] rounded-2xl z-0 flex flex-col justify-end ${polygon}`}
      >
        <div className={`relative z-10  !my-8  ${override} `}>
          <div className="flex items-end gap-3.5 !mb-4">
            <div className="w-18 h-18 ">
              <img
                src={icon}
                alt=""
                className="w-full h-full !p-2 bg-black rounded-2xl custom-shadow"
              />
            </div>
            <p className="text-md text-white font-extrabold z-10">
              {text1} <br /> {text2}
            </p>
          </div>
          <div className="flex justify-between items-center text-nowrap">
            <div className={`flex gap-3.5 items-center text-white ${smallTxt}`}>
              <span className="flex gap-1.5 items-center bg-[#0000001F]  !p-2 !px-3 rounded-2xl">
                <PiClock size={14} className="font-bold" /> {time} Mins
              </span>
              <span className="flex gap-1.5 items-center bg-[#0000001F] !p-2 !px-3 rounded-2xl">
                <PiClock size={14} className="font-bold" /> {chapter} Chapters
              </span>
            </div>
            <Link
              className={`bg-white  !p-2 !px-4 text-nowrap rounded-4xl  ${btnStyle}`}
            >
              {btntext}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RolePlayCards;
