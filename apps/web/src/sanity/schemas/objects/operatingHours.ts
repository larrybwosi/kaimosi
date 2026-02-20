import { defineField, defineType } from "sanity"

export default defineType({
  name: "operatingHours",
  title: "Operating Hours",
  type: "object",
  fields: [
    defineField({
      name: "schedule",
      title: "Schedule",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "day",
              type: "string",
              title: "Day",
              options: {
                list: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
              },
            },
            {
              name: "openTime",
              type: "string",
              title: "Opening Time",
              description: "Format: HH:MM AM/PM",
            },
            {
              name: "closeTime",
              type: "string",
              title: "Closing Time",
              description: "Format: HH:MM AM/PM",
            },
            {
              name: "isClosed",
              type: "boolean",
              title: "Closed",
              initialValue: false,
            },
          ],
          preview: {
            select: {
              day: "day",
              open: "openTime",
              close: "closeTime",
              closed: "isClosed",
            },
            prepare({ day, open, close, closed }) {
              return {
                title: day,
                subtitle: closed ? "Closed" : `${open} - ${close}`,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: "displayText",
      title: "Display Text",
      type: "string",
      description: 'Simple text version (e.g., "Daily: 9AM-6PM")',
    }),
    defineField({
      name: "specialHours",
      title: "Special Hours",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "date", type: "date", title: "Date" },
            { name: "note", type: "string", title: "Note" },
            { name: "isClosed", type: "boolean", title: "Closed" },
          ],
        },
      ],
    }),
  ],
})
