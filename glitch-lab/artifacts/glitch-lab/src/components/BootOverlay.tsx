import { useEffect, useState } from "react";

const STEPS = [
  "INITIALIZING SYSTEM...",
  "LOADING MODULES...",
  "ESTABLISHING SIGNAL...",
  "VERIFYING IDENTITY...",
  "ACCESS GRANTED.",
];

type Props = { onComplete: () => void };

export default function BootOverlay({ onComplete }: Props) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (step >= STEPS.length) {
      const t = setTimeout(onComplete, 380);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStep((s) => s + 1), 280);
    return () => clearTimeout(t);
  }, [step, onComplete]);

  const pct = Math.min(100, (step / STEPS.length) * 100);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black text-[#00ff88] font-mono-tech flex items-center justify-center p-10"
      style={{ animation: "bootFade 0.18s ease-out" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "repeating-linear-gradient(0deg, rgba(0,255,136,0.05) 0, rgba(0,255,136,0.05) 1px, transparent 1px, transparent 4px)",
        }}
      />
      <span className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-[#00ff88]" />
      <span className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-[#00ff88]" />
      <span className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-[#00ff88]" />
      <span className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-[#00ff88]" />

      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-[9px] tracking-[4px] text-[#00ff88]/60">
        SYS://LAB.CORE/BOOT
      </div>

      <div className="max-w-xl w-full relative z-10">
        <div className="text-[10px] tracking-[4px] text-[#00ff88] mb-6 blink">
          ● BOOT SEQUENCE
        </div>

        <div className="space-y-2 text-[12px] tracking-[2px]">
          {STEPS.slice(0, step).map((s, i) => {
            const isFinal = i === STEPS.length - 1;
            return (
              <div
                key={i}
                className="flex items-center gap-3"
                style={{ animation: "bootLine 0.25s ease-out" }}
              >
                <span className="text-[#00ff88]">[OK]</span>
                <span
                  className={
                    isFinal
                      ? "font-bold text-white text-[14px] tracking-[3px]"
                      : "text-[#00ff88]/80"
                  }
                >
                  {s}
                </span>
              </div>
            );
          })}
          {step < STEPS.length && (
            <div className="flex items-center gap-3 text-[#00ff88]/60">
              <span className="blink">[..]</span>
              <span>{STEPS[step]}</span>
            </div>
          )}
        </div>

        <div className="mt-8 h-[2px] bg-[#0e1f17] overflow-hidden">
          <div
            className="h-full bg-[#00ff88]"
            style={{ width: `${pct}%`, transition: "width 0.25s ease-out" }}
          />
        </div>

        <div className="mt-3 flex items-center justify-between text-[9px] tracking-[3px] text-[#00ff88]/50">
          <span>NODE/{(step * 1187 + 4290).toString(16).toUpperCase()}</span>
          <span>GLITCH-LAB.SYS · v2.0.0</span>
        </div>
      </div>
    </div>
  );
}
