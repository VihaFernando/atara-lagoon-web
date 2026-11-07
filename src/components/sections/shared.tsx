import { Mail, MessageCircle, Phone } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { ButtonLink, Eyebrow, Note } from "@/components/ui/primitives";
import { MapFacade } from "./MapFacade";
import { business, addressLine, mailHref, telHref, whatsappHref } from "@/content/business";
import type { Faq } from "@/content/offerings";

export function LocationSection() {
  return (
    <section id="location" aria-labelledby="loc-title" className="bg-sand/60 py-24 md:py-32">
      <div className="container-x grid gap-12 md:grid-cols-12">
        <Reveal className="md:col-span-4">
          <Eyebrow className="mb-6 text-lagoon">Location</Eyebrow>
          <h2 id="loc-title" className="text-4xl leading-[1.06] md:text-5xl">On the lagoon at Kalpitiya.</h2>
          <p className="mt-6 leading-relaxed text-charcoal/75">
            Kalpitiya sits on a narrow peninsula between the Puttalam lagoon and the Indian Ocean on Sri Lanka&apos;s
            north-west coast. Atara Lagoon is on Anawasala Road, close to the water.
          </p>
          <address className="mt-8 not-italic">
            <span className="eyebrow block !text-[0.6rem] text-charcoal/70">Address</span>
            <span className="mt-2 block font-serif text-2xl leading-snug">
              {business.name}
              <br />
              {addressLine}
            </span>
            <span className="mt-1 block text-sm text-charcoal/75">
              {business.address.district}, {business.address.region}
            </span>
          </address>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={business.directionsUrl}>Get directions</ButtonLink>
            <ButtonLink href={business.mapsUrl} variant="outline">Open in Google Maps</ButtonLink>
          </div>
        </Reveal>
        <Reveal className="md:col-span-7 md:col-start-6" delay={0.1}>
          <MapFacade />
        </Reveal>
      </div>
    </section>
  );
}

export function FaqSection({ items, title = "Good to know" }: { items: Faq[]; title?: string }) {
  return (
    <section id="faq" aria-labelledby="faq-title" className="container-x grid gap-12 py-24 md:grid-cols-12 md:py-32">
      <Reveal className="md:col-span-4">
        <Eyebrow className="mb-6 text-lagoon">Questions</Eyebrow>
        <h2 id="faq-title" className="text-4xl leading-[1.06] md:text-5xl">{title}</h2>
        <p className="mt-6 text-charcoal/70">
          Can&apos;t find what you need? Message us on{" "}
          <a href={whatsappHref()} target="_blank" rel="noopener noreferrer" className="link-underline text-lagoon">WhatsApp</a>.
        </p>
      </Reveal>
      <div className="md:col-span-7 md:col-start-6">
        {items.map((f) => (
          <details key={f.q} className="group border-b border-charcoal/15 [&_summary::-webkit-details-marker]:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-serif text-xl md:text-2xl">
              <h3 className="font-serif">{f.q}</h3>
              <span aria-hidden className="relative h-3 w-3 shrink-0">
                <span className="absolute top-1/2 h-px w-3 bg-current" />
                <span className="absolute left-1/2 h-3 w-px bg-current transition-transform duration-300 group-open:scale-y-0" />
              </span>
            </summary>
            <p className="max-w-2xl pb-6 leading-relaxed text-charcoal/75">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function ContactBand() {
  const items = [
    { icon: MessageCircle, label: "WhatsApp", value: business.contact.phoneDisplay, href: whatsappHref() },
    { icon: Phone, label: "Call", value: business.contact.phoneDisplay, href: telHref },
    { icon: Mail, label: "Email", value: business.contact.email, href: mailHref },
  ];
  return (
    <section aria-labelledby="contact-band-title" className="bg-forest py-24 text-ivory md:py-32">
      <div className="container-x">
        <Reveal className="max-w-3xl">
          <Eyebrow className="mb-6 text-champagne">Plan your stay</Eyebrow>
          <h2 id="contact-band-title" className="text-4xl leading-[1.06] md:text-6xl">Tell us your dates and we&apos;ll take it from there.</h2>
          <p className="mt-6 max-w-xl text-ivory/75">
            Send us an enquiry and we&apos;ll reply with current availability and rates. Your room is only reserved
            once we&apos;ve confirmed it with you.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-px bg-ivory/15 sm:grid-cols-3">
          {items.map(({ icon: Icon, label, value, href }) => (
            <a
              key={label}
              href={href}
              {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex flex-col gap-6 bg-forest p-7 transition-colors duration-500 hover:bg-lagoon"
            >
              <Icon aria-hidden className="h-5 w-5 text-champagne" strokeWidth={1.4} />
              <span>
                <span className="eyebrow block !text-[0.6rem] text-ivory/70">{label}</span>
                <span className="mt-2 block break-all font-serif text-2xl">{value}</span>
              </span>
            </a>
          ))}
        </div>
        <div className="mt-10">
          <ButtonLink href="/contact#enquire" variant="light">Send a booking enquiry</ButtonLink>
        </div>
      </div>
    </section>
  );
}

export function VerifyNote({ children }: { children: React.ReactNode }) {
  return <Note className="mt-8 max-w-xl">{children}</Note>;
}
