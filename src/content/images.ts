/**
 * Photography registry: generated from the image collection (see image-inventory.md).
 *
 * All photographs depict Atara Lagoon or its surroundings and were collected from the
 * property's own website and public listings. USAGE PERMISSION IS STILL PENDING:
 * obtain written approval from the property (and, for listing-platform images, confirm
 * the property owns them) before public launch.
 *
 * To replace a photo, overwrite the file in /public/images and update width/height.
 * Set available: false to fall back to the labelled placeholder.
 */

export type PhotoCategory = "pool" | "garden" | "exterior" | "rooms" | "restaurant" | "food" | "coworking" | "area" | "experiences";

export interface PhotoSlot {
  id: string;
  file: string;
  category: PhotoCategory;
  alt: string;
  caption: string;
  width: number;
  height: number;
  available: boolean;
  tone: "lagoon" | "sand" | "forest" | "dusk";
  source: string;
}

export const photos = {
  hero: { id: "hero", file: "/images/atara-lagoon-pool-garden-kalpitiya.webp", category: "pool", alt: "The swimming pool and garden bungalows at Atara Lagoon, Kalpitiya", caption: "Pool and bungalows", width: 2400, height: 1600, available: true, tone: "lagoon", source: "Official website (ataralagoon.com)" },
  poolCabana: { id: "poolCabana", file: "/images/atara-lagoon-pool-bungalows.webp", category: "pool", alt: "Guest bungalows lining the swimming pool at Atara Lagoon", caption: "Poolside bungalows", width: 1920, height: 1280, available: true, tone: "lagoon", source: "Official website (ataralagoon.com)" },
  poolMain: { id: "poolMain", file: "/images/atara-lagoon-main-pool.webp", category: "pool", alt: "The long swimming pool beside the guest rooms at Atara Lagoon", caption: "The pool", width: 1400, height: 933, available: true, tone: "lagoon", source: "Tripadvisor" },
  poolPavilion: { id: "poolPavilion", file: "/images/atara-lagoon-poolside-pavilion.webp", category: "pool", alt: "The open-sided pavilion overlooking the pool at Atara Lagoon", caption: "Poolside pavilion", width: 1952, height: 1097, available: true, tone: "lagoon", source: "Official website (ataralagoon.com)" },
  poolDrinks: { id: "poolDrinks", file: "/images/atara-lagoon-poolside-juices.webp", category: "pool", alt: "Two fresh fruit juices at the edge of the pool", caption: "Juices by the pool", width: 1600, height: 1067, available: true, tone: "lagoon", source: "Official website (ataralagoon.com)" },
  garden: { id: "garden", file: "/images/atara-lagoon-garden-pool.webp", category: "garden", alt: "Tropical garden planting around the pool at Atara Lagoon", caption: "Garden and pool", width: 2000, height: 1770, available: true, tone: "forest", source: "Official website (ataralagoon.com)" },
  veranda: { id: "veranda", file: "/images/atara-lagoon-veranda-seating.webp", category: "exterior", alt: "Wooden lounge chairs along the covered veranda at Atara Lagoon", caption: "The veranda", width: 1800, height: 1200, available: true, tone: "sand", source: "cupid.travel (via Proactivitis listing)" },
  roomCabana: { id: "roomCabana", file: "/images/atara-lagoon-garden-bungalows.webp", category: "exterior", alt: "Garden bungalows facing the pool at Atara Lagoon", caption: "Garden bungalows", width: 1800, height: 1200, available: true, tone: "sand", source: "Official website (ataralagoon.com)" },
  roomStandard: { id: "roomStandard", file: "/images/atara-lagoon-double-room.webp", category: "rooms", alt: "A double room with a red-tiled floor at Atara Lagoon", caption: "Double room", width: 1600, height: 1067, available: true, tone: "sand", source: "cupid.travel (via Proactivitis listing)" },
  roomDeluxe: { id: "roomDeluxe", file: "/images/atara-lagoon-suite-double-room.webp", category: "rooms", alt: "A spacious double room with a high timber ceiling at Atara Lagoon", caption: "Double room, timber ceiling", width: 1600, height: 1066, available: true, tone: "sand", source: "Official website (ataralagoon.com)" },
  roomQuad: { id: "roomQuad", file: "/images/atara-lagoon-twin-room.webp", category: "rooms", alt: "A room with two beds and garden-facing windows at Atara Lagoon", caption: "Room with two beds", width: 1600, height: 1067, available: true, tone: "sand", source: "cupid.travel (via Proactivitis listing)" },
  roomTriple: { id: "roomTriple", file: "/images/atara-lagoon-triple-room.webp", category: "rooms", alt: "A room with a double and a single bed at Atara Lagoon", caption: "Triple room", width: 1600, height: 1066, available: true, tone: "sand", source: "Official website (ataralagoon.com)" },
  roomSuite: { id: "roomSuite", file: "/images/atara-lagoon-double-room-interior.webp", category: "rooms", alt: "Double room with wooden furniture and a wall-mounted TV at Atara Lagoon", caption: "Room interior", width: 1600, height: 1066, available: true, tone: "sand", source: "Official website (ataralagoon.com)" },
  restaurant: { id: "restaurant", file: "/images/atara-lagoon-buffet-dinner.webp", category: "restaurant", alt: "An evening buffet laid out at the Atara Lagoon restaurant", caption: "Evening buffet", width: 1600, height: 1200, available: true, tone: "dusk", source: "cupid.travel (via Proactivitis listing)" },
  bbqNight: { id: "bbqNight", file: "/images/atara-lagoon-poolside-bbq.webp", category: "restaurant", alt: "A chef at the poolside barbecue during an evening buffet at Atara Lagoon", caption: "Poolside barbecue", width: 800, height: 600, available: true, tone: "dusk", source: "Coworker.com (watermarked)" },
  breakfast: { id: "breakfast", file: "/images/atara-lagoon-breakfast-poolside.webp", category: "food", alt: "Breakfast served at a table beside the pool", caption: "Breakfast by the pool", width: 1600, height: 1200, available: true, tone: "sand", source: "cupid.travel (via Proactivitis listing)" },
  sriLankanBreakfast: { id: "sriLankanBreakfast", file: "/images/atara-lagoon-sri-lankan-breakfast.webp", category: "food", alt: "A Sri Lankan breakfast with curry, egg and bread", caption: "Sri Lankan breakfast", width: 1600, height: 1067, available: true, tone: "sand", source: "cupid.travel (via Proactivitis listing)" },
  seafood: { id: "seafood", file: "/images/atara-lagoon-seafood-rice.webp", category: "food", alt: "Seafood fried rice with prawns and crab", caption: "Seafood rice", width: 1200, height: 1600, available: true, tone: "sand", source: "cupid.travel (via Proactivitis listing)" },
  seafoodPlatter: { id: "seafoodPlatter", file: "/images/atara-lagoon-seafood-platter.webp", category: "food", alt: "A seafood rice dish with prawns and lagoon crab", caption: "From the kitchen", width: 1600, height: 1200, available: true, tone: "sand", source: "Official website (ataralagoon.com)" },
  grilledFish: { id: "grilledFish", file: "/images/atara-lagoon-grilled-fish.webp", category: "food", alt: "A whole grilled fish with lime and salad", caption: "Grilled fish", width: 1600, height: 1600, available: true, tone: "sand", source: "cupid.travel (via Proactivitis listing)" },
  salads: { id: "salads", file: "/images/atara-lagoon-salad-buffet.webp", category: "food", alt: "A spread of fresh salads on the buffet", caption: "Salads", width: 1600, height: 1200, available: true, tone: "sand", source: "cupid.travel (via Proactivitis listing)" },
  fruit: { id: "fruit", file: "/images/atara-lagoon-tropical-fruit.webp", category: "food", alt: "A bowl of fresh mango and papaya", caption: "Tropical fruit", width: 1600, height: 1067, available: true, tone: "sand", source: "cupid.travel (via Proactivitis listing)" },
  coworking: { id: "coworking", file: "/images/atara-lagoon-coworking-space.webp", category: "coworking", alt: "Two guests working on laptops at a table at Atara Lagoon", caption: "Working at Atara Lagoon", width: 1200, height: 900, available: true, tone: "forest", source: "Official website (ataralagoon.com)" },
  lagoonView: { id: "lagoonView", file: "/images/atara-lagoon-kalpitiya-lagoon-view.webp", category: "area", alt: "The calm Kalpitiya lagoon with mangroves reflected in the water", caption: "Kalpitiya lagoon", width: 2000, height: 1333, available: true, tone: "lagoon", source: "cupid.travel (via Proactivitis listing)" },
  boatTour: { id: "boatTour", file: "/images/atara-lagoon-lagoon-boat-guide.webp", category: "experiences", alt: "A boat guide in a life jacket on the Kalpitiya lagoon", caption: "Lagoon boat trip", width: 1200, height: 1600, available: true, tone: "lagoon", source: "Official website (ataralagoon.com)" },
  fishing: { id: "fishing", file: "/images/atara-lagoon-lagoon-fishing.webp", category: "experiences", alt: "A young fisherman holding his catch in the shallow lagoon", caption: "Lagoon fishing", width: 1067, height: 1600, available: true, tone: "lagoon", source: "Official website (ataralagoon.com)" },
  crabs: { id: "crabs", file: "/images/atara-lagoon-lagoon-crab-catch.webp", category: "experiences", alt: "A local fisherman holding lagoon crabs", caption: "Lagoon crabs", width: 1600, height: 1067, available: true, tone: "lagoon", source: "Official website (ataralagoon.com)" },
  dolphins: { id: "dolphins", file: "/images/atara-lagoon-kalpitiya-dolphins.webp", category: "experiences", alt: "Dolphins surfacing off the Kalpitiya coast", caption: "Dolphins off Kalpitiya", width: 1600, height: 1067, available: true, tone: "lagoon", source: "Official website (ataralagoon.com)" },
  kitesurf: { id: "kitesurf", file: "/images/atara-lagoon-kalpitiya-kitesurfing.webp", category: "experiences", alt: "A kitesurfer jumping above the water near Kalpitiya", caption: "Kitesurfing", width: 1600, height: 952, available: true, tone: "lagoon", source: "Official website (ataralagoon.com)" },
  kiteBeach: { id: "kiteBeach", file: "/images/atara-lagoon-kalpitiya-kite-beach.webp", category: "experiences", alt: "Kites over the lagoon shore at Kalpitiya", caption: "Kite season", width: 1080, height: 608, available: true, tone: "lagoon", source: "Official website (ataralagoon.com)" },
  snorkel: { id: "snorkel", file: "/images/atara-lagoon-snorkelling.webp", category: "experiences", alt: "A snorkeller swimming over a coral reef", caption: "Snorkelling", width: 1366, height: 911, available: true, tone: "lagoon", source: "Official website (ataralagoon.com)" },
  wilpattu: { id: "wilpattu", file: "/images/atara-lagoon-wilpattu-elephant.webp", category: "area", alt: "A wild elephant on a track in Wilpattu National Park", caption: "Wilpattu safari", width: 1600, height: 1067, available: true, tone: "lagoon", source: "Official website (ataralagoon.com)" },
  church: { id: "church", file: "/images/atara-lagoon-kalpitiya-dutch-church.webp", category: "area", alt: "The historic Dutch church in Kalpitiya", caption: "Dutch church, Kalpitiya", width: 550, height: 366, available: true, tone: "lagoon", source: "Official website (ataralagoon.com)" },
} satisfies Record<string, PhotoSlot>;

export type PhotoKey = keyof typeof photos;

/** Gallery order: varied rhythm of wide, tall, property and area shots. */
export const galleryOrder: PhotoKey[] = [
  "hero", "roomDeluxe", "poolPavilion", "breakfast", "veranda", "lagoonView",
  "roomStandard", "seafood", "poolCabana", "garden", "roomTriple", "restaurant",
  "poolDrinks", "boatTour", "roomCabana", "sriLankanBreakfast", "poolMain", "roomQuad",
  "grilledFish", "coworking", "bbqNight", "salads", "roomSuite", "fruit",
  "seafoodPlatter", "crabs", "dolphins", "fishing", "kitesurf", "wilpattu",
];
