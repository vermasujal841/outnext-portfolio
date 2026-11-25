import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/cta-band";
import { Pending, PendingBlock } from "@/components/pending";
import { ProjectVideo } from "@/components/project-video";
import { PageHeader } from "@/components/section";
import { getProject, projects } from "@/content/projects";
import { getServiceCategory } from "@/content/services";
import { showPlaceholders } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return projects.filter((p) => p.ready || showPlaceholders).map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return pageMetadata({
    title: p.title ? `${p.title} case study` : "Case study (pending)",
    description: p.summary ?? "Outnext case study.",
    path: `/work/${p.slug}`,
    noindex: !p.ready,
  });
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-line py-10 md:grid-cols-12 md:gap-10 md:py-14">
      <h2 className="t-h3 md:col-span-4">{title}</h2>
      <div className="text-muted md:col-span-8">{children}</div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p || (!p.ready && !showPlaceholders)) notFound();

  const index = projects.indexOf(p);
  const category = p.category ? getServiceCategory(p.category) : undefined;
  const meta: { label: string; value: React.ReactNode }[] = [
    { label: "Client", value: p.client ?? <Pending label="client" /> },
    { label: "Industry", value: p.industry ?? <Pending label="industry" /> },
    { label: "Project type", value: category?.name ?? p.projectType ?? <Pending label="type" /> },
    { label: "Year", value: p.year ?? <Pending label="year" /> },
  ];

  return (
    <>
      <PageHeader
        crumbs={[
          { name: "Work", path: "/work" },
          { name: p.title ?? `Project ${index + 1}`, path: `/work/${p.slug}` },
        ]}
        title={p.title ?? `Project ${index + 1}`}
        intro={p.summary ?? undefined}
      >
        {!p.title ? (
          <div className="mt-5 flex flex-wrap gap-2">
            <Pending label="project name" />
            <Pending label="summary" />
          </div>
        ) : null}
        <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-6 md:grid-cols-5">
          {meta.map((m) => (
            <div key={m.label}>
              <dt className="t-label">{m.label}</dt>
              <dd className="mt-1.5 t-small text-ink">{m.value}</dd>
            </div>
          ))}
          <div hidden={!p.url && !showPlaceholders}>
            <dt className="t-label">Live site</dt>
            <dd className="mt-1.5 t-small">
              {p.url ? (
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-ink underline decoration-line-strong underline-offset-4 hover:text-signal">
                  Visit project
                </a>
              ) : (
                <Pending label="URL" />
              )}
            </dd>
          </div>
        </dl>
      </PageHeader>

      <div className="container-x">
        <div
          className={`relative my-12 overflow-hidden rounded-[var(--radius-panel)] border border-line bg-surface md:my-16 ${p.video ? "" : "aspect-[16/9]"}`}
          style={p.video ? { aspectRatio: `${p.video.width} / ${p.video.height}` } : undefined}
        >
          {p.video ? (
            <ProjectVideo
              mp4={p.video.mp4}
              webm={p.video.webm}
              poster={p.cover ?? undefined}
              label={`${p.title} website walkthrough`}
              className="absolute inset-0 size-full object-cover"
            />
          ) : p.cover ? (
            <Image src={p.cover} alt={`${p.title} cover`} fill loading="eager" fetchPriority="high" sizes="(min-width: 1240px) 1160px, 100vw" className="object-cover" />
          ) : (
            <PendingBlock label="cover image" hint="Wide image, at least 2400 × 1350 px." className="absolute inset-4 rounded-[10px] md:inset-8" />
          )}
        </div>

        <Block title="The problem">{p.problem ? <p className="max-w-[64ch]">{p.problem}</p> : <Pending label="client / business problem" />}</Block>
        <Block title="Our solution">{p.solution ? <p className="max-w-[64ch]">{p.solution}</p> : <Pending label="what we built" />}</Block>
        <Block title="Features developed">
          {p.features.length ? (
            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {p.features.map((f) => (
                <li key={f} className="border-l border-signal/50 pl-4 text-ink/90">
                  {f}
                </li>
              ))}
            </ul>
          ) : (
            <Pending label="features list" />
          )}
        </Block>
        <Block title="Technology stack">
          {p.stack.length ? (
            <ul className="flex flex-wrap gap-2">
              {p.stack.map((t) => (
                <li key={t} className="rounded-[var(--radius-chip)] border border-line px-2.5 py-1 t-small">
                  {t}
                </li>
              ))}
            </ul>
          ) : (
            <Pending label="technology stack" />
          )}
        </Block>

        <section className="border-t border-line py-10 md:py-14" aria-labelledby="screens-title">
          <h2 id="screens-title" className="t-h3">
            Screenshots
          </h2>
          {p.screenshots.length ? (
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {p.screenshots.map((s) => (
                <div key={s.src} className="overflow-hidden rounded-[10px] border border-line bg-surface">
                  <Image src={s.src} alt={s.alt} width={s.width} height={s.height} sizes="(min-width: 768px) 50vw, 100vw" className="h-auto w-full" loading="lazy" />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <PendingBlock label="desktop screenshots" hint="PNG, at least 1600 px wide." className="aspect-[16/10]" />
              <PendingBlock label="mobile screenshots" hint="PNG, native phone resolution." className="aspect-[16/10]" />
            </div>
          )}
        </section>

        <Block title="Development challenges">
          {p.challenges ? <p className="max-w-[64ch]">{p.challenges}</p> : <Pending label="hard parts and how they were solved" />}
        </Block>

        {p.results.length ? (
          <Block title="Outcomes">
            <dl className="grid gap-8 sm:grid-cols-3">
              {p.results.map((r) => (
                <div key={r.label}>
                  <dt className="t-small text-muted">{r.label}</dt>
                  <dd className="mt-1 text-[2rem] font-medium tracking-[-0.03em] text-ink">{r.value}</dd>
                </div>
              ))}
            </dl>
          </Block>
        ) : showPlaceholders ? (
          <Block title="Outcomes">
            <Pending label="measured results (only if real data exists)" />
          </Block>
        ) : null}

        <div className="border-t border-line py-10">
          <Link href="/work" className="t-small text-ink underline decoration-line-strong underline-offset-4 hover:text-signal">
            Back to all work
          </Link>
        </div>
      </div>

      <CtaBand title="Have a similar problem?" primary={{ href: "/contact", label: "Discuss your idea" }} />
    </>
  );
}
