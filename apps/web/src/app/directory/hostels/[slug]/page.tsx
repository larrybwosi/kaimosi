import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { hostels } from "@/lib/data"
import { MapPin, Star, Phone, Mail, Navigation, ChevronLeft, Bed, Check } from "lucide-react"

export async function generateStaticParams() {
  return hostels.map((hostel) => ({
    slug: hostel.id,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const hostel = hostels.find((h) => h.id === slug)
  if (!hostel) return { title: "Accommodation Not Found" }
  return {
    title: `${hostel.name} | Maplewood Accommodations`,
    description: hostel.description,
  }
}

export default async function HostelPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const hostel = hostels.find((h) => h.id === slug)

  if (!hostel) {
    notFound()
  }

  const relatedHostels = hostels.filter((h) => h.id !== hostel.id).slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted/30 border-b">
          <div className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
            <div className="flex items-center gap-2 text-sm">
              <Link
                href="/directory/hostels"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Accommodations
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">{hostel.name}</span>
            </div>
          </div>
        </div>

        {/* Hero */}
        <section className="relative">
          <div className="relative aspect-[21/9] lg:aspect-[3/1]">
            <Image src={hostel.image || "/placeholder.svg"} alt={hostel.name} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <div className="mx-auto max-w-7xl px-4 pb-8 lg:px-8">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-primary">{hostel.category}</Badge>
                <Badge variant="secondary">{hostel.priceRange}</Badge>
                <Badge variant="outline" className="bg-background/80">
                  <Bed className="h-3 w-3 mr-1" />
                  {hostel.rooms} rooms
                </Badge>
              </div>
              <h1 className="font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">{hostel.name}</h1>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="font-bold text-lg">{hostel.rating}</span>
                </div>
                <Separator orientation="vertical" className="h-6" />
                <span className="text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {hostel.address}
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
                  <p className="text-muted-foreground leading-relaxed">{hostel.description}</p>
                </div>

                {/* Amenities */}
                <div>
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-4">Amenities</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {hostel.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center gap-2 text-sm">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                          <Check className="h-3 w-3 text-primary" />
                        </div>
                        <span className="text-muted-foreground">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

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
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${hostel.coordinates.lng - 0.01}%2C${hostel.coordinates.lat - 0.01}%2C${hostel.coordinates.lng + 0.01}%2C${hostel.coordinates.lat + 0.01}&layer=mapnik&marker=${hostel.coordinates.lat}%2C${hostel.coordinates.lng}`}
                      />
                    </div>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {hostel.address}
                      </p>
                      <Button asChild variant="outline" size="sm" className="mt-3 gap-2 bg-transparent">
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${hostel.coordinates.lat},${hostel.coordinates.lng}`}
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
                    <CardTitle>Contact & Reservations</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <a href={`tel:${hostel.phone}`} className="font-medium hover:text-primary transition-colors">
                          {hostel.phone}
                        </a>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <a
                          href={`mailto:${hostel.email}`}
                          className="font-medium hover:text-primary transition-colors text-sm"
                        >
                          {hostel.email}
                        </a>
                      </div>
                    </div>
                    <Separator />
                    <Button className="w-full" size="lg">
                      Book Now
                    </Button>
                  </CardContent>
                </Card>

                {/* Related */}
                {relatedHostels.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>More Places to Stay</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {relatedHostels.map((related) => (
                        <Link
                          key={related.id}
                          href={`/directory/hostels/${related.id}`}
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
                            <p className="text-xs text-muted-foreground">{related.category}</p>
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
