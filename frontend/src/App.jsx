import { useState } from 'react'

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
        <nav className="flex gap-8 text-sm text-[#3A4C4F]">
          <a href="#how" className="hover:text-[#1C2B2E]">How it works</a>
          <a href="#scan" className="hover:text-[#1C2B2E]">Scan a room</a>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-16">
        <h1 className="font-serif font-medium text-5xl leading-tight max-w-xl">
          Turn a photo of a room into a{' '}
          <em className="not-italic text-[#A9793A] italic">measured</em> plan.
        </h1>
        <p className="mt-6 text-[#3A4C4F] max-w-md">
          This is our first real React component — plain scaffolding for now.
          We'll build the actual scan interface here next.
        </p>
      </main>
    </div>
  )
}

export default App