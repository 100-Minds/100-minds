import React from "react";
import { Link } from "react-router-dom";

const OngoingCard = ({
  img,
  icon,
  icontext1,
  icontext2,
  progress,
  progressText,
  btn,
}) => {
  return (
    <div className="!p-2 !pb-8 bg-white font-nueue rounded-xl min-w-[85%] md:min-w-0 snap-start">
      <div className="rounded-xl w-full h-2/3  ">
        <img
          src={img}
          alt=""
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex gap-1 !my-2">
        <img src={icon} alt="icon" className="w-8 h-8" />
        <div className="text-xs">
          <p>{icontext1}</p>
          <p>{icontext2}</p>
        </div>
      </div>
      <div className="flex justify-between items-center gap-4">
        <div className=" w-full">{progress}</div>
        <p className="font-bebas text-nowrap bg-white text-[10px] !p-0.5 !px-1 rounded-lg border  -translate-y-1 border-gray-200">
          {progressText}
        </p>
      </div>
      <Link
        to={"/courses"}
        className="text-white bg-green-tint w-full block text-center rounded-3xl !py-3 text-sm  box-shadow !mt-3 hover:scale-[1.02] transition"
      >
        Continue Course
      </Link>
    </div>
  );
};

export default OngoingCard;
