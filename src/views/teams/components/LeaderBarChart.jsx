import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "All Modules", person1: 40, person2: 40 },
  { name: "Difficult conversations", person1: 35, person2: 25 },
  { name: "Active listening", person1: 50, person2: 40 },
  { name: "Managing difficult conversations", person1: 45, person2: 30 },
  { name: "Empathy", person1: 25, person2: 25 },
];

const LeaderBarChart = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-2xl ">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
          >
            {/* Add grid background */}
            <defs>
              {/* Vertical Stripes for Person 1 */}
              <pattern
                id="patternGreen"
                width="6"
                height="6"
                patternUnits="userSpaceOnUse"
              >
                <rect width="6" height="6" fill="#978fed5f" />
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="6"
                  stroke="#ffffff"
                  strokeWidth="1"
                />
              </pattern>

              {/* Vertical Stripes for Person 2 */}
              <pattern
                id="patternBlue"
                width="6"
                height="6"
                patternUnits="userSpaceOnUse"
              >
                <rect width="6" height="6" fill="#978fed" />
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="6"
                  stroke="#ffffff"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              tick={{
                fill: "#333",
                fontSize: 10,
                wordWrap: "break-word",
                whiteSpace: "normal",
              }}
              height={50}
              tickFormatter={(text) =>
                text.length > 15 ? text.split(" ").join("\n") : text
              }
            />
            <YAxis
              domain={[0, 100]}
              tickCount={5}
              tick={{
                fill: "#333",
                fontSize: 12,
              }}
            />
            <Tooltip />
            <Legend />
            Thinner bars with decorative stripes
            <Bar
              dataKey="person2"
              stackId="a"
              fill="url(#patternBlue)"
              name="Person 2"
              barSize={20}
            />
            <Bar
              dataKey="person1"
              stackId="a"
              fill="url(#patternGreen)"
              name="Person 1"
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LeaderBarChart;
