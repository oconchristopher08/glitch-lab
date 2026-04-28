import { useGateway } from "@/lib/gateway";

export default function EnterLab() {
  const { enterLab } = useGateway();

  return (
    <section className="bg-[#050505] border-t border-[#1a1a1a] text-white px-10 md:px-20 py-32 md:py-40 relative overflow-hidden">
      {/* Glow */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,255,136,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="font-mono-tech text-[10px] text-[#00ff88] tracking-[4px] uppercase mb-4 blink">
          &gt; Initializing access...
        </div>

        <h2
          className="font-orbitron font-black tracking-[4px] text-white mb-6"
          style={{ fontSize: "clamp(32px, 5vw, 56px)" }}
        >
          READY TO ENTER<br />
          <span className="text-[#00ff88]">THE SYSTEM?</span>
        </h2>

        <p className="text-[14px] text-[#555] mb-10 leading-[1.8] max-w-md">
          Join the experiment. Help us break things. Build the next version of
          the web.
        </p>

        <div className="flex gap-4 flex-wrap">
          <button
            type="button"
            onClick={() => enterLab("/app/chainster")}
            className="group relative font-orbitron font-bold text-[12px] tracking-[3px] px-10 py-4 bg-[#00ff88] text-black hover:bg-white transition-colors"
          >
            <span className="relative z-10">ENTER LAB</span>
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-60 bg-[#00ff88] blur-2xl transition-opacity pointer-events-none"
              aria-hidden
            />
          </button>
          <button
            type="button"
            className="font-orbitron font-bold text-[12px] tracking-[3px] px-10 py-4 border border-[#333] text-[#666] hover:border-[#00ff88] hover:text-[#00ff88] transition-colors"
          >
            READ DOCS
          </button>
        </div>

        <div className="font-mono-tech text-[10px] text-[#222] tracking-[3px] mt-10">
          [ SYSTEM READY · AWAITING INPUT ]
        </div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-6 right-10 font-mono-tech text-[10px] text-[#222] tracking-[3px]">
        SYS://LAB.CORE/ACCESS
      </div>
      <div className="absolute bottom-6 right-10 font-mono-tech text-[10px] text-[#222] tracking-[3px]">
        v2.0.0-EXPERIMENTAL
      </div>
    </section>
  );
}
