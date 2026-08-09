import { StarMark } from "./GeometricPattern";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  /** Use "white" when this heading sits on a maroon background. */
  tone?: "maroon" | "white";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "maroon",
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const markTone = tone === "white" ? "text-cream" : "text-maroon-600";
  const titleTone = tone === "white" ? "text-white" : "text-maroon-900";
  const descTone = tone === "white" ? "text-cream/85" : "text-maroon-900/70";

  return (
    <div className={isCenter ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <div className={`flex items-center gap-2 ${isCenter ? "justify-center" : ""}`}>
        <StarMark className={`h-4 w-4 shrink-0 ${markTone}`} />
        {eyebrow && (
          <span className={`text-xs font-semibold uppercase tracking-[0.2em] ${markTone}`}>
            {eyebrow}
          </span>
        )}
      </div>
      <h2 className={`mt-3 font-heading text-3xl font-semibold sm:text-4xl ${titleTone}`}>
        {title}
      </h2>
      {description && (
        <p className={`mt-3 text-base leading-relaxed ${descTone}`}>{description}</p>
      )}
    </div>
  );
}
