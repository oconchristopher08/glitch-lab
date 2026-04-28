import { useState, useEffect } from "react";
import { Link, useRoute, useLocation } from "wouter";

const MODULES = [
  {
    id: "chainster",
    path: "/app/chainster",
    label: "CHAINSTER",
    code: "MOD-01",
    tag: "SOCIAL LAYER",
    color: "#00ff88",
    status: "ONLINE",
  },
  {
    id: "404",
    path: "/app/404",
    label: "404-GLITCH",
    code: "MOD-02",
    tag: "AI LAYER",
    color: "#ff00cc",
    status: "ONLINE",
  },
  {
    id: "profile",
    path: "/app/profile",
    label: "PROFILE",
    code: "SYS-01",
    tag: "IDENTITY",
    color: "#00ff88",
    status: "IDLE",
  },
];

const NODE = (Math.floor(Math.random() * 0xfffff) + 0x10000)
  .toString(16)
  .toUpperCase();

function SidebarItem({
  mod,
  active,
}: {
  mod: (typeof MODULES)[0];
  active: boolean;
}) {
  const [, setLocation] = useLocation();
  return (
    <button
      type="button"
      onClick={() => setLocation(mod.path)}
      className={`w-full text-left px-3 py-3 rounded-sm font-mono-tech text-[11px] tracking-[2px] transition-all border relative group ${
        active
          ? "bg-[#00ff88]/8 border-[#00ff88]/30 text-white"
          : "border-transparent text-[#555] hover:bg-[#0a0a0a] hover:text-[#aaa] hover:border-[#222]"
      }`}
    >
      {/* active accent line */}
      {active && (
        <span
          className="absolute left-0 top-2 bottom-2 w-[2px] rounded-full"
          style={{ background: mod.color }}
        />
      )}
      <div className="flex items-center justify-between pl-2">
        <div className="flex items-center gap-2.5">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{
              background: active ? mod.color : "#333",
              boxShadow: active ? `0 0 6px ${mod.color}` : "none",
            }}
          />
          <span
            style={{ color: active ? mod.color : undefined }}
          >
            {mod.label}
          </span>
        </div>
        <span className="text-[8px] text-[#333] group-hover:text-[#444]">
          {mod.code}
        </span>
      </div>
      <div
        className="pl-6 mt-0.5 text-[8px] tracking-[2px]"
        style={{ color: active ? `${mod.color}60` : "#2a2a2a" }}
      >
        {mod.tag}
      </div>
    </button>
  );
}

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [time, setTime] = useState(() => fmt(new Date()));
  const [location] = useLocation();

  useEffect(() => {
    const t = setInterval(() => setTime(fmt(new Date())), 1000);
    return () => clearInterval(t);
  }, []);

  const activeModule =
    MODULES.find((m) => location.startsWith(m.path)) ?? MODULES[0];

  return (
    <div className="fixed inset-0 top-6 bg-black text-white flex overflow-hidden">
      {/* Sidebar */}
      <aside className="hidden md:flex w-60 border-r border-[#111] bg-[#030303] flex-col flex-shrink-0">
        {/* Wordmark */}
        <div className="px-5 py-5 border-b border-[#111]">
          <Link
            href="/"
            className="font-orbitron font-black text-[15px] tracking-[5px] text-white hover:text-[#00ff88] transition-colors block"
          >
            GLITCH<span className="text-[#00ff88]">/</span>LAB
          </Link>
          <div className="font-mono-tech text-[8px] tracking-[3px] text-[#00ff88]/60 mt-1 flex items-center gap-1.5">
            <span
              className="inline-block w-1 h-1 rounded-full bg-[#00ff88]"
              style={{ boxShadow: "0 0 4px #00ff88" }}
            />
            SYSTEM ONLINE
          </div>
        </div>

        {/* Module label */}
        <div className="px-5 pt-5 pb-2">
          <div className="font-mono-tech text-[8px] tracking-[3px] text-[#333] uppercase">
            Modules
          </div>
        </div>

        {/* Nav */}
        <nav className="px-3 space-y-0.5 flex-1">
          {MODULES.map((mod) => (
            <SidebarItem
              key={mod.id}
              mod={mod}
              active={location.startsWith(mod.path)}
            />
          ))}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-[#111] font-mono-tech text-[8px] tracking-[2px] text-[#2a2a2a] space-y-1">
          <div>SIGNAL // STABLE</div>
          <div>NODE/{NODE}</div>
          <div className="text-[#00ff88]/40">UTC {time}</div>
        </div>
      </aside>

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-6 left-0 right-0 z-50 bg-[#030303] border-b border-[#111] px-4 py-3 flex items-center gap-4 overflow-x-auto">
        {MODULES.map((mod) => {
          const active = location.startsWith(mod.path);
          return (
            <Link
              key={mod.id}
              href={mod.path}
              className={`flex-shrink-0 font-mono-tech text-[10px] tracking-[2px] px-3 py-1.5 border rounded-sm transition-all ${
                active
                  ? "border-[#00ff88]/40 text-[#00ff88] bg-[#00ff88]/8"
                  : "border-[#222] text-[#555] hover:text-white hover:border-[#333]"
              }`}
            >
              {mod.label}
            </Link>
          );
        })}
      </div>

      {/* Main area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden md:mt-0 mt-12">
        {/* Top bar */}
        <header className="border-b border-[#111] px-6 py-3 flex items-center justify-between flex-shrink-0 bg-[#030303]">
          <div className="flex items-center gap-3">
            <div
              className="font-mono-tech text-[8px] tracking-[3px]"
              style={{ color: `${activeModule.color}80` }}
            >
              SYS://GLITCH-OS/{activeModule.code}
            </div>
            <div className="hidden sm:block w-px h-3 bg-[#222]" />
            <div
              className="hidden sm:block font-orbitron font-bold text-[13px] tracking-[4px]"
              style={{ color: activeModule.color }}
            >
              {activeModule.label}
            </div>
          </div>
          <div
            className="font-mono-tech text-[9px] tracking-[3px] flex items-center gap-1.5"
            style={{ color: activeModule.color }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full blink"
              style={{
                background: activeModule.color,
                boxShadow: `0 0 5px ${activeModule.color}`,
              }}
            />
            {activeModule.status}
          </div>
        </header>

        {/* Module content */}
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}

function fmt(d: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`;
}
