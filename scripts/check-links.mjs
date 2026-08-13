#!/usr/bin/env node
/* ============================================================
   mid·voyage — internal link check
   ============================================================

   Added 2026-08-14, after /work/foss-lead-engine shipped as a live 404 and
   was found by a friend looking at a phone screenshot. Nothing in the build
   noticed: `next build` succeeded, TypeScript passed, the page rendered, and
   the card linked confidently to a route that generateStaticParams never
   emitted. Same class of problem as the n8n parse_mode bug — broken while
   every indicator said fine.

   What this does: serves the static export, crawls every internal link on
   every page, and asserts 200. Any 404 fails the build.

   Two deliberate choices:

   - It seeds the crawl with EVERY html file in the export, not just "/".
     A page that nothing links to yet still gets its own links checked.
   - It only checks internal links. External URLs would make the build
     depend on the network and on other people's uptime, which turns a
     correctness gate into a flaky one. Internal 404s are the failure this
     is here to catch, and they are fully determined by the export.

   Usage:  node scripts/check-links.mjs [outDir]
   ============================================================ */

import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat, readdir, readFile } from "node:fs/promises";
import { join, extname, resolve, relative } from "node:path";

const OUT = resolve(process.argv[2] ?? "out");

const MIME = {
  ".html": "text/html", ".js": "text/javascript", ".css": "text/css",
  ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png",
  ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp",
  ".ico": "image/x-icon", ".woff": "font/woff", ".woff2": "font/woff2",
  ".mp4": "video/mp4", ".webm": "video/webm", ".txt": "text/plain",
};

/** Resolve a URL path the way a static host serves this export
    (next.config.ts sets output: "export", trailingSlash: false). */
async function resolveFile(pathname) {
  const rel = decodeURIComponent(pathname).replace(/^\/+/, "");
  const base = join(OUT, rel);
  // Refuse to escape the export directory.
  if (!base.startsWith(OUT)) return null;
  for (const candidate of [base, `${base}.html`, join(base, "index.html")]) {
    try {
      const s = await stat(candidate);
      if (s.isFile()) return candidate;
    } catch {
      /* try the next candidate */
    }
  }
  return null;
}

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

/** Pull internal link targets out of a page. */
function extractLinks(html) {
  const found = new Set();
  const patterns = [
    /<a\b[^>]*?\bhref\s*=\s*["']([^"']+)["']/gi,
    /<link\b[^>]*?\brel\s*=\s*["'](?:canonical|alternate)["'][^>]*?\bhref\s*=\s*["']([^"']+)["']/gi,
  ];
  for (const re of patterns) {
    for (const [, raw] of html.matchAll(re)) {
      const href = raw.trim();
      // Skip anything that does not resolve inside this site.
      if (!href || href.startsWith("#")) continue;
      if (/^[a-z][a-z0-9+.-]*:/i.test(href)) continue; // http:, mailto:, tel:
      if (href.startsWith("//")) continue;             // protocol-relative
      if (!href.startsWith("/")) continue;             // export emits absolute paths
      found.add(href.split("#")[0].split("?")[0]);
    }
  }
  return [...found].filter(Boolean);
}

const server = createServer(async (req, res) => {
  const pathname = new URL(req.url, "http://localhost").pathname;
  const file = await resolveFile(pathname);
  if (!file) {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("Not Found");
    return;
  }
  res.writeHead(200, { "content-type": MIME[extname(file)] ?? "application/octet-stream" });
  createReadStream(file).pipe(res);
});

try {
  await stat(OUT);
} catch {
  console.error(`\n  Link check: no export found at ${OUT}. Run the build first.\n`);
  process.exit(1);
}

await new Promise((r) => server.listen(0, "127.0.0.1", r));
const origin = `http://127.0.0.1:${server.address().port}`;

// Seed with every page in the export, so orphan pages are checked too.
const pages = [];
for await (const file of walk(OUT)) {
  if (extname(file) !== ".html") continue;
  const rel = relative(OUT, file).replace(/\\/g, "/");
  const url = rel === "index.html"
    ? "/"
    : `/${rel.replace(/\/index\.html$/, "").replace(/\.html$/, "")}`;
  pages.push(url);
}

const status = new Map();       // url -> status code
const brokenBy = new Map();     // broken url -> Set(pages linking to it)
let checked = 0;

async function head(url) {
  if (status.has(url)) return status.get(url);
  const res = await fetch(origin + url, { redirect: "manual" });
  status.set(url, res.status);
  checked++;
  return res.status;
}

for (const page of pages) {
  const res = await fetch(origin + page);
  if (res.status !== 200) {
    // A page in the export that will not serve is itself a failure.
    if (!brokenBy.has(page)) brokenBy.set(page, new Set(["(export)"]));
    continue;
  }
  const html = await res.text();
  for (const link of extractLinks(html)) {
    const code = await head(link);
    if (code !== 200) {
      if (!brokenBy.has(link)) brokenBy.set(link, new Set());
      brokenBy.get(link).add(page);
    }
  }
}

server.close();

const pageWord = pages.length === 1 ? "page" : "pages";
if (brokenBy.size === 0) {
  console.log(
    `\n  Link check passed: ${checked} internal links across ${pages.length} ${pageWord}, no 404s.\n`,
  );
  process.exit(0);
}

console.error(`\n  Link check FAILED: ${brokenBy.size} broken internal link(s).\n`);
for (const [url, sources] of [...brokenBy].sort()) {
  console.error(`    ${url}  ->  ${status.get(url) ?? 404}`);
  for (const src of [...sources].sort()) console.error(`        linked from ${src}`);
}
console.error(
  `\n  ${checked} internal links checked across ${pages.length} ${pageWord}.` +
  `\n  A card must not link to a route the build does not emit.\n`,
);
process.exit(1);
