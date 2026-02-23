import type { Metadata } from "next"
import { DashboardContent } from "@/components/dashboard/dashboard-content"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your submissions and view your contribution history.",
}

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <DashboardContent />
      </main>
      <SiteFooter />
    </div>
  )
}
