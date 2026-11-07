"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { nav } from "@/lib/seo";
import { business, telHref, whatsappHref } from "@/content/business";

const ease = [0.22, 1, 0.36, 1] as const;

/** Official Atara Lagoon logo. Both variants are stacked so swapping causes no layout shift. */
export function Logo({ light, className = "" }: { light: boolean; className?: string }) {
  return (
    <span className={`relative block aspect-[640/468] ${className}`}>
      <Image src="/brand/atara-lagoon-logo-light.png" alt="Atara Lagoon, Kalpitiya" fill priority sizes="120px"
        className={`object-contain transition-opacity duration-500 ${light ? "opacity-100" : "opacity-0"}`} />
      <Image src="/brand/atara-lagoon-logo.png" alt="" aria-hidden fill priority sizes="120px"
        className={`object-contain transition-opacity duration-500 ${light ? "opacity-0" : "opacity-100"}`} />
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // A single sentinel observer avoids a scroll listener.
    const s = document.createElement("div");
    s.style.cssText = "position:absolute;top:0;height:80px;width:1px;pointer-events:none";
    document.body.prepend(s);
    const io = new IntersectionObserver(([e]) => setScrolled(!e.isIntersecting));
    io.observe(s);
    return () => {
      io.disconnect();
      s.remove();
    };
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled && !open;

  return (
    <header
      className={`anim-drop fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-500 ${
        solid ? "bg-ivory/92 text-charcoal shadow-[0_1px_0_rgba(37,42,39,0.08)] backdrop-blur-md" : "text-ivory"
      }`}
    >
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-ivory focus:px-4 focus:py-2 focus:text-lagoon">
        Skip to content
      </a>
      <div className={`container-x flex items-center justify-between transition-[height] duration-500 ${solid ? "h-18" : "h-22"}`}>
        <Link href="/" className="relative z-10" aria-label="Atara Lagoon, Kalpitiya: home">
          <Logo light={!solid} className={`transition-[width] duration-500 ${solid ? "w-[74px]" : "w-[88px] md:w-[100px]"}`} />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-5 xl:gap-8">
            {nav.slice(1).map((item) => {
              const active = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`link-underline py-2 text-[0.8rem] font-medium tracking-[0.06em] ${active ? "[background-size:100%_1px]" : ""}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact#enquire"
            className={`hidden min-h-11 items-center px-5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] transition-colors duration-300 sm:inline-flex ${
              solid ? "bg-lagoon text-ivory hover:bg-lagoon-deep" : "border border-ivory/60 hover:bg-ivory hover:text-lagoon"
            }`}
          >
            Book your stay
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="relative z-10 flex h-11 w-11 items-center justify-center lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-3 w-7">
              <span
                className={`absolute left-0 h-px w-full bg-current transition-transform duration-500 ${open ? "top-1.5 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 h-px bg-current transition-all duration-500 ${open ? "top-1.5 w-full -rotate-45" : "top-3 w-4"}`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease }}
            className="fixed inset-0 flex flex-col bg-lagoon-deep px-5 pb-8 pt-28 text-ivory lg:hidden"
          >
            <nav aria-label="Mobile">
              <ul className="space-y-1">
                {nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease, delay: 0.15 + i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 py-2 font-serif text-[2.1rem] leading-tight"
                    >
                      <span className="eyebrow w-6 text-champagne">{String(i + 1).padStart(2, "0")}</span>
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="mt-auto space-y-4 border-t border-ivory/15 pt-6">
              <Link href="/contact#enquire" onClick={() => setOpen(false)} className="flex min-h-12 items-center justify-center bg-ivory text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-lagoon">
                Book your stay
              </Link>
              <div className="flex justify-between text-sm text-ivory/75">
                <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)} className="py-2">WhatsApp</a>
                <a href={telHref} className="py-2">{business.contact.phoneDisplay}</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
