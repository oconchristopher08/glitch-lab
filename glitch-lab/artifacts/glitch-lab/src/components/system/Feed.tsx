import { useEffect, useRef, useState } from "react";
// @ts-ignore
import { supabase } from "@/lib/supabase";
import { Link } from "wouter";

type Post = {
  id: string;
  content: string;
  username: string;
  created_at: string;
};

const NAV = [
  { id: "feed", label: "FEED", code: "MOD-01" },
  { id: "modules", label: "MODULES", code: "MOD-02" },
  { id: "archive", label: "ARCHIVE", code: "MOD-03" },
  { id: "settings", label: "SETTINGS", code: "SYS" },
];

const TYPING_LINES = [
  "> scanning network...",
  "> packet 0x4F2A received",
  "> 404_glitch is online",
  "> identity verified",
  "> chaos engine: idle",
  "> signal strength 98%",
  "> module 03 unlocked",
  "> awaiting input...",
];

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeNav, setActiveNav] = useState("feed");

  useEffect(() => {
    fetchPosts();
    const channel = supabase
      .channel("posts-feed")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        (payload: { new: Post }) => {
          setPosts((prev) => [payload.new, ...prev]);
        },
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function fetchPosts() {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setPosts(data as Post[]);
  }

  async function createPost() {
    if (!content.trim()) return;
    setLoading(true);
    await supabase
      .from("posts")
      .insert([{ content, username: "xstarlight" }]);
    setContent("");
    setLoading(false);
    fetchPosts();
  }

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 border-r border-[#111] bg-[#040404] flex-col">
        <div className="px-6 py-6 border-b border-[#111]">
          <Link
            href="/"
            className="font-orbitron font-black text-[18px] tracking-[6px] text-white hover:text-[#00ff88] transition-colors"
          >
            GLITCH<span className="text-[#00ff88]">/</span>LAB
          </Link>
          <div className="font-mono-tech text-[9px] tracking-[3px] text-[#00ff88]/70 mt-1 blink">
            ● SYSTEM ONLINE
          </div>
        </div>

        <nav className="px-3 py-4 flex-1 space-y-1">
          {NAV.map((item) => {
            const active = activeNav === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveNav(item.id)}
                className={`w-full text-left flex items-center justify-between px-3 py-3 rounded-sm font-mono-tech text-[11px] tracking-[3px] transition-all border ${
                  active
                    ? "bg-[#00ff88]/10 border-[#00ff88]/40 text-[#00ff88]"
                    : "border-transparent text-[#666] hover:bg-[#0a0a0a] hover:text-white hover:border-[#222]"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`inline-block w-1.5 h-1.5 rounded-full ${
                      active ? "bg-[#00ff88]" : "bg-[#333]"
                    }`}
                  />
                  {item.label}
                </span>
                <span className="text-[8px] text-[#333]">{item.code}</span>
              </button>
            );
          })}
        </nav>

        <div className="px-6 py-4 border-t border-[#111] font-mono-tech text-[9px] tracking-[2px] text-[#333] space-y-1">
          <div>SIGNAL // STABLE</div>
          <div>NODE/{(Math.floor(Math.random() * 0xfffff) + 0x10000).toString(16).toUpperCase()}</div>
          <div className="text-[#00ff88]/60">[ MODULE ACTIVE ]</div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="border-b border-[#111] px-6 py-4 flex items-center justify-between">
          <div>
            <div className="font-mono-tech text-[9px] tracking-[3px] text-[#00ff88]/70 mb-1">
              SYS://CHAINSTER/FEED
            </div>
            <h2 className="font-orbitron font-black text-[18px] tracking-[5px] text-white">
              CHAINSTER FEED
            </h2>
          </div>
          <div className="font-mono-tech text-[9px] tracking-[3px] text-[#00ff88] blink">
            ● LIVE
          </div>
        </header>

        <div className="flex-1 grid lg:grid-cols-[1fr_280px] gap-px bg-[#111]">
          {/* Feed column */}
          <section className="bg-black p-6 space-y-5 overflow-y-auto">
            {/* Composer */}
            <div className="border border-[#222] rounded-md p-4 hover:border-[#00ff88]/40 transition-colors">
              <div className="font-mono-tech text-[9px] tracking-[3px] text-[#00ff88] mb-3">
                [ NEW BROADCAST ]
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && (e.metaKey || e.ctrlKey))
                    createPost();
                }}
                placeholder="Share something with the system..."
                rows={3}
                className="w-full p-3 bg-black border border-[#1a1a1a] rounded-sm text-white placeholder-[#444] resize-none focus:outline-none focus:border-[#00ff88] transition-colors font-mono-tech text-[13px]"
              />
              <div className="flex items-center justify-between mt-3">
                <span className="text-[10px] text-[#444] font-mono-tech tracking-[2px]">
                  ⌘ + ENTER TO BROADCAST
                </span>
                <button
                  onClick={createPost}
                  disabled={loading || !content.trim()}
                  className="group relative px-5 py-2 bg-[#00ff88] text-black font-orbitron font-bold text-[11px] tracking-[3px] hover:bg-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10">
                    {loading ? "POSTING..." : "POST"}
                  </span>
                  <span className="absolute inset-0 opacity-0 group-hover:opacity-60 bg-[#00ff88] blur-xl transition-opacity pointer-events-none" />
                </button>
              </div>
            </div>

            {/* Posts */}
            {posts.length === 0 ? (
              <div className="text-center text-[#444] py-20 font-mono-tech text-[12px] tracking-[3px] space-y-3">
                <div className="blink text-[#00ff88]">● SCANNING...</div>
                <div>NO SIGNALS DETECTED</div>
                <div className="text-[10px] text-[#333]">
                  BE THE FIRST TO BROADCAST
                </div>
              </div>
            ) : (
              posts.map((post) => (
                <article
                  key={post.id}
                  className="border border-[#1a1a1a] p-4 rounded-md hover:border-[#00ff88]/40 hover:bg-[#0a0a0a] transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[12px] text-[#00ff88] font-mono-tech tracking-[2px]">
                      @{post.username}
                    </span>
                    <span className="text-[10px] text-[#444] font-mono-tech tracking-[2px]">
                      {timeAgo(post.created_at)}
                    </span>
                  </div>
                  <p className="text-[#bbb] leading-relaxed text-[14px]">
                    {post.content}
                  </p>
                </article>
              ))
            )}
          </section>

          {/* Right rail: 404 console */}
          <aside className="hidden lg:flex bg-black p-6 flex-col gap-4">
            <div className="border border-[#1a1a1a] rounded-md p-4 hover:border-[#ff00cc]/40 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono-tech text-[9px] tracking-[3px] text-[#ff00cc]">
                  ● 404_GLITCH
                </span>
                <span className="font-mono-tech text-[9px] tracking-[2px] text-[#333]">
                  AI ENTITY
                </span>
              </div>
              <TypingConsole />
            </div>

            <div className="border border-[#1a1a1a] rounded-md p-4">
              <div className="font-mono-tech text-[9px] tracking-[3px] text-[#00ff88] mb-3">
                SYSTEM STATUS
              </div>
              <div className="space-y-2 font-mono-tech text-[10px] tracking-[2px] text-[#666]">
                <Stat label="UPTIME" value="99.4%" />
                <Stat label="LATENCY" value="42ms" />
                <Stat label="NODES" value="1,287" />
                <Stat label="SIGNALS" value="∞" />
              </div>
            </div>

            <div className="font-mono-tech text-[9px] text-[#222] tracking-[3px] mt-auto">
              v2.0.0-EXPERIMENTAL
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span>{label}</span>
      <span className="text-[#00ff88]">{value}</span>
    </div>
  );
}

function TypingConsole() {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [history, setHistory] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const line = TYPING_LINES[lineIdx % TYPING_LINES.length];
    if (charIdx < line.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), 35);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setHistory((h) => [...h.slice(-3), line]);
      setLineIdx((i) => i + 1);
      setCharIdx(0);
    }, 800);
    return () => clearTimeout(t);
  }, [charIdx, lineIdx]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history, charIdx]);

  const current = TYPING_LINES[lineIdx % TYPING_LINES.length].slice(0, charIdx);

  return (
    <div
      ref={containerRef}
      className="font-mono-tech text-[11px] text-[#ff00cc]/80 leading-[1.7] h-32 overflow-y-auto"
    >
      {history.map((line, i) => (
        <div key={i} className="opacity-50">
          {line}
        </div>
      ))}
      <div>
        {current}
        <span className="type-caret" />
      </div>
    </div>
  );
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}
