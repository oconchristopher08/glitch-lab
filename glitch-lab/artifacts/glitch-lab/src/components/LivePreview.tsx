import { useEffect, useState } from "react";

const LINES: { user: string; msg: string }[] = [
  { user: "user_01", msg: "exploring glitch lab..." },
  { user: "user_02", msg: "system feels alive" },
  { user: "404_signal", msg: "rebroadcasting noise..." },
  { user: "xstarlight", msg: "module 03 unlocked" },
  { user: "ghost_node", msg: "signal strength: 98%" },
  { user: "user_07", msg: "the wordmark glitches at random" },
  { user: "chaos.eng", msg: "running stress test #4291" },
  { user: "v0id", msg: "404 entity is watching" },
  { user: "byteflux", msg: "joining the network" },
];

const PAGE = 3;

export default function LivePreview() {
  const [feed, setFeed] = useState(() => LINES.slice(0, PAGE));

  useEffect(() => {
    let i = PAGE;
    const t = setInterval(() => {
      const next = LINES[i % LINES.length];
      setFeed((prev) => [...prev.slice(-(PAGE - 1)), next]);
      i++;
    }, 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="bg-black border border-[#1a1a1a] rounded-md p-4 hover:border-[#00ff88]/40 transition-colors h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <span className="font-mono-tech text-[9px] tracking-[3px] text-[#00ff88]">
          ● LIVE PREVIEW
        </span>
        <span className="font-mono-tech text-[9px] tracking-[2px] text-[#444]">
          /CHAINSTER
        </span>
      </div>
      <div className="space-y-2 font-mono-tech text-[11px] flex-1">
        {feed.map((line, i) => {
          const isLatest = i === feed.length - 1;
          return (
            <div
              key={`${i}-${line.user}-${line.msg}`}
              className="flex gap-2 items-baseline"
              style={{ animation: "feedIn 0.4s ease-out" }}
            >
              <span className="text-[#00ff88] tracking-[1px]">@{line.user}:</span>
              <span className={isLatest ? "text-white" : "text-[#666]"}>
                {line.msg}
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex items-center justify-between mt-3 pt-3 border-t border-[#111]">
        <span className="font-mono-tech text-[9px] tracking-[2px] text-[#333]">
          BROADCAST · REALTIME
        </span>
        <span className="font-mono-tech text-[9px] tracking-[2px] text-[#00ff88] blink">
          ● LIVE
        </span>
      </div>
    </div>
  );
}
