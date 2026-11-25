import { CtaBand } from "@/components/cta-band";
import { PageHeader } from "@/components/section";
import { TeamCard, isMemberVisible } from "@/components/team-card";
import { team } from "@/content/team";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our team",
  description:
    "Meet the engineers behind Outnext, working across artificial intelligence, machine learning, full-stack development, backend engineering and cloud infrastructure.",
  path: "/team",
});

export default function TeamPage() {
  const members = team.filter(isMemberVisible);

  return (
    <>
      <PageHeader
        crumbs={[{ name: "Team", path: "/team" }]}
        title="The engineers behind Outnext"
        intro="A team working across artificial intelligence, machine learning, full-stack development, backend engineering and cloud infrastructure."
      />

      <section className="container-x section" aria-labelledby="members-title">
        <h2 id="members-title" className="sr-only">
          Team members
        </h2>
        <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((m, i) => (
            <TeamCard key={m.id} member={m} priority={i < 2} />
          ))}
        </div>
      </section>

      <CtaBand
        title="Work with this team"
        text="Tell us about your project and we'll put the right engineers on the first call."
        primary={{ href: "/contact", label: "Talk to our team" }}
      />
    </>
  );
}
