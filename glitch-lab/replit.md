# GLITCH LAB

Experimental brand system / landing page with a community feed page. Originally built in Next.js (v0/Vercel export) and ported to a Vite + React artifact in this monorepo.

## Stack

- `artifacts/glitch-lab` — React + Vite frontend (artifact at `/`).
  - Routing via `wouter`.
  - Supabase (`@supabase/ssr`, `@supabase/supabase-js`) for the `/feed` page (posts + realtime). Reads `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`. Without these the app still renders; the feed is just empty.
  - Custom CSS in `src/index.css` (Tailwind v4 + bespoke glitch animations / fonts: Orbitron, Rajdhani, Share Tech Mono).
- `artifacts/api-server` — pre-existing Express scaffold (not currently used by glitch-lab).
- `artifacts/mockup-sandbox` — pre-existing canvas mockup sandbox.

## Routes

- `/` — landing (Hero, About, Experiments, Vision, Modules, EnterLab, Footer).
- `/feed` — Chainster feed (Supabase-backed).
- `/auth/callback` — OAuth callback (exchanges Supabase code for session).

## Notes

- To enable the feed, add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as secrets and create a `posts` table in Supabase with columns: `id` (uuid pk), `content` (text), `username` (text), `created_at` (timestamptz default now()).
