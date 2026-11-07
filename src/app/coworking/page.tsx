import type { Metadata } from "next";
import Link from "next/link";
import { Photo } from "@/components/ui/Photo";
import { MaskReveal, Reveal } from "@/components/ui/Reveal";
import { ButtonLink, Eyebrow, JsonLd, Note } from "@/components/ui/primitives";
import { BetweenCalls, Connectivity, LocationsList, SignalRings, workationMessage } from "@/components/sections/coworking";
import { FaqSection } from "@/components/sections/shared";
import { coworking, coworkingFaqs } from "@/content/offerings";
import { whatsappHref } from "@/content/business";
import { faqSchema, graph, pageMetadata, webPageSchema } from "@/lib/seo";

const title = "Coworking & Remote Working in Kalpitiya";
const description =
  "Work remotely from Atara Lagoon in Kalpitiya, Sri Lanka, with resort-wide Wi-Fi (advertised 25–75 Mbps, three networks), flexible work spots, good food and the lagoon on your doorstep.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/coworking" });

const t = coworking.speedTest;

export default function CoworkingPage() {
  return (
    <>
      <JsonLd data={graph(webPageSchema("/coworking", title, description, [{ name: "Coworking", path: "/coworking" }]), faqSchema(coworkingFaqs))} />

      {/* Masthead */}
      <header className="relative overflow-hidden bg-charcoal text-ivory">
        <SignalRings className="-left-48 top-10 h-[720px] w-[720px]" color="rgba(165,180,160,0.14)" />
        <div className="container-x relative grid gap-12 pb-16 pt-32 md:grid-cols-12 md:pb-24 md:pt-40">
          <div className="md:col-span-6 md:self-end">
            <nav aria-label="Breadcrumb" className="eyebrow mb-8 text-ivory/70">
              <ol className="flex gap-2">
                <li><Link href="/" className="link-underline hover:text-ivory">Home</Link></li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-ivory/90">Coworking</li>
              </ol>
            </nav>
            <p className="eyebrow mb-5 text-sand">Remote work in Kalpitiya</p>
            <h1 className="text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-7xl">
              Work remotely.
              <br />
              <em className="text-sand">Stay close to nature.</em>
            </h1>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-ivory/80 md:text-lg">
              Get your work done in the easy pace of Kalpitiya. There&apos;s Wi-Fi across the whole resort, flexible
              places to work, good food and a refreshing change of scenery, with one of Sri Lanka&apos;s best-known
              kitesurfing spots nearby.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={whatsappHref(workationMessage)} variant="light">Plan a working stay</ButtonLink>
              <ButtonLink href="/contact?room=No%20preference#enquire" variant="ghost">Send an enquiry</ButtonLink>
            </div>
          </div>
          <div className="md:col-span-5 md:col-start-8">
            <MaskReveal>
              <Photo name="coworking" priority sizes="(min-width: 768px) 40vw, 100vw" />
            </MaskReveal>
          </div>
        </div>
      </header>

      {/* Connectivity */}
      <section aria-labelledby="net-title" className="bg-charcoal pb-24 text-ivory md:pb-32">
        <div className="container-x">
          <div className="mb-12 grid gap-6 border-t border-ivory/12 pt-16 md:grid-cols-12">
            <Reveal className="md:col-span-5">
              <Eyebrow className="mb-6 text-champagne">Connectivity</Eyebrow>
              <h2 id="net-title" className="text-4xl leading-tight md:text-5xl">Internet across the whole resort</h2>
            </Reveal>
            <Reveal className="text-ivory/75 md:col-span-6 md:col-start-7 md:self-end" delay={0.1}>
              <p className="leading-relaxed">
                With three separate Wi-Fi networks, the connection almost never goes down completely. A speed test
                published by the resort in {t.date} recorded <strong className="font-semibold text-ivory">{t.downloadMbps} Mbps</strong> download,{" "}
                <strong className="font-semibold text-ivory">{t.uploadMbps} Mbps</strong> upload and {t.pingMs} ms ping.
              </p>
            </Reveal>
          </div>
          <Connectivity />
          <p className="mt-6 max-w-2xl text-xs leading-relaxed text-ivory/70">
            Speeds are as advertised by the resort and vary with demand and conditions. They are not guaranteed. For
            important calls, we recommend a local mobile data SIM as a backup.
          </p>
        </div>
      </section>

      {/* Where you'll work */}
      <section aria-labelledby="where-title" className="container-x py-24 md:py-32">
        <div className="mb-16 grid gap-8 md:grid-cols-12">
          <Reveal className="md:col-span-6">
            <Eyebrow className="mb-6 text-lagoon">Where you&apos;ll work</Eyebrow>
            <h2 id="where-title" className="text-4xl leading-tight md:text-6xl">Pick your spot for the day</h2>
          </Reveal>
          <Reveal className="md:col-span-5 md:col-start-8 md:self-end" delay={0.1}>
            <Note>
              We don&apos;t have a dedicated coworking space yet, but we&apos;ll make sure you have a good place to work.
              Here are the three options guests use.
            </Note>
          </Reveal>
        </div>
        <LocationsList />
      </section>

      {/* Food & people */}
      <section aria-labelledby="fuel-title" className="bg-sand/60 py-24 md:py-32">
        <div className="container-x grid gap-12 md:grid-cols-12 md:items-center">
          <div className="grid grid-cols-2 gap-4 md:col-span-6">
            <MaskReveal>
              <div className="relative aspect-[4/5]"><Photo name="poolDrinks" fill sizes="(min-width: 768px) 25vw, 50vw" /></div>
            </MaskReveal>
            <MaskReveal delay={0.12} className="mt-16">
              <div className="relative aspect-[4/5]"><Photo name="breakfast" fill sizes="(min-width: 768px) 25vw, 50vw" /></div>
            </MaskReveal>
          </div>
          <Reveal className="md:col-span-5 md:col-start-8">
            <Eyebrow className="mb-6 text-lagoon">Food &amp; people</Eyebrow>
            <h2 id="fuel-title" className="text-4xl leading-tight md:text-5xl">Fresh juice at your laptop, seafood after work</h2>
            <p className="mt-6 leading-relaxed text-charcoal/75">
              Food and drinks from our kitchen are available while you work, from breakfast and fresh juices to
              lunch between calls. Our team will help you settle in and make sure you have everything you need.
            </p>
            <div className="mt-8">
              <ButtonLink href="/restaurant" variant="outline">See the menu</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>

      {/* After hours */}
      <section aria-labelledby="after-title" className="container-x py-24 md:py-32">
        <Reveal className="mb-12 max-w-2xl">
          <Eyebrow className="mb-6 text-lagoon">After hours</Eyebrow>
          <h2 id="after-title" className="text-4xl leading-tight md:text-5xl">Log off and get outside</h2>
          <p className="mt-5 text-charcoal/75">
            Kalpitiya&apos;s steady winds and calm lagoon make the end of the working day the best part.
          </p>
        </Reveal>
        <BetweenCalls />
      </section>

      <FaqSection items={coworkingFaqs} title="Remote working FAQs" />

      {/* CTA */}
      <section aria-labelledby="cw-cta-title" className="relative overflow-hidden bg-forest py-24 text-ivory md:py-32">
        <SignalRings className="-bottom-56 -right-40 h-[640px] w-[640px]" />
        <div className="container-x relative">
          <Reveal className="max-w-3xl">
            <Eyebrow className="mb-6 text-champagne">Digital nomads &amp; remote teams</Eyebrow>
            <h2 id="cw-cta-title" className="text-4xl leading-[1.06] md:text-6xl">Planning a workation in Sri Lanka?</h2>
            <p className="mt-6 max-w-xl text-ivory/75">
              Tell us your dates, how long you&apos;re staying and how you like to work. We&apos;ll reply with room
              availability, rates and the best set-up for you.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href={whatsappHref(workationMessage)} variant="light">WhatsApp us</ButtonLink>
              <ButtonLink href="/contact#enquire" variant="ghost">Booking enquiry</ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
