export default function About() {
  return (
    <section className="bg-[#050505] border-t border-[#1a1a1a] text-white">
      <div
        className="grid"
        style={{ gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "#1a1a1a" }}
      >
        {/* Left meta */}
        <div className="section-hover bg-[#050505] p-14">
          <div className="font-orbitron font-black text-[36px] text-[#00ff88] leading-none">02</div>
          <div className="font-mono-tech text-[9px] text-[#333] tracking-[3px] mt-1 mb-5">CONCEPT</div>
          <div className="font-orbitron font-bold text-[13px] tracking-[2px] text-white mb-2">
            LAB CORE SYMBOL
          </div>
          <div className="w-6 h-[2px] bg-[#00ff88] mb-4" />
          <p className="text-[13px] text-[#888] leading-[1.7] max-w-[240px]">
            A minimal icon that represents experimentation, systems and digital disruption. Strong for icon, favicon and ecosystem use.
          </p>
        </div>

        {/* Center: Flask + wordmark */}
        <div className="section-hover bg-[#050505] p-14 flex flex-col items-center justify-center gap-8">
          <div className="flex items-center gap-10">
            {/* Flask SVG */}
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-28 h-28 flask-pulse"
            >
              <rect x="2" y="2" width="96" height="96" stroke="white" strokeWidth="2" fill="none"/>
              <rect x="2" y="2" width="12" height="12" fill="white"/>
              <rect x="86" y="2" width="12" height="12" fill="white"/>
              <rect x="80" y="14" width="6" height="6" fill="white" opacity="0.4"/>
              <rect x="14" y="80" width="8" height="4" fill="white" opacity="0.3"/>
              <path d="M35 20 L35 52 L20 80 L80 80 L65 52 L65 20 Z" fill="none" stroke="white" strokeWidth="2.5"/>
              <rect x="35" y="18" width="30" height="4" fill="white"/>
              <path d="M26 72 L20 80 L80 80 L74 72 Z" fill="#00ff88"/>
              <ellipse cx="50" cy="68" rx="18" ry="6" fill="#00ff88" opacity="0.7"/>
              <circle cx="58" cy="62" r="4" fill="#00ff88" opacity="0.5"/>
              <circle cx="42" cy="58" r="2.5" fill="#00ff88" opacity="0.4"/>
              <rect x="72" y="36" width="5" height="5" fill="white" opacity="0.6"/>
              <rect x="68" y="44" width="3" height="3" fill="white" opacity="0.4"/>
            </svg>
            <div className="flex flex-col gap-1">
              <span className="font-orbitron font-black text-[48px] tracking-[12px] leading-none text-white">GLITCH</span>
              <span className="font-orbitron font-normal text-[22px] tracking-[16px] text-white flex items-center gap-2">
                <span className="text-[#00ff88] text-[14px]">+</span>LAB<span className="text-[#00ff88] text-[14px]">+</span>
              </span>
            </div>
          </div>

          {/* Icon chips row */}
          <div className="flex gap-3">
            {["white", "green", "pixel"].map((v) => (
              <div
                key={v}
                className="w-20 h-20 rounded-2xl flex items-center justify-center border border-[#222] bg-[#111] hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,255,136,0.2)] transition-all cursor-pointer"
                style={v === "green" ? { borderColor: "#00ff88" } : {}}
              >
                <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-11 h-11">
                  <rect x="4" y="4" width="92" height="92" stroke={v === "green" ? "#00ff88" : "white"} strokeWidth="3" fill="none"/>
                  <rect x="4" y="4" width="10" height="10" fill={v === "green" ? "#00ff88" : "white"}/>
                  <rect x="86" y="4" width="10" height="10" fill={v === "green" ? "#00ff88" : "white"}/>
                  <path d="M35 25 L35 55 L22 78 L78 78 L65 55 L65 25 Z" fill="none" stroke={v === "green" ? "#00ff88" : "white"} strokeWidth="2.5"/>
                  <rect x="35" y="22" width="30" height="4" fill={v === "green" ? "#00ff88" : "white"}/>
                  <path d="M28 70 L22 78 L78 78 L72 70 Z" fill={v === "green" ? "#00ff88" : v === "pixel" ? "white" : "#00ff88"}/>
                  <rect x="70" y="35" width="6" height="6" fill={v === "green" ? "#00ff88" : "white"} opacity="0.7"/>
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Info */}
        <div className="section-hover bg-[#050505] p-14 flex flex-col justify-center gap-5">
          <div className="font-mono-tech text-[10px] text-[#00ff88] tracking-[3px]">ICON VARIANTS</div>
          <div>
            <div className="font-orbitron text-[11px] tracking-[2px] text-[#aaa] mb-2">WHITE / GREEN / PIXEL</div>
            <p className="text-[13px] text-[#666] leading-[1.8]">
              Three distinct states for different surface treatments and brand contexts.
            </p>
          </div>
          <div className="font-mono-tech text-[12px] text-[#555] leading-[2]">
            <div>&gt; favicon · 16×16 · 32×32</div>
            <div>&gt; app icon · 512×512</div>
            <div>&gt; social avatar · 400×400</div>
          </div>
        </div>
      </div>
    </section>
  );
}
