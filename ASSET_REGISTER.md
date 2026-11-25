# Outnext Website: Asset Register

Last updated: 25 Nov 2026
Status: **Website built.** Every value not yet provided is a visible "Pending" slot on the site.

Rule for this project: nothing factual goes on the site unless it is in this register.
Missing items stay as `PENDING` in `src/content/*` and are never invented.

---

## 1. Files received

Originals moved to `assets-source/`. Processed copies are what the site uses.

| # | Original file (now in `assets-source/`) | What it is | Linked to | Used on site as | Status |
|---|------|-----------|-----------|-----------------|--------|
| 1 | `team/photo_2026-09-18_19-31-02.jpg` | Headshot | Sujal Verma | `public/images/team/sujal-verma.jpg` (cropped 4:5) | ✅ In use |
| 2 | `team/Gemini_Generated_Image_30afey30afey30af.png` | Headshot (Gemini watermark cropped out) | Jaideep Singh | `public/images/team/jaideep-singh.jpg` | ✅ In use |
| 3 | `team/Gemini_Generated_Image_g0yurhg0yurhg0yu (1).png` | Headshot, navy blazer (watermark cropped out) | Aman Jain | `public/images/team/aman-jain.jpg` | ✅ In use |
| 4 | `team/Gemini_Generated_Image_g0yurhg0yurhg0yu.png` | Headshot, grey suit, glasses (watermark cropped out) | Tushar Jain | `public/images/team/tushar-jain.jpg` | ✅ In use |
| 8 | `team/raghvendra-singh-original.jpg` | Headshot, black suit (1599 × 1600) | Raghvendra Singh (founder) | `public/images/team/raghvendra-singh.jpg` (cropped 4:5, 800 × 1000) | ✅ In use |
| 9 | Tushar Jain Resume.pdf (pasted in chat, not saved) | Résumé | Tushar Jain | Source of his bio, credentials, skills, LinkedIn and GitHub | ✅ Used |
| 10 | Client brief (pasted in chat, 25 Nov 2026) | Dhanshree Export project notes | Case study | `src/content/projects.ts` → `dhanshreeExport` | ✅ Used |
| 11 | `work/dhanshree-export-walkthrough-original.mp4` (copied from `video/`) | 9 s screen recording of the client site, 1918 × 882 | Dhanshree Export | `public/videos/work/dhanshree-export/walkthrough.{mp4,webm}` (trimmed to 8.5 s to drop the unfinished footer, Next.js dev badge blurred, 1600 × 730) and four screenshots in `public/images/work/dhanshree-export/` | ✅ In use |
| 5 | `company/WhatsApp Image 2026-11-25 at 12.28.21 AM.jpeg` | Office selfie with registration banner | Company | Not shown. Source of CIN and address | ✅ Reference only |
| 6 | `team/WhatsApp Image 2026-11-25 at 12.34.42 AM (1).jpeg` | GoStuds mentor page: Sujal Verma, Jaideep Singh | Team | Source of their bios and expertise | ✅ Used, rewritten for Outnext |
| 7 | `team/WhatsApp Image 2026-11-25 at 12.34.42 AM.jpeg` | GoStuds mentor page: Aman Jain + a cut-off profile | Team | Source of Aman Jain's bio | ⚠ Aman's photo pending; cut-off profile unused |

## 2. Confirmed facts in use

| Fact | Value | Where it appears |
|------|-------|------------------|
| Legal name | Outnext Private Limited | Footer, About, Contact, Privacy, structured data |
| CIN | U82990RJ2026PTC111605 | Footer, About, Privacy, structured data |
| Registered office | C/o Jitender Singh, Nathawatpura, Piprali, Sikar, Rajasthan 332001 | Footer, Contact (with map), structured data |
| Incorporated | 2026 (from CIN) | About → Our journey |

---

## 3. Still needed: every placeholder on the site

Fill these in the file shown. Each one is marked "Pending: …" on the site until then.

### Company and contact (`src/content/site.ts`)
| Item | Field | Shown on |
|------|-------|----------|
Done:
- Company email `support@gostuds.com`; grievance contact Sujal Verma, `sujal@gostuds.com`.
- WhatsApp: founder Raghvendra Singh, +91 87428 65525.
- Domain: `gostuds.com` (GoStuds is a child company of Outnext Private Limited). Set in `.env.example`; copy to `.env.local` or the hosting provider's environment settings.
- Logo: drafted by Claude. `public/brand/` (SVG + PNG, light and dark), favicon `src/app/icon.svg`, social image. Rebuild with `python assets-source/brand/build_logo.py .` (needs `fonttools`).

