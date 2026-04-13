export type HowItWorksStep = { title: string; body: string };

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
    tagline: string;
    subtext: string;
    rightEyebrow: string;
    rightTitle: string;
    rightBody: string;
    getStartedUrl: string;
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
  howItWorks: {
    heading: string;
    steps: HowItWorksStep[];
    /** YouTube or Vimeo watch URL; shown as embedded player when valid */
    gettingStartedVideoUrl: string;
    gettingStartedVideoHeading: string;
    gettingStartedVideoSubtext: string;
  };
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
