# Atara Lagoon — Website

Production website for **Atara Lagoon**, a small lagoon-side resort in Kalpitiya, Sri Lanka.
Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Motion · React Hook Form + Zod · Lucide.

## Quick start

```bash
npm install
cp .env.example .env.local   # then fill in values
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
npm run typecheck
```

Requires Node 20+.

## Architecture

```
src/
  app/                    Routes (all statically prerendered except /api/enquiry)
    page.tsx              Home
    accommodation/ restaurant/ experiences/ gallery/ about/ contact/
    api/enquiry/route.ts  Booking-enquiry endpoint (validation, honeypot, rate limit, Resend)
    sitemap.ts robots.ts  llms.txt/route.ts  opengraph-image.tsx  icon.svg
  content/                SINGLE SOURCE OF TRUTH for business facts
    business.ts           Identity, contact, address, times, facilities, verification status
    offerings.ts          Rooms, menu (+ price gate), experiences, FAQs
    images.ts             Photo registry (slots, filenames, alt text, availability)
  components/
    layout/               Header (sticky, mobile menu), Footer, PageHero, Providers
    sections/             Page sections (Hero, home sections, MenuBrowser, Gallery+lightbox, EnquiryForm, MapFacade)
    ui/                   Photo (image or labelled placeholder), Reveal/MaskReveal/Parallax, primitives
  lib/
    seo.ts                Navigation, per-page metadata, JSON-LD builders
    enquiry.ts            Zod schema shared by client and server
```

Static content is rendered on the server, so all key information is in the initial HTML.
Client JavaScript is used only for the interactive parts: the header, gallery, menu tabs, form, map and scroll effects.
Hero and header entrance animations are pure CSS, so they don't delay LCP. All motion respects `prefers-reduced-motion`.

## Environment variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | yes (prod) | Canonical origin, e.g. `https://ataralagoon.com` |
| `NEXT_PUBLIC_ALLOW_INDEXING` | launch | `true` lets search engines index the site. Anything else (default) sends noindex, disallows robots.txt and empties the sitemap, so demos stay out of Google |
| `RESEND_API_KEY` | optional | Enables email delivery of enquiries via Resend |
| `ENQUIRY_TO_EMAIL` | with Resend | Inbox that receives enquiries |
| `ENQUIRY_FROM_EMAIL` | with Resend | Verified sender, e.g. `Atara Lagoon <enquiries@ataralagoon.com>` |
| `NEXT_DIST_DIR` | optional | Alternative build folder (local audits) |

**Enquiry workflow:** the form is validated on the client and again on the server. With Resend configured, the enquiry is emailed and the guest sees a confirmation. Without it, or if delivery fails, the guest is offered a pre-filled WhatsApp or email hand-off, so no enquiry is lost. The site never shows a booking as confirmed.
The rate limit (5 per 10 min per IP) is kept in memory. On multi-instance hosting, move it to a shared store such as Upstash Redis.

## Deployment

Vercel is recommended: import the repo, set the environment variables, and deploy. Any Node host works with `npm run build && npm start`.
After launch:
1. Submit `https://ataralagoon.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
2. Validate structured data with the Google Rich Results Test and validator.schema.org.
3. Make the Google Business Profile's name, address and phone match the website exactly.

## SEO & AI discoverability

- Unique title, description, canonical, Open Graph and Twitter tags on every page (`pageMetadata` in `lib/seo.ts`).
- JSON-LD `@graph`: `Hotel` (sitewide), `WebSite`, a `WebPage` and `BreadcrumbList` on each page, and `FAQPage` on Home, matching the visible FAQ.
  Deliberately left out until verified: street number, geo-coordinates, `priceRange`, `Offer`, `aggregateRating`, opening hours and `alternateName`.
- `sitemap.xml` lists the 7 canonical pages. `robots.txt` allows all crawlers, including AI search crawlers, and disallows only `/api/`.
- `/llms.txt` is generated from the same content files, so it can't drift from the site.
- Semantic landmarks, one H1 per page, and descriptive internal links.

Lighthouse (mobile, local production build): Performance 85–95 · Accessibility 96–100 · Best Practices 96–100 · SEO 100 · CLS 0.

## ⚠️ Business information still requiring confirmation

Everything below is held in `src/content/*` with a `status` and is **not published** (or is worded neutrally) until confirmed:

- [ ] Street number: **111** (Ceylon Pages, DayOuting, Google) or **631A** (Destinia). The site shows "Anawasala Road" only. *(Map pin and coordinates: done, from the client's Google Maps embed.)*
- [ ] Whether "OYO 255 Atara Lagoon" and "Kalpitiya Lagoon Resort" are former or alternate names
- [ ] Current room inventory, cabana count, occupancy, bed types, sizes (16/17/22 m² unpublished) and amenities per room
- [ ] Room rates, the LKR 17,000 two-night package, and the ≈US$52/night estimate (none published)
- [ ] Menu and prices. Prices are hidden behind `SHOW_MENU_PRICES = false` in `offerings.ts`. **Vegetable Soup at LKR 150** is flagged as a likely error.
- [ ] Restaurant opening hours, and whether OrderNow ordering is active
- [ ] Lagoon boat trips: operator (hotel or partner), price, duration, safety. Visit Kalpitiya's tariffs are **not** Atara Lagoon's and are not used.
- [ ] Other activities: operator, licensing, prices
- [ ] Airport transfers: availability and rates
- [ ] Check-in time (1:30 or 2:00 PM). Check-out 12:00 PM is shown.
- [ ] Payment methods, taxes, service charge, deposits and cancellation policy
- [ ] Child, extra-bed, pet and group policies
- [ ] **Written permission for the 33 photographs in use.** They were collected from ataralagoon.com and public listings. See `image-inventory.md` for every source URL. The Coworker barbecue photo is watermarked and should be replaced.

When a fact is confirmed, update its value, set `status: "verified"` and redeploy.
