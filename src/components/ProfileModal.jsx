// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useAuth } from "../context/AuthContext"; // Import AuthContext
// import { RiCloseLine } from "react-icons/ri";
// import img from "../assets/img/dashboards/sarah.png";

// const ProfileModal = ({ onClose, profileData, refreshSidebar }) => {
//   const { updateUserProfile } = useAuth(); // Get update function from AuthContext
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     username: "",
//     email: "",
//   });
//   const [loading, setLoading] = useState(false);

//   // Populate form data when profileData changes
//   useEffect(() => {
//     if (profileData) {
//       setFormData((prev) => ({
//         firstName: profileData.firstName ?? prev.firstName,
//         lastName: profileData.lastName ?? prev.lastName,
//         username: profileData.username ?? prev.username,
//         email: profileData.email ?? prev.email,
//       }));
//     }
//   }, [profileData]);

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle form submission
//   const handleSaveChanges = async () => {
//     setLoading(true);
//     try {
//       const updatedData = {
//         firstName: formData.firstName || profileData.firstName,
//         lastName: formData.lastName || profileData.lastName,
//         username: formData.username || profileData.username,
//         email: formData.email || profileData.email,
//       };

//       await updateUserProfile(updatedData); // Call API
//       refreshSidebar(); // Refresh sidebar to reflect changes
//       onClose(); // Close modal after update
//     } catch (error) {
//       console.error("Profile update failed:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 0.3 }}
//         className="fixed inset-0 flex items-center justify-center bg-[#000000a5] z-[99999999] font-nueue"
//       >
//         {/* Modal Content */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.8 }}
//           transition={{ duration: 0.6, ease: "easeInOut" }}
//           className="bg-white !p-6 rounded-lg shadow-lg w-full lg:max-w-xl relative"
//         >
//           {/* Close Button */}
//           <button
//             onClick={onClose}
//             className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-whitish !p-2 !px-3 rounded-full text-gray-600 hover:text-black font-bold"
//           >
//             <RiCloseLine size={24} />
//           </button>

//           {/* Profile Info */}
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
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 className="w-full !p-3 bg-gray-200 rounded-3xl text-sm border-[0.75px] border-gray-200"
//               />
//             </div>

//             <div className="!pb-6">
//               <label className="block text-sm font-semibold !pb-1">
//                 Last Name
//               </label>
//               <input
//                 type="text"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 className="w-full !p-3 bg-gray-200 rounded-3xl text-sm border-[0.75px] border-gray-200"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold !pb-1">
//                 Username
//               </label>
//               <input
//                 type="text"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 className="w-full !p-3 bg-gray-200 rounded-3xl text-sm border-[0.75px] border-gray-200"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold !pb-1">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full !p-3 bg-gray-200 rounded-3xl text-sm border-[0.75px] border-gray-200"
//               />
//             </div>
//           </form>

//           {/* Save Changes Button */}
//           <div className="!mt-6 text-center">
//             <button
//               className="!px-6 !py-2 bg-green-tint text-white text-sm font-bold rounded-3xl transition hover:scale-105"
//               onClick={handleSaveChanges}
//               disabled={loading}
//             >
//               {loading ? "Saving..." : "Save Changes"}
//             </button>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default ProfileModal;

// import React, { useEffect, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { useAuth } from "../context/AuthContext";
// import { RiCloseLine } from "react-icons/ri";
// import imgPlaceholder from "../assets/img/dashboards/sarah.png";
// import axios from "axios";
// import { toast } from "sonner";

// const ProfileModal = ({ onClose, profileData, refreshSidebar }) => {
//   const { updateUserProfile } = useAuth();
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     username: "",
//     email: "",
//     profileImage: "",
//   });
//   const [imagePreview, setImagePreview] = useState(imgPlaceholder);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [uploading, setUploading] = useState(false);
//   const [previousProfileImage, setPreviousProfileImage] = useState(null);

