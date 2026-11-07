import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Photo } from "@/components/ui/Photo";
import { MaskReveal, Reveal } from "@/components/ui/Reveal";
import { ButtonLink, Eyebrow, JsonLd, Note } from "@/components/ui/primitives";
import { ContactBand } from "@/components/sections/shared";
import { experiences, operatorLabel } from "@/content/offerings";
import { whatsappHref } from "@/content/business";
import { photos } from "@/content/images";
import { graph, pageMetadata, webPageSchema } from "@/lib/seo";

const title = "Lagoon Experiences & Things to Do in Kalpitiya";
const description =
  "Lagoon boat trips, snorkelling, diving, fishing, windsurfing and cycling around Kalpitiya, with help arranging them from Atara Lagoon.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/experiences" });

export default function ExperiencesPage() {
  return (
    <>
      <JsonLd data={graph(webPageSchema("/experiences", title, description, [{ name: "Experiences", path: "/experiences" }]))} />
      <PageHero
        crumb="Experiences"
        eyebrow="Experiences"
        title="On the lagoon & around Kalpitiya"
        intro="Kalpitiya is a peninsula of lagoon, reef and steady sea breezes. Here's how guests like to spend their days, and how we can help you plan yours."
      />

      <section aria-labelledby="how-title" className="container-x grid gap-10 py-20 md:grid-cols-12 md:py-28">
        <Reveal className="md:col-span-5">
          <Eyebrow className="mb-6 text-lagoon">How it works</Eyebrow>
          <h2 id="how-title" className="text-4xl leading-tight md:text-5xl">We help you plan. Local experts take you out.</h2>
        </Reveal>
        <Reveal className="md:col-span-6 md:col-start-7" delay={0.1}>
          <p className="leading-relaxed text-charcoal/75">
            Most activities in Kalpitiya are run by independent local boat owners, guides and water-sports operators.
            Our team is happy to recommend people and help you book. Each operator sets their own prices, timings,
            equipment and safety arrangements, and we&apos;ll pass those details on before you decide.
          </p>
          <Note className="mt-6">
            Activities depend on the weather and the season. Prices for trips are not included in room rates unless
            we tell you otherwise.
          </Note>
        </Reveal>
      </section>

      <section aria-label="Experiences" className="container-x pb-24 md:pb-36">
        <ol className="grid gap-x-8 gap-y-20 md:grid-cols-2">
          {experiences.map((e, i) => (
            <li key={e.slug} id={e.slug} className={`scroll-mt-28 ${i % 2 ? "md:mt-32" : ""}`}>
              <article aria-labelledby={`${e.slug}-title`}>
                <MaskReveal>
                  <Photo name={e.photo} sizes="(min-width: 768px) 45vw, 100vw" />
                </MaskReveal>
                <Reveal className="mt-7">
                  <p className="eyebrow text-champagne-deep">{String(i + 1).padStart(2, "0")}</p>
                  <h2 id={`${e.slug}-title`} className="mt-3 text-4xl">{e.name}</h2>
                  <p className="mt-2 text-xs font-medium uppercase tracking-[0.14em] text-lagoon">{operatorLabel[e.operator]}</p>
                  <p className="mt-5 max-w-md leading-relaxed text-charcoal/75">{e.description}</p>
                  <div className="mt-6">
                    <ButtonLink href={whatsappHref(`Hello Atara Lagoon, I'm interested in ${e.name.toLowerCase()}. Could you share details?`)} variant="outline">
                      Ask about this
                    </ButtonLink>
                  </div>
                </Reveal>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="around-title" className="bg-lagoon py-20 text-ivory md:py-28">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <Eyebrow className="mb-6 text-champagne">Around Kalpitiya</Eyebrow>
            <h2 id="around-title" className="text-4xl leading-tight md:text-5xl">Things to do nearby</h2>
          </Reveal>
          <Reveal className="space-y-6 leading-relaxed text-ivory/80 md:col-span-6 md:col-start-7" delay={0.1}>
            <p>
              Kalpitiya sits on a narrow strip of land between the Puttalam lagoon and the Indian Ocean on Sri
              Lanka&apos;s north-west coast. The lagoon is calm and shallow. The ocean side is known for its reefs, and
              the steady winds make the area popular for windsurfing and other wind sports.
            </p>
            <p>
              Between trips, the peninsula is good for unhurried exploring by bicycle, past fishing villages and
              coconut groves. Wilpattu National Park, Sri Lanka&apos;s largest, is within driving distance for
              wildlife safaris, and Kalpitiya town has a historic Dutch-era church. Ask our team about what&apos;s
              running during your stay.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              {(["wilpattu", "church"] as const).map((k) => (
                <figure key={k}>
                  <div className="relative aspect-[4/3]">
                    <Photo name={k} fill sizes="(min-width: 768px) 25vw, 50vw" />
                  </div>
                  <figcaption className="mt-2 text-xs text-ivory/70">{photos[k].caption}</figcaption>
                </figure>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
