import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";

export default function ProfilePage() {
  const { user, loading, signOut } = useAuth();
  const [, setLocation] = useLocation();

  async function handleSignOut() {
    await signOut();
    setLocation("/");
  }

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center bg-black">
        <div className="font-mono-tech text-[10px] tracking-[4px] text-[#00ff88]/50 blink">
          ● LOADING IDENTITY...
        </div>
      </div>
    );
  }

  const handle = user?.user_metadata?.username || user?.email?.split("@")[0] || "unknown";
  const provider = user?.app_metadata?.provider || "email";
  const joined = user?.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    : "—";

  return (
    <div className="h-full flex items-center justify-center bg-black p-10">
      <div className="max-w-sm w-full space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="font-mono-tech text-[8px] tracking-[4px] text-[#00ff88]/50 blink">
            ● SYS-01 // IDENTITY
          </div>
          <div className="font-orbitron font-black text-[28px] tracking-[6px] text-white">
            PROFILE
          </div>
          <div className="w-10 h-[2px] bg-[#00ff88] mx-auto" />
        </div>

        {/* Avatar */}
        <div className="flex justify-center">
          <div className="w-16 h-16 border border-[#00ff88]/30 flex items-center justify-center"
            style={{ background: "#050505" }}>
            <span className="font-orbitron font-black text-[22px] text-[#00ff88]">
              {handle.slice(0, 2).toUpperCase()}
            </span>
          </div>
        </div>

        {/* Identity card */}
        <div className="border border-[#111] bg-[#030303] p-6 space-y-3">
          {[
            ["HANDLE", `@${handle}`],
            ["EMAIL", user?.email || "—"],
            ["PROVIDER", provider.toUpperCase()],
            ["JOINED", joined],
            ["STATUS", "ACTIVE"],
            ["CLEARANCE", "LEVEL 1"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between font-mono-tech text-[10px] tracking-[2px]">
              <span className="text-[#333]">{k}</span>
              <span className="text-[#00ff88] max-w-[180px] truncate text-right">{v}</span>
            </div>
          ))}
        </div>

        {/* Sign out */}
        <button
          type="button"
          onClick={handleSignOut}
          className="w-full py-3 border border-[#1a1a1a] text-[#555] font-mono-tech text-[10px] tracking-[3px] hover:border-[#ff00cc]/40 hover:text-[#ff00cc] transition-all"
        >
          &gt; TERMINATE SESSION
        </button>

        <div className="font-mono-tech text-[8px] text-[#1a1a1a] tracking-[3px] text-center">
          v2.0.0-EXPERIMENTAL
        </div>
      </div>
    </div>
  );
}
