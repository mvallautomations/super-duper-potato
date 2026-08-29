# AGENTS.md

This is the operational source of truth for coding agents working in the
`midvoyage-portfolio` repository. Read this file before changing code, content,
deployment, security, analytics, advertising, or affiliate links.

## Project purpose

`mid·voyage` is Mishael Vallar's personal portfolio and content site. It documents
the work and learning process. It is separate from **handlit**, the delivery
company. Linking to handlit is appropriate; describing a handlit system as if it
runs on mid·voyage is not.

- Live domain: `https://mvallarautomations.cc`
- GitHub repository: `github.com/mvallautomations/midvoyage-portfolio`
- Current production host: Cloudflare Pages
- Current deployment: manual, not Git-connected

## Read before acting

1. Preserve uncommitted user changes. Check `git status` before editing.
2. Do not deploy, change DNS, create credentials, add trackers, or publish ads
   without explicit approval.
3. Do not commit secrets, tokens, OAuth credentials, affiliate identifiers, or
   AdSense identifiers.
4. Keep phases small and testable. Run the validation gates after each phase.
5. Never weaken a check to make a build pass. Fix the underlying content or code.

## Current architecture

- Next.js 16 App Router with TypeScript and React 19
- Tailwind CSS v4 plus canonical tokens in `src/app/globals.css`
- `output: "export"` in `next.config.ts`
- Static production output in `out/`
- Path alias: `@/*` maps to `src/*`
- No runtime database or API routes in the current production architecture

Important directories and files:

```text
content/posts/*/index.mdoc  CMS-ready blog articles and frontmatter
keystatic.config.ts         Blog editor schema; currently local storage mode
public/images/blog/         Intended repository-local cover image storage
src/app/blog/page.tsx       Public blog index
src/app/blog/[slug]/        Public article route
src/lib/blog.ts             Keystatic reader and public visibility rules
src/components/ArticleTimelineNav.tsx  Sticky article section/progress navigation
src/components/SocialLinks.tsx         Footer profile list and accessible icons
src/components/SocialLinks.module.css  Footer social-link presentation
src/components/MotionEnhancements.tsx   Scroll reveals and route progress loader
src/app/about/AboutHero.module.css     Responsive About hero and reduced-motion rules
public/images/about/                   Exact About portrait and non-generative avatar crop
src/data/work.ts            Only source of truth for portfolio work data
src/app/globals.css         Brand tokens and global styling
scripts/check-links.mjs     Static internal-link/404 build gate
scripts/check-content.mjs   Truthfulness and known-bad-claim build gate
```

## CMS work completed

The original blog stored two metadata objects in `src/lib/blog.ts`; every article
route rendered the same placeholder body. The CMS foundation now does the following:

- Defines a Keystatic post collection in `keystatic.config.ts`.
- Stores articles as portable Markdoc files under `content/posts/`.
- Renders real article bodies with Markdoc.
- Supports title/slug, excerpt, tags, cover image, cover alt text, SEO metadata,
  and created/updated/published/archived timestamps.
- Defines `draft`, `published`, `scheduled`, and `archived` statuses.
- Hides drafts and archived entries from the public site.
- Hides scheduled entries until `publishedAt` has arrived.
- Shows formatted publication and update dates.
- Keeps cover images repository-local and compatible with static export.
Blog articles also have a desktop-only sticky timeline generated from their `h2`
and `h3` headings. It tracks the active section and reading progress, supports
keyboard navigation, and collapses below 900px so it does not crowd mobile readers.


The two starter article bodies were generated from the pre-existing titles and
excerpts. They must be reviewed by Mishael before any live deployment.

## CMS work not completed yet

Do not describe the CMS as production-ready yet. These phases remain:

1. Add and test local Keystatic UI and API routes.
2. Test create, edit, delete, image upload, archive, restore, schedule, and publish.
3. Add preview/draft mode.
4. Add GitHub authentication and deletion/recovery safeguards.
5. Migrate the runtime from static Cloudflare Pages to a Node-capable Next.js host
   (recommended: Vercel) while Cloudflare continues to manage/proxy the domain.
6. Create a staging deployment and verify the complete editorial workflow.
7. Switch the live domain only after staging approval and a rollback plan.

Why the migration is planned: Keystatic's Next.js admin and GitHub mode require
server-side API routes. The current Cloudflare Pages static export cannot run them.
`vercel.json` is currently a leftover and does not prove that production runs on Vercel.

## Blog post fields and visibility

The schema lives in `keystatic.config.ts`. Do not create a second independent post
list elsewhere.

- `title`: also controls the slug in Keystatic
- `status`: `draft | published | scheduled | archived`
- `excerpt`: required, maximum 240 characters
- `tags`: article topics
- `coverImage`: optional image in `public/images/blog/`
- `coverAlt`: accessibility description; require meaningful text when an image exists
- `createdAt`, `updatedAt`: required timestamps
- `publishedAt`: required before an entry can appear publicly
- `archivedAt`: set when archiving
- `seoTitle`: maximum 60 characters
- `seoDescription`: maximum 160 characters
- `content`: Markdoc article body

