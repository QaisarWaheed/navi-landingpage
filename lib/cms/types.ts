export type HowItWorksStep = { title: string; body: string };

export type FeatureItem = { title: string; body: string };

export type ResourceBlogItem = {
  id: string;
  title: string;
  excerpt?: string;
  url: string;
  /** Optional display line, e.g. publication date */
  date?: string;
};

export type LandingContent = {
  hero: {
    brandTitle: string;
    headline: string;
    subheadline: string;
    seoSupportLine: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    getStartedUrl: string;
    bookDemoUrl: string;
    heroImageSrc: string;
    heroImageAlt: string;
  };
  problem: {
    heading: string;
    intro: string;
    bullets: string[];
    closingLine: string;
  };
  solution: {
    heading: string;
    lead: string;
    bullets: string[];
  };
  features: {
    heading: string;
    items: FeatureItem[];
  };
  differentiator: {
    heading: string;
    paragraphs: string[];
  };
  howItWorks: {
    heading: string;
    steps: HowItWorksStep[];
    /** YouTube or Vimeo watch URL; shown as embedded player when valid */
    gettingStartedVideoUrl: string;
    gettingStartedVideoHeading: string;
    gettingStartedVideoSubtext: string;
  };
  about: {
    heading: string;
    lead: string;
    body: string;
    testimonialQuote: string;
    testimonialInitials: string;
    testimonialName: string;
    testimonialRole: string;
  };
  emotional: {
    heading: string;
    intro: string;
    bullets: string[];
  };
  closingCta: {
    heading: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    supportLine: string;
  };
  leadMagnet: {
    heading: string;
    intro: string;
    bullets: string[];
    ctaLabel: string;
    ctaUrl: string;
  };
  seoFooter: {
    body: string;
  };
  seoKeywords: string[];
  resources: {
    pageTitle: string;
    pageIntro: string;
    items: ResourceBlogItem[];
  };
  privacy: {
    pill: string;
    heading: string;
    body: string;
    lastUpdated: string;
  };
  contact: {
    heading: string;
    subtext: string;
    sidebarTitle: string;
    email: string;
    phone: string;
    addressLine1: string;
    addressLine2: string;
  };
};
