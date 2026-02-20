import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { restaurants } from "@/lib/data"
import { MapPin, Clock, Star } from "lucide-react"

export const metadata = {
  title: "Restaurants & Dining | Maplewood",
  description:
    "Discover the best restaurants, cafes, and dining experiences in Maplewood - from farm-to-table to international cuisine.",
}

function RestaurantsList() {
  const featured = restaurants.filter((r) => r.featured)
  const others = restaurants.filter((r) => !r.featured)

  return (
    <div className="space-y-12">
      {/* Featured */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Featured Restaurants</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {featured.map((restaurant) => (
            <Link key={restaurant.id} href={`/directory/restaurants/${restaurant.id}`} className="group">
              <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/20">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={restaurant.image || "/placeholder.svg"}
                    alt={restaurant.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <Badge className="bg-primary">{restaurant.cuisine}</Badge>
                    <Badge variant="secondary">{restaurant.priceRange}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-serif text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {restaurant.name}
                    </h3>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-medium">{restaurant.rating}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{restaurant.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {restaurant.specialties?.slice(0, 3).map((specialty) => (
                      <Badge key={specialty} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {restaurant.hours.split(",")[0]}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {restaurant.address.split(",")[0]}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* All Others */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-foreground mb-6">All Restaurants</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((restaurant) => (
            <Link key={restaurant.id} href={`/directory/restaurants/${restaurant.id}`} className="group">
              <Card className="h-full transition-all duration-300 hover:shadow-md hover:border-primary/20">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={restaurant.image || "/placeholder.svg"}
                        alt={restaurant.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                          {restaurant.name}
                        </h3>
                        <div className="flex items-center gap-1 text-amber-500 shrink-0">
                          <Star className="h-3 w-3 fill-current" />
                          <span className="text-xs font-medium">{restaurant.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
                      <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                        <Badge variant="outline" className="text-xs py-0">
                          {restaurant.priceRange}
                        </Badge>
                        <span className="truncate">{restaurant.address.split(",")[0]}</span>
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

export default function RestaurantsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-gradient-to-b from-orange-50 to-background dark:from-orange-950/20 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <Badge variant="secondary" className="mb-4">
              Dining Guide
            </Badge>
            <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">Restaurants & Dining</h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              From cozy cafes to upscale dining, Maplewood's culinary scene offers something for every palate. Discover
              farm-to-table restaurants, international cuisine, and beloved local favorites.
            </p>
          </div>
        </section>

        {/* Listings */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <Suspense fallback={<div className="text-center py-12">Loading restaurants...</div>}>
              <RestaurantsList />
            </Suspense>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
