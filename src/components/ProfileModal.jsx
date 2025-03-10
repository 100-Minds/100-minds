import React from "react";

const ProfileModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#000000d4] z-[9999999999]">
      <div className="bg-white !p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black font-bold"
        >
          ✖
        </button>

        {/* Profile Picture & Title */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-gray-300 rounded-full !mb-2"></div>{" "}
          {/* Placeholder for Profile Picture */}
          <h1 className="text-3xl lg:text-5xl font-bebas">Profile Info</h1>
        </div>

        {/* Form */}
        <form className="grid grid-cols-2 gap-4 !mt-4">
          <div>
            <label className="block text-sm font-semibold">First Name</label>
            <input
              type="text"
              defaultValue="Sarah"
              className="w-full !p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">Last Name</label>
            <input
              type="text"
              defaultValue="Adams"
              className="w-full !p-2 border rounded"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-semibold">Verify Email</label>
            <input
              type="email"
              defaultValue="Sarahadams@gmail.com"
              className="w-full !p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">Username</label>
            <input
              type="text"
              defaultValue="Sarahadams"
              className="w-full !p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">Email</label>
            <input
              type="email"
              defaultValue="Sarahadams@gmail.com"
              className="w-full !p-2 border rounded"
            />
          </div>
        </form>

        {/* Save Changes Button */}
        <div className="!mt-6 text-center">
          <button className="!px-6 !py-2 bg-black text-white font-bold rounded-lg">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
