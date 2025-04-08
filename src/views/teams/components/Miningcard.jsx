// import { RiScales2Line } from "react-icons/ri";
// import { FiUserMinus } from "react-icons/fi";
// import { Link } from "react-router-dom";

// const Miningcard = ({
//   profile,
//   email,
//   teamCount,
//   onSeePerformance,
//   onRemove,
// }) => {
//   return (
//     <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-whitish !p-3 rounded-2xl">
//       {/* Image Section */}
//       <div className="flex gap-2.5 items-center">
//         <div className="w-14 h-14 flex-shrink-0">
//           <img
//             src={profile}
//             alt="Profile"
//             className="w-full h-full object-cover rounded-md"
//           />
//         </div>
//         <div className=" lg:w-  text-wrap">
//           <h3 className="font-extrabold text-sm -2/3 !text-wrap  ">{email}</h3>
//           <p className="text-gray-400 text-sm">
//             In {teamCount} team{teamCount > 1 ? "s" : ""}
//           </p>
//         </div>
//       </div>

//       {/* Actions Section */}
//       <div className="flex-1">
//         <div className="flex justify-end items-center gap-3">
//           <Link
//             to={"../performance"}
//             onClick={onSeePerformance}
//             className="bg-green-tint !p-2 text-nowrap !px-4 rounded-3xl text-white text-xs flex items-center gap-2"
//           >
//             See Performance <RiScales2Line />
//           </Link>
//           <button
//             onClick={onRemove}
//             className="text-xs flex items-center bg-white !p-2 gap-2 !px-4 text-red-500 rounded-3xl"
//           >
//             Remove <FiUserMinus className="w-3 h-3" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Miningcard;

import { RiScales2Line } from "react-icons/ri";
import { FiUserMinus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";

const Miningcard = ({
  profile,
  email,
  teamCount,
  onSeePerformance,
  onRemove,
  member,
  teamId,
}) => {
  console.log("memeber from cars", member);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // const handleRemoveClick = () => {
  //   setShowConfirmModal(true);
  // };
  // Get userId from member
  const { userId } = member;

  // Handle Remove button click
  const handleRemoveClick = () => {
    setShowConfirmModal(true);
    onRemove(teamId, userId); // Pass teamId and userId (which is memberId)
  };

  const handleConfirmRemove = () => {
    onRemove(member.teamId, member.userId);
    setShowConfirmModal(false);
  };

  const handleCancel = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className="relative flex flex-col lg:flex-row gap-4 items-center justify-between bg-whitish !p-3 rounded-2xl shadow-md">
      {/* Image & Info */}
      <div className="flex gap-2.5 items-center">
        <div className="w-14 h-14 flex-shrink-0">
          <img
            src={profile}
            alt="Profile"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div className="text-wrap">
          <h3 className="font-extrabold text-sm">{email}</h3>
          <p className="text-gray-400 text-sm">
            In {teamCount} team{teamCount > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex-1">
        <div className="flex justify-end items-center gap-3">
          <Link
            to={"../performance"}
            onClick={onSeePerformance}
            className="bg-green-tint !p-2 text-nowrap !px-4 rounded-3xl text-white text-xs flex items-center gap-2"
          >
            See Performance <RiScales2Line />
          </Link>
          <button
            onClick={handleRemoveClick}
            className="text-xs flex items-center bg-white !p-2 gap-2 !px-4 text-red-500 rounded-3xl"
          >
            Remove <FiUserMinus className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Confirm Remove Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000000c1] ">
          <div className="bg-white rounded-3xl p-6 shadow-xl max-w-sm w-full text-center">
            <h2 className="text-lg font-bold mb-2">Remove Member?</h2>
            <p className="text-sm text-gray-600 mb-5">
              Are you sure you want to remove <strong>{email}</strong> from this
              team?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleCancel}
                className="bg-gray-100 text-gray-700 py-2 px-4 rounded-full text-sm hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmRemove}
                className="bg-red-500 text-white py-2 px-4 rounded-full text-sm hover:bg-red-600 transition"
              >
                Yes, Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Miningcard;
