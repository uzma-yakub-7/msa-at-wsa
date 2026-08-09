import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { LeadershipCard } from "@/components/LeadershipCard";
import { EmptyState } from "@/components/EmptyState";
import { getLeadership } from "@/lib/data";

export const metadata: Metadata = { title: "Leadership" };
export const dynamic = "force-dynamic";

export default async function LeadershipPage() {
  const leadership = await getLeadership();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Meet the team"
        title="Leadership"
        description="The students — and faculty advisor — who help keep WSA MSA running."
        align="center"
      />

      {leadership.length > 0 ? (
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {leadership.map((member) => (
            <LeadershipCard key={member.id} member={member} />
          ))}
        </div>
      ) : (
        <EmptyState message="Officer profiles are on their way — add them from the admin dashboard." />
      )}
    </div>
  );
}
