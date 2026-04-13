import type { Metadata } from "next";
import { getLandingContent } from "@/lib/cms/store";
import { ResourcesPageView } from "@/components/resources/ResourcesPageView";

export const metadata: Metadata = {
  title: "Resources",
  description: "Guides, ideas, and updates from NAVI on navigating organizational change.",
};

export const dynamic = "force-dynamic";

export default function ResourcesPage() {
  const content = getLandingContent();
  return <ResourcesPageView resources={content.resources} />;
}