- Phone (official contact): founder, +91 87428 65525.
- Social: LinkedIn `linkedin.com/company/gostuds`, Instagram `instagram.com/gostudsofficial` (X and GitHub removed; none exist).

- Business hours: 10:00 AM – 8:00 PM IST (days not specified).

### Team (`src/content/team.ts`)
LinkedIn blocks automated reading, so profile details must be sent as text.

| Person | Pending |
|--------|---------|
| Raghvendra Singh (Founder & Project Manager) | Review bio and skills (drafted from a one-line brief) |
| Sujal Verma (Co-founder) | Nothing (filled from résumé; phone and email deliberately not shown) |
| Jaideep Singh (Co-founder) | Nothing |
| Aman Jain (Co-founder) | LinkedIn |
| Tushar Jain (Founding Engineer, UI/UX & Frontend) | Confirm the LinkedIn/GitHub URLs (taken from résumé display text) |

Per person, send:
```
Name:
Outnext role / designation:
Short bio (2–3 lines, about their work at Outnext):
Skills / expertise (4–6):
Credentials to show (e.g. IIT Roorkee alumnus), if any:
LinkedIn URL:
Other links (GitHub, portfolio):
```

### Portfolio (`src/content/projects.ts`): the most important gap
**Dhanshree Export** is live on the site (`ready: true`). Year set to 2026 (Outnext was
incorporated in 2026). Live URL: https://studiogemstone.com/. Still optional: before/after load times if measured. The client's phone number is
confidential and is not stored anywhere.

This is the only closed client so far. For each new project send:
```
Project name:
Client name (or anonymised, e.g. "Logistics startup, Jaipur"):
Client permission to show name/screenshots? (yes/no)
Industry:
Project type (web / mobile / SaaS / AI / automation / SEO):
Year:
Live URL (if public):
Short description (1–2 lines):
Problem the client had (2–4 lines):
What we built (2–4 lines):
Key features (5–8 bullets):
Tech stack:
Hard parts / challenges:
Real results (measured numbers only, or leave blank):
Screenshots: desktop + mobile, PNG, at least 1600 px wide
Cover image (or I'll compose one from screenshots):
```
If GoStuds is Outnext's own product, it can be the first case study.

### About page and FAQ (`src/content/company.ts`)
Done: company introduction (`about.intro`) and the IP and NDA answers, as supplied by the client.
Optional: further milestones with real dates (`about.journey`).

### Social proof (only if real)
| Item | Where |
|------|-------|
| Client testimonials: quote, company (name and role optional), permission. Dhanshree Export ✅ added | `testimonials` in `src/content/company.ts` |
| Client logos and verified numbers | Homepage strip under the hero |

### Legal
- Privacy notice: retention period, data-principal rights, third-party processors. Have your CA or legal adviser review `src/app/privacy/page.tsx`.

### Accounts (for the contact form to email leads)
- Leads go to `support@gostuds.com` (`CONTACT_TO_EMAIL`, pre-filled in `.env.example`).
- Still needed: a Resend account, its API key, and a verified sending domain (see README).

---

## 4. Drafted by Claude: please review

This copy describes how Outnext works. It contains no client, result or statistic claims, but it should match how you actually work.

| Content | File |
|---------|------|
| Hero headline "We build the software your business runs on." and intro | `company.ts` → `hero` |
| "Why work with Outnext" (4 points) | `company.ts` → `pillars` |
| Five-step process (Conceptualize → Maintain) | `company.ts` → `process` |
| Technology stack (based on the brief and the team's listed expertise) | `company.ts` → `stack` |
| FAQ answers 1–5 | `company.ts` → `faqs` |
| Vision, mission, philosophy, engineering practices, values | `company.ts` → `about` |
| Service descriptions, problems, deliverables, technologies, use cases | `services.ts` |
| Industry descriptions | `industries.ts` |
| Contact form budget ranges (₹) and timelines | `src/lib/contact-schema.ts` |
| Team bios (reworded from the GoStuds page only) | `team.ts` |
