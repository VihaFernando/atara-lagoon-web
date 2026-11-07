import { SITE_URL, business, addressLine } from "@/content/business";
import { rooms, menu, experiences, coworking } from "@/content/offerings";

export const dynamic = "force-static";

/** Concise, accurate summary for LLM-based tools. Generated from the same content as the site. */
export function GET() {
  const body = `# ${business.name}

> ${business.description}

Official website: ${SITE_URL}/
Location: ${addressLine} (${business.address.district}, ${business.address.region})
Phone / WhatsApp: ${business.contact.phoneDisplay}
Email: ${business.contact.email}
Facebook: ${business.social.facebook}

## Main pages
- [Accommodation](${SITE_URL}/accommodation): room categories in Kalpitiya
- [Restaurant](${SITE_URL}/restaurant): on-site restaurant and menu
- [Experiences](${SITE_URL}/experiences): lagoon boat trips and things to do around Kalpitiya
- [Coworking](${SITE_URL}/coworking): remote working at the resort
- [Gallery](${SITE_URL}/gallery)
- [About](${SITE_URL}/about)
- [Contact & booking enquiry](${SITE_URL}/contact)

## Accommodation (as listed by booking platforms; confirm on enquiry)
${rooms.map((r) => `- ${r.name}: ${r.listedGuests.toLowerCase()}`).join("\n")}

## Facilities
${business.facilitiesVerified.map((f) => `- ${f}`).join("\n")}

## Restaurant menu categories
${menu.map((c) => `- ${c.name}: ${c.items.map((i) => i.name).join(", ")}`).join("\n")}
Prices are given on request; current prices are not published online.

## Experiences
${experiences.map((e) => `- ${e.name}`).join("\n")}
Most water activities are run by independent local operators; the hotel can help arrange them.

## Remote working
- Wi-Fi throughout the resort, advertised ${coworking.speedAdvertised}, ${coworking.wifiNetworks} separate networks (per the resort's own site).
- Work spots: small front office, main dining area, or a desk set up in the guest's room.
- There is no dedicated coworking space yet; no coworking passes or prices are published.

## Practical
- Check-out: 12:00 PM. Check-in: early afternoon (confirm with the property).
- Rates and availability: by enquiry only. Online enquiries are not confirmed reservations.
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
