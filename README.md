# Outnext website

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Motion · Lucide icons · Geist font

## Run it locally

Requires **Node.js 20.9 or newer** (https://nodejs.org).

```bash
npm install
cp .env.example .env.local     # Windows: copy .env.example .env.local
npm run dev                    # http://localhost:3000
```

Other commands:

| Command             | What it does                          |
| ------------------- | ------------------------------------- |
| `npm run build`     | Production build                      |
| `npm start`         | Serve the production build            |
| `npm run lint`      | ESLint                                |
| `npm run typecheck` | TypeScript check                      |

## Where the content lives

All text and data is in `src/content/`. You shouldn't need to touch the components to update content.

| File                          | What's in it                                                               |
| ----------------------------- | -------------------------------------------------------------------------- |
| `src/content/site.ts`         | Company facts, contact details, social links, logo, navigation             |
| `src/content/team.ts`         | Team members                                                               |
| `src/content/projects.ts`     | Portfolio / case studies                                                   |
| `src/content/services.ts`     | Six service categories and every service                                   |
| `src/content/industries.ts`   | Industries page                                                            |
| `src/content/company.ts`      | Hero text, process, tech stack, FAQ, About-page copy, testimonials         |
| `src/lib/contact-schema.ts`   | Contact form options (budget ranges, timelines) and validation             |
| `public/images/team/`         | Team portraits (800 × 1000 px, 4:5)                                        |

## Placeholders

Anything not yet provided is set to `PENDING` in the content files and shows on the site as a yellow
dashed **"Pending: …"** marker, so nothing is invented.

- To fill one, replace `PENDING` with the real value.
- Before launch, set `NEXT_PUBLIC_SHOW_PLACEHOLDERS=false`. Every unfilled marker disappears, empty
  project slots return 404, and sections with no real content (testimonials, client logos) are hidden.

The full list of what's pending is in `ASSET_REGISTER.md`.

## Adding a project (case study)

1. Put images in `public/images/work/<project-slug>/`.
2. In `src/content/projects.ts`, fill every field of a slot (or add a new one) and set `ready: true`.
3. Only add results that were actually measured.

Ready projects are added to the sitemap automatically; placeholder slots are `noindex` and excluded.

## Contact form

The form posts to `/api/contact`, which validates every field on the server and filters spam
(hidden honeypot field, minimum fill time, rate limit per IP, size cap).

Leads are emailed through [Resend](https://resend.com). Set these in `.env.local` (or your host's
environment variables):

```
RESEND_API_KEY=...
CONTACT_TO_EMAIL=leads@yourdomain.com
CONTACT_FROM_EMAIL=Outnext Website <website@yourdomain.com>   # domain must be verified in Resend
```

Without them, the form logs enquiries to the terminal in development, and in production it shows
visitors an error pointing them to the direct contact details.

## SEO

- Per-page titles, descriptions, canonical URLs, Open Graph and Twitter tags (`src/lib/seo.ts`)
- `sitemap.xml` and `robots.txt` generated from the content
- Structured data: Organization, ProfessionalService (LocalBusiness), WebSite, Service, BreadcrumbList, FAQPage
- Set `NEXT_PUBLIC_SITE_URL` to the real domain before launch, or canonicals and the sitemap will point to localhost

## Deploying

Vercel is the simplest option: import the repository, add the environment variables from
`.env.example`, deploy. Any Node.js host that runs `npm run build && npm start` also works.

## Launch checklist

- [ ] All items in `ASSET_REGISTER.md` section 3 provided
- [ ] `NEXT_PUBLIC_SITE_URL` set to the real domain
- [ ] `NEXT_PUBLIC_SHOW_PLACEHOLDERS=false`
- [ ] Resend configured and a test enquiry received
- [ ] Privacy notice reviewed by your legal adviser or CA
- [ ] Site submitted to Google Search Console
