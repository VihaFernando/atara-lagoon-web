import Link from "next/link";

/** Inner-page masthead: breadcrumb, title and intro on lagoon green. */
export function PageHero({
  eyebrow,
  title,
  intro,
  crumb,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  crumb: string;
}) {
  return (
    <header className="relative bg-lagoon text-ivory">
      <div className="container-x grid gap-10 pb-16 pt-32 md:grid-cols-12 md:pb-24 md:pt-40">
        <div className="md:col-span-8 lg:col-span-7">
          <nav aria-label="Breadcrumb" className="eyebrow mb-8 text-ivory/70">
            <ol className="flex gap-2">
              <li>
                <Link href="/" className="link-underline hover:text-ivory">Home</Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-ivory/90">{crumb}</li>
            </ol>
          </nav>
          <p className="eyebrow mb-5 text-sand">{eyebrow}</p>
          <h1 className="text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-7xl">{title}</h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-ivory/80 md:text-lg">{intro}</p>
        </div>
      </div>
    </header>
  );
}
