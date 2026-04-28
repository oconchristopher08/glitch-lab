const pillars = [
  { num: "01", title: "BREAK THE INTERFACE", desc: "Conventional UI is dead. We design for disruption." },
  { num: "02", title: "REBUILD THE SYSTEM", desc: "Every experiment teaches us what the next one should destroy." },
  { num: "03", title: "EVOLVE THE NETWORK", desc: "Identity, community, and value — fused into one protocol." },
];

export default function Vision() {
  return (
    <section className="bg-[#050505] border-t border-[#1a1a1a] text-white px-10 md:px-20 py-20">
      <div className="mb-12 flex items-end justify-between">
        <div>
          <div className="font-mono-tech text-[10px] text-[#00ff88] tracking-[3px] mb-2">THE VISION</div>
          <h2 className="font-orbitron font-black text-[28px] tracking-[4px] text-white">
            NOT A STUDIO. <span className="text-[#00ff88]">A SYSTEM.</span>
          </h2>
        </div>
        <p className="text-[13px] text-[#555] max-w-xs leading-[1.8] text-right">
          The internet is entering a phase of controlled chaos — where identity, value, and community collapse into a single living system.
        </p>
      </div>

      <div
        className="grid"
        style={{ gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "#1a1a1a" }}
      >
        {pillars.map((p) => (
          <div key={p.num} className="section-hover bg-[#050505] p-12">
            <div className="font-orbitron font-black text-[36px] text-[#00ff88] leading-none mb-1">{p.num}</div>
            <div className="font-mono-tech text-[9px] text-[#333] tracking-[3px] mb-5">DIRECTIVE</div>
            <div className="font-orbitron font-bold text-[13px] tracking-[2px] text-white mb-3">{p.title}</div>
            <div className="w-6 h-[2px] bg-[#00ff88] mb-4" />
            <p className="text-[13px] text-[#666] leading-[1.7]">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
