import LivePreview from "@/components/LivePreview";
import Reveal from "@/components/Reveal";

const experiments = [
  {
    id: "EXP-01",
    name: "CHAINSTER",
    tag: "ACTIVE",
    desc: "Social layer built on identity primitives. Post, broadcast, connect.",
    note: "[ MODULE ACTIVE ]",
    color: "#00ff88",
    path: "/app/chainster",
  },
  {
    id: "EXP-02",
    name: "404-GLITCH",
    tag: "ACTIVE",
    desc: "An AI entity living inside the system. Unpredictable by design.",
    note: "[ SIGNAL DETECTED ]",
    color: "#ff00cc",
    path: "/app/404",
  },
  {
    id: "EXP-03",
    name: "UNKNOWN",
    tag: "LOCKED",
    desc: "Classified experiment. Access not yet granted to this node.",
    note: "[ ACCESS DENIED ]",
    color: "#333",
    path: null,
  },
];

export default function Experiments() {
  const activeCount = experiments.filter(e => e.tag === "ACTIVE").length;

  return (
    <section id="experiments" className="bg-black border-t border-[#111] text-white">
      <div className="px-10 md:px-20 py-24">

        {/* Header */}
        <Reveal className="flex items-end justify-between mb-14">
          <div>
            <div className="font-mono-tech text-[9px] text-[#00ff88]/70 tracking-[4px] mb-3 flex items-center gap-2">
              <span className="w-4 h-px bg-[#00ff88]/50" />
              ACTIVE EXPERIMENTS
            </div>
            <h2 className="font-orbitron font-black text-[32px] md:text-[40px] tracking-[3px] text-white leading-none">
              RUNNING<br />
              <span className="text-[#00ff88]">MODULES</span>
            </h2>
          </div>
          <div className="text-right">
            <div className="font-orbitron font-black text-[36px] text-[#00ff88] leading-none">{activeCount}</div>
            <div className="font-mono-tech text-[8px] tracking-[3px] text-[#333] mt-1">/{experiments.length} ONLINE</div>
          </div>
        </Reveal>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-px bg-[#111] mb-px">
          {experiments.map((exp, i) => (
            <Reveal key={exp.id} delay={i * 80}>
              <div
                className={`relative bg-black p-10 h-full group transition-colors duration-300 ${
                  exp.tag === "LOCKED" ? "opacity-30" : "hover:bg-[#050505]"
                }`}
              >
                {/* Top accent line on hover */}
                <div
                  className="absolute top-0 left-0 right-0 h-[1px] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{ background: exp.color }}
                />

                {/* ID + status */}
                <div className="flex items-center justify-between mb-8">
                  <span className="font-mono-tech text-[9px] tracking-[3px] text-[#333]">{exp.id}</span>
                  <span
                    className="font-mono-tech text-[8px] tracking-[2px] px-2 py-1 border"
                    style={{
                      color: exp.tag === "ACTIVE" ? exp.color : "#333",
                      borderColor: exp.tag === "ACTIVE" ? `${exp.color}40` : "#222",
                    }}
                  >
                    {exp.tag}
                  </span>
                </div>

                {/* Name */}
                <div
                  className="font-orbitron font-black text-[26px] tracking-[3px] mb-1 transition-colors duration-300"
                  style={{ color: exp.tag === "LOCKED" ? "#333" : "white" }}
                >
                  {exp.name}
                </div>

                {/* Accent bar */}
                <div
                  className="h-[2px] mb-5 w-8 group-hover:w-16 transition-all duration-500"
                  style={{ background: exp.color }}
                />

                <p className="font-mono-tech text-[11px] text-[#555] leading-[1.9] mb-6 tracking-[0.5px]">
                  {exp.desc}
                </p>

                <div
                  className="font-mono-tech text-[8px] tracking-[3px]"
                  style={{ color: exp.tag === "ACTIVE" ? `${exp.color}50` : "#222" }}
                >
                  {exp.note}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Live preview row */}
        <Reveal delay={140}>
          <div className="grid md:grid-cols-3 gap-px bg-[#111]">
            <div className="bg-black p-8 flex flex-col justify-center">
              <div className="font-mono-tech text-[8px] text-[#00ff88]/60 tracking-[4px] mb-4 flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[#00ff88] blink" />
                EXP-01 · CHAINSTER
              </div>
              <h3 className="font-orbitron font-black text-[20px] tracking-[3px] text-white mb-3 leading-tight">
                LIVE FROM<br />THE NETWORK
              </h3>
              <p className="font-mono-tech text-[10px] text-[#444] leading-[1.9] mb-5 tracking-[0.5px]">
                Real signals from inside the system. Updating continuously.
              </p>
              <div className="font-mono-tech text-[8px] tracking-[3px] text-[#00ff88]/30">[ STREAM OPEN ]</div>
            </div>
            <div className="md:col-span-2 bg-black p-6">
              <LivePreview />
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}
