import React from "react";
import loader from "../../assets/img/dashboards/loader.gif";

const Loader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center ">
      <div className="w-full h-screen  flex justify-center items-center ">
        <img src={loader} alt="" className="w-30 h-30 object-contain " />
      </div>
    </div>
  );
};

export default Loader;
