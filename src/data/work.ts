/* ============================================================
   mid·voyage — Work data (single source of truth)
   ============================================================

   Created 2026-08-14. Before this, the same six projects were declared
   three separate times: featuredWork in src/app/page.tsx, allWork in
   src/app/work/page.tsx, and projects in src/app/work/[slug]/page.tsx.
   That duplication is what let the data drift out of sync with reality:
   every card claimed status "live" while two of the pages behind them
   rendered nothing but "Case study in progress", and a sixth card linked
   to a slug that had no page at all.

   Two rules hold this together, and both are enforced here rather than by
   convention:

   1. STATUS IS ABOUT THE PAGE, NOT THE SYSTEM. A card may only say "live"
      if clicking it lands on a real write-up. A working system whose case
      study is still a placeholder is "in-progress". The label has to be
      honest before the click, not after it.

   2. ORDER IS EXPLICIT. Display order comes from the `order` field and is
      sorted on, so re-ordering cannot happen by accident when someone
      edits, moves or appends an entry.

   Adding a project? Add it here, give it an order, and be honest about
   status. src/app/work/[slug]/page.tsx must then either carry `sections`
   for it or have logged runs in demoRunsBySlug, otherwise the page is a
   placeholder and the status here must say "in-progress".

   Rewritten from the 2026-08-06 entries (M's call): kuya-koks, ra-bautista
   and graceland-farm were unpaid engagements not to be presented as client
   work, and ra-bautista was never permission-cleared. Do not re-add them.
   Every entry below is own-operations work with a verifiable public link.
   ============================================================ */

export type WorkStatus = "live" | "in-progress" | "concept";

export interface WorkItem {
  /** URL slug: /work/<slug>. Must have a page behind it. */
  slug: string;
  /** Explicit display order, ascending. Sorted on, never implicit. */
  order: number;
  eyebrow: string;
  title: string;
  description: string;
  tags: string[];
  /** See rule 1 above: this describes the case study page, not the system. */
  status: WorkStatus;
  year: string;
  /** Larger card treatment. */
  featured?: boolean;
  /** Whether this appears in the homepage selection. */
  featuredOnHome?: boolean;
  showcaseLinks?: { label: string; href?: string }[];
}

