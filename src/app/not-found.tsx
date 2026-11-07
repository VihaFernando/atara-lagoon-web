import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/primitives";

export const metadata: Metadata = { title: "Page not found", robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-end bg-lagoon pb-20 pt-40 text-ivory">
      <div className="container-x">
        <p className="eyebrow text-sand">404</p>
        <h1 className="mt-5 max-w-2xl text-5xl leading-tight md:text-7xl">This page has drifted off.</h1>
        <p className="mt-6 max-w-md text-ivory/75">The page you were looking for doesn&apos;t exist or has moved.</p>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/" variant="light">Back to home</ButtonLink>
          <ButtonLink href="/contact" variant="ghost">Contact us</ButtonLink>
        </div>
      </div>
    </section>
  );
}
