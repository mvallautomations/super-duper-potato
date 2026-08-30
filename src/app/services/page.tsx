import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

/* ============================================================
   mid·voyage — Services (/services)
   Documents every service delivered through handlit, with the
   live price anchors from handlit.app. This site documents;
   handlit sells — every CTA points at handlit.app.
   Prices must match handlit.app's locked offer stack. Do not
   invent numbers or client claims — cite own-ops evidence only.
   ============================================================ */

export const metadata: Metadata = {
  title: "Services",
  description:
    "Every service Mishael Vallar delivers through handlit — the automation audit, three build tiers, chat agents, and retainers — with live pricing on handlit.app.",
};

type Service = {
  name: string;
  price: string;
  cadence: string;
  what: string;
  href: string;
  linkLabel: string;
};

const AUDITS: Service[] = [
  {
    name: "Cost Calculator",
    price: "Free",
    cadence: "two minutes, in your browser",
    what: "Put your own volumes and rates in and it returns one figure: what a manual process is costing you a year. Mistakes are discounted to 60% confidence and missed work to 40%, because those are projections rather than guarantees. Nothing is sent anywhere — the page makes no network requests at all.",
    href: "https://handlit.app/calculator",
    linkLabel: "Run it at handlit.app",
  },
  {
    name: "Automation Audit",
    price: "$600",
    cadence: "fixed · credited against any build within 30 days",
    what: "A process map of what actually happens, a ranked list of what is genuinely worth automating, the technical findings on the systems and data, and a phased plan with indicative costs. If existing software solves the problem, the report says so and names it — and you keep the report either way.",
    href: "https://handlit.app/#pricing",
    linkLabel: "Details at handlit.app",
  },
];

const BUILDS: Service[] = [
  {
    name: "Essential Build",
    price: "$2,500",
    cadence: "fixed, one-time · worth doing above ~$12,500/yr recovered",
    what: "One priority workflow for one team, on the core integration path. Standard evaluation set, documentation and launch handover, and a 30-day success review. Runs on accounts you own.",
    href: "https://handlit.app/#pricing",
    linkLabel: "Book at handlit.app",
  },
  {
    name: "Growth Build",
    price: "$5,500",
    cadence: "fixed, one-time · worth doing above ~$27,500/yr recovered",
    what: "Everything in Essential, plus a second connected workflow, edge-case evaluation coverage, team training and adoption support, and a 60-day optimisation window. This is where most projects land.",
    href: "https://handlit.app/#pricing",
    linkLabel: "Book at handlit.app",
  },
  {
    name: "Scale Build",
    price: "$12,000",
    cadence: "fixed, one-time · worth doing above ~$60,000/yr recovered",
    what: "Everything in Growth across multiple teams or business units, with governance, permissions and reporting, an executive result dashboard, a phased roadmap, and priority response.",
    href: "https://handlit.app/#pricing",
    linkLabel: "Book at handlit.app",
  },
  {
    name: "Lead-Gen Engine",
    price: "from $2,500",
    cadence: "one build, then optional care",
    what: "A prospecting pipeline you own: scrape, score each prospect 0–100 against your ideal customer, write a personalized first line, dispatch. The open-source core replaced roughly $350 a month of subscription tools; the public demo runs on simulated data and says so.",
    href: "https://handlit.app/systems/lead-engine.html",
    linkLabel: "See the system live",
  },
];

const RETAINERS: Service[] = [
  {
    name: "Roadmap Retainer",
    price: "from $2,000",
    cadence: "monthly",
    what: "For businesses with more than one thing to fix. Each month: the next agreed improvement built, everything already live kept running, and the next bottleneck identified. Steady progress, not maintenance — new workflows and integrations are roadmap work, sized before they start. Cancel anytime and keep everything.",
    href: "https://handlit.app/#pricing",
    linkLabel: "Details at handlit.app",
  },
  {
    name: "Agent Care Plan",
    price: "$350 · $650 priority",
    cadence: "monthly, after a build ships",
    what: "Keeps what was built working: monitoring, error logs, and repairs when an API or model changes underneath it, plus a monthly review of what it could not answer. 48-hour response at $350, same business day at $650. New workflows and integrations are a change request, priced separately.",
    href: "https://handlit.app/#pricing",
    linkLabel: "Details at handlit.app",
  },
  {
    name: "AI Operating Partner",
    price: "from $5,000",
    cadence: "monthly, custom-scoped",
    what: "The retainer scaled to a department: I own the automation roadmap end to end — design, builds, monitoring, and the quarterly numbers — as a fractional operating partner.",
    href: "https://handlit.app/#pricing",
    linkLabel: "Book a scoping call",
  },
];

