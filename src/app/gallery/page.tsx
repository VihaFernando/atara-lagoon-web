import type { Metadata } from "next";
import Link from "next/link";
import { Gallery } from "@/components/sections/Gallery";
import { JsonLd } from "@/components/ui/primitives";
import { ContactBand } from "@/components/sections/shared";
import { graph, pageMetadata, webPageSchema } from "@/lib/seo";

const title = "Gallery";
const description = "Photographs of Atara Lagoon in Kalpitiya, Sri Lanka: the pool and garden, rooms, restaurant and the lagoon.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/gallery" });

export default function GalleryPage() {
  return (
    <>
      <JsonLd data={graph(webPageSchema("/gallery", title, description, [{ name: "Gallery", path: "/gallery" }]))} />
      <header className="bg-lagoon pb-16 pt-32 text-ivory md:pb-20 md:pt-40">
        <div className="container-x grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <nav aria-label="Breadcrumb" className="eyebrow mb-8 text-ivory/60">
              <ol className="flex gap-2">
                <li><Link href="/" className="link-underline hover:text-ivory">Home</Link></li>
                <li aria-hidden>/</li>
                <li aria-current="page" className="text-ivory/90">Gallery</li>
              </ol>
            </nav>
            <h1 className="text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-7xl">
              Pool, garden <em className="text-sand">&amp;</em> lagoon
            </h1>
          </div>
          <p className="max-w-md text-ivory/80 md:col-span-4 md:col-start-9">
            A look around Atara Lagoon. Select any image to view it larger, then use the arrow keys or swipe to move
            through them.
          </p>
        </div>
      </header>
      <section aria-label="Photo gallery" className="container-x py-12 md:py-20">
        <Gallery />
      </section>
      <ContactBand />
    </>
  );
}
