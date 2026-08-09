import type { Metadata } from "next";
import { SectionHeading } from "@/components/SectionHeading";
import { ResourceCard } from "@/components/ResourceCard";
import { resources } from "@/lib/resources";

export const metadata: Metadata = { title: "Resources" };

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Good to know"
        title="Resources"
        description="Documents, schedules, and links that help you get the most out of MSA."
        align="center"
      />

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <ResourceCard key={resource.title} resource={resource} />
        ))}
      </div>
    </div>
  );
}
