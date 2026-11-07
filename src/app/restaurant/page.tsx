import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Photo } from "@/components/ui/Photo";
import { MaskReveal, Reveal } from "@/components/ui/Reveal";
import { ButtonLink, Eyebrow, JsonLd, Note } from "@/components/ui/primitives";
import { MenuBrowser } from "@/components/sections/MenuBrowser";
import { ContactBand } from "@/components/sections/shared";
import { whatsappHref } from "@/content/business";
import { photos } from "@/content/images";
import { graph, pageMetadata, webPageSchema } from "@/lib/seo";

const title = "Restaurant & Dining";
const description =
  "The on-site restaurant at Atara Lagoon, Kalpitiya: breakfast, appetizers, sandwiches, soups, salads, Sri Lankan omelettes and seafood, plus room service.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/restaurant" });

export default function RestaurantPage() {
  return (
    <>
      <JsonLd data={graph(webPageSchema("/restaurant", title, description, [{ name: "Restaurant", path: "/restaurant" }]))} />
      <PageHero
        crumb="Restaurant"
        eyebrow="Dining"
        title="Restaurant & dining"
        intro="An easy-going kitchen beside the pool, serving everything from breakfast to dinner. Guests especially love the breakfasts and the seafood."
      />

      <section aria-labelledby="kitchen-title" className="container-x grid gap-12 py-20 md:grid-cols-12 md:items-center md:py-32">
        <Reveal className="md:col-span-5">
          <Eyebrow className="mb-6 text-lagoon">The kitchen</Eyebrow>
          <h2 id="kitchen-title" className="text-4xl leading-tight md:text-5xl">Fresh, simple and close to the water.</h2>
          <p className="mt-6 leading-relaxed text-charcoal/75">
            Start the day with breakfast by the pool. Later, there are light plates and sandwiches for lunch, and
            soups and salads, including a mixed seafood salad, for the evening. Room service is available, and packed
            lunches can be arranged for days out on the lagoon.
          </p>
        </Reveal>
        <div className="grid aspect-[4/5] grid-cols-2 grid-rows-2 gap-3 sm:aspect-[5/4] md:col-span-6 md:col-start-7 md:gap-4">
          <MaskReveal className="relative row-span-2">
            <div className="absolute inset-0">
              <Photo name="seafood" fill sizes="(min-width: 768px) 25vw, 50vw" />
            </div>
          </MaskReveal>
          <MaskReveal delay={0.1} className="relative">
            <div className="absolute inset-0">
              <Photo name="breakfast" fill sizes="(min-width: 768px) 25vw, 50vw" />
            </div>
          </MaskReveal>
          <MaskReveal delay={0.2} className="relative">
            <div className="absolute inset-0">
              <Photo name="restaurant" fill sizes="(min-width: 768px) 25vw, 50vw" />
            </div>
          </MaskReveal>
        </div>
      </section>

      <section aria-label="From the kitchen" className="container-x pb-20 md:pb-28">
        <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {(["sriLankanBreakfast", "grilledFish", "salads", "fruit"] as const).map((k, i) => (
            <li key={k} className={i % 2 ? "md:mt-12" : ""}>
              <MaskReveal delay={i * 0.06}>
                <div className="relative aspect-[4/5]">
                  <Photo name={k} fill sizes="(min-width: 768px) 24vw, 50vw" />
                </div>
                <p className="mt-3 text-sm text-charcoal/75">{photos[k].caption}</p>
              </MaskReveal>
            </li>
          ))}
        </ul>
      </section>

      <section id="menu" aria-labelledby="menu-title" className="bg-sand/60 py-20 md:py-32">
        <div className="container-x">
          <Reveal className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <Eyebrow className="mb-6 text-lagoon">Menu</Eyebrow>
              <h2 id="menu-title" className="text-4xl leading-tight md:text-6xl">From the menu</h2>
            </div>
            <Note className="max-w-sm">Dishes and prices can change. Ask our team for today&apos;s menu, prices and any dietary needs.</Note>
          </Reveal>
          <MenuBrowser />
          <div className="mt-14 flex flex-wrap gap-3">
            <ButtonLink href={whatsappHref("Hello Atara Lagoon, could you share today's menu and prices?")}>Ask for today&apos;s menu</ButtonLink>
            <ButtonLink href="/contact" variant="outline">Contact the restaurant</ButtonLink>
          </div>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
