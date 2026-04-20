import Link from "next/link";
import { Container } from "@/components/Container";
import { FadeIn } from "@/components/FadeIn";
import type { LandingContent } from "@/lib/cms/types";

const BLOG_SUBSCRIBE_URL = "https://zc.vg/ZNmeY";

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
              <a
                href={BLOG_SUBSCRIBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-lg border-2 border-navy/30 bg-accent px-8 py-3 text-base font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_4px_14px_rgba(15,43,92,0.2)] transition-all duration-300 hover:border-navy/45 hover:bg-accent-hover hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_6px_20px_rgba(15,43,92,0.28)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0"
              >
                Subscribe to the blog
              </a>
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
    </div>
  );
}
