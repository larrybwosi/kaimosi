"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  Plus,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  Shield,
  TrendingUp,
  Utensils,
  Store,
  Bed,
  MapPin,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
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

export function DashboardContent() {
  const router = useRouter()
  const { user, isLoading, submissions } = useAuth()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  const userSubmissions = user.role === "admin" ? submissions : submissions.filter((s) => s.userId === user.id)
  const pendingCount = userSubmissions.filter((s) => s.status === "pending").length
  const approvedCount = userSubmissions.filter((s) => s.status === "approved").length
  const rejectedCount = userSubmissions.filter((s) => s.status === "rejected").length

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold text-foreground">
            {user.role === "admin" ? "Admin Dashboard" : "My Dashboard"}
          </h1>
          <p className="mt-1 text-muted-foreground">
            {user.role === "admin"
              ? "Review and manage community submissions"
              : "Track your submissions and contributions"}
          </p>
        </div>
        <Button asChild>
          <Link href="/submit">
            <Plus className="mr-2 h-4 w-4" />
            New Submission
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <FileText className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{userSubmissions.length}</p>
              <p className="text-sm text-muted-foreground">Total Submissions</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{pendingCount}</p>
              <p className="text-sm text-muted-foreground">Pending Review</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{approvedCount}</p>
              <p className="text-sm text-muted-foreground">Approved</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <XCircle className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{rejectedCount}</p>
              <p className="text-sm text-muted-foreground">Rejected</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Notice */}
      {user.role === "admin" && (
        <Card className="mb-8 border-primary/20 bg-primary/5">
          <CardContent className="flex items-center gap-4 p-6">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <p className="font-medium text-foreground">Administrator Access</p>
              <p className="text-sm text-muted-foreground">
                You can review and approve/reject all community submissions
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Submissions List */}
      <Card>
        <CardHeader>
          <CardTitle>Submissions</CardTitle>
          <CardDescription>
            {user.role === "admin" ? "All community submissions" : "Your submitted listings"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All ({userSubmissions.length})</TabsTrigger>
              <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
              <TabsTrigger value="approved">Approved ({approvedCount})</TabsTrigger>
              <TabsTrigger value="rejected">Rejected ({rejectedCount})</TabsTrigger>
            </TabsList>

            {["all", "pending", "approved", "rejected"].map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-6">
                <div className="space-y-4">
                  {userSubmissions
                    .filter((s) => tab === "all" || s.status === tab)
                    .map((submission) => {
                      const TypeIcon = typeIcons[submission.type]
                      return (
                        <div
                          key={submission.id}
                          className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <div className="flex items-start gap-4">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                              <TypeIcon className="h-5 w-5 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="font-medium">{submission.data.name as string}</p>
                              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                                <span>{typeLabels[submission.type]}</span>
                                <span>•</span>
                                <span>
                                  {new Date(submission.createdAt).toLocaleDateString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                  })}
                                </span>
                                {user.role === "admin" && (
                                  <>
                                    <span>•</span>
                                    <span>by {submission.userName}</span>
                                  </>
                                )}
                              </div>
                              {submission.reviewNote && (
                                <p className="mt-2 text-sm italic text-muted-foreground">
                                  &ldquo;{submission.reviewNote}&rdquo;
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge
                              variant={
                                submission.status === "approved"
                                  ? "default"
                                  : submission.status === "rejected"
                                    ? "destructive"
                                    : "secondary"
                              }
                              className={submission.status === "approved" ? "bg-green-600" : ""}
                            >
                              {submission.status === "pending" && <Clock className="mr-1 h-3 w-3" />}
                              {submission.status === "approved" && <CheckCircle2 className="mr-1 h-3 w-3" />}
                              {submission.status === "rejected" && <XCircle className="mr-1 h-3 w-3" />}
                              {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                            </Badge>
                            {user.role === "admin" && submission.status === "pending" && (
                              <Link href={`/dashboard/review/${submission.id}`}>
                                <Button size="sm" variant="outline">
                                  Review
                                </Button>
                              </Link>
                            )}
                          </div>
                        </div>
                      )
                    })}

                  {userSubmissions.filter((s) => tab === "all" || s.status === tab).length === 0 && (
                    <div className="py-12 text-center">
                      <TrendingUp className="mx-auto h-12 w-12 text-muted-foreground/50" />
                      <p className="mt-4 text-muted-foreground">No submissions found</p>
                      <Button asChild className="mt-4">
                        <Link href="/submit">Submit Your First Listing</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
