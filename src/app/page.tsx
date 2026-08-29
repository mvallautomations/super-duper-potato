import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import WorkCard from "@/components/WorkCard";
import { featuredWork } from "@/data/work";
import Link from "next/link";

/* ============================================================
   mid·voyage — Homepage (/)
   Sections:
   1. Hero — tagline with ghost italic word
   2. Bio — solo founder, AI systems, Philippines
   3. Work Index — 3 case study cards
   4. Footer (via component)
   ============================================================ */

export const metadata: Metadata = {
  title: "Mishael Vallar — mid·voyage",
  description:
    "Solo founder. AI systems builder. Dispatches from the middle of figuring it out.",
};

// === WORK DATA ===
// The homepage selection comes from src/data/work.ts (featuredOnHome), in
// the same explicit `order` as /work. One source, so the two cannot drift.

export default function HomePage() {
  return (
    <>
      <Nav />

      <main>
        {/* ===================================================
            SECTION 1: HERO
            =================================================== */}
        <section
          style={{
            paddingTop: "clamp(4rem, 10vw, 8rem)",
            paddingBottom: "clamp(4rem, 8vw, 7rem)",
          }}
        >
          <div className="mv-container">
            {/* Eyebrow label */}
            <p
              className="eyebrow fade-up"
              style={{
                marginBottom: "1.75rem",
                color: "var(--accent-terra)",
              }}
            >
              Mishael Vallar · mid·voyage
            </p>

            {/* Hero headline — with ghost italic word */}
            <h1
              className="text-hero fade-up fade-up-delay-1"
              style={{
                fontFamily: "var(--font-jakarta)",
                fontWeight: 800,
                maxWidth: "14ch",    /* tight editorial measure */
                marginBottom: "2rem",
              }}
            >
              Dispatches from the middle of{" "}
              <span className="ghost-word" style={{ fontSize: "inherit" }}>
                figuring
              </span>{" "}
              it out.
            </h1>

            {/* Subhead */}
            <p
              className="text-subhero fade-up fade-up-delay-2"
              style={{
                fontFamily: "var(--font-dm-sans)",
                color: "var(--ink-secondary)",
                maxWidth: "52ch",
                marginBottom: "2.5rem",
              }}
            >
              Building AI systems out of necessity. Solo founder, Philippines.
              Every constraint becomes a design brief.
            </p>

            {/* CTA row */}
            <div
              className="fade-up fade-up-delay-3"
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <Link href="/work" className="mv-btn">
                View work →
              </Link>

              {/* Ghost link — no button UI */}
              <span
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--ink-muted)",
                }}
              >
                Pre-revenue · Building in public
              </span>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="mv-container">
          <hr className="mv-rule" />
        </div>

        {/* ===================================================
            SECTION 2: BIO
            =================================================== */}
        <section
          style={{
            paddingBlock: "clamp(3rem, 7vw, 6rem)",
          }}
        >
          <div
            className="mv-container"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "clamp(2rem, 5vw, 5rem)",
              alignItems: "start",
            }}
          >
            {/* Left: eyebrow + heading */}
            <div>
              <p
                className="eyebrow"
                style={{
                  marginBottom: "1.25rem",
                  color: "var(--accent-terra)",
                }}
              >
                About
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-jakarta)",
                  fontWeight: 800,
                  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                  lineHeight: 1.1,
                  letterSpacing: "-0.025em",
                  color: "var(--ink-primary)",
                }}
              >
                Systems built from{" "}
                <span className="ghost-word" style={{ fontSize: "inherit" }}>
                  necessity.
                </span>
              </h2>
            </div>

            {/* Right: bio paragraphs */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "1.25rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "1.0625rem",
                  lineHeight: 1.7,
                  color: "var(--ink-secondary)",
                }}
              >
                I&apos;m Mishael Vallar — solo founder of{" "}
                <strong
                  style={{
                    color: "var(--ink-primary)",
                    fontWeight: 500,
                  }}
                >
                  mid·voyage Systems &amp; Workflows
                </strong>
                , based in the Philippines. I build AI automation pipelines,
                operations architecture, and digital infrastructure for creators and SMBs
                seeking lean, battle-tested leverage.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans)",
                  fontSize: "1.0625rem",
                  lineHeight: 1.7,
                  color: "var(--ink-secondary)",
                }}
              >
                mid·voyage is where I document the process — the real one. Not
                the highlight reel. The AI tools, the $0 stack decisions, the
                systems I build before I know if they&apos;ll work.
              </p>

              {/* Callout stat row */}
              <div
                style={{
                  display: "flex",
                  gap: "2rem",
                  flexWrap: "wrap",
                  paddingTop: "0.5rem",
                }}
              >
                {[
                  { value: "$0", label: "Monthly tooling spend" },
                  { value: "10–15h", label: "Dev hours per week" },
                  { value: "13", label: "Cats at home" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p
                      style={{
                        fontFamily: "var(--font-jakarta)",
                        fontWeight: 800,
                        fontSize: "1.5rem",
                        color: "var(--ink-primary)",
                        lineHeight: 1,
                        marginBottom: "0.3rem",
                      }}
                    >
                      {stat.value}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-jetbrains)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "var(--ink-muted)",
                      }}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Divider */}
        <div className="mv-container">
          <hr className="mv-rule" />
        </div>

        {/* ===================================================
            SECTION 3: WORK INDEX
            =================================================== */}
        <section
          style={{
            paddingBlock: "clamp(3rem, 7vw, 6rem)",
          }}
        >
          <div className="mv-container">
            {/* Section header */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem",
                marginBottom: "2.5rem",
              }}
            >
              <div>
                <p
                  className="eyebrow"
                  style={{
                    marginBottom: "0.75rem",
                    color: "var(--accent-terra)",
                  }}
                >
                  Selected work
                </p>
                <h2
                  style={{
                    fontFamily: "var(--font-jakarta)",
                    fontWeight: 800,
                    fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
                    lineHeight: 1.1,
                    letterSpacing: "-0.02em",
                    color: "var(--ink-primary)",
                  }}
                >
                  Projects & case{" "}
                  <span className="ghost-word" style={{ fontSize: "inherit" }}>
                    studies
                  </span>
                </h2>
              </div>

              <Link
                href="/work"
                style={{
                  fontFamily: "var(--font-jetbrains)",
                  fontSize: "0.7rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--ink-muted)",
                  borderBottom: "1px solid var(--border-light)",
                  paddingBottom: "2px",
                  transition: "color var(--dur-fast), border-color var(--dur-fast)",
                  whiteSpace: "nowrap",
                }}
              >
                All work →
              </Link>
            </div>

            {/* Card grid — responsive 1-2-3 col */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
                gap: "1.25rem",
              }}
            >
              {featuredWork.map((project) => (
                <WorkCard key={project.slug} {...project} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
