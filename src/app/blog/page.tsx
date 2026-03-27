import type { Metadata } from "next";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Build notes, case study breakdowns, and practical lessons from a solo founder workflow.",
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Nav />
      <main>
        <section
          style={{
            paddingTop: "clamp(3.5rem, 8vw, 6rem)",
            paddingBottom: "clamp(2rem, 5vw, 4rem)",
          }}
        >
          <div className="mv-container">
            <p className="eyebrow" style={{ marginBottom: "1rem" }}>
              Blog
            </p>
            <h1 style={{ fontSize: "clamp(2.1rem, 6vw, 3.6rem)", marginBottom: "1rem" }}>
              Build notes from the{" "}
              <span className="ghost-word" style={{ fontSize: "inherit" }}>
                middle.
              </span>
            </h1>
            <p style={{ color: "var(--ink-secondary)", maxWidth: "55ch" }}>
              Simple dispatches on what I am shipping, what failed, and what I
              changed next.
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
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))",
              gap: "1.25rem",
            }}
          >
            {posts.map((post) => (
              <article key={post.slug} className="mv-card" style={{ padding: "1.5rem" }}>
                <p className="eyebrow" style={{ marginBottom: "0.8rem" }}>
                  {post.date}
                </p>
                <h2 style={{ fontSize: "1.3rem", marginBottom: "0.75rem" }}>{post.title}</h2>
                <p style={{ color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1rem" }}>
                  {post.excerpt}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: "var(--font-jetbrains)",
                        fontSize: "0.65rem",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        padding: "0.2rem 0.5rem",
                        borderRadius: "3px",
                        border: "1px solid var(--border-light)",
                        color: "var(--ink-muted)",
                        backgroundColor: "var(--bg-elevated)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <Link href={`/blog/${post.slug}`} className="mv-btn">
                  Read post
                </Link>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