//   useEffect(() => {
//     if (profileData && profileData.profileImage) {
//       setFormData((prev) => ({
//         ...prev,
//         profileImage: profileData.profileImage,
//       }));
//       setImagePreview(profileData.profileImage);
//       setPreviousProfileImage(profileData.profileImage);
//     } else {
//       setImagePreview(imgPlaceholder);
//       setPreviousProfileImage(imgPlaceholder);
//     }
//     // Check for a file in sessionStorage on component mount
//     const storedFile = sessionStorage.getItem("selectedFile");
//     if (storedFile) {
//       setSelectedFile(JSON.parse(storedFile));
//       setImagePreview(JSON.parse(storedFile).preview);
//     }
//   }, [profileData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const preview = URL.createObjectURL(file);
//       const fileObject = {
//         name: file.name,
//         type: file.type,
//         size: file.size,
//         lastModified: file.lastModified,
//         preview: preview,
//       };
//       setSelectedFile(fileObject);
//       setImagePreview(preview);
//       sessionStorage.setItem("selectedFile", JSON.stringify(fileObject));
//       console.log("selected File", file);
//     } else {
//       setSelectedFile(null);
//       setImagePreview(previousProfileImage);
//       sessionStorage.removeItem("selectedFile");
//       console.log("selected null");
//     }
//   };

//   const handleUploadImage = async () => {
//     const storedFile = sessionStorage.getItem("selectedFile");
//     if (!storedFile) {
//       toast.error("Please select an image first!");
//       return;
//     }
//     const file = JSON.parse(storedFile);
//     setUploading(true);
//     try {
//       const uploadFormData = new FormData();
//       uploadFormData.append(
//         "file",
//         new File([await fetch(file.preview).then((r) => r.blob())], file.name, {
//           type: file.type,
//         })
//       );
//       const response = await axios.post(
//         "https://backend-5781.onrender.com/api/v1/user/upload-profile-picture",
//         uploadFormData,
//         { withCredentials: true }
//       );
//       if (response.status === 200) {
//         toast.success("Profile picture updated successfully!");
//         setFormData((prev) => ({
//           ...prev,
//           profileImage: response.data.data[0].photo,
//         }));
//         setImagePreview(response.data.data[0].photo);
//         setPreviousProfileImage(response.data.data[0].photo);
//         refreshSidebar();
//         sessionStorage.removeItem("selectedFile");
//       } else {
//         throw new Error(response.data.message || "Failed to upload image");
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || error.message);
//       setImagePreview(previousProfileImage);
//     } finally {
//       setUploading(false);
//     }
//   };

//   const handleSaveChanges = async () => {
//     setLoading(true);
//     try {
//       await updateUserProfile(formData);
//       refreshSidebar();
//       onClose();
//     } catch (error) {
//       console.error("Profile update failed:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AnimatePresence>
//       <motion.div className="fixed inset-0 flex items-center justify-center bg-[#000000a5] z-50">
//         <motion.div className="bg-white p-6 rounded-lg shadow-lg w-full lg:max-w-xl relative">
//           <button
//             onClick={onClose}
//             className="absolute -top-5 left-1/2 transform -translate-x-1/2 p-2 px-3 rounded-full"
//           >
//             <RiCloseLine size={24} />
//           </button>
//           <div className="flex flex-col items-center">
//             <h1 className="text-3xl py-4">Profile Info</h1>
//             <div className="relative w-20 h-20 bg-gray-300 rounded-full mb-2 overflow-hidden">
//               <img
//                 src={imagePreview}
//                 alt="Profile"
//                 className="w-full h-full object-cover"
//               />
//               <label
//                 htmlFor="profileImage"
//                 className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-xs opacity-0 hover:opacity-100 cursor-pointer"
//               >
//                 Change
//               </label>
//               <input
//                 type="file"
//                 id="profileImage"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="hidden"
//               />
//             </div>
//             <button
//               onClick={handleUploadImage}
//               disabled={uploading}
//               className="px-4 py-2 bg-blue-500 text-white rounded mt-2"
//             >
//               {uploading ? "Uploading..." : "Upload Image"}
//             </button>
//           </div>
//           <form className="grid grid-cols-2 gap-4 mt-4">
//             <div>
//               <label className="block text-sm font-semibold pb-1">
//                 First Name
//               </label>
//               <input
//                 type="text"
//                 name="firstName"
//                 value={formData.firstName}
//                 onChange={handleChange}
//                 className="w-full p-3 bg-gray-200 rounded"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold pb-1">
//                 Last Name
//               </label>
//               <input
//                 type="text"
//                 name="lastName"
//                 value={formData.lastName}
//                 onChange={handleChange}
//                 className="w-full p-3 bg-gray-200 rounded"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold pb-1">
//                 Username
//               </label>
//               <input
//                 type="text"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleChange}
//                 className="w-full p-3 bg-gray-200 rounded"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold pb-1">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="w-full p-3 bg-gray-200 rounded"
//               />
//             </div>
//           </form>
//           <div className="mt-6 text-center">
//             <button
//               onClick={handleSaveChanges}
//               disabled={loading}
//               className="px-6 py-2 bg-green-500 text-white rounded"
//             >
//               {loading ? "Saving..." : "Save Changes"}
//             </button>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default ProfileModal;

