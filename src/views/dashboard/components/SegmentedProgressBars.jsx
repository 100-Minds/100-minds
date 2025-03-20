const SegmentedProgressBars = () => {
  const progress = 222; // Progress between 0 - 100

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
        <circle cx={indicatorX} cy={indicatorY} r={5} fill={dialColor} />
        <circle cx={indicatorX} cy={indicatorY} r={3} fill="white" />
      </svg>
    </div>
  );
};

export default SegmentedProgressBars;
