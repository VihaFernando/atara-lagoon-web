import type { Metadata } from "next";
import { SITE_URL, business, addressLine } from "@/content/business";
import type { Faq } from "@/content/offerings";

export const nav = [
  { href: "/", label: "Home" },
  { href: "/accommodation", label: "Accommodation" },
  { href: "/restaurant", label: "Restaurant" },
  { href: "/experiences", label: "Experiences" },
  { href: "/coworking", label: "Coworking" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
}

export function pageMetadata({ title, description, path }: PageMetaInput): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: business.name,
      locale: "en_GB",
    },
    twitter: { card: "summary_large_image", title, description },
    robots: { index: true, follow: true },
  };
}

/* ---------------------------------------------------------------- JSON-LD */

const hotelId = `${SITE_URL}/#hotel`;
const websiteId = `${SITE_URL}/#website`;

export function hotelSchema() {
  const a = business.address;
  return {
    "@type": "Hotel",
    "@id": hotelId,
    name: business.name,
    description: business.description,
    url: `${SITE_URL}/`,
    telephone: business.contact.phoneE164,
    email: business.contact.email,
    image: [
      `${SITE_URL}/images/atara-lagoon-pool-garden-kalpitiya.webp`,
      `${SITE_URL}/images/atara-lagoon-poolside-pavilion.webp`,
      `${SITE_URL}/images/atara-lagoon-double-room.webp`,
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: a.street, // street number pending confirmation
      addressLocality: a.locality,
      addressRegion: a.region,
      postalCode: a.postalCode,
      addressCountry: a.countryCode,
    },
    logo: `${SITE_URL}/brand/atara-lagoon-logo.png`,
    geo: { "@type": "GeoCoordinates", latitude: business.address.geo.value?.lat, longitude: business.address.geo.value?.lng },
    hasMap: business.mapsUrl,
    checkoutTime: "12:00",
    amenityFeature: business.facilitiesVerified.map((name) => ({
      "@type": "LocationFeatureSpecification",
      name,
      value: true,
    })),
    sameAs: [business.social.facebook, business.social.tripadvisor],
    containedInPlace: { "@type": "Place", name: "Kalpitiya, Puttalam District, Sri Lanka" },
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": websiteId,
    url: `${SITE_URL}/`,
    name: business.name,
    inLanguage: "en",
    publisher: { "@id": hotelId },
  };
}

export function webPageSchema(path: string, name: string, description: string, crumbs: { name: string; path: string }[]) {
  const url = `${SITE_URL}${path}`;
  return [
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name,
      description,
      isPartOf: { "@id": websiteId },
      about: { "@id": hotelId },
      inLanguage: "en",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [{ name: "Home", path: "/" }, ...crumbs].map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: `${SITE_URL}${c.path}`,
      })),
    },
  ];
}

export function faqSchema(items: Faq[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function graph(...nodes: unknown[]) {
  return { "@context": "https://schema.org", "@graph": nodes.flat() };
}

export { addressLine };
