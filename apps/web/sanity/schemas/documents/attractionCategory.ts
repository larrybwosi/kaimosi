import { defineField, defineType } from "sanity"
import { Folder } from "lucide-react"

export default defineType({
  name: "attractionCategory",
  title: "Attraction Category",
  type: "document",
  icon: Folder,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "icon",
      title: "Icon Name",
      type: "string",
      description: 'Lucide icon name (e.g., "MapPin", "Building", "Trees")',
    }),
    defineField({
      name: "color",
      title: "Color",
      type: "string",
      description: "Hex color code for category badge",
      validation: (Rule) =>
        Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, {
          name: "hex",
          invert: false,
        }).error("Please enter a valid hex color"),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      validation: (Rule) => Rule.min(0),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "description",
    },
  },
})
