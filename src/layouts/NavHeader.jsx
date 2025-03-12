import React, { useState } from "react";
import PropTypes from "prop-types";
import Search from "../views/dashboard/components/Search";
import logo from "../assets/img/dashboards/100minds-logo.png";
import { PiBell, PiSquaresFour } from "react-icons/pi";
import SideBar from "./SideBar";
import { useSidebar } from "../context/SidebarContex";
import Notifications from "../components/Notifications/Notifications";

const NavHeader = ({ header }) => {
  const { toggleSidebar } = useSidebar();
  const [isOpen, setIsOpen] = useState(false);

  // Toggle modal visibility
  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);
  return (
    <header>
      <div className="flex justify-between items-center lg:hidden !py-6">
        <div className="">
          <img
            src={logo}
            alt=""
            className=" w-30 h-10 object-contain -translate-x-5 "
          />
        </div>
        <div className="flex gap-2.5">
          <div
            className="!p-3  bg-white   rounded-[15px]  md:hidden"
            onClick={toggleDropdown}
          >
            <PiBell size={20} />
          </div>
          <div
            className="!p-3  bg-white   rounded-[15px]  md:hidden"
            onClick={toggleSidebar}
          >
            <PiSquaresFour size={20} />
          </div>

          {/* {isOpen && <SideBar />} */}
          {isOpen && <Notifications closeDropdown={closeDropdown} />}
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