Public visibility is enforced in `src/lib/blog.ts`. A post appears only when it is
`published` or `scheduled`, has a `publishedAt` value, and that time is not in the
future. Archived and draft posts are not returned publicly.

## Adding or updating an article before the editor is finished

1. Copy an existing `content/posts/<slug>/index.mdoc` directory.
2. Rename the directory to the new URL-safe slug.
3. Update every frontmatter field.
4. Write the body below the closing frontmatter delimiter.
5. Use `draft` while writing.
6. Set `publishedAt` and use `published` for an immediate public build, or
   `scheduled` for a future timestamp.
7. Put a cover image in `public/images/blog/` and set both `coverImage` and
   descriptive `coverAlt`.
8. Run TypeScript, the production build, link checks, and content checks.
9. Review the output in both light and dark themes and at mobile width.

Current static-export limitation: a future scheduled post will need a rebuild after
its timestamp unless the planned runtime migration has been completed.

## Navigating and updating the rest of the site

- Home: `src/app/page.tsx`
- Work index: `src/app/work/page.tsx`
- Work detail routes: `src/app/work/[slug]/page.tsx`
- Services: `src/app/services/page.tsx`
- About: `src/app/about/page.tsx`
- Navigation: `src/components/Nav.tsx`
- Footer: `src/components/Footer.tsx`
- Work cards: `src/components/WorkCard.tsx`

The footer social profiles are centralized in `src/components/SocialLinks.tsx`.
Update URLs there rather than duplicating them in pages. Current profiles:

- GitHub: `https://github.com/mvallautomations`
- LinkedIn: `https://www.linkedin.com/in/mishaelvallar`
- Instagram: `https://www.instagram.com/mishaelvallar/`
- Threads: `https://www.threads.net/@mishaelvallar`
- X: `https://x.com/mishaelvallar`

External profile links open in a new tab with `noopener noreferrer` and accessible labels.
Portfolio work data has exactly one source: `src/data/work.ts`. The home page,
work index, and work detail routes read from it. Do not duplicate the list.

`status` describes the page visitors receive, not merely whether the underlying
system once ran. A placeholder case study is not `live`. Sort using explicit
`order`, never array position.

Never re-add `kuya-koks`, `ra-bautista`, or `graceland-farm`; those are not
permission-cleared client work. Never invent performance figures. Logged evidence
lives in `src/data/demo-runs/`.

Speed-to-Lead is not "Live at handlit.app". The handlit form and the private n8n
pipeline are separate systems. Keep the existing truthful wording.

## Design system

Preserve the Mid‑Voyage design tokens and existing component language.

- Parchment base: never use pure white or pure black as the page canvas.
- Terracotta: labels, eyebrows, links/hover accents only; never a large fill.
- Headings: Plus Jakarta Sans 800.
- Body: DM Sans.
- Utility labels/navigation: JetBrains Mono.
- Ghost word: DM Serif Display italic, exactly one word in a main headline.
- Radius: editorial and near-square, 3–16px; avoid pill-shaped cards.
- Both light and dark themes are required. Dark-mode ghost text is #B8B4AE on #18171A (8.65:1 measured contrast).

Do not silently modify canonical tokens in `src/app/globals.css`. Verify UI changes
in both themes and at desktop/mobile widths.

## Cover images and Canva assets

When Mishael provides a Canva link or exported image:

1. Confirm the intended article or page.
2. Prefer an exported WebP/JPG/PNG with adequate resolution.
3. Optimize dimensions and file size without visibly degrading it.
4. Store it in `public/images/blog/` using a descriptive lowercase filename.
5. Add meaningful alt text that describes the image rather than repeating the title.
6. Check cropping, loading, and contrast in both themes and on mobile.

Do not scrape a private Canva design or publish an asset without access/permission.

## Security and site health requirements

Security hardening is a required phase, not an optional polish pass:

- CMS routes must require authenticated GitHub repository access.
- Secrets belong only in local or host environment variables.
- Never expose OAuth client secrets through `NEXT_PUBLIC_*` variables.
- Validate and restrict upload type/size; do not render arbitrary HTML from content.
- Keep Markdoc rendering configured without raw HTML unless explicitly sanitized.
- Preserve restrictive CSP, frame denial, MIME sniffing protection, referrer policy,
  permissions policy, and HSTS where the production host supports them.
- Use Git/GitHub history as content recovery; prefer archive over destructive deletion.
- Require a staging test and rollback plan before changing the live host or DNS.
- Review dependency advisories and lockfile changes; do not blindly approve install scripts.
- Avoid third-party scripts until their purpose, data behavior, and consent needs are clear.

## Affiliate links and advertising

Monetization comes after the CMS, real content, analytics baseline, and security work.
Do not invent affiliate URLs, publisher IDs, or tracking identifiers.

