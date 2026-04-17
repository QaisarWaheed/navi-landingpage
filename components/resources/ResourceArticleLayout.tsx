import type { ReactNode } from "react";
import Link from "next/link";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";

type Props = {
  title: string;
  description: string;
  date: string;
  children: ReactNode;
};

export function ResourceArticleLayout({ title, description, date, children }: Props) {
  return (
    <Section className="bg-canvas py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <Button href="/resources" variant="ghost" className="-ml-2 mb-6">
          ← Back to resources
        </Button>

        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">NAVI · Resources</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-navy sm:text-4xl">{title}</h1>
        <p className="mt-3 text-base leading-relaxed text-navy sm:text-lg">{description}</p>
        <p className="mt-3 text-sm text-accent">{date}</p>

        <div className="mt-10 space-y-8 text-base leading-relaxed text-navy">{children}</div>

        <p className="mt-12 border-t border-navy/10 pt-8">
          <Link href="/resources" className="text-sm font-semibold text-accent transition-colors hover:text-navy">
            ← All resources
          </Link>
        </p>
      </div>
    </Section>
  );
}
