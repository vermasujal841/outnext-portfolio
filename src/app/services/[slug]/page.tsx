import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/button";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { PageHeader } from "@/components/section";
import { ServiceGlyph } from "@/components/service-glyph";
import { industries } from "@/content/industries";
import { getServiceCategory, serviceCategories } from "@/content/services";
import { pageMetadata, serviceJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return serviceCategories.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = getServiceCategory(slug);
  if (!c) return {};
  return pageMetadata({ title: c.title, description: c.summary, path: `/services/${c.slug}` });
}

export default async function ServiceCategoryPage({ params }: Props) {
  const { slug } = await params;
  const c = getServiceCategory(slug);
  if (!c) notFound();

  const relatedIndustries = industries.filter((i) => i.services.includes(c.slug));
  const others = serviceCategories.filter((o) => o.slug !== c.slug);

  return (
    <>
      <JsonLd data={serviceJsonLd({ name: c.title, description: c.overview, path: `/services/${c.slug}`, services: c.services })} />

      <PageHeader
        crumbs={[
          { name: "Services", path: "/services" },
          { name: c.name, path: `/services/${c.slug}` },
        ]}
        title={c.title}
        intro={c.overview}
      >
        <div className="mt-9 flex flex-wrap gap-3">
          <ButtonLink href={`/contact?type=${c.slug}`} size="lg">
            Discuss your project
          </ButtonLink>
          <ButtonLink href="/work" variant="secondary" size="lg">
            Explore our work
          </ButtonLink>
        </div>
      </PageHeader>

      {/* Problems + deliverables */}
      <section className="container-x section grid gap-14 lg:grid-cols-12" aria-label="Problems and deliverables">
        <div className="lg:col-span-5">
          <h2 className="t-h3">Problems this solves</h2>
          <ul className="mt-6 border-t border-line">
            {c.problems.map((p) => (
              <li key={p} className="border-b border-line py-4 text-muted">
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <h2 className="t-h3">What we deliver</h2>
          <ul className="mt-6 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            {c.deliverables.map((d) => (
              <li key={d} className="border-l border-signal/50 pl-4 text-ink/90">
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* All services in this category */}
      <section className="border-y border-line bg-surface/30" aria-labelledby="included-title">
        <div className="container-x section-tight grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <ServiceGlyph kind={c.glyph} className="w-28" />
            <h2 id="included-title" className="t-h2 mt-6">
              Services in this area
            </h2>
          </div>
          <ul className="grid border-t border-line sm:grid-cols-2 sm:gap-x-10 lg:col-span-8">
            {c.services.map((s) => (
              <li key={s} className="border-b border-line py-3.5">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Use cases */}
      <section className="container-x section" aria-labelledby="usecases-title">
        <h2 id="usecases-title" className="t-h2">
          Where it&apos;s used
        </h2>
        <div className="mt-10 grid border-t border-l border-line md:grid-cols-2">
          {c.useCases.map((u) => (
            <div key={u.title} className="border-r border-b border-line p-7 md:p-9">
              <h3 className="text-[1.1875rem] font-medium tracking-[-0.015em]">{u.title}</h3>
              <p className="mt-2 text-muted">{u.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Technologies + industries */}
      <section className="border-t border-line" aria-label="Technologies and industries">
        <div className="container-x section-tight grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 className="t-h3">Technologies</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {c.technologies.map((t) => (
                <li key={t} className="rounded-[var(--radius-chip)] border border-line px-2.5 py-1 t-small text-muted">
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <h2 className="t-h3">Relevant industries</h2>
            <ul className="mt-5 space-y-2">
              {relatedIndustries.map((i) => (
                <li key={i.slug}>
                  <Link href={`/industries#${i.slug}`} className="text-muted underline decoration-line underline-offset-4 hover:text-ink">
                    {i.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CtaBand
        title={c.ctaTitle}
        text="Share what you have in mind. We'll come back with questions, a suggested approach and a rough scope."
        primary={{ href: `/contact?type=${c.slug}`, label: "Discuss your project" }}
      />

      {/* Other services */}
      <nav aria-label="Other services" className="container-x pb-20">
        <p className="t-label">Other services</p>
        <ul className="mt-4 grid border-t border-line sm:grid-cols-2 lg:grid-cols-5">
          {others.map((o) => (
            <li key={o.slug} className="border-b border-line">
              <Link href={`/services/${o.slug}`} className="block py-4 pr-4 text-muted hover:text-ink">
                {o.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
