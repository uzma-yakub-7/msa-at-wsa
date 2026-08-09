import type { LeadershipRow } from "@/lib/types";
import { StarMark } from "./GeometricPattern";

export function LeadershipCard({ member }: { member: LeadershipRow }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-maroon-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-square w-full overflow-hidden bg-maroon-700">
        {member.photo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={member.photo_url} alt={member.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <StarMark className="h-12 w-12 text-white/30" />
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5 text-center">
        <h3 className="font-heading text-lg font-semibold text-maroon-900">{member.name}</h3>
        <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-maroon-600">
          {member.position}
        </p>
        {member.bio && (
          <p className="mt-3 text-sm leading-relaxed text-maroon-900/75">{member.bio}</p>
        )}
      </div>
    </article>
  );
}
