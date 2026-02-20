import type { Metadata } from "next"
import { ReviewSubmission } from "@/components/dashboard/review-submission"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Review Submission",
  description: "Review and approve or reject community submissions.",
}

export default async function ReviewPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <ReviewSubmission submissionId={id} />
      </main>
      <SiteFooter />
    </div>
  )
}
