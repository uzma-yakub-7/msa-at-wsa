import type { Resource } from "./types";

// Resources change rarely and don't need database rows, forms, or an admin
// screen — just edit this list directly and push the change to GitHub.
// Set `url` to "#" (or leave it out) for anything that isn't linked yet;
// the ResourceCard component shows a "Link coming soon" badge for those.

export const resources: Resource[] = [
  {
    title: "MSA Constitution",
    description:
      "Read the official constitution that guides how our MSA operates, including officer roles and how decisions are made.",
    url: "#",
  },
  {
    title: "Annual Reports",
    description:
      "A summary of our activities, events, and impact from past school years.",
    url: "#",
  },
  {
    title: "Newsletters",
    description: "Catch up on MSA news, announcements, and member highlights.",
    url: "#",
  },
  {
    title: "Meeting Schedule",
    description: "Find out when and where our regular meetings take place this semester.",
    url: "#",
  },
  {
    title: "Important Forms",
    description: "Permission slips, sign-up sheets, and other forms you may need.",
    url: "#",
  },
  {
    title: "Islamic Educational Resources",
    description: "Articles, videos, and materials to learn more about Islam.",
    url: "#",
  },
  {
    title: "School Resources",
    description: "Helpful links and contacts from Westchester Square Academy.",
    url: "#",
  },
];
