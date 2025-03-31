// import React, { useEffect, useState } from "react";
// import { useAuth } from "../../context/AuthContext";
// import Loader2 from "../../components/Loaders/Loader2";
// import NavHeader from "../../layouts/NavHeader";
// import RolePlayCards from "./components/RolePlayCards";

// const RolePlayPage = () => {
//   const { loading, getAllRoleplays, allRoleplay } = useAuth();
//   const [newRoleplay, setNewRoleplay] = useState(null);
//   useEffect(() => {
//     const fetchAllRolePlays = async () => {
//       try {
//         const data = await getAllRoleplays(); // Fetch profile data

//         console.log("role data", data);
//         setNewRoleplay(data.data);
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       }
//     };

//     fetchAllRolePlays();
//   }, []);

//   console.log("role play fetched", newRoleplay);
//   return (
//     <div className="h-full w-full overflow-hidden !py-4 ">
//       <div className="bg-[#F3F3F3] overflow-scroll scroll-hide h-full rounded-3xl !mx-3">
//         {loading && (
//           <div>
//             <Loader2 />
//           </div>
//         )}
//         <div className="backdrop-blur-xs !py-4 !px-10 sticky top-0 z-40">
//           <NavHeader header={"ROLE PLAY"} />
//         </div>
//         <div className="flex md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 !mt-4 gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-smooth scrollbar-hide !px-10">
//           {newRoleplay ? <RolePlayCards /> : ""}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RolePlayPage;

import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Loader2 from "../../components/Loaders/Loader2";
import NavHeader from "../../layouts/NavHeader";
import { PiClock } from "react-icons/pi";
import { Link } from "react-router-dom";
import { RiLightbulbFlashFill } from "react-icons/ri";
import difficulticon from "../../assets/img/dashboards/rolePlay/music.svg";

const RolePlayPage = () => {
  const { loading, getAllRoleplays } = useAuth();
  const [newRoleplay, setNewRoleplay] = useState([]);

  useEffect(() => {
    const fetchAllRolePlays = async () => {
      try {
        const data = await getAllRoleplays();
        setNewRoleplay(data?.data || []);
      } catch (error) {
        console.error("Error fetching roleplays:", error);
      }
    };

    fetchAllRolePlays();
  }, []);

  if (loading) return <Loader2 />;

  return (
    <div className="h-full w-full overflow-hidden !py-4 no-scrollbar ">
      <div className="bg-[#F3F3F3] overflow-scroll scroll-hide h-full rounded-3xl !mx-3">
        <div className="backdrop-blur-xs !px-10 !py-6 sticky top-0 z-40">
          <NavHeader header={"ROLE PLAY"} />
        </div>

        {newRoleplay.length === 0 ? (
          <p className="text-center text-gray-500 !py-10">
            No roleplays available.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 !px-10 !mt-6 !mb-12 scroll-hide no-scrollbar ">
            {newRoleplay.map((role, index) => (
              <div
                key={index}
                className="relative w-full h-72 rounded-2xl overflow-hidden shadow-lg bg-black group"
              >
                {/* Background Image */}
                <img
                  src={role.scenarioImage || "/default-bg.jpg"}
                  alt={role.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 transition group-hover:scale-105"
                />

                {/* Overlay */}
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div> */}

                {/* Content */}
                <div className="absolute bottom-0 !p-5 w-full text-white flex flex-col gap-3">
                  {/* Icon & Title */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-tint !p-2 rounded-xl flex items-center justify-center">
                      <img
                        src={role.icon || difficulticon}
                        alt="icon"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="text-lg font-bold">
                      {role.scenario || "Roleplay Title"}
                    </h3>
                  </div>

                  {/* Start Button */}
                  <Link
                    to={`/roleplay/${role.id}`}
                    className="bg-green-tint text-white text-sm !px-4 !py-2 rounded-lg hover:scale-105 transition w-max !mt-2"
                  >
                    Start Roleplay
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RolePlayPage;
