import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { restaurants } from "@/lib/data"
import { MapPin, Clock, Star, Phone, DollarSign, ChevronLeft, Navigation, Utensils } from "lucide-react"

export async function generateStaticParams() {
  return restaurants.map((restaurant) => ({
    slug: restaurant.id,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const restaurant = restaurants.find((r) => r.id === slug)
  if (!restaurant) return { title: "Restaurant Not Found" }
  return {
    title: `${restaurant.name} | Maplewood Dining`,
    description: restaurant.description,
  }
}

export default async function RestaurantPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const restaurant = restaurants.find((r) => r.id === slug)

  if (!restaurant) {
    notFound()
  }

  const relatedRestaurants = restaurants
    .filter((r) => r.id !== restaurant.id && r.category === restaurant.category)
    .slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted/30 border-b">
          <div className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
            <div className="flex items-center gap-2 text-sm">
              <Link
                href="/directory/restaurants"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Restaurants
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">{restaurant.name}</span>
            </div>
          </div>
        </div>

        {/* Hero */}
        <section className="relative">
          <div className="relative aspect-[21/9] lg:aspect-[3/1]">
            <Image
              src={restaurant.image || "/placeholder.svg"}
              alt={restaurant.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <div className="mx-auto max-w-7xl px-4 pb-8 lg:px-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-primary">{restaurant.cuisine}</Badge>
                <Badge variant="secondary">{restaurant.category}</Badge>
                <Badge variant="outline" className="bg-background/80">
                  {restaurant.priceRange}
                </Badge>
              </div>
              <h1 className="font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
                {restaurant.name}
              </h1>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="font-bold text-lg">{restaurant.rating}</span>
                </div>
                <Separator orientation="vertical" className="h-6" />
                <span className="text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {restaurant.address}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-4">About</h2>
                  <p className="text-muted-foreground leading-relaxed">{restaurant.description}</p>
                </div>

                {/* Specialties */}
                {restaurant.specialties && (
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Specialties</h2>
                    <div className="flex flex-wrap gap-2">
                      {restaurant.specialties.map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="text-sm py-1.5 px-3">
                          <Utensils className="h-3 w-3 mr-1" />
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Map */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Location</h2>
                  <Card className="overflow-hidden">
                    <div className="h-64 bg-muted">
                      <iframe
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${restaurant.coordinates.lng - 0.01}%2C${restaurant.coordinates.lat - 0.01}%2C${restaurant.coordinates.lng + 0.01}%2C${restaurant.coordinates.lat + 0.01}&layer=mapnik&marker=${restaurant.coordinates.lat}%2C${restaurant.coordinates.lng}`}
                      />
                    </div>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {restaurant.address}
                      </p>
                      <Button asChild variant="outline" size="sm" className="mt-3 gap-2 bg-transparent">
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${restaurant.coordinates.lat},${restaurant.coordinates.lng}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Navigation className="h-4 w-4" />
                          Get Directions
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact & Hours</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <a
                          href={`tel:${restaurant.phone}`}
                          className="font-medium hover:text-primary transition-colors"
                        >
                          {restaurant.phone}
                        </a>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Hours</p>
                        <p className="font-medium">{restaurant.hours}</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <DollarSign className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Price Range</p>
                        <p className="font-medium">{restaurant.priceRange}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Related */}
                {relatedRestaurants.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Similar Restaurants</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {relatedRestaurants.map((related) => (
                        <Link
                          key={related.id}
                          href={`/directory/restaurants/${related.id}`}
                          className="flex items-center gap-3 group"
                        >
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                            <Image
                              src={related.image || "/placeholder.svg"}
                              alt={related.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm group-hover:text-primary transition-colors truncate">
                              {related.name}
                            </p>
                            <p className="text-xs text-muted-foreground">{related.cuisine}</p>
                          </div>
                        </Link>
                      ))}
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
