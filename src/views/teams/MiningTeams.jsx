import React, { useEffect, useState } from "react";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiScales2Line,
  RiScales3Line,
  RiScalesFill,
} from "react-icons/ri";
import { Link, useLocation, useParams } from "react-router-dom";
import Back from "../../components/Back";
import profile from "./../../assets/img/dashboards/teams/avatar7.jpg";
import profile2 from "./../../assets/img/dashboards/teams/avatar2.jpg";
import performance from "../../assets/img/dashboards/teams/3d-pt-box.svg";
import userMinus from "../../assets/img/dashboards/teams/user-minus.svg";
import leader from "../../assets/img/dashboards/teams/leadership.svg";
import compare from "../../assets/img/dashboards/teams/performance.svg";
import Miningcard from "./components/Miningcard";
import KeyStats from "./components/KeyStats";
import { useAuth } from "../../context/AuthContext";
import Loader2 from "../../components/Loaders/Loader2";
import Modal from "./components/Modal";
import TeamInvite from "./components/TeamInvite";

const MiningTeams = () => {
  const handleSeePerformance = () => {};
  const handleRemoveUser = () => {};
  const handleLeaderboardClick = () => {};
  const { teamId } = useParams(); // Get team ID from the URL
  const location = useLocation();
  const teamName = location.state?.teamName || "Unknown Team";
  const { getTeamMembers, loading } = useAuth();
  const [teamMembers, setTeamMembers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchAllRolePlays = async () => {
      try {
        const data = await getTeamMembers(teamId);
        setTeamMembers(data?.data || []);
      } catch (error) {
        console.error("Error fetching roleplays:", error);
      }
    };

    fetchAllRolePlays();
  }, []);
  console.log("members", teamMembers);
  // Function to toggle modal
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <section className="lg:!px-10 !px-4">
      {loading ? (
        ""
      ) : (
        <>
          <div>
            <Back route={"/teams"} />
          </div>
          <div className="grid lg:grid-cols-5 gap-10 !py-8 font-nueue">
            <div className="flex flex-col  gap-4 !p-4 bg-white  !mb-5 rounded-3xl shadow-md lg:col-span-3  col-span-5 ">
              <h1 className="text-2xl text-center font-bold  tracking-tight !py-6">
                {teamName}
              </h1>
              <p>Members:</p>
              {/* <Miningcard
              profile={profile}
              email="Sarahmartins@gmail.com"
              teamCount={1}
              onSeePerformance={handleSeePerformance}
              onRemove={handleRemoveUser}
            /> */}
              {teamMembers.length === 0 ? (
                <p> No team members for Team : {teamName} </p>
              ) : (
                teamMembers.map((member) => (
                  <Miningcard
                    key={member.id}
                    profile={profile}
                    email={member.email}
                    teamCount={1}
                    onSeePerformance={handleSeePerformance}
                    onRemove={handleRemoveUser}
                  />
                ))
              )}
              <div className="flex justify-center">
                <button
                  className="bg-green-tint text-white !p-2 !px-7 rounded-full text-sm cursor-pointer"
                  onClick={handleOpenModal}
                >
                  Invite Members
                </button>
              </div>
            </div>

            <div className="lg:col-span-2 col-span-5 self-start flex flex-col  gap-4 !p-4 bg-white rounded-3xl shadow-md !mb-5">
              <h1 className="text-2xl text-center font-bold  tracking-tight !py-6">
                Key Stats
              </h1>

              <KeyStats
                icon={leader}
                text="See Leadership boards"
                onClick={handleLeaderboardClick}
                link={"../leader-board"}
              />
              <KeyStats
                icon={compare}
                text="Compare Performance"
                onClick={handleLeaderboardClick}
                link={"../compare-stats"}
              />
            </div>

            {/* Modal for inviting members */}
            {isModalOpen && (
              <TeamInvite isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default MiningTeams;
