import type { Metadata } from "next";
import { getLandingContent } from "@/lib/cms/store";
import { LandingView } from "@/components/landing/LandingView";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = getLandingContent();
  return {
    title: content.hero.headline,
    description: content.hero.subheadline,
    keywords: content.seoKeywords,
  };
}

export default function HomePage() {
  const content = getLandingContent();
  return <LandingView content={content} />;
}
