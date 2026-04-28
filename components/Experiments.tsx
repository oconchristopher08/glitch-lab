const experiments = [
  { id: "EXP-01", name: "CHAINSTER", tag: "ACTIVE", desc: "Social + crypto + identity system" },
  { id: "EXP-02", name: "404-GLITCH", tag: "ACTIVE", desc: "AI entity inside the system" },
  { id: "EXP-03", name: "UNKNOWN", tag: "LOCKED", desc: "Locked module" },
];

export default function Experiments() {
  return (
    <section className="bg-[#050505] border-t border-[#1a1a1a] text-white">
      <div className="px-10 md:px-20 py-14">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="font-mono-tech text-[10px] text-[#00ff88] tracking-[3px] mb-2">ACTIVE EXPERIMENTS</div>
            <h2 className="font-orbitron font-black text-[28px] tracking-[4px] text-white">RUNNING MODULES</h2>
          </div>
          <div className="font-mono-tech text-[10px] text-[#333] tracking-[2px]">
            {experiments.filter(e => e.tag === "ACTIVE").length}/{experiments.length} ONLINE
          </div>
        </div>

        <div
          className="grid"
          style={{ gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "#1a1a1a" }}
        >
          {experiments.map((exp) => (
            <div
              key={exp.id}
              className={`section-hover bg-[#050505] p-10 relative ${exp.tag === "LOCKED" ? "opacity-40" : ""}`}
            >
              <div className="absolute top-4 right-4 font-mono-tech text-[9px] tracking-[2px] px-2 py-1 border"
                style={{
                  color: exp.tag === "ACTIVE" ? "#00ff88" : "#555",
                  borderColor: exp.tag === "ACTIVE" ? "#00ff88" : "#333",
                }}
              >
                {exp.tag}
              </div>
              <div className="font-mono-tech text-[10px] text-[#444] tracking-[2px] mb-3">{exp.id}</div>
              <div className="font-orbitron font-black text-[22px] tracking-[3px] text-white mb-2">{exp.name}</div>
              <div className="w-5 h-[2px] bg-[#00ff88] mb-3" />
              <p className="text-[13px] text-[#666] leading-[1.7]">{exp.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