const work: WorkItem[] = [
  {
    slug: "review-reply-agent",
    order: 1,
    eyebrow: "AI Agents · Reputation",
    title: "Review & Reply Agent",
    description:
      "Reads a customer review, escalates anything serious to the owner and drafts the rest for one-tap approval. It never posts on its own. Verified across three live executions averaging 3.48s — a 5-star queued, a food-poisoning-plus-legal-threat escalated, a child-illness complaint escalated.",
    tags: ["n8n", "Claude API", "Escalation Rules"],
    // Live: three logged runs replay on the page.
    status: "live",
    year: "2026",
    featuredOnHome: true,
    showcaseLinks: [
      { label: "Source Repo", href: "https://github.com/mvallautomations/review-reply-agent" },
      { label: "Case Study", href: "/work/review-reply-agent" },
    ],
  },
  {
    slug: "inbox-triage-agent",
    order: 2,
    eyebrow: "AI Agents · Operations",
    title: "Inbox Triage Agent",
    description:
      "Extracts quote details from an inbound email without inventing numbers, and escalates anything touching money or lawyers to a human. 3.19s per run against live executions. The constraint that matters is what it refuses to do unsupervised.",
    tags: ["n8n", "Claude API", "Structured Extraction"],
    // Live: logged runs replay on the page.
    status: "live",
    year: "2026",
    featuredOnHome: true,
    showcaseLinks: [
      { label: "Source Repo", href: "https://github.com/mvallautomations/inbox-triage-agent" },
      { label: "Case Study", href: "/work/inbox-triage-agent" },
    ],
  },
  {
    slug: "content-repurposer-agent",
    order: 3,
    eyebrow: "AI Agents · Content",
    title: "Content Repurposer Agent",
    description:
      "Turns one piece of long-form work into platform-native posts, and gates its own output against brand-voice rules enforced in code rather than in a prompt. If the draft breaks a rule, it does not ship.",
    tags: ["n8n", "Claude API", "Brand-Voice Linting"],
    // Live: logged runs replay on the page.
    status: "live",
    year: "2026",
    showcaseLinks: [
      { label: "Source Repo", href: "https://github.com/mvallautomations/content-repurposer-agent" },
      { label: "Case Study", href: "/work/content-repurposer-agent" },
    ],
  },
  {
    slug: "foss-lead-engine",
    order: 4,
    eyebrow: "AI Systems · Prospecting",
    title: "Lead-Gen Engine — open-source core",
    description:
      "A prospecting pipeline that scrapes, scores each prospect 0–100 against an ideal customer profile, personalizes a first line, and stages the outreach. The open-source core replaced roughly $350 a month of SaaS with about 600 lines of dependency-free Python — live OpenStreetMap extraction, SQLite persistence, an audit log. The public demo dashboard runs on simulated data, and the page says so.",
    tags: ["Python", "OpenStreetMap", "SQLite", "n8n"],
    // Live as of 2026-08-14: was a 404, now carries a full written case
    // study (see the sections entry in work/[slug]/page.tsx).
    status: "live",
    year: "2026",
    showcaseLinks: [
      { label: "Live at handlit.app", href: "https://handlit.app/systems/lead-engine.html" },
      { label: "Interactive Demo", href: "https://handlit.app/demos/lead-dashboard/" },
      { label: "Case Study", href: "/work/foss-lead-engine" },
    ],
  },
  {
    slug: "speed-to-lead",
    order: 5,
    eyebrow: "AI Systems · Lead Qualification",
    title: "Speed-to-Lead — inbound qualifier",
    description:
      "Nine-node pipeline: form intake, LLM scoring against a rubric, hot/nurture routing, a personalised reply, an owner alert and a CRM write. 7.4 seconds end to end, verified across four logged executions. Ordering is enforced structurally — the CRM write is a graph dependency of the send steps, so a failed email can never lose the lead.",
    tags: ["n8n", "Claude API", "Telegram", "SMTP", "SQLite"],
    // In progress: the system is real and running, but /work/speed-to-lead
    // is still the "Case study in progress" placeholder. It said "live"
    // until 2026-08-14, which was the claim this file now prevents.
    status: "in-progress",
    year: "2026",
    featured: true,
    featuredOnHome: true,
    showcaseLinks: [
      { label: "Live at handlit.app", href: "https://handlit.app" },
      { label: "Interactive Demo", href: "https://handlit.app/demo/" },
      { label: "Case Study", href: "/work/speed-to-lead" },
    ],
  },
  {
    slug: "handlit-agent-architect",
    order: 6,
    eyebrow: "AI Agents · Browser",
    title: "handlit Agent Architect",
    description:
      "Chrome side-panel agent that studies a business's site and designs the custom chat agent it actually needs. Bring your own key — runs on Ollama, OpenRouter, or any OpenAI-compatible endpoint, so nothing is locked to a vendor.",
    tags: ["Chrome Extension", "BYOK", "Ollama", "OpenRouter"],
    // In progress: the extension exists, the case study page does not yet.
    status: "in-progress",
    year: "2026",
    showcaseLinks: [
      { label: "Source Repo", href: "https://github.com/mvallautomations/handlit-agent-architect" },
      { label: "Case Study", href: "/work/handlit-agent-architect" },
      { label: "Offer at handlit.app", href: "https://handlit.app/#agent-architect" },
    ],
  },
];

const byOrder = (a: WorkItem, b: WorkItem) => a.order - b.order;

/** Every project, in explicit display order. */
export const allWork: WorkItem[] = [...work].sort(byOrder);

/** The homepage selection, in the same explicit order. */
export const featuredWork: WorkItem[] = allWork.filter((w) => w.featuredOnHome);

export const workBySlug: Record<string, WorkItem> = Object.fromEntries(
  allWork.map((w) => [w.slug, w]),
);
