import { defineType, defineField } from "sanity"

export default defineType({
  name: "socialLinks",
  title: "Social Media Links",
  type: "object",
  fields: [
    defineField({
      name: "facebook",
      title: "Facebook",
      type: "url",
    }),
    defineField({
      name: "instagram",
      title: "Instagram",
      type: "url",
    }),
    defineField({
      name: "twitter",
      title: "Twitter/X",
      type: "url",
    }),
    defineField({
      name: "youtube",
      title: "YouTube",
      type: "url",
    }),
  ],
})
