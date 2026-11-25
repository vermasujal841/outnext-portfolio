"use client";

import { useEffect } from "react";
import Link from "next/link";
import { buttonClass } from "@/components/button";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="container-x section min-h-[60vh]">
      <p className="t-label">Something went wrong</p>
      <h1 className="t-h1 mt-4 max-w-[20ch]">This page didn&apos;t load.</h1>
      <p className="t-lead mt-5 max-w-[52ch]">
        Try loading it again. If it keeps happening, go back to the home page.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" onClick={reset} className={buttonClass("primary")}>
          Try again
        </button>
        <Link href="/" className={buttonClass("secondary")}>
          Go to home page
        </Link>
      </div>
    </section>
  );
}
