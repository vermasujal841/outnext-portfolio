"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { Menu, X } from "lucide-react";
import { nav } from "@/content/site";
import { Logo } from "./logo";
import { buttonClass } from "./button";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);

  // Close the mobile menu when the route changes
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled || open
          ? "border-line bg-base/80 backdrop-blur-xl backdrop-saturate-150"
          : "border-transparent bg-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded focus:bg-signal focus:px-3 focus:py-2 focus:text-[#04121a]"
      >
        Skip to content
      </a>
      <div className="container-x flex h-16 items-center justify-between gap-6">
        <Logo onClick={() => setOpen(false)} showPending />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={`relative rounded-md px-3 py-2 text-[0.9375rem] transition-colors ${
                    isActive(item.href) ? "text-ink" : "text-muted hover:text-ink"
                  }`}
                >
                  {item.label}
                  {isActive(item.href) ? (
                    <span aria-hidden className="absolute inset-x-3 -bottom-[13px] h-px bg-signal" />
                  ) : null}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden sm:block">
            <Link href="/contact" className={buttonClass("primary", "", "sm")}>
              Start a project
            </Link>
          </span>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-[var(--radius-control)] border border-line text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>
    </header>

      {/* Rendered outside <header>: its backdrop-filter would otherwise trap this fixed panel inside the header bar */}
      <AnimatePresence>
        {open ? (
          <m.div
            id="mobile-nav"
            key="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.25, 1, 0.5, 1] }}
            className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto border-t border-line bg-base lg:hidden"
          >
            <nav aria-label="Mobile" className="container-x flex flex-col pt-4 pb-10">
              <ul>
                {[{ href: "/", label: "Home" }, ...nav, { href: "/contact", label: "Contact" }].map((item) => (
                  <li key={item.href} className="border-b border-line">
                    <Link
                      href={item.href}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={`flex items-center justify-between py-4 text-[1.375rem] tracking-[-0.02em] ${
                        pathname === item.href ? "text-signal" : "text-ink"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className={buttonClass("primary", "mt-8 w-full", "lg")}>
                Start a project
              </Link>
            </nav>
          </m.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
