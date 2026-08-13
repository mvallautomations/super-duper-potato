import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RunReplay from "@/components/RunReplay";
import AgentSimulator from "@/components/AgentSimulator";
import { demoRunsBySlug } from "@/lib/demo-adapters";
import { simulatorConfigs } from "@/lib/simulator-configs";
import { allWork, workBySlug, type WorkStatus } from "@/data/work";

// Rewritten 2026-08-06 (M's call): kuya-koks, ra-bautista and graceland-farm
// were unpaid engagements not to be presented as client work; ra-bautista was
// never permission-cleared. Do not re-add them. Every entry is own-operations
// work with a verifiable public link.
// Long-form case study copy. Title, eyebrow, tags, year and status all come
// from src/data/work.ts so a card and its page can never disagree — that
// disagreement is exactly what let three cards claim "Live" over placeholders.
// This record carries only what is specific to the full page.
const caseStudies: Record<
  string,
  {
    /** Fuller than the card description, which stays in work.ts. */
    description: string;
    /**
     * Long-form write-up. Present only on case studies that have real content
     * but no logged n8n runs to replay (the RunReplay path takes precedence).
     * A project with neither falls through to the "in progress" placeholder,
     * and its card must be marked status "in-progress" so the label matches.
     */
    sections?: { heading: string; body: string }[];
  }
> = {
  "speed-to-lead": {
    description:
      "A nine-node pipeline that takes an inbound enquiry from form submission to scored, routed, replied-to and logged in 7.4 seconds — verified across four logged executions, not a demo run. Ordering is enforced structurally rather than by convention: the CRM write is a graph dependency of the send steps, so a failed email can never lose the lead. Node references are explicit rather than positional, so rewiring cannot silently change behaviour. Hardened against malformed submissions after a blank POST was found to break the send stage.",
  },
  "review-reply-agent": {
    description:
      "Reads a customer review, escalates anything serious to the owner, and drafts the rest for one-tap approval. It never posts on its own — that constraint is the product, not a limitation. Verified across three live executions averaging 3.48 seconds: a five-star queued for approval, a two-star combining food poisoning with a legal threat escalated, a one-star about a child's illness escalated.",
  },
  "inbox-triage-agent": {
    description:
      "Extracts quote details from an inbound email without inventing numbers, and escalates anything touching money or lawyers to a human. 3.19 seconds per run against live executions. What it refuses to do unsupervised is the part that makes it safe to run unsupervised.",
  },
  "content-repurposer-agent": {
    description:
      "Turns one piece of long-form work into platform-native posts, and gates its own output against brand-voice rules enforced in code rather than asked for in a prompt. If a draft breaks a rule, it does not ship. Prompts drift; a linter does not.",
  },
  "handlit-agent-architect": {
    description:
      "A Chrome side-panel agent that studies a business's website and designs the custom chat agent it actually needs. Bring your own key — it runs on Ollama, OpenRouter, or any OpenAI-compatible endpoint, so nothing is locked to a single vendor and nothing is billed per seat.",
  },
  // Added 2026-08-14. This page did not exist, so /work/foss-lead-engine was a
  // hard 404 that both work cards linked to. Facts below are taken from the
  // handlit page for the same system (handlit.app/systems/lead-engine.html) and
  // from lead-scraping-lab/foss-personal-os/README.md. The simulated-data note
  // is deliberate and must keep matching what the handlit page says.
  "foss-lead-engine": {
    description:
      "A prospecting pipeline that pulls real businesses from open data, scores each one against an ideal customer profile, writes an opening line, and stages the outreach. The open-source core replaced roughly $350 a month of SaaS with about 600 lines of dependency-free Python.",
    sections: [
      {
        heading: "What it replaces",
        body: "The core is about 600 lines of Python with no third-party dependencies. It stands in for four paid tools: a scraper at roughly $150 a month, a hosted scoring API at roughly $50, a hosted database at roughly $50, and a sending tool at roughly $97. The itemised list lives in the repo README, so the figure is a sum rather than an estimate made after the fact.",
      },
      {
        heading: "Where the prospects come from",
        body: "Extraction is a live query against the OpenStreetMap Overpass API. OpenStreetMap is open data under ODbL and Overpass is a public endpoint, so there is no key, no bill, and no terms-of-service problem. Google Maps, LinkedIn and Apollo all forbid scraping in their terms, which is the reason this pipeline does not touch them.",
      },
      {
        heading: "What it keeps",
        body: "Every run is written to SQLite: the prospects, the score each one was given, and the reason for it. Rejected prospects are recorded rather than dropped. If a scoring rule turns out to be wrong, it can be re-run against the same set instead of a fresh scrape.",
      },
      {
        heading: "The audit log",
        body: "A second table records one row per action taken against a lead, timestamped. When a prospect reaches outreach, the log shows which query found it, what it scored, and why. That is the part that makes the pipeline safe to leave running unattended.",
      },
      {
        heading: "What the demo shows, and what it does not",
        body: "The dashboard published on handlit.app runs on simulated data. The extraction, the scoring and the persistence are real code with a real database behind them, but a public demo page is not a good reason to scrape live businesses. The CSV export in the demo is genuine, so the shape of the output is the shape of the output.",
      },
    ],
  },
};

