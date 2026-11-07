import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Photo } from "@/components/ui/Photo";
import { MaskReveal, Parallax, Reveal } from "@/components/ui/Reveal";
import { ButtonLink, Eyebrow } from "@/components/ui/primitives";
import { business } from "@/content/business";
import { experiences, menu, operatorLabel, rooms } from "@/content/offerings";
import { galleryOrder } from "@/content/images";

/* ------------------------------------------------------------- Intro */

export function Intro() {
  return (
    <section id="intro" aria-labelledby="intro-title" className="container-x grid gap-14 py-24 md:grid-cols-12 md:py-36">
      <div className="md:col-span-7">
        <Reveal>
          <Eyebrow className="mb-8 text-lagoon">Welcome to Atara Lagoon</Eyebrow>
          <h2 id="intro-title" className="text-4xl leading-[1.06] md:text-6xl">
            A small, warm resort on the quiet side of the <em className="text-lagoon">Kalpitiya</em> peninsula.
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          <MaskReveal>
            <Photo name="garden" sizes="(min-width: 768px) 28vw, 100vw" />
          </MaskReveal>
          <MaskReveal delay={0.15} className="sm:mt-24">
            <Photo name="poolPavilion" sizes="(min-width: 768px) 28vw, 100vw" />
          </MaskReveal>
        </div>
      </div>
      <Reveal className="md:col-span-4 md:col-start-9 md:pt-40" delay={0.1}>
        <p className="text-lg leading-relaxed text-charcoal/85">
          Atara Lagoon sits on Anawasala Road in Kalpitiya, a fishing town on the lagoon in Sri Lanka&apos;s Puttalam
          District. It is a small place built around a swimming pool and a shaded tropical garden, with a restaurant
          that cooks to order.
        </p>
        <p className="mt-5 leading-relaxed text-charcoal/70">
          Guests talk most about the people. The team is friendly and helpful, the rooms are kept clean, and they will
          gladly help you set up a boat trip on the lagoon or a ride to the next stop on your journey.
        </p>
        <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-charcoal/15 pt-8 text-sm">
          {[
            ["Setting", "Lagoon-side, Kalpitiya"],
            ["Pool", "Outdoor, in the garden"],
            ["Dining", "On-site restaurant"],
            ["Check-out", "12:00 PM"],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="eyebrow !text-[0.6rem] text-charcoal/70">{k}</dt>
              <dd className="mt-1 font-serif text-xl">{v}</dd>
            </div>
          ))}
        </dl>
        <Link href="/about" className="link-underline mt-10 inline-flex items-center gap-2 text-sm font-semibold text-lagoon">
          More about Atara Lagoon <ArrowUpRight aria-hidden className="h-4 w-4" />
        </Link>
      </Reveal>
    </section>
  );
}

/* ------------------------------------------------------------- Rooms */

