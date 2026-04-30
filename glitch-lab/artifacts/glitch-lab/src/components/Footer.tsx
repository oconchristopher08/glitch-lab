export default function Footer() {
  return (
    <footer className="bg-black border-t border-[#111] px-10 md:px-20 py-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

        {/* Left: brand + tagline */}
        <div className="flex items-center gap-6 flex-wrap">
          <div>
            <div className="font-orbitron font-black text-[13px] tracking-[5px] text-white">
              GLITCH<span className="text-[#00ff88]">/</span>LAB
            </div>
            <div className="font-mono-tech text-[8px] tracking-[3px] text-[#222] mt-1">
              EXPERIMENTAL SYSTEMS · DIGITAL FUTURE
            </div>
          </div>
          <div className="hidden md:block w-px h-8 bg-[#111]" />
          <div className="font-mono-tech text-[8px] tracking-[3px] text-[#1a1a1a] hidden md:block">
            [ SIGNAL DETECTED ]
          </div>
        </div>

        {/* Right: icons + status */}
        <div className="flex items-center gap-5">
          {/* Globe */}
          <svg className="w-4 h-4 opacity-20 hover:opacity-80 hover:text-[#00ff88] transition-all cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10"/>
            <ellipse cx="12" cy="12" rx="4" ry="10"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
          </svg>
          {/* Target */}
          <svg className="w-4 h-4 opacity-20 hover:opacity-80 transition-all cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="12" r="6"/>
            <circle cx="12" cy="12" r="2"/>
          </svg>
          {/* Package */}
          <svg className="w-4 h-4 opacity-20 hover:opacity-80 transition-all cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="1.5">
            <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
          </svg>

          {/* Divider */}
          <div className="w-px h-4 bg-[#111]" />

          <div className="flex items-center gap-2 font-mono-tech text-[8px] tracking-[3px] text-[#00ff88]/60">
            <span className="w-1 h-1 rounded-full bg-[#00ff88] blink" />
            ONLINE
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className="mt-6 pt-5 border-t border-[#0d0d0d] flex items-center justify-between">
        <span className="font-mono-tech text-[8px] tracking-[2px] text-[#1a1a1a]">
          © 2025 GLITCH LAB · ALL SYSTEMS OPERATIONAL
        </span>
        <span className="font-mono-tech text-[8px] tracking-[2px] text-[#1a1a1a]">
          v2.0.0-EXPERIMENTAL
        </span>
      </div>
    </footer>
  );
}
