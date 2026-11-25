import { ButtonLink, buttonClass } from "./button";
import { whatsappHref } from "@/content/site";
import { Pending } from "./pending";

export function CtaBand({
  title = "Have something to build?",
  text = "Tell us what you're trying to achieve. We'll reply with questions, a suggested approach and the next step, not a sales pitch.",
  primary = { href: "/contact", label: "Start a project" },
}: {
  title?: string;
  text?: string;
  primary?: { href: string; label: string };
}) {
  const wa = whatsappHref("Hi Outnext, I'd like to discuss a project.");
  return (
    <section className="container-x section-tight">
      <div className="relative overflow-hidden rounded-[var(--radius-panel)] border border-line bg-surface">
        <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:linear-gradient(to_left,black,transparent_70%)]" />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -top-32 size-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(54,209,255,0.16),transparent)]"
        />
        <div className="relative grid gap-8 p-8 md:grid-cols-12 md:items-end md:p-14">
          <div className="md:col-span-8">
            <h2 className="t-h2 max-w-[20ch]">{title}</h2>
            <p className="t-lead mt-4 max-w-[54ch]">{text}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:col-span-4 md:flex-col md:items-stretch lg:items-end">
            <ButtonLink href={primary.href} size="lg">
              {primary.label}
            </ButtonLink>
            {wa ? (
              <a href={wa} target="_blank" rel="noopener noreferrer" className={buttonClass("secondary", "", "lg")}>
                Chat on WhatsApp
              </a>
            ) : (
              <Pending label="WhatsApp number" className="self-start lg:self-end" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