const projectShowcaseLinks: Record<
  string,
  { label: string; href?: string }[]
> = {
  "speed-to-lead": [
    { label: "Live at handlit.app", href: "https://handlit.app" },
    { label: "Interactive Demo", href: "https://handlit.app/demo/" },
    { label: "Case Study", href: "https://handlit.app/case-study-speed-to-lead" },
  ],
  "review-reply-agent": [
    { label: "Source Repo", href: "https://github.com/mvallautomations/review-reply-agent" },
  ],
  "inbox-triage-agent": [
    { label: "Source Repo", href: "https://github.com/mvallautomations/inbox-triage-agent" },
  ],
  "content-repurposer-agent": [
    { label: "Source Repo", href: "https://github.com/mvallautomations/content-repurposer-agent" },
  ],
  "handlit-agent-architect": [
    { label: "Source Repo", href: "https://github.com/mvallautomations/handlit-agent-architect" },
  ],
  "foss-lead-engine": [
    { label: "Live at handlit.app", href: "https://handlit.app/systems/lead-engine.html" },
    { label: "Interactive Demo", href: "https://handlit.app/demos/lead-dashboard/" },
  ],
};

export const dynamicParams = false;

/** How a status reads on the case study page itself. */
const statusLabel: Record<WorkStatus, string> = {
  live: "Live",
  "in-progress": "In progress",
  concept: "Concept",
};

/**
 * Compose the page from the shared card data plus the long-form copy.
 * Routes are generated from work.ts, so any project listed on a card is
 * guaranteed to have a page — the 404 on /work/foss-lead-engine happened
 * because that guarantee did not exist.
 */
function getProject(slug: string) {
  const item = workBySlug[slug];
  if (!item) return null;
  const study = caseStudies[slug];
  return {
    title: item.title,
    eyebrow: item.eyebrow,
    tags: item.tags,
    year: item.year,
    status: statusLabel[item.status],
    description: study?.description ?? item.description,
    sections: study?.sections,
  };
}

