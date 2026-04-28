import Reveal from "@/components/Reveal";

const modules = [
  {
    id: "MOD-01",
    name: "IDENTITY LAYER",
    status: "ACTIVE",
    desc: "On-chain identity primitives and social graph.",
  },
  {
    id: "MOD-02",
    name: "CHAOS ENGINE",
    status: "ACTIVE",
    desc: "Randomized system mutations for stress testing.",
  },
  {
    id: "MOD-03",
    name: "SIGNAL PROTOCOL",
    status: "BETA",
    desc: "Encrypted peer-to-peer communication layer.",
  },
  {
    id: "MOD-04",
    name: "DARK ARCHIVE",
    status: "LOCKED",
    desc: "Classified. Access restricted.",
  },
];

const statusColor: Record<string, string> = {
  ACTIVE: "#00ff88",
  BETA: "#ffcc00",
  LOCKED: "#333",
};

export default function Modules() {
  return (
    <section className="bg-[#050505] border-t border-[#1a1a1a] text-white px-10 md:px-20 py-24">
      <Reveal className="mb-10">
        <div className="font-mono-tech text-[10px] text-[#00ff88] tracking-[3px] mb-2">
          SYSTEM MODULES
        </div>
        <h2 className="font-orbitron font-black text-[28px] tracking-[4px] text-white">
          ACTIVE PROTOCOLS
        </h2>
      </Reveal>

      <div
        className="flex flex-col"
        style={{ gap: "1px", background: "#1a1a1a" }}
      >
        {modules.map((mod, i) => (
          <Reveal key={mod.id} delay={i * 70}>
            <div
              className={`section-hover glow-card bg-[#050505] flex items-center justify-between px-8 py-6 ${
                mod.status === "LOCKED" ? "opacity-40" : ""
              }`}
            >
              <div className="flex items-center gap-8">
                <span className="font-mono-tech text-[10px] text-[#444] tracking-[2px] w-16">
                  {mod.id}
                </span>
                <div>
                  <div className="font-orbitron font-bold text-[14px] tracking-[3px] text-white">
                    {mod.name}
                  </div>
                  <div className="text-[12px] text-[#555] mt-1">{mod.desc}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="hidden md:inline font-mono-tech text-[9px] tracking-[3px] text-[#333]">
                  {mod.status === "ACTIVE"
                    ? "[ MODULE ACTIVE ]"
                    : mod.status === "BETA"
                      ? "[ TESTING ]"
                      : "[ LOCKED ]"}
                </span>
                <span
                  className="font-mono-tech text-[10px] tracking-[2px] px-3 py-1 border"
                  style={{
                    color: statusColor[mod.status],
                    borderColor: statusColor[mod.status],
                  }}
                >
                  {mod.status}
                </span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
