import React from "react";
import error from "../../assets/img/dashboards/error.svg";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className=" w-1/3">
        <img src={error} alt="" className="w-full" />
      </div>
      <Link
        to={"/"}
        className="bg-whitish !p-2 !px-8 text-green-tint rounded-xl hover:scale-105 transition"
      >
        Back
      </Link>
    </div>
  );
};

export default Error;
