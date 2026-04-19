import Link from "next/link";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import type { LandingContent } from "@/lib/cms/types";

const BLOG_SUBSCRIBE_URL = "https://zc.vg/ZNmeY";
const RESOURCES_RSS_FEED_URL = "https://rss.app/feeds/tiOAnwzgFZaJCNHj.xml";

type Props = { resources: LandingContent["resources"] };

function isExternalUrl(url: string) {
  return /^https?:\/\//i.test(url.trim());
}

export function ResourcesPageView({ resources }: Props) {
  const { pageTitle, pageIntro, items } = resources;

  return (
    <div className="bg-canvas">
      <section className="border-b border-navy/10 bg-white py-14 md:py-20">
        <Container>
          <FadeIn>
            <h1 className="text-3xl font-bold tracking-tight text-navy sm:text-4xl">{pageTitle}</h1>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-navy sm:text-lg">{pageIntro}</p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
              <Button
                href={BLOG_SUBSCRIBE_URL}
                variant="primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Subscribe to the blog
              </Button>
              <Link
                href="/"
                className="inline-flex text-sm font-semibold text-accent transition-colors hover:text-navy"
              >
                ← Back to home
              </Link>
            </div>
          </FadeIn>
        </Container>
      </section>

      <section className="py-14 md:py-20">
        <Container>
          {items.length === 0 ? (
            <FadeIn>
              <p className="text-center text-navy/70">No articles yet. Check back soon.</p>
            </FadeIn>
          ) : (
            <ul className="mx-auto grid max-w-3xl gap-6">
              {items.map((item, i) => {
                const external = isExternalUrl(item.url);
                const cardClass =
                  "group block rounded-2xl border border-navy/10 bg-white p-6 shadow-[0_4px_20px_rgba(15,43,92,0.07)] transition-all duration-300 ease-out motion-safe:hover:-translate-y-1 motion-safe:hover:border-accent motion-safe:hover:shadow-[0_18px_50px_rgba(15,43,92,0.12)]";
                const inner = (
                  <>
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h2 className="text-lg font-bold text-navy transition-colors group-hover:text-accent sm:text-xl">
                        {item.title}
                      </h2>
                      {item.date ? (
                        <span className="shrink-0 text-xs font-medium uppercase tracking-wide text-navy/50">{item.date}</span>
                      ) : null}
                    </div>
                    {item.excerpt ? (
                      <p className="mt-3 text-sm leading-relaxed text-navy sm:text-base">{item.excerpt}</p>
                    ) : null}
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                      Read article
                      <span
                        className="transition-transform duration-200 ease-out motion-safe:group-hover:translate-x-1"
                        aria-hidden
                      >
                        →
                      </span>
                    </span>
                  </>
                );
                return (
                  <FadeIn key={item.id} delay={i * 50}>
                    <li>
                      {external ? (
                        <a href={item.url} target="_blank" rel="noopener noreferrer" className={cardClass}>
                          {inner}
                        </a>
                      ) : (
                        <Link href={item.url} className={cardClass}>
                          {inner}
                        </Link>
                      )}
                    </li>
                  </FadeIn>
                );
              })}
            </ul>
          )}
        </Container>
      </section>

      <section className="border-t border-navy/10 bg-white py-12 md:py-14" aria-label="RSS feed">
        <Container>
          <FadeIn>
            <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center md:flex-row md:items-center md:justify-between md:text-left">
              <div className="max-w-md">
                <h2 className="text-lg font-bold text-navy">RSS feed</h2>
                <p className="mt-1 text-sm leading-relaxed text-navy/70">
                  Follow new articles in your preferred feed reader using our RSS link.
                </p>
              </div>
              <a
                href={RESOURCES_RSS_FEED_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 rounded-lg border-2 border-navy/15 bg-canvas px-4 py-2.5 text-sm font-semibold text-navy transition-all duration-200 hover:border-accent hover:text-accent motion-safe:hover:-translate-y-0.5"
              >
                <svg className="h-5 w-5 text-accent" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <circle cx="6.18" cy="17.82" r="3.18" />
                  <path d="M4 4.44v2.83c6.36 0 11.53 5.17 11.53 11.53h2.83C18.36 10.89 12.11 4.64 4 4.44z" />
                  <path d="M4 10.36v2.83c3.3 0 5.97 2.67 5.97 5.97h2.83c0-4.84-3.93-8.8-8.8-8.8z" />
                </svg>
                Open RSS feed
              </a>
            </div>
          </FadeIn>
        </Container>
      </section>
    </div>
  );
}
