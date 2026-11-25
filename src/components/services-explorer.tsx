"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import type { ServiceCategory } from "@/content/services";
import { ServiceGlyph } from "./service-glyph";
import { buttonClass } from "./button";

/**
 * Interactive services overview (homepage): category list on the left, details
 * on the right. Implemented as an accessible tablist with arrow-key support.
 * On small screens it becomes a stacked list where each category expands.
 */
export function ServicesExplorer({ categories }: { categories: ServiceCategory[] }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = categories[active];

  function onKeyDown(e: React.KeyboardEvent, i: number) {
    let next = i;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % categories.length;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + categories.length) % categories.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = categories.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <>
      {/* Desktop / tablet: tabs */}
      <div className="hidden overflow-hidden rounded-[var(--radius-panel)] border border-line md:grid md:grid-cols-12">
        <div role="tablist" aria-orientation="vertical" aria-label="Service categories" className="border-r border-line md:col-span-5 lg:col-span-4">
          {categories.map((c, i) => {
            const selected = i === active;
            return (
              <button
                key={c.slug}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                role="tab"
                type="button"
                id={`${baseId}-tab-${i}`}
                aria-selected={selected}
                aria-controls={`${baseId}-panel`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={`relative flex w-full items-baseline justify-between gap-4 border-b border-line px-6 py-5 text-left transition-colors last:border-b-0 ${
                  selected ? "bg-surface text-ink" : "text-muted hover:bg-surface/50 hover:text-ink"
                }`}
              >
                {selected ? <span aria-hidden className="absolute inset-y-0 left-0 w-0.5 bg-signal" /> : null}
                <span className="text-[1.0625rem] font-medium tracking-[-0.01em]">{c.name}</span>
                <span className="t-small tabular-nums text-faint">{c.services.length} services</span>
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id={`${baseId}-panel`}
          aria-labelledby={`${baseId}-tab-${active}`}
          className="relative bg-surface/40 md:col-span-7 lg:col-span-8"
        >
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={current.slug}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
              className="p-8 lg:p-10"
            >
              <div className="flex items-start justify-between gap-6">
                <h3 className="t-h3 max-w-[24ch]">{current.title}</h3>
                <ServiceGlyph kind={current.glyph} className="hidden w-28 shrink-0 lg:block" />
              </div>
              <p className="mt-4 max-w-[60ch] text-muted">{current.summary}</p>
              <ul className="mt-7 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
                {current.services.map((s) => (
                  <li key={s} className="flex items-baseline gap-3 t-small text-ink/90">
                    <span aria-hidden className="mt-[0.45em] size-1 shrink-0 rounded-full bg-signal/70" />
                    {s}
                  </li>
                ))}
              </ul>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href={`/services/${current.slug}`} className={buttonClass("secondary")}>
                  Explore services<span className="sr-only">: {current.name}</span>
                </Link>
                <Link href={`/contact?type=${current.slug}`} className={buttonClass("ghost")}>
                  Discuss your project
                </Link>
              </div>
            </m.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile: expandable list (native details, works without JS) */}
      <div className="border-t border-line md:hidden">
        {categories.map((c, i) => (
          <details key={c.slug} className="faq group border-b border-line" open={i === 0}>
            <summary className="flex items-center justify-between gap-4 py-5">
              <span className="text-[1.125rem] font-medium tracking-[-0.01em]">{c.name}</span>
              <span aria-hidden className="faq-icon text-xl leading-none text-faint transition-transform">
                +
              </span>
            </summary>
            <div className="pb-6">
              <p className="text-muted">{c.summary}</p>
              <ul className="mt-4 grid grid-cols-1 gap-y-2 t-small">
                {c.services.map((s) => (
                  <li key={s} className="flex items-baseline gap-3">
                    <span aria-hidden className="mt-[0.45em] size-1 shrink-0 rounded-full bg-signal/70" />
                    {s}
                  </li>
                ))}
              </ul>
              <Link href={`/services/${c.slug}`} className={buttonClass("secondary", "mt-5 w-full")}>
                Explore services<span className="sr-only">: {c.name}</span>
              </Link>
            </div>
          </details>
        ))}
      </div>
    </>
  );
}
