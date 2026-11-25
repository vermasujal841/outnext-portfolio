import { CtaBand } from "@/components/cta-band";
import { PendingBlock } from "@/components/pending";
import { ProjectRow } from "@/components/project-card";
import { PageHeader } from "@/components/section";
import { projects } from "@/content/projects";
import { showPlaceholders } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our work: case studies",
  description:
    "Case studies of websites, mobile apps, SaaS platforms, AI systems and automations built by Outnext: the problem, the solution and the technology behind it.",
  path: "/work",
});

export default function WorkPage() {
  const list = projects.filter((p) => p.ready || showPlaceholders);
  const readyCount = projects.filter((p) => p.ready).length;

  return (
    <>
      <PageHeader
        crumbs={[{ name: "Work", path: "/work" }]}
        title="Our work"
        intro="Each project shows the business problem, what we built, the technology behind it and the hard parts we solved along the way."
      />

      <section className="container-x section" aria-label="Projects">
        {readyCount === 0 && showPlaceholders ? (
          <PendingBlock
            label="real projects"
            hint="No project is marked ready yet. Unfilled fields below show as Pending. Complete projects in src/content/projects.ts and set ready: true (see ASSET_REGISTER.md for the fields needed)."
            className="mb-16"
          />
        ) : null}

        {list.length ? (
          <div className="space-y-20 md:space-y-28">
            {list.map((p, i) => (
              <ProjectRow key={p.slug} project={p} index={i} />
            ))}
          </div>
        ) : (
          <div className="max-w-[56ch]">
            <h2 className="t-h3">Case studies are being prepared</h2>
            <p className="mt-3 text-muted">
              We&apos;re writing up recent projects. In the meantime, we&apos;re happy to walk you through relevant work on a call.
            </p>
          </div>
        )}
      </section>

      <CtaBand
        title="Want to see work like yours?"
        text="Tell us what you're building. We'll share the most relevant examples and how we'd approach your project."
        primary={{ href: "/contact", label: "Talk to our team" }}
      />
    </>
  );
}