Rules:

- Clearly disclose affiliate relationships near the relevant recommendation.
- Add links only when the article genuinely discusses the product/tool.
- Use descriptive link text and appropriate sponsored/nofollow attributes.
- Keep ads out of the hero and opening paragraphs.
- Prefer at most one contextual in-article recommendation and one post-article ad slot.
- Reserve dimensions to avoid layout shift.
- No pop-ups, deceptive download buttons, forced redirects, or disguised ads.
- Confirm privacy/cookie-consent requirements for the visitor regions before enabling
  personalized advertising or analytics.
- Measure reader impact and remove placements that materially harm reading or speed.

## Agent orchestration

Antigravity workspace agents are stored in .agents/agents/, the shared safety rule in
.agents/rules/, the Pages CMS skill in .agents/skills/, and the master workflow in
.agents/workflows/cms-orchestrate.md. Antigravity should discover them when this repository
is opened as a Project. Start with cms-architect, then invoke the cms-orchestrate workflow.

Model routing: use Gemini for architecture, implementation, integration, and difficult failures.
Use Claude Haiku only for the project agents cms-docs-haiku and cms-review-haiku under
.claude/agents/. Those roles use isolated worktrees, restricted tools, and bounded turns.
Neither tool may handle credentials or deploy without explicit approval.

Only one integration owner may merge or deploy. Parallel workers must use separate worktrees
and non-overlapping file allowlists.

## Commands and validation

Normal repository commands:

```bash
npm run dev
npm run lint
npm run build
npm run check:links
npm run check:content
```

`npm run build` is the release gate: Next build, internal-link crawl, then content
honesty checks. All must pass.

The current worktree was also validated with:

```bash
./node_modules/.bin/tsc --noEmit
./node_modules/.bin/next build
node scripts/check-links.mjs
node scripts/check-content.mjs
```

Latest production validation (2026-08-29):

- Focused ESLint passed for all files changed in this phase.
- TypeScript passed.
- Production static build passed.
- 15 pages generated, including both blog article routes.
- 13 internal links checked with no 404s.
- Content-honesty check passed.
- Headless Chrome passed at 390px, 768px, and 1280px with no horizontal overflow.
- Phone shows the mv monogram; tablet and desktop show the full wordmark.
- Footer contains five site-directory links and five requested social profiles.
- Dark ghost text measured 8.65:1 contrast; reduced-motion animation resolves to none.
- Cloudflare preview and production route, image, content, and security-header checks passed.

The full ESLint scan still has older unused-variable warnings in the ESLint config,
link checker, and blog reader. The previously reported internal-link and timeline
effect errors were fixed during this release.

Package installation on the current machine may report ignored build scripts for
`sharp` and `unrs-resolver`. Do not blindly approve them. The installed packages were
validated directly without weakening that policy. Markdoc must remain compatible with
Keystatic; the current explicit version is `@markdoc/markdoc@^0.4.0`.

## Current working tree

The CMS foundation, About portrait, responsive navigation, footer directories and social icons,
article timeline, accessible motion, and route loader are implemented and deployed. The worktree
remains uncommitted, so future agents must inspect git status and preserve all user changes.

Key changed and new paths include package.json, pnpm-lock.yaml, keystatic.config.ts,
content/posts/, public/images/about/, src/lib/blog.ts, the About and blog routes,
ArticleTimelineNav.tsx, MotionEnhancements.tsx, Nav.tsx, Footer.tsx, SocialLinks.tsx,
and their related styles and documentation.

Before continuing, inspect the actual working tree; do not assume this list is complete forever.

## Deployment and rollback

Current manual Cloudflare Pages deployment (production release dbcf493a, deployed 2026-08-29):

```bash
npx next build
npx wrangler pages deploy out --project-name=midvoyage-portfolio --branch=main
```

Do not run it without explicit approval. Pushing to GitHub currently does not deploy.

For the planned Vercel migration:

1. Preserve the current Cloudflare Pages project as rollback.
2. Create a staging Vercel deployment connected to GitHub.
3. Add Keystatic GitHub App credentials as server-only environment variables.
4. Test every editorial state and image operation.
5. Verify security headers, redirects, canonical URLs, performance, and themes.
6. Change the Cloudflare DNS/proxy target only after approval.
7. Keep the previous target documented so rollback is immediate.

## Definition of done for the full CMS project

The project is complete only when Mishael can log in privately and successfully:

- create a post;
- edit and autosave/recover work;
- upload and replace a cover image;
- preview the existing Mid‑Voyage design;
- keep a draft private;
- schedule a future publication;
- publish and unpublish;
- archive and restore;
- delete with a recoverable history;
- see correct created/updated/published timestamps;
- operate it from a documented staging and production workflow without editing code.

Security, accessibility, mobile behavior, both themes, build checks, and rollback must
also pass. Affiliate or AdSense placement is a separate final phase and is not required
for CMS readiness.
