import { useEffect, useRef, useState } from "react";
// @ts-ignore
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/hooks/useAuth";

type Post = {
  id: string;
  content: string;
  username: string;
  created_at: string;
};

const TYPING_LINES = [
  "> scanning network...",
  "> packet 0x4F2A received",
  "> 404_glitch is online",
  "> identity verified",
  "> chaos engine: idle",
  "> signal strength 98%",
  "> module 01 active",
  "> awaiting input...",
];

export default function ChainsterPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const handle = user?.user_metadata?.username || user?.email?.split("@")[0] || "anonymous";

  useEffect(() => {
    fetchPosts();
    const channel = supabase
      .channel("posts-feed")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        (payload: { new: Post }) => {
          setPosts((prev) => [payload.new, ...prev]);
        }
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
      .insert([{ content, username: handle }]);
    setContent("");
    setLoading(false);
    fetchPosts();
  }

  return (
    <div className="h-full grid lg:grid-cols-[1fr_260px] gap-px bg-[#0d0d0d]">
      {/* Feed column */}
      <section className="bg-black overflow-y-auto">
        {/* Sub-header */}
        <div className="sticky top-0 z-10 bg-black/95 backdrop-blur border-b border-[#111] px-6 py-3 flex items-center justify-between">
          <div>
            <div className="font-mono-tech text-[8px] tracking-[3px] text-[#00ff88]/60 mb-0.5">
              CHAINSTER // SOCIAL LAYER
            </div>
            <div className="font-orbitron font-black text-[14px] tracking-[4px] text-white">
              LIVE FEED
            </div>
          </div>
          <div className="flex items-center gap-1.5 font-mono-tech text-[9px] tracking-[3px] text-[#00ff88]">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full blink bg-[#00ff88]"
              style={{ boxShadow: "0 0 5px #00ff88" }}
            />
            LIVE
          </div>
        </div>

        <div className="p-6 space-y-4">
          {/* Composer */}
          <div className="border border-[#1a1a1a] rounded-md p-4 hover:border-[#00ff88]/30 transition-colors">
            <div className="font-mono-tech text-[8px] tracking-[3px] text-[#00ff88]/80 mb-3">
              [ NEW BROADCAST ]
            </div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) createPost();
              }}
              placeholder="Share something with the system..."
              rows={3}
              className="w-full p-3 bg-[#050505] border border-[#1a1a1a] rounded-sm text-white placeholder-[#333] resize-none focus:outline-none focus:border-[#00ff88]/50 transition-colors font-mono-tech text-[12px]"
            />
            <div className="flex items-center justify-between mt-3">
              <span className="text-[9px] text-[#333] font-mono-tech tracking-[2px]">
                ⌘ + ENTER TO BROADCAST
              </span>
              <button
                onClick={createPost}
                disabled={loading || !content.trim()}
                className="group relative px-5 py-2 bg-[#00ff88] text-black font-orbitron font-bold text-[10px] tracking-[3px] hover:bg-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <span className="relative z-10">
                  {loading ? "POSTING..." : "BROADCAST"}
                </span>
                <span className="absolute inset-0 opacity-0 group-hover:opacity-50 bg-[#00ff88] blur-xl transition-opacity pointer-events-none" />
              </button>
            </div>
          </div>

          {/* Posts */}
          {posts.length === 0 ? (
            <div className="text-center text-[#333] py-20 font-mono-tech text-[11px] tracking-[3px] space-y-3">
              <div className="blink" style={{ color: "#00ff88" }}>
                ● SCANNING...
              </div>
              <div>NO SIGNALS DETECTED</div>
              <div className="text-[9px] text-[#222]">BE THE FIRST TO BROADCAST</div>
            </div>
          ) : (
            posts.map((post) => (
              <article
                key={post.id}
                className="border border-[#141414] p-4 rounded-md hover:border-[#00ff88]/30 hover:bg-[#050505] transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] text-[#00ff88] font-mono-tech tracking-[2px]">
                    @{post.username}
                  </span>
                  <span className="text-[9px] text-[#333] font-mono-tech tracking-[2px]">
                    {timeAgo(post.created_at)}
                  </span>
                </div>
                <p className="text-[#888] leading-relaxed text-[13px] font-[Rajdhani,sans-serif]">
                  {post.content}
                </p>
              </article>
            ))
          )}
        </div>
      </section>

      {/* Right rail */}
      <aside className="hidden lg:flex bg-black flex-col gap-4 p-5 border-l border-[#0d0d0d] overflow-y-auto">
        {/* 404-Glitch console widget */}
        <div className="border border-[#1a1a1a] rounded-md p-4 hover:border-[#ff00cc]/30 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono-tech text-[8px] tracking-[3px] text-[#ff00cc]">
              ● 404_GLITCH
            </span>
            <span className="font-mono-tech text-[8px] tracking-[2px] text-[#222]">
              AI ENTITY
            </span>
          </div>
          <TypingConsole />
        </div>

        {/* Status */}
        <div className="border border-[#1a1a1a] rounded-md p-4">
          <div className="font-mono-tech text-[8px] tracking-[3px] text-[#00ff88] mb-3">
            SYSTEM STATUS
          </div>
          <div className="space-y-2 font-mono-tech text-[10px] tracking-[2px] text-[#555]">
            <Stat label="UPTIME" value="99.4%" />
            <Stat label="LATENCY" value="42ms" />
            <Stat label="NODES" value="1,287" />
            <Stat label="SIGNALS" value="∞" />
          </div>
        </div>

        <div className="font-mono-tech text-[8px] text-[#1a1a1a] tracking-[3px] mt-auto">
          v2.0.0-EXPERIMENTAL
        </div>
      </aside>
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
      setHistory((h) => [...h.slice(-4), line]);
      setLineIdx((i) => i + 1);
      setCharIdx(0);
    }, 800);
    return () => clearTimeout(t);
  }, [charIdx, lineIdx]);

  useEffect(() => {
    if (containerRef.current)
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [history, charIdx]);

  const current = TYPING_LINES[lineIdx % TYPING_LINES.length].slice(0, charIdx);

  return (
    <div
      ref={containerRef}
      className="font-mono-tech text-[10px] leading-[1.8] h-28 overflow-y-auto"
      style={{ color: "#ff00cc99" }}
    >
      {history.map((line, i) => (
        <div key={i} className="opacity-40">
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
