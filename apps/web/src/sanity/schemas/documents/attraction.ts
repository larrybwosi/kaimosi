import { defineField, defineType } from "sanity"
import { MapPin } from "lucide-react"

export default defineType({
  name: "attraction",
  title: "Attraction",
  type: "document",
  icon: MapPin,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required().min(3).max(100),
      description: "The name of the attraction",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
      description: "URL-friendly version of the name",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "attractionCategory" }],
      validation: (Rule) => Rule.required(),
      description: "Primary category for this attraction",
    }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required().min(50).max(200),
      description: "Brief description for cards and previews (50-200 characters)",
    }),
    defineField({
      name: "fullDescription",
      title: "Full Description",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
      description: "Detailed description with rich text formatting",
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: {
        hotspot: true,
        metadata: ["blurhash", "lqip", "palette"],
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
          validation: (Rule) => Rule.required(),
          description: "Important for SEO and accessibility",
        },
        {
          name: "caption",
          type: "string",
          title: "Caption",
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "gallery",
      title: "Image Gallery",
      type: "array",
      of: [
        {
          type: "image",
          options: {
            hotspot: true,
            metadata: ["blurhash", "lqip"],
          },
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alternative Text",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "caption",
              type: "string",
              title: "Caption",
            },
          ],
        },
      ],
      options: {
        layout: "grid",
      },
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "location",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "operatingHours",
      title: "Operating Hours",
      type: "operatingHours",
    }),
    defineField({
      name: "admission",
      title: "Admission & Pricing",
      type: "object",
      fields: [
        {
          name: "isFree",
          type: "boolean",
          title: "Free Admission",
          initialValue: false,
        },
        {
          name: "pricing",
          type: "array",
          title: "Pricing Details",
          of: [
            {
              type: "object",
              fields: [
                { name: "category", type: "string", title: "Category" },
                { name: "price", type: "number", title: "Price" },
                { name: "description", type: "string", title: "Description" },
              ],
            },
          ],
          hidden: ({ parent }) => parent?.isFree,
        },
        {
          name: "displayText",
          type: "string",
          title: "Display Text",
          description: 'Example: "Adults $12, Children $8" or "Free"',
        },
      ],
    }),
    defineField({
      name: "amenities",
      title: "Amenities",
      type: "array",
      of: [{ type: "reference", to: [{ type: "amenity" }] }],
      description: "Available facilities and services",
    }),
    defineField({
      name: "contact",
      title: "Contact Information",
      type: "contactInfo",
    }),
    defineField({
      name: "social",
      title: "Social Media",
      type: "socialLinks",
    }),
    defineField({
      name: "accessibility",
      title: "Accessibility Features",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Wheelchair Accessible", value: "wheelchair" },
          { title: "Accessible Parking", value: "parking" },
          { title: "Accessible Restrooms", value: "restrooms" },
          { title: "Service Animals Welcome", value: "service-animals" },
          { title: "Audio Tours Available", value: "audio-tours" },
          { title: "Sign Language Services", value: "sign-language" },
        ],
      },
    }),
    defineField({
      name: "featured",
      title: "Featured Attraction",
      type: "boolean",
      initialValue: false,
      description: "Display prominently on homepage",
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Open", value: "open" },
          { title: "Temporarily Closed", value: "temporarily-closed" },
          { title: "Seasonal", value: "seasonal" },
          { title: "Permanently Closed", value: "closed" },
        ],
      },
      initialValue: "open",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "seoSettings",
      description: "Override default SEO settings",
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category.name",
      media: "mainImage",
      featured: "featured",
    },
    prepare({ title, subtitle, media, featured }) {
      return {
        title: `${featured ? "⭐ " : ""}${title}`,
        subtitle,
        media,
      }
    },
  },
  orderings: [
    {
      title: "Name A-Z",
      name: "nameAsc",
      by: [{ field: "name", direction: "asc" }],
    },
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Recently Published",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
})
