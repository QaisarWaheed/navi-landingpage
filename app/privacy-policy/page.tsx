import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How NAVI collects, uses, and protects your information. Plain-language overview for visitors and customers.",
  openGraph: {
    title: "Privacy Policy | NAVI",
    description:
      "How NAVI collects, uses, and protects your information.",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <Section className="py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <Button href="/" variant="ghost" className="-ml-2 mb-8">
          ← Back to home
        </Button>

        <h1 className="text-3xl font-semibold tracking-tight text-navy sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-accent">Last updated: March 28, 2026</p>

        <div className="mt-10 space-y-8 text-base leading-relaxed text-navy">
          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-navy">Introduction</h2>
            <p className="text-navy">
              NAVI (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy. This policy
              describes how we handle information when you visit our marketing site or use our
              services. It is a simplified summary for transparency; your formal agreement may be
              governed by separate terms when you become a customer.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-navy">Information we collect</h2>
            <p className="text-navy">
              We may collect information you provide directly, such as your name, email address,
              and message content when you use contact forms. We also collect basic technical data
              typical of websites, including IP address, browser type, device information, and
              pages visited, to keep the service secure and reliable.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-navy">How we use information</h2>
            <p className="text-navy">
              We use collected information to respond to inquiries, operate and improve our
              products, analyze usage in aggregate, comply with legal obligations, and protect
              against fraud or abuse. We do not sell your personal information.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-navy">Cookies and analytics</h2>
            <p className="text-navy">
              We may use cookies or similar technologies to remember preferences and understand
              how visitors use the site. You can control cookies through your browser settings.
              Where we use analytics, we aim to configure tools to respect privacy and minimize
              personal data collection.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-navy">Data retention</h2>
            <p className="text-navy">
              We retain information only as long as needed for the purposes described in this
              policy, unless a longer period is required by law. Contact submissions may be kept in
              our support systems for follow-up and quality assurance.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-navy">Your choices</h2>
            <p className="text-navy">
              Depending on your location, you may have rights to access, correct, or delete certain
              personal data, or to object to some processing. To exercise these rights, contact us
              using the details on our main site.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-semibold text-navy">Contact</h2>
            <p className="text-navy">
              Questions about this policy can be sent through our{" "}
              <Link href="/#contact" className="font-medium text-accent underline-offset-2 hover:underline">
                contact form
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </Section>
  );
}
