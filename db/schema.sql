-- =============================================================
-- WSA MSA website — database schema
--
-- HOW TO RUN THIS:
-- Neon dashboard -> your project -> SQL Editor -> paste this whole file
-- -> Run. That's it — no local tools needed.
--
-- Safe to run more than once for the CREATE TABLE statements (they use
-- IF NOT EXISTS). The sample INSERT statements at the bottom are NOT
-- safe to run twice — they'll add duplicate rows. Delete that section
-- once you've added your club's real events and officers.
-- =============================================================

CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  event_date DATE NOT NULL,
  event_time TEXT,
  location TEXT,
  image_url TEXT,
  registration_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS leadership (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  bio TEXT,
  photo_url TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contact_messages (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- -------------------------------------------------------------
-- Sample data — so the site isn't empty on first deploy.
-- Delete this section (or DELETE FROM events; DELETE FROM leadership;)
-- once you've added your own through /admin.
-- -------------------------------------------------------------

INSERT INTO events (title, description, event_date, event_time, location, registration_url) VALUES
('Weekly Jumu''ah Prayer', 'Join us for our weekly Friday congregational prayer, open to all students.', CURRENT_DATE + INTERVAL '3 days', '12:15 PM', 'Room 204', NULL),
('MSA Welcome Meeting', 'Kick off the year with food, games, and an introduction to what MSA does all year.', CURRENT_DATE + INTERVAL '10 days', '3:00 PM', 'Cafeteria', NULL),
('Community Iftar Night', 'An evening of food and fellowship, open to MSA members, families, and friends.', CURRENT_DATE + INTERVAL '25 days', '6:30 PM', 'Main Gym', 'https://forms.gle/REPLACE-WITH-YOUR-RSVP-FORM'),
('Back-to-School Kickoff', 'Our first meeting of the year — meet the officers and see what MSA is all about.', CURRENT_DATE - INTERVAL '20 days', '3:00 PM', 'Room 118', NULL),
('Charity Bake Sale', 'Raised funds for a local food pantry with a table of donated baked goods.', CURRENT_DATE - INTERVAL '45 days', '11:30 AM', 'Main Lobby', NULL);

INSERT INTO leadership (name, position, bio, display_order) VALUES
('Officer Name', 'President', 'Add a short bio here — grade, interests, and what they''re excited to do with MSA this year.', 1),
('Officer Name', 'Vice President', 'Add a short bio here.', 2),
('Officer Name', 'Secretary', 'Add a short bio here.', 3),
('Officer Name', 'Treasurer', 'Add a short bio here.', 4),
('Officer Name', 'Events Coordinator', 'Add a short bio here.', 5),
('Faculty Advisor Name', 'Faculty Advisor', 'Add a short bio here.', 6);
