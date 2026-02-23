import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { projectId, dataset, apiVersion } from "./env"
import { schema } from "./schema"
import { deskStructure } from "./desk"

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    productionUrl: async (prev, context) => {
      const { getClient } = context
      const client = getClient({ apiVersion })
      const doc = context.document as { _id?: string; _type?: string; slug?: { current?: string } }

      if (!doc._id) return prev

      if (doc._type === "attraction" && doc.slug?.current) {
        return `${process.env.NEXT_PUBLIC_APP_URL}/attractions/${doc.slug.current}`
      }
      if (doc._type === "attractionCategory" && doc.slug?.current) {
        return `${process.env.NEXT_PUBLIC_APP_URL}/attractions?category=${doc.slug.current}`
      }

      return prev
    },
  },
})
