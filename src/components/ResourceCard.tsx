import type { Resource } from "@/lib/types";
import { StarMark } from "./GeometricPattern";

export function ResourceCard({ resource }: { resource: Resource }) {
  const hasLink = Boolean(resource.url && resource.url !== "#");

  const className = [
    "flex flex-col rounded-2xl border border-maroon-100 bg-white p-6 shadow-sm transition-all",
    hasLink ? "hover:-translate-y-0.5 hover:shadow-md" : "opacity-80",
  ].join(" ");

  const content = (
    <>
      <StarMark className="h-6 w-6 text-maroon-600" />
      <h3 className="mt-4 font-heading text-lg font-semibold text-maroon-900">
        {resource.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-maroon-900/75">
        {resource.description}
      </p>
      <span
        className={`mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-semibold ${
          hasLink ? "text-maroon-700" : "text-maroon-900/40"
        }`}
      >
        {hasLink ? (
          <>
            View resource <span aria-hidden="true">→</span>
          </>
        ) : (
          "Link coming soon"
        )}
      </span>
    </>
  );

  if (hasLink) {
    return (
      <a href={resource.url} target="_blank" rel="noopener noreferrer" className={className}>
        {content}
      </a>
    );
  }

  return <div className={className}>{content}</div>;
}
