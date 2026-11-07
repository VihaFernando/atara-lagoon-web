import type { PhotoKey } from "./images";
import type { Status } from "./business";

/* ------------------------------------------------------------------ Rooms */

export interface Room {
  slug: string;
  name: string;
  summary: string;
  photo: PhotoKey;
  /** Guest capacity as listed by booking platforms (third-party). */
  listedGuests: string;
  /** Amenities reported by booking platforms for this category. */
  reportedFeatures: string[];
  /** Unpublished data kept for reference only. */
  unpublished: { sizeSqm?: number; source: string };
  status: Status;
}

export const rooms: Room[] = [
  {
    slug: "standard-double",
    name: "Standard Double",
    summary: "A simple, comfortable room for two, with its own terrace looking onto the garden or pool.",
    photo: "roomStandard",
    listedGuests: "Listed for 2 guests",
    reportedFeatures: ["Air conditioning & fan", "Private bathroom", "Terrace", "Garden or pool view"],
    unpublished: { sizeSqm: 16, source: "Planet of Hotels" },
    status: "third-party",
  },
  {
    slug: "deluxe-double",
    name: "Deluxe Double",
    summary: "A little more room to spread out, with a terrace and views across the garden and pool.",
    photo: "roomDeluxe",
    listedGuests: "Listed for up to 3 guests",
    reportedFeatures: ["Air conditioning & fan", "Private bathroom", "Terrace", "Garden or pool view"],
    unpublished: { sizeSqm: 17, source: "Planet of Hotels" },
    status: "third-party",
  },
  {
    slug: "quadruple",
    name: "Quadruple Room",
    summary: "A larger room for families or small groups travelling together.",
    photo: "roomQuad",
    listedGuests: "Listed for up to 4 guests",
    reportedFeatures: ["Air conditioning", "Private bathroom", "Terrace"],
    unpublished: { sizeSqm: 22, source: "Planet of Hotels" },
    status: "third-party",
  },
  {
    slug: "cabana",
    name: "Garden Cabanas",
    summary:
      "Simple cabana-style rooms set in the garden. Please ask us which cabanas are open for your dates.",
    photo: "roomCabana",
    listedGuests: "Occupancy on request",
    reportedFeatures: ["Garden setting", "Private bathroom"],
    unpublished: { source: "Ceylon Pages mentions five cabanas — count not confirmed" },
    status: "confirm",
  },
];

/** Features reported across room listings (not guaranteed for every room). */
export const sharedRoomFeatures = [
  "Private bathroom with shower",
  "Air conditioning and/or fan",
  "Terrace or patio with outdoor seating",
  "Towels, linen and toiletries",
  "Television in some rooms",
  "Free Wi-Fi",
];

/* ------------------------------------------------------------------- Menu */

