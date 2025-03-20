// import React from "react";

// const SemiCircularProgressIndicator = () => {
//   const progress = 100; // Progress between 0 - 100

//   // SVG settings
//   const size = 220;
//   const height = 150;
//   const viewBoxSize = 100;
//   const centerX = viewBoxSize / 2;
//   const centerY = viewBoxSize;
//   const radius = 45;
//   const strokeWidth = 6;
//   const segmentGap = 8; // Reduce gaps to prevent overextension

//   const segmentColors = ["#9B7EDE", "#E484CF", "#67B7F7", "#FFD485"];

//   // Function to create segment arcs (Always within -90 to 90 degrees)
//   const createSegment = (startDegree, endDegree, color) => {
//     const startRad = ((startDegree - 90) * Math.PI) / 180;
//     const endRad = ((endDegree - 90) * Math.PI) / 180;

//     const startX = centerX + radius * Math.cos(startRad);
//     const startY = centerY + radius * Math.sin(startRad);
//     const endX = centerX + radius * Math.cos(endRad);
//     const endY = centerY + radius * Math.sin(endRad);

//     const largeArcFlag = Math.abs(endDegree - startDegree) > 180 ? 1 : 0;

//     return {
//       path: `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
//       color,
//     };
//   };

//   //   Define exactly four segments within the semicircle (-90 to 90)
//   const segments = [
//     createSegment(-90, -45, segmentColors[0]), // Purple
//     createSegment(-45, 0, segmentColors[1]), // Pink
//     createSegment(0, 45, segmentColors[2]), // Blue
//     createSegment(45, 90, segmentColors[3]), // Yellow
//   ];

//   // Calculate indicator position (always within -90 to 90)
//   const indicatorAngle = 180 + (progress / 100) * 180;
//   const indicatorRad = (indicatorAngle * Math.PI) / 180;
//   const indicatorX = centerX + radius * Math.cos(indicatorRad);
//   const indicatorY = centerY + radius * Math.sin(indicatorRad);

//   const getSegmentColor = (index, progress) => {
//     const segmentRanges = [
//       [75, 100], // Purple: 75-100%
//       [50, 75], // Pink: 50-75%
//       [25, 50], // Blue: 25-50%
//       [0, 25], // Yellow: 0-25%
//     ];
//     return progress >= segmentRanges[index][0]
//       ? segmentColors[index]
//       : "#E6E6E6";
//   };
//   // Determine which segment the indicator is over
//   const activeSegment = segments.find(
//     (segment) =>
//       indicatorAngle >= segment.startDegree &&
//       indicatorAngle <= segment.endDegree
//   );

//   return (
//     <div className="flex justify-center">
//       <svg
//         width={size}
//         height={height}
//         viewBox={`0 50 ${viewBoxSize} ${viewBoxSize / 2}`}
//       >
//         {/* Track Segments (Ensuring no spill-over) */}
//         {segments.map((segment, index) => (
//           <path
//             key={`segment-${index}`}
//             d={segment.path}
//             stroke={getSegmentColor(index, progress)}
//             strokeWidth={strokeWidth}
//             fill="none"
//             strokeLinecap="round"
//             strokeDasharray={`${
//               (Math.PI * radius * 45) / 180 - segmentGap
//             } ${segmentGap}`}
//           />
//         ))}

//         {/* Small dots at each segment boundary */}
//         {[-90, -45, 0, 45, 90].map((degree) => {
//           const rad = (degree * Math.PI) / 180;
//           const x = centerX + radius * Math.cos(rad);
//           const y = centerY + radius * Math.sin(rad);
//           return (
//             <circle
//               key={`dot-${degree}`}
//               cx={x}
//               cy={y}
//               r={2}
//               fill={activeSegment?.color || "#E6E6E6"}
//               opacity={0.3}
//             />
//           );
//         })}

//         {/* Indicator dot */}
//         <circle cx={indicatorX} cy={indicatorY} r={4} fill="#67B7F7" />
//         <circle cx={indicatorX} cy={indicatorY} r={2} fill="white" />

//         {/* Center percentage text */}
//         {/* <text
//           x={centerX}
//           y={centerY - 20}
//           textAnchor="middle"
//           dominantBaseline="middle"
//           fontSize="16"
//           fontWeight="bold"
//           fill="#444"
//         >
//           {progress}%
//         </text> */}
//       </svg>
//     </div>
//   );
// };

// export default SemiCircularProgressIndicator;

const SegmentedProgressBar = () => {
  const progress = 100; // Progress between 0 - 100

  // SVG settings
  const size = 220;
  const height = 150;
  const viewBoxSize = 100;
  const centerX = viewBoxSize / 2;
  const centerY = viewBoxSize;
  const radius = 45;
  const strokeWidth = 6;
  const segmentGap = 8;

  const segmentColors = ["#9B7EDE", "#E484CF", "#67B7F7", "#FFD485"];

  // Define adjusted segments (-90 to 90 degrees)
  const segments = [
    { start: -90, end: -10, color: segmentColors[0] }, // First segment takes ~50%
    { start: -10, end: 25, color: segmentColors[1] },
    { start: 25, end: 60, color: segmentColors[2] },
    { start: 60, end: 90, color: segmentColors[3] }, // Last segment, no gap
  ];

  // Create SVG arc path
  const createSegment = ({ start, end, color }) => {
    const startRad = ((start - 90) * Math.PI) / 180;
    const endRad = ((end - 90) * Math.PI) / 180;

    const startX = centerX + radius * Math.cos(startRad);
    const startY = centerY + radius * Math.sin(startRad);
    const endX = centerX + radius * Math.cos(endRad);
    const endY = centerY + radius * Math.sin(endRad);

    const largeArcFlag = end - start > 180 ? 1 : 0;

    return {
      path: `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
      color,
    };
  };

  // Map segments to paths
  const segmentPaths = segments.map(createSegment);

  // Determine indicator position
  const indicatorAngle = -90 + (progress / 100) * 180;
  const indicatorRad = (indicatorAngle * Math.PI) / 180;
  const indicatorX = centerX + radius * Math.cos(indicatorRad);
  const indicatorY = centerY + radius * Math.sin(indicatorRad);

  // Determine dial color based on segment
  const activeSegment = segments.find(
    (seg) =>
      progress >= ((seg.start + 90) / 180) * 100 &&
      progress <= ((seg.end + 90) / 180) * 100
  );
  const dialColor = activeSegment ? activeSegment.color : "#67B7F7";

  return (
    <div className="flex justify-center">
      <svg
        width={size}
        height={height}
        viewBox={`0 50 ${viewBoxSize} ${viewBoxSize / 2}`}
      >
        {/* Render segments */}
        {segmentPaths.map((segment, index) => (
          <path
            key={`segment-${index}`}
            d={segment.path}
            stroke={segment.color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={
              index === segments.length - 1
                ? "none"
                : `${
                    (Math.PI *
                      radius *
                      (segments[index].end - segments[index].start)) /
                      180 -
                    segmentGap
                  } ${segmentGap}`
            }
          />
        ))}

        {/* Indicator */}
        <circle cx={indicatorX} cy={indicatorY} r={4} fill={dialColor} />
        <circle cx={indicatorX} cy={indicatorY} r={2} fill="white" />
      </svg>
    </div>
  );
};

export default SegmentedProgressBar;
