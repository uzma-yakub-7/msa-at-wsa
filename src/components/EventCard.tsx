import type { EventRow } from "@/lib/types";
import { formatEventDate } from "@/lib/format";
import { StarMark } from "./GeometricPattern";

type EventCardProps = {
  event: EventRow;
  variant?: "upcoming" | "past";
};

export function EventCard({ event, variant = "upcoming" }: EventCardProps) {
  const isPast = variant === "past";

  return (
    <article
      className={`flex flex-col overflow-hidden rounded-2xl border border-maroon-100 shadow-sm transition-shadow hover:shadow-md ${
        isPast ? "bg-cream/60" : "bg-white"
      }`}
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-maroon-700">
        {event.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={event.image_url} alt={event.title} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <StarMark className="h-10 w-10 text-white/30" />
          </div>
        )}
        {isPast && (
          <span className="absolute left-3 top-3 rounded-full bg-maroon-900/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            Past event
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-maroon-600">
          {formatEventDate(event.event_date)}
          {event.event_time ? ` · ${event.event_time}` : ""}
        </p>
        <h3 className="mt-2 font-heading text-xl font-semibold text-maroon-900">
          {event.title}
        </h3>
        {event.location && (
          <p className="mt-1 text-sm text-maroon-900/60">{event.location}</p>
        )}
        <p className="mt-3 flex-1 text-sm leading-relaxed text-maroon-900/80">
          {event.description}
        </p>

        {!isPast && event.registration_url && (
          <a
            href={event.registration_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex w-fit items-center gap-1 rounded-full bg-maroon-700 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-maroon-800"
          >
            Register
          </a>
        )}
      </div>
    </article>
  );
}
