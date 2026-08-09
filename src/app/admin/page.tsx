import type { Metadata } from "next";
import { getUpcomingEvents, getPastEvents, getLeadership } from "@/lib/data";
import { addEvent, deleteEvent, addLeader, deleteLeader } from "@/lib/actions";
import { DeleteButton } from "@/components/DeleteButton";
import { formatEventDate } from "@/lib/format";

export const metadata: Metadata = { title: "Admin" };
export const dynamic = "force-dynamic";

// This whole /admin route is protected by src/proxy.ts (Basic Auth using
// ADMIN_USER / ADMIN_PASSWORD). Nothing here checks auth again — the proxy
// already blocked the request before it got this far.

export default async function AdminPage() {
  const [upcoming, past, leadership] = await Promise.all([
    getUpcomingEvents(),
    getPastEvents(),
    getLeadership(),
  ]);
  const allEvents = [...upcoming, ...past];

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div>
        <h1 className="font-heading text-3xl font-semibold text-maroon-900">
          MSA Admin Dashboard
        </h1>
        <p className="mt-2 text-sm text-maroon-900/70">
          Add or remove events and leadership profiles. Changes appear on the
          public site right away — no redeploy needed.
        </p>
      </div>

      {/* Events */}
      <section className="mt-12">
        <h2 className="font-heading text-2xl font-semibold text-maroon-900">Events</h2>

        <div className="mt-4 overflow-x-auto rounded-2xl border border-maroon-100">
          {allEvents.length > 0 ? (
            <table className="w-full text-left text-sm">
              <thead className="bg-cream text-xs font-semibold uppercase tracking-wide text-maroon-700">
                <tr>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3 text-right">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-maroon-100 bg-white">
                {allEvents.map((event) => (
                  <tr key={event.id}>
                    <td className="px-4 py-3 font-medium text-maroon-900">{event.title}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-maroon-900/70">
                      {formatEventDate(event.event_date)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <form action={deleteEvent}>
                        <input type="hidden" name="id" value={event.id} />
                        <DeleteButton />
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="p-6 text-sm text-maroon-900/60">No events yet — add one below.</p>
          )}
        </div>

        <form
          action={addEvent}
          className="mt-6 grid gap-4 rounded-2xl border border-maroon-100 bg-cream/50 p-6 sm:grid-cols-2"
        >
          <h3 className="font-heading text-base font-semibold text-maroon-900 sm:col-span-2">
            Add an event
          </h3>
          <Field label="Title" name="title" required />
          <Field label="Date" name="event_date" type="date" required />
          <Field label="Time (optional)" name="event_time" placeholder="e.g. 6:00 PM" />
          <Field label="Location (optional)" name="location" />
          <Field label="Image URL (optional)" name="image_url" className="sm:col-span-2" />
          <Field
            label="Registration link (optional)"
            name="registration_url"
            className="sm:col-span-2"
          />
          <TextAreaField label="Description" name="description" required className="sm:col-span-2" />
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="rounded-full bg-maroon-700 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-maroon-800"
            >
              Add Event
            </button>
          </div>
        </form>
      </section>

      {/* Leadership */}
      <section className="mt-16">
        <h2 className="font-heading text-2xl font-semibold text-maroon-900">Leadership</h2>

        <div className="mt-4 overflow-x-auto rounded-2xl border border-maroon-100">
          {leadership.length > 0 ? (
            <table className="w-full text-left text-sm">
              <thead className="bg-cream text-xs font-semibold uppercase tracking-wide text-maroon-700">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Position</th>
                  <th className="px-4 py-3 text-right">Manage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-maroon-100 bg-white">
                {leadership.map((member) => (
                  <tr key={member.id}>
                    <td className="px-4 py-3 font-medium text-maroon-900">{member.name}</td>
                    <td className="px-4 py-3 text-maroon-900/70">{member.position}</td>
                    <td className="px-4 py-3 text-right">
                      <form action={deleteLeader}>
                        <input type="hidden" name="id" value={member.id} />
                        <DeleteButton />
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="p-6 text-sm text-maroon-900/60">No profiles yet — add one below.</p>
          )}
        </div>

        <form
          action={addLeader}
          className="mt-6 grid gap-4 rounded-2xl border border-maroon-100 bg-cream/50 p-6 sm:grid-cols-2"
        >
          <h3 className="font-heading text-base font-semibold text-maroon-900 sm:col-span-2">
            Add a leadership profile
          </h3>
          <Field label="Name" name="name" required />
          <Field label="Position" name="position" required placeholder="e.g. President" />
          <Field label="Photo URL (optional)" name="photo_url" />
          <Field
            label="Display order (optional)"
            name="display_order"
            type="number"
            placeholder="0"
          />
          <TextAreaField label="Short bio (optional)" name="bio" className="sm:col-span-2" />
          <div className="sm:col-span-2">
            <button
              type="submit"
              className="rounded-full bg-maroon-700 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-maroon-800"
            >
              Add Profile
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  placeholder,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="text-xs font-semibold uppercase tracking-wide text-maroon-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-lg border border-maroon-200 bg-white px-3 py-2 text-sm text-maroon-900 focus:border-maroon-500 focus:outline-none focus:ring-2 focus:ring-maroon-200"
      />
    </div>
  );
}

function TextAreaField({
  label,
  name,
  required = false,
  className = "",
}: {
  label: string;
  name: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="text-xs font-semibold uppercase tracking-wide text-maroon-700">
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        required={required}
        rows={3}
        className="mt-1.5 w-full resize-none rounded-lg border border-maroon-200 bg-white px-3 py-2 text-sm text-maroon-900 focus:border-maroon-500 focus:outline-none focus:ring-2 focus:ring-maroon-200"
      />
    </div>
  );
}
