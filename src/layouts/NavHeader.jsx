import React, { useState } from "react";
import PropTypes from "prop-types";
import Search from "../views/dashboard/components/Search";
import logo from "../assets/img/dashboards/LOGO.svg";
import { PiBell, PiSquaresFour } from "react-icons/pi";
import SideBar from "./SideBar";
import { useSidebar } from "../context/SidebarContex";

const NavHeader = ({ header }) => {
  const { toggleSidebar } = useSidebar();
  return (
    <header>
      <div className="flex justify-between items-center md:hidden !py-6">
        <div className="">
          <img src={logo} alt="" />
        </div>
        <div className="flex gap-2.5">
          <div className="!p-3  bg-white   rounded-[15px]  md:hidden">
            <PiBell size={20} />
          </div>
          <div
            className="!p-3  bg-white   rounded-[15px]  md:hidden"
            onClick={toggleSidebar}
          >
            <PiSquaresFour size={20} />
          </div>

          {/* {isOpen && <SideBar />} */}
        </div>
      </div>
      <nav className="flex flex-col-reverse gap-5 lg:flex-row lg:flex lg:justify-between lg:items-center ">
        <h1 className="font-bebas text-5xl hidden lg:block">{header}</h1>
        <Search />
      </nav>
    </header>
  );
};
NavHeader.propTypes = {
  header: PropTypes.shape,
};
export default NavHeader;
