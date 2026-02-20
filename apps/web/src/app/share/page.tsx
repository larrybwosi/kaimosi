import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"
import { ShareCardBuilderWrapper } from "@/components/share/share-card-builder-wrapper"

export const metadata: Metadata = {
  title: "Create Share Card | Maplewood",
  description: "Create and share custom cards for WhatsApp",
}

export default function SharePage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Create Shareable Card</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Design a beautiful card and share it on WhatsApp with a direct link to your content
            </p>
          </div>

          <ShareCardBuilderWrapper />
        </div>
      </div>
    </div>
  )
}
