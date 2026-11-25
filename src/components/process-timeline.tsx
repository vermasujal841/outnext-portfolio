"use client";

import { m, useInView } from "motion/react";
import { useRef } from "react";

type Step = { step: string; text: string; output: string };

/** Five-step delivery process. The connecting line draws across once when it scrolls into view. */
export function ProcessTimeline({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <ol ref={ref} className="relative grid gap-10 md:grid-cols-5 md:gap-6">
      {/* Horizontal line (desktop) */}
      <div aria-hidden className="absolute left-0 right-0 top-[15px] hidden h-px bg-line md:block">
        <m.div
          className="h-px origin-left bg-signal"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 1.4, ease: [0.25, 1, 0.5, 1] }}
        />
      </div>
      {/* Vertical line (mobile) */}
      <div aria-hidden className="absolute bottom-2 left-[15px] top-2 w-px bg-line md:hidden" />

      {steps.map((s, i) => (
        <li key={s.step} className="relative pl-12 md:pl-0">
          <span className="absolute left-0 top-0 flex size-[31px] items-center justify-center rounded-full border border-line-strong bg-base text-[0.8125rem] tabular-nums text-ink md:relative">
            {i + 1}
          </span>
          <h3 className="text-[1.1875rem] font-medium tracking-[-0.015em] md:mt-6">{s.step}</h3>
          <p className="mt-2 t-small text-muted">{s.text}</p>
          <p className="mt-3 t-small text-faint">You get: {s.output.toLowerCase()}</p>
        </li>
      ))}
    </ol>
  );
}
