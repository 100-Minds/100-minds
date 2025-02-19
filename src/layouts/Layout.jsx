// import React from "react";

// const Layout = () => {
//   return <div></div>;
// };

// export default Layout;

// Layout.jsx

// import PropTypes from "prop-types";

import { Outlet } from "react-router-dom";

import SideBar from "./SideBar";
import NavHeader from "./NavHeader";

const Layout = () => {
  return (
    <div className="flex h-screen">
      <SideBar />

      <Outlet />
    </div>
  );
};

export default Layout;
