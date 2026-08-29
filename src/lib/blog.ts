import type { Node } from "@markdoc/markdoc";
import { createReader } from "@keystatic/core/reader";
import keystaticConfig from "../../keystatic.config";

const reader = createReader(process.cwd(), keystaticConfig);

export type BlogPostStatus = "draft" | "published" | "scheduled" | "archived";

export interface BlogPostSummary {
  slug: string;
  title: string;
  status: BlogPostStatus;
  excerpt: string;
  tags: readonly string[];
  coverImage: string | null;
  coverAlt: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  archivedAt: string | null;
  seoTitle: string;
  seoDescription: string;
}

export type BlogPost = BlogPostSummary & { content: { node: Node } };

function isPublicPost(post: BlogPostSummary, now: Date): boolean {
  if (post.status !== "published" && post.status !== "scheduled") return false;
  if (!post.publishedAt) return false;
  return new Date(post.publishedAt).getTime() <= now.getTime();
}

function toSummary(post: BlogPost): BlogPostSummary {
  const { content, ...summary } = post;
  void content;
  return summary;
}

export async function getAllPosts({
  includeNonPublic = false,
  now = new Date(),
}: {
  includeNonPublic?: boolean;
  now?: Date;
} = {}): Promise<BlogPostSummary[]> {
  const slugs = await reader.collections.posts.list();
  const entries = await Promise.all(
    slugs.map((slug) => getPostBySlug(slug, { includeNonPublic: true, now })),
  );

  return entries
    .flatMap((post) => (post ? [post] : []))
    .filter((post) => includeNonPublic || isPublicPost(post, now))
    .map(toSummary)
    .sort((a, b) => (b.publishedAt ?? b.createdAt).localeCompare(a.publishedAt ?? a.createdAt));
}

export async function getPostBySlug(
  slug: string,
  { includeNonPublic = false, now = new Date() }: { includeNonPublic?: boolean; now?: Date } = {},
): Promise<BlogPost | undefined> {
  const post = await reader.collections.posts.read(slug);
  if (!post) return undefined;

  const content = typeof post.content === "function" ? await post.content() : post.content;
  const result: BlogPost = { slug, ...post, content };
  if (!includeNonPublic && !isPublicPost(result, now)) return undefined;
  return result;
}
