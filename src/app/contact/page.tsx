import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { StarMark } from "@/components/GeometricPattern";
import { submitContactForm } from "@/lib/actions";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = { title: "Contact" };

type ContactPageProps = {
  // In Next.js 16, searchParams is a Promise that must be awaited —
  // see the note in README about Next 16's async request APIs.
  searchParams: Promise<{ success?: string }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const showSuccess = params.success === "true";

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Get in touch" title="Contact Us" align="center" />

      <div className="mt-14 grid gap-10 lg:grid-cols-2">
        {/* Info panel */}
        <div className="relative overflow-hidden rounded-3xl bg-maroon-700 p-8 text-white shadow-sm sm:p-10">
          <StarMark className="h-7 w-7 text-cream" />
          <h2 className="mt-4 font-heading text-2xl font-semibold">
            We&rsquo;d love to hear from you
          </h2>

          <dl className="mt-8 space-y-6 text-sm">
            <div>
              <dt className="font-semibold uppercase tracking-wide text-cream/70">Email</dt>
              <dd className="mt-1">
                <a href={`mailto:${siteConfig.email}`} className="hover:underline">
                  {siteConfig.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold uppercase tracking-wide text-cream/70">Instagram</dt>
              <dd className="mt-1">
                <a
                  href={siteConfig.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {siteConfig.instagramHandle}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold uppercase tracking-wide text-cream/70">School</dt>
              <dd className="mt-1">
                {siteConfig.schoolName}
                <br />
                {siteConfig.schoolAddress}
                <br />
                {siteConfig.schoolPhone}
              </dd>
            </div>
            <div>
              <dt className="font-semibold uppercase tracking-wide text-cream/70">
                Faculty Advisor
              </dt>
              <dd className="mt-1">
                {siteConfig.facultyAdvisorName}
                <br />
                <a href={`mailto:${siteConfig.facultyAdvisorEmail}`} className="hover:underline">
                  {siteConfig.facultyAdvisorEmail}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        {/* Form */}
        <div className="rounded-3xl border border-maroon-100 bg-white p-8 shadow-sm sm:p-10">
          {showSuccess ? (
            <div className="flex h-full min-h-[20rem] flex-col items-center justify-center gap-3 text-center">
              <StarMark className="h-10 w-10 text-maroon-600" />
              <h2 className="font-heading text-xl font-semibold text-maroon-900">
                Message sent
              </h2>
              <p className="max-w-xs text-sm text-maroon-900/70">
                Thanks for reaching out — someone from MSA will get back to you soon.
              </p>
            </div>
          ) : (
            <form action={submitContactForm} className="space-y-5">
              {/* Honeypot field — hidden from real visitors with CSS, so bots
                  that auto-fill every field give themselves away. */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="company">Company</label>
                <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
              </div>

              <div>
                <label htmlFor="name" className="text-sm font-semibold text-maroon-900">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-1.5 w-full rounded-xl border border-maroon-200 px-4 py-2.5 text-sm text-maroon-900 focus:border-maroon-500 focus:outline-none focus:ring-2 focus:ring-maroon-200"
                />
              </div>

              <div>
                <label htmlFor="email" className="text-sm font-semibold text-maroon-900">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1.5 w-full rounded-xl border border-maroon-200 px-4 py-2.5 text-sm text-maroon-900 focus:border-maroon-500 focus:outline-none focus:ring-2 focus:ring-maroon-200"
                />
              </div>

              <div>
                <label htmlFor="message" className="text-sm font-semibold text-maroon-900">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="mt-1.5 w-full resize-none rounded-xl border border-maroon-200 px-4 py-2.5 text-sm text-maroon-900 focus:border-maroon-500 focus:outline-none focus:ring-2 focus:ring-maroon-200"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-maroon-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-maroon-800"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