// import React, { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { RiCloseLine } from "react-icons/ri";
// import img from "../assets/img/dashboards/sarah.png"; // Default image
// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import { toast } from "sonner"; // Import Sonner Toast for notifications

// const ProfileModal = ({
//   onClose,
//   profileData, // This should contain the current user's profile data
//   refreshSidebar,
// }) => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [imagePreview, setImagePreview] = useState(img); // Default image
//   const [loading, setLoading] = useState(false);
//   const { updateUserProfile } = useAuth();
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     username: "",
//     email: "",
//   });
//   const fileInputRef = useRef(null);

//   // Fetch the profile data and set it as initial form values
//   useEffect(() => {
//     if (profileData) {
//       // Set the form data only if profileData is available
//       setFormData({
//         firstName: profileData.firstName || "",
//         lastName: profileData.lastName || "",
//         username: profileData.username || "",
//         email: profileData.email || "",
//       });
//       setImagePreview(profileData.profilePicture || img); // Default to current image if available
//     }
//   }, [profileData]);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setSelectedImage(file);
//       setImagePreview(URL.createObjectURL(file)); // Preview image
//     }
//   };

//   // Handle form data changes
//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSaveChanges = async () => {
//     setLoading(true);
//     try {
//       const updatedData = { ...formData };

//       // If an image is selected, upload the image first
//       if (selectedImage) {
//         const formData = new FormData();
//         formData.append("photo", selectedImage);

//         // Upload the image
//         const uploadResponse = await axios.post(
//           "https://backend-5781.onrender.com/api/v1/user/upload-profile-picture",
//           formData,
//           {
//             withCredentials: true,
//             headers: {
//               "Content-Type": "multipart/form-data",
//               accept: "application/json",
//             },
//           }
//         );

//         if (uploadResponse.data) {
//           updatedData.profilePicture = uploadResponse.data.profilePicture;
//         }
//       }

//       // Update user profile with new data
//       const updateResponse = await updateUserProfile(updatedData);

//       // Assuming the update is successful, refresh the sidebar
//       refreshSidebar();
//       onClose(); // Close the modal after updating
//       toast.success("Profile updated successfully!"); // Success message
//     } catch (error) {
//       console.error("Error during saving changes", error);
//       toast.error("Failed to update profile. Please try again."); // Error message
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AnimatePresence>
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         exit={{ opacity: 0 }}
//         transition={{ duration: 0.3 }}
//         className="fixed inset-0 flex items-center justify-center bg-[#000000a5] z-[99999999] font-nueue"
//       >
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           animate={{ opacity: 1, scale: 1 }}
//           exit={{ opacity: 0, scale: 0.8 }}
//           transition={{ duration: 0.6, ease: "easeInOut" }}
//           className="bg-white !p-6 rounded-lg shadow-lg w-full lg:max-w-xl relative"
//         >
//           {/* Close Button */}
//           <button
//             onClick={onClose}
//             className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-whitish !p-2 !px-3 rounded-full text-gray-600 hover:text-black font-bold"
//           >
//             <RiCloseLine size={24} />
//           </button>

//           {/* Profile Info Form */}
//           <div className="flex flex-col items-center">
//             <h1 className="text-3xl lg:text-3xl !py-4 tracking-tight">
//               Profile Info
//             </h1>