function ServiceRow({ s }: { s: Service }) {
  return (
    <article
      style={{
        border: "1px solid var(--border-subtle)",
        borderRadius: "8px",
        padding: "1.5rem 1.6rem",
        backgroundColor: "var(--bg-surface)",
        display: "flex",
        flexDirection: "column",
        gap: "0.6rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: "0.5rem",
        }}
      >
        <h3
          style={{
            fontFamily: "var(--font-jakarta)",
            fontWeight: 800,
            fontSize: "1.15rem",
            letterSpacing: "-0.02em",
          }}
        >
          {s.name}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-jetbrains)",
            fontSize: "0.85rem",
            color: "var(--ink-secondary)",
          }}
        >
          <strong style={{ color: "var(--ink-primary)" }}>{s.price}</strong>{" "}
          · {s.cadence}
        </p>
      </div>
      <p style={{ color: "var(--ink-secondary)", lineHeight: 1.65 }}>{s.what}</p>
      <a
        href={s.href}
        style={{
          fontFamily: "var(--font-jetbrains)",
          fontSize: "0.8rem",
          textDecoration: "none",
          color: "var(--ink-primary)",
          borderBottom: "1px solid var(--border-medium)",
          alignSelf: "flex-start",
          paddingBottom: "0.1rem",
        }}
      >
        {s.linkLabel} →
      </a>
    </article>
  );
}

function Group({ label, items }: { label: string; items: Service[] }) {
  return (
    <div style={{ marginBottom: "3rem" }}>
      <p className="eyebrow" style={{ marginBottom: "1.1rem", color: "var(--accent-terra)" }}>
        {label}
      </p>
      <div style={{ display: "grid", gap: "1rem" }}>
        {items.map((s) => (
          <ServiceRow key={s.name} s={s} />
        ))}
      </div>
    </div>
  );
}

export default function ServicesPage() {
  return (
    <>
      <Nav />
      <main>
        <section
          style={{
            paddingTop: "clamp(3.5rem, 8vw, 6rem)",
            paddingBottom: "clamp(2.5rem, 6vw, 5rem)",
          }}
        >
          <div className="mv-container" style={{ maxWidth: "76ch" }}>
            <p className="eyebrow" style={{ marginBottom: "1rem" }}>
              Services
            </p>
            <h1
              style={{
                fontFamily: "var(--font-jakarta)",
                fontWeight: 800,
                fontSize: "clamp(2.1rem, 6vw, 3.6rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                marginBottom: "1.25rem",
                maxWidth: "18ch",
              }}
            >
              What I build, and what it{" "}
              <span className="ghost-word" style={{ fontSize: "inherit" }}>
                costs.
              </span>
            </h1>
            <p
              style={{
                fontSize: "1.05rem",
                color: "var(--ink-secondary)",
                lineHeight: 1.7,
                marginBottom: "0.75rem",
              }}
            >
              Delivery happens through{" "}
              <a href="https://handlit.app" style={{ color: "var(--ink-primary)" }}>
                handlit
              </a>
              , my systems company — this page is the documentation. Prices here
              are the same anchors published on handlit.app; if the two ever
              disagree, handlit.app wins.
            </p>
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--ink-secondary)",
                lineHeight: 1.7,
              }}
            >
              The proof behind each service is my own operations — every system
              is tested on my own business first, and the numbers on the{" "}
              <Link href="/work" style={{ color: "var(--ink-primary)" }}>
                work page
              </Link>{" "}
              come from logged runs, not projections.
            </p>
          </div>
        </section>

        <section style={{ paddingBottom: "clamp(3rem, 8vw, 6rem)" }}>
          <div className="mv-container" style={{ maxWidth: "76ch" }}>
            <Group label="Start here — audits" items={AUDITS} />
            <Group label="Builds" items={BUILDS} />
            <Group label="Retainers" items={RETAINERS} />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
