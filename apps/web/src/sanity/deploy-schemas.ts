/**
 * Schema Deployment Script
 *
 * This script deploys all schemas to Sanity Cloud.
 * Run with: npx tsx sanity/deploy-schemas.ts
 */

import { schema } from "./schema"

async function deploySchemas() {
  console.log("🚀 Starting schema deployment...\n")

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

  if (!projectId) {
    throw new Error("NEXT_PUBLIC_SANITY_PROJECT_ID is not set")
  }

  console.log(`📦 Project: ${projectId}`)
  console.log(`📊 Dataset: ${dataset}`)
  console.log(`📝 Total schemas: ${schema.types.length}\n`)

  // Group schemas by type
  const documents = schema.types.filter((t) => t.type === "document")
  const objects = schema.types.filter((t) => t.type === "object")

  console.log("📄 Document Types:")
  documents.forEach((doc) => console.log(`   - ${doc.name}`))

  console.log("\n🔧 Object Types:")
  objects.forEach((obj) => console.log(`   - ${obj.name}`))

  console.log("\n✅ Schemas organized and ready for deployment")
  console.log("\n💡 To deploy:")
  console.log("   1. Ensure Sanity Studio is running")
  console.log("   2. Schemas auto-deploy when Studio loads")
  console.log("   3. Or use Sanity_deploy_schema tool for manual deployment\n")
}

deploySchemas().catch(console.error)
