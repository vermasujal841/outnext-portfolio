import Link from "next/link";
import { JsonLd } from "./json-ld";
import { breadcrumbJsonLd } from "@/lib/seo";

/** Section heading: title, optional intro, optional aside (link/action). Left-aligned. */
export function SectionHeader({
  id,
  title,
  intro,
  aside,
  as: Tag = "h2",
}: {
  id?: string;
  title: string;
  intro?: React.ReactNode;
  aside?: React.ReactNode;
  as?: "h1" | "h2";
}) {
  return (
    <div className="grid gap-6 md:grid-cols-12 md:items-end">
      <div className="md:col-span-8">
        <Tag id={id} className={Tag === "h1" ? "t-h1" : "t-h2"}>
          {title}
        </Tag>
        {intro ? <p className="t-lead mt-4 max-w-[58ch]">{intro}</p> : null}
      </div>
      {aside ? <div className="md:col-span-4 md:justify-self-end">{aside}</div> : null}
    </div>
  );
}

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(all)} />
      <nav aria-label="Breadcrumb" className="t-small text-faint">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-muted">
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.path} className="hover:text-ink">
                      {c.name}
                    </Link>
                    <span aria-hidden>/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

/** Top-of-page header for inner pages */
export function PageHeader({
  crumbs,
  title,
  intro,
  children,
}: {
  crumbs: Crumb[];
  title: string;
  intro?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div aria-hidden className="bg-grid mask-fade pointer-events-none absolute inset-0 opacity-60" />
      <div className="container-x relative pt-10 pb-14 md:pt-14 md:pb-20">
        <Breadcrumbs items={crumbs} />
        <h1 className="t-h1 mt-8 max-w-[20ch]">{title}</h1>
        {intro ? <p className="t-lead mt-5 max-w-[60ch]">{intro}</p> : null}
        {children}
      </div>
    </section>
  );
}
