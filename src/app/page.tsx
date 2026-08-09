import Link from "next/link";
import { Hero } from "@/components/Hero";
import { SectionHeading } from "@/components/SectionHeading";
import { EventCard } from "@/components/EventCard";
import { LeadershipCard } from "@/components/LeadershipCard";
import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/Button";
import { PatternBackdrop, StarMark } from "@/components/GeometricPattern";
import { getUpcomingEvents, getLeadership } from "@/lib/data";

// This page reads from Neon at request time rather than at build time, so
// new events/officers show up without a redeploy. See db.ts and data.ts.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [upcomingEvents, leadership] = await Promise.all([
    getUpcomingEvents(),
    getLeadership(),
  ]);

  const previewEvents = upcomingEvents.slice(0, 3);
  const previewLeadership = leadership.slice(0, 4);

  return (
    <>
      <Hero />

      {/* Welcome */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Welcome" title="Welcome to WSA MSA" align="center" />
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-maroon-900/80 sm:text-lg">
          WSA MSA is a student-led community where members grow spiritually, build
          lasting friendships, and take on real leadership opportunities. Whether
          you&rsquo;re joining us for Friday prayers, a community service project, or
          just looking for a welcoming space between classes, there&rsquo;s a place for
          you here.
        </p>
      </section>

      {/* Upcoming events */}
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="What's next" title="Upcoming Events" />
            <Link
              href="/events"
              className="text-sm font-semibold text-maroon-700 transition-colors hover:text-maroon-900"
            >
              View all events →
            </Link>
          </div>

          {previewEvents.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {previewEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <EmptyState message="No upcoming events yet — check back soon, or add one from the admin dashboard." />
          )}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeading eyebrow="Why we're here" title="Our Mission & Vision" align="center" />
        <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-maroon-100 bg-white p-8 shadow-sm">
            <StarMark className="h-6 w-6 text-maroon-600" />
            <h3 className="mt-4 font-heading text-xl font-semibold text-maroon-900">
              Our Mission
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-maroon-900/80">
              Our mission is to strengthen faith, build unity, and promote
              understanding by creating a welcoming community where Muslim
              students can grow spiritually, develop as leaders, and make a
              positive impact.
            </p>
          </div>
          <div className="rounded-2xl bg-maroon-700 p-8 text-white shadow-sm">
            <StarMark className="h-6 w-6 text-cream" />
            <h3 className="mt-4 font-heading text-xl font-semibold">Our Vision</h3>
            <p className="mt-3 text-sm leading-relaxed text-cream/90">
              Our vision is to be a strong, united, and active Muslim student
              community that inspires faith, uplifts others, and leaves a
              lasting legacy.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership preview */}
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading eyebrow="Meet the team" title="Leadership" />
            <Link
              href="/leadership"
              className="text-sm font-semibold text-maroon-700 transition-colors hover:text-maroon-900"
            >
              Meet everyone →
            </Link>
          </div>

          {previewLeadership.length > 0 ? (
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {previewLeadership.map((member) => (
                <LeadershipCard key={member.id} member={member} />
              ))}
            </div>
          ) : (
            <EmptyState message="Officer profiles are on their way — add them from the admin dashboard." />
          )}
        </div>
      </section>

      {/* Join CTA */}
      <section className="relative overflow-hidden bg-maroon-900 py-16 text-center text-white">
        <PatternBackdrop id="home-cta-pattern" tone="cream" className="opacity-[0.06]" />
        <div className="relative mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <StarMark className="mx-auto h-8 w-8 text-cream" />
          <h2 className="mt-4 font-heading text-3xl font-semibold sm:text-4xl">
            Ready to be part of it?
          </h2>
          <p className="mt-4 text-base leading-relaxed text-cream/85">
            Joining MSA takes a minute and opens the door to meetings, events,
            educational programs, and leadership opportunities all year long.
          </p>
          <div className="mt-8 flex justify-center">
            <Button href="/join" variant="inverted">
              Join MSA
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
