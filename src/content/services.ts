/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  SERVICES: six categories, every service from the brief
 * ─────────────────────────────────────────────────────────────────────────────
 *  Copy here describes what Outnext offers. It makes no claims about past
 *  clients, results or numbers. "technologies" lists are a proposed stack
 *  based on the brief and the team's listed expertise: confirm or edit them.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type GlyphKind = "web" | "mobile" | "saas" | "ai" | "automation" | "search";

export type ServiceCategory = {
  slug: string;
  glyph: GlyphKind;
  /** Short name used in navigation and lists */
  name: string;
  /** Page heading */
  title: string;
  /** Heading for the call to action at the end of the category page */
  ctaTitle: string;
  /** One-line summary for cards and meta descriptions */
  summary: string;
  /** 2–3 sentence overview */
  overview: string;
  problems: string[];
  deliverables: string[];
  technologies: string[];
  useCases: { title: string; text: string }[];
  /** Every individual service in this category (from the brief) */
  services: string[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "web-development",
    glyph: "web",
    name: "Websites & web apps",
    ctaTitle: "Planning a website or web app?",
    title: "Website and web application development",
    summary:
      "Business websites, online stores, portals and custom web applications that load fast, rank well and are easy to grow.",
    overview:
      "A website is often the first working piece of software a business owns. We build everything from a focused landing page to a marketplace or customer portal, and we build it on the same engineering foundations we use for larger products, so it doesn't need rebuilding when the business grows.",
    problems: [
      "An outdated site that is slow, hard to update and doesn't bring in enquiries",
      "Manual work that a customer portal or booking flow could handle",
      "A web app built quickly that now breaks every time something changes",
      "No clear way for customers to buy, book or get support online",
    ],
    deliverables: [
      "Information architecture, UX flows and visual design",
      "Responsive front end built for speed and accessibility",
      "Content management so your team can update pages without a developer",
      "Back end, database and integrations for web applications",
      "SEO foundations, analytics and structured data from day one",
      "Deployment, monitoring and an agreed maintenance plan",
    ],
    technologies: ["Next.js", "React", "TypeScript", "Node.js", "Python", "Django", "PostgreSQL", "Headless CMS"],
    useCases: [
      { title: "Corporate website", text: "A credible, fast company site that explains what you do and turns visitors into enquiries." },
      { title: "Online store", text: "A catalogue, cart and checkout connected to payments, inventory and shipping." },
      { title: "Booking platform", text: "Customers pick a slot, pay and get confirmations without a phone call." },
      { title: "Customer portal", text: "Clients log in to see orders, documents, invoices and support in one place." },
    ],
    services: [
      "Business websites",
      "Corporate websites",
      "E-commerce websites",
      "Landing pages",
      "Portfolio websites",
      "Booking websites",
      "Marketplace platforms",
      "Custom web applications",
      "Customer portals",
      "Website redesign",
      "Website maintenance",
      "Web application modernization",
    ],
  },
  {
    slug: "mobile-app-development",
    glyph: "mobile",
    name: "Mobile apps",
    ctaTitle: "Planning a mobile app?",
    title: "Mobile application development",
    summary:
      "Android, iOS and cross-platform apps for customers, delivery teams and internal operations.",
    overview:
      "We design and build mobile apps that people keep using, from customer-facing apps to tools for field and delivery teams. Where it makes sense we use one cross-platform codebase to reach Android and iOS at once. Where it doesn't, we build native.",
    problems: [
      "Customers expect an app, but building two separate apps is too slow and costly",
      "Delivery or field staff rely on calls and spreadsheets to coordinate work",
      "An existing app is unstable, has poor reviews or is hard to update",
      "The app and the website show different data because they aren't connected",
    ],
    deliverables: [
      "Product scoping, user flows and app design",
      "Android, iOS or cross-platform app development",
      "Back-end APIs, authentication and admin dashboards",
      "Push notifications, maps, payments and offline support where needed",
      "Play Store and App Store submission",
      "Crash monitoring, updates and ongoing support",
    ],
    technologies: ["React Native", "Flutter", "Kotlin", "Swift", "Node.js", "Python", "Firebase", "REST and GraphQL APIs"],
    useCases: [
      { title: "Customer app", text: "Ordering, bookings, loyalty and support in your customers' pockets." },
      { title: "Delivery app", text: "Live order assignment, routes, proof of delivery and status updates." },
      { title: "Booking app", text: "Appointments, reservations and reminders with payment built in." },
      { title: "Enterprise app", text: "Internal tools for field teams, inspections, approvals and reporting." },
    ],
    services: [
      "Android applications",
      "iOS applications",
      "Cross-platform applications",
      "React Native applications",
      "Flutter applications",
      "Customer-facing applications",
      "Delivery applications",
      "Booking applications",
      "Enterprise mobile applications",
    ],
  },
  {
    slug: "saas-custom-software",
    glyph: "saas",
    name: "SaaS & custom software",
    ctaTitle: "Planning a SaaS product or custom system?",
    title: "SaaS and custom software development",
    summary:
      "SaaS platforms, ERPs, CRMs and management systems built around how your business actually works.",
    overview:
      "Off-the-shelf software forces a business to work the way the software does. We build platforms and management systems around your real processes: multi-tenant SaaS products for founders, and ERP, CRM and operations systems for businesses that have outgrown spreadsheets and disconnected tools.",
    problems: [
      "Operations run on spreadsheets, WhatsApp groups and disconnected tools",
      "Off-the-shelf software doesn't fit the process, so teams work around it",
      "A SaaS idea needs a product that can handle many customers and subscriptions",
      "Leadership can't see real-time numbers without someone compiling a report",
    ],
    deliverables: [
      "Process mapping and system architecture",
      "Role-based access, multi-tenancy and audit trails",
      "Dashboards, reports and data exports",
      "Subscription billing and payment integration",
      "Data migration from existing tools",
      "Cloud deployment, backups, monitoring and long-term maintenance",
    ],
    technologies: ["Next.js", "React", "Django", "Node.js", "PostgreSQL", "Redis", "AWS", "Docker"],
    useCases: [
      { title: "SaaS product", text: "A multi-tenant platform with sign-up, subscriptions, roles and an admin console." },
      { title: "ERP for a manufacturer", text: "Purchasing, inventory, production and dispatch in one system." },
      { title: "Hospital or school system", text: "Admissions, records, scheduling, billing and reporting for one or many branches." },
      { title: "Dealer network", text: "Orders, stock, schemes and dealer performance across locations." },
    ],
    services: [
      "SaaS platforms",
      "Multi-tenant SaaS",
      "ERP systems",
      "CRM systems",
      "HRMS",
      "LMS",
      "Inventory management systems",
      "Hospital management systems",
      "Hotel management systems",
      "School management systems",
      "Dealer management systems",
      "Logistics management systems",
      "Manufacturing management systems",
      "Custom dashboards",
      "Enterprise software",
      "Subscription-based platforms",
      "Marketplace software",
      "Business management systems",
    ],
  },
  {
    slug: "ai-machine-learning",
    glyph: "ai",
    name: "AI & machine learning",
    ctaTitle: "Thinking about where AI fits?",
    title: "Artificial intelligence and machine learning",
    summary:
      "AI agents, chatbots, RAG applications and predictive models that take real work off your team.",
    overview:
      "We build AI into products and operations where it saves time or money: assistants that answer from your own documents, agents that complete multi-step tasks, and models that forecast or recommend. We start with the business problem, then choose the model, data and guardrails that fit it.",
    problems: [
      "Support teams answer the same questions all day",
      "Staff spend hours reading, extracting and re-typing data from documents",
      "Company knowledge is scattered across files nobody can search",
      "Decisions are made on gut feel because the data isn't being used",
    ],
    deliverables: [
      "Use-case discovery and feasibility assessment",
      "LLM integration with retrieval over your own data (RAG)",
      "AI agents with tool use, approvals and audit logs",
      "Document processing and data extraction pipelines",
      "Predictive and recommendation models",
      "Evaluation, guardrails, cost monitoring and ongoing tuning",
    ],
    technologies: ["Python", "LLM APIs", "Open-source models", "Vector databases", "RAG pipelines", "FastAPI", "Django", "scikit-learn"],
    useCases: [
      { title: "Support assistant", text: "Answers customer questions from your policies and hands off to a person when needed." },
      { title: "Document processing", text: "Reads invoices, forms or contracts and puts the data where it belongs." },
      { title: "Internal knowledge assistant", text: "Staff ask questions in plain language and get answers with sources." },
      { title: "Forecasting", text: "Demand, churn or stock predictions built from your historical data." },
    ],
    services: [
      "AI agents",
      "AI chatbots",
      "AI-powered SaaS",
      "LLM integrations",
      "RAG-based applications",
      "AI assistants",
      "Document processing",
      "Predictive analytics",
      "Recommendation engines",
      "AI customer support",
      "AI workflow automation",
      "Business intelligence",
      "AI-powered internal tools",
      "AI integration into existing software",
    ],
  },
  {
    slug: "automation-integrations",
    glyph: "automation",
    name: "Automation & integrations",
    ctaTitle: "Want to stop doing it by hand?",
    title: "Business automation and integrations",
    summary:
      "n8n workflows, WhatsApp and CRM automation, and API integrations that connect the tools you already use.",
    overview:
      "Most businesses already have the tools they need. The problem is that people copy data between them. We connect your systems and automate the repetitive steps, from capturing a lead to sending the invoice, so work moves on its own and your team handles the exceptions.",
    problems: [
      "Leads arrive from many channels and some are never followed up",
      "Staff copy the same data between the CRM, spreadsheets and accounting software",
      "Reports are compiled by hand every week",
      "Customers wait for confirmations and updates that could be sent automatically",
    ],
    deliverables: [
      "Process audit to find what's worth automating",
      "n8n or custom workflow automation",
      "WhatsApp Business, email and CRM automation",
      "Payment gateway and third-party API integrations",
      "Automated reporting and data synchronization",
      "Monitoring, error alerts and documentation for every workflow",
    ],
    technologies: ["n8n", "WhatsApp Business Platform", "REST APIs", "Webhooks", "Razorpay", "Stripe", "Google Workspace", "Python"],
    useCases: [
      { title: "Lead capture to CRM", text: "Every enquiry is logged, assigned and followed up on WhatsApp or email automatically." },
      { title: "Order to invoice", text: "A paid order triggers the invoice, the stock update and the customer confirmation." },
      { title: "Weekly reporting", text: "Numbers from every tool land in one report, on schedule, without anyone compiling them." },
      { title: "System sync", text: "Customer and product data stays consistent across your website, app and back office." },
    ],
    services: [
      "n8n automation",
      "Business process automation",
      "WhatsApp automation",
      "CRM automation",
      "Email automation",
      "API integrations",
      "Payment gateway integrations",
      "Third-party integrations",
      "Automated reporting",
      "Lead management automation",
      "Data synchronization",
      "Workflow automation",
    ],
  },
  {
    slug: "seo-geo-aeo",
    glyph: "search",
    name: "SEO, GEO & AEO",
    ctaTitle: "Want to be found by more customers?",
    title: "SEO, generative engine and answer engine optimization",
    summary:
      "Technical, local and content SEO, plus optimization for AI search and answer engines.",
    overview:
      "People now find businesses through Google, Maps and AI assistants. We fix the technical foundations, structure your content so search engines and AI models can understand and cite it, and improve local visibility, all without keyword stuffing.",
    problems: [
      "The website doesn't appear when customers search for what you do",
      "Competitors show up in Google Maps and AI answers, and you don't",
      "Slow pages and technical errors hold rankings back",
      "Content exists but isn't structured in a way search engines and AI can use",
    ],
    deliverables: [
      "Technical SEO audit and fixes",
      "Core Web Vitals and performance optimization",
      "Structured data (Schema.org) implementation",
      "Google Business Profile and local SEO",
      "Content structured for answer engines and generative search",
      "Reporting on rankings, traffic and enquiries",
    ],
    technologies: ["Google Search Console", "Google Business Profile", "Schema.org", "PageSpeed Insights", "Lighthouse", "Google Analytics"],
    useCases: [
      { title: "Local business", text: "Show up in Maps and 'near me' searches in the areas you serve." },
      { title: "Service company", text: "Rank for the services you sell and turn that traffic into enquiries." },
      { title: "AI search visibility", text: "Structure content so AI assistants can understand and cite your business." },
      { title: "Site migration", text: "Redesign or replatform without losing the rankings you already have." },
    ],
    services: [
      "Technical SEO",
      "Local SEO",
      "On-page SEO",
      "Off-page SEO",
      "Google Business Profile optimization",
      "GEO (Generative Engine Optimization)",
      "AEO (Answer Engine Optimization)",
      "Content SEO",
      "Website performance optimization",
      "Search visibility optimization",
    ],
  },
];

export function getServiceCategory(slug: string) {
  return serviceCategories.find((c) => c.slug === slug);
}

export const totalServiceCount = serviceCategories.reduce((n, c) => n + c.services.length, 0);
