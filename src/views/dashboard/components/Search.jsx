import React from "react";
import { PiBell, PiMagnifyingGlass } from "react-icons/pi";

const Search = () => {
  return (
    <div className="flex items-center gap-2.5 lg:w-96 w-full">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center !pl-3 pointer-events-none">
          <PiMagnifyingGlass className="text-gray-500" size={20} />
        </div>
        <input
          type="text"
          placeholder="search anything"
          className="w-full !pl-10 !pr-4 !py-2   rounded-[15px] focus:outline-none focus:ring-1 focus:ring-green-tint bg-white"
        />
      </div>
      <div className="!p-3  bg-white   rounded-[15px] hidden md:block">
        <PiBell />
      </div>
    </div>
  );
};

export default Search;