export function generateStaticParams() {
  return allWork.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Not Found" };

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return (
    <>
      <Nav />

      <main>
        {/* === CASE STUDY HEADER === */}
        <section
          style={{
            paddingTop: "clamp(3.5rem, 8vw, 6rem)",
            paddingBottom: "clamp(2rem, 5vw, 4rem)",
          }}
        >
          <div className="mv-container">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "2rem",
              }}
            >
              <Link
                href="/work"
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--ink-secondary)",
                  textDecoration: "none",
                }}
              >
                ← Work
              </Link>
            </div>

            <p
              className="eyebrow"
              style={{ marginBottom: "1.25rem", color: "var(--accent-terra)" }}
            >
              {project.eyebrow}
            </p>

            <h1
              style={{
                fontFamily: "var(--font-jakarta)",
                fontWeight: 800,
                fontSize: "clamp(2rem, 5.5vw, 3.5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                maxWidth: "22ch",
                marginBottom: "1.5rem",
              }}
            >
              {project.title}
            </h1>

            <div
              style={{
                display: "flex",
                gap: "2.5rem",
                flexWrap: "wrap",
                marginBottom: "2rem",
              }}
            >
              {[
                { label: "Status", value: project.status },
                { label: "Year", value: project.year },
              ].map((meta) => (
                <div key={meta.label}>
                  <p
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      fontSize: "0.7rem",
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      color: "var(--ink-secondary)",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {meta.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "1rem",
                      color: "var(--ink-primary)",
                      fontWeight: 500,
                    }}
                  >
                    {meta.value}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: "var(--font-jetbrains)",
                    fontSize: "0.7rem",
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    padding: "0.25rem 0.65rem",
                    borderRadius: "3px",
                    border: "1px solid var(--border-light)",
                    color: "var(--ink-secondary)",
                    backgroundColor: "var(--bg-elevated)",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div
              style={{
                display: "flex",
                gap: "0.5rem",
                flexWrap: "wrap",
                marginTop: "1.5rem",
              }}
            >
              {projectShowcaseLinks[slug]?.map((item) =>
                item.href ? (
                  <Link
                    key={item.label}
                    href={item.href}
                    style={{
                      fontFamily: "var(--font-jetbrains)",
                      fontSize: "0.7rem",
                      fontWeight: 500,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      padding: "0.35rem 0.7rem",
                      borderRadius: "3px",
                      border: "1px solid var(--border-medium)",
                      color: "var(--ink-primary)",
                      backgroundColor: "var(--bg-elevated)",
                      textDecoration: "none",
                    }}
                  >
                    {item.label} →
                  </Link>
                ) : null
              )}
            </div>
          </div>
        </section>

        <div className="mv-container">
          <hr className="mv-rule" />
        </div>

        {/* === CASE STUDY CONTENT === */}
        <section
          style={{
            paddingBlock: "clamp(3rem, 6vw, 5rem)",
          }}
        >
          <div className="mv-container" style={{ maxWidth: "72ch" }}>
            {demoRunsBySlug[slug] ? (
              <div style={{ display: "grid", gap: "2rem" }}>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "1.0625rem",
                    lineHeight: 1.7,
                    color: "var(--ink-secondary)",
                    margin: 0,
                  }}
                >
                  {project.description}
                </p>

                <div>
                  <p
                    className="eyebrow"
                    style={{
                      marginBottom: "0.5rem",
                      color: "var(--accent-terra)",
                    }}
                  >
                    The film
                  </p>
                  <video
                    controls
                    preload="none"
                    poster={`/videos/agent-demo-${slug}-poster.jpg`}
                    style={{
                      width: "100%",
                      borderRadius: "10px",
                      border: "1px solid var(--border-light)",
                      display: "block",
                    }}
                  >
                    <source src={`/videos/agent-demo-${slug}.mp4`} type="video/mp4" />
                  </video>
                </div>

                {simulatorConfigs[slug] && (
                  <div>
                    <p
                      className="eyebrow"
                      style={{
                        marginBottom: "0.5rem",
                        color: "var(--accent-terra)",
                      }}
                    >
                      Try it
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "0.9375rem",
                        lineHeight: 1.65,
                        color: "var(--ink-secondary)",
                        margin: "0 0 1.25rem",
                      }}
                    >
                      A browser-side simulation of the routing logic — pick an
                      input and watch which rule fires. The logged runs below
                      are the receipts.
                    </p>
                    <AgentSimulator config={simulatorConfigs[slug]} />
                  </div>
                )}

                <div>
                  <p
                    className="eyebrow"
                    style={{
                      marginBottom: "0.5rem",
                      color: "var(--accent-terra)",
                    }}
                  >
                    Logged runs
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans)",
                      fontSize: "0.9375rem",
                      lineHeight: 1.65,
                      color: "var(--ink-secondary)",
                      margin: "0 0 1.25rem",
                    }}
                  >
                    Each replay below animates a logged n8n execution at the
                    speed it actually ran — the decision path, the output, and
                    the latency come straight from the execution log. Nothing
                    staged.
                  </p>
                  <RunReplay runs={demoRunsBySlug[slug]} />
                </div>
              </div>
            ) : project.sections ? (
              <div style={{ display: "grid", gap: "2.5rem" }}>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "1.0625rem",
                    lineHeight: 1.7,
                    color: "var(--ink-secondary)",
                    margin: 0,
                  }}
                >
                  {project.description}
                </p>

                {project.sections.map((section) => (
                  <div key={section.heading}>
                    <p
                      className="eyebrow"
                      style={{
                        marginBottom: "0.75rem",
                        color: "var(--accent-terra)",
                      }}
                    >
                      {section.heading}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-dm-sans)",
                        fontSize: "1rem",
                        lineHeight: 1.7,
                        color: "var(--ink-secondary)",
                        margin: 0,
                      }}
                    >
                      {section.body}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div
                style={{
                  backgroundColor: "var(--bg-surface)",
                  border: "1px dashed var(--border-light)",
                  borderRadius: "10px",
                  padding: "3rem",
                  textAlign: "center",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "var(--accent-terra)",
                    marginBottom: "1.5rem",
                  }}
                />
                <p
                  style={{
                    fontFamily: "var(--font-jakarta)",
                    fontWeight: 800,
                    fontSize: "1.25rem",
                    color: "var(--ink-primary)",
                    marginBottom: "0.75rem",
                  }}
                >
                  Case study in progress.
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-dm-sans)",
                    fontSize: "0.9375rem",
                    color: "var(--ink-secondary)",
                    lineHeight: 1.65,
                    maxWidth: "40ch",
                    margin: "0 auto 1.5rem",
                  }}
                >
                  {project.description} Full write-up coming soon.
                </p>
                <Link href="/work" style={{ fontFamily: "var(--font-jetbrains)", fontSize: "0.75rem", color: "var(--ink-primary)", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  ← Back to all work
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
