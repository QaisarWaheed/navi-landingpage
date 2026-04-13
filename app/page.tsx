import { getLandingContent } from "@/lib/cms/store";
import { LandingView } from "@/components/landing/LandingView";

export const dynamic = "force-dynamic";

export default function HomePage() {
  const content = getLandingContent();
  return <LandingView content={content} />;
}
