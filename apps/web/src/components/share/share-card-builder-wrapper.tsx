"use client"

import { Suspense } from "react"
import { ShareCardBuilder } from "./share-card-builder"
import { Card } from "@/components/ui/card"

export function ShareCardBuilderWrapper() {
  return (
    <Suspense fallback={<ShareCardBuilderSkeleton />}>
      <ShareCardBuilder />
    </Suspense>
  )
}

function ShareCardBuilderSkeleton() {
  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <Card className="p-1">
          <div className="grid grid-cols-3 gap-1">
            <div className="h-10 bg-muted animate-pulse rounded" />
            <div className="h-10 bg-muted animate-pulse rounded" />
            <div className="h-10 bg-muted animate-pulse rounded" />
          </div>
        </Card>
        <div className="h-96 bg-muted animate-pulse rounded-lg" />
      </div>
      <div className="space-y-6">
        <div className="h-[600px] bg-muted animate-pulse rounded-lg" />
      </div>
    </div>
  )
}
