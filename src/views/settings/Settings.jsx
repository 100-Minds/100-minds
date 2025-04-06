import { useEffect, useState } from "react";
import NavHeader from "../../layouts/NavHeader";
import ProfileModal from "../../components/ProfileModal";
import { useAuth } from "../../context/AuthContext";
import Loader2 from "../../components/Loaders/Loader2";
import EventBus from "../../utils/EventBus";

const languages = ["English", "French", "Spanish"];
const timezones = ["GMT", "UTC", "EST", "CST", "WAT"];

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("English");
  const [timezone, setTimezone] = useState("WAT");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [profileInfo, setProfileInfo] = useState([]);
  const { getProfileData, loading } = useAuth();
  const handleProfileModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  const profileDataInfo = JSON.parse(sessionStorage.getItem("loggedInUser"));
  console.log(profileDataInfo);

  useEffect(() => {
    const fetchAProfileInfo = async () => {
      try {
        const data = await getProfileData();
        setProfileInfo(data?.data || []);
      } catch (error) {
        console.error("Error fetching rprofile:", error);
      }
    };

    fetchAProfileInfo();
  }, []);
  const fetchUserDataAgain = async () => {
    try {
      const data = await getProfileData();
      setProfileInfo(data?.data || []);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };
  useEffect(() => {
    const handleProfileUpdate = () => {
      // 👇 Fetch new profile data
      fetchUserDataAgain();
    };

    EventBus.addEventListener("profileUpdated", handleProfileUpdate);

    return () => {
      EventBus.removeEventListener("profileUpdated", handleProfileUpdate);
    };
  }, []);
  console.log("profileInfo", profileInfo);
  return (
    <div className="h-full w-full overflow-hidden !py-4">
      <div className="bg-[#F3F3F3] overflow-scroll scroll-hide h-full rounded-3xl !mx-3 ">
        {loading ? (
          <Loader2 />
        ) : (
          <>
            <div className="backdrop-blur-xs !py-4 lg:!px-10 px-6 sticky top-0 z-40">
              <NavHeader header={"SETTINGS"} />
            </div>
            <div className="mx-6 lg:mx-10 bg-white shadow-lg rounded-2xl p-6 md:my-6 md:p-10">
              {/* <h2 className="text-2xl font-semibold mb-6">Settings</h2> */}

              {/* Profile Section */}
              <section className="flex items-center justify-between gap-4 mb-10">
                <div className="flex items-center gap-4">
                  <img
                    // src="https://i.pravatar.cc/100"
                    src={profileInfo[0]?.photo}
                    alt="avatar"
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-lg font-semibold">
                      {profileInfo[0]?.firstName} {profileInfo[0]?.lastName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {profileInfo[0]?.email}
                    </p>
                  </div>
                </div>
                <button
                  className="bg-green-tint text-white px-4 py-2 rounded-full hover:opacity-85"
                  onClick={handleProfileModal}
                >
                  Edit Profile
                </button>
              </section>

              {/* Preferences */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                {/* Dark Mode */}
                <div className="flex items-center justify-between bg-gray-50 p-4 rounded-xl">
                  <div>
                    <h4 className="font-medium">Dark Mode</h4>
                    <p className="text-sm text-gray-500">Toggle dark theme</p>
                  </div>
                  <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                      darkMode ? "bg-green-tint" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        darkMode ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Language Selector */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <label className="block font-medium mb-1">Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    {languages.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Timezone Selector */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <label className="block font-medium mb-1">Timezone</label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  >
                    {timezones.map((tz) => (
                      <option key={tz} value={tz}>
                        {tz}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Password */}
              <div className="bg-gray-50 p-4 rounded-xl mb-10">
                <h4 className="font-medium mb-1">Password</h4>
                <p className="text-sm text-gray-500 mb-3">
                  Want to change your password?
                </p>
                <button className="text-green-tint hover:underline font-medium">
                  Change Password
                </button>
              </div>

              {/* Danger Zone */}
              <div className="bg-red-50 p-4 rounded-xl border border-red-200">
                <h4 className="text-red-600 font-semibold">Danger Zone</h4>
                <p className="text-sm text-red-500 mb-3">
                  Deleting your account is irreversible. Please proceed with
                  caution.
                </p>
                <button className="text-sm text-red-600 underline hover:text-red-800 font-medium">
                  Delete Account
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      {isModalOpen && (
        <ProfileModal
          onClose={handleProfileModal}
          profileInfoData={profileInfo}
        />
      )}
    </div>
  );
};

export default SettingsPage;
