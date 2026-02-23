import { defineField, defineType } from "sanity"
import { CheckCircle } from "lucide-react"

export default defineType({
  name: "amenity",
  title: "Amenity",
  type: "document",
  icon: CheckCircle,
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
      name: "icon",
      title: "Icon Name",
      type: "string",
      description: "Lucide icon name",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Facilities", value: "facilities" },
          { title: "Services", value: "services" },
          { title: "Accessibility", value: "accessibility" },
          { title: "Food & Beverage", value: "food" },
        ],
      },
    }),
  ],
})
