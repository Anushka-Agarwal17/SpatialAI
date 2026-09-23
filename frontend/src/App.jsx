import ScanTool from './components/ScanTool'

function App() {
  return (
    <div className="min-h-screen bg-[#EDE6D8] text-[#1C2B2E] font-sans">
      <header className="flex items-center justify-between px-8 py-7 max-w-6xl mx-auto border-b border-black/10">
        <div className="flex items-center gap-2 font-serif font-semibold text-lg">
          <div className="w-6 h-6 border border-current rounded-sm relative">
            <div className="absolute inset-0 border-t border-current" style={{ top: '35%' }} />
          </div>
          SpatialAI
        </div>
      </header>

      <ScanTool />
    </div>
  )
}

export default App