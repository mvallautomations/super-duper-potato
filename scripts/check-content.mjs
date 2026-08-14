#!/usr/bin/env node
/* ============================================================
   mid·voyage — content honesty check
   ============================================================

   Added 2026-08-14. Companion to check-links.mjs. That one asserts a link
   goes somewhere; this one asserts the page does not claim something untrue.

   Both failures it guards against had already happened and shipped:

   1. Three cards were labelled "Live 2026" over pages whose entire body was
      "Case study in progress — full write-up coming soon." The label was a
      claim, and the claim was false before the visitor clicked.

   2. Speed-to-Lead was described as "Live at handlit.app". The handlit.app
      form posts to a Cloudflare Function that sends a Telegram alert; the
      7.4s pipeline is a separate self-hosted n8n workflow in a private repo.
      That exact overstatement had already had to be corrected off her
      OnlineJobs.ph profile, and it came straight back here.

   A written rule did not prevent either one. Both rules existed in prose
   before the copy shipped. This file is the same rules as assertions, run
   against the built output, failing the build.

   Usage:  node scripts/check-content.mjs [outDir]
   ============================================================ */

import { readdir, readFile, stat } from "node:fs/promises";
import { join, extname, resolve, relative } from "node:path";

const OUT = resolve(process.argv[2] ?? "out");

/** Text a placeholder case study renders. If a page says this, it is not done. */
const PLACEHOLDER = "Case study in progress";

/**
 * Claims that are false and have shipped before, matched as link text paired
 * with a destination. Matching the anchor rather than nearby words matters:
 * on /work the Lead-Gen Engine card sits directly above Speed-to-Lead, and it
 * legitimately does say "Live at handlit.app" because its page really is live
 * there. Only the destination separates the true claim from the false one.
 *
 * Add to this list whenever a wrong claim is found and fixed, so a corrected
 * overstatement cannot quietly return.
 */
const FORBIDDEN_CLAIMS = [
  {
    text: "Live at handlit.app",
    // The bare root. /systems/lead-engine.html is a real live page and passes.
    href: /^https:\/\/handlit\.app\/?$/,
    why: "The 7.4s pipeline is a private self-hosted n8n workflow. handlit.app runs a Cloudflare Function that sends a Telegram alert. Do not conflate them — this overstatement already had to be corrected off her OnlineJobs.ph profile.",
  },
];

/** Every anchor on a page as { text, href }. */
function anchors(html) {
  const out = [];
  for (const m of html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi)) {
    const href = m[1].match(/\bhref\s*=\s*["']([^"']*)["']/i)?.[1] ?? "";
    out.push({ href, text: stripTags(m[2]).trim() });
  }
  return out;
}

function stripTags(html) {
  return html
    .replace(/<script\b[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ");
}

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

try {
  await stat(OUT);
} catch {
  console.error(`\n  Content check: no export found at ${OUT}. Run the build first.\n`);
  process.exit(1);
}

const failures = [];
let pages = 0;

for await (const file of walk(OUT)) {
  if (extname(file) !== ".html") continue;
  pages++;
  const rel = relative(OUT, file).replace(/\\/g, "/");
  const url = rel === "index.html" ? "/" : `/${rel.replace(/\.html$/, "")}`;
  const raw = await readFile(file, "utf8");
  const text = stripTags(raw);

  // 1. A page whose status says Live must not be a placeholder.
  //    Status is rendered as "Status <value>" in the case study header.
  const status = text.match(/Status\s+(Live|In progress|Concept)\b/i)?.[1];
  if (status?.toLowerCase() === "live" && text.includes(PLACEHOLDER)) {
    failures.push({
      url,
      problem: `marked "Live" but the page body is still the placeholder`,
      why: `A card claiming Live over a placeholder is a false claim made before the click. Set status to "in-progress" in src/data/work.ts, or write the case study.`,
    });
  }

  // 2. Claims that are known to be false, matched as link text + destination.
  for (const a of anchors(raw)) {
    for (const claim of FORBIDDEN_CLAIMS) {
      if (a.text !== claim.text) continue;
      if (!claim.href.test(a.href)) continue;
      failures.push({
        url,
        problem: `links "${a.text}" to ${a.href}`,
        why: claim.why,
      });
    }
  }
}

if (failures.length === 0) {
  console.log(`\n  Content check passed: ${pages} pages, no false status labels, no known-bad claims.\n`);
  process.exit(0);
}

console.error(`\n  Content check FAILED: ${failures.length} problem(s).\n`);
for (const f of failures) {
  console.error(`    ${f.url}`);
  console.error(`        ${f.problem}`);
  console.error(`        ${f.why}\n`);
}
process.exit(1);