//             {/* Profile Image */}
//             <div className="relative">
//               <img
//                 src={imagePreview}
//                 alt="Profile"
//                 className="w-20 h-20 bg-gray-300 rounded-full !mb-2 object-cover"
//               />
//               <button
//                 onClick={() => fileInputRef.current.click()}
//                 className="absolute bottom-0 right-0 bg-green-tint text-white text-sm font-bold px-3 py-1 rounded-full hover:scale-105 transition-all"
//               >
//                 Change
//               </button>
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 className="hidden"
//                 accept="image/*"
//                 onChange={handleFileChange}
//               />
//             </div>

//             <form className="grid grid-cols-2 gap-4 !my-4 w-full">
//               <div className="!pb-6">
//                 <label className="block text-sm font-semibold !pb-1">
//                   First Name
//                 </label>
//                 <input
//                   type="text"
//                   name="firstName"
//                   value={formData.firstName}
//                   onChange={handleInputChange}
//                   className="w-full !p-3 bg-gray-200 rounded-3xl text-sm border-[0.75px] border-gray-200"
//                 />
//               </div>

//               <div className="!pb-6">
//                 <label className="block text-sm font-semibold !pb-1">
//                   Last Name
//                 </label>
//                 <input
//                   type="text"
//                   name="lastName"
//                   value={formData.lastName}
//                   onChange={handleInputChange}
//                   className="w-full !p-3 bg-gray-200 rounded-3xl text-sm border-[0.75px] border-gray-200"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold !pb-1">
//                   Username
//                 </label>
//                 <input
//                   type="text"
//                   name="username"
//                   value={formData.username}
//                   onChange={handleInputChange}
//                   className="w-full !p-3 bg-gray-200 rounded-3xl text-sm border-[0.75px] border-gray-200"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold !pb-1">
//                   Email
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleInputChange}
//                   disabled // Disable the email field
//                   className="w-full !p-3 bg-gray-200 rounded-3xl text-sm border-[0.75px] border-gray-200"
//                 />
//               </div>
//             </form>

//             {/* Save Changes Button */}
//             <div className="!mt-6 text-center w-full">
//               <button
//                 className="!px-6 !py-2 bg-green-tint text-white text-sm font-bold rounded-3xl transition hover:scale-105"
//                 onClick={handleSaveChanges}
//                 disabled={loading}
//               >
//                 {loading ? "Saving..." : "Save Changes"}
//               </button>
//             </div>
//           </div>
//         </motion.div>
//       </motion.div>
//     </AnimatePresence>
//   );
// };

// export default ProfileModal;
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RiCloseLine } from "react-icons/ri";
import img from "../assets/img/dashboards/sarah.png"; // Default image
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";
import EventBus from "../utils/EventBus";

