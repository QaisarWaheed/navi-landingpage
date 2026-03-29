import Link from "next/link";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import { StaggerIn } from "@/components/StaggerIn";
import { ContactForm } from "@/components/ContactForm";
import { Button } from "@/components/Button";

function HeroIcon() {
  return (
    <div
      className="mb-2 inline-flex rounded-xl bg-icon-tile p-3.5 shadow-sm transition-all duration-300 ease-out motion-safe:hover:scale-105 motion-safe:hover:shadow-md"
      aria-hidden
    >
      <svg className="h-8 w-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
        />
      </svg>
    </div>
  );
}

/** Inline play glyph; use with text (same row), `currentColor` for hover sync. */
function PlayIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`block shrink-0 ${className}`}
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  );
}

const workCards = [
  {
    title: "Audit & Analyze",
    body: "Map stakeholders, constraints, and readiness so you know what to tackle first—and what to defer.",
    icon: (
      <svg className="h-7 w-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    title: "Design Roadmaps",
    body: "Sequence initiatives with clear owners, milestones, and measures everyone can follow.",
    icon: (
      <svg className="h-7 w-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  {
    title: "Execute & Iterate",
    body: "Run the plan, capture learnings, and adjust without losing sight of the goal or your people.",
    icon: (
      <svg className="h-7 w-7 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-navy/10">
        <div className="grid md:grid-cols-2">
          <div className="flex flex-col justify-center bg-navy px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
            <StaggerIn className="flex flex-col gap-5" staggerMs={95}>
              <HeroIcon />
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">NAVI</h1>
              <p className="text-xl font-medium text-accent sm:text-2xl">Your Change Navigator</p>
              <p className="max-w-md text-base leading-relaxed text-white sm:text-lg">
                Leading teams through the architecture of transformation.
              </p>
            </StaggerIn>
          </div>
          <div className="flex flex-col justify-center bg-white px-6 py-16 sm:px-10 lg:px-16 lg:py-24">
            <StaggerIn className="flex flex-col gap-5" staggerMs={95}>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                Modern SaaS Solutions
              </p>
              <h2 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl lg:text-[2.5rem] lg:leading-tight">
                Simplify Your Workflow
              </h2>
              <p className="max-w-lg text-base leading-relaxed text-navy sm:text-lg">
                Bring plans, people, and progress together so your team can focus on outcomes—not
                overhead. NAVI keeps change visible, accountable, and on track.
              </p>
              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <Button
                  href="https://app.changewithnavi.com"
                  variant="getStarted"
                  className="inline-flex !h-12 min-h-12 shrink-0 !px-8 !py-0 text-base font-semibold shadow-none hover:shadow-sm"
                >
                  Get Started
                </Button>
                <Button
                  href="/#how-it-works"
                  variant="outline"
                  className="group inline-flex h-12 shrink-0 items-center justify-center rounded-lg border-2 border-accent bg-white px-8 text-base font-semibold text-navy transition-all duration-300 hover:border-accent hover:bg-accent hover:text-white hover:shadow-md motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0"
                >
                  <span className="inline-flex items-center gap-2.5">
                    <PlayIcon className="text-accent transition-colors duration-300 ease-out group-hover:text-white motion-safe:group-hover:scale-110" />
                    <span className="leading-none">View Demo</span>
                  </span>
                </Button>
              </div>
            </StaggerIn>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-20 py-16 md:py-24">
        <Container>
          <FadeIn>
            <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">About Us</h2>
          </FadeIn>
          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <FadeIn>
              <p className="text-xl font-bold leading-snug text-navy sm:text-2xl">
                We build the operating system for change—not another project tracker.
              </p>
              <p className="mt-6 text-base leading-relaxed text-navy sm:text-lg">
                NAVI helps leaders and teams replace scattered updates with a single narrative: what
                is changing, why it matters, and who does what next. From strategy to execution, you
                get clarity without the noise.
              </p>
            </FadeIn>
            <FadeIn delay={80}>
              <figure className="group rounded-2xl border border-navy/10 bg-white p-8 shadow-[0_4px_24px_rgba(15,43,92,0.08)] transition-all duration-300 ease-out motion-safe:hover:-translate-y-1.5 motion-safe:hover:border-accent motion-safe:hover:shadow-[0_16px_48px_rgba(15,43,92,0.12)]">
                <blockquote className="text-base leading-relaxed text-navy sm:text-lg">
                  &ldquo;NAVI gave our leadership team one story for transformation—finally everyone
                  pulled in the same direction.&rdquo;
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white transition-transform duration-300 ease-out motion-safe:group-hover:scale-105"
                    aria-hidden
                  >
                    SC
                  </div>
                  <div>
                    <p className="font-semibold text-navy">Sarah Chen</p>
                    <p className="text-sm text-accent">Chief Strategy Officer</p>
                  </div>
                </figcaption>
              </figure>
            </FadeIn>
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-20 bg-white py-16 md:py-24">
        <Container>
          <FadeIn>
            <h2 className="text-center text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              How It Works
            </h2>
          </FadeIn>
          <ul className="mt-14 grid gap-8 md:grid-cols-3">
            {workCards.map((card, i) => (
              <FadeIn key={card.title} delay={i * 60}>
                <li className="group h-full rounded-2xl border border-navy/10 bg-white p-8 shadow-[0_4px_20px_rgba(15,43,92,0.07)] transition-all duration-300 ease-out motion-safe:hover:-translate-y-2 motion-safe:hover:border-accent motion-safe:hover:shadow-[0_18px_50px_rgba(15,43,92,0.14)]">
                  <div className="inline-flex rounded-xl bg-icon-tile p-3 transition-transform duration-300 ease-out motion-safe:group-hover:scale-110 motion-safe:group-hover:shadow-sm">
                    {card.icon}
                  </div>
                  <h3 className="mt-6 text-lg font-bold text-navy">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-navy sm:text-base">{card.body}</p>
                </li>
              </FadeIn>
            ))}
          </ul>
        </Container>
      </section>

      {/* Privacy preview */}
      <section id="privacy" className="scroll-mt-20 py-16 md:py-24">
        <Container>
          <FadeIn>
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full border border-navy/15 bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-navy transition-all duration-300 ease-out motion-safe:hover:scale-105 motion-safe:hover:border-accent motion-safe:hover:shadow-md">
                Trust &amp; Security
              </span>
              <h2 className="mt-6 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                Privacy Policy
              </h2>
            </div>
          </FadeIn>
          <FadeIn className="mt-10" delay={60}>
            <div className="mx-auto max-w-3xl rounded-2xl border border-navy/10 bg-white p-8 shadow-[0_4px_24px_rgba(15,43,92,0.08)] transition-all duration-300 ease-out sm:p-10 motion-safe:hover:-translate-y-1 motion-safe:hover:border-accent motion-safe:hover:shadow-[0_14px_44px_rgba(15,43,92,0.11)]">
              <p className="text-base leading-relaxed text-navy">
                We take data protection seriously. NAVI is designed with security in mind—from how
                we handle contact inquiries to how we plan for enterprise-grade controls. Our full
                policy explains what we collect, why we collect it, and how you stay in control.
              </p>
              <div className="mt-8 flex flex-col gap-4 border-t border-navy/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-navy">Last updated: March 28, 2026</p>
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

      {/* Contact */}
      <section id="contact" className="scroll-mt-20 bg-white py-16 md:py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-16">
            <FadeIn>
              <h2 className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">Get in Touch</h2>
              <p className="mt-3 text-base text-navy">
                Tell us about your organization—we&apos;ll get back to you shortly.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </FadeIn>
            <FadeIn delay={80}>
              <div className="h-full rounded-2xl bg-navy p-8 text-white shadow-[0_12px_40px_rgba(15,43,92,0.25)] transition-all duration-500 ease-out lg:p-10 motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_20px_56px_rgba(15,43,92,0.38)]">
                <h3 className="text-lg font-bold">Contact Information</h3>
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
                        href="mailto:hello@navi.io"
                        className="mt-1 block text-sm font-medium transition-colors duration-200 hover:text-accent"
                      >
                        hello@navi.io
                      </a>
                    </div>
                  </li>
                  <li className="group flex gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#163565] transition-transform duration-300 ease-out motion-safe:group-hover:scale-110">
                      <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </span>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-white">Phone</p>
                      <a
                        href="tel:+18005551234"
                        className="mt-1 block text-sm font-medium transition-colors duration-200 hover:text-accent"
                      >
                        +1 (800) 555-1234
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
                        100 Navigator Way
                        <br />
                        San Francisco, CA 94105
                      </p>
                    </div>
                  </li>
                </ul>
                <div className="mt-10 flex gap-3 border-t border-white pt-10">
                  <a
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-white transition-all duration-200 ease-out hover:border-accent hover:text-accent motion-safe:hover:scale-110 motion-safe:active:scale-95"
                    aria-label="LinkedIn"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-white transition-all duration-200 ease-out hover:border-accent hover:text-accent motion-safe:hover:scale-110 motion-safe:active:scale-95"
                    aria-label="X"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white text-white transition-all duration-200 ease-out hover:border-accent hover:text-accent motion-safe:hover:scale-110 motion-safe:active:scale-95"
                    aria-label="GitHub"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </Container>
      </section>
    </>
  );
}
