import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { EventCard } from "@/components/EventCard";
import { EmptyState } from "@/components/EmptyState";
import { getUpcomingEvents, getPastEvents } from "@/lib/data";

export const metadata: Metadata = { title: "Events" };
export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const [upcoming, past] = await Promise.all([getUpcomingEvents(), getPastEvents()]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="What's happening"
        title="Events"
        description="From weekly prayers to community nights — here's what's on the calendar, and what we've done together so far."
      />

      <div className="mt-14">
        <h2 className="font-heading text-2xl font-semibold text-maroon-900">
          Upcoming Events
        </h2>
        {upcoming.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((event) => (
              <EventCard key={event.id} event={event} variant="upcoming" />
            ))}
          </div>
        ) : (
          <EmptyState message="No upcoming events are posted yet — check back soon." />
        )}
      </div>

      <div className="mt-16">
        <h2 className="font-heading text-2xl font-semibold text-maroon-900">Past Events</h2>
        {past.length > 0 ? (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {past.map((event) => (
              <EventCard key={event.id} event={event} variant="past" />
            ))}
          </div>
        ) : (
          <EmptyState message="Past events will show up here once they've happened." />
        )}
      </div>
    </div>
  );
}
