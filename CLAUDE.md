# CLAUDE.md

@AGENTS.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Read [`AGENTS.md`](AGENTS.md) first.** It is the current operational source of
> truth for the CMS work completed so far, the content workflow, navigation map,
> security and monetization guardrails, validation status, deployment migration,
> rollback requirements, and remaining phases. Where this file is stale or less
> specific, follow `AGENTS.md` and update both documents deliberately.

## Project

Personal portfolio for Mishael Vallar. Brand: **mid·voyage** (the content arm; handlit is the
separate delivery company — everything that sells signs off handlit, this site documents).
Live at `https://mvallarautomations.cc`.

Repository: `github.com/mvallautomations/midvoyage-portfolio`.

## Deploy — Cloudflare Pages, NOT git-connected

Pushing to GitHub does **not** deploy. Deploys are manual (corrected 2026-08-06; the old
Vercel claim in this file was stale — `vercel.json` is a leftover):

```bash
npx next build && npx wrangler pages deploy out --project-name=midvoyage-portfolio --branch=main
```

`next.config.ts` sets `output: "export"` — the site is a static export in `out/`.
No server components at runtime, no API routes, no async request APIs beyond `await params`.

## Commands

```bash
npm run dev            # Start dev server (next dev)
npm run build          # Build + link check + content check. All three must pass.
npm run check:links    # Crawl every internal link, assert 200
npm run check:content  # Assert no false status labels and no known-bad claims
npm run lint           # ESLint (eslint .)
```

No test framework is configured in-repo; e2e checks are run ad hoc with Playwright MCP.

**`npm run build` is the gate — do not route around it.** If a check fails, the
copy or the data is wrong; fix that, never the check. Both checks exist because
the thing they catch already shipped to the live site once (see below).

## Stack

- **Next.js 16** (App Router, TypeScript, Tailwind CSS v4), static export
- **React 19**
- Path alias: `@/*` → `src/*`
- Turbopack is intentionally disabled — do not enable it

## Architecture

```text
src/
  app/              # Next.js App Router pages
    globals.css     # Design tokens + all global styles
    layout.tsx      # Root layout — fonts, metadata, theme attr
    page.tsx        # Homepage: Hero, Bio, Work index
    about/          # /about
    blog/[slug]/    # Blog posts
    work/[slug]/    # Case study pages (see Content below)
  components/
    Nav.tsx         # Sticky nav with theme toggle
    Footer.tsx
    WorkCard.tsx    # Reusable case study card
    RunReplay.tsx   # Animated replay of logged n8n executions
  data/demo-runs/   # Verbatim copies of agent repos' evidence/runs.json (see its README)
  lib/
    blog.ts         # Blog post utilities
    demo-adapters.ts # runs.json → normalized ReplayRun shape
```

## Design System — DO NOT MODIFY TOKENS

All design tokens live in `src/app/globals.css`. The design system is strict:

| Rule | Value |
|------|-------|
| Background base | `#EDEAE3` parchment — **never pure white** |
| Accent (terracotta) | `#C85A3C` — **labels/eyebrows ONLY, never a fill** |
| Ghost italic word | DM Serif Display italic, color `--ink-ghost` — **one word per headline max** |
| Headings | Plus Jakarta Sans 800 |
| Body | DM Sans 300–500 |
| Labels / mono | JetBrains Mono |
| Radius | near-square, 3–16px — no pill cards |

**Four fonts** are loaded via `next/font/google` in `layout.tsx` as CSS variables:
`--font-jakarta`, `--font-dm-sans`, `--font-dm-serif`, `--font-jetbrains`

Dark mode is toggled via `data-theme="dark"` on `<html>`. Default is light. Verify both themes.

## Content — hard rules

### Work data has ONE source: `src/data/work.ts`

Every project's slug, order, status, tags, description and showcase links live there.
`app/page.tsx`, `app/work/page.tsx` and `app/work/[slug]/page.tsx` all read from it, and
routes are generated from it.

Before 2026-08-14 the same six projects were declared in all three files independently.
That is how the site ended up shipping a card that linked to `/work/foss-lead-engine`
when no such route was ever generated — a live 404 — and three cards labelled "Live"
over pages that said "Case study in progress". **Do not reintroduce a second list.**

- **`status` describes the PAGE, not the system.** A working, running system whose case
  study is still a placeholder is `in-progress`. A card claiming Live over a placeholder
  is a false claim made *before* the visitor clicks. `check:content` enforces this.
- **`order` is explicit and sorted on.** Never rely on array position.
- Adding a project means: add it to `work.ts`, give it an order, be honest about status,
  and either write `sections` for it in `work/[slug]/page.tsx` or leave it `in-progress`.

### Brand — mid·voyage and handlit never mix

This site is **mid·voyage**, the content arm. **handlit** is the delivery company.
Linking *out* to handlit.app is correct and expected; this site documents that work.
What is never correct is describing handlit's things as if they run here, or the reverse.

- **Never re-add** `kuya-koks`, `ra-bautista`, or `graceland-farm` — unpaid engagements,
  not client work, not permission-cleared.
- **Never invent numbers.** Latencies and outcomes shown on `/work/*` come verbatim from
  `src/data/demo-runs/*.json` (copied from each agent repo's `evidence/runs.json`).
  Speed-to-Lead's end-to-end figure is **7.4s** — not 6.75, not 7.8.
- **Speed-to-Lead is NOT "live at handlit.app".** The handlit.app form posts to a
  Cloudflare Function that sends a Telegram alert. The 7.4s pipeline is a separate
  self-hosted n8n workflow in a private repo. This exact overstatement had already been
  corrected off her OnlineJobs.ph profile and came straight back onto this site; it was
  removed again 2026-08-14 and `check:content` now fails the build on it. The card says
  **"Offer at handlit.app"**.
  The Lead-Gen Engine *may* say "Live at handlit.app" — its page genuinely is live at
  `handlit.app/systems/lead-engine.html`. The destination is what separates the true
  claim from the false one.
- **Facts shared with a handlit page must agree with it.** The Lead-Gen Engine write-up
  and `handlit.app/systems/lead-engine.html` state the same figures and both say the
  demo dashboard runs on simulated data. If one changes, change both.

### When a wrong claim is found and fixed, add it to the check

`scripts/check-content.mjs` holds a `FORBIDDEN_CLAIMS` list. A corrected overstatement
that lives only in prose comes back — both of the ones above were already written down
as rules before they shipped anyway. Put it in the list so a build fails on it.
