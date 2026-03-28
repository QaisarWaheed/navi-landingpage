"use client";

import { Children, type ReactNode } from "react";

type StaggerInProps = {
  children: ReactNode;
  className?: string;
  /** Delay between each child (ms). */
  staggerMs?: number;
};

/** Mount stagger for hero blocks; respects prefers-reduced-motion. */
export function StaggerIn({ children, className = "", staggerMs = 90 }: StaggerInProps) {
  return (
    <div className={className}>
      {Children.map(children, (child, i) => (
        <div
          key={i}
          className="motion-safe:animate-fade-in-up motion-reduce:opacity-100 motion-reduce:[animation:none]"
          style={{ animationDelay: `${i * staggerMs}ms` }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}
