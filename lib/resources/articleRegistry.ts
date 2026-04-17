import type { ComponentType } from "react";
import { LeadershipAlignmentContent } from "@/components/resources/articles/LeadershipAlignmentContent";
import { FutureOfChangeManagementContent } from "@/components/resources/articles/FutureOfChangeManagementContent";
import { WhyChangeInitiativesFailContent } from "@/components/resources/articles/WhyChangeInitiativesFailContent";

export type ArticleEntry = {
  slug: string;
  title: string;
  description: string;
  date: string;
  Content: ComponentType;
};

export const ARTICLES: ArticleEntry[] = [
  {
    slug: "leadership-alignment",
    title: "Leadership Alignment: The Missing Link in Successful Organizational Change",
    description:
      "Learn why leadership alignment is critical to successful change and how misalignment at the top can derail even the best strategies.",
    date: "April 2026",
    Content: LeadershipAlignmentContent,
  },
  {
    slug: "the-future-of-change-management",
    title: "The Future of Change Management: How Technology Is Transforming Organizational Change",
    description:
      "Explore how technology platforms are transforming change management and helping organizations drive faster, more effective transformation.",
    date: "April 2026",
    Content: FutureOfChangeManagementContent,
  },
  {
    slug: "why-most-change-initiatives-fail",
    title: "Why Most Change Initiatives Fail And What Leaders Must Do Differently",
    description:
      "Discover why most change initiatives fail and how leaders can drive successful transformation with the right strategy, alignment, and execution.",
    date: "April 2026",
    Content: WhyChangeInitiativesFailContent,
  },
];

export const articleBySlug = Object.fromEntries(ARTICLES.map((a) => [a.slug, a])) as Record<string, ArticleEntry>;

export const articleSlugs = ARTICLES.map((a) => a.slug);
