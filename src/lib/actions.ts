"use server";

import { redirect } from "next/navigation";
import { sql } from "./db";

// Every form in the app (contact form, admin add/delete forms) posts to one
// of these functions. They run on the server only — this file is never
// sent to the browser — which is what makes this a real backend and not
// just a static site with a pretty form on it.

function requireString(formData: FormData, key: string): string {
  const value = formData.get(key);
  if (typeof value !== "string" || value.trim() === "") {
    throw new Error(`Missing required field: ${key}`);
  }
  return value.trim();
}

function optionalString(formData: FormData, key: string): string | null {
  const value = formData.get(key);
  if (typeof value !== "string" || value.trim() === "") return null;
  return value.trim();
}

// ---------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------

export async function addEvent(formData: FormData) {
  const title = requireString(formData, "title");
  const description = requireString(formData, "description");
  const event_date = requireString(formData, "event_date");
  const event_time = optionalString(formData, "event_time");
  const location = optionalString(formData, "location");
  const image_url = optionalString(formData, "image_url");
  const registration_url = optionalString(formData, "registration_url");

  await sql`
    INSERT INTO events
      (title, description, event_date, event_time, location, image_url, registration_url)
    VALUES
      (${title}, ${description}, ${event_date}, ${event_time}, ${location}, ${image_url}, ${registration_url})
  `;

  redirect("/admin");
}

export async function deleteEvent(formData: FormData) {
  const id = Number(formData.get("id"));
  if (Number.isFinite(id)) {
    await sql`DELETE FROM events WHERE id = ${id}`;
  }
  redirect("/admin");
}

// ---------------------------------------------------------------------
// Leadership
// ---------------------------------------------------------------------

export async function addLeader(formData: FormData) {
  const name = requireString(formData, "name");
  const position = requireString(formData, "position");
  const bio = optionalString(formData, "bio");
  const photo_url = optionalString(formData, "photo_url");

  const rawOrder = formData.get("display_order");
  const parsedOrder =
    typeof rawOrder === "string" && rawOrder.trim() !== "" ? Number(rawOrder) : 0;
  const display_order = Number.isFinite(parsedOrder) ? parsedOrder : 0;

  await sql`
    INSERT INTO leadership (name, position, bio, photo_url, display_order)
    VALUES (${name}, ${position}, ${bio}, ${photo_url}, ${display_order})
  `;

  redirect("/admin");
}

export async function deleteLeader(formData: FormData) {
  const id = Number(formData.get("id"));
  if (Number.isFinite(id)) {
    await sql`DELETE FROM leadership WHERE id = ${id}`;
  }
  redirect("/admin");
}

// ---------------------------------------------------------------------
// Contact form (public)
// ---------------------------------------------------------------------

export async function submitContactForm(formData: FormData) {
  // Honeypot spam trap: this field is hidden with CSS, so real visitors
  // never fill it in. If it's filled in, silently pretend it worked.
  const honeypot = formData.get("company");
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    redirect("/contact?success=true");
  }

  const name = requireString(formData, "name");
  const email = requireString(formData, "email");
  const message = requireString(formData, "message");

  await sql`
    INSERT INTO contact_messages (name, email, message)
    VALUES (${name}, ${email}, ${message})
  `;

  redirect("/contact?success=true");
}
