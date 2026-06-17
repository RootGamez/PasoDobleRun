"use client";

import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  className?: string;
};

const base =
  "inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full px-7 py-3 font-display text-sm font-semibold tracking-wide uppercase transition-all duration-300 active:scale-95";

const variants = {
  primary: "bg-sky text-ink hover:bg-sky-bright hover:shadow-glow",
  ghost: "border border-line text-text hover:border-sky hover:text-sky-bright",
};

export function Button({ href, onClick, children, variant = "primary", external, className = "" }: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${className}`;

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={cls}>
        {children}
      </button>
    );
  }
  if (external && href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href ?? "#"} className={cls}>
      {children}
    </Link>
  );
}
