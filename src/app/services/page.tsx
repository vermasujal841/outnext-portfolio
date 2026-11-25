import Link from "next/link";
import { ButtonLink } from "@/components/button";
import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/section";
import { ServiceGlyph } from "@/components/service-glyph";
import { serviceCategories, totalServiceCount } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services: web, mobile, SaaS, AI, automation and SEO",
  description:
    "Website and web app development, mobile apps, SaaS and custom software, AI and machine learning, business automation, and SEO, GEO and AEO from one engineering team.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        crumbs={[{ name: "Services", path: "/services" }]}
        title="Software services, from first website to AI platform"
        intro={`${totalServiceCount} services across ${serviceCategories.length} practice areas. Most projects combine several, which is why they sit under one team.`}
      >
        <nav aria-label="Service categories" className="mt-10">
          <ul className="flex flex-wrap gap-2">
            {serviceCategories.map((c) => (
              <li key={c.slug}>
                <a
                  href={`#${c.slug}`}
                  className="inline-flex rounded-[var(--radius-control)] border border-line px-3 py-1.5 t-small text-muted transition-colors hover:border-line-strong hover:text-ink"
                >
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHeader>

      <div className="container-x">
        {serviceCategories.map((c) => (
          <section
            key={c.slug}
            id={c.slug}
            aria-labelledby={`${c.slug}-title`}
            className="grid scroll-mt-24 gap-10 border-b border-line py-16 md:py-20 lg:grid-cols-12"
          >
            <div className="lg:col-span-5">
              <ServiceGlyph kind={c.glyph} className="w-24" />
              <h2 id={`${c.slug}-title`} className="t-h2 mt-6 max-w-[16ch]">
                {c.name}
              </h2>
              <p className="mt-4 max-w-[46ch] text-muted">{c.summary}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={`/services/${c.slug}`} variant="secondary">
                  Explore services<span className="sr-only">: {c.name}</span>
                </ButtonLink>
                <ButtonLink href={`/contact?type=${c.slug}`} variant="ghost">
                  Discuss your project
                </ButtonLink>
              </div>
            </div>
            <div className="lg:col-span-7">
              <p className="t-label">{c.services.length} services</p>
              <ul className="mt-4 grid border-t border-line sm:grid-cols-2 sm:gap-x-8">
                {c.services.map((s) => (
                  <li key={s} className="border-b border-line py-3 text-[0.9875rem]">
                    {s}
                  </li>
                ))}
              </ul>
              <p className="mt-6 t-small text-faint">
                Typical stack: {c.technologies.slice(0, 5).join(", ")}.{" "}
                <Link href={`/services/${c.slug}`} className="text-muted underline decoration-line-strong underline-offset-4 hover:text-ink">
                  Full details
                </Link>
              </p>
            </div>
          </section>
        ))}
      </div>

      <CtaBand
        title="Not sure which service you need?"
        text="Describe the problem instead. We'll suggest the right mix of software, AI and automation, and tell you what to skip."
        primary={{ href: "/contact", label: "Get a consultation" }}
      />
    </>
  );
}
