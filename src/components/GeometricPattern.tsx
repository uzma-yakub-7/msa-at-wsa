// The site's one recurring mark: an eight-point star made from two squares,
// one rotated 45 degrees over the other. It shows up three ways — large and
// faint behind the hero, small next to every section heading, and tiled
// faintly behind the footer — so it reads as WSA MSA's mark rather than a
// random decoration. Both pieces are plain SVG (no images to load, crisp at
// any size) and colored with `currentColor` so they inherit color from
// their wrapping element's text color.

type StarMarkProps = {
  className?: string;
};

export function StarMark({ className = "h-5 w-5" }: StarMarkProps) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <rect
        x="18"
        y="18"
        width="64"
        height="64"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
      />
      <rect
        x="18"
        y="18"
        width="64"
        height="64"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        transform="rotate(45 50 50)"
      />
    </svg>
  );
}

type PatternBackdropProps = {
  /** Must be unique on the page if used more than once. */
  id: string;
  /** "cream" = cream lines (use on maroon backgrounds). "maroon" = maroon lines (use on light backgrounds). */
  tone?: "cream" | "maroon";
  className?: string;
};

export function PatternBackdrop({
  id,
  tone = "cream",
  className = "",
}: PatternBackdropProps) {
  const color = tone === "cream" ? "#FBF6EF" : "#6B1423";

  return (
    <svg
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id={id} width="96" height="96" patternUnits="userSpaceOnUse">
          <g stroke={color} strokeWidth="1.25" fill="none">
            <rect x="18" y="18" width="44" height="44" />
            <rect x="18" y="18" width="44" height="44" transform="rotate(45 40 40)" />
          </g>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
