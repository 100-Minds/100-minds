import { useState, useEffect } from "react";
import yourTeams from "../../../assets/img/dashboards/teams/team1.jpg";
import { RiCloseLargeLine } from "react-icons/ri";
import profileImg from "../../../assets/img/dashboards/teams/avatar7.jpg";
import userPlus from "../../../assets/img/dashboards/teams/users-plus.svg";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "sonner";

const TeamsModal = ({ isOpen, setIsOpen }) => {
  const [step, setStep] = useState(1);
  const [teamName, setTeamName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const { createTeam, loading } = useAuth();

  // Reset step to 1 whenever the modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
    }
  }, [isOpen]);
  const handleCreateTeam = async () => {
    if (!teamName.trim()) {
      toast.error("Team name cannot be empty.");
      return;
    }

    try {
      await createTeam({ name: teamName });
      toast.success("Team created successfully!");
      setStep(2); // Move to the next step if successful
    } catch (error) {
      console.log(error);
      toast.error("Failed to create team. Please try again.");
    }
  };

  if (!isOpen) return null; // Hide modal when isOpen is false

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white rounded-3xl !p-8 w-[100%] max-w-md shadow-lg relative">
        <button
          className="absolute left-1/2 transform -translate-x-1/2 -top-8 border-gray-200 border-[1px] text-gray-500 text-xl bg-white !p-3 rounded-full"
          onClick={() => setIsOpen(false)} // Close modal
        >
          <RiCloseLargeLine />
        </button>
        {step === 1 ? (
          <>
            <h2 className="text-2xl font-bold text-center !my-8 font-nueue">
              Name your team
            </h2>
            <img
              src={yourTeams}
              alt=""
              className="w-60 h-36 !mx-auto object-contain"
            />
            <input
              type="text"
              placeholder="Mining team"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
              className="w-full border-b border-gray-200 !p-2 !mt-4 focus:outline-none !mb-6 text-2xl font-bebas"
            />
            <button
              className="bg-green-tint flex justify-center w-full rounded-full gap-3 items-center !py-3 text-white !px-3 mt-4 hover:opacity-85 hover:scale-105 transition"
              // onClick={() => setStep(2)}
              onClick={handleCreateTeam}
            >
              Continue
            </button>
          </>
        ) : (
          <>
            <form action="">
              <h2 className="text-2xl font-nueue font-extrabold text-center !my-8">
                Add Member
              </h2>
              <input
                type="text"
                placeholder="Enter member email"
                value={memberEmail}
                onChange={(e) => setMemberEmail(e.target.value)}
                className="w-full bg-whitish rounded-xl !p-2 !pl-3 !py-4 !mt-4 focus:outline-none !mb-6 text-sm"
              />
              <div className="flex gap-2 items-center w-full">
                <p className="text-base font-semibold">Current members</p>
                <span className="bg-whitish !px-2 !p-1 rounded-full text-sm">
                  0
                </span>
              </div>
              <div className="bg-whitish !p-4 !mt-6 rounded-xl !mb-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-red-400 flex justify-center items-center">
                    <img
                      src={profileImg}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-xs">
                      Sarahmartins@gmail.com
                    </p>
                    <p className="text-xs text-gray-500 !pt-1">
                      Not in any teams yet
                    </p>
                  </div>
                </div>
                <button className="bg-white text-green-tint !px-4 !py-2 rounded-lg text-xs flex items-center gap-2 hover:scale-105">
                  Invite <img src={userPlus} alt="" className="w-4 h-4" />
                </button>
              </div>
              <button className="bg-green-tint flex justify-center w-full rounded-full gap-3 items-center !py-3 text-white !px-3 mt-6 hover:opacity-85 hover:scale-105 transition">
                {/* Continue */} {loading ? "Inviting" : "continue"}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default TeamsModal;
