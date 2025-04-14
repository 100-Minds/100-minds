/* eslint-disable */

import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/img/dashboards/100minds-logo.png";
import {
  PiBook,
  PiCalendar,
  PiCalendarDot,
  PiCalendarDots,
  PiHeartFill,
  PiHouse,
  PiQuestionBold,
  PiSquaresFour,
  PiX,
} from "react-icons/pi";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import dashboard from "../assets/img/dashboards/dashboard.svg";
import rolePlay from "../assets/img/dashboards/role play.svg";
import power from "../assets/img/dashboards/power.svg";
import ongoing from "../assets/img/dashboards/ongoing.svg";
import setting from "../assets/img/dashboards/settings.svg";
import support from "../assets/img/dashboards/support.svg";
import profileimg from "../assets/img/dashboards/sarah.png";
import { useSidebar } from "../context/SidebarContex";
import teams from "../assets/img/dashboards/teams/group-icon.svg";
import ProfileModal from "../components/ProfileModal";
import { AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { RiLogoutCircleLine } from "react-icons/ri";
import clientlogo from "../assets/img/dashboards/quiz/cmpc-logo.svg";
import { FaBookBible } from "react-icons/fa6";
import { toast } from "sonner";
import EventBus from "../utils/EventBus";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

const SideBar = () => {
  const { isOpen, closeSidebar } = useSidebar();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const closeSidebarMenu = () => setIsSidebarOpen(false);
  const [profile, setProfile] = useState(null);
  const [courses, setCourses] = useState(null);
  const { getProfileData, signout, getCourses, user } = useAuth();
  console.log("user from sidebar", user);
  const sidebarRef = useRef(null);

  const [showArrow, setShowArrow] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const fetchData = async () => {
    try {
      const data = await getProfileData(); // Fetch profile data
      if (JSON.stringify(data) !== JSON.stringify(profile)) {
        setProfile(data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
  useEffect(() => {
    fetchData();

    const fetchCourses = async () => {
      try {
        const data = await getCourses(); // Fetch profile data
        setCourses(data); // Store it in state
        console.log(courses);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchCourses();

    const handleProfileUpdate = () => {
      fetchData(); // 👈 re-fetch when profileUpdated event fires
    };

    EventBus.addEventListener("profileUpdated", handleProfileUpdate);

    return () => {
      EventBus.removeEventListener("profileUpdated", handleProfileUpdate);
    };
  }, []);

  const location = useLocation();
  console.log("Current Route:", location.pathname);

  // Handling logout
  const handleSignout = async () => {
    try {
      const response = await signout();
      if (response?.message) {
        toast.success(response.message);
      } else {
        toast.success("Logout successful");
      }
      sessionStorage.removeItem("loggedInUser");
      sessionStorage.removeItem("user"); // Just in case
      localStorage.removeItem("userToken"); // If you stored any tokens

      // Wait for the toast to be visible before redirecting
      setTimeout(() => {
        navigate("/signin");
      }, 3000);

      console.log("Signout response:", response);
    } catch (error) {
      console.error("Error signing out", error);
      toast.error(error.response?.data?.message || "Failed to log out");
    }
  };

  // Check if the user is an admin
  const isAdmin = profile?.data[0]?.role === "admin";

  const scrollSidebarDown = () => {
    if (sidebarRef.current) {
      sidebarRef.current.scrollBy({ top: 100, behavior: "smooth" }); // Scroll down by 100px
    }
  };

  const scrollSidebarUp = () => {
    if (sidebarRef.current) {
      sidebarRef.current.scrollBy({ top: -100, behavior: "smooth" }); // Scroll up by 100px
    }
  };

  const handleScroll = () => {
    if (sidebarRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = sidebarRef.current;

      // If we're at the bottom of the container, set isAtBottom to true
      if (scrollTop + clientHeight >= scrollHeight) {
        setIsAtBottom(true);
      } else {
        setIsAtBottom(false);
      }
    }
  };
  return (
    <>
      {/* laptop screen */}

      <div className="w-1/4  max-h-screen  font-nueue hidden  lg:flex flex-col justify-between  text-nowrap no-scrollbar">
        <div className="!py-6 !pb-3  top-2.5">
          <img src={logo} alt="" className="pl-4 w-40 h-18 object-contain " />
        </div>

        <div className="h-full overflow-y-scroll no-scrollbar relative w-full">
          <div
            ref={sidebarRef}
            className="h-full overflow-y-scroll no-scrollbar"
            // onScroll={handleScroll}
          >
            <NavLink
              to="/home"
              end
              className={({ isActive, isPending }) =>
                `flex items-center gap-1  !mb-2 text-apex_dashboard_blacktext ${
                  isActive
                    ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-green-tint"
                    : ""
                } ${isPending ? "text-apex_dashboard_blacktext" : ""}`
              }
            >
              {({ isActive }) => (
                <span
                  className={`w-full  items-start  gap-2 flex !mx-4 !p-2 rounded-lg  ${
                    isActive ? "bg-whitish" : ""
                  }`}
                >
                  <PiHouse size={20} color="#509999" /> Home
                </span>
              )}
            </NavLink>
            <NavLink
              to="/"
              end
              className={({ isActive, isPending }) =>
                `flex items-center gap-1  !mb-2 text-apex_dashboard_blacktext ${
                  isActive
                    ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-green-tint"
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
              to="/journey"
              className={({ isActive, isPending }) =>
                `flex items-center gap-1  !mb-2 text-apex_dashboard_blacktext ${
                  isActive
                    ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-green-tint"
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
                  <img src={rolePlay} alt="" />
                  My Journey Map
                </span>
              )}
            </NavLink>
            <NavLink
              to="/courses"
              className={({ isActive, isPending }) =>
                `flex items-center gap-1  !mb-2 text-apex_dashboard_blacktext ${
                  isActive
                    ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-green-tint"
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
                  {/* <img src={rolePlay} alt="" />  */}
                  <PiBook color="#509999" size={18} />
                  Course Library
                </span>
              )}
            </NavLink>
            <NavLink
              to="/role-play"
              className={({ isActive, isPending }) =>
                `flex items-center gap-1 !mb-2 text-apex_dashboard_blacktext ${
                  isActive
                    ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-green-tint"
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
            {/* <NavLink
            to="/powerskills"
            className={({ isActive, isPending }) =>
              `flex items-center gap-1 !mb-2 text-apex_dashboard_blacktext ${
                isActive
                  ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-green-tint"
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
                <img src={power} alt="" /> Power Skills
              </span>
            )}
          </NavLink> */}
            <NavLink
              to="/ongoing"
              className={({ isActive, isPending }) =>
                `flex items-center gap-1  !mb-2 text-apex_dashboard_blacktext ${
                  isActive
                    ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-green-tint"
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
            {/* <NavLink
            to="/teams"
            end={false}
            className={({ isActive, isPending }) =>
              `flex items-center gap-1 !mb-2 text-apex_dashboard_blacktext ${
                isActive
                  ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-green-tint"
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
          </NavLink> */}
            {isAdmin && (
              <NavLink
                to="/teams"
                end={false}
                className={({ isActive, isPending }) =>
                  `flex items-center gap-1 !mb-2 text-apex_dashboard_blacktext ${
                    isActive
                      ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-green-tint"
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
            )}

            <NavLink
              to="/Calendar"
              className={({ isActive, isPending }) =>
                `flex items-center gap-1  !mb-2 text-apex_dashboard_blacktext ${
                  isActive
                    ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-green-tint"
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
                  <PiCalendarDots color="#509999" size={22} /> Calendar
                </span>
              )}
            </NavLink>
            <NavLink
              to="/favourites"
              className={({ isActive, isPending }) =>
                `flex items-center gap-1  !mb-2 text-apex_dashboard_blacktext ${
                  isActive
                    ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-green-tint"
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
                  <PiHeartFill color="#509999" size={22} /> Favourites
                </span>
              )}
            </NavLink>

            <NavLink
              to="/ongoing"
              className={({ isActive, isPending }) =>
                `flex items-center gap-1  !mb-2 text-apex_dashboard_blacktext ${
                  isActive
                    ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-green-tint"
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
                  <PiQuestionBold color="#509999" size={22} /> Q&A
                </span>
              )}
            </NavLink>
            {/* Gradient Fade at the top */}
            {isAtBottom && (
              <div className="pointer-events-none sticky top-0 left-0 right-0 h-12 bg-gradient-to-b from-white to-transparent z-10" />
            )}

            {/* Gradient Fade at the bottom */}
            {!isAtBottom && (
              <div className="pointer-events-none sticky bottom-0 left-0 right-0 h-12 bg-white z-10" />
            )}
            {/* Scroll Arrow (Down or Up) */}
            {!isAtBottom ? (
              <div
                className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 cursor-pointer text-gray-400 animate-bounce"
                onClick={scrollSidebarDown}
              >
                <BiChevronDown className="w-6 h-6" />
              </div>
            ) : (
              <div
                className="absolute top-3 left-1/2 -translate-x-1/2 z-20 cursor-pointer text-gray-400 animate-bounce"
                onClick={scrollSidebarUp}
              >
                <BiChevronUp className="w-6 h-6" />
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col justify-end  !pb-6   ">
          <div className="w-full flex items-center pl-6 py-4">
            <img src={clientlogo} alt="" className="w-32" />
          </div>
          <div>
            <NavLink
              to="/settings"
              className={({ isActive, isPending }) =>
                `flex items-center gap-1  text-apex_dashboard_blacktext ${
                  isActive
                    ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-green-tint"
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
            {/* 
            <NavLink
              to="/support"
              className={({ isActive, isPending }) =>
                `flex items-center gap-1 text-apex_dashboard_blacktext ${
                  isActive
                    ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-green-tint"
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
            </NavLink> */}
            <button
              className="flex items-center gap-1 !p-2 !pl-6  text-red-500  text-apex_dashboard_blacktext"
              onClick={handleSignout}
            >
              <RiLogoutCircleLine /> Logout
            </button>
            <div
              className="flex items-center gap-2 bg-whitish rounded-xl !mx-4 !p-2 !px-3 !mt-4  cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              <img
                src={
                  profile?.data[0]?.photo ? profile.data[0].photo : profileimg
                }
                alt=""
                className="w-8 h-8 object-cover rounded-full"
              />
              <div>
                <h3>
                  {profile?.data[0]?.firstName || "User Name"}{" "}
                  {profile?.data[0]?.lastName || "User Name"}{" "}
                </h3>
                <p className="text-xs">
                  {profile?.data[0]?.email || "example@gmail.com"}
                </p>
              </div>
            </div>

            <AnimatePresence>
              {isModalOpen && (
                <ProfileModal
                  onClose={() => setIsModalOpen(false)}
                  profileData={profile?.data[0]}
                />
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
                      ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-green-tint"
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
                      ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-green-tint"
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
                    <img src={rolePlay} alt="" /> Journey
                  </span>
                )}
              </NavLink>

              <NavLink
                to="/power"
                className={({ isActive, isPending }) =>
                  `flex items-center gap-1 p-2 pl-4 !mb-2 text-apex_dashboard_blacktext ${
                    isActive
                      ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-green-tint"
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
                to="/powerskills"
                className={({ isActive, isPending }) =>
                  `flex items-center gap-1 !mb-2 text-apex_dashboard_blacktext ${
                    isActive
                      ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-green-tint"
                      : ""
                  } ${isPending ? "text-apex_dashboard_blacktext" : ""}`
                }
                onClick={closeSidebar}
              >
                {({ isActive }) => (
                  <span
                    className={`w-full  items-center  gap-2 flex !mx-4 !p-2 rounded-lg ${
                      isActive ? "bg-whitish" : ""
                    }`}
                  >
                    <img src={power} alt="" /> Power Skills
                  </span>
                )}
              </NavLink>

              <NavLink
                to="/ongoing"
                className={({ isActive, isPending }) =>
                  `flex items-center gap-1 p-2 pl-4 !mb-2 text-apex_dashboard_blacktext ${
                    isActive
                      ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-green-tint"
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
                      ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-green-tint"
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
                      ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-green-tint"
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

              {/* <NavLink
                to="/support"
                className={({ isActive, isPending }) =>
                  `flex items-center gap-1 p-2 pl-4 text-apex_dashboard_blacktext ${
                    isActive
                      ? "bg-apex_dashbord_active_bg text-apex_dashboard_greentext border-l-5 border-green-tint"
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
              </NavLink> */}
              <button
                className="flex items-center gap-1 p-2 pl-4 text-apex_dashboard_blacktext"
                onClick={handleSignout}
              >
                <RiLogoutCircleLine /> Logout
              </button>

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
                <img
                  src={profileimg}
                  alt=""
                  className="w-8 h-8 object-contain"
                />
                <div>
                  <h3>{profile?.data[0]?.firstName || "User Name"}</h3>
                  <p className="text-xs">
                    {profile?.data[0]?.email || "example@gmail.com"}
                  </p>
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
