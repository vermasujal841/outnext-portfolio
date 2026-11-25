/**
 *  INDUSTRIES
 *  Describes where Outnext's services apply. It does not claim past clients in
 *  these industries. Add real case-study links once projects exist.
 */

export type Industry = {
  slug: string;
  name: string;
  summary: string;
  solutions: string[];
  /** Service category slugs most relevant to this industry */
  services: string[];
};

export const industries: Industry[] = [
  {
    slug: "startups-saas",
    name: "Startups and SaaS companies",
    summary:
      "Founders need a product that works on day one and doesn't need rebuilding at the first sign of growth. We take an idea through MVP to a multi-tenant platform with billing, analytics and the AI features users now expect.",
    solutions: ["MVP development", "Multi-tenant SaaS", "Subscription billing", "AI-powered features"],
    services: ["saas-custom-software", "ai-machine-learning", "web-development"],
  },
  {
    slug: "education",
    name: "Education and EdTech",
    summary:
      "Schools, coaching institutes and EdTech companies run on admissions, attendance, fees, content and communication. We build learning platforms and school management systems that bring these together.",
    solutions: ["Learning management systems", "School management", "Student and parent apps", "AI study assistants"],
    services: ["saas-custom-software", "mobile-app-development", "ai-machine-learning"],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    summary:
      "Clinics and hospitals lose time to paperwork, phone bookings and disconnected records. We build hospital management systems, appointment booking and patient portals that let staff focus on care.",
    solutions: ["Hospital management systems", "Appointment booking", "Patient portals", "Document processing"],
    services: ["saas-custom-software", "web-development", "ai-machine-learning"],
  },
  {
    slug: "ecommerce-retail",
    name: "E-commerce and retail",
    summary:
      "Selling online means a fast store, reliable payments and stock that matches reality. We build stores, marketplaces and the inventory, order and WhatsApp automation behind them.",
    solutions: ["E-commerce websites", "Marketplace platforms", "Inventory management", "Order and WhatsApp automation"],
    services: ["web-development", "automation-integrations", "seo-geo-aeo"],
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    summary:
      "Hotels, restaurants and travel businesses depend on direct bookings and smooth operations. We build booking websites, hotel management systems and guest communication flows.",
    solutions: ["Booking websites", "Hotel management systems", "Guest messaging", "Local SEO"],
    services: ["web-development", "saas-custom-software", "seo-geo-aeo"],
  },
  {
    slug: "real-estate",
    name: "Real estate",
    summary:
      "Developers and brokers handle many leads, listings and site visits. We build listing websites, CRMs and lead automation so no enquiry goes cold.",
    solutions: ["Property listing platforms", "Real estate CRM", "Lead management automation", "Virtual tour integration"],
    services: ["web-development", "automation-integrations", "saas-custom-software"],
  },
  {
    slug: "logistics",
    name: "Logistics and transportation",
    summary:
      "Moving goods means tracking vehicles, drivers, orders and proof of delivery in real time. We build logistics management systems and delivery apps that give everyone the same live picture.",
    solutions: ["Logistics management systems", "Delivery and driver apps", "Live tracking", "Automated customer updates"],
    services: ["saas-custom-software", "mobile-app-development", "automation-integrations"],
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    summary:
      "Manufacturers juggle purchasing, inventory, production planning and dispatch, often across spreadsheets. We build ERP and manufacturing management systems with the dashboards leadership needs.",
    solutions: ["ERP systems", "Manufacturing management", "Inventory and dispatch", "Production dashboards"],
    services: ["saas-custom-software", "ai-machine-learning", "automation-integrations"],
  },
  {
    slug: "professional-services",
    name: "Professional services",
    summary:
      "Firms sell expertise, so time spent on admin is time not billed. We build client portals, CRMs and AI assistants that handle intake, documents and follow-ups.",
    solutions: ["Client portals", "CRM systems", "Document processing", "AI assistants"],
    services: ["web-development", "ai-machine-learning", "automation-integrations"],
  },
  {
    slug: "finance",
    name: "Finance and business services",
    summary:
      "Finance teams need accuracy, audit trails and reports on time. We build secure internal tools, reporting automation and document workflows with access control built in.",
    solutions: ["Automated reporting", "Business intelligence dashboards", "Document workflows", "Secure customer portals"],
    services: ["automation-integrations", "ai-machine-learning", "saas-custom-software"],
  },
];
