import Image from "next/image";
import Link from "next/link";
import { nav } from "@/lib/seo";
import { business, addressLine, mailHref, telHref, whatsappHref } from "@/content/business";
import { Contours } from "@/components/ui/Photo";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-charcoal text-ivory">
      <Contours color="rgba(185,154,105,0.08)" />
      <div className="container-x relative py-20">
        <Image src="/brand/atara-lagoon-logo-light.png" alt="Atara Lagoon, Kalpitiya" width={640} height={468} className="mb-12 w-[150px]" sizes="150px" />
        <p className="max-w-3xl font-serif text-4xl leading-[1.08] md:text-6xl">
          Slow days by the <em className="text-champagne">Kalpitiya</em> lagoon.
        </p>

        <div className="mt-16 grid gap-12 border-t border-ivory/12 pt-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="eyebrow mb-5 font-sans text-champagne">Visit</h2>
            <address className="not-italic leading-relaxed text-ivory/75">
              {business.name}
              <br />
              {addressLine}
              <br />
              {business.address.district}
            </address>
            <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer" className="link-underline mt-4 inline-block text-sm">
              Open in Google Maps
            </a>
          </div>
          <div>
            <h2 className="eyebrow mb-5 font-sans text-champagne">Contact</h2>
            <ul className="space-y-2 text-ivory/75">
              <li><a className="link-underline" href={telHref}>{business.contact.phoneDisplay}</a></li>
              <li><a className="link-underline" href={whatsappHref()} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li><a className="link-underline break-all" href={mailHref}>{business.contact.email}</a></li>
              <li><a className="link-underline" href={business.social.facebook} target="_blank" rel="noopener noreferrer">Facebook</a></li>
            </ul>
          </div>
          <div>
            <h2 className="eyebrow mb-5 font-sans text-champagne">Explore</h2>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-ivory/75 sm:grid-cols-1">
              {nav.slice(1).map((n) => (
                <li key={n.href}><Link className="link-underline" href={n.href}>{n.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="eyebrow mb-5 font-sans text-champagne">Stay</h2>
            <p className="text-ivory/75">Check-out 12:00 PM. Check-in in the early afternoon, so please confirm the time with us.</p>
            <Link href="/contact#enquire" className="mt-5 inline-flex min-h-11 items-center border border-ivory/40 px-5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] transition-colors hover:bg-ivory hover:text-charcoal">
              Send an enquiry
            </Link>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-ivory/12 pt-6 text-xs text-ivory/70 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p>© {new Date().getFullYear()} {business.name}, Kalpitiya, Sri Lanka</p>
            <p>Enquiries are not confirmed reservations until we reply with availability.</p>
          </div>
          <p className="flex items-center gap-2">
            <span>Design &amp; developed by</span>
            <a
              href="https://codemaxed.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 font-semibold text-ivory"
            >
              <Image src="/brand/codemaxed-logo-light.png" alt="" width={90} height={69} className="h-3.5 w-auto opacity-90 transition-opacity group-hover:opacity-100" />
              <span className="link-underline">Codemaxed</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
