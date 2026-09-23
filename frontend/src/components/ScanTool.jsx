import FloorPlan from './FloorPlan'
import { useState, useRef, useEffect } from 'react'

function ScanTool() {
  const [imageUrl, setImageUrl] = useState(null)
  const [roomPoints, setRoomPoints] = useState([])
  const [refPoints, setRefPoints] = useState([])
  const [refLengthCm, setRefLengthCm] = useState(29.7) // A4 long edge default
  const [stage, setStage] = useState('room') // 'room' -> 'reference' -> 'done'
  const [roomLabel, setRoomLabel] = useState('')

  const fileInputRef = useRef(null)
  const imageRef = useRef(null)
  const canvasRef = useRef(null)

  function handleFileChange(e) {
    const file = e.target.files[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setImageUrl(url)
    setRoomPoints([])
    setRefPoints([])
    setStage('room')
    setRoomLabel('')
  }

  function handleImageClick(e) {
    const rect = e.target.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (stage === 'room' && roomPoints.length < 4) {
      const next = [...roomPoints, { x, y }]
      setRoomPoints(next)
      if (next.length === 4) setStage('reference')
    } else if (stage === 'reference' && refPoints.length < 2) {
      const next = [...refPoints, { x, y }]
      setRefPoints(next)
      if (next.length === 2) setStage('done')
    }
  }

  function handleReset() {
    setRoomPoints([])
    setRefPoints([])
    setStage('room')
    setRoomLabel('')
  }

  function pixelDistance(p1, p2) {
    return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2)
  }

  // Calculate estimated real-world room dimensions once everything is placed
  function getEstimatedDimensions() {
    if (refPoints.length < 2 || roomPoints.length < 4) return null

    const refPixelLength = pixelDistance(refPoints[0], refPoints[1])
    const pixelsPerCm = refPixelLength / refLengthCm

    // Room width = distance between corner 1 and 2 (top edge)
    // Room length = distance between corner 2 and 3 (right edge)
    const widthPx = pixelDistance(roomPoints[0], roomPoints[1])
    const lengthPx = pixelDistance(roomPoints[1], roomPoints[2])

    const widthM = (widthPx / pixelsPerCm) / 100
    const lengthM = (lengthPx / pixelsPerCm) / 100

    return { widthM: widthM.toFixed(2), lengthM: lengthM.toFixed(2) }
  }

  const dimensions = getEstimatedDimensions()

  // Redraw canvas overlay
  useEffect(() => {
    const canvas = canvasRef.current
    const img = imageRef.current
    if (!canvas || !img) return

    canvas.width = img.clientWidth
    canvas.height = img.clientHeight
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw room outline in ink color
    drawShape(ctx, roomPoints, '#1C2B2E', roomPoints.length === 4)

    // Draw reference line in brass color
    drawShape(ctx, refPoints, '#A9793A', false)
  }, [roomPoints, refPoints, imageUrl])

  function drawShape(ctx, pts, color, closePath) {
    if (pts.length > 1) {
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(pts[0].x, pts[0].y)
      for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y)
      if (closePath) ctx.closePath()
      ctx.stroke()
    }
    pts.forEach((p, i) => {
      ctx.fillStyle = color
      ctx.beginPath()
      ctx.arc(p.x, p.y, 6, 0, Math.PI * 2)
      ctx.fill()
      ctx.fillStyle = '#EDE6D8'
      ctx.font = '11px sans-serif'
      ctx.fillText(i + 1, p.x - 3, p.y + 4)
    })
  }

  let instructionText = ''
  if (stage === 'room') instructionText = `Tap corner ${roomPoints.length + 1} of 4 on the room outline.`
  else if (stage === 'reference') instructionText = `Now tap the ${refPoints.length + 1 === 1 ? 'start' : 'end'} of your reference object (${refPoints.length} of 2).`
  else instructionText = 'All points placed — estimated dimensions below.'

  return (
    <div className="max-w-3xl mx-auto py-12 px-6">
      <h2 className="font-serif text-3xl mb-2">Scan a room</h2>

      {!imageUrl && (
        <>
          <p className="text-[#3A4C4F] mb-6">Upload a photo, tap the room's 4 corners, then mark a reference object.</p>
          <div className="border-2 border-dashed border-[#1C2B2E]/20 rounded-md p-12 text-center">
            <p className="mb-4 text-[#3A4C4F]">Upload a photo of the room or plot</p>
            <button
              onClick={() => fileInputRef.current.click()}
              className="bg-[#1C2B2E] text-[#EDE6D8] px-5 py-2.5 rounded-sm text-sm font-medium"
            >
              Choose file
            </button>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </div>
        </>
      )}

      {imageUrl && (
        <div>
          <p className="text-[#3A4C4F] mb-4 text-sm">{instructionText}</p>

          <div className="relative border border-[#1C2B2E]/20 rounded-md overflow-hidden inline-block">
            <img
              ref={imageRef}
              src={imageUrl}
              alt="Uploaded room"
              className="block max-w-full cursor-crosshair"
              onClick={handleImageClick}
              onLoad={() => setRoomPoints((p) => [...p])}
            />
            <canvas ref={canvasRef} className="absolute top-0 left-0 pointer-events-none" />
          </div>

          {stage === 'done' && (
            <div className="mt-4 flex items-center gap-3">
              <label className="text-sm text-[#3A4C4F]">
                Reference object real length (cm):
              </label>
              <input
                type="number"
                value={refLengthCm}
                onChange={(e) => setRefLengthCm(parseFloat(e.target.value) || 0)}
                className="border border-[#1C2B2E]/20 rounded-sm px-2 py-1 w-20 text-sm bg-white"
              />
            </div>
          )}

          {dimensions && (
            <>
              <div className="mt-6 bg-white border border-[#1C2B2E]/20 rounded-md p-5 max-w-sm">
                <div className="flex justify-between py-2 border-b border-[#1C2B2E]/10 text-sm">
                  <span className="text-[#3A4C4F]">Estimated width</span>
                  <span className="font-mono">{dimensions.widthM} m</span>
                </div>
                <div className="flex justify-between py-2 text-sm">
                  <span className="text-[#3A4C4F]">Estimated length</span>
                  <span className="font-mono">{dimensions.lengthM} m</span>
                </div>
              </div>

              <div className="mt-6">
                <FloorPlan
                  widthM={dimensions.widthM}
                  lengthM={dimensions.lengthM}
                  label={roomLabel}
                  onLabelChange={setRoomLabel}
                />
              </div>
            </>
          )}

          <div className="mt-4">
            <button onClick={handleReset} className="text-sm text-[#3A4C4F] underline">
              Reset points
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ScanTool