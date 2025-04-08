import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom"; // For accessing the URL query parameters
import Logo from "../../assets/img/dashboards/100minds-logo.png"; // Adjust path to where your logo is stored
import { toast } from "sonner"; // Import Sonner for toast notifications

const TeamJoin = () => {
  const [loading, setLoading] = useState(false);
  const [inviteLink, setInviteLink] = useState(""); // Store inviteLink in state

  // Use the useLocation hook to get the current URL
  const location = useLocation();

  // Extract inviteLink from URL query parameters when the component mounts
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    console.log("prm", params);
    const link = params.get("invite"); // Get the inviteLink from URL parameters
    console.log("LINK", link);
    if (link) {
      setInviteLink(link); // Set inviteLink to state if it's available
    }
  }, [location]);

  // Handle form submission (API call)
  const handleJoinTeam = async () => {
    if (!inviteLink) {
      toast.error("Invalid or missing invite link.");
      return;
    }

    setLoading(true);

    try {
      // Make the API call with the inviteLink from the URL
      const response = await axios.get(
        `https://backend-5781.onrender.com/api/v1/team/join-team?inviteLink=${inviteLink}`,
        {
          withCredentials: true,
        }
      );

      console.log("response", response);

      if (response.status === 200) {
        // Display success message with Sonner toast
        toast.success("Successfully joined the team!");
      }
    } catch (err) {
      // Display error message with Sonner toast
      toast.error(err.data);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen font-nueue flex justify-center items-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-4xl border shadow border-gray-100 w-full max-w-lg p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="h-16" />
        </div>

        <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Join Your Team
        </h1>

        <p className="text-gray-600 text-center mb-4">
          Welcome! To join the team, we will automatically use the invite link
          provided in the URL. Please click "Join Now" to continue.
        </p>

        {/* Button to trigger the API call */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleJoinTeam}
            className="w-full py-3 px-4 text-white bg-green-tint rounded-3xl hover:opacity-85 focus:outline-none focus:ring-1 focus:ring-green-tint transition"
            disabled={loading}
          >
            {loading ? "Joining..." : "Join Now"}
          </button>
        </div>

        {/* Back Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => window.history.back()}
            className="text-green-tint hover:opacity-85 font-semibold text-sm"
          >
            &larr; Back to Teams
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamJoin;
