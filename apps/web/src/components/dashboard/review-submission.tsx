"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, XCircle, Loader2, Utensils, Store, Bed, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/lib/auth-context"

const typeIcons = {
  restaurant: Utensils,
  store: Store,
  accommodation: Bed,
  attraction: MapPin,
  event: Calendar,
}

const typeLabels = {
  restaurant: "Restaurant",
  store: "Store",
  accommodation: "Accommodation",
  attraction: "Attraction",
  event: "Event",
}

export function ReviewSubmission({ submissionId }: { submissionId: string }) {
  const router = useRouter()
  const { user, isLoading, submissions, updateSubmissionStatus } = useAuth()
  const [reviewNote, setReviewNote] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submission = submissions.find((s) => s.id === submissionId)

  useEffect(() => {
    if (!isLoading && (!user || user.role !== "admin")) {
      router.push("/dashboard")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!user || user.role !== "admin") {
    return null
  }

  if (!submission) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-8 text-center">
        <p className="text-muted-foreground">Submission not found</p>
        <Button asChild className="mt-4">
          <Link href="/dashboard">Back to Dashboard</Link>
        </Button>
      </div>
    )
  }

  const handleAction = async (status: "approved" | "rejected") => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    updateSubmissionStatus(submissionId, status, reviewNote)
    router.push("/dashboard")
  }

  const TypeIcon = typeIcons[submission.type]

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Link href="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Link>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <TypeIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle>{submission.data.name as string}</CardTitle>
                  <CardDescription>
                    {typeLabels[submission.type]} • Submitted by {submission.userName}
                  </CardDescription>
                </div>
              </div>
              <Badge variant="secondary">Pending Review</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 text-sm sm:grid-cols-2">
              {(submission.data as any).description && (
                <div className="sm:col-span-2">
                  <p className="font-medium text-muted-foreground">Description</p>
                  <p className="mt-1">{(submission.data as any).description as string}</p>
                </div>
              )}
              {(submission.data as any).address && (
                <div>
                  <p className="font-medium text-muted-foreground">Address</p>
                  <p className="mt-1">{(submission.data as any).address as string}</p>
                </div>
              )}
              {(submission.data as any).phone && (
                <div>
                  <p className="font-medium text-muted-foreground">Phone</p>
                  <p className="mt-1">{(submission.data as any).phone as string}</p>
                </div>
              )}
              {(submission.data as any).hours && (
                <div>
                  <p className="font-medium text-muted-foreground">Hours</p>
                  <p className="mt-1">{(submission.data as any).hours as string}</p>
                </div>
              )}
              {(submission.data as any).priceRange && (
                <div>
                  <p className="font-medium text-muted-foreground">Price Range</p>
                  <p className="mt-1">{(submission.data as any).priceRange as string}</p>
                </div>
              )}
            </div>

            <div className="border-t pt-6">
              <Label htmlFor="reviewNote">Review Note (optional)</Label>
              <Textarea
                id="reviewNote"
                placeholder="Add a note for the submitter..."
                className="mt-2"
                value={reviewNote}
                onChange={(e) => setReviewNote(e.target.value)}
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => handleAction("approved")}
                disabled={isSubmitting}
                className="flex-1 bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                )}
                Approve
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleAction("rejected")}
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <XCircle className="mr-2 h-4 w-4" />
                )}
                Reject
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
