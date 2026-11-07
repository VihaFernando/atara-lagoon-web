import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { DiningPreview, ExperiencesPreview, GalleryPreview, Intro, PoolFeature, Reputation, RoomsPreview } from "@/components/sections/home";
import { ContactBand, FaqSection, LocationSection } from "@/components/sections/shared";
import { CoworkingTeaser } from "@/components/sections/coworking";
import { JsonLd } from "@/components/ui/primitives";
import { faqs } from "@/content/offerings";
import { business } from "@/content/business";
import { faqSchema, graph, pageMetadata, webPageSchema } from "@/lib/seo";

const title = "Atara Lagoon | Lagoon-side Resort in Kalpitiya, Sri Lanka";
const description =
  "A small lagoon-side resort in Kalpitiya, Sri Lanka, with garden rooms, an outdoor pool, an on-site restaurant and lagoon boat trips. Enquire for availability.";

export const metadata: Metadata = { ...pageMetadata({ title, description, path: "/" }), title: { absolute: title } };

export default function HomePage() {
  return (
    <>
      <JsonLd data={graph(webPageSchema("/", business.name, description, []).slice(0, 1), faqSchema(faqs))} />
      <Hero />
      <Intro />
      <RoomsPreview />
      <PoolFeature />
      <DiningPreview />
      <ExperiencesPreview />
      <CoworkingTeaser />
      <GalleryPreview />
      <Reputation />
      <LocationSection />
      <FaqSection items={faqs} />
      <ContactBand />
    </>
  );
}
