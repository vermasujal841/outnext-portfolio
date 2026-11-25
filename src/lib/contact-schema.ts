/**
 * Contact form fields and validation, shared by the browser form and the API
 * route so both enforce exactly the same rules.
 */
import { serviceCategories } from "@/content/services";

export const projectTypes = [
  ...serviceCategories.map((c) => ({ value: c.slug, label: c.name })),
  { value: "other", label: "Something else / not sure yet" },
];

/** Proposed ranges: confirm or edit. */
export const budgets = ["Under ₹1 lakh", "₹1–3 lakh", "₹3–10 lakh", "₹10–25 lakh", "Above ₹25 lakh", "Not sure yet"];

export const timelines = ["As soon as possible", "Within 1 month", "1–3 months", "3–6 months", "Flexible"];

export type ContactInput = {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
};

export type ContactErrors = Partial<Record<keyof ContactInput, string>>;

export const limits = {
  name: 100,
  email: 160,
  phone: 30,
  company: 120,
  description: 5000,
  descriptionMin: 20,
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const phoneRe = /^[+()\-.\s\d]{7,30}$/;

export function normalize(raw: Record<string, unknown>): ContactInput {
  const s = (k: string) => (typeof raw[k] === "string" ? (raw[k] as string).trim() : "");
  return {
    name: s("name"),
    email: s("email").toLowerCase(),
    phone: s("phone"),
    company: s("company"),
    projectType: s("projectType"),
    budget: s("budget"),
    timeline: s("timeline"),
    description: s("description"),
  };
}

export function validate(d: ContactInput): ContactErrors {
  const e: ContactErrors = {};
  if (!d.name) e.name = "Enter your name.";
  else if (d.name.length > limits.name) e.name = `Keep your name under ${limits.name} characters.`;

  if (!d.email) e.email = "Enter your business email.";
  else if (!emailRe.test(d.email) || d.email.length > limits.email) e.email = "Enter a valid email address, like name@company.com.";

  if (!d.phone) e.phone = "Enter a phone number so we can reach you.";
  else if (!phoneRe.test(d.phone) || d.phone.replace(/\D/g, "").length < 7)
    e.phone = "Enter a valid phone number, including the country code if outside India.";

  if (d.company.length > limits.company) e.company = `Keep the company name under ${limits.company} characters.`;

  if (!projectTypes.some((p) => p.value === d.projectType)) e.projectType = "Choose the type of project.";
  if (!budgets.includes(d.budget)) e.budget = "Choose an estimated budget.";
  if (!timelines.includes(d.timeline)) e.timeline = "Choose an expected timeline.";

  if (!d.description) e.description = "Describe the project in a few sentences.";
  else if (d.description.length < limits.descriptionMin)
    e.description = `Add a little more detail (at least ${limits.descriptionMin} characters).`;
  else if (d.description.length > limits.description)
    e.description = `Keep the description under ${limits.description} characters.`;

  return e;
}
