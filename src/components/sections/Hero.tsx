"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { BedDouble, Laptop, Play, UtensilsCrossed, Waves } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { ButtonLink } from "@/components/ui/primitives";

const features = [
  { icon: BedDouble, label: ["Comfortable", "Rooms"], href: "/accommodation" },
  { icon: Waves, label: ["Swimming", "Pool"], href: "/#intro" },
  { icon: UtensilsCrossed, label: ["Restaurant", "& Dining"], href: "/restaurant" },
  { icon: Laptop, label: ["Coworking", "Friendly"], href: "/coworking" },
];

const d = (s: number) => ({ "--d": `${s}s` }) as React.CSSProperties;

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["0%", "12%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], reduce ? [1, 1] : [1.04, 1.12]);

  return (
    <section ref={ref} aria-labelledby="hero-title" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-lagoon-deep text-ivory">
      <motion.div style={{ y: imgY, scale: imgScale }} className="anim-fade absolute inset-0">
        <Photo name="roomCabana" fill priority sizes="100vw" showCaption={false} className="[&_img]:object-[65%_center]" />
      </motion.div>
      {/* Readability: deep lagoon wash from the left and the bottom */}
      {/* Slim shade behind the header only, so the nav stays legible over bright sky */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-36 bg-[linear-gradient(180deg,rgba(15,53,50,0.55)_0%,transparent_100%)]" />
      <div aria-hidden className="absolute inset-0 bg-lagoon-deep/70 md:hidden" />
      <div aria-hidden className="absolute inset-0 hidden md:block bg-[linear-gradient(90deg,rgba(15,53,50,0.9)_0%,rgba(15,53,50,0.72)_30%,rgba(15,53,50,0.25)_52%,transparent_68%)]" />

      <div className="container-x relative flex flex-1 flex-col justify-center pb-20 pt-32 md:pt-36">
        <div className="max-w-2xl">
          <p className="anim-rise eyebrow flex items-center gap-4 text-ivory/90" style={d(0.3)}>
            Atara Lagoon · Kalpitiya, Sri Lanka
            <span aria-hidden className="hidden h-px w-20 bg-champagne-light sm:block" />
          </p>

          <h1 id="hero-title" className="mt-6 text-[3rem] leading-[1.02] sm:text-7xl lg:text-[5.4rem]">
            <span className="block overflow-hidden pb-[0.06em]">
              <span className="anim-line" style={d(0.4)}>Where the Lagoon</span>
            </span>
            <span className="block overflow-hidden pb-[0.18em]">
              <span className="anim-line italic text-champagne-light" style={d(0.52)}>
                <span className="relative inline-block">
                Sets the Pace.
                <svg aria-hidden viewBox="0 0 300 18" preserveAspectRatio="none" className="absolute -bottom-[0.08em] right-0 h-[0.2em] w-[48%] text-champagne-light">
                  <path d="M2 13 C 80 3, 200 2, 298 9" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                </svg>
                </span>
              </span>
            </span>
          </h1>

          <p className="anim-rise mt-6 max-w-md text-base leading-relaxed text-ivory/85 md:text-[1.05rem]" style={d(0.75)}>
            A relaxed resort in Kalpitiya, with comfortable stays, open green spaces, a refreshing pool and great food.
            It&apos;s perfect for a getaway, a workation or a longer stay.
          </p>

          <div className="anim-rise mt-9 flex flex-col gap-3 sm:flex-row" style={d(0.9)}>
            <ButtonLink href="/accommodation" variant="gold">Explore accommodation</ButtonLink>
            <ButtonLink href="/contact#enquire" variant="ghost">Book your stay</ButtonLink>
          </div>
        </div>

        <div className="anim-rise mt-12 flex items-center justify-between gap-6 md:mt-14" style={d(1.1)}>
          <ul className="grid flex-1 grid-cols-4 sm:flex sm:flex-none">
            {features.map(({ icon: Icon, label, href }, i) => (
              <li key={href} className={`${i ? "border-l border-ivory/25" : ""} px-2 sm:px-8 ${i === 0 ? "sm:pl-0" : ""}`}>
                <Link href={href} className="group flex flex-col items-center gap-3 text-center text-[0.72rem] leading-snug text-ivory/90 sm:text-sm">
                  <Icon aria-hidden className="h-6 w-6 text-ivory transition-transform duration-500 group-hover:-translate-y-0.5" strokeWidth={1.2} />
                  <span>
                    {label[0]}
                    <br />
                    {label[1]}
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Link href="/gallery" className="group ml-auto hidden items-center gap-4 rounded-full bg-lagoon-deep/60 py-2 pl-2 pr-6 backdrop-blur-md transition-colors duration-500 hover:bg-lagoon-deep/80 md:flex">
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-ivory/70 transition-colors duration-500 group-hover:border-champagne-light group-hover:bg-champagne-light">
              <Play aria-hidden className="ml-0.5 h-5 w-5 fill-ivory text-ivory transition-colors group-hover:fill-charcoal group-hover:text-charcoal" />
            </span>
            <span className="text-base leading-tight">
              Take a
              <br />
              Quick Tour
            </span>
          </Link>
        </div>
      </div>

      <a
        href="#intro"
        aria-label="Scroll to introduction"
        style={d(1.6)}
        className="anim-fade absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex"
      >
        <span className="eyebrow !text-[0.6rem] text-ivory/80">Scroll</span>
        <span className="relative h-9 w-px overflow-hidden bg-ivory/25">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2.2s_ease-in-out_infinite] bg-ivory motion-reduce:animate-none" />
        </span>
      </a>
    </section>
  );
}
