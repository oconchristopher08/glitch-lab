"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Post = {
  id: string;
  content: string;
  username: string;
  created_at: string;
};

export default function Feed() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPosts();

    // Real-time subscription
    const channel = supabase
      .channel("posts-feed")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "posts" },
        (payload) => {
          setPosts((prev) => [payload.new as Post, ...prev]);
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

    if (data) setPosts(data);
  }

  async function createPost() {
    if (!content.trim()) return;
    setLoading(true);

    await supabase.from("posts").insert([
      {
        content,
        username: "xstarlight",
      },
    ]);

    setContent("");
    setLoading(false);
    fetchPosts();
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

  return (
    <main className="flex-1 overflow-y-auto p-6 space-y-6 bg-black text-white min-h-screen">
      <h2 className="text-xl font-semibold mb-4 text-green-400 font-mono tracking-widest uppercase">
        Chainster Feed
      </h2>

      {/* Post composer */}
      <div className="mb-6 border border-gray-800 rounded-xl p-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) createPost();
          }}
          placeholder="Share something with the system..."
          rows={3}
          className="w-full p-3 bg-black border border-gray-800 rounded-lg text-white placeholder-gray-600 resize-none focus:outline-none focus:border-green-400 transition-colors"
        />
        <div className="flex items-center justify-between mt-2">
          <span className="text-xs text-gray-600 font-mono">⌘ + Enter to post</span>
          <button
            onClick={createPost}
            disabled={loading || !content.trim()}
            className="px-5 py-2 bg-green-400 text-black font-bold rounded-lg hover:bg-green-300 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </div>

      {/* Feed */}
      {posts.length === 0 ? (
        <div className="text-center text-gray-600 py-20 font-mono text-sm">
          No signals detected. Be the first to broadcast.
        </div>
      ) : (
        posts.map((post) => (
          <div
            key={post.id}
            className="border border-gray-800 p-4 rounded-xl hover:border-gray-600 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-green-400 font-mono">
                @{post.username}
              </span>
              <span className="text-xs text-gray-600 font-mono">
                {timeAgo(post.created_at)}
              </span>
            </div>
            <p className="text-gray-300 leading-relaxed">{post.content}</p>
          </div>
        ))
      )}
    </main>
  );
}
