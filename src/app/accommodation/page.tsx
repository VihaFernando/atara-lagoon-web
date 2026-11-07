import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageHero } from "@/components/layout/PageHero";
import { Photo } from "@/components/ui/Photo";
import { MaskReveal, Reveal } from "@/components/ui/Reveal";
import { ButtonLink, Eyebrow, JsonLd, Note } from "@/components/ui/primitives";
import { ContactBand } from "@/components/sections/shared";
import { rooms, sharedRoomFeatures } from "@/content/offerings";
import { business, whatsappHref } from "@/content/business";
import { graph, pageMetadata, webPageSchema } from "@/lib/seo";

const title = "Accommodation in Kalpitiya";
const description =
  "Rooms at Atara Lagoon, Kalpitiya: standard and deluxe doubles, family quadruple rooms and garden cabanas beside an outdoor pool. Enquire for current availability and rates.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/accommodation" });

const policies: [string, string][] = [
  ["Check-out", "12:00 PM"],
  ["Check-in", "Early afternoon. Please confirm the exact time with us."],
  ["Rates", "Sent with your enquiry, based on your dates, room and number of guests."],
  ["Children, extra beds & pets", "Ask us. We'll confirm what's possible for your stay."],
  ["Payment & cancellation", "Confirmed with your booking. If you book through a third-party site, its own terms apply."],
];

export default function AccommodationPage() {
  const extras = business.facilitiesVerified.filter((f) => f !== "Free Wi-Fi");
  return (
    <>
      <JsonLd data={graph(webPageSchema("/accommodation", title, description, [{ name: "Accommodation", path: "/accommodation" }]))} />
      <PageHero
        crumb="Accommodation"
        eyebrow="Stay"
        title="Accommodation in Kalpitiya"
        intro="Simple, comfortable rooms set around the garden and pool, with something for couples, families and small groups. Tell us your dates and we will match you with the right room."
      />

      <section aria-label="Room categories" className="container-x py-20 md:py-32">
        <div className="space-y-24 md:space-y-36">
          {rooms.map((r, i) => (
            <article key={r.slug} id={r.slug} aria-labelledby={`${r.slug}-title`} className="grid scroll-mt-28 gap-10 md:grid-cols-12 md:items-center">
              <MaskReveal className={`md:col-span-7 ${i % 2 ? "md:order-2 md:col-start-6" : ""}`}>
                <Photo name={r.photo} sizes="(min-width: 768px) 55vw, 100vw" />
              </MaskReveal>
              <Reveal className={`md:col-span-4 ${i % 2 ? "md:order-1 md:col-start-1 md:row-start-1" : "md:col-start-9"}`}>
                <p className="eyebrow text-champagne-deep">
                  {String(i + 1).padStart(2, "0")} / {String(rooms.length).padStart(2, "0")}
                </p>
                <h2 id={`${r.slug}-title`} className="mt-4 text-4xl leading-tight md:text-5xl">{r.name}</h2>
                <p className="mt-5 leading-relaxed text-charcoal/75">{r.summary}</p>
                <dl className="mt-8 border-t border-charcoal/15 pt-6 text-sm">
                  <dt className="eyebrow !text-[0.6rem] text-charcoal/70">Guests</dt>
                  <dd className="mt-1 font-serif text-xl">{r.listedGuests}</dd>
                  <dt className="eyebrow mt-6 !text-[0.6rem] text-charcoal/70">Reported features</dt>
                  <dd className="mt-3">
                    <ul className="space-y-2">
                      {r.reportedFeatures.map((f) => (
                        <li key={f} className="flex items-center gap-3 text-charcoal/80">
                          <Check aria-hidden className="h-4 w-4 text-lagoon" strokeWidth={1.5} /> {f}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </dl>
                <div className="mt-8 flex flex-wrap gap-3">
                  <ButtonLink href={`/contact?room=${encodeURIComponent(r.name)}#enquire`}>Enquire</ButtonLink>
                  <ButtonLink href={whatsappHref(`Hello Atara Lagoon, I'd like to ask about the ${r.name} for my dates.`)} variant="outline">
                    WhatsApp
                  </ButtonLink>
                </div>
              </Reveal>
            </article>
          ))}
        </div>
      </section>

      <section aria-labelledby="included-title" className="bg-sand/60 py-20 md:py-28">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <Eyebrow className="mb-6 text-lagoon">In the rooms</Eyebrow>
            <h2 id="included-title" className="text-4xl leading-tight md:text-5xl">What you can expect</h2>
            <Note className="mt-8">
              Rooms vary. Some cabana-style rooms are simpler, and items like a kettle or fridge differ from room to
              room. If something matters to you, mention it in your enquiry and we&apos;ll confirm it.
            </Note>
          </Reveal>
          <Reveal className="md:col-span-6 md:col-start-7" delay={0.1}>
            <ul className="grid gap-x-8 sm:grid-cols-2">
              {[...sharedRoomFeatures, ...extras].map((f) => (
                <li key={f} className="border-b border-charcoal/15 py-4 font-serif text-xl">{f}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section aria-labelledby="policies-title" className="container-x grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <Reveal className="md:col-span-4">
          <Eyebrow className="mb-6 text-lagoon">Before you book</Eyebrow>
          <h2 id="policies-title" className="text-4xl leading-tight">Times &amp; policies</h2>
        </Reveal>
        <Reveal className="md:col-span-7 md:col-start-6" delay={0.1}>
          <dl className="divide-y divide-charcoal/15 border-y border-charcoal/15">
            {policies.map(([k, v]) => (
              <div key={k} className="grid gap-2 py-5 sm:grid-cols-3">
                <dt className="font-serif text-xl">{k}</dt>
                <dd className="text-charcoal/75 sm:col-span-2">{v}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>
      <ContactBand />
    </>
  );
}
