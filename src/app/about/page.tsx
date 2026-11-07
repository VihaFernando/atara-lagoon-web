import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Photo } from "@/components/ui/Photo";
import { MaskReveal, Reveal } from "@/components/ui/Reveal";
import { Eyebrow, JsonLd } from "@/components/ui/primitives";
import { ContactBand, LocationSection } from "@/components/sections/shared";
import { business } from "@/content/business";
import { graph, pageMetadata, webPageSchema } from "@/lib/seo";

const title = "About Us";
const description =
  "About Atara Lagoon, a small lagoon-side resort in Kalpitiya, Sri Lanka, known for friendly staff, clean rooms, a garden pool and easy access to the lagoon.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/about" });

const themes = [
  ["Warm, helpful people", "Guests mention the team more than anything else. They are friendly, welcoming and quick to help with trips and transport."],
  ["Clean, comfortable rooms", "Reviews often highlight how clean and comfortable the rooms are."],
  ["The pool & garden", "A green, quiet setting that guests come back to after a day out on the water."],
  ["Breakfast & seafood", "Guests regularly praise the breakfasts and the seafood dishes."],
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={graph(webPageSchema("/about", title, description, [{ name: "About", path: "/about" }]))} />
      <PageHero
        crumb="About"
        eyebrow="About us"
        title="A small place on a big lagoon"
        intro="Atara Lagoon is an independent, easy-going resort in Kalpitiya, Sri Lanka, built around a garden, a pool and the lagoon just beyond."
      />

      <section aria-labelledby="story-title" className="container-x grid gap-12 py-20 md:grid-cols-12 md:py-32">
        <Reveal className="md:col-span-6">
          <Eyebrow className="mb-6 text-lagoon">The place</Eyebrow>
          <h2 id="story-title" className="text-4xl leading-tight md:text-5xl">Unhurried, friendly and close to the water.</h2>
          <div className="mt-8 space-y-5 leading-relaxed text-charcoal/75">
            <p>
              {business.description} It is not a large international hotel. It is a small, personal place where the
              team gets to know you and you can spend the afternoon by the pool.
            </p>
            <p>
              Kalpitiya is a fishing town on a peninsula on Sri Lanka&apos;s north-west coast. It&apos;s a base for
              lagoon trips, reef snorkelling and wind sports, and a calmer alternative to the busier southern beaches.
            </p>
          </div>
        </Reveal>
        <MaskReveal className="md:col-span-5 md:col-start-8">
          <Photo name="veranda" sizes="(min-width: 768px) 40vw, 100vw" />
        </MaskReveal>
      </section>

      <section aria-labelledby="themes-title" className="bg-sand/60 py-20 md:py-28">
        <div className="container-x">
          <Reveal>
            <Eyebrow className="mb-6 text-lagoon">What guests say</Eyebrow>
            <h2 id="themes-title" className="max-w-2xl text-4xl leading-tight md:text-5xl">What guests mention most</h2>
          </Reveal>
          <ul className="mt-14 grid gap-px bg-charcoal/15 sm:grid-cols-2 lg:grid-cols-4">
            {themes.map(([t, d], i) => (
              <Reveal as="li" key={t} delay={i * 0.06} className="bg-sand/95 p-7">
                <p className="eyebrow text-champagne-deep">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 text-2xl">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-charcoal/70">{d}</p>
              </Reveal>
            ))}
          </ul>
          <p className="mt-10 text-sm text-charcoal/75">
            Rated{" "}
            {business.ratings.items.map((r, i) => (
              <span key={r.platform}>
                {i > 0 && " and "}
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="link-underline text-lagoon">
                  {r.score} on {r.platform} ({r.count} reviews)
                </a>
              </span>
            ))}
            , as of {business.ratings.asOf}. Ratings are set by those platforms and change over time.
          </p>
        </div>
      </section>

      <section aria-labelledby="facilities-title" className="container-x grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <Reveal className="md:col-span-4">
          <Eyebrow className="mb-6 text-lagoon">Facilities</Eyebrow>
          <h2 id="facilities-title" className="text-4xl leading-tight">At the property</h2>
        </Reveal>
        <Reveal className="grid gap-10 sm:grid-cols-2 md:col-span-7 md:col-start-6" delay={0.1}>
          <div>
            <h3 className="eyebrow mb-4 font-sans text-charcoal/75">On site</h3>
            <ul className="space-y-3 font-serif text-xl">
              {business.facilitiesVerified.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </div>
          <div>
            <h3 className="eyebrow mb-4 font-sans text-charcoal/75">On request (please ask)</h3>
            <ul className="space-y-3 text-charcoal/75">
              {business.facilitiesThirdParty.map((f) => <li key={f}>{f}</li>)}
            </ul>
          </div>
        </Reveal>
      </section>

      <LocationSection />
      <ContactBand />
    </>
  );
}
