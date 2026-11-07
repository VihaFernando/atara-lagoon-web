import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

type Variant = "solid" | "outline" | "light" | "ghost" | "gold";

const variants: Record<Variant, string> = {
  gold: "bg-champagne-light text-charcoal hover:bg-sand",
  solid: "bg-lagoon text-ivory hover:bg-lagoon-deep",
  outline: "border border-charcoal/30 text-charcoal hover:border-lagoon hover:text-lagoon",
  light: "bg-ivory text-lagoon hover:bg-sand",
  ghost: "border border-ivory/50 text-ivory hover:bg-ivory hover:text-lagoon",
};

export function ButtonLink({
  href,
  children,
  variant = "solid",
  external,
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
}) {
  const cls = `group inline-flex min-h-12 items-center justify-center gap-2 px-6 text-[0.78rem] font-semibold uppercase tracking-[0.18em] transition-colors duration-300 ${variants[variant]} ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      <ArrowUpRight aria-hidden className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </>
  );
  if (external || /^(https?:|tel:|mailto:)/.test(href)) {
    const isWeb = href.startsWith("http");
    return (
      <a href={href} className={cls} {...(isWeb ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`eyebrow flex items-center gap-3 ${className}`}>
      <span aria-hidden className="inline-block h-px w-8 bg-current opacity-60" />
      {children}
    </p>
  );
}

/** Small honest note about information that still needs confirming. */
export function Note({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`border-l border-champagne pl-4 text-sm leading-relaxed text-charcoal/70 ${className}`}>{children}</p>
  );
}

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output with "<" escaped prevents script-breaking content.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
