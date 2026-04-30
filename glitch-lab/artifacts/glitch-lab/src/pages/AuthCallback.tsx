import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AuthCallback() {
  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");

    async function exchange() {
      try {
        if (code) {
          const supabase = createClient();
          await supabase.auth.exchangeCodeForSession(code);
        }
      } catch {
        // ignore — fall through to redirect
      } finally {
        const base = import.meta.env.BASE_URL || "/";
        window.location.replace(base);
      }
    }

    exchange();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white font-mono">
      Authenticating…
    </div>
  );
}
