import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Allow the app to render without Supabase configured. Feed will simply show
// "no signals" and posting will be a no-op until the user adds the secrets.
export const supabase = createClient(
  url || "https://placeholder.supabase.co",
  anon || "placeholder-anon-key"
);

export const isSupabaseConfigured = Boolean(url && anon);
