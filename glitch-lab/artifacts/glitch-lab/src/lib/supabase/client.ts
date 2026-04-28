import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const anon = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return createBrowserClient(
    url || "https://placeholder.supabase.co",
    anon || "placeholder-anon-key"
  );
}
