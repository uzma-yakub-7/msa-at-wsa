import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  /**
   * solid    -> maroon fill, white text. Use on white/cream backgrounds.
   * inverted -> white fill, maroon text. Use on maroon backgrounds.
   * outline  -> transparent with a white border. Use on maroon backgrounds.
   */
  variant?: "solid" | "inverted" | "outline";
  className?: string;
  external?: boolean;
};

const variantClasses: Record<NonNullable<ButtonProps["variant"]>, string> = {
  solid:
    "bg-maroon-700 text-white hover:bg-maroon-800 shadow-md hover:shadow-lg",
  inverted:
    "bg-white text-maroon-800 hover:bg-cream shadow-md hover:shadow-lg",
  outline:
    "border-2 border-white/80 text-white hover:bg-white hover:text-maroon-800",
};

export function Button({
  href,
  children,
  variant = "solid",
  className = "",
  external = false,
}: ButtonProps) {
  const classes = [
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3",
    "text-sm font-semibold transition-all duration-200",
    "hover:-translate-y-0.5",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-maroon-500 focus-visible:ring-offset-2",
    "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
    variantClasses[variant],
    className,
  ].join(" ");

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
