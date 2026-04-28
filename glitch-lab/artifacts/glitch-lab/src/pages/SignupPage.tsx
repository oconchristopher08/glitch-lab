import { useState } from "react";
import { Link, useLocation } from "wouter";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const supabase = createClient();
    const { error: err } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });
    setLoading(false);
    if (err) { setError(err.message); return; }
    setSuccess(true);
    setTimeout(() => setLocation("/auth/login"), 3000);
  }

  async function handleGithub() {
    const supabase = createClient();
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  if (success) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-6">
        <div className="text-center space-y-4">
          <div className="font-mono-tech text-[9px] tracking-[4px] text-[#00ff88]/60 blink">
            ● REGISTRATION COMPLETE
          </div>
          <div className="font-orbitron font-black text-[22px] tracking-[5px] text-white">
            CHECK YOUR EMAIL
          </div>
          <p className="font-mono-tech text-[10px] tracking-[2px] text-[#444] max-w-xs mx-auto leading-[1.8]">
            A confirmation link has been sent.<br />
            Verify to activate your identity.
          </p>
          <div className="font-mono-tech text-[9px] tracking-[3px] text-[#333]">
            Redirecting to login...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      {/* Glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[400px] h-[400px] rounded-full"
          style={{ background: "#ff00cc", opacity: 0.04, filter: "blur(100px)" }} />
      </div>

      <div className="relative z-10 w-full max-w-sm">
        {/* Header */}
        <div className="mb-10 text-center">
          <Link href="/" className="font-orbitron font-black text-[20px] tracking-[6px] text-white hover:text-[#00ff88] transition-colors inline-block mb-3">
            GLITCH<span className="text-[#00ff88]">/</span>LAB
          </Link>
          <div className="font-mono-tech text-[9px] tracking-[4px] text-[#333]">
            CREATE IDENTITY
          </div>
        </div>

        {/* Card */}
        <div className="border border-[#1a1a1a] bg-[#030303] p-8">
          <div className="font-mono-tech text-[8px] tracking-[4px] text-[#ff00cc]/60 mb-6">
            &gt; INITIALIZE NEW ENTITY
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="font-mono-tech text-[9px] tracking-[3px] text-[#444] block mb-2">
                HANDLE
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="xstarlight"
                className="w-full bg-black border border-[#1a1a1a] px-4 py-3 text-white font-mono-tech text-[12px] tracking-[1px] placeholder-[#2a2a2a] focus:outline-none focus:border-[#ff00cc]/40 transition-colors"
              />
            </div>

            <div>
              <label className="font-mono-tech text-[9px] tracking-[3px] text-[#444] block mb-2">
                EMAIL
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="user@system.io"
                className="w-full bg-black border border-[#1a1a1a] px-4 py-3 text-white font-mono-tech text-[12px] tracking-[1px] placeholder-[#2a2a2a] focus:outline-none focus:border-[#ff00cc]/40 transition-colors"
              />
            </div>

            <div>
              <label className="font-mono-tech text-[9px] tracking-[3px] text-[#444] block mb-2">
                PASSWORD
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                placeholder="••••••••"
                className="w-full bg-black border border-[#1a1a1a] px-4 py-3 text-white font-mono-tech text-[12px] tracking-[1px] placeholder-[#2a2a2a] focus:outline-none focus:border-[#ff00cc]/40 transition-colors"
              />
            </div>

            {error && (
              <div className="font-mono-tech text-[10px] tracking-[2px] text-[#ff00cc] border border-[#ff00cc]/20 px-3 py-2">
                &gt; ERROR: {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#00ff88] text-black font-orbitron font-bold text-[11px] tracking-[4px] hover:bg-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed mt-2"
              onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 24px rgba(0,255,136,0.35)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.boxShadow = "none"; }}
            >
              {loading ? "REGISTERING..." : "CREATE IDENTITY"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[#111]" />
            <span className="font-mono-tech text-[8px] tracking-[3px] text-[#333]">OR</span>
            <div className="flex-1 h-px bg-[#111]" />
          </div>

          <button
            type="button"
            onClick={handleGithub}
            className="w-full py-3 border border-[#1a1a1a] text-[#666] font-mono-tech text-[10px] tracking-[3px] hover:border-[#333] hover:text-white transition-colors flex items-center justify-center gap-3"
          >
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            CONTINUE WITH GITHUB
          </button>
        </div>

        <div className="text-center mt-6 font-mono-tech text-[9px] tracking-[3px] text-[#333]">
          ALREADY REGISTERED?{" "}
          <Link href="/auth/login" className="text-[#00ff88]/60 hover:text-[#00ff88] transition-colors">
            LOGIN
          </Link>
        </div>
      </div>
    </div>
  );
}
