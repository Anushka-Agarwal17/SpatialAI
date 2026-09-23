function FloorPlan({ widthM, lengthM, label, onLabelChange }) {
  // Normalize the room into a clean blueprint rectangle, scaled to fit a fixed canvas
  const maxDim = 280
  const ratio = widthM / lengthM
  let boxWidth, boxHeight
  if (ratio >= 1) {
    boxWidth = maxDim
    boxHeight = maxDim / ratio
  } else {
    boxHeight = maxDim
    boxWidth = maxDim * ratio
  }

  const padding = 50
  const svgWidth = boxWidth + padding * 2
  const svgHeight = boxHeight + padding * 2
  const x0 = padding
  const y0 = padding

  return (
    <div className="bg-white border border-[#1C2B2E]/20 rounded-md p-6 max-w-lg">
      <div className="flex items-center justify-between mb-4">
        <input
          type="text"
          value={label}
          onChange={(e) => onLabelChange(e.target.value)}
          placeholder="Label this room (e.g. Bedroom)"
          className="font-serif text-lg border-b border-[#1C2B2E]/20 focus:border-[#A9793A] outline-none bg-transparent px-1 py-0.5"
        />
        <span className="font-mono text-xs text-[#3A4C4F]">
          {widthM}m × {lengthM}m
        </span>
      </div>

      <svg width={svgWidth} height={svgHeight} className="mx-auto block">
        {/* Room outline */}
        <rect
          x={x0}
          y={y0}
          width={boxWidth}
          height={boxHeight}
          fill="none"
          stroke="#1C2B2E"
          strokeWidth="1.6"
        />

        {/* Width dimension line (bottom) */}
        <line
          x1={x0}
          y1={y0 + boxHeight + 20}
          x2={x0 + boxWidth}
          y2={y0 + boxHeight + 20}
          stroke="#A9793A"
          strokeWidth="1"
        />
        <line x1={x0} y1={y0 + boxHeight + 15} x2={x0} y2={y0 + boxHeight + 25} stroke="#A9793A" strokeWidth="1" />
        <line x1={x0 + boxWidth} y1={y0 + boxHeight + 15} x2={x0 + boxWidth} y2={y0 + boxHeight + 25} stroke="#A9793A" strokeWidth="1" />
        <text
          x={x0 + boxWidth / 2}
          y={y0 + boxHeight + 38}
          textAnchor="middle"
          fontSize="11"
          fontFamily="IBM Plex Mono, monospace"
          fill="#A9793A"
        >
          {widthM} m
        </text>

        {/* Length dimension line (right side) */}
        <line
          x1={x0 + boxWidth + 20}
          y1={y0}
          x2={x0 + boxWidth + 20}
          y2={y0 + boxHeight}
          stroke="#A9793A"
          strokeWidth="1"
        />
        <line x1={x0 + boxWidth + 15} y1={y0} x2={x0 + boxWidth + 25} y2={y0} stroke="#A9793A" strokeWidth="1" />
        <line x1={x0 + boxWidth + 15} y1={y0 + boxHeight} x2={x0 + boxWidth + 25} y2={y0 + boxHeight} stroke="#A9793A" strokeWidth="1" />
        <text
          x={x0 + boxWidth + 38}
          y={y0 + boxHeight / 2}
          textAnchor="middle"
          fontSize="11"
          fontFamily="IBM Plex Mono, monospace"
          fill="#A9793A"
          transform={`rotate(90, ${x0 + boxWidth + 38}, ${y0 + boxHeight / 2})`}
        >
          {lengthM} m
        </text>

        {/* Zone label centered in the room */}
        {label && (
          <text
            x={x0 + boxWidth / 2}
            y={y0 + boxHeight / 2}
            textAnchor="middle"
            fontSize="13"
            fontFamily="Fraunces, serif"
            fill="#1C2B2E"
          >
            {label}
          </text>
        )}
      </svg>
    </div>
  )
}

export default FloorPlan