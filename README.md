# Xnths — portfolio of Jonathas Castilho

A bilingual (English and Português do Brasil) portfolio built with **Payload CMS 3** and **Next.js 15**.
Its centerpiece is the **USP Aberta** case study: architecture, data engineering, search, caching,
DevOps, observability, security, privacy and SEO of an open academic-data platform engineered by Xnths.

The design follows research on first impressions and credibility; the page `/{locale}/colophon` lists
every source and the decision it led to.

## Stack

- Next.js 15 (App Router) · React 19 · Tailwind CSS 4
- Payload CMS 3.78 on MongoDB, with localization (`en`, `pt-BR`)
- Lexical rich text with custom paper blocks (figures, metric grids, callouts, citations)

## Routes

Every route lives under a locale prefix (`/en`, `/pt-BR`); `/` redirects by cookie, then `Accept-Language`.

| Route | Content |
| --- | --- |
| `/{locale}` | Home: positioning, featured case study, capabilities, work, research, contact |
| `/{locale}/work`, `/work/[slug]` | Projects; the USP Aberta case study has a sticky table of contents, numbered figures and references |
| `/{locale}/research`, `/research/[slug]` | Publications with status, abstract and BibTeX |
| `/{locale}/about`, `/colophon`, `/search` | About, design rationale with references, search |
| `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/llms-full.txt`, `/cite/all.bib` | SEO and discoverability |

## Content model (Payload)

- **Projects** (`projects`): case studies, projects and sub-projects. Localized body, metrics, partners, links and references.
- **Publications** (`publications`): papers, theses and pilots, with a generated BibTeX entry.
- **Site profile** (`site` global): positioning, bio, capabilities, community, links and contact.
- **Posts** (`posts`): kept in the admin but not shown on the site (there is no Writing section; `/{locale}/writing` redirects home).

Localized fields store one value per locale; `fallback` is on, so a missing translation shows English.
Slugs are never localized.

## Development

```bash
cp .env.example .env     # set DATABASE_URL (MongoDB) and PAYLOAD_SECRET
pnpm install
pnpm dev
pnpm seed                # creates or refreshes the bilingual portfolio content (idempotent)
pnpm seed -- --reset-portfolio   # deletes only projects and publications first
```

MongoDB must be a replica set for Payload transactions (a single-node replica set is enough locally).
The admin panel is at `/admin`; the dashboard also has a “Seed your database” button.

After changing a schema: `pnpm generate:types` and `pnpm generate:importmap`.

## Verification

Run these one at a time; heavy parallel jobs are hard on small machines.

```bash
pnpm exec tsc --noEmit
pnpm lint
pnpm test:int            # unit tests, no database needed
pnpm build && pnpm start # then, in another shell:
pnpm exec playwright test tests/e2e/i18n.e2e.spec.ts
pnpm exec playwright test tests/e2e/seo.e2e.spec.ts
pnpm exec playwright test tests/e2e/content.e2e.spec.ts
pnpm exec playwright test tests/e2e/a11y.e2e.spec.ts
```

The e2e specs need a seeded database. `content.e2e.spec.ts` and the seed unit tests read
`CONTENT_DENYLIST` (comma-separated terms that must never appear in published content) from `.env`;
the list is deliberately not committed.

## Deployment

`Dockerfile` builds a standalone Next.js image (`IS_BUILDING=true` skips database access at build time;
pages render on first request). Posts and users in an existing database are untouched by the redesign:
the old `pages` collection is no longer used and its documents can be dropped manually.
