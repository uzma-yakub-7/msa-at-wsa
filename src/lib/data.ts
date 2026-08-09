import { sql } from "./db";
import type { EventRow, LeadershipRow } from "./types";

// These functions are called directly inside async Server Components
// (e.g. `const events = await getUpcomingEvents()` inside a page.tsx).
// There's no separate API layer for reads — one less set of files to keep
// in sync, and one less network hop.
//
// Every function fails "soft": if the database isn't reachable yet (for
// example, right after first deploy, before DATABASE_URL is set), the page
// still renders with an empty list instead of crashing the whole site.

export async function getUpcomingEvents(): Promise<EventRow[]> {
  try {
    const rows = await sql`
      SELECT * FROM events
      WHERE event_date >= CURRENT_DATE
      ORDER BY event_date ASC
    `;
    return rows as EventRow[];
  } catch (err) {
    console.error("getUpcomingEvents failed:", err);
    return [];
  }
}

export async function getPastEvents(): Promise<EventRow[]> {
  try {
    const rows = await sql`
      SELECT * FROM events
      WHERE event_date < CURRENT_DATE
      ORDER BY event_date DESC
    `;
    return rows as EventRow[];
  } catch (err) {
    console.error("getPastEvents failed:", err);
    return [];
  }
}

export async function getLeadership(): Promise<LeadershipRow[]> {
  try {
    const rows = await sql`
      SELECT * FROM leadership
      ORDER BY display_order ASC, id ASC
    `;
    return rows as LeadershipRow[];
  } catch (err) {
    console.error("getLeadership failed:", err);
    return [];
  }
}
