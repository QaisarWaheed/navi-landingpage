import Link from "next/link";
import type { ReactNode, ComponentPropsWithoutRef } from "react";

function isExternalHref(href: string) {
  return /^https?:\/\//i.test(href.trim());
}

type BaseProps = {
  children: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "getStarted";
};

type ButtonAsButton = BaseProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "children"> & {
    href?: never;
  };

type ButtonAsLink = BaseProps &
  Omit<ComponentPropsWithoutRef<typeof Link>, "className" | "children"> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const variants = {
  primary:
    "bg-accent text-white shadow-sm hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-lg motion-safe:active:translate-y-0 motion-safe:active:shadow-sm",
  secondary:
    "border border-border bg-surface text-foreground shadow-sm hover:bg-accent hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md motion-safe:active:translate-y-0",
  outline:
    "border-2 border-accent bg-white text-foreground shadow-sm hover:bg-accent hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md motion-safe:active:translate-y-0",
  ghost:
    "text-accent hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-safe:hover:translate-x-0.5",
  /** Pill CTA: deep navy fill, white label (matches header reference). */
  getStarted:
    "!rounded-full !border-0 bg-navy !px-[25px] !py-2.5 text-sm font-medium text-white shadow-none transition-colors duration-200 hover:bg-[#0c264d] active:bg-[#0a1f40] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy motion-safe:hover:-translate-y-px motion-safe:active:translate-y-0",
};

const base =
  "inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-300 ease-out disabled:pointer-events-none disabled:opacity-50 disabled:motion-safe:transform-none";

export function Button(props: ButtonProps) {
  const { children, className = "", variant = "primary" } = props;
  const styles = `${base} ${variants[variant]} ${className}`;

  if ("href" in props && props.href) {
    const { href, ...rest } = props;
    if (isExternalHref(href)) {
      const {
        prefetch: _prefetch,
        replace: _replace,
        scroll: _scroll,
        shallow: _shallow,
        locale: _locale,
        ...anchorRest
      } = rest as typeof rest & Record<string, unknown>;
      return (
        <a href={href} className={styles} {...(anchorRest as ComponentPropsWithoutRef<"a">)}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={styles} {...rest}>
        {children}
      </Link>
    );
  }

  const { type = "button", ...rest } = props as ButtonAsButton;
  return (
    <button type={type} className={styles} {...rest}>
      {children}
    </button>
  );
}
