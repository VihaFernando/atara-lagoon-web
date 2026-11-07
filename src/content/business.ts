/**
 * Central business content for Atara Lagoon.
 *
 * Every fact carries a verification status taken from the research profile
 * (snapshot 7 Nov 2026, public sources, NOT management-verified):
 *
 *  - "verified"      Supplied by the client brief or consistent across several
 *                    independent public sources. Safe to publish.
 *  - "third-party"   Published by a single booking/directory platform. Published
 *                    only with neutral wording ("listed", "reported").
 *  - "confirm"       Conflicting or stale. Shown only as "please confirm" copy.
 *  - "unpublished"   Kept for reference. Never rendered until management confirms.
 *
 * When management confirms a fact, update its value and set status: "verified".
 */

export type Status = "verified" | "third-party" | "confirm" | "unpublished";

export interface Fact<T> {
  value: T;
  status: Status;
  source: string;
  note?: string;
}

/**
 * Search-engine indexing is OFF unless NEXT_PUBLIC_ALLOW_INDEXING=true.
 * Keep it off for demos and staging; turn it on only for the real production launch.
 */
export const ALLOW_INDEXING = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://ataralagoon.com").replace(/\/$/, "");

export const business = {
  name: "Atara Lagoon",
  legalName: { value: "Atara Lagoon", status: "verified", source: "Ceylon Pages, Google Hotels, DayOuting" } as Fact<string>,
  alternateNames: {
    value: ["Atara Lagoon Kalpitiya", "OYO 255 Atara Lagoon", "Kalpitiya Lagoon Resort"],
    status: "confirm",
    source: "Tripadvisor, Planet of Hotels",
    note: "Confirm whether these are former / alternate names before adding to schema alternateName.",
  } as Fact<string[]>,
  tagline: "A small lagoon-side resort in Kalpitiya, Sri Lanka",
  description:
    "Atara Lagoon is a small, relaxed resort beside the Kalpitiya lagoon in Sri Lanka's Puttalam District, with garden rooms, an outdoor swimming pool, an on-site restaurant and easy access to lagoon boat trips and water activities.",

  contact: {
    phoneDisplay: "+94 77 313 8046",
    phoneE164: "+94773138046",
    whatsapp: "94773138046",
    email: "ataralagoon@gmail.com",
    status: "verified" as Status,
    source: "Client brief, DayOuting, Ceylon Pages, Google Hotels",
  },

  address: {
    // Street number deliberately omitted: 111 (Ceylon Pages, DayOuting, Google) vs 631A (Destinia).
    street: "Anawasala Road",
    locality: "Kalpitiya",
    postalCode: "61360",
    district: "Puttalam District",
    region: "North Western Province",
    country: "Sri Lanka",
    countryCode: "LK",
    streetNumber: {
      value: "111 or 631A",
      status: "confirm",
      source: "111: Ceylon Pages / DayOuting / Google Hotels — 631A: Destinia",
      note: "Do not publish a street number until management confirms it.",
    } as Fact<string>,
    geo: {
      value: { lat: 8.24237, lng: 79.76287 },
      status: "verified",
      source: "Google Maps embed supplied by the client (place: Atara Lagoon Kalpitiya)",
    } as Fact<{ lat: number; lng: number } | null>,
  },

  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Atara+Lagoon+Kalpitiya",
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3948.6054321784977!2d79.7628674759919!3d8.242370700803791!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3afd0c84d8f58bd3%3A0x894a104abbb76bc4!2sAtara%20Lagoon%20Kalpitiya!5e0!3m2!1sen!2slk!4v1794071363071!5m2!1sen!2slk",
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Atara+Lagoon+Kalpitiya",

  social: {
    website: "https://ataralagoon.com/",
    facebook: "https://www.facebook.com/ataralagoon/",
    tripadvisor:
      "https://www.tripadvisor.com/Hotel_Review-g1404719-d10045390-Reviews-OYO_255_Atara_Lagoon-Kalpitiya_North_Western_Province.html",
    googleHotels: "https://www.google.com/travel/hotels/entity/ChoIxNfd3auJhKWJARoNL2cvMTFjbnh5NjAyMxAB",
    orderNow: "https://ordernow.lk/menu/atara-lagoon/",
  },

  times: {
    checkIn: {
      value: "1:30 – 2:00 PM",
      status: "confirm",
      source: "Google Hotels: 2:00 PM; Destinia: from 1:30 PM",
      note: "Platforms disagree. Copy says 'early afternoon' and asks guests to confirm.",
    } as Fact<string>,
    checkOut: { value: "12:00 PM", status: "verified", source: "Google Hotels, Destinia" } as Fact<string>,
    restaurantHours: {
      value: "Closes 11:00 PM (crawl)",
      status: "unpublished",
      source: "OrderNow crawl",
      note: "Not a verified schedule — do not publish.",
    } as Fact<string>,
  },

  /** Facilities listed by several independent sources — safe to state plainly. */
  facilitiesVerified: [
    "Outdoor swimming pool",
    "Garden and sun terrace",
    "On-site restaurant",
    "Room service",
    "Free Wi-Fi",
    "On-site parking",
  ],
  /** Listed by one or more booking platforms — always worded "listed / on request". */
  facilitiesThirdParty: [
    "Bar",
    "24-hour front desk",
    "Luggage storage",
    "Laundry service",
    "Airport transfers (extra charge)",
    "Car and bicycle hire (extra charge)",
    "Packed lunches",
    "Children's meals",
    "BBQ facilities",
    "Remote-working spots (front office, dining area, in-room desk)",
  ],

  ratings: {
    // Third-party figures, displayed with source + date only. NOT used in JSON-LD.
    status: "third-party" as Status,
    asOf: "November 2026",
    items: [
      { platform: "Google", score: "4.5 / 5", count: 440, url: "https://www.google.com/travel/hotels/entity/ChoIxNfd3auJhKWJARoNL2cvMTFjbnh5NjAyMxAB" },
      {
        platform: "Tripadvisor",
        score: "4.6 / 5",
        count: 53,
        url: "https://www.tripadvisor.com/Hotel_Review-g1404719-d10045390-Reviews-OYO_255_Atara_Lagoon-Kalpitiya_North_Western_Province.html",
      },
    ],
  },

  /** Prices found online. NEVER rendered as current prices. */
  unpublishedPricing: [
    { item: "Two-night package", value: "LKR 17,000 per person", source: "DayOuting", status: "unpublished" as Status },
    { item: "Nightly estimate", value: "≈ US$52 / night", source: "Planet of Hotels FAQ", status: "unpublished" as Status },
    { item: "Payment methods", value: "Cash, credit & debit card", source: "Ceylon Pages (disputed in one review)", status: "confirm" as Status },
    { item: "Pets", value: "Pet-friendly on some platforms", source: "Destinia", status: "confirm" as Status },
  ],
} as const;

export const telHref = `tel:${business.contact.phoneE164}`;
export const mailHref = `mailto:${business.contact.email}`;

export function whatsappHref(message = "Hello Atara Lagoon, I'd like to enquire about a stay.") {
  return `https://wa.me/${business.contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const addressLine = `${business.address.street}, ${business.address.locality} ${business.address.postalCode}, ${business.address.country}`;
