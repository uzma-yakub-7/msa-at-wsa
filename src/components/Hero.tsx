import { PatternBackdrop, StarMark } from "./GeometricPattern";
import { Button } from "./Button";

// To use a real photo: add an image file to /public/images (for example
// hero.jpg) and change this to "/images/hero.jpg". Leave it null to keep
// the geometric panel shown below instead of a photo.
const HERO_IMAGE_SRC: string | null = null;

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-maroon-700 via-maroon-800 to-maroon-900 text-white">
      <PatternBackdrop id="hero-pattern" tone="cream" className="opacity-[0.08]" />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8 lg:py-28">
        <div className="animate-fade-up">
          <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.3em] text-cream/80">
            <StarMark className="h-4 w-4" />
            Gather • Pray • Inspire
          </div>

          <h1 className="mt-5 font-heading text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-[3.25rem]">
            Muslim Student Association at Westchester Square Academy
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/90 sm:text-lg">
            Building faith, friendship, leadership, and service within our school
            community while welcoming students of all backgrounds.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/join" variant="inverted">
              Join MSA
            </Button>
            <Button href="/events" variant="outline">
              Upcoming Events
            </Button>
          </div>
        </div>

        <div className="relative">
          {HERO_IMAGE_SRC ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={HERO_IMAGE_SRC}
              alt="Muslim students gathered together at Westchester Square Academy"
              className="aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl"
            />
          ) : (
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-3xl border border-white/15 bg-white/5 shadow-2xl">
              <PatternBackdrop id="hero-panel-pattern" tone="cream" className="opacity-20" />
              <div className="relative flex h-full flex-col items-center justify-center gap-3 p-8 text-center">
                <StarMark className="h-14 w-14 text-cream/70" />
                <p className="text-sm font-medium text-cream/70">
                  Add a group photo of your MSA here
                </p>
                <p className="text-xs text-cream/50">
                  See HERO_IMAGE_SRC in src/components/Hero.tsx
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
