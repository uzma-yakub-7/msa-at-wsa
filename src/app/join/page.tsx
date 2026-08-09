import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { Button } from "@/components/Button";
import { StarMark } from "@/components/GeometricPattern";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = { title: "Join MSA" };

const faqs = [
  {
    question: "Do I have to be Muslim to join?",
    answer:
      "Not at all. MSA is primarily for Muslim students, but we welcome anyone interested in learning about Islam and being part of our community.",
  },
  {
    question: "What happens at meetings?",
    answer:
      "Meetings usually include discussion, guest speakers, community-building activities, and planning for upcoming events.",
  },
  {
    question: "Is there a cost to join?",
    answer: "No — joining MSA is completely free.",
  },
  {
    question: "How often does MSA meet?",
    answer:
      "Check the Resources page for the current meeting schedule, which is updated each semester.",
  },
  {
    question: "How do I stay updated on events?",
    answer:
      "Follow us on Instagram and check the Events page on this website for the latest announcements.",
  },
];

export default function JoinPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Get involved" title="Join MSA" align="center" />

      <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-maroon-900/80 sm:text-lg">
        Joining MSA means becoming part of a community that gathers for
        meetings, events, educational programs, community activities, and
        leadership opportunities throughout the school year. Membership is
        open, free, and welcoming to every student at Westchester Square
        Academy.
      </p>

      <div className="mt-10 flex justify-center">
        <Button
          href={siteConfig.joinFormUrl}
          variant="solid"
          external
          className="px-10 py-4 text-base"
        >
          Join MSA — Fill Out the Form
        </Button>
      </div>

      <div className="mt-20">
        <div className="flex items-center gap-2">
          <StarMark className="h-5 w-5 text-maroon-600" />
          <h2 className="font-heading text-2xl font-semibold text-maroon-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-6 divide-y divide-maroon-100 rounded-2xl border border-maroon-100 bg-white shadow-sm">
          {faqs.map((faq) => (
            <details key={faq.question} className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-base font-semibold text-maroon-900">
                {faq.question}
                <span className="shrink-0 text-maroon-500 transition-transform group-open:rotate-45">
                  <PlusIcon />
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-maroon-900/75">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
