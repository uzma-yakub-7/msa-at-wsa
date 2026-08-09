import Link from "next/link";
import { PatternBackdrop, StarMark } from "./GeometricPattern";
import { siteConfig } from "@/lib/site-config";

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/events", label: "Events" },
  { href: "/leadership", label: "Leadership" },
  { href: "/resources", label: "Resources" },
  { href: "/join", label: "Join MSA" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-maroon-900 text-white">
      <PatternBackdrop id="footer-pattern" tone="cream" className="opacity-[0.06]" />

      <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <StarMark className="h-5 w-5 text-cream" />
              <p className="font-heading text-lg font-semibold">Muslim Student Association</p>
            </div>
            <p className="mt-1 text-sm text-cream/70">at Westchester Square Academy</p>
            <p className="mt-4 text-sm font-medium uppercase tracking-[0.25em] text-cream/60">
              {siteConfig.tagline}
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm sm:flex sm:flex-wrap sm:justify-end sm:gap-x-6 sm:gap-y-2"
          >
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-cream/80 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cream/80 transition-colors hover:text-white"
            >
              Instagram
            </a>
          </nav>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-xs text-cream/60">
          © {new Date().getFullYear()} {siteConfig.orgName}
        </div>
      </div>
    </footer>
  );
}
