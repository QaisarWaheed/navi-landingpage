import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { StaggerIn } from "@/components/StaggerIn";
import { ContactForm } from "@/components/ContactForm";
import type { LandingContent } from "@/lib/cms/types";
import { selfHostedGettingStartedSrc } from "@/lib/cms/hostedGettingStartedVideo";
import { toVideoEmbedSrc } from "@/lib/videoEmbed";

/** Matched pair for dark navy bands: same height, radius, and motion; no Button variant conflicts. */
const ctaOnNavyPrimary =
  "inline-flex h-12 min-h-12 shrink-0 items-center justify-center rounded-lg bg-white px-8 text-center text-base font-semibold leading-none text-navy shadow-[0_4px_14px_rgba(0,0,0,0.18)] outline-none transition-all duration-300 hover:bg-icon-tile hover:shadow-[0_6px_22px_rgba(0,0,0,0.22)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0";

const ctaOnNavySecondary =
  "inline-flex h-12 min-h-12 shrink-0 items-center justify-center rounded-lg border-2 border-white bg-transparent px-8 text-center text-base font-semibold leading-none text-white transition-all duration-300 hover:border-accent hover:bg-accent hover:text-white hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0";

type Props = { content: LandingContent };

export function LandingView({ content }: Props) {
  const {
    hero,
    problem,
    solution,
    features,
    differentiator,
    howItWorks,
    about,
    emotional,
    closingCta,
    privacy,
    contact,
    seoFooter,
  } = content;
  const mailHref = `mailto:${contact.email}`;
  const rawVideo = howItWorks.gettingStartedVideoUrl.trim();
  const hostedVideoSrc = selfHostedGettingStartedSrc(rawVideo);
  const embedVideoSrc = hostedVideoSrc ? null : toVideoEmbedSrc(howItWorks.gettingStartedVideoUrl);
  const showGettingStartedVideo = !!(hostedVideoSrc || embedVideoSrc);

  const heroImg = hero.heroImageSrc.trim();
  const showHeroImage = heroImg.length > 0;

  return (
    <>
      <section className="border-b border-navy/10">
        <div className="grid md:grid-cols-2">
          <div className="flex flex-col justify-center bg-navy px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
            <StaggerIn className="flex flex-col gap-5" staggerMs={95}>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">{hero.brandTitle}</p>
              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.35rem] lg:leading-tight">
                {hero.headline}
              </h1>
              <p className="max-w-xl text-base leading-relaxed text-white/95 sm:text-lg">{hero.subheadline}</p>
              <p className="max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">{hero.seoSupportLine}</p>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <Link href={hero.getStartedUrl} className={ctaOnNavyPrimary}>
                  {hero.primaryCtaLabel}
                </Link>
                <Link href={hero.bookDemoUrl} className={ctaOnNavySecondary}>
                  {hero.secondaryCtaLabel}
                </Link>
              </div>
            </StaggerIn>
          </div>
          <div className="relative min-h-[280px] bg-navy md:min-h-[420px]">
            {showHeroImage ? (
              <Image
                src={heroImg}
                alt={hero.heroImageAlt}
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="flex h-full min-h-[280px] items-center justify-center bg-[#163565] text-sm text-white/60 md:min-h-full">
                Hero image
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="problem" className="scroll-mt-20 py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">{problem.heading}</h2>
              <p className="mt-4 text-base leading-relaxed text-navy sm:text-lg">{problem.intro}</p>
            </FadeIn>
            <FadeIn className="mt-10" delay={60}>
              <ul className="space-y-4">
                {problem.bullets.map((line) => (
                  <li key={line} className="flex gap-3 text-base leading-relaxed text-navy sm:text-lg">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-10 text-base font-semibold leading-snug text-navy sm:text-lg">{problem.closingLine}</p>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section id="solution" className="scroll-mt-20 bg-white py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">{solution.heading}</h2>
              <p className="mt-4 text-base leading-relaxed text-navy sm:text-lg">{solution.lead}</p>
            </FadeIn>
            <FadeIn className="mt-10" delay={60}>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-accent">With NAVI, you can</p>
              <ul className="mt-6 space-y-4">
                {solution.bullets.map((line) => (
                  <li key={line} className="flex gap-3 text-base leading-relaxed text-navy sm:text-lg">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section id="features" className="scroll-mt-20 py-16 md:py-24">
        <Container>
          <FadeIn>
            <h2 className="text-center text-2xl font-bold tracking-tight text-navy sm:text-3xl">{features.heading}</h2>
          </FadeIn>
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.items.map((item, i) => (
              <FadeIn key={`${item.title}-${i}`} delay={i * 50}>
                <li className="h-full rounded-2xl border border-navy/10 bg-white p-6 shadow-sm transition-all duration-300 ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:border-accent/40 motion-safe:hover:shadow-md md:p-8">
                  <h3 className="text-lg font-bold text-navy">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy sm:text-base">{item.body}</p>
                </li>
              </FadeIn>
            ))}
          </ul>
        </Container>
      </section>

      <section id="differentiator" className="scroll-mt-20 bg-white py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">{differentiator.heading}</h2>
              <div className="mt-8 space-y-6 text-base leading-relaxed text-navy sm:text-lg">
                {differentiator.paragraphs.map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section id="how-it-works" className="scroll-mt-20 bg-canvas py-16 md:py-24">
        <Container>
          <FadeIn>
            <h2 className="text-center text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              {howItWorks.heading}
            </h2>
          </FadeIn>
          <ol className="mx-auto mt-14 max-w-3xl space-y-0">
            {howItWorks.steps.map((step, i) => (
              <FadeIn key={`${step.title}-${i}`} delay={i * 60}>
                <li className="relative flex gap-5 pb-12 last:pb-0 md:gap-8">
                  {i < howItWorks.steps.length - 1 ? (
                    <div
                      className="absolute left-[1.125rem] top-11 hidden h-[calc(100%-0.25rem)] w-px bg-navy/15 md:block"
                      aria-hidden
                    />
                  ) : null}
                  <div className="relative z-[1] flex shrink-0 flex-col items-center">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-sm font-bold text-white shadow-sm ring-4 ring-canvas md:h-10 md:w-10 md:text-base">
                      {i + 1}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 rounded-2xl border border-navy/10 bg-white p-6 shadow-sm transition-all duration-300 ease-out motion-safe:hover:border-accent/50 md:p-8">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Stage {i + 1}</p>
                    <h3 className="mt-2 text-xl font-bold text-navy">{step.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-navy sm:text-base">{step.body}</p>
                  </div>
                </li>
              </FadeIn>
            ))}
          </ol>

          {showGettingStartedVideo ? (
            <FadeIn className="mx-auto mt-4 max-w-3xl" delay={100}>
              <div
                id="getting-started-video"
                className="scroll-mt-24 overflow-hidden rounded-2xl border border-navy/10 bg-white shadow-[0_8px_40px_rgba(15,43,92,0.08)]"
              >
                <div className="border-b border-navy/10 px-6 py-5 md:px-8">
                  <h3 className="text-lg font-bold text-navy md:text-xl">{howItWorks.gettingStartedVideoHeading}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-navy/80 md:text-base">{howItWorks.gettingStartedVideoSubtext}</p>
                </div>
                <div className="relative aspect-video w-full bg-black">
                  {hostedVideoSrc ? (
                    <video
                      key={hostedVideoSrc}
                      className="absolute inset-0 h-full w-full object-contain"
                      controls
                      playsInline
                      preload="metadata"
                      title={howItWorks.gettingStartedVideoHeading}
                    >
                      <source
                        src={hostedVideoSrc}
                        type={hostedVideoSrc.toLowerCase().endsWith(".webm") ? "video/webm" : "video/mp4"}
                      />
                    </video>
                  ) : embedVideoSrc ? (
                    <iframe
                      title={howItWorks.gettingStartedVideoHeading}
                      src={embedVideoSrc}
                      className="absolute inset-0 h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : null}
                </div>
              </div>
            </FadeIn>
          ) : null}
        </Container>
      </section>

      <section id="about" className="scroll-mt-20 py-16 md:py-24">
        <Container>
          <FadeIn>
            <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">{about.heading}</h2>
          </FadeIn>
          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeIn>
              <p className="text-xl font-bold leading-snug text-navy sm:text-2xl">{about.lead}</p>
              <p className="mt-6 text-base leading-relaxed text-navy sm:text-lg">{about.body}</p>
            </FadeIn>
            <FadeIn delay={80}>
              <figure className="group rounded-2xl border border-navy/10 bg-white p-8 shadow-[0_4px_24px_rgba(15,43,92,0.08)] transition-all duration-300 ease-out motion-safe:hover:-translate-y-1.5 motion-safe:hover:border-accent motion-safe:hover:shadow-[0_16px_48px_rgba(15,43,92,0.12)]">
                <blockquote className="text-base leading-relaxed text-navy sm:text-lg">
                  &ldquo;{about.testimonialQuote}&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white transition-transform duration-300 ease-out motion-safe:group-hover:scale-105"
                    aria-hidden
                  >
                    {about.testimonialInitials}
                  </div>
                  <div>
                    <p className="font-semibold text-navy">{about.testimonialName}</p>
                    <p className="text-sm text-accent">{about.testimonialRole}</p>
                  </div>
                </figcaption>
              </figure>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section id="clarity" className="scroll-mt-20 bg-white py-16 md:py-24">
        <Container>
          <div className="mx-auto max-w-3xl">
            <FadeIn>
              <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">{emotional.heading}</h2>
              <p className="mt-6 text-base leading-relaxed text-navy sm:text-lg">{emotional.intro}</p>
              <ul className="mt-8 max-w-xl space-y-3">
                {emotional.bullets.map((line) => (
                  <li
                    key={line}
                    className="rounded-xl border border-navy/10 bg-canvas px-4 py-3 text-base font-medium text-navy"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section id="cta" className="scroll-mt-20 bg-navy py-16 md:py-20">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">{closingCta.heading}</h2>
              <p className="mt-5 text-base leading-relaxed text-white/85 sm:text-lg">{closingCta.supportLine}</p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-5">
                <Link href={hero.getStartedUrl} className={`${ctaOnNavyPrimary} w-full sm:w-auto`}>
                  {closingCta.primaryCtaLabel}
                </Link>
                <Link href={hero.bookDemoUrl} className={`${ctaOnNavySecondary} w-full sm:w-auto`}>
                  {closingCta.secondaryCtaLabel}
                </Link>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section id="privacy" className="scroll-mt-20 bg-canvas py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full border border-navy/15 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-navy transition-all duration-300 ease-out motion-safe:hover:scale-105 motion-safe:hover:border-accent motion-safe:hover:shadow-md">
                {privacy.pill}
              </span>
              <h2 className="mt-6 text-2xl font-bold tracking-tight text-navy sm:text-3xl">{privacy.heading}</h2>
            </div>
          </FadeIn>
          <FadeIn className="mt-10" delay={60}>
            <div className="mx-auto max-w-3xl rounded-2xl border border-navy/10 bg-white p-8 shadow-[0_4px_24px_rgba(15,43,92,0.08)] transition-all duration-300 ease-out sm:p-10 motion-safe:hover:-translate-y-1 motion-safe:hover:border-accent motion-safe:hover:shadow-[0_14px_44px_rgba(15,43,92,0.11)]">
              <p className="text-base leading-relaxed text-navy">{privacy.body}</p>
              <div className="mt-8 flex flex-col gap-4 border-t border-navy/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-navy">{privacy.lastUpdated}</p>
                <Link
                  href="/privacy-policy"
                  className="group inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors duration-200 hover:text-navy"
                >
                  Read more
                  <span
                    className="inline-block transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-1"
                    aria-hidden
                  >
                    →
                  </span>
                </Link>
              </div>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section id="contact" className="scroll-mt-20 bg-white py-16 md:py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
            <FadeIn>
              <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">{contact.heading}</h2>
              <p className="mt-3 text-base text-navy">{contact.subtext}</p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </FadeIn>
            <FadeIn delay={80}>
              <div className="h-full rounded-2xl bg-navy p-8 text-white shadow-[0_12px_40px_rgba(15,43,92,0.25)] transition-all duration-500 ease-out lg:p-10 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_20px_56px_rgba(15,43,92,0.38)]">
                <h3 className="text-lg font-bold">{contact.sidebarTitle}</h3>
                <ul className="mt-8 space-y-6">
                  <li className="group flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#163565] transition-transform duration-300 ease-out motion-safe:group-hover:scale-110">
                      <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-white">Email</p>
                      <a
                        href={mailHref}
                        className="mt-1 block text-sm font-medium transition-colors duration-200 hover:text-accent"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </li>
                  <li className="group flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#163565] transition-transform duration-300 ease-out motion-safe:group-hover:scale-110">
                      <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-white">Address</p>
                      <p className="mt-1 text-sm font-medium">
                        {contact.addressLine1}
                        {contact.addressLine2.trim() ? (
                          <>
                            <br />
                            {contact.addressLine2}
                          </>
                        ) : null}
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>

      <section className="border-t border-navy/10 bg-canvas py-12 md:py-14" aria-label="About NAVI for search">
        <Container>
          <p className="mx-auto max-w-4xl text-sm leading-relaxed text-navy/80 md:text-base">{seoFooter.body}</p>
        </Container>
      </section>
    </>
  );
}
