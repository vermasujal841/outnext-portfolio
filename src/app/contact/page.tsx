import { ContactForm } from "@/components/contact-form";
import { MapEmbed } from "@/components/map-embed";
import { Pending } from "@/components/pending";
import { PageHeader } from "@/components/section";
import { company, contact, social, whatsappHref } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Start a project",
  description:
    "Tell Outnext about your website, app, SaaS, AI or automation project. Share your goals, budget and timeline and we'll reply with a suggested next step.",
  path: "/contact",
});

const nextSteps = [
  { title: "We read your brief", text: "Someone from the engineering team reviews what you've sent." },
  { title: "We reply with questions", text: "Usually about goals, users, existing systems and constraints." },
  { title: "We suggest an approach", text: "A recommended scope and the next step, whether that's a call, a discovery phase or an estimate." },
];

export default function ContactPage() {
  const wa = whatsappHref("Hi Outnext, I'd like to discuss a project.");
  const address = company.registeredOffice.lines.join(", ");
  const socials = social.filter((s) => s.href);

  return (
    <>
      <PageHeader
        crumbs={[{ name: "Contact", path: "/contact" }]}
        title="Start a project"
        intro="Tell us what you want to build or fix. The more context you share, the more useful our first reply will be."
      />

      <section className="container-x section grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <h2 className="sr-only">Project enquiry form</h2>
          <ContactForm />
        </div>

        <aside className="space-y-12 lg:col-span-5" aria-label="Other ways to reach us">
          <div>
            <h2 className="t-h3">Prefer to talk directly?</h2>
            <dl className="mt-6 divide-y divide-line border-y border-line">
              <div className="flex items-center justify-between gap-4 py-4">
                <dt className="t-small text-faint">WhatsApp</dt>
                <dd>
                  {wa ? (
                    <a href={wa} target="_blank" rel="noopener noreferrer" className="text-ink underline decoration-line-strong underline-offset-4 hover:text-signal">
                      Chat on WhatsApp
                    </a>
                  ) : (
                    <Pending label="WhatsApp number" />
                  )}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-4">
                <dt className="t-small text-faint">Email</dt>
                <dd>
                  {contact.email ? (
                    <a href={`mailto:${contact.email}`} className="text-ink underline decoration-line-strong underline-offset-4 hover:text-signal">
                      {contact.email}
                    </a>
                  ) : (
                    <Pending label="company email" />
                  )}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-4">
                <dt className="t-small text-faint">Phone</dt>
                <dd>
                  {contact.phone ? (
                    <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className="text-ink underline decoration-line-strong underline-offset-4 hover:text-signal">
                      {contact.phone}
                    </a>
                  ) : (
                    <Pending label="phone number" />
                  )}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4 py-4">
                <dt className="t-small text-faint">Hours</dt>
                <dd className="text-ink">{contact.hours ?? <Pending label="business hours" />}</dd>
              </div>
            </dl>
            {socials.length ? (
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 t-small">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href!} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-ink">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <Pending label="social media links" className="mt-5" />
            )}
          </div>

          <div>
            <h2 className="t-h3">What happens next</h2>
            <ol className="mt-6 space-y-5">
              {nextSteps.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[2rem_1fr] gap-3">
                  <span className="flex size-7 items-center justify-center rounded-full border border-line-strong text-[0.8125rem] tabular-nums text-muted">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-ink">{s.title}</p>
                    <p className="mt-1 t-small text-muted">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className="t-h3">Registered office</h2>
            <address className="mt-4 not-italic text-muted">
              {company.legalName}
              <br />
              {company.registeredOffice.lines.map((l) => (
                <span key={l}>
                  {l}
                  <br />
                </span>
              ))}
            </address>
            {contact.showMap ? (
              <div className="mt-6">
                <MapEmbed
                  query={`${company.registeredOffice.street.replace(/^C\/o [^,]+,\s*/, "")}, ${company.registeredOffice.locality}, ${company.registeredOffice.region} ${company.registeredOffice.postalCode}, ${company.registeredOffice.countryName}`}
                  label={address}
                />
              </div>
            ) : null}
          </div>
        </aside>
      </section>
    </>
  );
}
