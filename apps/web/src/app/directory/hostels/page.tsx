import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { hostels } from "@/lib/data"
import { Star, Bed, Wifi, Car, Coffee } from "lucide-react"

export const metadata = {
  title: "Accommodations & Hotels | Maplewood",
  description:
    "Find the perfect place to stay in Maplewood - from boutique hotels to cozy B&Bs and budget-friendly hostels.",
}

function HostelsList() {
  const featured = hostels.filter((h) => h.featured)
  const others = hostels.filter((h) => !h.featured)

  const getAmenityIcon = (amenity: string) => {
    if (amenity.toLowerCase().includes("wifi")) return Wifi
    if (amenity.toLowerCase().includes("parking") || amenity.toLowerCase().includes("valet")) return Car
    if (
      amenity.toLowerCase().includes("breakfast") ||
      amenity.toLowerCase().includes("café") ||
      amenity.toLowerCase().includes("restaurant")
    )
      return Coffee
    return Bed
  }

  return (
    <div className="space-y-12">
      {/* Featured */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Featured Accommodations</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((hostel) => (
            <Link key={hostel.id} href={`/directory/hostels/${hostel.id}`} className="group">
              <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/20">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={hostel.image || "/placeholder.svg"}
                    alt={hostel.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-primary">{hostel.category}</Badge>
                    <Badge variant="secondary">{hostel.priceRange}</Badge>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {hostel.name}
                    </h3>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-medium">{hostel.rating}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{hostel.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hostel.amenities.slice(0, 3).map((amenity) => {
                      const Icon = getAmenityIcon(amenity)
                      return (
                        <Badge key={amenity} variant="outline" className="text-xs gap-1">
                          <Icon className="h-3 w-3" />
                          {amenity}
                        </Badge>
                      )
                    })}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Bed className="h-4 w-4" />
                    <span>{hostel.rooms} rooms</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* All Others */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-foreground mb-6">All Accommodations</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((hostel) => (
            <Link key={hostel.id} href={`/directory/hostels/${hostel.id}`} className="group">
              <Card className="h-full transition-all duration-300 hover:shadow-md hover:border-primary/20">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                      <Image src={hostel.image || "/placeholder.svg"} alt={hostel.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                          {hostel.name}
                        </h3>
                        <div className="flex items-center gap-1 text-amber-500 shrink-0">
                          <Star className="h-3 w-3 fill-current" />
                          <span className="text-xs font-medium">{hostel.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{hostel.category}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Badge variant="outline" className="text-xs py-0">
                          {hostel.priceRange}
                        </Badge>
                        <span>{hostel.rooms} rooms</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function HostelsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-gradient-to-b from-purple-50 to-background dark:from-purple-950/20 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <Badge variant="secondary" className="mb-4">
              Accommodations
            </Badge>
            <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">Where to Stay</h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Find your perfect home away from home in Maplewood. From charming B&Bs to modern hotels and rustic cabins,
              we have accommodations for every budget and style.
            </p>
          </div>
        </section>

        {/* Listings */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <Suspense fallback={<div className="text-center py-12">Loading accommodations...</div>}>
              <HostelsList />
            </Suspense>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
