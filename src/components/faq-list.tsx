import type { Faq } from "@/content/company";
import { showPlaceholders } from "@/content/site";
import { Pending } from "./pending";

/** FAQ as native <details>: accessible and works without JavaScript. */
export function FaqList({ items }: { items: Faq[] }) {
  const visible = items.filter((f) => f.a || showPlaceholders);
  return (
    <div className="border-t border-line">
      {visible.map((f) => (
        <details key={f.q} className="faq group border-b border-line">
          <summary className="flex items-start justify-between gap-6 py-5 md:py-6">
            <h3 className="text-[1.0625rem] font-medium leading-snug tracking-[-0.01em] md:text-[1.1875rem]">{f.q}</h3>
            <span
              aria-hidden
              className="faq-icon mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full border border-line text-muted transition-transform duration-200 group-hover:border-line-strong"
            >
              +
            </span>
          </summary>
          <div className="pb-6 pr-12 text-muted">
            {f.a ? (
              <div className="max-w-[68ch] space-y-3">
                {f.a.split("\n\n").map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
            ) : (
              <Pending label="answer (business decision)" />
            )}
          </div>
        </details>
      ))}
    </div>
  );
}
