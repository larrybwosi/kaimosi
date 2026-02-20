import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { stores } from "@/lib/data"
import { MapPin, Clock, Star, Phone, Navigation, ChevronLeft } from "lucide-react"

export async function generateStaticParams() {
  return stores.map((store) => ({
    slug: store.id,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const store = stores.find((s) => s.id === slug)
  if (!store) return { title: "Store Not Found" }
  return {
    title: `${store.name} | Maplewood Stores`,
    description: store.description,
  }
}

export default async function StorePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const store = stores.find((s) => s.id === slug)

  if (!store) {
    notFound()
  }

  const relatedStores = stores.filter((s) => s.id !== store.id).slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-muted/30 border-b">
          <div className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
            <div className="flex items-center gap-2 text-sm">
              <Link
                href="/directory/stores"
                className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                <ChevronLeft className="h-4 w-4" />
                Stores
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">{store.name}</span>
            </div>
          </div>
        </div>

        {/* Hero */}
        <section className="relative">
          <div className="relative aspect-[21/9] lg:aspect-[3/1]">
            <Image src={store.image || "/placeholder.svg"} alt={store.name} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <div className="mx-auto max-w-7xl px-4 pb-8 lg:px-8">
              <Badge className="bg-primary mb-4">{store.category}</Badge>
              <h1 className="font-serif text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">{store.name}</h1>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="font-bold text-lg">{store.rating}</span>
                </div>
                <Separator orientation="vertical" className="h-6" />
                <Badge variant="outline" className="bg-background/80">
                  {store.priceRange}
                </Badge>
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
                  <p className="text-muted-foreground leading-relaxed">{store.description}</p>
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
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${store.coordinates.lng - 0.01}%2C${store.coordinates.lat - 0.01}%2C${store.coordinates.lng + 0.01}%2C${store.coordinates.lat + 0.01}&layer=mapnik&marker=${store.coordinates.lat}%2C${store.coordinates.lng}`}
                      />
                    </div>
                    <CardContent className="p-4">
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        {store.address}
                      </p>
                      <Button asChild variant="outline" size="sm" className="mt-3 gap-2 bg-transparent">
                        <a
                          href={`https://www.google.com/maps/dir/?api=1&destination=${store.coordinates.lat},${store.coordinates.lng}`}
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
                        <a href={`tel:${store.phone}`} className="font-medium hover:text-primary transition-colors">
                          {store.phone}
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
                        <p className="font-medium">{store.hours}</p>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Address</p>
                        <p className="font-medium text-sm">{store.address}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Related */}
                {relatedStores.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>More Stores</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {relatedStores.map((related) => (
                        <Link
                          key={related.id}
                          href={`/directory/stores/${related.id}`}
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
