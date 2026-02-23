import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { HeroSection } from "@/components/hero-section"
import { TownDescription } from "@/components/town-description"
import { TownMap } from "@/components/town-map"
import { QuickLinks } from "@/components/quick-links"
import { FeaturedAttractions } from "@/components/featured-attractions"
import { InstitutionsPreview } from "@/components/institutions-preview"
import { EventsPreview } from "@/components/events-preview"
import { NewsletterSection } from "@/components/newsletter-section"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <TownDescription />
        <QuickLinks />
        <TownMap />
        <FeaturedAttractions />
        <InstitutionsPreview />
        <EventsPreview />
        <NewsletterSection />
      </main>
      <SiteFooter />
    </div>
  )
}
