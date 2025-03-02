import React from "react";
import userImage from "../../../assets/img/dashboards/teams/avatar1.jpg";
import userImage2 from "../../../assets/img/dashboards/teams/avatar3.jpg";
import userImage3 from "../../../assets/img/dashboards/teams/avatar4.jpg";
const leaderboardData = [
  { rank: 1, name: "Drena Adams", points: 1234, image: userImage },
  { rank: 2, name: "Drena Adams", points: 1234, image: userImage2 },
  { rank: 3, name: "Drena Adams", points: 1234, image: userImage3 },
  { rank: 4, name: "Drena Adams", points: 1234, image: userImage },
  { rank: 5, name: "Drena Adams", points: 1234, image: userImage },
  { rank: 6, name: "Drena Adams", points: 1234, image: userImage },
  { rank: 7, name: "Drena Adams", points: 1234, image: userImage },
  { rank: 8, name: "Drena Adams", points: 1234, image: userImage },
  { rank: 9, name: "Drena Adams", points: 1234, image: userImage },
  { rank: 10, name: "Drena Adams", points: 1234, image: userImage },
  { rank: 11, name: "Drena Adams", points: 1234, image: userImage },
  { rank: 12, name: "Drena Adams", points: 1234, image: userImage },
  { rank: 13, name: "Drena Adams", points: 1234, image: userImage },
];

const rankColors = {
  1: "#F5D23D",
  2: "#C1D2E5",
  3: "#DE9351",
};

const LeaderboardItem = () => {
  return (
    <div className="lg:max-w-2/3 mx-auto space-y-3 bg-white lg:p-8 p-4 rounded-3xl">
      {leaderboardData.map(({ rank, name, points, image }) => (
        <div
          key={rank}
          className={` flex justify-between items-center 
          } border-b border-gray-300`}
        >
          {/* Left Section: Rank, Image, Name */}
          <div className="flex items-center gap-3 p-4 ">
            <span
              className={`text-sm !p-1 !px-1.5 w-6 h-6 rounded-full flex items-center justify-center font-bold border-2  ${
                rankColors[rank] || "bg-whitish border-none"
              }`}
              style={{
                backgroundColor: rankColors[rank] || "transparent", // Use color if exists, otherwise transparent
                borderColor: "gray" || "transparent",
              }}
            >
              {rank}
            </span>
            <img
              src={image}
              alt={name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-medium">{name}</span>
          </div>

          {/* Right Section: Points */}
          <span className="font-bold text-sm text-gray-500">
            {points} Points
          </span>
        </div>
      ))}
    </div>
  );
};

export default LeaderboardItem;
