// Shared types for data that comes from the database.
// Keep these in sync with the columns in db/schema.sql.

export type EventRow = {
  id: number;
  title: string;
  description: string;
  event_date: string; // ISO date string, e.g. "2026-09-12"
  event_time: string | null; // free text, e.g. "12:15 PM"
  location: string | null;
  image_url: string | null;
  registration_url: string | null;
  created_at: string;
};

export type LeadershipRow = {
  id: number;
  name: string;
  position: string;
  bio: string | null;
  photo_url: string | null;
  display_order: number;
  created_at: string;
};

export type Resource = {
  title: string;
  description: string;
  url: string;
};
