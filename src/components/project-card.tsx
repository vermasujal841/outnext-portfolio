import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { getServiceCategory } from "@/content/services";
import { Pending } from "./pending";
import { ProjectVideo } from "./project-video";

/** Large project row used on the homepage and the Work page. Alternates image side. */
export function ProjectRow({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;
  const category = project.category ? getServiceCategory(project.category) : undefined;
  const href = `/work/${project.slug}`;

  return (
    <article className="group grid items-center gap-8 md:grid-cols-12 md:gap-10">
      <Link
        href={href}
        className={`relative block overflow-hidden rounded-[var(--radius-panel)] border border-line bg-surface md:col-span-7 ${project.video ? "" : "aspect-[16/10]"} ${flip ? "md:order-2" : ""}`}
        style={project.video ? { aspectRatio: `${project.video.width} / ${project.video.height}` } : undefined}
        aria-hidden
        tabIndex={-1}
      >
        {project.video ? (
          <ProjectVideo
            mp4={project.video.mp4}
            webm={project.video.webm}
            poster={project.cover ?? undefined}
            label={`${project.title} website walkthrough`}
            className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-[var(--ease-out-quart)] group-hover:scale-[1.025]"
          />
        ) : project.cover ? (
          <Image
            src={project.cover}
            alt={project.title ? `${project.title} cover` : ""}
            fill
            sizes="(min-width: 768px) 58vw, 100vw"
            className="object-cover transition-transform duration-700 ease-[var(--ease-out-quart)] group-hover:scale-[1.025]"
          />
        ) : (
          <div className="absolute inset-0 bg-grid">
            <div className="absolute inset-6 flex flex-col justify-between rounded-[10px] border border-dashed border-pending/40 p-5 transition-colors group-hover:border-pending/70">
              <Pending label="cover image and screenshots" className="self-start" />
              <div className="space-y-2" aria-hidden>
                <div className="h-2 w-2/5 rounded-full bg-line-strong" />
                <div className="h-2 w-3/5 rounded-full bg-line" />
                <div className="h-2 w-1/3 rounded-full bg-line" />
              </div>
            </div>
          </div>
        )}
      </Link>

      <div className={`md:col-span-5 ${flip ? "md:order-1" : ""}`}>
        <dl className="flex flex-wrap gap-x-6 gap-y-2 t-small">
          <div>
            <dt className="sr-only">Industry</dt>
            <dd className="text-faint">{project.industry ?? <Pending label="industry" />}</dd>
          </div>
          <div>
            <dt className="sr-only">Project type</dt>
            <dd className="text-faint">{category?.name ?? project.projectType ?? <Pending label="project type" />}</dd>
          </div>
        </dl>
        <h3 className="t-h3 mt-4">
          <Link href={href} className="hover:text-signal">
            {project.title ?? <Pending label={`project ${index + 1} name`} />}
          </Link>
        </h3>
        <div className="mt-3 text-muted">{project.summary ?? <Pending label="short description" />}</div>
        <div className="mt-5">
          {project.stack.length ? (
            <ul className="flex flex-wrap gap-1.5" aria-label="Technologies used">
              {project.stack.map((t) => (
                <li key={t} className="rounded-[var(--radius-chip)] border border-line px-2 py-0.5 text-[0.8125rem] text-muted">
                  {t}
                </li>
              ))}
            </ul>
          ) : (
            <Pending label="technologies" />
          )}
        </div>
        <Link href={href} className="mt-6 inline-flex t-small text-ink underline decoration-line-strong underline-offset-4 hover:text-signal">
          Read the case study
        </Link>
      </div>
    </article>
  );
}
