// import { useEffect, useState } from "react";
// import profileImg from "../../../assets/img/dashboards/teams/avatar7.jpg";
// import userPlus from "../../../assets/img/dashboards/teams/users-plus.svg";
// import { RiCloseLargeLine } from "react-icons/ri";
// import { useAuth } from "../../../context/AuthContext";
// const TeamInvite = ({ isOpen, setIsOpen }) => {
//   const { inviteTeamMember } = useAuth();
//   const [memberEmail, setMemberEmail] = useState("");
//   if (!isOpen) return null; // Hide modal when isOpen is false
//   return (
//     <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
//       <div className="bg-white rounded-3xl !p-8 w-[100%] max-w-md shadow-lg relative">
//         <button
//           className="absolute left-1/2 transform -translate-x-1/2 -top-8 border-gray-200 border-[1px] text-gray-500 text-xl bg-white !p-3 rounded-full"
//           onClick={() => setIsOpen(false)} // Close modal
//         >
//           <RiCloseLargeLine />
//         </button>
//         <h2 className="text-2xl font-nueue font-extrabold text-center !my-8">
//           Add Member
//         </h2>
//         <input
//           type="text"
//           placeholder="Enter member email"
//           value={memberEmail}
//           onChange={(e) => setMemberEmail(e.target.value)}
//           className="w-full bg-whitish rounded-xl !p-2 !pl-3 !py-4 !mt-4 focus:outline-none !mb-6 text-sm"
//         />
//         <div className="flex gap-2 items-center w-full">
//           <p className="text-base font-semibold">Current members</p>
//           <span className="bg-whitish !px-2 !p-1 rounded-full text-sm">0</span>
//         </div>
//         <div className="bg-whitish !p-4 !mt-6 rounded-xl !mb-8 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <div className="w-16 h-16  flex justify-center items-center">
//               <img
//                 src={profileImg}
//                 alt=""
//                 className="w-full h-full object-contain"
//               />
//             </div>
//             <div>
//               <p className="font-semibold text-xs">Sarahmartins@gmail.com</p>
//               <p className="text-xs text-gray-500 !pt-1">
//                 Not in any teams yet
//               </p>
//             </div>
//           </div>
//           <button className="bg-white text-green-tint !px-4 !py-2 rounded-lg text-xs flex items-center gap-2 hover:opacity-85">
//             Invite <img src={userPlus} alt="" className="w-4 h-4" />
//           </button>
//         </div>
//         <button className="bg-green-tint flex justify-center w-full rounded-full gap-3 items-center !py-3 text-white !px-3 mt-6 hover:opacity-85  transition">
//           Continue
//         </button>
//       </div>
//     </div>
//   );
// };

// export default TeamInvite;

// import { useState } from "react";
// import { useParams } from "react-router-dom"; // Import useParams
// import profileImg from "../../../assets/img/dashboards/teams/avatar7.jpg";
// import userPlus from "../../../assets/img/dashboards/teams/users-plus.svg";
// import { RiCloseLargeLine } from "react-icons/ri";
// import { useAuth } from "../../../context/AuthContext";
// import { toast } from "sonner";

// const TeamInvite = ({ isOpen, setIsOpen }) => {
//   const { inviteTeamMember, loading } = useAuth(); // Get invite function from context
//   const { teamId } = useParams(); // Get teamId from the URL
//   const [memberEmail, setMemberEmail] = useState("");
//   const [error, setError] = useState("");

//   if (!isOpen) return null; // Hide modal when isOpen is false

//   const handleInvite = async (e) => {
//     e.preventDefault(); // Prevent default form submission behavior

//     if (!memberEmail.trim()) {
//       setError("Email is required");
//       return;
//     }
//     setError("");

