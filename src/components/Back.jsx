import React from "react";
import { RiArrowLeftSLine } from "react-icons/ri";
import { Link } from "react-router-dom";

const Back = ({ route }) => {
  return (
    <Link
      to={route}
      className="inline-flex items-center justify-center font-bebas text-sm bg-white  rounded-2xl !p-1 !px-3 !mb-6"
    >
      <RiArrowLeftSLine /> BACK
    </Link>
  );
};

export default Back;
