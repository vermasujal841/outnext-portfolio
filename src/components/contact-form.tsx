"use client";

import { useEffect, useRef, useState } from "react";
import { Check, LoaderCircle } from "lucide-react";
import {
  budgets,
  limits,
  normalize,
  projectTypes,
  timelines,
  validate,
  type ContactErrors,
  type ContactInput,
} from "@/lib/contact-schema";
import { buttonClass } from "./button";

type Status = "idle" | "sending" | "sent" | "error";

const inputBase =
  "block w-full rounded-[var(--radius-control)] border bg-base px-3.5 py-3 text-[1rem] text-ink placeholder:text-faint transition-colors focus:outline-none focus:border-signal focus-visible:outline-none";

function Field({
  id,
  label,
  optional,
  error,
  hint,
  children,
  className = "",
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="flex items-baseline justify-between t-small text-ink">
        <span>{label}</span>
        {optional ? <span className="text-faint">Optional</span> : null}
      </label>
      <div className="mt-2">{children}</div>
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-1.5 text-[0.8125rem] text-faint">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-[0.8125rem] text-[#ff8a8a]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const typeRef = useRef<HTMLSelectElement>(null);
  const startedAt = useRef<number>(0);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState<string>("");

  useEffect(() => {
    startedAt.current = Date.now();
    // Preselect the project type when arriving from a service page (?type=slug)
    const type = new URLSearchParams(window.location.search).get("type");
    if (type && typeRef.current && projectTypes.some((p) => p.value === type)) {
      typeRef.current.value = type;
    }
  }, []);

  const describedBy = (k: keyof ContactInput, hasHint = false) =>
    errors[k] ? `${k}-error` : hasHint ? `${k}-hint` : undefined;
  const border = (k: keyof ContactInput) => (errors[k] ? "border-[#ff8a8a]/70" : "border-line-strong");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const raw = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const data = normalize(raw);
    const found = validate(data);
    setErrors(found);
    setServerError("");

    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, website: raw.website ?? "", startedAt: startedAt.current }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string; fields?: ContactErrors };
      if (!res.ok) {
        if (json.fields) setErrors(json.fields);
        setServerError(json.error ?? "The message didn't send. Try again in a moment.");
        setStatus("error");
        return;
      }
      setStatus("sent");
      form.reset();
    } catch {
      setServerError("The message didn't send because the connection dropped. Check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="rounded-[var(--radius-panel)] border border-signal/40 bg-signal/[0.05] p-8 md:p-10">
        <span className="flex size-10 items-center justify-center rounded-full bg-signal text-[#04121a]">
          <Check size={20} strokeWidth={2.5} />
        </span>
        <h2 className="t-h3 mt-6">Enquiry sent</h2>
        <p className="mt-3 max-w-[48ch] text-muted">
          Thanks. Your project details are with our team. We&apos;ll reply to the email you gave us with questions or a
          suggested next step.
        </p>
        <button type="button" onClick={() => setStatus("idle")} className={buttonClass("secondary", "mt-8")}>
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-6 sm:grid-cols-2" aria-describedby="form-note">
      <Field id="name" label="Name" error={errors.name}>
        <input id="name" name="name" autoComplete="name" maxLength={limits.name} className={`${inputBase} ${border("name")}`}
          aria-invalid={Boolean(errors.name)} aria-describedby={describedBy("name")} required />
      </Field>
      <Field id="email" label="Business email" error={errors.email}>
        <input id="email" name="email" type="email" autoComplete="email" inputMode="email" maxLength={limits.email}
          className={`${inputBase} ${border("email")}`} aria-invalid={Boolean(errors.email)} aria-describedby={describedBy("email")} required />
      </Field>
      <Field id="phone" label="Phone number" error={errors.phone}>
        <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" maxLength={limits.phone}
          className={`${inputBase} ${border("phone")}`} aria-invalid={Boolean(errors.phone)} aria-describedby={describedBy("phone")} required />
      </Field>
      <Field id="company" label="Company name" optional error={errors.company}>
        <input id="company" name="company" autoComplete="organization" maxLength={limits.company}
          className={`${inputBase} ${border("company")}`} aria-invalid={Boolean(errors.company)} aria-describedby={describedBy("company")} />
      </Field>

      <Field id="projectType" label="Project type" error={errors.projectType}>
        <select ref={typeRef} id="projectType" name="projectType" defaultValue="" className={`${inputBase} ${border("projectType")} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22 fill=%22none%22><path d=%22M1 1.5l5 5 5-5%22 stroke=%22%238f9bb1%22 stroke-width=%221.5%22/></svg>')] bg-[length:12px_8px] bg-[right_14px_center] bg-no-repeat pr-10`}
          aria-invalid={Boolean(errors.projectType)} aria-describedby={describedBy("projectType")} required>
          <option value="" disabled>Choose one</option>
          {projectTypes.map((p) => (
            <option key={p.value} value={p.value}>{p.label}</option>
          ))}
        </select>
      </Field>
      <Field id="budget" label="Estimated budget" error={errors.budget}>
        <select id="budget" name="budget" defaultValue="" className={`${inputBase} ${border("budget")} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22 fill=%22none%22><path d=%22M1 1.5l5 5 5-5%22 stroke=%22%238f9bb1%22 stroke-width=%221.5%22/></svg>')] bg-[length:12px_8px] bg-[right_14px_center] bg-no-repeat pr-10`}
          aria-invalid={Boolean(errors.budget)} aria-describedby={describedBy("budget")} required>
          <option value="" disabled>Choose a range</option>
          {budgets.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </Field>

      <fieldset className="sm:col-span-2" aria-describedby={describedBy("timeline")}>
        <legend className="t-small text-ink">Expected timeline</legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {timelines.map((t, i) => (
            <label key={t} className="relative cursor-pointer">
              <input type="radio" name="timeline" value={t} id={i === 0 ? "timeline" : undefined} className="peer sr-only" />
              <span className={`inline-flex rounded-[var(--radius-control)] border px-3.5 py-2 t-small text-muted transition-colors peer-checked:border-signal peer-checked:bg-signal/10 peer-checked:text-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-signal hover:text-ink ${errors.timeline ? "border-[#ff8a8a]/70" : "border-line-strong"}`}>
                {t}
              </span>
            </label>
          ))}
        </div>
        {errors.timeline ? (
          <p id="timeline-error" className="mt-1.5 text-[0.8125rem] text-[#ff8a8a]">
            {errors.timeline}
          </p>
        ) : null}
      </fieldset>

      <Field id="description" label="Project description" error={errors.description} hint="What are you building, who is it for, and what problem should it solve? Links to examples help." className="sm:col-span-2">
        <textarea id="description" name="description" rows={6} maxLength={limits.description}
          className={`${inputBase} ${border("description")} resize-y`} aria-invalid={Boolean(errors.description)}
          aria-describedby={describedBy("description", true)} required />
      </Field>

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p id="form-note" className="t-small text-faint max-w-[44ch]">
          We use these details only to reply to your enquiry. See our{" "}
          <a href="/privacy" className="underline decoration-line-strong underline-offset-4 hover:text-ink">privacy notice</a>.
        </p>
        <button type="submit" disabled={status === "sending"} className={buttonClass("primary", "", "lg")}>
          {status === "sending" ? (
            <>
              <LoaderCircle size={16} className="animate-spin" aria-hidden /> Sending enquiry
            </>
          ) : (
            "Send enquiry"
          )}
        </button>
      </div>

      <div aria-live="polite" className="sm:col-span-2">
        {serverError ? (
          <p role="alert" className="rounded-[var(--radius-control)] border border-[#ff8a8a]/40 bg-[#ff8a8a]/[0.06] px-4 py-3 t-small text-[#ffb3b3]">
            {serverError}
          </p>
        ) : null}
      </div>
    </form>
  );
}
