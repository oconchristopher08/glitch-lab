import Reveal from "@/components/Reveal";

const modules = [
  {
    id: "MOD-01",
    name: "IDENTITY LAYER",
    status: "ACTIVE",
    desc: "On-chain identity primitives and social graph.",
    bar: 92,
  },
  {
    id: "MOD-02",
    name: "CHAOS ENGINE",
    status: "ACTIVE",
    desc: "Randomized system mutations for stress testing.",
    bar: 87,
  },
  {
    id: "MOD-03",
    name: "SIGNAL PROTOCOL",
    status: "BETA",
    desc: "Encrypted peer-to-peer communication layer.",
    bar: 54,
  },
  {
    id: "MOD-04",
    name: "DARK ARCHIVE",
    status: "LOCKED",
    desc: "Classified. Access restricted.",
    bar: 0,
  },
];

const statusStyles: Record<string, { color: string; label: string }> = {
  ACTIVE: { color: "#00ff88", label: "[ MODULE ACTIVE ]" },
  BETA:   { color: "#ffcc00", label: "[ TESTING ]" },
  LOCKED: { color: "#2a2a2a", label: "[ LOCKED ]" },
};

export default function Modules() {
  return (
    <section className="bg-black border-t border-[#111] text-white px-10 md:px-20 py-24">

      {/* Header */}
      <Reveal className="flex items-end justify-between mb-14">
        <div>
          <div className="font-mono-tech text-[9px] text-[#00ff88]/70 tracking-[4px] mb-3 flex items-center gap-2">
            <span className="w-4 h-px bg-[#00ff88]/50" />
            SYSTEM MODULES
          </div>
          <h2 className="font-orbitron font-black text-[32px] md:text-[40px] tracking-[3px] text-white leading-none">
            ACTIVE<br />
            <span className="text-[#00ff88]">PROTOCOLS</span>
          </h2>
        </div>
        <div className="font-mono-tech text-[9px] text-[#222] tracking-[3px] text-right hidden md:block">
          <div>LAST SYNC: 00:00:00</div>
          <div className="mt-1 text-[#00ff88]/30">● REALTIME</div>
        </div>
      </Reveal>

      {/* Module list */}
      <div className="flex flex-col gap-px bg-[#111]">
        {modules.map((mod, i) => {
          const s = statusStyles[mod.status];
          const isLocked = mod.status === "LOCKED";
          return (
            <Reveal key={mod.id} delay={i * 60}>
              <div
                className={`relative bg-black group transition-colors duration-300 ${isLocked ? "opacity-30" : "hover:bg-[#050505] cursor-default"}`}
              >
                {/* Hover left accent */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-[2px] scale-y-0 group-hover:scale-y-100 transition-transform duration-400 origin-top"
                  style={{ background: s.color }}
                />

                <div className="flex items-center justify-between px-8 py-6">
                  {/* Left: ID + info */}
                  <div className="flex items-center gap-10">
                    <span className="font-mono-tech text-[9px] text-[#2a2a2a] tracking-[2px] w-16 flex-shrink-0">
                      {mod.id}
                    </span>
                    <div>
                      <div className="font-orbitron font-bold text-[14px] tracking-[3px] text-white mb-1 group-hover:tracking-[4px] transition-all duration-300">
                        {mod.name}
                      </div>
                      <div className="font-mono-tech text-[10px] text-[#444] tracking-[1px]">
                        {mod.desc}
                      </div>
                      {/* Progress bar */}
                      {!isLocked && (
                        <div className="mt-3 w-48 h-px bg-[#111] overflow-hidden">
                          <div
                            className="h-full transition-all duration-1000"
                            style={{ width: `${mod.bar}%`, background: s.color, boxShadow: `0 0 4px ${s.color}` }}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: label + badge */}
                  <div className="flex items-center gap-5 flex-shrink-0">
                    <span className="hidden md:inline font-mono-tech text-[8px] tracking-[3px]" style={{ color: `${s.color}40` }}>
                      {s.label}
                    </span>
                    <span
                      className="font-mono-tech text-[9px] tracking-[2px] px-3 py-1.5 border"
                      style={{ color: s.color, borderColor: `${s.color}35` }}
                    >
                      {mod.status}
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>

    </section>
  );
}
