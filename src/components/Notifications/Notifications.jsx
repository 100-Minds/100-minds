import React from "react";
import { IoMdClose } from "react-icons/io";
import profile from "../../assets/img/dashboards/profile-two.jpg";

const Notifications = ({ closeDropdown }) => {
  return (
    <div
      className="fixed w-full left-0 inset-0 bg-black/50 h-screen to-0% z-[99999999999999] flex justify-end lg:justify-center items-start"
      onClick={closeDropdown} // Close when clicking outside the modal
    >
      <div
        className="absolute top-26 right-0 lg:right-20 w-92 bg-white shadow-lg rounded-lg z-50 border-[1px] border-gray-200"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
      >
        {/* Header with Close Button */}
        <div className="flex items-center justify-between !px-4  border-gray-200 ">
          <div className="flex justify-center w-full">
            <button
              onClick={closeDropdown} // Close when clicking the X button
              className="text-gray-500 hover:text-gray-700  -translate-y-3 bg-gray-200 !p-2 rounded-full "
            >
              <IoMdClose size={22} />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="!p-3 space-y-2 ">
          <div className="flex items-center justify-between gap-2.5">
            <div className="w-24 full rounded-3xl ">
              <img
                src={profile}
                alt=""
                className="w-full h-full object-cover !mb-3"
              />
            </div>

            <div className="bg-gray-100 !p-2 rounded-xl text-sm !mb-4">
              <span className="font-medium">Sarahmartins@gmail.com</span>{" "}
              accepted your invite request
              <p className="text-xs text-gray-500">Just now</p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-2.5">
            <div className="w-24 full rounded-3xl ">
              <img
                src={profile}
                alt=""
                className="w-full h-full object-cover !mb-3"
              />
            </div>

            <div className="bg-gray-100 !p-2 rounded-xl text-sm !mb-4">
              <span className="font-medium">Sarahmartins@gmail.com</span>{" "}
              accepted your invite request
              <p className="text-xs text-gray-500">Just now</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
