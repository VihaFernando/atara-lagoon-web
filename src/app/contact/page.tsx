import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import { FaqSection, LocationSection } from "@/components/sections/shared";
import { JsonLd } from "@/components/ui/primitives";
import { faqs } from "@/content/offerings";
import { business, addressLine, mailHref, telHref, whatsappHref } from "@/content/business";
import { graph, pageMetadata, webPageSchema } from "@/lib/seo";

const title = "Contact & Booking Enquiries";
const description =
  "Contact Atara Lagoon in Kalpitiya by WhatsApp or phone on +94 77 313 8046, by email, or send a booking enquiry with your dates.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/contact" });

export default function ContactPage() {
  const channels = [
    { icon: MessageCircle, label: "WhatsApp", value: business.contact.phoneDisplay, href: whatsappHref() },
    { icon: Phone, label: "Telephone", value: business.contact.phoneDisplay, href: telHref },
    { icon: Mail, label: "Email", value: business.contact.email, href: mailHref },
  ];
  return (
    <>
      <JsonLd data={graph(webPageSchema("/contact", title, description, [{ name: "Contact", path: "/contact" }]))} />
      <header className="bg-lagoon pb-16 pt-32 text-ivory md:pb-24 md:pt-40">
        <div className="container-x grid gap-12 md:grid-cols-12">
          <div className="md:col-span-6">
            <nav aria-label="Breadcrumb" className="eyebrow mb-8 text-ivory/60">
              <ol className="flex gap-2">
                <li><Link href="/" className="link-underline hover:text-ivory">Home</Link></li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-ivory/90">Contact</li>
              </ol>
            </nav>
            <h1 className="text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-7xl">Plan your stay</h1>
            <p className="mt-7 max-w-md text-ivory/80 md:text-lg">
              Message, call or send an enquiry. We&apos;ll reply with availability and rates for your dates.
            </p>
          </div>
          <ul className="md:col-span-5 md:col-start-8 md:self-end">
            {channels.map(({ icon: Icon, label, value, href }) => (
              <li key={label} className="border-b border-ivory/15">
                <a href={href} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group flex items-center gap-5 py-5">
                  <Icon aria-hidden className="h-5 w-5 text-champagne" strokeWidth={1.4} />
                  <span className="flex-1">
                    <span className="eyebrow block !text-[0.6rem] text-ivory/70">{label}</span>
                    <span className="mt-1 block break-all font-serif text-2xl transition-transform duration-500 group-hover:translate-x-1">{value}</span>
                  </span>
                </a>
              </li>
            ))}
            <li className="pt-5 text-sm text-ivory/70">
              {addressLine} ·{" "}
              <a href={business.social.facebook} target="_blank" rel="noopener noreferrer" className="link-underline">Facebook</a>
            </li>
          </ul>
        </div>
      </header>

      <section id="enquire" aria-labelledby="enquire-title" className="container-x grid scroll-mt-24 gap-12 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-4">
          <p className="eyebrow text-lagoon">Booking enquiry</p>
          <h2 id="enquire-title" className="mt-5 text-4xl leading-tight md:text-5xl">Tell us about your trip</h2>
          <p className="mt-6 leading-relaxed text-charcoal/70">
            Share your dates, number of guests and the room you&apos;d like. We&apos;ll check availability and get
            back to you. Sending an enquiry does not reserve a room.
          </p>
        </div>
        <div className="md:col-span-7 md:col-start-6">
          <Suspense>
            <EnquiryForm />
          </Suspense>
        </div>
      </section>

      <LocationSection />
      <FaqSection items={faqs.slice(5)} title="Before you arrive" />
    </>
  );
}
