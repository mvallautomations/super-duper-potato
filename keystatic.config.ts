import { collection, config, fields } from "@keystatic/core";

export const postStatuses = [
  { label: "Draft", value: "draft" },
  { label: "Published", value: "published" },
  { label: "Scheduled", value: "scheduled" },
  { label: "Archived", value: "archived" },
] as const;

export default config({
  storage: { kind: "local" },
  ui: { brand: { name: "mid·voyage editor" } },
  collections: {
    posts: collection({
      label: "Blog posts",
      path: "content/posts/*/",
      slugField: "title",
      entryLayout: "content",
      format: { contentField: "content" },
      columns: ["title", "status", "publishedAt", "updatedAt"],
      schema: {
        title: fields.slug({ name: { label: "Title" } }),
        status: fields.select({
          label: "Status",
          options: postStatuses,
          defaultValue: "draft",
          description: "Only published posts whose publish time has arrived appear publicly.",
        }),
        excerpt: fields.text({
          label: "Excerpt",
          multiline: true,
          validation: { isRequired: true, length: { max: 240 } },
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value || "New tag",
        }),
        coverImage: fields.image({
          label: "Cover image",
          directory: "public/images/blog",
          publicPath: "/images/blog/",
        }),
        coverAlt: fields.text({
          label: "Cover image alt text",
          description: "Describe the image for readers using screen readers.",
        }),
        createdAt: fields.datetime({ label: "Created at", defaultValue: { kind: "now" }, validation: { isRequired: true } }),
        updatedAt: fields.datetime({ label: "Updated at", defaultValue: { kind: "now" }, validation: { isRequired: true } }),
        publishedAt: fields.datetime({ label: "Publish date and time", description: "For scheduled posts, this is when the article becomes public." }),
        archivedAt: fields.datetime({ label: "Archived at" }),
        seoTitle: fields.text({ label: "SEO title", validation: { length: { max: 60 } } }),
        seoDescription: fields.text({ label: "SEO description", multiline: true, validation: { length: { max: 160 } } }),
        content: fields.markdoc({ label: "Article", extension: "mdoc", options: { image: false } }),
      },
    }),
  },
});
