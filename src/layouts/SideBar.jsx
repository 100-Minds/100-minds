/* eslint-disable */

import React, { useState } from "react";
import logo from "../assets/img/dashboards/100minds-logo.png";
import { PiSquaresFour, PiX } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import dashboard from "../assets/img/dashboards/dashboard.svg";
import rolePlay from "../assets/img/dashboards/role play.svg";
import power from "../assets/img/dashboards/power.svg";
import ongoing from "../assets/img/dashboards/ongoing.svg";
import setting from "../assets/img/dashboards/settings.svg";
import support from "../assets/img/dashboards/support.svg";
import profile from "../assets/img/dashboards/sarah.png";
import { useSidebar } from "../context/SidebarContex";
import teams from "../assets/img/dashboards/teams/group-icon.svg";
import ProfileModal from "../components/ProfileModal";
import { AnimatePresence } from "framer-motion";
const SideBar = () => {
  const { isOpen, closeSidebar } = useSidebar();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeSidebarMenu = () => setIsSidebarOpen(false);
  return (
    <>
      {/* laptop screen */}
      {/* <div className="w-1/5  h-screen font-nueue hidden lg:block ">
        <div className="!py-6 !pb-9 ">
          <img src={logo} alt="" className=" w-48 h-18 object-contain " />
        </div>

        <div className="flex flex-col justify-between  h-7/9  ">
          <div>
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                `flex items-center gap-1 p-2 pl-4 !mb-2 text-apex_dashboard_blacktext ${
                  isActive
                    ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-sidebar-color"
                    : ""
                } ${isPending ? "text-apex_dashboard_blacktext" : ""}`
              }
            >
              {({ isActive }) => (
                <span
                  className={`w-full  items-center  gap-2 flex !mx-4 !p-2 rounded-lg ${
                    isActive ? "bg-whitish" : ""
                  }`}
                >
                  <img src={dashboard} alt="" /> Dashboard
                </span>
              )}
            </NavLink>

            <NavLink
              to="/role-play"
              className={({ isActive, isPending }) =>
                `flex items-center gap-1 p-2 pl-4 !mb-2 text-apex_dashboard_blacktext ${
                  isActive
                    ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-sidebar-color"
                    : ""
                } ${isPending ? "text-apex_dashboard_blacktext" : ""}`
              }
            >
              {({ isActive }) => (
                <span
                  className={`w-full  items-center  gap-2 flex !mx-4 !p-2 rounded-lg ${
                    isActive ? "bg-whitish" : ""
                  }`}
                >
                  <img src={rolePlay} alt="" /> Learning Modules
                </span>
              )}
            </NavLink>
            <NavLink
              to="/power"
              className={({ isActive, isPending }) =>
                `flex items-center gap-1 p-2 pl-4 !mb-2 text-apex_dashboard_blacktext ${
                  isActive
                    ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-sidebar-color"
                    : ""
                } ${isPending ? "text-apex_dashboard_blacktext" : ""}`
              }
            >
              {({ isActive }) => (
                <span
                  className={`w-full  items-center  gap-2 flex !mx-4 !p-2 rounded-lg ${
                    isActive ? "bg-whitish" : ""
                  }`}
                >
                  <img src={power} alt="" /> Role Play
                </span>
              )}
            </NavLink>
            <NavLink
              to="/ongoing"
              className={({ isActive, isPending }) =>
                `flex items-center gap-1 p-2 pl-4 !mb-2 text-apex_dashboard_blacktext ${
                  isActive
                    ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-sidebar-color"
                    : ""
                } ${isPending ? "text-apex_dashboard_blacktext" : ""}`
              }
            >
              {({ isActive }) => (
                <span
                  className={`w-full  items-center  gap-2 flex !mx-4 !p-2 rounded-lg ${
                    isActive ? "bg-whitish" : ""
                  }`}
                >
                  <img src={ongoing} alt="" /> Ongoing
                </span>
              )}
            </NavLink>
            <NavLink
              to="/teams"
              end={false}
              className={({ isActive, isPending }) =>
                `flex items-center gap-1 p-2 pl-4 !mb-2 text-apex_dashboard_blacktext ${
                  isActive
                    ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-sidebar-color"
                    : ""
                } ${isPending ? "text-apex_dashboard_blacktext" : ""}`
              }
              onClick={closeSidebar}
            >
              {({ isActive }) => (
                <span
                  className={`w-full items-center gap-2 flex !mx-4 !p-2 rounded-lg ${
                    isActive ? "bg-whitish" : ""
                  }`}
                >
                  <img src={teams} alt="" /> Teams
                </span>
              )}
            </NavLink>
          </div> 
          <div>
            <NavLink
              to="/settings"
              className={({ isActive, isPending }) =>
                `flex items-center gap-1 p-2 pl-4 text-apex_dashboard_blacktext ${
                  isActive
                    ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-sidebar-color"
                    : ""
                } ${isPending ? "text-apex_dashboard_blacktext" : ""}`
              }
            >
              {({ isActive }) => (
                <span
                  className={`w-full  items-center  gap-2 flex !mx-4 !p-2 rounded-lg ${
                    isActive ? "bg-whitish" : ""
                  }`}
                >
                  <img src={setting} alt="" /> Settings
                </span>
              )}
            </NavLink>

            <NavLink
              to="/support"
              className={({ isActive, isPending }) =>
                `flex items-center gap-1 p-2 pl-4 text-apex_dashboard_blacktext ${
                  isActive
                    ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-sidebar-color"
                    : ""
                } ${isPending ? "text-apex_dashboard_blacktext" : ""}`
              }
            >
              {({ isActive }) => (
                <span
                  className={`w-full  items-center  gap-2 flex !mx-4 !p-2 rounded-lg ${
                    isActive ? "bg-whitish" : ""
                  }`}
                >
                  <img src={dashboard} alt="" /> Support
                </span>
              )}
            </NavLink>
            <div
              className="flex items-center gap-2 bg-whitish rounded-xl !mx-4 !p-2 !px-3 !mt-4  cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <img src={profile} alt="" className="w-8 h-8 object-contain" />
              <div>
                <h3>Sara Adams</h3>
                <p className="text-xs">Saraadamas@gmail.com</p>
              </div>
            </div>
           
            <AnimatePresence>
              {isModalOpen && (
                <ProfileModal onClose={() => setIsModalOpen(false)} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div> */}

      <div className="w-1/5  h-screen font-nueue hidden  lg:flex flex-col justify-between  text-nowrap">
        <div className="!py-6 !pb-9 ">
          <img src={logo} alt="" className=" w-48 h-18 object-contain " />
        </div>

        <div>
          <NavLink
            to="/"
            className={({ isActive, isPending }) =>
              `flex items-center gap-1 p-2 pl-4 !mb-2 text-apex_dashboard_blacktext ${
                isActive
                  ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-sidebar-color"
                  : ""
              } ${isPending ? "text-apex_dashboard_blacktext" : ""}`
            }
          >
            {({ isActive }) => (
              <span
                className={`w-full  items-center  gap-2 flex !mx-4 !p-2 rounded-lg ${
                  isActive ? "bg-whitish" : ""
                }`}
              >
                <img src={dashboard} alt="" /> Dashboard
              </span>
            )}
          </NavLink>

          <NavLink
            to="/role-play"
            className={({ isActive, isPending }) =>
              `flex items-center gap-1 p-2 pl-4 !mb-2 text-apex_dashboard_blacktext ${
                isActive
                  ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-sidebar-color"
                  : ""
              } ${isPending ? "text-apex_dashboard_blacktext" : ""}`
            }
          >
            {({ isActive }) => (
              <span
                className={`w-full  items-center  gap-2 flex !mx-4 !p-2 rounded-lg ${
                  isActive ? "bg-whitish" : ""
                }`}
              >
                <img src={rolePlay} alt="" /> Learning Modules
              </span>
            )}
          </NavLink>
          <NavLink
            to="/power"
            className={({ isActive, isPending }) =>
              `flex items-center gap-1 p-2 pl-4 !mb-2 text-apex_dashboard_blacktext ${
                isActive
                  ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-sidebar-color"
                  : ""
              } ${isPending ? "text-apex_dashboard_blacktext" : ""}`
            }
          >
            {({ isActive }) => (
              <span
                className={`w-full  items-center  gap-2 flex !mx-4 !p-2 rounded-lg ${
                  isActive ? "bg-whitish" : ""
                }`}
              >
                <img src={power} alt="" /> Role Play
              </span>
            )}
          </NavLink>
          <NavLink
            to="/ongoing"
            className={({ isActive, isPending }) =>
              `flex items-center gap-1 p-2 pl-4 !mb-2 text-apex_dashboard_blacktext ${
                isActive
                  ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-sidebar-color"
                  : ""
              } ${isPending ? "text-apex_dashboard_blacktext" : ""}`
            }
          >
            {({ isActive }) => (
              <span
                className={`w-full  items-center  gap-2 flex !mx-4 !p-2 rounded-lg ${
                  isActive ? "bg-whitish" : ""
                }`}
              >
                <img src={ongoing} alt="" /> Ongoing
              </span>
            )}
          </NavLink>
          <NavLink
            to="/teams"
            end={false}
            className={({ isActive, isPending }) =>
              `flex items-center gap-1 p-2 pl-4 !mb-2 text-apex_dashboard_blacktext ${
                isActive
                  ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-sidebar-color"
                  : ""
              } ${isPending ? "text-apex_dashboard_blacktext" : ""}`
            }
            onClick={closeSidebar}
          >
            {({ isActive }) => (
              <span
                className={`w-full items-center gap-2 flex !mx-4 !p-2 rounded-lg ${
                  isActive ? "bg-whitish" : ""
                }`}
              >
                <img src={teams} alt="" /> Teams
              </span>
            )}
          </NavLink>
        </div>
        <div className="flex flex-col justify-end h-7/9 !pb-6  ">
          <div>
            <NavLink
              to="/settings"
              className={({ isActive, isPending }) =>
                `flex items-center gap-1 p-2 pl-4 text-apex_dashboard_blacktext ${
                  isActive
                    ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-sidebar-color"
                    : ""
                } ${isPending ? "text-apex_dashboard_blacktext" : ""}`
              }
            >
              {({ isActive }) => (
                <span
                  className={`w-full  items-center  gap-2 flex !mx-4 !p-2 rounded-lg ${
                    isActive ? "bg-whitish" : ""
                  }`}
                >
                  <img src={setting} alt="" /> Settings
                </span>
              )}
            </NavLink>

            <NavLink
              to="/support"
              className={({ isActive, isPending }) =>
                `flex items-center gap-1 p-2 pl-4 text-apex_dashboard_blacktext ${
                  isActive
                    ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-sidebar-color"
                    : ""
                } ${isPending ? "text-apex_dashboard_blacktext" : ""}`
              }
            >
              {({ isActive }) => (
                <span
                  className={`w-full  items-center  gap-2 flex !mx-4 !p-2 rounded-lg ${
                    isActive ? "bg-whitish" : ""
                  }`}
                >
                  <img src={dashboard} alt="" /> Support
                </span>
              )}
            </NavLink>
            <div
              className="flex items-center gap-2 bg-whitish rounded-xl !mx-4 !p-2 !px-3 !mt-4  cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <img src={profile} alt="" className="w-8 h-8 object-contain" />
              <div>
                <h3>Sara Adams</h3>
                <p className="text-xs">Saraadamas@gmail.com</p>
              </div>
            </div>

            <AnimatePresence>
              {isModalOpen && (
                <ProfileModal onClose={() => setIsModalOpen(false)} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div>
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-screen w-[75%] bg-white z-[99999] transition-transform duration-300 ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } md:hidden`}
        >
          <div className="p-5 flex justify-between">
            <PiX
              size={52}
              onClick={closeSidebar}
              className={`cursor-pointer absolute top-14 bg-whitish rounded-2xl !p-3 -right-10 ${
                isOpen ? "block" : "hidden"
              }`}
            />
          </div>
          <div className="flex flex-col justify-between h-7/9 mt-16">
            <div>
              <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                  `flex items-center gap-1 p-2 pl-4 !mb-2 text-apex_dashboard_blacktext ${
                    isActive
                      ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-sidebar-color"
                      : ""
                  } ${isPending ? "text-apex_dashboard_blacktext" : ""}`
                }
                onClick={closeSidebar}
              >
                {({ isActive }) => (
                  <span
                    className={`w-full items-center gap-2 flex !mx-4 !p-2 rounded-lg ${
                      isActive ? "bg-whitish" : ""
                    }`}
                  >
                    <img src={dashboard} alt="" /> Dashboard
                  </span>
                )}
              </NavLink>

              <NavLink
                to="/role-play"
                className={({ isActive, isPending }) =>
                  `flex items-center gap-1 p-2 pl-4 !mb-2 text-apex_dashboard_blacktext ${
                    isActive
                      ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-sidebar-color"
                      : ""
                  } ${isPending ? "text-apex_dashboard_blacktext" : ""}`
                }
                onClick={closeSidebar}
              >
                {({ isActive }) => (
                  <span
                    className={`w-full items-center gap-2 flex !mx-4 !p-2 rounded-lg ${
                      isActive ? "bg-whitish" : ""
                    }`}
                  >
                    <img src={rolePlay} alt="" /> Learning Modules
                  </span>
                )}
              </NavLink>

              <NavLink
                to="/power"
                className={({ isActive, isPending }) =>
                  `flex items-center gap-1 p-2 pl-4 !mb-2 text-apex_dashboard_blacktext ${
                    isActive
                      ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-sidebar-color"
                      : ""
                  } ${isPending ? "text-apex_dashboard_blacktext" : ""}`
                }
                onClick={closeSidebar}
              >
                {({ isActive }) => (
                  <span
                    className={`w-full items-center gap-2 flex !mx-4 !p-2 rounded-lg ${
                      isActive ? "bg-whitish" : ""
                    }`}
                  >
                    <img src={power} alt="" /> Role Play
                  </span>
                )}
              </NavLink>

              <NavLink
                to="/ongoing"
                className={({ isActive, isPending }) =>
                  `flex items-center gap-1 p-2 pl-4 !mb-2 text-apex_dashboard_blacktext ${
                    isActive
                      ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-sidebar-color"
                      : ""
                  } ${isPending ? "text-apex_dashboard_blacktext" : ""}`
                }
                onClick={closeSidebar}
              >
                {({ isActive }) => (
                  <span
                    className={`w-full items-center gap-2 flex !mx-4 !p-2 rounded-lg ${
                      isActive ? "bg-whitish" : ""
                    }`}
                  >
                    <img src={ongoing} alt="" /> Ongoing
                  </span>
                )}
              </NavLink>
              <NavLink
                to="/teams"
                className={({ isActive, isPending }) =>
                  `flex items-center gap-1 p-2 pl-4 !mb-2 text-apex_dashboard_blacktext ${
                    isActive
                      ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-sidebar-color"
                      : ""
                  } ${isPending ? "text-apex_dashboard_blacktext" : ""}`
                }
                onClick={closeSidebar}
              >
                {({ isActive }) => (
                  <span
                    className={`w-full items-center gap-2 flex !mx-4 !p-2 rounded-lg ${
                      isActive ? "bg-whitish" : ""
                    }`}
                  >
                    <img src={teams} alt="" /> Teams
                  </span>
                )}
              </NavLink>
            </div>

            <div>
              <NavLink
                to="/settings"
                className={({ isActive, isPending }) =>
                  `flex items-center gap-1 p-2 pl-4 text-apex_dashboard_blacktext ${
                    isActive
                      ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-sidebar-color"
                      : ""
                  } ${isPending ? "text-apex_dashboard_blacktext" : ""}`
                }
                onClick={closeSidebar}
              >
                {({ isActive }) => (
                  <span
                    className={`w-full items-center gap-2 flex !mx-4 !p-2 rounded-lg ${
                      isActive ? "bg-whitish" : ""
                    }`}
                  >
                    <img src={setting} alt="" /> Settings
                  </span>
                )}
              </NavLink>

              <NavLink
                to="/support"
                className={({ isActive, isPending }) =>
                  `flex items-center gap-1 p-2 pl-4 text-apex_dashboard_blacktext ${
                    isActive
                      ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-sidebar-color"
                      : ""
                  } ${isPending ? "text-apex_dashboard_blacktext" : ""}`
                }
              >
                {({ isActive }) => (
                  <span
                    className={`w-full items-center gap-2 flex !mx-4 !p-2 rounded-lg ${
                      isActive ? "bg-whitish" : ""
                    }`}
                  >
                    <img src={dashboard} alt="" /> Support
                  </span>
                )}
              </NavLink>

              {/* <div className="flex items-center gap-2 bg-whitish rounded-xl !mx-4 !p-2 !px-3 !mt-4 ">
                <img src={profile} alt="" className="w-8 h-8 object-contain" />
                <div>
                  <h3>Sara Adams</h3>
                  <p className="text-xs">Saraadamas@gmail.com</p>
                </div>
              </div> */}
              <div
                className="flex items-center gap-2 bg-whitish rounded-xl !mx-4 !p-2 !px-3 !mt-4  cursor-pointer"
                onClick={() => {
                  setIsModalOpen(true);
                  closeSidebar();
                }}
              >
                <img src={profile} alt="" className="w-8 h-8 object-contain" />
                <div>
                  <h3>Sara Adams</h3>
                  <p className="text-xs">Saraadamas@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Profile Modal (Conditional Rendering) */}
        <AnimatePresence>
          {isModalOpen && (
            <ProfileModal onClose={() => setIsModalOpen(false)} />
          )}
        </AnimatePresence>
        {/* Overlay */}
        {isOpen && (
          <div
            className="fixed top-0 left-0 w-full h-screen bg-black/50 z-[99998] md:hidden"
            onClick={closeSidebar}
          />
        )}
      </div>
    </>
  );
};

export default SideBar;
