import { defineType, defineField } from "sanity"

export default defineType({
  name: "seoSettings",
  title: "SEO Settings",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description: "Override the default page title (50-60 characters)",
      validation: (Rule) => Rule.max(60),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "Override the default description (150-160 characters)",
      validation: (Rule) => Rule.max(160),
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
    }),
    defineField({
      name: "ogImage",
      title: "Social Share Image",
      type: "image",
      description: "Custom image for social media (1200x630px recommended)",
    }),
  ],
})
