import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return { title: "Not Found" };

  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) notFound();

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
          <div className="mv-container" style={{ maxWidth: "74ch" }}>
            <Link
              href="/blog"
              style={{
                fontFamily: "var(--font-jetbrains)",
                fontSize: "0.7rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--ink-muted)",
              }}
            >
              ← Blog
            </Link>
            <p className="eyebrow" style={{ marginTop: "1.5rem", marginBottom: "0.75rem" }}>
              {post.date}
            </p>
            <h1 style={{ fontSize: "clamp(2rem, 5vw, 3.25rem)", marginBottom: "1rem", maxWidth: "18ch" }}>
              {post.title}
            </h1>
            <p style={{ color: "var(--ink-secondary)", lineHeight: 1.75, marginBottom: "1.5rem" }}>
              {post.excerpt}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "2rem" }}>
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

            <article
              className="mv-card"
              style={{
                padding: "clamp(1.25rem, 4vw, 2rem)",
                lineHeight: 1.8,
                color: "var(--ink-secondary)",
              }}
            >
              <p style={{ marginBottom: "1rem" }}>
                This is a scaffolded article page based on your blog SOP
                workflow. Replace this block with MDX-backed content in
                `content/blog/{post.slug}.mdx` and wire it through your parser
                when you are ready.
              </p>
              <p>
                For now, this route confirms the full blog structure is working:
                list page, dynamic slug pages, metadata per post, and static
                params generation for deployment.
              </p>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
