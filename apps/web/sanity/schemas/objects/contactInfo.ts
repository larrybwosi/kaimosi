import { defineType, defineField } from "sanity"

export default defineType({
  name: "contactInfo",
  title: "Contact Information",
  type: "object",
  fields: [
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      validation: (Rule) =>
        Rule.regex(/^[\d\s\-$$$$+]+$/, {
          name: "phone",
        }).error("Please enter a valid phone number"),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "website",
      title: "Website",
      type: "url",
      validation: (Rule) =>
        Rule.uri({
          scheme: ["http", "https"],
        }),
    }),
  ],
})
