import { useEffect, useState } from "react";
import NavHeader from "../../layouts/NavHeader";
import yourTeams from "../../assets/img/dashboards/teams/team1.jpg";
import { RiAddCircleFill } from "react-icons/ri";
import TeamsModal from "./components/TeamsModal";
import team2 from "../../assets/img/dashboards/teams/team2.jpg";
import userPlus from "../../assets/img/dashboards/teams/users-plus.svg";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Loader2 from "../../components/Loaders/Loader2";

const Teams = () => {
  const { getAllTeams, loading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teams, setTeams] = useState([]); // State to store created teams
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    const fetchAllTeams = async () => {
      try {
        const data = await getAllTeams();
        setTeams(data?.data || []);
      } catch (error) {
        console.error("Error fetching roleplays:", error);
      }
    };

    fetchAllTeams();
  }, []);

  useEffect(() => {
    setCurrentPath(location.pathname); // Updates state on route change
  }, [location.pathname]);
  // Function to add a new team

  const addTeam = (teamName) => {
    setTeams([...teams, { name: teamName }]);
    setIsModalOpen(false); // Close modal after adding team
  };
  console.log("teams from:", teams);

  const { user } = useAuth(); // Get the current user from context
  const storedUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
  const currentUser = user || storedUser; // Get the user from context or sessionStorage
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser?.id) {
      // Redirect to the signin page if not authenticated
      navigate("/signin");
    } else if (currentUser?.role !== "admin") {
      // Redirect to the homepage if the user is not an admin
      navigate("/");
    }
  }, [currentUser, navigate]);

  if (!currentUser?.id || currentUser?.role !== "admin") {
    // Optional: Render a loading or fallback UI while the user is redirected
    return null;
  }
  return (
    <div className="h-full w-full overflow-hidden !py-4">
      <div className="bg-[#F3F3F3] overflow-scroll scroll-hide h-full rounded-3xl !mx-3 ">
        {loading ? (
          <Loader2 />
        ) : (
          <>
            <div className="backdrop-blur-xs !py-4 lg:!px-10 px-6 sticky top-0 z-40">
              <NavHeader header={"YOUR TEAM"} />
            </div>
            {currentPath === "/teams" &&
              !currentPath.includes("mining-teams") && (
                <>
                  {teams.length === 0 ? (
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
                          <RiAddCircleFill
                            color="black"
                            fill="white"
                            size={20}
                          />
                        </button>
                      </div>
                    </div>
                  ) : (
                    // Show this when teams are added
                    <div className="lg:!p-10 p-6 w-full">
                      <button
                        className="bg-green-tint flex rounded-full gap-3 items-center !py-3 text-white !px-3 hover:opacity-85 hover:scale-105 transition text-sm lg:text-base !mb-6"
                        onClick={() => setIsModalOpen(true)}
                      >
                        Create new team{" "}
                        <RiAddCircleFill color="black" fill="white" size={20} />
                      </button>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {teams.map((team) => (
                          <div
                            className="flex flex-col items-center bg-white !p-8 lg:!px-8 w-full lg:w-full rounded-2xl"
                            key={team.id}
                          >
                            <h2 className="font-nueue lg:text-2xl text-xl font-[900] text-center !py-6">
                              {team.name}
                            </h2>
                            <div className="w-60 h-60">
                              <img
                                src={team2}
                                alt=""
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <div className="flex justify-between w-full">
                              <p className="text-gray-500 !p-1">
                                {team.members || "0 Members"}
                              </p>
                              <Link
                                to={`/teams/mining-teams/${team.id}`}
                                state={{ teamName: team.name }}
                                className="bg-green-tint text-white flex items-center !p-1 !px-3 text-sm rounded-2xl"
                              >
                                See details
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
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
