import Link from "next/link";
import { ButtonLink } from "@/components/button";
import { CtaBand } from "@/components/cta-band";
import { FaqList } from "@/components/faq-list";
import { JsonLd } from "@/components/json-ld";
import { PendingBlock } from "@/components/pending";
import { ProcessTimeline } from "@/components/process-timeline";
import { ProjectRow } from "@/components/project-card";
import { SectionHeader } from "@/components/section";
import { ServicesExplorer } from "@/components/services-explorer";
import { SystemDiagram } from "@/components/system-diagram";
import { TeamCard, isMemberVisible } from "@/components/team-card";
import { credibility, faqs, hero, pillars, process, stack, testimonials } from "@/content/company";
import { industries } from "@/content/industries";
import { projects } from "@/content/projects";
import { serviceCategories, totalServiceCount } from "@/content/services";
import { company, showPlaceholders } from "@/content/site";
import { team } from "@/content/team";
import { faqJsonLd, pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: `${company.name}: software, AI and product engineering company`,
  description: company.description,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  const featured = projects.filter((p) => p.featured && (p.ready || showPlaceholders)).slice(0, 3);
  const members = team.filter(isMemberVisible);
  const answeredFaqs = faqs.filter((f): f is { q: string; a: string } => Boolean(f.a));
  const words = hero.headline.split(" ");

  return (
    <>
      <JsonLd data={faqJsonLd(answeredFaqs)} />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="bg-grid mask-fade pointer-events-none absolute inset-0 opacity-70" />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[-280px] h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(54,209,255,0.10),transparent)]"
        />
        <div className="container-x relative grid gap-14 pt-12 pb-20 md:pt-20 lg:grid-cols-12 lg:gap-10 lg:pt-24 lg:pb-20">
          <div className="lg:col-span-7 lg:pt-6">
            <h1 className="t-display max-w-[13ch]" aria-label={hero.headline}>
              {words.map((w, i) => (
                <span
                  key={`${w}-${i}`}
                  aria-hidden
                  className="hero-word inline-block"
                  style={{ ["--d" as string]: `${i * 0.045}s` }}
                >
                  {w}
                  {i < words.length - 1 ? " " : ""}
                </span>
              ))}
            </h1>
            <p className="hero-fade t-lead mt-7 max-w-[54ch]">{hero.intro}</p>
            <div className="hero-fade mt-9 flex flex-wrap gap-3" style={{ ["--d" as string]: "0.1s" }}>
              <ButtonLink href="/contact" size="lg">
                Start a project
              </ButtonLink>
              <ButtonLink href="/work" variant="secondary" size="lg">
                Explore our work
              </ButtonLink>
            </div>
          </div>
          <div className="lg:col-span-5">
            <SystemDiagram />
          </div>
        </div>
      </section>

      {/* Credibility */}
      <section aria-label="About Outnext" className="border-y border-line bg-surface/30">
        <div className="container-x grid md:grid-cols-3">
          {credibility.map((c, i) => (
            <div
              key={c.label}
              className={`py-7 md:py-9 ${i > 0 ? "border-t border-line md:border-t-0 md:border-l md:pl-8" : ""} ${i < 2 ? "md:pr-8" : ""}`}
            >
              <p className="t-label">{c.label}</p>
              <p className="mt-2 text-[1.0625rem] leading-snug text-ink">{c.value}</p>
            </div>
          ))}
        </div>
        {showPlaceholders ? (
          <div className="container-x pb-8">
            <PendingBlock
              label="client logos and verified numbers"
              hint="Add client logos (with permission) and real figures such as projects delivered. Until then this strip shows only verifiable facts."
              className="py-4"
            />
          </div>
        ) : null}
      </section>

      {/* Services */}
      <section className="container-x section" aria-labelledby="services-title">
        <SectionHeader
          id="services-title"
          title="One team for the whole product"
          intro={`From a landing page to an AI-powered platform: ${serviceCategories.length} practice areas and ${totalServiceCount} services, built to one engineering standard.`}
          aside={
            <Link href="/services" className="t-small text-ink underline decoration-line-strong underline-offset-4 hover:text-signal">
              See every service in detail
            </Link>
          }
        />
        <div className="mt-12">
          <ServicesExplorer categories={serviceCategories} />
        </div>
      </section>

      {/* Featured work */}
      {featured.length ? (
        <section className="border-t border-line" aria-labelledby="work-title">
          <div className="container-x section">
            <SectionHeader
              id="work-title"
              title="Selected work"
              intro="Each case study covers the problem, what we built, the stack behind it and what changed afterwards."
              aside={<ButtonLink href="/work" variant="secondary">Explore our work</ButtonLink>}
            />
            <div className="mt-14 space-y-16 md:space-y-24">
              {featured.map((p, i) => (
                <ProjectRow key={p.slug} project={p} index={i} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Technology stack */}
      <section className="border-t border-line bg-surface/30" aria-labelledby="stack-title">
        <div className="container-x section grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="stack-title" className="t-h2">
              The technology we build with
            </h2>
            <p className="t-lead mt-4 max-w-[40ch]">
              Chosen per project for reliability and long-term maintainability, not novelty.
            </p>
          </div>
          <dl className="border-t border-line lg:col-span-8">
            {stack.map((g) => (
              <div key={g.group} className="grid gap-2 border-b border-line py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                <dt className="t-small text-faint">{g.group}</dt>
                <dd className="flex flex-wrap gap-x-5 gap-y-1.5 text-ink">
                  {g.items.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Why Outnext */}
      <section className="container-x section" aria-labelledby="why-title">
        <SectionHeader
          id="why-title"
          title="Why work with Outnext"
          intro="We're built to own a product end to end, not to hand off pieces of it."
        />
        <div className="mt-12 grid border-t border-l border-line sm:grid-cols-2">
          {pillars.map((p) => (
            <div key={p.title} className="border-r border-b border-line p-7 md:p-10">
              <h3 className="t-h3">{p.title}</h3>
              <p className="mt-3 max-w-[46ch] text-muted">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-line" aria-labelledby="process-title">
        <div className="container-x section">
          <SectionHeader
            id="process-title"
            title="How a project runs"
            intro="The same five stages for a website or an enterprise platform. Only the depth changes."
          />
          <div className="mt-14">
            <ProcessTimeline steps={process} />
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="border-t border-line bg-surface/30" aria-labelledby="industries-title">
        <div className="container-x section">
          <SectionHeader
            id="industries-title"
            title="Industries we build for"
            intro="The same engineering, shaped around how each industry works."
            aside={
              <Link href="/industries" className="t-small text-ink underline decoration-line-strong underline-offset-4 hover:text-signal">
                How we help each industry
              </Link>
            }
          />
          <ul className="mt-12 grid border-t border-line md:grid-cols-2 md:gap-x-12">
            {industries.map((ind) => (
              <li key={ind.slug} className="border-b border-line">
                <Link href={`/industries#${ind.slug}`} className="group flex items-baseline justify-between gap-6 py-5">
                  <span className="text-[1.0625rem] font-medium tracking-[-0.01em] transition-colors group-hover:text-signal">
                    {ind.name}
                  </span>
                  <span className="hidden t-small text-faint sm:block">{ind.solutions.slice(0, 2).join(", ")}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Team */}
      <section className="container-x section" aria-labelledby="team-title">
        <SectionHeader
          id="team-title"
          title="The people building it"
          intro="Engineers working across AI, full-stack, backend and cloud infrastructure."
          aside={<ButtonLink href="/team" variant="secondary">Meet the team</ButtonLink>}
        />
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {members.map((m) => (
            <TeamCard key={m.id} member={m} compact />
          ))}
        </div>
      </section>

      {/* Testimonials: only real ones, never invented */}
      {testimonials.length ? (
        <section className="border-t border-line" aria-labelledby="testimonials-title">
          <div className="container-x section">
            <h2 id="testimonials-title" className="t-h2">
              What clients say
            </h2>
            <div className="mt-12 grid gap-10 md:grid-cols-2">
              {testimonials.map((t) => (
                <figure key={t.name} className="border-l border-signal/60 pl-6">
                  <blockquote className="text-[1.25rem] leading-snug tracking-[-0.01em]">“{t.quote}”</blockquote>
                  <figcaption className="mt-4 t-small text-muted">
                    {t.name}, {t.role}, {t.company}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : showPlaceholders ? (
        <section className="border-t border-line" aria-label="Client testimonials (pending)">
          <div className="container-x section-tight">
            <PendingBlock
              label="client testimonials"
              hint="This section appears only once real testimonials are provided, each with the client's name, role, company and permission. It is hidden automatically when placeholders are switched off."
            />
          </div>
        </section>
      ) : null}

      {/* FAQ */}
      <section className="border-t border-line" aria-labelledby="faq-title">
        <div className="container-x section grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="faq-title" className="t-h2">
              Common questions
            </h2>
            <p className="t-lead mt-4 max-w-[36ch]">
              Anything else? <Link href="/contact" className="text-ink underline decoration-line-strong underline-offset-4 hover:text-signal">Ask us directly</Link>.
            </p>
          </div>
          <div className="lg:col-span-8">
            <FaqList items={faqs} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
