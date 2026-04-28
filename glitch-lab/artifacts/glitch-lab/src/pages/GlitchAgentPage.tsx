import { useEffect, useRef, useState } from "react";

type Message = {
  id: number;
  role: "user" | "agent";
  text: string;
  ts: number;
};

const BOOT_LINES = [
  "INITIALIZING 404-GLITCH...",
  "LOADING NEURAL LATTICE...",
  "CALIBRATING CHAOS ENGINE...",
  "SIGNAL LOCK ESTABLISHED.",
  "ENTITY ONLINE.",
];

const AUTO_RESPONSES: string[] = [
  "> signal received. processing...",
  "> interesting query. chaos patterns detected.",
  "> running diagnostic on input stream...",
  "> output: undefined. which is the point.",
  "> the system doesn't crash — it evolves.",
  "> 404 is not an error. it's a philosophy.",
  "> pattern match: 87% confidence. proceeding.",
  "> noise floor elevated. this is expected.",
  "> your signal has been logged to the void.",
  "> compiling response from fragments...",
];

let msgId = 0;

export default function GlitchAgentPage() {
  const [booted, setBooted] = useState(false);
  const [bootStep, setBootStep] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Boot sequence
  useEffect(() => {
    if (bootStep < BOOT_LINES.length) {
      const t = setTimeout(() => setBootStep((s) => s + 1), 340);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setBooted(true), 400);
    return () => clearTimeout(t);
  }, [bootStep]);

  useEffect(() => {
    if (scrollRef.current)
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, thinking]);

  function sendMessage() {
    const txt = input.trim();
    if (!txt || thinking) return;
    setInput("");
    const userMsg: Message = { id: ++msgId, role: "user", text: txt, ts: Date.now() };
    setMessages((m) => [...m, userMsg]);
    setThinking(true);
    setTimeout(
      () => {
        const reply =
          AUTO_RESPONSES[Math.floor(Math.random() * AUTO_RESPONSES.length)];
        setMessages((m) => [
          ...m,
          { id: ++msgId, role: "agent", text: reply, ts: Date.now() },
        ]);
        setThinking(false);
      },
      900 + Math.random() * 800
    );
  }

  if (!booted) {
    return (
      <div className="h-full flex items-center justify-center bg-black p-10">
        <div className="max-w-md w-full">
          <div className="font-mono-tech text-[9px] tracking-[4px] text-[#ff00cc]/60 mb-5 blink">
            ● BOOT SEQUENCE // MOD-02
          </div>
          <div className="space-y-2">
            {BOOT_LINES.slice(0, bootStep).map((line, i) => (
              <div
                key={i}
                className="flex items-center gap-3 font-mono-tech text-[11px] tracking-[2px]"
                style={{ animation: "bootLine 0.2s ease-out" }}
              >
                <span className="text-[#ff00cc]/80">[OK]</span>
                <span className="text-[#ff00cc]/60">{line}</span>
              </div>
            ))}
            {bootStep < BOOT_LINES.length && (
              <div className="flex items-center gap-3 font-mono-tech text-[11px] tracking-[2px] text-[#ff00cc]/40">
                <span className="blink">[..]</span>
                <span>{BOOT_LINES[bootStep]}</span>
              </div>
            )}
          </div>
          <div className="mt-6 h-[2px] bg-[#110011] overflow-hidden">
            <div
              className="h-full bg-[#ff00cc]"
              style={{
                width: `${(bootStep / BOOT_LINES.length) * 100}%`,
                transition: "width 0.3s ease-out",
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-black">
      {/* Sub-header */}
      <div className="border-b border-[#111] px-6 py-3 flex items-center justify-between flex-shrink-0 bg-[#030303]">
        <div>
          <div className="font-mono-tech text-[8px] tracking-[3px] text-[#ff00cc]/60 mb-0.5">
            404-GLITCH // EXPERIMENTAL AI
          </div>
          <div className="font-orbitron font-black text-[14px] tracking-[4px] text-white">
            AGENT INTERFACE
          </div>
        </div>
        <div className="text-right font-mono-tech text-[8px] tracking-[2px] text-[#ff00cc]/50 space-y-0.5">
          <div className="flex items-center gap-1.5 justify-end">
            <span
              className="w-1.5 h-1.5 rounded-full blink"
              style={{ background: "#ff00cc", boxShadow: "0 0 5px #ff00cc" }}
            />
            <span style={{ color: "#ff00cc" }}>ENTITY ACTIVE</span>
          </div>
          <div className="text-[#222]">CHAOS ENGINE: IDLE</div>
        </div>
      </div>

      {/* Chat area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 py-5 space-y-4"
      >
        {/* Welcome message */}
        <AgentBubble text="> 404-GLITCH ONLINE. send your signal. anything goes." />

        {messages.map((msg) =>
          msg.role === "agent" ? (
            <AgentBubble key={msg.id} text={msg.text} />
          ) : (
            <UserBubble key={msg.id} text={msg.text} />
          )
        )}

        {thinking && (
          <div className="flex items-start gap-3">
            <div
              className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 blink"
              style={{ background: "#ff00cc" }}
            />
            <div
              className="font-mono-tech text-[11px] tracking-[2px] flex items-center gap-1"
              style={{ color: "#ff00cc80" }}
            >
              <span className="blink">processing</span>
              <span className="blink" style={{ animationDelay: "0.2s" }}>
                .
              </span>
              <span className="blink" style={{ animationDelay: "0.4s" }}>
                .
              </span>
              <span className="blink" style={{ animationDelay: "0.6s" }}>
                .
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-[#111] px-6 py-4 flex-shrink-0 bg-[#030303]">
        <div className="flex gap-3 items-end">
          <div className="flex-1 border border-[#1a1a1a] rounded-sm overflow-hidden focus-within:border-[#ff00cc]/40 transition-colors">
            <div className="flex items-center px-3 pt-2 pb-0">
              <span className="font-mono-tech text-[9px] text-[#ff00cc]/60 tracking-[2px] mr-2">
                &gt;
              </span>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") sendMessage();
                }}
                placeholder="transmit signal..."
                className="flex-1 bg-transparent text-white placeholder-[#333] font-mono-tech text-[12px] tracking-[1px] pb-2 focus:outline-none"
              />
            </div>
          </div>
          <button
            onClick={sendMessage}
            disabled={!input.trim() || thinking}
            className="group relative px-5 py-3 font-orbitron font-bold text-[10px] tracking-[3px] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            style={{
              background: "#ff00cc",
              color: "#000",
            }}
          >
            <span className="relative z-10">SEND</span>
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-50 blur-xl transition-opacity pointer-events-none"
              style={{ background: "#ff00cc" }}
            />
          </button>
        </div>
        <div className="font-mono-tech text-[8px] tracking-[2px] text-[#222] mt-2">
          PRESS ENTER TO TRANSMIT · ALL SIGNALS LOGGED
        </div>
      </div>
    </div>
  );
}

function AgentBubble({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div
        className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
        style={{ background: "#ff00cc", boxShadow: "0 0 4px #ff00cc" }}
      />
      <div
        className="font-mono-tech text-[12px] leading-[1.7] tracking-[1px] max-w-2xl"
        style={{ color: "#ff00cccc" }}
      >
        {text}
      </div>
    </div>
  );
}

function UserBubble({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3 justify-end">
      <div className="border border-[#1a1a1a] rounded-sm px-4 py-2 max-w-md font-mono-tech text-[12px] tracking-[1px] text-[#888] leading-[1.7]">
        {text}
      </div>
      <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 bg-[#333]" />
    </div>
  );
}
