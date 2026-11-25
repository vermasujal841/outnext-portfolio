import { Pending } from "@/components/pending";
import { PageHeader } from "@/components/section";
import { company, contact } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy notice",
  description: "How Outnext handles the personal information you share through this website.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageHeader crumbs={[{ name: "Privacy", path: "/privacy" }]} title="Privacy notice" />
      <section className="container-x section">
        <div className="prose-ox space-y-8">
          <Pending label="full privacy policy reviewed by your legal adviser or CA" />
          <div>
            <h2 className="t-h3 text-ink">What this website collects</h2>
            <p className="mt-3">
              When you send an enquiry, we receive the details you enter in the form: your name, business email, phone
              number, company name, project type, estimated budget, expected timeline and project description.
            </p>
          </div>
          <div>
            <h2 className="t-h3 text-ink">Why we collect it</h2>
            <p className="mt-3">We use these details only to reply to your enquiry and discuss your project with you.</p>
          </div>
          <div>
            <h2 className="t-h3 text-ink">Who is responsible</h2>
            <p className="mt-3">
              {company.legalName}, {company.registeredOffice.lines.join(", ")}. CIN {company.cin}.
            </p>
            <p className="mt-3">
              Contact for privacy questions:{" "}
              {contact.email ? <a href={`mailto:${contact.email}`} className="text-ink underline underline-offset-4">{contact.email}</a> : <Pending label="email" />}
            </p>
          </div>
          <div>
            <h2 className="t-h3 text-ink">Retention, your rights and third parties</h2>
            <Pending label="retention period, data-principal rights and third-party processors (e.g. email provider, hosting)" className="mt-3" />
          </div>
        </div>
      </section>
    </>
  );
}
