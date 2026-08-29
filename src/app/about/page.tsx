import type { Metadata } from "next";
import Image from "next/image";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import styles from "./AboutHero.module.css";

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
        <section className={styles.heroSection}>
          <div className={`mv-container ${styles.hero}`}>
            <div className={styles.copy}>
              <p className="eyebrow" style={{ marginBottom: "1rem" }}>
                About
              </p>
              <h1 className={styles.title}>
                Building from real{" "}
                <span className="ghost-word" style={{ fontSize: "inherit" }}>
                  constraints.
                </span>
              </h1>
              <p className={styles.intro}>
                I am Mishael Vallar, a solo founder from the Philippines. I build
                practical AI automations, internal ops systems, and websites for
                businesses that need clarity and execution, not hype.
              </p>
            </div>

            <div className={styles.portraitWrap}>
              <Image
                className={styles.portrait}
                src="/images/about/mishael-laptop-transparent.png"
                alt="Mishael Vallar sitting cross-legged while working on a laptop"
                width={896}
                height={1152}
                priority
                sizes="(max-width: 760px) 88vw, 430px"
              />
            </div>
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
