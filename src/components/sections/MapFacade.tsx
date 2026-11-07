import { business } from "@/content/business";

/**
 * Google Maps embed. Native `loading="lazy"` defers the iframe until it nears the
 * viewport, so it has no cost on initial page load.
 */
export function MapFacade() {
  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-sand md:aspect-[16/11]">
      <iframe
        title="Map showing Atara Lagoon in Kalpitiya, Sri Lanka"
        src={business.mapsEmbedUrl}
        className="absolute inset-0 h-full w-full border-0"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}
