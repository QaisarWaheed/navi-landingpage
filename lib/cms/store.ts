import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import { defaultLandingContent } from "./defaults";
import type { FeatureItem, HowItWorksStep, LandingContent } from "./types";

const DATA_FILE = path.join(process.cwd(), "data", "landing.json");

type LegacyHowItWorks = Partial<LandingContent["howItWorks"]> & {
  cards?: HowItWorksStep[];
};

/** Saved payloads may include removed hero keys from older CMS versions. */
type LegacyHero = Partial<LandingContent["hero"]> & {
  tagline?: string;
  subtext?: string;
  rightEyebrow?: string;
  rightTitle?: string;
  rightBody?: string;
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

function normalizeFeatureItems(items: unknown, fallback: FeatureItem[]): FeatureItem[] {
  if (!Array.isArray(items) || items.length === 0) return fallback;
  const out = items.filter((it): it is FeatureItem => it && typeof (it as FeatureItem).title === "string" && typeof (it as FeatureItem).body === "string");
  return out.length > 0 ? out : fallback;
}

function normalizeStrings(arr: unknown, fallback: string[]): string[] {
  if (!Array.isArray(arr) || arr.length === 0) return fallback;
  const out = arr.filter((x): x is string => typeof x === "string" && x.length > 0);
  return out.length > 0 ? out : fallback;
}

function normalizeParagraphs(arr: unknown, fallback: string[]): string[] {
  if (!Array.isArray(arr) || arr.length === 0) return fallback;
  const out = arr.filter((x): x is string => typeof x === "string" && x.length > 0);
  return out.length > 0 ? out : fallback;
}

function mergeHero(saved: LegacyHero | undefined, d: LandingContent["hero"]): LandingContent["hero"] {
  const s = saved ?? {};
  /** Old CMS used `tagline` for a short line under the brand — do not treat it as the SEO H1. */
  const fromLegacyTagline =
    typeof s.tagline === "string" && s.tagline.length >= 48 ? s.tagline : undefined;
  const headline =
    typeof s.headline === "string" && s.headline.length > 0 ? s.headline : fromLegacyTagline ?? d.headline;
  const subheadline =
    typeof s.subheadline === "string" && s.subheadline.length > 0
      ? s.subheadline
      : typeof s.subtext === "string" && s.subtext.length > 0
        ? s.subtext
        : d.subheadline;
  return {
    brandTitle: typeof s.brandTitle === "string" ? s.brandTitle : d.brandTitle,
    headline,
    subheadline,
    seoSupportLine: typeof s.seoSupportLine === "string" ? s.seoSupportLine : d.seoSupportLine,
    primaryCtaLabel: typeof s.primaryCtaLabel === "string" ? s.primaryCtaLabel : d.primaryCtaLabel,
    secondaryCtaLabel: typeof s.secondaryCtaLabel === "string" ? s.secondaryCtaLabel : d.secondaryCtaLabel,
    getStartedUrl: typeof s.getStartedUrl === "string" ? s.getStartedUrl : d.getStartedUrl,
    bookDemoUrl: typeof s.bookDemoUrl === "string" ? s.bookDemoUrl : d.bookDemoUrl,
    heroImageSrc: typeof s.heroImageSrc === "string" ? s.heroImageSrc : d.heroImageSrc,
    heroImageAlt: typeof s.heroImageAlt === "string" ? s.heroImageAlt : d.heroImageAlt,
  };
}

export function mergeContent(saved: Partial<LandingContent>): LandingContent {
  const d = defaultLandingContent;
  const hw = saved.howItWorks as LegacyHowItWorks | undefined;
  const prob = saved.problem;
  const sol = saved.solution;
  const feat = saved.features;
  const diff = saved.differentiator;
  const emo = saved.emotional;
  const close = saved.closingCta;
  const seoF = saved.seoFooter;
  const kw = saved.seoKeywords;

  return {
    hero: mergeHero(saved.hero as LegacyHero | undefined, d.hero),
    problem: {
      heading: typeof prob?.heading === "string" ? prob.heading : d.problem.heading,
      intro: typeof prob?.intro === "string" ? prob.intro : d.problem.intro,
      bullets: normalizeStrings(prob?.bullets, d.problem.bullets),
      closingLine: typeof prob?.closingLine === "string" ? prob.closingLine : d.problem.closingLine,
    },
    solution: {
      heading: typeof sol?.heading === "string" ? sol.heading : d.solution.heading,
      lead: typeof sol?.lead === "string" ? sol.lead : d.solution.lead,
      bullets: normalizeStrings(sol?.bullets, d.solution.bullets),
    },
    features: {
      heading: typeof feat?.heading === "string" ? feat.heading : d.features.heading,
      items: normalizeFeatureItems(feat?.items, d.features.items),
    },
    differentiator: {
      heading: typeof diff?.heading === "string" ? diff.heading : d.differentiator.heading,
      paragraphs: normalizeParagraphs(diff?.paragraphs, d.differentiator.paragraphs),
    },
    howItWorks: {
      heading: typeof hw?.heading === "string" ? hw.heading : d.howItWorks.heading,
      steps: normalizeSteps(hw, d.howItWorks),
      gettingStartedVideoUrl: typeof hw?.gettingStartedVideoUrl === "string" ? hw.gettingStartedVideoUrl : d.howItWorks.gettingStartedVideoUrl,
      gettingStartedVideoHeading:
        typeof hw?.gettingStartedVideoHeading === "string" ? hw.gettingStartedVideoHeading : d.howItWorks.gettingStartedVideoHeading,
      gettingStartedVideoSubtext:
        typeof hw?.gettingStartedVideoSubtext === "string" ? hw.gettingStartedVideoSubtext : d.howItWorks.gettingStartedVideoSubtext,
    },
    about: { ...d.about, ...saved.about },
    emotional: {
      heading: typeof emo?.heading === "string" ? emo.heading : d.emotional.heading,
      intro: typeof emo?.intro === "string" ? emo.intro : d.emotional.intro,
      bullets: normalizeStrings(emo?.bullets, d.emotional.bullets),
    },
    closingCta: {
      heading: typeof close?.heading === "string" ? close.heading : d.closingCta.heading,
      primaryCtaLabel: typeof close?.primaryCtaLabel === "string" ? close.primaryCtaLabel : d.closingCta.primaryCtaLabel,
      secondaryCtaLabel: typeof close?.secondaryCtaLabel === "string" ? close.secondaryCtaLabel : d.closingCta.secondaryCtaLabel,
      supportLine: typeof close?.supportLine === "string" ? close.supportLine : d.closingCta.supportLine,
    },
    seoFooter: {
      body: typeof seoF?.body === "string" ? seoF.body : d.seoFooter.body,
    },
    seoKeywords: Array.isArray(kw) && kw.every((k) => typeof k === "string") && kw.length > 0 ? kw : d.seoKeywords,
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