export interface MenuItem {
  name: string;
  /** Price as displayed on OrderNow (LKR). Not management-confirmed. */
  listedPriceLkr: number;
  status: Status;
  flag?: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

/**
 * Publication gate for menu prices.
 * Prices came from a third-party ordering page and are NOT confirmed.
 * Leave `false` until management confirms the current menu; then set item
 * statuses to "verified" and flip this to `true`.
 */
export const SHOW_MENU_PRICES = false;

export const menu: MenuCategory[] = [
  {
    id: "appetizers",
    name: "Appetizers",
    items: [
      { name: "Home Made Chips", listedPriceLkr: 850, status: "third-party" },
      { name: "Mini Chicken Kebabs", listedPriceLkr: 1200, status: "third-party" },
    ],
  },
  {
    id: "sandwiches",
    name: "Sandwich Corner",
    items: [
      { name: "Chicken and Cheese Sandwich", listedPriceLkr: 1250, status: "third-party" },
      { name: "Cheese and Tomato Sandwich", listedPriceLkr: 1100, status: "third-party" },
    ],
  },
  {
    id: "soups",
    name: "Soup's On",
    items: [
      {
        name: "Vegetable Soup",
        listedPriceLkr: 150,
        status: "unpublished",
        flag: "LKR 150 looks like a data-entry error (other soups LKR 1,200). Confirm before publishing.",
      },
      { name: "Chicken and Sweet Corn Soup", listedPriceLkr: 1200, status: "third-party" },
      { name: "Tomato Soup with Croutons", listedPriceLkr: 1200, status: "third-party" },
    ],
  },
  {
    id: "salads",
    name: "Fresh & Healthy Salads",
    items: [
      { name: "Fresh Salad of the Day", listedPriceLkr: 1100, status: "third-party" },
      { name: "Mixed Seafood Salad", listedPriceLkr: 1350, status: "third-party" },
      { name: "Classic Tuna Salad", listedPriceLkr: 1250, status: "third-party" },
    ],
  },
  {
    id: "omelettes",
    name: "Omelette Station",
    items: [
      { name: "Sri Lankan Spicy Omelette", listedPriceLkr: 850, status: "third-party" },
      { name: "Cheese and Tomato Omelette", listedPriceLkr: 1000, status: "third-party" },
    ],
  },
];

export function displayPrice(item: MenuItem): string | null {
  if (!SHOW_MENU_PRICES || item.status !== "verified") return null;
  return `LKR ${item.listedPriceLkr.toLocaleString("en-LK")}`;
}

/* ------------------------------------------------------------ Experiences */

export type Operator = "guest-reported" | "arranged-on-request" | "independent";

export interface Experience {
  slug: string;
  name: string;
  description: string;
  photo: PhotoKey;
  operator: Operator;
}

export const operatorLabel: Record<Operator, string> = {
  "guest-reported": "Departs near the hotel · operator confirmed on enquiry",
  "arranged-on-request": "Ask us to help arrange · local operators",
  independent: "Independent local operators",
};

export const experiences: Experience[] = [
  {
    slug: "lagoon-boat-trip",
    name: "Lagoon boat trips",
    description:
      "Guests regularly mention guided boat trips around the lagoon, leaving from just outside the hotel. Ask us about timings, the operator and prices for your dates.",
    photo: "boatTour",
    operator: "guest-reported",
  },
  {
    slug: "snorkelling-diving",
    name: "Snorkelling & diving",
    description:
      "Kalpitiya's shallow waters and offshore reefs are popular for snorkelling and diving. We can point you to local operators. Equipment, safety and pricing are handled by them.",
    photo: "snorkel",
    operator: "arranged-on-request",
  },
  {
    slug: "fishing",
    name: "Fishing",
    description:
      "The lagoon has a long fishing tradition. Let us know if you would like to try it and we will put you in touch with someone local.",
    photo: "fishing",
    operator: "arranged-on-request",
  },
  {
    slug: "dolphin-watching",
    name: "Dolphin watching",
    description:
      "In season, boats head out from Kalpitiya to watch dolphins off the coast. Trips are run by local operators and depend on the weather and the season. Ask us what's running during your stay.",
    photo: "dolphins",
    operator: "independent",
  },
  {
    slug: "canoeing-windsurfing",
    name: "Kitesurfing & windsurfing",
    description:
      "Kalpitiya's steady lagoon winds make it one of Sri Lanka's best-known kitesurfing spots. Lessons and watercraft hire are offered by independent operators in the area.",
    photo: "kitesurf",
    operator: "independent",
  },
  {
    slug: "cycling",
    name: "Cycling the peninsula",
    description:
      "Bicycle hire is listed at an extra charge, and it's an easy way to explore Kalpitiya's quiet roads and fishing villages at your own pace.",
    photo: "garden",
    operator: "arranged-on-request",
  },
];

/* -------------------------------------------------------------------- FAQ */

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  {
    q: "Where is Atara Lagoon located?",
    a: "Atara Lagoon is on Anawasala Road in Kalpitiya (61360), on the Kalpitiya peninsula in Sri Lanka's Puttalam District, North Western Province, beside the Kalpitiya lagoon.",
  },
  {
    q: "What accommodation is available?",
    a: "Booking platforms list Standard Double rooms, Deluxe Double rooms, Quadruple rooms for families, and garden cabanas. Exact room availability, bedding and occupancy should be confirmed with us when you enquire.",
  },
  {
    q: "Does Atara Lagoon have a swimming pool?",
    a: "Yes. There is an outdoor swimming pool set in the garden, with sun loungers and a terrace.",
  },
  {
    q: "Is there a restaurant on site?",
    a: "Yes. The on-site restaurant serves breakfast and meals throughout the day, including appetizers, sandwiches, soups, salads and omelettes, and guests often mention the seafood. Room service is also available.",
  },
  {
    q: "Can I arrange a lagoon boat trip?",
    a: "Guests often take guided boat trips on the lagoon from just outside the hotel. Contact us before or during your stay for the current operator, timings and price.",
  },
  {
    q: "What else is there to do in Kalpitiya?",
    a: "Kalpitiya is known for its lagoon, snorkelling and diving, fishing, and wind sports such as windsurfing. Most of these are run by independent local operators, and we are happy to point you in the right direction.",
  },
  {
    q: "Can I work remotely from Atara Lagoon?",
    a: "Yes. Wi-Fi covers the whole resort, with advertised speeds of 25 to 75 Mbps over three separate networks. You can work from the small front office, the main dining area, or a desk we set up in your room. There isn't a dedicated coworking space yet.",
  },
  {
    q: "What are the check-in and check-out times?",
    a: "Check-out is at 12:00 PM. Check-in is in the early afternoon. Booking platforms list it as 1:30 PM or 2:00 PM, so please confirm the time with us before you arrive.",
  },
  {
    q: "How do I check room availability and rates?",
    a: "Send a booking enquiry through this website, message us on WhatsApp at +94 77 313 8046, or email ataralagoon@gmail.com. We will reply with current availability and rates. An enquiry is not a confirmed reservation.",
  },
];

