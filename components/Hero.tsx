import Link from "next/link";

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col bg-[#050505] text-white relative overflow-hidden">

      {/* Header bar */}
      <header className="px-10 md:px-20 py-10 border-b border-[#1a1a1a] flex items-center justify-between relative overflow-hidden">
        {/* Scanning line */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, #00ff88, transparent)",
            animation: "scanH 3s linear infinite",
          }}
        />
        <div>
          <div className="font-mono-tech text-[11px] text-[#00ff88] tracking-[3px] uppercase mb-1">
            BRAND SYSTEM v2.0 — EXPERIMENTAL
          </div>
          <div
            className="font-orbitron font-black tracking-[8px] text-white"
            style={{ fontSize: "clamp(24px, 4vw, 42px)", textShadow: "0 0 30px rgba(0,255,136,0.3)" }}
          >
            GLITCH LAB
          </div>
        </div>
        <div className="font-mono-tech text-[10px] text-[#00ff88] border border-[#00ff88] px-4 py-2 tracking-[2px] blink">
          ● SYSTEM ONLINE
        </div>
      </header>

      {/* Main grid */}
      <div
        className="flex-1 grid"
        style={{
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1px",
          background: "#1a1a1a",
        }}
      >
        {/* 01 Meta */}
        <div className="section-hover bg-[#050505] p-14 relative">
          <div className="font-orbitron font-black text-[36px] text-[#00ff88] leading-none">01</div>
          <div className="font-mono-tech text-[9px] text-[#333] tracking-[3px] mt-1 mb-5">CONCEPT</div>
          <div className="font-orbitron font-bold text-[13px] tracking-[2px] text-white mb-2">
            DIGITAL BREAKDOWN WORDMARK
          </div>
          <div className="w-6 h-[2px] bg-[#00ff88] mb-4" />
          <p className="text-[13px] text-[#888] leading-[1.7] max-w-[240px]">
            Clean wordmark with controlled glitch distortion. Readable, modern and tech-driven.
          </p>
          {/* Palette */}
          <div className="flex gap-3 mt-6">
            {[
              { bg: "#00ff88", label: "#00FF88", light: false },
              { bg: "#ff00cc", label: "#FF00CC", light: false },
              { bg: "#ffffff", label: "#FFFFFF", light: false },
              { bg: "#0d0d0d", label: "#0D0D0D", light: true, border: true },
            ].map((s) => (
              <div
                key={s.label}
                className="flex-1 h-12 rounded flex items-end p-1 cursor-pointer transition-all hover:flex-[1.8] duration-300"
                style={{ background: s.bg, border: s.border ? "1px solid #222" : undefined }}
              >
                <span className="font-mono-tech text-[8px] tracking-[1px]" style={{ color: s.light ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.7)" }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* 01 Main wordmark */}
        <div className="section-hover bg-[#050505] p-14 flex flex-col items-center justify-center gap-2">
          <div
            className="glitch-wordmark"
            data-text="GLITCH"
            style={{ fontSize: "clamp(48px, 7vw, 90px)" }}
          >
            GLITCH
          </div>
          <div
            className="font-orbitron font-normal text-[#00ff88] flex items-center gap-4"
            style={{ fontSize: "clamp(18px, 2vw, 30px)", letterSpacing: "20px" }}
          >
            <span className="flex-1 h-px bg-[#00ff88] opacity-40" />
            LAB
            <span className="flex-1 h-px bg-[#00ff88] opacity-40" />
          </div>
        </div>

        {/* 01 Logo chips */}
        <div className="section-hover bg-[#050505] p-14 flex flex-col justify-center gap-4">
          <div className="rounded-lg p-6 bg-[#111] border border-[#222] hover:scale-[1.02] transition-transform cursor-pointer">
            <div className="font-orbitron font-black text-[22px] tracking-[4px] text-white">GLITCH</div>
            <div className="font-mono-tech text-[9px] tracking-[6px] text-[#00ff88] flex items-center gap-2 mt-1">
              <span className="w-5 h-px bg-[#00ff88]" />LAB<span className="w-5 h-px bg-[#00ff88]" />
            </div>
          </div>
          <div className="rounded-lg p-6 bg-[#f0f0f0] border border-[#ccc] hover:scale-[1.02] transition-transform cursor-pointer">
            <div className="font-orbitron font-black text-[22px] tracking-[4px] text-[#111]">GLITCH</div>
            <div className="font-mono-tech text-[9px] tracking-[6px] text-[#333] flex items-center gap-2 mt-1">
              <span className="w-5 h-px bg-[#555]" />LAB<span className="w-5 h-px bg-[#555]" />
            </div>
          </div>
        </div>

        {/* 03 Meta */}
        <div className="section-hover bg-[#050505] p-14 relative">
          <div className="font-orbitron font-black text-[36px] text-[#00ff88] leading-none">03</div>
          <div className="font-mono-tech text-[9px] text-[#333] tracking-[3px] mt-1 mb-5">CONCEPT</div>
          <div className="font-orbitron font-bold text-[13px] tracking-[2px] text-white mb-2">
            404 SIGNAL TYPOGRAPHY
          </div>
          <div className="w-6 h-[2px] bg-[#00ff88] mb-4" />
          <p className="text-[13px] text-[#888] leading-[1.7] max-w-[240px]">
            Aggressive glitch typography inspired by corrupted data and system errors. Bold, loud and underground.
          </p>
        </div>

        {/* 03 Signal */}
        <div className="section-hover bg-[#050505] p-14 flex items-center justify-center gap-12">
          <div className="relative">
            <div className="absolute top-3 -right-2 font-mono-tech text-[18px] text-[#ff00cc] tracking-[2px] blink">404</div>
            <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-[#00ff88] opacity-40" />
            <span className="signal-glitch-text" style={{ fontSize: "clamp(40px, 5vw, 68px)" }}>GLITCH</span>
            <span className="signal-lab-text" style={{ fontSize: "clamp(40px, 5vw, 68px)" }}>LAB</span>
            <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-[#00ff88] opacity-40" />
          </div>
          <ul className="font-mono-tech text-[12px] text-[#00ff88] list-none tracking-[2px] leading-[2.2]">
            <li>&gt; EXPERIMENT</li>
            <li>&gt; BREAK</li>
            <li>&gt; REBUILD</li>
          </ul>
        </div>

        {/* 03 Variants */}
        <div className="section-hover bg-[#050505] p-14 flex flex-col justify-center gap-3">
          <div className="p-4 border border-[#1c1c1c] rounded-md relative hover:border-[#00ff88] transition-colors cursor-pointer">
            <div className="absolute top-2 right-3 font-mono-tech text-[10px] text-[#ff00cc]">404</div>
            <div className="font-orbitron font-black text-[18px] tracking-[4px] text-white">GLITCH</div>
            <div className="font-orbitron font-black text-[18px] tracking-[4px] text-[#ff00cc]">LAB</div>
          </div>
          <div className="p-4 border border-[#1c1c1c] rounded-md relative hover:border-[#00ff88] transition-colors cursor-pointer">
            <div className="font-orbitron font-black text-[22px] tracking-[4px] leading-none text-white">
              GLITCH <span className="text-[#00ff88] text-[14px]">// </span>LAB
            </div>
            <div className="font-mono-tech text-[8px] text-[#00ff88] tracking-[4px] mt-1">EXPERIMENTAL SYSTEMS</div>
          </div>
        </div>
      </div>

      {/* CTA row */}
      <div className="border-t border-[#1a1a1a] px-10 md:px-20 py-8 flex items-center justify-between bg-[#050505]">
        <div className="font-mono-tech text-[11px] text-[#444] tracking-[2px]">
          EXPERIMENTAL SYSTEMS. DIGITAL FUTURE.
        </div>
        <div className="flex gap-4">
          <Link
            href="/feed"
            className="font-orbitron font-bold text-[12px] tracking-[3px] px-8 py-3 bg-[#00ff88] text-black hover:bg-white transition-colors"
          >
            ENTER LAB
          </Link>
          <button className="font-orbitron font-bold text-[12px] tracking-[3px] px-8 py-3 border border-[#333] text-[#888] hover:border-[#00ff88] hover:text-[#00ff88] transition-colors">
            VIEW EXPERIMENTS
          </button>
        </div>
      </div>

    </section>
  );
}
