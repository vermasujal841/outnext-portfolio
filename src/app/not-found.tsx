import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/button";
import { nav } from "@/content/site";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="container-x section min-h-[60vh]">
      <p className="t-label">Error 404</p>
      <h1 className="t-h1 mt-4 max-w-[18ch]">This page doesn&apos;t exist.</h1>
      <p className="t-lead mt-5 max-w-[52ch]">
        The link may be old or mistyped. Go back to the home page, or pick a section below.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Go to home page</ButtonLink>
        <ButtonLink href="/contact" variant="secondary">
          Contact us
        </ButtonLink>
      </div>
      <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-2 text-muted">
        {nav.map((n) => (
          <li key={n.href}>
            <Link className="hover:text-ink" href={n.href}>
              {n.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
