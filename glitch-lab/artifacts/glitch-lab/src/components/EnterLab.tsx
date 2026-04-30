import { useGateway } from "@/lib/gateway";

export default function EnterLab() {
  const { enterLab } = useGateway();

  return (
    <section className="bg-black border-t border-[#111] text-white px-10 md:px-20 py-32 md:py-40 relative overflow-hidden">

      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-40" style={{
        backgroundImage: `
          linear-gradient(rgba(0,255,136,0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,255,136,0.02) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }} />

      {/* Center radial */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[700px] h-[700px] rounded-full" style={{
          background: "radial-gradient(circle, rgba(0,255,136,0.04) 0%, transparent 65%)",
        }} />
      </div>

      {/* Corner decorations */}
      <span className="absolute top-6 left-10 font-mono-tech text-[9px] text-[#1a1a1a] tracking-[3px]">SYS://LAB.CORE/ACCESS</span>
      <span className="absolute bottom-6 right-10 font-mono-tech text-[9px] text-[#1a1a1a] tracking-[3px]">v2.0.0-EXPERIMENTAL</span>
      <span className="absolute top-6 left-6 w-4 h-4 border-t border-l border-[#1a1a1a]" />
      <span className="absolute top-6 right-6 w-4 h-4 border-t border-r border-[#1a1a1a]" />
      <span className="absolute bottom-6 left-6 w-4 h-4 border-b border-l border-[#1a1a1a]" />
      <span className="absolute bottom-6 right-6 w-4 h-4 border-b border-r border-[#1a1a1a]" />

      <div className="relative z-10 max-w-3xl">

        {/* Status */}
        <div className="font-mono-tech text-[9px] text-[#00ff88]/60 tracking-[5px] mb-6 flex items-center gap-3">
          <span className="blink">●</span>
          INITIALIZING ACCESS...
        </div>

        {/* Heading */}
        <h2
          className="font-orbitron font-black tracking-[2px] text-white mb-4 leading-[1.05]"
          style={{ fontSize: "clamp(36px, 5.5vw, 72px)" }}
        >
          READY TO ENTER
        </h2>
        <h2
          className="font-orbitron font-black tracking-[2px] text-[#00ff88] mb-8 leading-[1.05]"
          style={{ fontSize: "clamp(36px, 5.5vw, 72px)", textShadow: "0 0 60px rgba(0,255,136,0.2)" }}
        >
          THE SYSTEM?
        </h2>

        {/* Divider */}
        <div className="w-16 h-px bg-[#00ff88] mb-8" />

        <p className="font-mono-tech text-[11px] text-[#444] mb-12 leading-[2] tracking-[0.5px] max-w-md">
          Join the experiment. Help us break things.<br />
          Build the next version of the web.
        </p>

        {/* CTA */}
        <div className="flex gap-4 flex-wrap items-center">
          <button
            type="button"
            onClick={() => enterLab("/app/chainster")}
            className="group relative font-orbitron font-black text-[11px] tracking-[4px] px-12 py-5 bg-[#00ff88] text-black overflow-hidden"
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 50px rgba(0,255,136,0.4)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; }}
          >
            <span className="relative z-10 group-hover:text-black transition-colors">ENTER LAB</span>
            <span className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-white transition-transform duration-300 ease-out" />
          </button>

          <button
            type="button"
            className="font-orbitron font-bold text-[11px] tracking-[4px] px-12 py-5 border border-[#222] text-[#444] hover:border-[#00ff88]/50 hover:text-[#00ff88] transition-all duration-300"
          >
            READ DOCS
          </button>
        </div>

        <div className="font-mono-tech text-[8px] text-[#1a1a1a] tracking-[4px] mt-10">
          [ SYSTEM READY · AWAITING INPUT · ALL NODES ACTIVE ]
        </div>
      </div>
    </section>
  );
}
