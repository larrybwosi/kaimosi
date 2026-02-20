import { defineField, defineType } from "sanity"

export default defineType({
  name: "location",
  title: "Location",
  type: "object",
  fields: [
    defineField({
      name: "address",
      title: "Street Address",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "city",
      title: "City",
      type: "string",
      initialValue: "Maplewood",
    }),
    defineField({
      name: "state",
      title: "State",
      type: "string",
    }),
    defineField({
      name: "zipCode",
      title: "ZIP Code",
      type: "string",
    }),
    defineField({
      name: "coordinates",
      title: "Coordinates",
      type: "object",
      fields: [
        {
          name: "lat",
          type: "number",
          title: "Latitude",
          validation: (Rule) => Rule.required().min(-90).max(90),
        },
        {
          name: "lng",
          type: "number",
          title: "Longitude",
          validation: (Rule) => Rule.required().min(-180).max(180),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mapUrl",
      title: "Map URL",
      type: "url",
      description: "Link to Google Maps or similar",
    }),
  ],
})
