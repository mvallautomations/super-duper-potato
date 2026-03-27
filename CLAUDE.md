# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal portfolio for Mishael Vallar (handl'it AI Consultancy). Brand: **mid.voyage**.
Deploy target: Vercel free tier at `mvallarautomations.cc`.

## Commands

```bash
npm run dev      # Start dev server (next dev)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint (eslint .)
```

No test framework is configured.

## Stack

- **Next.js 16** (App Router, TypeScript, Tailwind CSS v4)
- **React 19**
- Path alias: `@/*` → `src/*`
- Turbopack is intentionally disabled — do not enable it

## Architecture

```
src/
  app/              # Next.js App Router pages
    globals.css     # Design tokens + all global styles
    layout.tsx      # Root layout — fonts, metadata, theme attr
    page.tsx        # Homepage: Hero, Bio, Work index
    about/          # /about
    blog/[slug]/    # MDX blog posts (not yet wired)
    work/[slug]/    # Case study pages
  components/
    Nav.tsx         # Sticky nav with theme toggle
    Footer.tsx
    WorkCard.tsx    # Reusable case study card
  lib/
    blog.ts         # Blog post utilities
```

All request APIs are async (Next.js 16): `await cookies()`, `await headers()`, `await params`.

## Design System — DO NOT MODIFY TOKENS

All design tokens live in `src/app/globals.css`. The design system is strict:

| Rule | Value |
|------|-------|
| Background base | `#EDEAE3` parchment — **never pure white** |
| Accent (terracotta) | `#C85A3C` — **labels/eyebrows ONLY** |
| Ghost italic word | DM Serif Display italic, color `--ink-ghost` — **one word per headline max** |
| Headings | Plus Jakarta Sans 800 |
| Body | DM Sans 300–500 |
| Labels / mono | JetBrains Mono |

**Four fonts** are loaded via `next/font/google` in `layout.tsx` as CSS variables:
`--font-jakarta`, `--font-dm-sans`, `--font-dm-serif`, `--font-mono`

Dark mode is toggled via `data-theme="dark"` on `<html>`. Default is light.

## Content

The three featured work case studies are: `kuya-koks` (Filipino restaurant), `ra-bautista` (law firm), and a third placeholder. Static params are generated in `src/app/work/[slug]/page.tsx`.
