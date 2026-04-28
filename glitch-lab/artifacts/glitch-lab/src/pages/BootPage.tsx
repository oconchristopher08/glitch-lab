import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";

const STEPS = [
  "VERIFYING IDENTITY...",
  "LOADING MODULES...",
  "ESTABLISHING SIGNAL...",
  "SYNCING NODE...",
  "ACCESS GRANTED.",
];

export default function BootPage() {
  const [step, setStep] = useState(0);
  const [, setLocation] = useLocation();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      setLocation("/auth/login");
      return;
    }
  }, [user, loading, setLocation]);

  useEffect(() => {
    if (step < STEPS.length) {
      const t = setTimeout(() => setStep((s) => s + 1), 300);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setLocation("/app/chainster"), 400);
    return () => clearTimeout(t);
  }, [step, setLocation]);

  const pct = Math.min(100, (step / STEPS.length) * 100);

  return (
    <div className="fixed inset-0 z-[9999] bg-black text-[#00ff88] font-mono-tech flex items-center justify-center p-10">
      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "repeating-linear-gradient(0deg, rgba(0,255,136,0.04) 0, rgba(0,255,136,0.04) 1px, transparent 1px, transparent 4px)" }} />

      {/* Corner brackets */}
      <span className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-[#00ff88]" />
      <span className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-[#00ff88]" />
      <span className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-[#00ff88]" />
      <span className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-[#00ff88]" />

      <div className="absolute top-6 left-1/2 -translate-x-1/2 text-[9px] tracking-[4px] text-[#00ff88]/50">
        SYS://LAB.CORE/BOOT
      </div>

      <div className="max-w-xl w-full relative z-10">
        <div className="text-[9px] tracking-[4px] text-[#00ff88] mb-6 blink">
          ● BOOT SEQUENCE
        </div>

        {user && (
          <div className="font-mono-tech text-[10px] tracking-[3px] text-[#00ff88]/40 mb-5">
            IDENTITY: {user.user_metadata?.username || user.email}
          </div>
        )}

        <div className="space-y-2 text-[12px] tracking-[2px]">
          {STEPS.slice(0, step).map((s, i) => (
            <div key={i} className="flex items-center gap-3"
              style={{ animation: "bootLine 0.25s ease-out" }}>
              <span className="text-[#00ff88]">[OK]</span>
              <span className={i === STEPS.length - 1
                ? "font-bold text-white text-[14px] tracking-[3px]"
                : "text-[#00ff88]/70"}>
                {s}
              </span>
            </div>
          ))}
          {step < STEPS.length && (
            <div className="flex items-center gap-3 text-[#00ff88]/40">
              <span className="blink">[..]</span>
              <span>{STEPS[step]}</span>
            </div>
          )}
        </div>

        <div className="mt-8 h-[2px] bg-[#0e1f17] overflow-hidden">
          <div className="h-full bg-[#00ff88]"
            style={{ width: `${pct}%`, transition: "width 0.28s ease-out" }} />
        </div>

        <div className="mt-3 flex items-center justify-between text-[9px] tracking-[3px] text-[#00ff88]/40">
          <span>NODE/{(step * 1187 + 4290).toString(16).toUpperCase()}</span>
          <span>GLITCH-OS · v2.0.0</span>
        </div>
      </div>
    </div>
  );
}