const ProfileModal = ({ onClose, refreshSidebar, profileInfoData }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(img); // ✅ Default image
  const [loading, setLoading] = useState(false);
  const { updateUserProfile, setUser } = useAuth();
  const fileInputRef = useRef(null);

  // Form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState(""); // ✅ Remove photo from the payload
  const userRef = useRef(null); // ✅ Store original user info

  useEffect(() => {
    const userFromSession = sessionStorage.getItem("loggedInUser");

    if (userFromSession) {
      try {
        const userData = JSON.parse(userFromSession);
        userRef.current = userData; // ✅ Save original user data
        setFirstName(userData.firstName || "");
        setLastName(userData.lastName || "");
        setUsername(userData.username || "");
        setEmail(userData.email || "");
        setPhoto(userData.photo || "");
        setImagePreview(userData.photo || "");

        // Use session photo or default image
        const loadedImage = userData.photo;
        setImagePreview(loadedImage);
        console.log(loadedImage);
      } catch (err) {
        console.error("Error parsing user from session:", err);
      }
    }
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreview(URL.createObjectURL(file)); // ✅ Show new preview
    }
  };

  const handleSaveChanges = async () => {
    setLoading(true);

    try {
      // const updatedData = {};

      // if (firstName.trim() !== userRef.current?.firstName) {
      //   updatedData.firstName = firstName.trim();
      // }
      // if (lastName.trim() !== userRef.current?.lastName) {
      //   updatedData.lastName = lastName.trim();
      // }
      // if (username.trim() !== userRef.current?.username) {
      //   updatedData.username = username.trim();
      // }
      const updatedData = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        username: username.trim(),
      };

      await updateUserProfile(updatedData);

      // ✅ Merge old + new data and update session storage
      sessionStorage.setItem(
        "loggedInUser",
        JSON.stringify({ ...userRef.current, ...updatedData })
      );

      console.log("updated data", updatedData);
      // ✅ Upload image if new image selected
      if (selectedImage) {
        const formData = new FormData();
        formData.append("photo", selectedImage);

        const uploadResponse = await axios.post(
          "https://backend-5781.onrender.com/api/v1/user/upload-profile-picture",
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
              accept: "application/json",
            },
          }
        );
        console.log("uploadResponse", uploadResponse.data.data);
        console.log("uploaded photo URL:", uploadResponse.data.data[0]?.photo);

        // Only update photo in the user data if image was successfully uploaded

        if (uploadResponse.data.data[0]?.photo) {
          const uploadedPhoto = uploadResponse.data.data[0]?.photo;
          updatedData.photo = uploadedPhoto;

          const updatedSessionUser = {
            ...userRef.current,
            ...updatedData,
            photo: uploadedPhoto,
          };
          sessionStorage.setItem(
            "loggedInUser",
            JSON.stringify(updatedSessionUser)
          );
          // setUser(updatedSessionUser);
          userRef.current = updatedSessionUser; // ✅ <-- This line fixes it
          setImagePreview(uploadedPhoto);
        }
      }

      // refreshSidebar(); // ✅ Refresh sidebar display
      EventBus.dispatchEvent(new Event("profileUpdated"));
      onClose(); // ✅ Close modal
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error during saving changes", error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  console.log("modal profile", profileInfoData);
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center bg-[#000000a5] z-[99999999] font-nueue"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="bg-white !p-6 rounded-lg shadow-lg w-full lg:max-w-xl relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute -top-5 left-1/2 transform -translate-x-1/2 bg-whitish !p-2 !px-3 rounded-full text-gray-600 hover:text-black font-bold"
          >
            <RiCloseLine size={24} />
          </button>

          <div className="flex flex-col items-center">
            <h1 className="text-3xl py-4 tracking-tight">Profile Info</h1>

            {/* Profile Image */}
            {/* <div className="relative">
              <img
                src={imagePreview || img} // ✅ Always fallback to default image
                alt="Profile"
                className="w-20 h-20 bg-gray-300 rounded-full mb-2 object-cover"
              />
              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute w-20 h-20 top-0 right-0 bg-gray-400 hidden text-white text-sm font-bold px-3 py-1 rounded-full hover:scale-105 transition-all hover:block"
              >
                Change
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div> */}

            {/* Profile Image */}
            <div className="relative group">
              <img
                src={imagePreview || img}
                alt="Profile"
                className="w-20 h-20 bg-gray-300 rounded-full mb-2 object-cover"
              />

              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute w-20 h-20 top-0 right-0 bg-black bg-opacity-50 text-white text-sm font-bold rounded-full transition-all hidden group-hover:flex items-center justify-center"
              >
                Change
              </button>

              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>

            {/* Form */}
            <form className="grid grid-cols-2 gap-4 my-4 w-full">
              <div className="pb-6">
                <label className="block text-sm font-semibold pb-1">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-3 bg-gray-200 rounded-3xl text-sm border-[0.75px] border-gray-200"
                />
              </div>

              <div className="pb-6">
                <label className="block text-sm font-semibold pb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-3 bg-gray-200 rounded-3xl text-sm border-[0.75px] border-gray-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold pb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-3 bg-gray-200 rounded-3xl text-sm border-[0.75px] border-gray-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold pb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full p-3 bg-gray-200 rounded-3xl text-sm border-[0.75px] border-gray-200"
                />
              </div>
            </form>

            {/* Save Changes Button */}
            <div className="mt-6 text-center w-full">
              <button
                className="px-6 py-2 bg-green-tint text-white text-sm font-bold rounded-3xl transition hover:scale-105"
                onClick={handleSaveChanges}
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProfileModal;
