import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { StarMark } from "@/components/GeometricPattern";

export const metadata: Metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading eyebrow="Who we are" title="About the MSA" />

      <div className="mt-8 space-y-5 text-base leading-relaxed text-maroon-900/85">
        <p>
          The Muslim Students Association (MSA) at Westchester Square Academy is
          a student-led organization dedicated to creating a safe, welcoming,
          and supportive space for Muslim students.
        </p>
        <p>
          While the MSA is primarily for Muslim students, we also welcome
          non-Muslim students who are interested in learning about Islam and
          Muslim culture.
        </p>
        <p>
          Our mission is to strengthen faith, build unity, and promote
          understanding within our school community. We organize Jumu&rsquo;ah
          prayers, Islamic events, educational programs, and community
          activities that help students grow spiritually, socially, and as
          leaders.
        </p>
        <p>
          The MSA works closely with school administration to ensure Muslim
          students feel represented, respected, and heard.
        </p>
        <p>
          Our purpose is to provide a safe, respectful, and inclusive
          environment where Muslim students can strengthen their faith,
          develop leadership skills, and positively contribute to our school
          community.
        </p>
      </div>

      <div className="mt-14 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-maroon-100 bg-white p-8 shadow-sm">
          <StarMark className="h-6 w-6 text-maroon-600" />
          <h2 className="mt-4 font-heading text-xl font-semibold text-maroon-900">
            Our Mission
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-maroon-900/80">
            Our mission is to strengthen faith, build unity, and promote
            understanding by creating a welcoming community where Muslim
            students can grow spiritually, develop as leaders, and make a
            positive impact.
          </p>
        </div>
        <div className="rounded-2xl bg-maroon-700 p-8 text-white shadow-sm">
          <StarMark className="h-6 w-6 text-cream" />
          <h2 className="mt-4 font-heading text-xl font-semibold">Our Vision</h2>
          <p className="mt-3 text-sm leading-relaxed text-cream/90">
            Our vision is to be a strong, united, and active Muslim student
            community that inspires faith, uplifts others, and leaves a
            lasting legacy.
          </p>
        </div>
      </div>
    </div>
  );
}
