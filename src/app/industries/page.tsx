import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/section";
import { industries } from "@/content/industries";
import { getServiceCategory } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Industries we build for",
  description:
    "How Outnext's software, AI and automation help startups, education, healthcare, e-commerce, hospitality, real estate, logistics, manufacturing, professional services and finance.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Industries", path: "/industries" }]}
        title="Industries we build for"
        intro="The engineering is the same. The problems aren't. Here's where software, AI and automation make the biggest difference in each industry."
      />

      <div className="container-x pb-8">
        {industries.map((ind) => (
          <section
            key={ind.slug}
            id={ind.slug}
            aria-labelledby={`${ind.slug}-title`}
            className="grid scroll-mt-24 gap-8 border-b border-line py-12 md:py-14 lg:grid-cols-12"
          >
            <h2 id={`${ind.slug}-title`} className="t-h3 lg:col-span-4">
              {ind.name}
            </h2>
            <div className="lg:col-span-5">
              <p className="text-muted">{ind.summary}</p>
              <p className="mt-5 t-small text-faint">
                Related services:{" "}
                {ind.services.map((s, i) => {
                  const c = getServiceCategory(s);
                  if (!c) return null;
                  return (
                    <span key={s}>
                      <Link href={`/services/${s}`} className="text-muted underline decoration-line underline-offset-4 hover:text-ink">
                        {c.name}
                      </Link>
                      {i < ind.services.length - 1 ? ", " : ""}
                    </span>
                  );
                })}
              </p>
            </div>
            <ul className="space-y-2 lg:col-span-3" aria-label={`Typical solutions for ${ind.name}`}>
              {ind.solutions.map((s) => (
                <li key={s} className="flex items-baseline gap-3 t-small">
                  <span aria-hidden className="mt-[0.5em] size-1 shrink-0 rounded-full bg-signal/70" />
                  {s}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <CtaBand
        title="Don't see your industry?"
        text="Most business problems look alike under the surface. Tell us how your business runs and we'll show you where software fits."
        primary={{ href: "/contact", label: "Discuss your idea" }}
      />
    </>
  );
}
