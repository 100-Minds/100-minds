// import React, { useState } from "react";
// import { useAuth } from "../../context/AuthContext";
// import Loader2 from "../../components/Loaders/Loader2";
// import NavHeader from "../../layouts/NavHeader";
// import RolePlayJourneyCards from "../Role-play/components/RolePlayJourneyCards";
// import { BiChevronDown, BiSearch } from "react-icons/bi";

// const PowerskillPage = () => {
//   const { loading, powerSkill } = useAuth();
//   const [activeTab, setActiveTab] = useState("All");
//   const [sortOption, setSortOption] = useState("Suggested");
//   const [search, setSearch] = useState("");
//   const [showSortDropdown, setShowSortDropdown] = useState(false);

//   const tabs = ["All", "My Skills", "Job pathfinder"];
//   const sortOptions = ["Suggested", "Alphabetical", "Most Used"];
//   console.log(powerSkill);
//   return (
//     <div className="h-full w-full overflow-hidden !py-4 scrollbar-hide  no-scrollbar ">
//       <div className="bg-[#F3F3F3] overflow-scroll scroll-hide h-full rounded-3xl !mx-3">
//         {loading && (
//           <div>
//             <Loader2 />
//           </div>
//         )}
//         <div className="backdrop-blur-xs !py-4 !px-10 sticky top-0 z-40 ">
//           <NavHeader header={"POWER SKILLS"} />
//           <div className="w-full space-y-4 py-6">
//             {/* Tabs */}
//             <div className="flex gap-8 border-b border-gray-300">
//               {tabs.map((tab) => (
//                 <button
//                   key={tab}
//                   onClick={() => setActiveTab(tab)}
//                   className={`pb-2  font-medium px-12 ${
//                     activeTab === tab
//                       ? "border-b-2  border-green-tint text-grey-tint"
//                       : "text-gray-500"
//                   }`}
//                 >
//                   {tab}
//                 </button>
//               ))}
//             </div>

//             {/* Filter and Search */}
//             <div className="flex flex-wrap items-center gap-3">
//               <span className="text-sm font-medium">Sort by</span>
//               {/* <div className="flex items-center gap-2 bg-gray-100 rounded-md px-3 py-2">
//                 <span className="text-sm">{sortOption}</span>
//                 <BiChevronDown className="w-4 h-4" />
//               </div> */}
//               <div className="relative">
//                 <div
//                   className="flex items-center gap-2 bg-gray-100 rounded-md px-3 py-2 cursor-pointer"
//                   onClick={() => setShowSortDropdown((prev) => !prev)}
//                 >
//                   <span className="text-sm">{sortOption}</span>
//                   <BiChevronDown className="w-4 h-4" />
//                 </div>
//                 {showSortDropdown && (
//                   <div className="absolute z-10 mt-1 w-[200px] bg-white shadow-md rounded-md overflow-hidden">
//                     {sortOptions.map((option) => (
//                       <div
//                         key={option}
//                         onClick={() => {
//                           setSortOption(option);
//                           setShowSortDropdown(false);
//                         }}
//                         className={`px-7 py-4 text-sm hover:bg-gray-200  cursor-pointer ${
//                           sortOption === option
//                             ? "bg-gray-100 font-semibold"
//                             : ""
//                         }`}
//                       >
//                         {option}
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               <div className="relative flex-1 max-w-md">
//                 <input
//                   type="text"
//                   placeholder="Search for skill"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-2 pr-10 text-sm focus:outline-none"
//                 />
//                 <BiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-black w-4 h-4" />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 !mt-4 gap-4 gap-y-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-smooth scrollbar-hide !px-10">
//           {powerSkill ? (
//             powerSkill?.data.map((power, index) => (
//               <RolePlayJourneyCards
//                 key={power.courseId}
//                 // bgpower={index % 2 === 0 ? "bg-blue-500" : "bg-green-500"}
//                 bgModule="learning-module-1"
//                 title={"hjhg"}
//                 courseId={power.courseId}
//                 courseName={power.powerskill}
//               />
//             ))
//           ) : (
//             <p>No Power skills available.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PowerskillPage;

