import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Mishael Vallar, solo founder in the Philippines building AI systems and practical digital infrastructure.",
};

export default function AboutPage() {
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
              About
            </p>
            <h1
              style={{
                fontSize: "clamp(2.1rem, 6vw, 3.6rem)",
                marginBottom: "1.25rem",
                maxWidth: "16ch",
              }}
            >
              Building from{" "}
              <span className="ghost-word" style={{ fontSize: "inherit" }}>
                real constraints.
              </span>
            </h1>
            <p
              style={{
                fontSize: "1.05rem",
                color: "var(--ink-secondary)",
                lineHeight: 1.75,
                marginBottom: "2.25rem",
                maxWidth: "62ch",
              }}
            >
              I am Mishael Vallar, a solo founder from the Philippines. I build
              practical AI automations, internal ops systems, and websites for
              businesses that need clarity and execution, not hype.
            </p>
          </div>
        </section>

        <div className="mv-container">
          <hr className="mv-rule" />
        </div>

        <section style={{ paddingBottom: "clamp(3rem, 7vw, 6rem)" }}>
          <div
            className="mv-container"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {[
              {
                title: "What I build",
                copy: "Lead capture automations, reporting workflows, AI assistants, and conversion-focused sites.",
              },
              {
                title: "How I work",
                copy: "Fast iterations, clear constraints, and outcomes documented in plain language.",
              },
              {
                title: "What this site is",
                copy: "A public notebook of ongoing builds, case studies, and lessons learned along the way.",
              },
            ].map((item) => (
              <article key={item.title} className="mv-card" style={{ padding: "1.5rem" }}>
                <h2 style={{ fontSize: "1.2rem", marginBottom: "0.75rem" }}>{item.title}</h2>
                <p style={{ color: "var(--ink-secondary)", lineHeight: 1.7 }}>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
