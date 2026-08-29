import type { MetadataRoute } from "next";
import { allWork } from "@/data/work";
import { getAllPosts } from "@/lib/blog";

const siteUrl = "https://mvallarautomations.cc";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const staticRoutes = ["", "/about", "/blog", "/services", "/work"];

  return [
    ...staticRoutes.map((path) => ({
      url: `${siteUrl}${path}`,
      lastModified: new Date(),
    })),
    ...allWork.map((item) => ({
      url: `${siteUrl}/work/${item.slug}`,
      lastModified: new Date(),
    })),
    ...posts.map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
    })),
  ];
}
