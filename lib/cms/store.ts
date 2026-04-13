import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { defaultLandingContent } from "./defaults";
import type { HowItWorksStep, LandingContent } from "./types";

const DATA_FILE = path.join(process.cwd(), "data", "landing.json");

type LegacyHowItWorks = Partial<LandingContent["howItWorks"]> & {
  cards?: HowItWorksStep[];
};

function normalizeSteps(saved: LegacyHowItWorks | undefined, fallback: LandingContent["howItWorks"]): HowItWorksStep[] {
  const fromSteps = saved?.steps;
  if (Array.isArray(fromSteps) && fromSteps.length === 3 && fromSteps.every((s) => s && typeof s.title === "string" && typeof s.body === "string")) {
    return fromSteps;
  }
  const cards = saved?.cards;
  if (Array.isArray(cards) && cards.length === 3 && cards.every((s) => s && typeof s.title === "string" && typeof s.body === "string")) {
    return cards;
  }
  return fallback.steps;
}

function mergeContent(saved: Partial<LandingContent>): LandingContent {
  const d = defaultLandingContent;
  const hw = saved.howItWorks as LegacyHowItWorks | undefined;
  return {
    hero: { ...d.hero, ...saved.hero },
    about: { ...d.about, ...saved.about },
    howItWorks: {
      heading: hw?.heading ?? d.howItWorks.heading,
      steps: normalizeSteps(hw, d.howItWorks),
      gettingStartedVideoUrl: typeof hw?.gettingStartedVideoUrl === "string" ? hw.gettingStartedVideoUrl : d.howItWorks.gettingStartedVideoUrl,
      gettingStartedVideoHeading:
        typeof hw?.gettingStartedVideoHeading === "string" ? hw.gettingStartedVideoHeading : d.howItWorks.gettingStartedVideoHeading,
      gettingStartedVideoSubtext:
        typeof hw?.gettingStartedVideoSubtext === "string" ? hw.gettingStartedVideoSubtext : d.howItWorks.gettingStartedVideoSubtext,
    },
    resources: {
      pageTitle: typeof saved.resources?.pageTitle === "string" ? saved.resources.pageTitle : d.resources.pageTitle,
      pageIntro: typeof saved.resources?.pageIntro === "string" ? saved.resources.pageIntro : d.resources.pageIntro,
      items: Array.isArray(saved.resources?.items)
        ? saved.resources!.items
            .filter((it) => it && typeof it.id === "string" && typeof it.title === "string" && typeof it.url === "string")
            .map((it) => ({
              ...it,
              excerpt: typeof it.excerpt === "string" ? it.excerpt : undefined,
              date: typeof it.date === "string" ? it.date : undefined,
            }))
        : d.resources.items,
    },
    privacy: { ...d.privacy, ...saved.privacy },
    contact: { ...d.contact, ...saved.contact },
  };
}

export function getLandingContent(): LandingContent {
  if (!existsSync(DATA_FILE)) {
    return defaultLandingContent;
  }
  try {
    const raw = readFileSync(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<LandingContent>;
    return mergeContent(parsed);
  } catch {
    return defaultLandingContent;
  }
}

export function saveLandingContent(content: LandingContent): void {
  const dir = path.dirname(DATA_FILE);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  writeFileSync(DATA_FILE, JSON.stringify(content, null, 2), "utf8");
}
