import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { MaskReveal, Reveal } from "@/components/ui/Reveal";
import { ButtonLink, Eyebrow } from "@/components/ui/primitives";
import { coworking } from "@/content/offerings";

/** Concentric signal rings: the coworking section's own motif (decorative). */
export function SignalRings({ className = "", color = "rgba(185,154,105,0.22)" }: { className?: string; color?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 400 400" className={`pointer-events-none absolute ${className}`}>
      {[60, 110, 160, 210, 260].map((r) => (
        <circle key={r} cx="200" cy="200" r={r} fill="none" stroke={color} strokeWidth="1" vectorEffect="non-scaling-stroke" />
      ))}
      <circle cx="200" cy="200" r="4" fill={color} />
    </svg>
  );
}

export const workationMessage =
  "Hello Atara Lagoon, I'm a remote worker interested in a working stay. My dates are: … Could you share availability and rates?";

/** Connectivity facts as large editorial numerals. */
export function Connectivity() {
  const facts = [
    { big: coworking.speedAdvertised, label: "Advertised internet speed" },
    { big: String(coworking.wifiNetworks), label: "Separate Wi-Fi networks, so there's a fallback if one drops" },
    { big: "Resort-wide", label: "Wi-Fi coverage, from the garden and dining area to your room" },
  ];
  return (
    <dl className="grid gap-px bg-ivory/12 sm:grid-cols-3">
      {facts.map((f, i) => (
        <Reveal key={f.label} delay={i * 0.08} className="flex flex-col bg-charcoal p-7 md:p-9">
          <dt className="order-2 mt-3 block text-sm leading-relaxed text-ivory/75">{f.label}</dt>
          <dd className="font-serif text-5xl leading-none text-ivory md:text-6xl">{f.big}</dd>
        </Reveal>
      ))}
    </dl>
  );
}

/** Compact teaser for the home page. */
export function CoworkingTeaser() {
  return (
    <section aria-labelledby="cw-teaser-title" className="relative overflow-hidden bg-charcoal py-24 text-ivory md:py-32">
      <SignalRings className="-right-40 -top-40 h-[640px] w-[640px]" />
      <div className="container-x relative grid gap-12 md:grid-cols-12 md:items-center">
        <MaskReveal className="md:col-span-5">
          <Photo name="coworking" sizes="(min-width: 768px) 40vw, 100vw" />
        </MaskReveal>
        <Reveal className="md:col-span-6 md:col-start-7">
          <Eyebrow className="mb-6 text-champagne">Remote work</Eyebrow>
          <h2 id="cw-teaser-title" className="text-4xl leading-[1.06] md:text-6xl">
            Work remotely. <em className="text-sand">Stay close to nature.</em>
          </h2>
          <p className="mt-6 max-w-lg leading-relaxed text-ivory/75">
            Wi-Fi across the whole resort, advertised at {coworking.speedAdvertised} over three separate networks. Work
            from the front office, the dining area or a desk in your room, then finish the day by the pool or on the
            lagoon.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <ButtonLink href="/coworking" variant="light">Remote working at Atara</ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function LocationsList() {
  return (
    <ol className="grid gap-x-8 gap-y-16 md:grid-cols-3">
      {coworking.locations.map((l, i) => (
        <li key={l.name} className={i === 1 ? "md:mt-20" : i === 2 ? "md:mt-40" : ""}>
          <MaskReveal delay={i * 0.08}>
            <div className="relative aspect-[4/5]">
              <Photo name={l.photo} fill sizes="(min-width: 768px) 30vw, 100vw" />
            </div>
          </MaskReveal>
          <Reveal className="mt-6">
            <p className="eyebrow text-champagne-deep">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-3 text-3xl">{l.name}</h3>
            <p className="mt-3 leading-relaxed text-charcoal/75">{l.text}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

export function BetweenCalls() {
  const links = [
    { href: "/experiences#canoeing-windsurfing", label: "Kitesurfing", photo: "kitesurf" as const },
    { href: "/experiences#lagoon-boat-trip", label: "Lagoon boat trips", photo: "boatTour" as const },
    { href: "/accommodation", label: "The pool", photo: "poolMain" as const },
  ];
  return (
    <ul className="grid gap-4 sm:grid-cols-3">
      {links.map((l, i) => (
        <Reveal as="li" key={l.href} delay={i * 0.06}>
          <Link href={l.href} className="group block">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Photo name={l.photo} fill zoom sizes="(min-width: 640px) 30vw, 100vw" />
            </div>
            <span className="mt-4 flex items-center justify-between font-serif text-2xl">
              {l.label}
              <ArrowUpRight aria-hidden className="h-5 w-5 text-charcoal/40 transition-colors group-hover:text-lagoon" />
            </span>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