//     try {
//       const response = await inviteTeamMember({ teamId, email: memberEmail });
//       console.log("Invitation sent:", response);
//       toast.success(response.message);
//       setMemberEmail(""); // Reset input field on success
//       setIsOpen(false); // Close the modal on success
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to invite member.");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
//       <div className="bg-white rounded-3xl !p-8 w-[100%] max-w-md shadow-lg relative">
//         <button
//           className="absolute left-1/2 transform -translate-x-1/2 -top-8 border-gray-200 border-[1px] text-gray-500 text-xl bg-white !p-3 rounded-full"
//           onClick={() => setIsOpen(false)} // Close modal
//         >
//           <RiCloseLargeLine />
//         </button>
//         <h2 className="text-2xl font-nueue font-extrabold text-center !my-8">
//           Add Member
//         </h2>

//         <form onSubmit={handleInvite}>
//           <input
//             type="text"
//             placeholder="Enter member email"
//             value={memberEmail}
//             onChange={(e) => setMemberEmail(e.target.value)}
//             className="w-full bg-whitish rounded-xl !p-2 !pl-3 !py-4 !mt-4 focus:outline-none !mb-2 text-sm"
//           />
//           {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
//           <button
//             type="submit"
//             className="bg-green-tint flex justify-center w-full rounded-full gap-3 items-center !py-3 text-white !px-3 mt-6 hover:opacity-85 transition"
//             disabled={loading} // Disable button when loading
//           >
//             {loading ? "Inviting..." : "Invite Member"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default TeamInvite;

import { useState } from "react";
import { useParams } from "react-router-dom";
import { RiCloseLargeLine } from "react-icons/ri";
import { useAuth } from "../../../context/AuthContext";
import { toast } from "sonner";

const TeamInvite = ({ isOpen, setIsOpen, teamName }) => {
  const { inviteTeamMember, modalLoading, setModalLoading } = useAuth(); // Make sure setModalLoading is from useAuth
  const { teamId } = useParams();
  const [memberEmail, setMemberEmail] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleInvite = async (e) => {
    e.preventDefault();

    if (!memberEmail.trim()) {
      setError("Email is required");
      return;
    }
    setError("");

    try {
      setModalLoading(true); // Start loading
      console.log("Submitting invite with email:", memberEmail);

      const response = await inviteTeamMember({ teamId, email: memberEmail });
      console.log("Invitation response", response);

      // toast.success(response.message);
      // sessionStorage.setItem("teamName", teamName); // Store the team name in session storage
      // sessionStorage.setItem("memberEmail", memberEmail);
      // setMemberEmail(""); // Reset email field on success
      // setIsOpen(false); // Close the modal on success
      toast.success(response.message);
      if (response?.status === "success") {
        sessionStorage.setItem("teamName", teamName); // Store the team name in session storage
        sessionStorage.setItem("memberEmail", memberEmail); // Store the member email in session storage

        setMemberEmail(""); // Reset email field on success
        setIsOpen(false); // Close the modal on success
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to invite member.");
    } finally {
      setModalLoading(false); // Reset loading state
      setIsOpen(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleInvite(e); // Manually trigger the invite function on Enter key press
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white rounded-3xl !p-8 w-[100%] max-w-md shadow-lg relative">
        <button
          className="absolute left-1/2 transform -translate-x-1/2 -top-8 border-gray-200 border-[1px] text-gray-500 text-xl bg-white !p-3 rounded-full"
          onClick={() => setIsOpen(false)} // Close the modal
        >
          <RiCloseLargeLine />
        </button>
        <h2 className="text-2xl font-nueue font-extrabold text-center !my-8">
          Add Member
        </h2>

        <form onSubmit={handleInvite}>
          <input
            type="email"
            placeholder="Enter member email"
            value={memberEmail}
            onChange={(e) => setMemberEmail(e.target.value)}
            onKeyDown={handleKeyPress} // Listen for Enter key press
            className="w-full bg-whitish rounded-xl !p-2 !pl-3 !py-4 !mt-4 focus:outline-none !mb-2 text-sm"
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <button
            type="submit"
            className="bg-green-tint flex justify-center w-full rounded-full gap-3 items-center !py-3 text-white !px-3 mt-6 hover:opacity-85 transition"
            disabled={modalLoading} // Disable button when loading is true
          >
            {modalLoading ? "Inviting..." : "Invite Member"}{" "}
            {/* Change text based on loading state */}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeamInvite;
