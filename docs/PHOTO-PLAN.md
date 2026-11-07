# Photography plan

## Status

33 genuine photographs are now in use (see `/image-inventory.md` for sources). Usage permission is still pending. The labelled placeholder remains as a fallback for any slot set to `available: false`.

## How to add or replace a photo

1. Get the original from the property, along with **written permission for web and marketing use**.
2. Export as WebP (or AVIF), sRGB, quality around 80. Long edge: 2400px for hero/wide shots, 1600px for the rest.
3. Save to `public/images/` using the exact filename below.
4. In `src/content/images.ts`, set `available: true` and correct `width`/`height` for that slot.
5. Remove `lagoonView`/`sunset` slots if no lagoon photos are supplied, or replace them with licensed images credited to their source. Never present those as photos of the property itself.

Next.js automatically generates responsive AVIF/WebP sizes. The hero is loaded with high priority, and everything else is lazy-loaded with fixed aspect ratios (no layout shift).

## Still wanted from the property

Original high-resolution shots of: each room category (labelled), the cabanas, the restaurant interior, the lagoon at the hotel's own jetty or shore, the boat trip, and the entrance and signage.
