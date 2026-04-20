import type { Metadata } from "next";
import { getLandingContent } from "@/lib/cms/store";
import { ResourcesPageView } from "@/components/resources/ResourcesPageView";
import { RESOURCES_RSS_FEED_URL, fetchRssBlogItems, mergeCmsAndRssItems } from "@/lib/resources/rssFeed";

export const metadata: Metadata = {
  title: "Resources",
  description: "Guides, ideas, and updates from NAVI on navigating organizational change.",
  alternates: {
    types: {
      "application/rss+xml": RESOURCES_RSS_FEED_URL,
    },
  },
};

/** Regenerate the page periodically so the RSS-backed list stays fresh. */
export const revalidate = 300;

export default async function ResourcesPage() {
  const content = getLandingContent();
  const rssItems = await fetchRssBlogItems();
  const items = mergeCmsAndRssItems(content.resources.items, rssItems);
  return <ResourcesPageView resources={{ ...content.resources, items }} />;
}
