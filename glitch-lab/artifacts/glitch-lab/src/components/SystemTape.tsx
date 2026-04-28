import { useEffect, useState } from "react";

const NODE = (Math.floor(Math.random() * 0xfffff) + 0x10000)
  .toString(16)
  .toUpperCase();

export default function SystemTape() {
  const [time, setTime] = useState(() => fmt(new Date()));

  useEffect(() => {
    const t = setInterval(() => setTime(fmt(new Date())), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-6 bg-black/85 backdrop-blur border-b border-[#0f0f0f] px-4 flex items-center justify-between font-mono-tech text-[9px] tracking-[3px] text-[#00ff88]/70 select-none">
      <div className="flex items-center gap-4">
        <span className="text-[#00ff88]">● SYSTEM ONLINE</span>
        <span className="hidden md:inline text-[#333]">|</span>
        <span className="hidden md:inline text-[#555]">SIGNAL // STABLE</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="hidden sm:inline text-[#555]">UTC {time}</span>
        <span className="text-[#333]">|</span>
        <span className="text-[#00ff88]/80">NODE/{NODE}</span>
      </div>
    </div>
  );
}

function fmt(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(
    d.getUTCSeconds()
  )}`;
}
