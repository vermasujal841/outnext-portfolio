import { ButtonLink } from "@/components/button";
import { CtaBand } from "@/components/cta-band";
import { Pending } from "@/components/pending";
import { PageHeader } from "@/components/section";
import { TeamCard, isMemberVisible } from "@/components/team-card";
import { about, pillars } from "@/content/company";
import { company, showPlaceholders } from "@/content/site";
import { team } from "@/content/team";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Outnext",
  description:
    "Outnext is a software engineering and product development company in Rajasthan, India, building web platforms, mobile apps, SaaS, AI and automation for growing businesses.",
  path: "/about",
});

export default function AboutPage() {
  const members = team.filter(isMemberVisible).slice(0, 5);

  return (
    <>
      <PageHeader
        crumbs={[{ name: "About", path: "/about" }]}
        title="A software company built to own the whole product"
        intro="Outnext conceptualizes, designs, develops, deploys and maintains digital products, from a business website to SaaS platforms, AI applications and enterprise systems."
      />

      {/* Introduction */}
      <section className="container-x section grid gap-12 lg:grid-cols-12" aria-labelledby="intro-title">
        <h2 id="intro-title" className="t-h2 lg:col-span-4">
          Who we are
        </h2>
        <div className="prose-ox lg:col-span-7 lg:col-start-6">
          {about.intro ? (
            <p>{about.intro}</p>
          ) : (
            <>
              <Pending label="company introduction in your words (2–3 sentences)" />
              <p className="mt-5">
                <strong>{company.legalName}</strong> is a registered company in Rajasthan, India (CIN{" "}
                <span className="font-mono text-[0.9375rem]">{company.cin}</span>). We are a software engineering and
                product development company: we build technology products and solve business problems through software,
                rather than offering marketing or design alone.
              </p>
            </>
          )}
        </div>
      </section>

      {/* Vision + mission */}
      <section className="border-y border-line bg-surface/30" aria-label="Vision and mission">
        <div className="container-x grid md:grid-cols-2">
          <div className="py-12 md:py-16 md:pr-12">
            <h2 className="t-label">Our vision</h2>
            <p className="mt-4 text-[1.5rem] leading-snug tracking-[-0.02em] md:text-[1.75rem]">{about.vision}</p>
          </div>
          <div className="border-t border-line py-12 md:border-t-0 md:border-l md:py-16 md:pl-12">
            <h2 className="t-label">Our mission</h2>
            <p className="mt-4 text-[1.5rem] leading-snug tracking-[-0.02em] md:text-[1.75rem]">{about.mission}</p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="container-x section" aria-labelledby="philosophy-title">
        <h2 id="philosophy-title" className="t-h2 max-w-[20ch]">
          Our philosophy
        </h2>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {about.philosophy.map((p) => (
            <div key={p.title} className="border-t border-line-strong pt-6">
              <h3 className="t-h3">{p.title}</h3>
              <p className="mt-3 text-muted">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Engineering approach */}
      <section className="border-t border-line" aria-labelledby="engineering-title">
        <div className="container-x section grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="engineering-title" className="t-h2">
              How we approach engineering
            </h2>
            <p className="t-lead mt-4 max-w-[42ch]">
              Good software is cheaper to change than bad software. These are the practices we hold every project to.
            </p>
          </div>
          <ul className="border-t border-line lg:col-span-7">
            {about.engineering.map((e) => (
              <li key={e} className="border-b border-line py-5 text-[1.0625rem]">
                {e}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Journey */}
      <section className="border-t border-line bg-surface/30" aria-labelledby="journey-title">
        <div className="container-x section-tight grid gap-10 lg:grid-cols-12">
          <h2 id="journey-title" className="t-h2 lg:col-span-4">
            Our journey
          </h2>
          <ol className="lg:col-span-8">
            {about.journey.map((j) => (
              <li key={j.text} className="grid grid-cols-[5rem_1fr] gap-6 border-t border-line py-5">
                <span className="tabular-nums text-signal">{j.year}</span>
                <span>{j.text}</span>
              </li>
            ))}
            {showPlaceholders ? (
              <li className="grid grid-cols-[5rem_1fr] gap-6 border-t border-line py-5">
                <span className="text-faint">—</span>
                <span>
                  <Pending label="further milestones (real dates and events only)" />
                </span>
              </li>
            ) : null}
          </ol>
        </div>
      </section>

      {/* Values */}
      <section className="container-x section" aria-labelledby="values-title">
        <h2 id="values-title" className="t-h2">
          What we value
        </h2>
        <dl className="mt-12 grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-4">
          {about.values.map((v) => (
            <div key={v.title} className="border-r border-b border-line p-7">
              <dt className="text-[1.1875rem] font-medium tracking-[-0.015em]">{v.title}</dt>
              <dd className="mt-2 text-muted">{v.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Why work with us */}
      <section className="border-t border-line" aria-labelledby="why-title">
        <div className="container-x section grid gap-12 lg:grid-cols-12">
          <h2 id="why-title" className="t-h2 lg:col-span-4">
            Why businesses work with us
          </h2>
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-8">
            {pillars.map((p) => (
              <div key={p.title}>
                <h3 className="text-[1.1875rem] font-medium tracking-[-0.015em]">{p.title}</h3>
                <p className="mt-2 text-muted">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="border-t border-line" aria-labelledby="team-title">
        <div className="container-x section">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 id="team-title" className="t-h2">
              The team
            </h2>
            <ButtonLink href="/team" variant="secondary">
              Meet the team
            </ButtonLink>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {members.map((m) => (
              <TeamCard key={m.id} member={m} compact />
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
