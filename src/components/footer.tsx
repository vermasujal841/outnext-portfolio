import Link from "next/link";
import { company, contact, nav, showPlaceholders, social } from "@/content/site";
import { serviceCategories } from "@/content/services";
import { Pending } from "./pending";

export function Footer() {
  const year = new Date().getFullYear();
  const socials = social.filter((s) => s.href);
  const pendingSocials = social.filter((s) => !s.href);

  return (
    <footer className="border-t border-line bg-surface/40">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-4">
          <p className="text-[1.3rem] font-semibold tracking-[-0.045em]">{company.name}</p>
          <p className="mt-3 max-w-[34ch] text-muted">{company.tagline}</p>
          <div className="mt-6 flex flex-col gap-2 t-small">
            {contact.email ? (
              <a className="text-ink hover:text-signal" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            ) : (
              <Pending label="company email" className="self-start" />
            )}
            {contact.phone ? (
              <a className="text-ink hover:text-signal" href={`tel:${contact.phone.replace(/\s/g, "")}`}>
                {contact.phone}
              </a>
            ) : (
              <Pending label="phone number" className="self-start" />
            )}
          </div>
        </div>

        <nav aria-label="Services" className="md:col-span-3">
          <p className="t-label">Services</p>
          <ul className="mt-4 space-y-2.5 t-small">
            {serviceCategories.map((c) => (
              <li key={c.slug}>
                <Link className="text-muted hover:text-ink" href={`/services/${c.slug}`}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Company" className="md:col-span-2">
          <p className="t-label">Company</p>
          <ul className="mt-4 space-y-2.5 t-small">
            {nav
              .filter((n) => n.href !== "/services")
              .map((n) => (
                <li key={n.href}>
                  <Link className="text-muted hover:text-ink" href={n.href}>
                    {n.label}
                  </Link>
                </li>
              ))}
            <li>
              <Link className="text-muted hover:text-ink" href="/contact">
                Contact
              </Link>
            </li>
            <li>
              <Link className="text-muted hover:text-ink" href="/privacy">
                Privacy
              </Link>
            </li>
          </ul>
        </nav>

        {socials.length || showPlaceholders ? (
        <div className="md:col-span-3">
          <p className="t-label">Follow</p>
          <ul className="mt-4 space-y-2.5 t-small">
            {socials.map((s) => (
              <li key={s.label}>
                <a className="text-muted hover:text-ink" href={s.href!} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          {pendingSocials.length ? (
            <Pending label={`${pendingSocials.map((s) => s.label).join(", ")} links`} className="mt-1" />
          ) : null}
        </div>
        ) : null}
      </div>

      {/* Statutory details (Companies (Incorporation) Rules 2014, Rule 26) */}
      <div className="border-t border-line">
        <div className="container-x grid gap-6 py-8 t-small text-faint md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="text-muted">{company.legalName}</p>
            <p className="mt-1">
              CIN <span className="font-mono text-[0.8125rem] text-muted">{company.cin}</span>
            </p>
          </div>
          <address className="not-italic md:col-span-5">
            <span className="text-muted">Registered office</span>
            <br />
            {company.registeredOffice.lines.join(", ")}
          </address>
          {contact.grievanceContact || showPlaceholders ? (
            <div className="md:col-span-3">
              <span className="text-muted">Grievance contact</span>
              <br />
              {contact.grievanceContact ? (
                <>
                  {contact.grievanceContact.name},{" "}
                  <a href={`mailto:${contact.grievanceContact.email}`} className="hover:text-signal">
                    {contact.grievanceContact.email}
                  </a>
                </>
              ) : (
                <Pending label="name" className="mt-1" />
              )}
            </div>
          ) : null}
          <p className="md:col-span-12">
            © {year} {company.legalName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
