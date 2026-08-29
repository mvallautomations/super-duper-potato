import Markdoc from "@markdoc/markdoc";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import ArticleTimelineNav from "@/components/ArticleTimelineNav";
import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import "./article-timeline.css";

export async function generateStaticParams() {
  return (await getAllPosts()).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Not Found" };

  const canonicalUrl = `https://mvallarautomations.cc/blog/${post.slug}`;
  const coverImage = post.coverImage
    ? new URL(post.coverImage, "https://mvallarautomations.cc").toString()
    : undefined;

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: "article",
      url: canonicalUrl,
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      publishedTime: post.publishedAt || undefined,
      modifiedTime: post.updatedAt,
      authors: ["Mishael Vallar"],
      tags: [...post.tags],
      images: coverImage
        ? [{ url: coverImage, width: 1920, height: 1080, alt: post.coverAlt }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      images: coverImage ? [coverImage] : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const article = Markdoc.transform(post.content.node);
  const canonicalUrl = `https://mvallarautomations.cc/blog/${post.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.seoDescription || post.excerpt,
    image: post.coverImage
      ? [new URL(post.coverImage, "https://mvallarautomations.cc").toString()]
      : undefined,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: canonicalUrl,
    author: {
      "@type": "Person",
      name: "Mishael Vallar",
      url: "https://mvallarautomations.cc/about",
      sameAs: [
        "https://www.linkedin.com/in/mishaelvallar",
        "https://github.com/mvallautomations",
      ],
    },
    publisher: {
      "@type": "Organization",
      name: "mid·voyage",
      url: "https://mvallarautomations.cc",
    },
    keywords: post.tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />
      <Nav />
      <main>
        <section style={{ paddingTop: "clamp(3.5rem, 8vw, 6rem)", paddingBottom: "clamp(2.5rem, 6vw, 5rem)" }}>
          <div className="mv-container blog-article-shell">
            <div className="blog-article-layout">
              <div className="blog-article-main">
                <Link href="/blog" style={{ fontFamily: "var(--font-jetbrains)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-secondary)", textDecoration: "none" }}>
                  ← Blog
                </Link>
                <p className="eyebrow" style={{ marginTop: "1.5rem", marginBottom: "0.75rem", color: "var(--accent-terra)" }}>
                  {new Intl.DateTimeFormat("en-PH", { dateStyle: "long", timeZone: "Asia/Manila" }).format(new Date(post.publishedAt!))}
                </p>
                <h1 style={{ fontFamily: "var(--font-jakarta)", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.25rem)", marginBottom: "1.25rem", lineHeight: 1.1, color: "var(--ink-primary)" }}>
                  {post.title}
                </h1>
                <p style={{ fontFamily: "var(--font-dm-sans)", fontSize: "1.15rem", color: "var(--ink-secondary)", lineHeight: 1.65, marginBottom: "1.5rem" }}>
                  {post.excerpt}
                </p>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "2.5rem" }}>
                  {post.tags.map((tag) => (
                    <span key={tag} style={{ fontFamily: "var(--font-jetbrains)", fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.06em", textTransform: "uppercase", padding: "0.25rem 0.65rem", borderRadius: "3px", border: "1px solid var(--border-light)", color: "var(--ink-secondary)", backgroundColor: "var(--bg-elevated)" }}>
                      {tag}
                    </span>
                  ))}
                </div>

                {post.coverImage ? (
                  // Keystatic stores a repository-local public path, so the image remains portable.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={post.coverImage} alt={post.coverAlt} style={{ display: "block", width: "100%", height: "auto", marginBottom: "2rem", borderRadius: "var(--r-lg)", border: "1px solid var(--border-subtle)" }} />
                ) : null}

                <article id="article-content" className="mv-card" style={{ padding: "clamp(1.25rem, 4vw, 2rem)", lineHeight: 1.8, color: "var(--ink-secondary)" }}>
                  {Markdoc.renderers.react(article, React)}
                </article>

                <p className="eyebrow" style={{ marginTop: "1.25rem", color: "var(--ink-muted)" }}>
                  Updated {new Intl.DateTimeFormat("en-PH", { dateStyle: "medium", timeZone: "Asia/Manila" }).format(new Date(post.updatedAt))}
                </p>
              </div>
              <ArticleTimelineNav targetId="article-content" />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
