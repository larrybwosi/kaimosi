import type { Metadata } from "next"
import { SubmitForm } from "@/components/submit/submit-form"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"

export const metadata: Metadata = {
  title: "Submit a Listing",
  description: "Submit a new restaurant, store, accommodation, or attraction to the Maplewood directory.",
}

export default function SubmitPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <SubmitForm />
      </main>
      <SiteFooter />
    </div>
  )
}
