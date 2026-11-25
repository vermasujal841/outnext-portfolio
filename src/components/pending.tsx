import { showPlaceholders } from "@/content/site";

/**
 * Visible marker for content the client hasn't provided yet.
 * Renders nothing when NEXT_PUBLIC_SHOW_PLACEHOLDERS=false.
 */
export function Pending({ label, className = "" }: { label: string; className?: string }) {
  if (!showPlaceholders) return null;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-[var(--radius-chip)] border border-dashed border-pending/60 bg-pending/[0.07] px-2 py-0.5 text-[0.8125rem] leading-5 font-normal tracking-normal text-pending ${className}`}
      data-pending={label}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-pending" />
      Pending: {label}
    </span>
  );
}

/** Block-level placeholder for larger missing content (images, sections). */
export function PendingBlock({
  label,
  hint,
  className = "",
  children,
}: {
  label: string;
  hint?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  if (!showPlaceholders) return null;
  return (
    <div
      className={`flex flex-col items-start justify-center gap-2 rounded-[var(--radius-panel)] border border-dashed border-pending/45 bg-pending/[0.04] p-6 ${className}`}
      data-pending={label}
    >
      <Pending label={label} />
      {hint ? <p className="t-small max-w-[52ch] text-muted">{hint}</p> : null}
      {children}
    </div>
  );
}
