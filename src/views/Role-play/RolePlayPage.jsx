import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import Loader2 from "../../components/Loaders/Loader2";
import NavHeader from "../../layouts/NavHeader";

const RolePlayPage = () => {
  const { loading, getRolePlays } = useAuth();
  useEffect(() => {
    const fetchRolePlays = async () => {
      try {
        const data = await getRolePlays(); // Fetch profile data
        // setJourneyCourse(data.data); // Store it in state
        console.log("object");
        // console.log(journeyCourse);
        console.log(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchRolePlays();
  }, []);
  return (
    <div className="h-full w-full overflow-hidden !py-4 ">
      <div className="bg-[#F3F3F3] overflow-scroll scroll-hide h-full rounded-3xl !mx-3">
        {loading && (
          <div>
            <Loader2 />
          </div>
        )}
        <div className="backdrop-blur-xs !py-4 !px-10 sticky top-0 z-40">
          <NavHeader header={"ROLE PLAY"} />
        </div>
      </div>
    </div>
  );
};

export default RolePlayPage;
