# WSA MSA Website

https://msaatwsa.onrender.com/

The website for the Muslim Student Association at Westchester Square Academy —
built with [Next.js](https://nextjs.org) (App Router), [Tailwind CSS](https://tailwindcss.com),
and [Neon](https://neon.tech) Postgres for events, leadership profiles, and
contact form submissions.

Every page lives in `src/app/`, every reusable piece of UI in
`src/components/`, and everything that talks to the database in `src/lib/`.
Pages import components, components import shared styling from
`globals.css`, and the database helpers are imported by both the public
pages (to read events/leadership) and the admin dashboard (to add/delete
them) — so it's all one connected app, not a pile of separate files.

---

## 1. The stack, and why

You asked to choose between **GitHub + Netlify**, **GitHub + Vercel**, or
**GitHub + GitHub Pages**, knowing you also wanted a backend and a Postgres
database — then later asked about **Render** too. This codebase deploys to
either Vercel or Render with no code changes, only different dashboard
settings, so you're not locked in. Here's the reasoning:

- **GitHub Pages is out.** It only serves static files — no server code can
  run, so there's no way for it to talk to a database at all.
- **Netlify would work** (it supports serverless functions), but it's not
  built by the same people as your framework, so there's an extra layer of
  configuration between your code and your host.
- **Vercel** is built by the creators of Next.js, so this deploys with zero
  configuration — push to GitHub, import the repo, done. It runs your app as
  serverless functions.
- **Render** runs this app the more traditional way: as one persistent
  Node.js server (via `next start`), not serverless functions. That's a
  more "regular server" mental model some people prefer, and it's what you
  asked about most recently — so it's fully wired up in this project too
  (`render.yaml`, `.node-version`, and a start script that binds to
  whatever port Render assigns).

**Both paths are free, no credit card required**, which fits "be broke":

| Service | Free tier | Catch? |
|---|---|---|
| GitHub | Unlimited public/private repos | None |
| Vercel (Hobby plan) | Generous bandwidth + function usage for personal projects | None that affects this site |
| Render (Free web service) | Full Node.js server, no time limit | Spins down after 15 min idle; next visit takes ~30-60s to wake up |
| Neon (Free plan) | 0.5 GB storage, auto-suspends when idle | None that affects this site |

If you're not sure which to pick: **Vercel** if you want the fastest response
on the first visit after a lull (no sleep/wake delay). **Render** if you'd
rather think of your app as "a normal server" and don't mind a 30-60 second
wake-up the first time someone visits after 15 quiet minutes.

If you ever want a real domain like `www.wsamsa.org` instead of the free
`.vercel.app` / `.onrender.com` one, that's a separate ~$10-15/year purchase
from a registrar (Namecheap, Google Domains, etc.) — connecting it to either
host is free.

---

## 2. Deploy it (no local computer setup required)

You can do all of this from a browser — you do **not** need Node.js, npm,
or the command line installed on your computer. Steps 1 and 2 are shared no
matter which host you pick; then jump to Option A (Vercel) or Option B
(Render).

### Step 1 — Put the code on GitHub
1. Create a free account at [github.com](https://github.com) if you don't have one.
2. Click **New repository**, name it something like `wsa-msa-website`, and create it.
3. On the new repo's page, click **uploading an existing file**, then drag
   in every file and folder from this project (unzip it first). Commit.

### Step 2 — Create the database on Neon
1. Create a free account at [neon.tech](https://neon.tech) and make a new project.
2. Open the **SQL Editor** in the Neon dashboard.
3. Paste in the entire contents of `db/schema.sql` from this project and click **Run**.
   This creates the `events`, `leadership`, and `contact_messages` tables and
   adds a few sample rows so the site isn't empty.
4. Go to **Connection Details** and copy the **pooled** connection string
   (the hostname usually contains `-pooler`). You'll need it in Step 3.

---

### Option A — Step 3: Deploy on Vercel
1. Create a free account at [vercel.com](https://vercel.com) and sign in with GitHub.
2. Click **Add New -> Project**, and import the repo you created in Step 1.
   Vercel will detect it's a Next.js app automatically.
3. Before clicking Deploy, open **Environment Variables** and add:
   - `DATABASE_URL` — the connection string you copied from Neon
   - `ADMIN_USER` — a username of your choice for the admin dashboard
   - `ADMIN_PASSWORD` — a password of your choice (don't reuse a real password)
4. Click **Deploy**. In about a minute, your site is live at a
   `your-project-name.vercel.app` address.

Vercel runs your app as serverless functions and reruns the build on every
push automatically.

### Option B — Step 3: Deploy on Render
This repo includes `render.yaml`, so Render can create the whole service in
one pass instead of you filling in fields by hand.

1. Create a free account at [render.com](https://render.com) and connect your GitHub account.
2. Click **New -> Blueprint**, and pick the repo you created in Step 1.
   Render reads `render.yaml` and shows you one web service
   (`wsa-msa-website`) about to be created on the **Free** plan.
3. Render will prompt you for the environment variables marked `sync: false`
   in the blueprint — fill in:
   - `DATABASE_URL` — the connection string you copied from Neon
   - `ADMIN_USER` — a username of your choice for the admin dashboard
   - `ADMIN_PASSWORD` — a password of your choice (don't reuse a real password)
4. Click **Apply**. Render will run `npm install && npm run build`, then
   start the app with `npm run start`. First build takes a few minutes;
   your site ends up live at `wsa-msa-website.onrender.com` (or similar).

Prefer clicking through the UI yourself instead of using the Blueprint?
Create a **New -> Web Service** from the same repo and set:
Runtime `Node`, Build Command `npm install && npm run build`,
Start Command `npm run start`, Plan `Free` — then add the same three
environment variables in the **Environment** tab.

**One thing worth knowing about Render's free plan:** it spins the server
down after 15 minutes with no visitors, so the next visit takes about
30-60 seconds to wake back up before the page loads. Vercel's free plan
doesn't have this delay. Neither costs anything either way.

### Connect your real domain (optional, either host)
- **Vercel:** project -> **Settings -> Domains** -> add `www.wsamsa.org`.
- **Render:** service -> **Settings -> Custom Domains** -> add `www.wsamsa.org`.

Both show you DNS records to add at your domain registrar. That part is
free on both hosts — you only pay the registrar (Namecheap, Google Domains,
etc.) for the domain name itself, around $10-15/year.

---

## 3. Managing events and leadership day-to-day

Go to `/admin` on whichever URL your host gave you (`your-project.vercel.app/admin`
or `your-service.onrender.com/admin`). Your browser will ask for a username
and password — enter the `ADMIN_USER` / `ADMIN_PASSWORD` you set in Step 3
above. From there you can add or delete events and leadership profiles
through plain forms. Changes show up on the public site immediately (on
Render's free plan, allow for the wake-up delay mentioned above if the
service had gone quiet).

This first version supports **add** and **delete**, not edit-in-place — to
change something, delete it and re-add it with the correct info. If you'd
rather edit rows directly, you can also do that anytime from Neon's SQL
Editor, for example:

```sql
UPDATE events SET title = 'New title' WHERE id = 1;
SELECT * FROM contact_messages ORDER BY created_at DESC; -- read contact form submissions
```

---

## 4. Customizing content

| What you want to change | Where to change it |
|---|---|
| Email, Instagram, school address, faculty advisor, Join form link | `src/lib/site-config.ts` |
| Resource cards (Constitution, Newsletters, etc.) and their links | `src/lib/resources.ts` |
| About page text, Mission/Vision wording | `src/app/about/page.tsx` |
| FAQ questions on the Join page | `src/app/join/page.tsx` |
| Colors (the maroon palette) | `@theme` block at the top of `src/app/globals.css` |
| Fonts | The Google Fonts `<link>` in `src/app/layout.tsx`, and the `--font-heading` / `--font-body` variables in `globals.css` |
| Events, leadership profiles | `/admin` dashboard, or directly in Neon |

### Adding real photos
Every photo slot (hero image, event images, leadership headshots) shows a
maroon placeholder panel until you add a real one — nothing is hard-coded
to a broken image link.

- **Hero photo:** add a file to `public/images/`, then set `HERO_IMAGE_SRC`
  near the top of `src/components/Hero.tsx` to `"/images/your-file.jpg"`.
- **Event & leadership photos:** upload the image anywhere that gives you a
  direct URL (imgur, your own `public/images/` folder + redeploy, Google
  Drive set to "anyone with the link" using a direct image link, etc.) and
  paste that URL into the Image URL field when adding the event/profile in
  `/admin`.

---

## 5. Running it on your own computer (optional)

Only needed if you want to preview changes before pushing them. Requires
[Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
cp .env.example .env    # then fill in DATABASE_URL, ADMIN_USER, ADMIN_PASSWORD
npm run dev
```

Visit `http://localhost:3000`. Since `DATABASE_URL` points at your real
Neon project either way, local changes and live changes use the same data.

---

## 6. A few things worth knowing

- **This project targets Next.js 16.** If you (or an AI tool) add new files
  later based on older tutorials, note that Next.js 16 renamed
  `middleware.ts` to **`proxy.ts`** (see `src/proxy.ts`) — an old-style
  `middleware.ts` file is silently ignored, which would leave `/admin`
  unprotected with no error message. Don't rename `proxy.ts` back.
- **No Gallery page** was built, per your spec.
- **The contact form** saves messages into the `contact_messages` table —
  there's no email-sending set up (that would need a separate free service
  like Resend), so check Neon for new messages, or extend `submitContactForm`
  in `src/lib/actions.ts` later if you want email notifications.
- Every database read (`src/lib/data.ts`) fails "soft" — if `DATABASE_URL`
  isn't set yet or Neon is briefly unreachable, pages show an empty state
  instead of crashing. This was tested by actually pointing the built app
  at a fake database host, not just assumed.
- **The `start` script matters for Render.** It's set to
  `next start -p ${PORT:-3000}` instead of plain `next start`, so the app
  binds to whatever port Render assigns at runtime. This was tested locally
  by launching the production server with a Render-style `PORT` and
  confirming it responds — Vercel ignores this script entirely (it doesn't
  run `next start`), so this change is safe for both hosts.
- Neither host's free plan needs a persistent disk add-on here: this project
  doesn't use `next/image` or ISR `revalidate`, which are the two features
  that write to a local cache Render's free plan wipes on every restart.

---

## 7. Project structure

```
wsa-msa-website/
├── render.yaml                 Render Blueprint (one-click service creation)
├── .node-version                Pins the Node version for Render/other hosts
├── db/schema.sql              Database tables + sample data (run in Neon)
├── src/
│   ├── proxy.ts                Password-protects /admin (Next 16's proxy.ts)
│   ├── app/
│   │   ├── layout.tsx           Wraps every page with Header + Footer
│   │   ├── page.tsx              Home
│   │   ├── about/page.tsx        About Us
│   │   ├── events/page.tsx       Events (upcoming + past, from Neon)
│   │   ├── leadership/page.tsx   Leadership (from Neon)
│   │   ├── resources/page.tsx    Resources
│   │   ├── join/page.tsx         Join MSA + FAQ
│   │   ├── contact/page.tsx      Contact form (saves to Neon)
│   │   └── admin/page.tsx        Password-protected dashboard
│   ├── components/               Header, Footer, cards, buttons, etc.
│   └── lib/
│       ├── db.ts                  Neon connection (one shared client)
│       ├── data.ts                Read functions used by pages
│       ├── actions.ts             Server actions used by every form
│       ├── site-config.ts         Contact info & links, edited in one place
│       ├── resources.ts           The Resources page's link list
│       ├── format.ts              Date formatting helper
│       └── types.ts               Shared TypeScript types
└── public/images/                 Put your real photos here
```
