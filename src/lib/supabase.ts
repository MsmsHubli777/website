import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  (import.meta.env as Record<string, string>)["VITE_SUPABASE_URL"] ||
  (typeof process !== "undefined" ? process.env["SUPABASE_URL"] : "") ||
  "https://lpmxfxlwaohiuifgnvrb.supabase.co";

const supabaseAnonKey =
  (import.meta.env as Record<string, string>)["VITE_SUPABASE_ANON_KEY"] ||
  (typeof process !== "undefined" ? process.env["SUPABASE_ANON_KEY"] : "") ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwbXhmeGx3YW9oaXVpZmdudnJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgxNTkzNzEsImV4cCI6MjEwMzczNTM3MX0.AjDGv74nWOm7-YrgdKy-eU2JfB3R0PIzRjyKiSdPTko";

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase credentials missing! Please configure SUPABASE_URL and SUPABASE_ANON_KEY in your environment.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
