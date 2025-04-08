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
import { toast } from "sonner";

const MiningTeams = () => {
  const handleSeePerformance = () => {};
  const handleLeaderboardClick = () => {};
  const { teamId } = useParams(); // Get team ID from the URL
  const location = useLocation();
  const teamName = location.state?.teamName || "Unknown Team";
  const { getTeamMembers, loading, removeTeamMember } = useAuth();
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

  // const handleRemoveMember = async (member) => {
  //   try {
  //     // const res = await removeTeamMember(member); // use member.userId and member.id
  //     const res = await removeTeamMember({ teamId, userId });
  //     toast.success("Member removed successfully");
  //     console.log("res", res);

  //     // Filter out the removed member
  //     setTeamMembers((prev) => prev.filter((m) => m.userId !== member.userId));
  //   } catch (err) {
  //     console.error("Error:", err);
  //     toast.error(err?.response?.data?.message || "There was a problem");
  //   }
  // };
  // Function to handle removing a member
  const handleRemoveMember = async (teamId, memberId) => {
    try {
      const response = await removeTeamMember(teamId, memberId); // Call removeTeamMember function with teamId and memberId
      console.log("Member removed:", response);
      // Filter out the removed member from the teamMembers state
      setTeamMembers((prev) => prev.filter((m) => m.userId !== memberId));
    } catch (error) {
      console.error("Error removing member:", error);
    }
  };
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
                    member={member}
                    onSeePerformance={handleSeePerformance}
                    teamId={teamId} // Pass teamId to Miningcard
                    onRemove={handleRemoveMember}
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
              <TeamInvite
                isOpen={isModalOpen}
                setIsOpen={setIsModalOpen}
                teamName={teamName}
              />
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default MiningTeams;