export function RoomsPreview() {
  return (
    <section aria-labelledby="rooms-title" className="bg-sand/60 py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <Reveal>
            <Eyebrow className="mb-6 text-lagoon">Accommodation</Eyebrow>
            <h2 id="rooms-title" className="max-w-xl text-4xl leading-[1.06] md:text-6xl">Garden rooms, a short walk from the pool.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <ButtonLink href="/accommodation" variant="outline">View all rooms</ButtonLink>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {rooms.map((r, i) => (
            <Reveal as="li" key={r.slug} delay={i * 0.08} className={i % 2 === 1 ? "lg:mt-16" : ""}>
              <Link href={`/accommodation#${r.slug}`} className="group block">
                <div className="relative aspect-[4/5]">
                  <Photo name={r.photo} fill zoom sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw" />
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h3 className="text-2xl">{r.name}</h3>
                  <span className="eyebrow !text-[0.6rem] text-charcoal/70">0{i + 1}</span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{r.summary}</p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Pool */

export function PoolFeature() {
  return (
    <section aria-labelledby="pool-title" className="relative">
      <Parallax className="h-[78svh] min-h-[480px] w-full" distance={70}>
        <Photo name="poolCabana" fill sizes="100vw" />
      </Parallax>
      <div className="container-x relative -mt-40 md:-mt-56">
        <Reveal className="ml-auto max-w-xl bg-ivory p-8 md:p-14">
          <Eyebrow className="mb-6 text-lagoon">Pool &amp; garden</Eyebrow>
          <h2 id="pool-title" className="text-4xl leading-[1.06] md:text-5xl">Long afternoons under the palms.</h2>
          <p className="mt-6 leading-relaxed text-charcoal/75">
            The outdoor pool is the centre of Atara Lagoon. Around it you&apos;ll find sun loungers, a shaded terrace
            and a tropical garden. It&apos;s the spot guests mention most, whether for a swim after a morning on the
            water or a slow evening before dinner.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-3 text-sm text-charcoal/80">
            {["Outdoor swimming pool", "Sun loungers", "Garden & terrace", "Outdoor seating"].map((f) => (
              <li key={f} className="flex items-center gap-3">
                <span aria-hidden className="h-px w-4 bg-champagne" />
                {f}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Dining */

export function DiningPreview() {
  return (
    <section aria-labelledby="dining-title" className="container-x grid gap-14 py-24 md:grid-cols-12 md:items-center md:py-36">
      <MaskReveal className="md:col-span-5">
        <Photo name="restaurant" sizes="(min-width: 768px) 40vw, 100vw" />
      </MaskReveal>
      <div className="md:col-span-6 md:col-start-7">
        <Reveal>
          <Eyebrow className="mb-6 text-lagoon">Restaurant</Eyebrow>
          <h2 id="dining-title" className="text-4xl leading-[1.06] md:text-6xl">
            Breakfast by the pool. <em className="text-lagoon">Seafood</em> after dark.
          </h2>
          <p className="mt-6 max-w-lg leading-relaxed text-charcoal/75">
            The kitchen keeps things simple and fresh. Expect home-made chips and kebabs, soups and salads, sandwiches,
            and Sri Lankan spiced omelettes. Guests return again and again for the breakfasts and the lagoon seafood.
            Room service is available too.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <ol className="mt-10 border-t border-charcoal/15">
            {menu.map((c, i) => (
              <li key={c.id} className="flex items-baseline justify-between border-b border-charcoal/15 py-4">
                <span className="font-serif text-2xl">{c.name}</span>
                <span className="eyebrow !text-[0.6rem] text-charcoal/70">
                  {String(i + 1).padStart(2, "0")} · {c.items.length} dishes
                </span>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <ButtonLink href="/restaurant">See the menu</ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------- Experiences */

export function ExperiencesPreview() {
  return (
    <section aria-labelledby="exp-title" className="bg-lagoon py-24 text-ivory md:py-36">
      <div className="container-x grid gap-14 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <Eyebrow className="mb-6 text-champagne">Experiences</Eyebrow>
          <h2 id="exp-title" className="text-4xl leading-[1.06] md:text-5xl">Out on the water, then back for a swim.</h2>
          <p className="mt-6 leading-relaxed text-ivory/75">
            Kalpitiya is known for its lagoon, reefs and steady winds. Some trips leave from right by the hotel.
            Others are run by independent operators we can introduce you to.
          </p>
          <div className="mt-10">
            <ButtonLink href="/experiences" variant="ghost">All experiences</ButtonLink>
          </div>
        </Reveal>
        <ol className="md:col-span-7 md:col-start-6">
          {experiences.map((e, i) => (
            <Reveal as="li" key={e.slug} delay={i * 0.06}>
              <Link
                href={`/experiences#${e.slug}`}
                className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 border-b border-ivory/15 py-6 transition-colors hover:border-champagne"
              >
                <span className="eyebrow text-champagne">{String(i + 1).padStart(2, "0")}</span>
                <span>
                  <span className="block font-serif text-3xl transition-transform duration-500 group-hover:translate-x-2 md:text-4xl">{e.name}</span>
                  <span className="mt-1 block text-xs text-ivory/70">{operatorLabel[e.operator]}</span>
                </span>
                <ArrowUpRight aria-hidden className="h-5 w-5 text-ivory/40 transition-colors group-hover:text-champagne" />
              </Link>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- Gallery */

export function GalleryPreview() {
  const picks = galleryOrder.slice(0, 5);
  const layout = [
    "col-span-2 row-span-2 md:col-span-3",
    "col-span-1 md:col-span-2",
    "col-span-1 md:col-span-1 md:row-span-2",
    "col-span-1 md:col-span-2",
    "col-span-1 md:col-span-3 md:col-start-4",
  ];
  return (
    <section aria-labelledby="gallery-title" className="container-x py-24 md:py-36">
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <Reveal>
          <Eyebrow className="mb-6 text-lagoon">Gallery</Eyebrow>
          <h2 id="gallery-title" className="text-4xl leading-[1.06] md:text-6xl">A look around.</h2>
        </Reveal>
        <Link href="/gallery" className="link-underline inline-flex items-center gap-2 text-sm font-semibold text-lagoon">
          Open the full gallery <ArrowUpRight aria-hidden className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid auto-rows-[160px] grid-cols-2 gap-3 md:auto-rows-[220px] md:grid-cols-6 md:gap-4">
        {picks.map((k, i) => (
          <MaskReveal key={k} delay={i * 0.06} className={layout[i]}>
            <Link href="/gallery" className="group block h-full">
              <Photo name={k} fill zoom sizes="(min-width: 768px) 40vw, 50vw" />
            </Link>
          </MaskReveal>
        ))}
      </div>
    </section>
  );
}

/* -------------------------------------------------------- Reputation */

export function Reputation() {
  const r = business.ratings;
  return (
    <section aria-labelledby="rep-title" className="border-y border-charcoal/10 bg-ivory">
      <div className="container-x grid gap-10 py-16 md:grid-cols-12 md:items-center">
        <Reveal className="md:col-span-5">
          <h2 id="rep-title" className="font-serif text-3xl leading-tight md:text-4xl">
            &ldquo;Friendly staff, clean rooms, a lovely pool&rdquo;
          </h2>
          <p className="mt-3 text-sm text-charcoal/75">The themes guests mention most often in their reviews.</p>
        </Reveal>
        <div className="grid grid-cols-2 gap-6 md:col-span-6 md:col-start-7">
          {r.items.map((it) => (
            <a key={it.platform} href={it.url} target="_blank" rel="noopener noreferrer" className="group border-l border-champagne pl-5">
              <span className="block font-serif text-5xl text-lagoon">{it.score.split(" ")[0]}</span>
              <span className="mt-1 block text-sm text-charcoal/70">
                {it.platform} · {it.count} reviews
              </span>
              <span className="link-underline mt-1 inline-block text-xs text-charcoal/70">as of {r.asOf}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
