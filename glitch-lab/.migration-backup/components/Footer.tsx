export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-[#1a1a1a] px-10 md:px-20 py-6 flex items-center justify-between flex-wrap gap-4">
      <div className="flex items-center gap-5">
        <span className="font-mono-tech text-[11px] text-[#00ff88] tracking-[4px]">GLITCH LAB</span>
        <span className="text-[#333]">|</span>
        <span className="font-mono-tech text-[10px] text-[#444] tracking-[2px]">EXPERIMENTAL SYSTEMS. DIGITAL FUTURE.</span>
      </div>

      <div className="flex gap-5 items-center">
        {/* Globe */}
        <svg className="w-[18px] h-[18px] opacity-40 hover:opacity-100 transition-opacity cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <ellipse cx="12" cy="12" rx="4" ry="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
        </svg>
        {/* Target */}
        <svg className="w-[18px] h-[18px] opacity-40 hover:opacity-100 transition-opacity cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10"/>
          <circle cx="12" cy="12" r="6"/>
          <circle cx="12" cy="12" r="2"/>
        </svg>
        {/* Box */}
        <svg className="w-[18px] h-[18px] opacity-40 hover:opacity-100 transition-opacity cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="1.5">
          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
        </svg>
        {/* Barcode */}
        <svg className="w-[18px] h-[18px] opacity-40 hover:opacity-100 transition-opacity cursor-pointer" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="1.5">
          <rect x="2" y="4" width="2" height="16"/>
          <rect x="6" y="4" width="1" height="16"/>
          <rect x="9" y="4" width="2" height="16"/>
          <rect x="13" y="4" width="1" height="16"/>
          <rect x="16" y="4" width="2" height="16"/>
          <rect x="20" y="4" width="2" height="16"/>
        </svg>
        <span className="font-mono-tech text-[10px] text-[#00ff88] tracking-[2px] blink ml-2">● ONLINE</span>
      </div>
    </footer>
  );
}
