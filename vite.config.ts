// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
  vite: {
    define: {
      "process.env.SUPABASE_URL": JSON.stringify(
        process.env["SUPABASE_URL"] ||
        process.env["VITE_SUPABASE_URL"] ||
        "https://lpmxfxlwaohiuifgnvrb.supabase.co"
      ),
      "process.env.SUPABASE_ANON_KEY": JSON.stringify(
        process.env["SUPABASE_ANON_KEY"] ||
        process.env["VITE_SUPABASE_ANON_KEY"] ||
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwbXhmeGx3YW9oaXVpZmdudnJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODgxNTkzNzEsImV4cCI6MjEwMzczNTM3MX0.AjDGv74nWOm7-YrgdKy-eU2JfB3R0PIzRjyKiSdPTko"
      ),
    },
  },
});
