/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  POSITIONING, PROCESS, STACK, FAQ, ABOUT COPY
 * ─────────────────────────────────────────────────────────────────────────────
 *  Drafted from the brief's positioning. Review the wording: it describes how
 *  Outnext works, so it should match how you actually work.
 *  Items marked PENDING need a business decision from you.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { PENDING, type Maybe } from "./site";

export const hero = {
  headline: "We build the software your business runs on.",
  intro:
    "Outnext designs, builds and maintains web platforms, mobile apps, SaaS products, AI systems and automations for startups and growing businesses that need a technology partner, not just a website.",
};

export const pillars = [
  {
    title: "One team from idea to production",
    text: "Product thinking, design, engineering, deployment and maintenance in one team, so nothing gets lost between vendors.",
  },
  {
    title: "Engineering first",
    text: "We start from architecture, data and scale, not templates, so what we build keeps working as you grow.",
  },
  {
    title: "AI and automation where they pay off",
    text: "We add AI and automation where they save real time or money, and tell you plainly when they won't.",
  },
  {
    title: "A partner after launch",
    text: "Maintenance, improvements and new features as your business changes. We plan for the long term from the first conversation.",
  },
];

export const process = [
  {
    step: "Conceptualize",
    text: "We learn the business, the users and the constraints, then agree on scope, priorities and what success looks like.",
    output: "Scope, estimate and plan",
  },
  {
    step: "Design",
    text: "User flows, interface design and system architecture, reviewed with you before any production code is written.",
    output: "Clickable designs and architecture",
  },
  {
    step: "Develop",
    text: "Built in short cycles with regular demos, so you see working software early and can change direction cheaply.",
    output: "Working software every cycle",
  },
  {
    step: "Deploy",
    text: "Testing, security checks, performance tuning and a controlled launch to production, with monitoring in place.",
    output: "Live, monitored release",
  },
  {
    step: "Maintain",
    text: "Fixes, updates and improvements after launch, and a roadmap for what to build next.",
    output: "Support and roadmap",
  },
];

/** Proposed stack, based on the brief and the team's listed expertise. Confirm or edit. */
export const stack: { group: string; items: string[] }[] = [
  { group: "Web", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js"] },
  { group: "Mobile", items: ["React Native", "Flutter", "Kotlin", "Swift"] },
  { group: "Back end", items: ["Python", "Django", "FastAPI", "PostgreSQL", "Redis"] },
  { group: "AI", items: ["LLM APIs", "RAG pipelines", "Vector databases", "Machine learning"] },
  { group: "Cloud and DevOps", items: ["AWS", "Docker", "CI/CD", "Infrastructure management"] },
  { group: "Automation", items: ["n8n", "WhatsApp Business Platform", "REST APIs", "Webhooks"] },
];

export type Faq = { q: string; a: Maybe<string> };

export const faqs: Faq[] = [
  {
    q: "What kinds of projects does Outnext take on?",
    a: "Business websites, web applications, mobile apps, SaaS platforms, ERP and CRM systems, AI applications, business automation and SEO. If it's software that helps a business run or grow, we can usually build it, and we'll tell you early if a project isn't a good fit.",
  },
  {
    q: "How do you estimate cost and timeline?",
    a: "After a first conversation about your goals, we scope the work into features and priorities, then share an estimate and timeline for that scope. Smaller, well-defined projects can be estimated quickly. Larger platforms usually start with a short discovery phase.",
  },
  {
    q: "Can you work on an existing website, app or codebase?",
    a: "Yes. We redesign websites, modernize older web applications, add features to existing products and integrate AI or automation into software you already use. We start by reviewing what's there before recommending a rebuild.",
  },
  {
    q: "Do you only build websites?",
    a: "No. Websites are one part of what we do. Most of our work is in custom software: SaaS products, management systems, mobile apps, AI applications and automation.",
  },
  {
    q: "Do you provide support after launch?",
    a: "Yes. We offer ongoing maintenance, monitoring, updates and new feature development after launch.",
  },
  {
    q: "Who owns the source code and intellectual property?",
    a: PENDING,
  },
  {
    q: "Will you sign an NDA before we discuss the project?",
    a: PENDING,
  },
];

export const about = {
  intro: PENDING as Maybe<string>,
  vision:
    "A world where every growing business can use the same quality of software and AI as the largest companies.",
  mission:
    "To design, build and maintain dependable software, AI systems and automation that solve real business problems, and to stay on as a long-term technology partner.",
  philosophy: [
    {
      title: "Understand the business first",
      text: "Software is only useful if it solves the right problem. We spend time on how your business works before deciding what to build.",
    },
    {
      title: "Build for the next stage",
      text: "We design for where the business is going, so the first version doesn't have to be thrown away when it succeeds.",
    },
    {
      title: "Keep it simple and honest",
      text: "Clear scope, plain communication and no technology for its own sake.",
    },
  ],
  engineering: [
    "Architecture and data models agreed before production code",
    "Version control, code review and automated deployment on every project",
    "Security, performance and accessibility treated as requirements, not extras",
    "Monitoring and documentation so systems can be supported long after launch",
  ],
  values: [
    { title: "Ownership", text: "We treat your product as if it were ours, and we follow through." },
    { title: "Clarity", text: "Plain language, visible progress and no surprises on scope or cost." },
    { title: "Craft", text: "Well-built software is easier to change. We take the time to build it properly." },
    { title: "Long-term thinking", text: "We make decisions that still make sense a few years from now." },
  ],
  /** Real milestones only. The first is confirmed by the company's CIN. */
  journey: [
    {
      year: "2025",
      text: "GoStuds founded in Jaipur: a platform for idea discovery, team formation and project workflow management. GoStuds is now part of Outnext Private Limited.",
    },
    { year: "2026", text: "Outnext Private Limited incorporated in Rajasthan, India." },
  ] as { year: string; text: string }[],
};

/** Credibility facts. Only verifiable statements. */
export const credibility = [
  { label: "Registered company", value: "Outnext Private Limited, incorporated in Rajasthan, India" },
  { label: "Engineering team", value: "Includes IIT Roorkee alumni with backgrounds in AI, full-stack and backend engineering" },
  { label: "Full product capability", value: "Web, mobile, SaaS, AI, automation and search under one roof" },
];

/** Testimonials: PENDING. Add only real quotes with the client's permission. */
export const testimonials: { quote: string; name: string; role: string; company: string }[] = [];