/* -------------------------------------------------------------- Coworking */

/**
 * Remote-working facts. Source: ataralagoon.com/coworking (official site, read
 * 7 Nov 2026). The official page states there is NO dedicated coworking space yet,
 * so the site must not advertise one, nor meeting rooms, dedicated desks, passes or prices.
 */
export const coworking = {
  status: "third-party" as Status, // published by the property itself, not re-confirmed by management
  source: "https://ataralagoon.com/coworking/",
  speedAdvertised: "25–75 Mbps",
  wifiNetworks: 3,
  coverage: "Wi-Fi covers the whole resort",
  speedTest: {
    // Screenshot on the official coworking page, dated 20 Oct 2021 (SLT-Mobitel).
    date: "October 2021",
    downloadMbps: 72.8,
    uploadMbps: 43.0,
    pingMs: 8,
  },
  noDedicatedSpace: true,
  locations: [
    {
      name: "The front office",
      text: "A small, quiet office at the front of the resort. It's handy for focused work and calls.",
      photo: "coworking" as PhotoKey,
    },
    {
      name: "The main dining area",
      text: "Work at a table in the open dining area, with food and drinks close at hand and the garden around you.",
      photo: "poolPavilion" as PhotoKey,
    },
    {
      name: "A desk in your room",
      text: "Prefer your own space? Ask us and we'll set up a desk in your room.",
      photo: "roomSuite" as PhotoKey,
    },
  ],
};

export const coworkingFaqs: Faq[] = [
  {
    q: "Is there a dedicated coworking space at Atara Lagoon?",
    a: "Not yet. Guests work from the small front office, the main dining area, or a desk we can set up in their room. All of these are covered by the resort's Wi-Fi.",
  },
  {
    q: "How fast is the internet?",
    a: "The resort advertises speeds of 25 to 75 Mbps across three separate Wi-Fi networks covering the whole property. A speed test published by the resort in October 2021 recorded about 73 Mbps download and 43 Mbps upload. Speeds vary, so for critical calls we suggest bringing a local mobile data SIM as a backup.",
  },
  {
    q: "Can I get food and drinks while I work?",
    a: "Yes. The restaurant serves food and drinks during the day, and the team can bring them to you while you work.",
  },
  {
    q: "Do you offer coworking passes or long-stay rates?",
    a: "We don't publish coworking passes or prices online. Tell us your dates and how long you plan to stay, and we'll reply with what we can offer.",
  },
];
