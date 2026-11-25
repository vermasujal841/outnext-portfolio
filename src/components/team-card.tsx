import Image from "next/image";
import { initials, type TeamMember } from "@/content/team";
import { showPlaceholders } from "@/content/site";
import { Pending } from "./pending";

export function isMemberVisible(m: TeamMember) {
  return showPlaceholders || Boolean(m.name);
}

export function TeamCard({
  member,
  compact = false,
  priority = false,
}: {
  member: TeamMember;
  compact?: boolean;
  priority?: boolean;
}) {
  const { name, role, photo, credentials, bio, expertise, linkedin, links } = member;
  return (
    <article className="group flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[10px] border border-line bg-surface">
        {photo ? (
          <Image
            src={photo}
            alt={name ? `Portrait of ${name}` : "Team member portrait"}
            fill
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : undefined}
            sizes={compact ? "(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 45vw" : "(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 90vw"}
            className="object-cover grayscale-[35%] transition-[filter,transform] duration-500 ease-[var(--ease-out-quart)] group-hover:scale-[1.02] group-hover:grayscale-0"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-grid">
            <span className="flex size-20 items-center justify-center rounded-full border border-line-strong bg-base text-2xl font-medium tracking-[-0.02em] text-muted">
              {initials(name)}
            </span>
            <Pending label="photo" />
          </div>
        )}
      </div>

      <div className="mt-4">
        <h3 className={compact ? "text-[1.0625rem] font-medium tracking-[-0.01em]" : "text-[1.25rem] font-medium tracking-[-0.02em]"}>
          {name ?? <Pending label="name" />}
        </h3>
        <div className="mt-1 t-small text-muted">{role ?? <Pending label="Outnext role" className="mt-1" />}</div>

        {!compact ? (
          <>
            {credentials.length ? <p className="mt-2 t-small text-faint">{credentials.join(", ")}</p> : null}
            <div className="mt-4 text-[0.9375rem] leading-relaxed text-muted">
              {bio ?? <Pending label="bio" />}
            </div>
            {expertise.length ? (
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Expertise">
                {expertise.map((e) => (
                  <li key={e} className="rounded-[var(--radius-chip)] border border-line px-2 py-0.5 text-[0.8125rem] text-muted">
                    {e}
                  </li>
                ))}
              </ul>
            ) : showPlaceholders ? (
              <div className="mt-4">
                <Pending label="skills" />
              </div>
            ) : null}
            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 t-small">
              {linkedin ? (
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-ink underline decoration-line-strong underline-offset-4 hover:text-signal">
                  LinkedIn<span className="sr-only"> profile of {name}</span>
                </a>
              ) : (
                <Pending label="LinkedIn" />
              )}
              {links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="text-ink underline decoration-line-strong underline-offset-4 hover:text-signal">
                  {l.label}
                </a>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </article>
  );
}