import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Loader2 from "../../components/Loaders/Loader2";
import NavHeader from "../../layouts/NavHeader";
import RolePlayJourneyCards from "../Role-play/components/RolePlayJourneyCards";
import { BiChevronDown, BiSearch } from "react-icons/bi";

const PowerskillPage = () => {
  const { loading, powerSkill } = useAuth();
  const [activeTab, setActiveTab] = useState("All");
  const [sortOption, setSortOption] = useState("Suggested");
  const [search, setSearch] = useState("");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [scrolled, setScrolled] = useState(false);
  const containerRef = useRef();

  const tabs = ["All", "My Skills", "Job pathfinder"];
  const sortOptions = ["Suggested", "Alphabetical", "Most Used"];

  useEffect(() => {
    if (!powerSkill?.data) return;

    let filtered = [...powerSkill.data];

    // Search
    if (search) {
      filtered = filtered.filter((skill) =>
        skill.powerskill?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort
    if (sortOption === "Alphabetical") {
      filtered.sort((a, b) => a.powerskill.localeCompare(b.powerskill));
    } else if (sortOption === "Most Used") {
      // Assuming you have some kind of usage count to sort by
      filtered.sort((a, b) => b.usageCount - a.usageCount);
    }

    setFilteredSkills(filtered);
  }, [powerSkill, search, sortOption]);

  // Scroll-based style change
  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      const scrollTop = container?.scrollTop || 0;
      setScrolled(scrollTop > 60);
    };

    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="h-full w-full overflow-hidden !py-4 scrollbar-hide no-scrollbar">
      <div
        ref={containerRef}
        className="bg-[#F3F3F3] overflow-scroll scroll-hide h-full rounded-3xl !mx-3"
      >
        {loading && <Loader2 />}

        <div
          className={`backdrop-blur-xs sticky top-0 z-40 transition-all duration-300 py-6 lg:px-10 ${
            scrolled ? "bg-whitish shadow-md" : ""
          }`}
        >
          <NavHeader header={"POWER SKILLS"} />
          <div
            className={`w-full space-y-4 py-6 transition-all duration-300 ${
              scrolled ? "text-gray-800" : "text-black"
            }`}
          >
            {/* Tabs */}
            <div className="flex gap-8 border-b border-gray-300">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-2 font-medium px-12 ${
                    activeTab === tab
                      ? "border-b-2 border-green-tint text-grey-tint"
                      : "text-gray-500"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Filter and Search */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium">Sort by</span>

              <div className="relative">
                <div
                  className="flex items-center gap-2 bg-gray-100 rounded-md px-3 py-2 cursor-pointer"
                  onClick={() => setShowSortDropdown((prev) => !prev)}
                >
                  <span className="text-sm">{sortOption}</span>
                  <BiChevronDown className="w-4 h-4" />
                </div>
                {showSortDropdown && (
                  <div className="absolute z-10 mt-1 w-[200px] bg-white shadow-md rounded-md overflow-hidden">
                    {sortOptions.map((option) => (
                      <div
                        key={option}
                        onClick={() => {
                          setSortOption(option);
                          setShowSortDropdown(false);
                        }}
                        className={`px-7 py-4 text-sm hover:bg-gray-200 cursor-pointer ${
                          sortOption === option
                            ? "bg-gray-100 font-semibold"
                            : ""
                        }`}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="relative flex-1 max-w-md">
                <input
                  type="text"
                  placeholder="Search for skill"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 bg-gray-100 px-4 py-2 pr-10 text-sm focus:outline-none"
                />
                <BiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-black w-4 h-4" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 !mt-4 gap-4 gap-y-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-smooth scrollbar-hide !px-10 pb-10">
          {filteredSkills.length > 0 ? (
            filteredSkills.map((power, index) => (
              <RolePlayJourneyCards
                key={power.courseId}
                bgModule="learning-module-1"
                title={power.title || ""}
                courseId={power.courseId}
                courseName={power.powerskill}
              />
            ))
          ) : (
            <p>No Power skills found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PowerskillPage;
