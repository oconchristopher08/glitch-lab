import Reveal from "@/components/Reveal";

const pillars = [
  {
    num: "01",
    title: "BREAK THE INTERFACE",
    desc: "Conventional UI is dead. We design for disruption — systems that expose their own seams.",
    note: "[ PROTOCOL ACTIVE ]",
    accent: "#00ff88",
  },
  {
    num: "02",
    title: "REBUILD THE SYSTEM",
    desc: "Every experiment teaches us what the next one should destroy. Failure is the architecture.",
    note: "[ MODULE ACTIVE ]",
    accent: "#ff00cc",
  },
  {
    num: "03",
    title: "EVOLVE THE NETWORK",
    desc: "Identity, community, and value — fused into one living protocol that rewrites itself.",
    note: "[ SIGNAL EVOLVING ]",
    accent: "#00ff88",
  },
];

export default function Vision() {
  return (
    <section className="bg-black border-t border-[#111] text-white px-10 md:px-20 py-28">

      {/* Header row */}
      <Reveal className="mb-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div>
            <div className="font-mono-tech text-[9px] text-[#00ff88]/70 tracking-[4px] mb-4 flex items-center gap-2">
              <span className="w-4 h-px bg-[#00ff88]/50" />
              THE VISION
            </div>
            <h2 className="font-orbitron font-black leading-none tracking-[2px]" style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>
              NOT A STUDIO.
              <br />
              <span className="text-[#00ff88]">A SYSTEM.</span>
            </h2>
          </div>
          <p className="font-mono-tech text-[11px] text-[#444] max-w-sm leading-[2] tracking-[0.5px] md:text-right">
            The internet is entering a phase of controlled chaos —<br />
            where identity, value, and community collapse<br />
            into a single living system.
          </p>
        </div>
      </Reveal>

      {/* Pillars */}
      <div className="grid md:grid-cols-3 gap-px bg-[#111]">
        {pillars.map((p, i) => (
          <Reveal key={p.num} delay={i * 100}>
            <div className="relative bg-black p-12 h-full group hover:bg-[#050505] transition-colors duration-300">

              {/* Left border accent on hover */}
              <div
                className="absolute left-0 top-8 bottom-8 w-[2px] scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-top"
                style={{ background: p.accent }}
              />

              {/* Number */}
              <div
                className="font-orbitron font-black text-[52px] leading-none mb-1 transition-colors duration-300"
                style={{ color: `${p.accent}20` }}
              >
                {p.num}
              </div>

              <div className="font-mono-tech text-[8px] text-[#2a2a2a] tracking-[3px] mb-6">DIRECTIVE</div>

              <div
                className="font-orbitron font-bold text-[13px] tracking-[2px] text-white mb-4 group-hover:tracking-[3px] transition-all duration-300"
              >
                {p.title}
              </div>

              <div
                className="h-px mb-5 w-8 group-hover:w-20 transition-all duration-500"
                style={{ background: p.accent }}
              />

              <p className="font-mono-tech text-[11px] text-[#555] leading-[1.9] mb-6 tracking-[0.5px]">
                {p.desc}
              </p>

              <div className="font-mono-tech text-[8px] tracking-[3px]" style={{ color: `${p.accent}30` }}>
                {p.note}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

    </section>
  );
}
