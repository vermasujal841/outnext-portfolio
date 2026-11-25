/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  TEAM
 * ─────────────────────────────────────────────────────────────────────────────
 *  Sources (supplied by the client, 25 Nov 2026):
 *    - GoStuds mentor-page screenshots: Jaideep Singh, Aman Jain
 *    - Sujal Verma: résumé ("my_resume.pdf")
 *    - Aman Jain: expertise and languages (Python, Java) sent by the client
 *    - Tushar Jain: résumé ("Tushar Jain Resume.pdf")
 *    - Raghvendra Singh: name, "founder" and LinkedIn URL from the client
 *  LinkedIn profiles could not be read (LinkedIn blocks automated access),
 *  so nothing on this page comes from LinkedIn except the URLs.
 *
 *  Photo mapping:
 *    sujal-verma.jpg       ← photo_2026-09-18_19-31-02.jpg
 *    jaideep-singh.jpg     ← Gemini_Generated_Image_30afey30afey30af.png
 *    aman-jain.jpg         ← Gemini_Generated_Image_g0yurhg0yurhg0yu (1).png  (navy blazer)
 *    tushar-jain.jpg       ← Gemini_Generated_Image_g0yurhg0yurhg0yu.png      (grey suit, glasses)
 *    raghvendra-singh.jpg  ← raghvendra-singh-original.jpg                    (black suit)
 * ─────────────────────────────────────────────────────────────────────────────
 */
import { PENDING, type Maybe } from "./site";

export type TeamMember = {
  id: string;
  name: Maybe<string>;
  /** Role at Outnext */
  role: Maybe<string>;
  /** Credentials shown under the role */
  credentials: string[];
  bio: Maybe<string>;
  expertise: string[];
  photo: Maybe<string>;
  linkedin: Maybe<string>;
  links: { label: string; href: string }[];
};

export const team: TeamMember[] = [
  {
    id: "raghvendra-singh",
    name: "Raghvendra Singh",
    role: "Founder & Project Manager",
    credentials: [],
    bio: "Founder of Outnext. Runs projects end to end and is the creative mind behind the company's supply chain management work.",
    expertise: ["Project management", "Supply chain management", "Business strategy", "Leadership"],
    photo: "/images/team/raghvendra-singh.jpg",
    linkedin: "https://www.linkedin.com/in/raghvendra-singh-gostuds/",
    links: [],
  },
  {
    id: "sujal-verma",
    name: "Sujal Verma",
    role: "Co-founder, Full-stack Development",
    credentials: ["IIT Roorkee, Dual Degree in Mathematics & Computing", "Codeforces Expert"],
    bio: "Co-founded GoStuds and led it from concept to a production-ready product, with a Django, PostgreSQL and Redis backend and a Next.js and TypeScript frontend. Previously built the website and LMS frontend at Geeks of Gurukul and trained 150+ students per batch there in DSA and the MERN stack.",
    expertise: ["Next.js", "React", "TypeScript", "Node.js", "Django", "PostgreSQL", "Redis", "Tailwind CSS"],
    photo: "/images/team/sujal-verma.jpg",
    linkedin: "https://www.linkedin.com/in/sujal-verma/",
    links: [{ label: "GitHub", href: "https://github.com/vermasujal841" }],
  },
  {
    id: "jaideep-singh",
    name: "Jaideep Singh",
    role: "Co-founder, AI & Backend Engineering",
    credentials: ["IIT Roorkee alumnus"],
    bio: "Works across artificial intelligence, machine learning, Python, Django and backend development.",
    expertise: ["Artificial intelligence", "Machine learning", "Python", "Backend development"],
    photo: "/images/team/jaideep-singh.jpg",
    linkedin: "https://www.linkedin.com/in/jaideep-singh-99802522b/",
    links: [],
  },
  {
    id: "aman-jain",
    name: "Aman Jain",
    role: "Co-founder, Backend & DevOps",
    credentials: [],
    bio: "Designs system architecture, backend services and cloud infrastructure on AWS, with a focus on DevSecOps, CI/CD and automation.",
    expertise: ["System architecture", "System design", "Backend development", "Cloud (AWS)", "DevSecOps", "CI/CD", "Automation", "Python", "Java"],
    photo: "/images/team/aman-jain.jpg",
    linkedin: PENDING,
    links: [],
  },
  {
    id: "tushar-jain",
    name: "Tushar Jain",
    role: "Founding Engineer, UI/UX & Frontend",
    credentials: ["MCA, JECRC University", "MERN stack developer"],
    bio: "Full-stack MERN developer. Has built an enterprise project-management system with JWT and role-based access control, Kanban and calendar views, file management and real-time notifications over Socket.IO.",
    expertise: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "Socket.IO"],
    photo: "/images/team/tushar-jain.jpg",
    linkedin: "https://www.linkedin.com/in/tusharjain453/",
    links: [{ label: "GitHub", href: "https://github.com/tusharjain6993" }],
  },
];

export function initials(name: Maybe<string>) {
  if (!name) return "?";
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
