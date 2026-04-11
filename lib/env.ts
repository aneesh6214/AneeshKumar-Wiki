// lib/env.ts
// Single entry point for analytics-related environment variables.
// Throws at import time if a required variable is missing so misconfig
// shows up loudly in both dev and prod, not as a mysterious runtime error.

function required(name: string): string {
  const v = process.env[name];
  if (!v || v.length === 0) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return v;
}

function optional(name: string): string | undefined {
  const v = process.env[name];
  return v && v.length > 0 ? v : undefined;
}

export const env = {
  SUPABASE_URL: required("SUPABASE_URL"),
  SUPABASE_SERVICE_ROLE_KEY: required("SUPABASE_SERVICE_ROLE_KEY"),
  ADMIN_PASSWORD: required("ADMIN_PASSWORD"),
  ADMIN_SESSION_SECRET: required("ADMIN_SESSION_SECRET"),
  VID_COOKIE_SECRET: required("VID_COOKIE_SECRET"),
  SPOTIFY_REFRESH_TOKEN: optional("SPOTIFY_REFRESH_TOKEN"),
  SPOTIFY_CLIENT_ID: optional("SPOTIFY_CLIENT_ID"),
  SPOTIFY_CLIENT_SECRET: optional("SPOTIFY_CLIENT_SECRET"),
  YOUTUBE_API_KEY: optional("YOUTUBE_API_KEY"),
  YOUTUBE_CHANNEL_ID: optional("YOUTUBE_CHANNEL_ID"),
};
