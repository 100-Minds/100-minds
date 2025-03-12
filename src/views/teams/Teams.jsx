// import React, { useState } from "react";
// import NavHeader from "../../layouts/NavHeader";
// import yourTeams from "../../assets/img/dashboards/teams/team1.jpg";
// import { RiAddCircleFill } from "react-icons/ri";
// import TeamsModal from "./components/TeamsModal";

// const Teams = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <div className="h-full w-full overflow-hidden   !pt-4 ">
//       <div className="bg-[#F3F3F3] overflow-scroll scroll-hide h-full min-h-screen rounded-3xl !mx-3">
//         <div className="backdrop-blur-xs !py-4 !px-10 sticky top-0 z-40">
//           <NavHeader header={"YOUR TEAM"} />
//         </div>
//         <div className="flex justify-center items-center h-[90vh]  ">
//           <div className="lg:w-2/3 h-3/4 lg:!mb-16 bg-white rounded-3xl flex flex-col items-center justify-center">
//             <img src={yourTeams} alt="" className="w-96 h-60 object-contain" />
//             <h1 className="font-extrabold lg:text-4xl font-nueue tracking-tight">
//               Welcome to your teams
//             </h1>
//             <p className="text-gray-400 lg:text-sm !py-4.5">
//               Create your teams and add members to{" "}
//               <span>
//                 <br />
//               </span>
//               track their progress ans performance
//             </p>
//             <button
//               className="bg-green-tint flex rounded-full gap-3 items-center !py-3  text-white !px-3 hover:opacity-85 hover:scale-105 transition"
//               onClick={() => setIsModalOpen(true)}
//             >
//               Create new team{" "}
//               <RiAddCircleFill color="black" fill="white" size={20} />
//             </button>
//           </div>
//         </div>
//         {/* {isOpen && <TeamsModal />} */}
//         {isModalOpen && (
//           <TeamsModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Teams;

import { useEffect, useState } from "react";
import NavHeader from "../../layouts/NavHeader";
import yourTeams from "../../assets/img/dashboards/teams/team1.jpg";
import { RiAddCircleFill } from "react-icons/ri";
import TeamsModal from "./components/TeamsModal";
import team2 from "../../assets/img/dashboards/teams/team2.jpg";
import userPlus from "../../assets/img/dashboards/teams/users-plus.svg";
import { Link, Outlet, useLocation } from "react-router-dom";

const Teams = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teams, setTeams] = useState([]); // State to store created teams
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    setCurrentPath(location.pathname); // Updates state on route change
  }, [location.pathname]);
  // Function to add a new team
  const addTeam = (teamName) => {
    setTeams([...teams, { name: teamName }]);
    setIsModalOpen(false); // Close modal after adding team
  };

  return (
    <div className="h-full w-full overflow-hidden !pt-4">
      <div className="bg-[#F3F3F3] overflow-scroll scroll-hide h-full min-h-screen rounded-3xl !mx-3">
        <div className="backdrop-blur-xs !py-4 lg:!px-10 px-6 sticky top-0 z-40">
          <NavHeader header={"YOUR TEAM"} />
        </div>
        {currentPath === "/teams" && !currentPath.includes("mining-teams") && (
          <>
            {teams.length === 1 ? (
              // Show this when no teams exist (default page)
              <div className="flex justify-center items-center h-[90vh]">
                <div className="lg:w-2/3 h-3/4 lg:!mb-16 bg-white rounded-3xl flex flex-col items-center justify-center">
                  <img
                    src={yourTeams}
                    alt=""
                    className="w-96 h-60 object-contain"
                  />
                  <h1 className="font-extrabold lg:text-4xl font-nueue tracking-tight">
                    Welcome to your teams
                  </h1>
                  <p className="text-gray-400 lg:text-sm !py-4.5">
                    Create your teams and add members to{" "}
                    <span>
                      <br />
                    </span>
                    track their progress and performance.
                  </p>
                  <button
                    className="bg-green-tint flex rounded-full gap-3 items-center !py-3 text-white !px-3 hover:opacity-85 hover:scale-105 transition"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Create new team{" "}
                    <RiAddCircleFill color="black" fill="white" size={20} />
                  </button>
                </div>
              </div>
            ) : (
              // Show this when teams are added
              <div className="lg:!p-10 p-6">
                {/* <h2 className="text-3xl font-bold mb-6">Your Teams</h2> */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teams.map((team, index) => (
                    <div
                      key={index}
                      className="bg-white p-6 rounded-xl shadow-md"
                    >
                      <h3 className="text-xl font-bold">{team.name}</h3>
                      <p className="text-gray-500">Members: 0</p>
                    </div>
                  ))}
                </div>

                <button
                  className="bg-green-tint flex rounded-full gap-3 items-center !py-3 text-white !px-3 hover:opacity-85 hover:scale-105 transition text-sm lg:text-base"
                  onClick={() => setIsModalOpen(true)}
                >
                  Create new team{" "}
                  <RiAddCircleFill color="black" fill="white" size={20} />
                </button>

                <div className="!py-6 flex flex-col lg:flex-row gap-9  font-nueue">
                  <div className="flex flex-col items-center  bg-white  !p-8 lg:!px-8  w-full lg:w-1/3 rounded-2xl ">
                    <h2 className="font-nueue lg:text-2xl  text-xl font-[900] text-center !py-6">
                      Mining team
                    </h2>
                    <div className="w-60 h-60">
                      <img
                        src={team2}
                        alt=""
                        className="w-ful h-full object-contain"
                      />
                    </div>
                    <div className="flex justify-between w-full ">
                      <p className="text-gray-500 !p-1 ">24 Members</p>
                      <button className="bg-green-tint tex-white  !p-1 !px-3 text-sm text-white rounded-2xl">
                        See details
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-between  bg-white  !p-8 !px-8 w-full lg:w-1/3 rounded-2xl min-h-[50vh]">
                    <h2 className="font-nueue lg:text-2xl  text-xl font-[900] text-center !py-6">
                      Mining team
                    </h2>
                    <div className="flex flex-col items-center">
                      <p>No members added yet</p>
                      <button className="flex items-center gap-1 bg-whitish !p-1.5 !px-5 !mt-2 text-sm text-green-tint rounded-2xl">
                        Invite <img src={userPlus} alt="" />{" "}
                      </button>
                    </div>
                    <div className="flex justify-between  w-full ">
                      <p className="text-gray-500 !p-1 ">24 Members</p>
                      <Link
                        to="mining-teams"
                        className="bg-green-tint  !p-1 text-center flex items-center !px-3 text-sm text-white rounded-2xl"
                      >
                        See details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        <Outlet />
        {/* Modal */}
        {isModalOpen && (
          <TeamsModal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            addTeam={addTeam}
          />
        )}
      </div>
    </div>
  );
};

export default Teams;
