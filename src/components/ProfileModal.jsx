// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import img from "../assets/img/dashboards/sarah.png";
// import { RiCloseLine } from "react-icons/ri";

// const ProfileModal = ({ onClose, profileData }) => {
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     username: "",
//     email: "",
//   });

//   useEffect(() => {
//     if (profileData) {
//       setFormData({
//         firstName: profileData.firstName ?? "",
//         lastName: profileData.lastName ?? "",
//         username: profileData.username ?? "",
//         email: profileData.email ?? "",
//       });
//     }
//   }, [profileData]);
//   console.log("profile datamodal", profileData);
//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }} // Background fade-in
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }} // Background fade-out
//         transition={{ duration: 0.3 }}
//         className="fixed inset-0 flex items-center justify-center bg-[#000000a5] z-[99999999] font-nueue"
//       >
//         {/* Modal Content with Pop-in Animation */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.8 }}
//           transition={{ duration: 0.6, ease: "easeInOut" }}
//           className="bg-white !p-6 rounded-lg shadow-lg w-full lg:max-w-xl relative"
//         >
//           {/* Close Button (Centered at the Top) */}
//           <button
//             onClick={onClose}
//             className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-whitish !p-2 !px-3 rounded-full text-gray-600 hover:text-black font-bold"
//           >
//             <RiCloseLine size={24} />
//           </button>

//           {/* Profile Picture & Title */}
//           <div className="flex flex-col items-center">
//             <h1 className="text-3xl lg:text-3xl !py-4 tracking-tight">
//               Profile Info
//             </h1>
//             <div className="w-20 h-20 bg-gray-300 rounded-full !mb-2">
//               <img src={img} alt="Profile" />
//             </div>
//           </div>

//           {/* Form */}
//           <form className="grid grid-cols-2 gap-4 !mt-4">
//             <div className="!pb-6">
//               <label className="block text-sm font-semibold !pb-1">
//                 First Name
//               </label>
//               <input
//                 type="text"
//                 // defaultValue="Sarah"
//                 defaultValue={profileData?.firstName}
//                 className="w-full !p-3 bg-gray-200 rounded-3xl text-sm border-[0.75px] border-gray-200"
//               />
//             </div>

//             <div className="!pb-6">
//               <label className="block text-sm font-semibold !pb-1">
//                 Last Name
//               </label>
//               <input
//                 type="text"
//                 value={formData.lastName}
//                 onChange={(e) =>
//                   setFormData({ ...formData, lastName: e.target.value })
//                 }
//                 className="w-full !p-3 bg-gray-200 rounded-3xl text-sm border-[0.75px] border-gray-200"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold !pb-1">
//                 Username
//               </label>
//               <input
//                 type="text"
//                 // defaultValue="Sarahadams"
//                 defaultValue={profileData?.username}
//                 className="w-full !p-3 bg-gray-200 rounded-3xl text-sm border-[0.75px] border-gray-200"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold !pb-1">Email</label>
//               <input
//                 type="email"
//                 // defaultValue="Sarahadams@gmail.com"
//                 defaultValue={profileData?.email}
//                 className="w-full !p-3 bg-gray-200 rounded-3xl text-sm border-[0.75px] border-gray-200"
//               />
//             </div>
//           </form>

//           {/* Save Changes Button */}
//           <div className="!mt-6 text-center">
//             <button className="!px-6 !py-2 bg-green-tint text-white text-sm font-bold rounded-3xl transition hover:scale-105">
//               Save Changes
//             </button>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default ProfileModal;
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext"; // Import AuthContext
import { RiCloseLine } from "react-icons/ri";
import img from "../assets/img/dashboards/sarah.png";

const ProfileModal = ({ onClose, profileData, refreshSidebar }) => {
  const { updateUserProfile } = useAuth(); // Get update function from AuthContext
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);

  // Populate form data when profileData changes
  useEffect(() => {
    if (profileData) {
      setFormData((prev) => ({
        firstName: profileData.firstName ?? prev.firstName,
        lastName: profileData.lastName ?? prev.lastName,
        username: profileData.username ?? prev.username,
        email: profileData.email ?? prev.email,
      }));
    }
  }, [profileData]);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSaveChanges = async () => {
    setLoading(true);
    try {
      const updatedData = {
        firstName: formData.firstName || profileData.firstName,
        lastName: formData.lastName || profileData.lastName,
        username: formData.username || profileData.username,
        email: formData.email || profileData.email,
      };

      await updateUserProfile(updatedData); // Call API
      refreshSidebar(); // Refresh sidebar to reflect changes
      onClose(); // Close modal after update
    } catch (error) {
      console.error("Profile update failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 flex items-center justify-center bg-[#000000a5] z-[99999999] font-nueue"
      >
        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="bg-white !p-6 rounded-lg shadow-lg w-full lg:max-w-xl relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-whitish !p-2 !px-3 rounded-full text-gray-600 hover:text-black font-bold"
          >
            <RiCloseLine size={24} />
          </button>

          {/* Profile Info */}
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
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full !p-3 bg-gray-200 rounded-3xl text-sm border-[0.75px] border-gray-200"
              />
            </div>

            <div className="!pb-6">
              <label className="block text-sm font-semibold !pb-1">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full !p-3 bg-gray-200 rounded-3xl text-sm border-[0.75px] border-gray-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold !pb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full !p-3 bg-gray-200 rounded-3xl text-sm border-[0.75px] border-gray-200"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold !pb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full !p-3 bg-gray-200 rounded-3xl text-sm border-[0.75px] border-gray-200"
              />
            </div>
          </form>

          {/* Save Changes Button */}
          <div className="!mt-6 text-center">
            <button
              className="!px-6 !py-2 bg-green-tint text-white text-sm font-bold rounded-3xl transition hover:scale-105"
              onClick={handleSaveChanges}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProfileModal;
