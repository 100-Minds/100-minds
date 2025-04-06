import { RiScales2Line } from "react-icons/ri";
import { FiUserMinus } from "react-icons/fi";
import { Link } from "react-router-dom";

const Miningcard = ({
  profile,
  email,
  teamCount,
  onSeePerformance,
  onRemove,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between bg-whitish !p-3 rounded-2xl">
      {/* Image Section */}
      <div className="flex gap-2.5 items-center">
        <div className="w-14 h-14 flex-shrink-0">
          <img
            src={profile}
            alt="Profile"
            className="w-full h-full object-cover rounded-md"
          />
        </div>
        <div className=" lg:w-  text-wrap">
          <h3 className="font-extrabold text-sm -2/3 !text-wrap  ">{email}</h3>
          <p className="text-gray-400 text-sm">
            In {teamCount} team{teamCount > 1 ? "s" : ""}
          </p>
        </div>
      </div>

      {/* Actions Section */}
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
            onClick={onRemove}
            className="text-xs flex items-center bg-white !p-2 gap-2 !px-4 text-red-500 rounded-3xl"
          >
            Remove <FiUserMinus className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Miningcard;
