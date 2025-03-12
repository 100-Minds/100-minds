import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import img from "../assets/img/dashboards/sarah.png";
import { RiCloseLine } from "react-icons/ri";

const ProfileModal = ({ onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} // Background fade-in
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }} // Background fade-out
        transition={{ duration: 0.3 }}
        className="fixed inset-0 flex items-center justify-center bg-[#000000a5] z-[99999999] font-nueue"
      >
        {/* Modal Content with Pop-in Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="bg-white !p-6 rounded-lg shadow-lg w-full lg:max-w-xl relative"
        >
          {/* Close Button (Centered at the Top) */}
          <button
            onClick={onClose}
            className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-whitish !p-2 !px-3 rounded-full text-gray-600 hover:text-black font-bold"
          >
            <RiCloseLine size={24} />
          </button>

          {/* Profile Picture & Title */}
          <div className="flex flex-col items-center">
            <h1 className="text-3xl lg:text-3xl !py-4 tracking-tight">
              Profile Info
            </h1>
            <div className="w-20 h-20 bg-gray-300 rounded-full !mb-2">
              <img src={img} alt="Profile" />
            </div>
          </div>

          {/* Form */}
          <form className="grid grid-cols-2 gap-4 !mt-4">
            <div className="!pb-6">
              <label className="block text-sm font-semibold !pb-1">
                First Name
              </label>
              <input
                type="text"
                defaultValue="Sarah"
                className="w-full !p-3 bg-gray-200 rounded-3xl text-sm border-[0.75px] border-gray-200"
              />
            </div>

            <div className="!pb-6">
              <label className="block text-sm font-semibold !pb-1">
                Last Name
              </label>
              <input
                type="text"
                defaultValue="Adams"
                className="w-full !p-3 bg-gray-200 rounded-3xl text-sm border-[0.75px] border-gray-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold !pb-1">
                Username
              </label>
              <input
                type="text"
                defaultValue="Sarahadams"
                className="w-full !p-3 bg-gray-200 rounded-3xl text-sm border-[0.75px] border-gray-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold !pb-1">Email</label>
              <input
                type="email"
                defaultValue="Sarahadams@gmail.com"
                className="w-full !p-3 bg-gray-200 rounded-3xl text-sm border-[0.75px] border-gray-200"
              />
            </div>
          </form>

          {/* Save Changes Button */}
          <div className="!mt-6 text-center">
            <button className="!px-6 !py-2 bg-green-tint text-white text-sm font-bold rounded-3xl transition hover:scale-105">
              Save Changes
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProfileModal;
