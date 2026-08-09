import { neon } from "@neondatabase/serverless";

// This is the one place the app talks to Neon. Every other file that needs
// the database imports `sql` from here instead of connecting on its own —
// that's what keeps the connection setup "wired together" instead of
// duplicated across files.
//
// neon() talks to the database over HTTPS (no long-lived connection to
// manage), which is exactly what a serverless host like Vercel wants: it
// works correctly even when many requests spin up in parallel.

function getConnectionString() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Add it to .env (locally) or your host's " +
        "environment variables (in production). See .env.example."
    );
  }
  return url;
}

export const sql = neon(getConnectionString());
