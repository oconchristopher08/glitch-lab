import { useGateway } from "@/lib/gateway";

export default function Hero() {
  const { enterLab } = useGateway();

  return (
    <section className="relative flex flex-col items-center justify-center bg-black text-white overflow-hidden"
      style={{ minHeight: "calc(100vh - 24px)", paddingTop: "80px", paddingBottom: "60px" }}
    >

      {/* ── Background grid lines ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.06 }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `
            linear-gradient(rgba(0,255,136,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,136,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }} />
      </div>

      {/* ── Corner brackets ── */}
      {[
        { top: 40, left: 40, borderTop: "1px solid #00ff8855", borderLeft: "1px solid #00ff8855" },
        { top: 40, right: 40, borderTop: "1px solid #00ff8855", borderRight: "1px solid #00ff8855" },
        { bottom: 40, left: 40, borderBottom: "1px solid #00ff8855", borderLeft: "1px solid #00ff8855" },
        { bottom: 40, right: 40, borderBottom: "1px solid #00ff8855", borderRight: "1px solid #00ff8855" },
      ].map((s, i) => (
        <div key={i} className="absolute hidden lg:block" style={{ ...s, width: 40, height: 40 }} />
      ))}

      {/* ── Center glow ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div style={{
          width: 500, height: 500,
          borderRadius: "50%",
          background: "#00ff88",
          opacity: 0.07,
          filter: "blur(100px)",
        }} />
      </div>

      {/* ── Horizontal scan line ── */}
      <div className="absolute left-0 right-0 pointer-events-none hidden lg:block"
        style={{ top: "50%", height: "1px", background: "linear-gradient(90deg, transparent, #00ff8820, transparent)" }}
      />

      {/* ── Top status chips ── */}
      <div className="absolute top-10 left-0 right-0 hidden lg:flex items-center justify-center gap-8 font-mono-tech text-[9px] tracking-[3px]">
        <div className="flex items-center gap-2 text-[#00ff88]/50">
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#00ff88", display: "inline-block", boxShadow: "0 0 6px #00ff88" }} />
          SYS // ONLINE
        </div>
        <div className="text-[#333]">|</div>
        <div className="text-[#444]">BUILD v0.4.2</div>
        <div className="text-[#333]">|</div>
        <div className="text-[#444]">2 MODULES ACTIVE</div>
      </div>

      {/* ── Main content ── */}
      <div className="flex flex-col items-center text-center z-10 px-6">

        {/* Eyebrow label */}
        <div className="font-mono-tech text-[10px] tracking-[6px] text-[#00ff88]/60 mb-8 flex items-center gap-3">
          <span style={{ display: "inline-block", width: 24, height: "1px", background: "#00ff88", opacity: 0.4 }} />
          EXPERIMENTAL SYSTEMS
          <span style={{ display: "inline-block", width: 24, height: "1px", background: "#00ff88", opacity: 0.4 }} />
        </div>

        <h1
          className="glitch-wordmark select-none mb-6"
          data-text="GLITCH LAB"
          style={{
            fontSize: "clamp(52px, 9vw, 108px)",
            letterSpacing: "0.08em",
            lineHeight: 1.05,
            fontWeight: 700,
          }}
        >
          GLITCH LAB
        </h1>

        <p
          className="text-[#555] leading-relaxed max-w-sm mb-10 font-rajdhani"
          style={{ fontSize: "clamp(14px, 1.4vw, 17px)", letterSpacing: "1px" }}
        >
          Experimental systems. Digital chaos.
        </p>

        <button
          type="button"
          onClick={() => enterLab("/app/chainster")}
          className="font-orbitron font-semibold tracking-wide px-10 py-4 bg-[#00ff88] text-black transition-all hover:scale-105 mb-12"
          style={{ fontSize: "13px" }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 30px rgba(0,255,136,0.4)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "none";
          }}
        >
          ENTER LAB
        </button>

        {/* ── Stat row ── */}
        <div className="hidden md:flex items-center gap-0 border border-[#1a1a1a] font-mono-tech text-[10px]">
          {[
            { label: "EXPERIMENTS", value: "03" },
            { label: "MODULES LIVE", value: "02" },
            { label: "STATUS", value: "ACTIVE" },
            { label: "BUILD", value: "v0.4.2" },
          ].map((s, i) => (
            <div key={i} className="px-8 py-4 border-r border-[#1a1a1a] last:border-r-0 text-center" style={{ minWidth: 140 }}>
              <div style={{ color: "#00ff88", fontSize: 16, fontFamily: "Orbitron, sans-serif", fontWeight: 700, marginBottom: 4 }}>
                {s.value}
              </div>
              <div style={{ color: "#333", letterSpacing: "2px", fontSize: 9 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <div className="absolute bottom-8 left-0 right-0 hidden md:flex flex-col items-center gap-2 font-mono-tech text-[8px] tracking-[3px] text-[#333]">
        <div>SCROLL</div>
        <div style={{ width: 1, height: 28, background: "linear-gradient(to bottom, #00ff8840, transparent)" }} />
      </div>

    </section>
  );
}
