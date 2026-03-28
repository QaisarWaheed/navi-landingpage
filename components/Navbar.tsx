"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Container } from "./Container";
import { Button } from "./Button";

const links = [
  { href: "/", label: "Home", match: (p: string) => p === "/" },
  { href: "/#about", label: "About", match: () => false },
  { href: "/#how-it-works", label: "How It Works", match: () => false },
  { href: "/privacy-policy", label: "Privacy Policy", match: (p: string) => p === "/privacy-policy" },
  { href: "/#contact", label: "Contact Us", match: () => false },
] as const;

function navLinkClass(active: boolean) {
  const base =
    "relative whitespace-nowrap pb-2 text-sm font-medium text-navy transition-colors duration-300 ease-out after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:rounded-full after:bg-accent after:transition-transform after:duration-300 after:ease-out motion-reduce:after:transition-none";
  if (active) {
    return `${base} text-accent after:scale-x-100`;
  }
  return `${base} after:origin-center after:scale-x-0 hover:text-accent hover:after:scale-x-100`;
}

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-white shadow-[0_1px_0_rgba(15,43,92,0.04)]">
      <Container>
        <div className="grid h-16 w-full grid-cols-[1fr_auto] items-center gap-4 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          <Link
            href="/"
            className="justify-self-start text-lg font-bold tracking-tight text-navy transition-transform duration-300 ease-out hover:text-accent motion-safe:hover:scale-[1.03] motion-safe:active:scale-[0.98]"
            onClick={() => setOpen(false)}
          >
            NAVI
          </Link>

          <ul className="col-span-2 hidden items-center gap-5 md:col-span-1 md:col-start-2 md:row-start-1 md:flex md:justify-self-center lg:gap-7">
            {links.map(({ href, label, match }) => {
              const active = match(pathname);
              return (
                <li key={href + label}>
                  <Link href={href} className={navLinkClass(active)}>
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden md:col-start-3 md:row-start-1 md:block md:justify-self-end">
            <Button href="/#contact" variant="getStarted">
              Get Started
            </Button>
          </div>

          <button
            type="button"
            className="col-start-2 row-start-1 justify-self-end rounded-lg p-2 text-navy transition-colors duration-200 hover:bg-icon-tile hover:text-accent md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">Menu</span>
            {open ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        <div
          id="mobile-nav"
          className={`grid border-t border-hairline transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none md:hidden ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="min-h-0 overflow-hidden">
            <ul className="flex flex-col gap-1 py-4">
              {links.map(({ href, label, match }) => {
                const active = match(pathname);
                return (
                  <li key={href + label + "m"}>
                    <Link
                      href={href}
                      className={`block rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ease-out motion-safe:hover:translate-x-1 ${
                        active ? "bg-icon-tile text-navy" : "text-navy hover:bg-icon-tile"
                      }`}
                      onClick={() => setOpen(false)}
                    >
                      {label}
                    </Link>
                  </li>
                );
              })}
              <li className="px-3 pt-2">
                <Button
                  href="/#contact"
                  variant="getStarted"
                  className="w-full !max-w-none justify-center"
                  onClick={() => setOpen(false)}
                >
                  Get Started
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </header>
  );
}
