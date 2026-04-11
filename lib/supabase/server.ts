// Service-role Supabase client. Works in both Edge middleware and Node
// API routes because @supabase/supabase-js uses `fetch` under the hood.
// NEVER import this module from anywhere that can end up in a client bundle.
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";

let cached: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (cached) return cached;
  cached = createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: { headers: { "x-analytics-client": "wiki-site" } },
  });
  return cached;
}
