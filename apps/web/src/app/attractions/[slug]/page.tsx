import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { getAttractionBySlug, getAllAttractions } from "@/lib/sanity-queries"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Clock,
  MapPin,
  Phone,
  DollarSign,
  ArrowLeft,
  Share2,
  Heart,
  Navigation,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { AttractionGallery } from "@/components/attraction-gallery"
import { AttractionMap } from "@/components/attraction-map"
import { ShareButton } from "@/components/share/share-button"

interface AttractionPageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const attractions = await getAllAttractions()
  return attractions.map((attraction) => ({
    slug: attraction.slug.current,
  }))
}

export async function generateMetadata({ params }: AttractionPageProps) {
  const { slug } = await params
  const attraction = await getAttractionBySlug(slug)

  if (!attraction) {
    return { title: "Attraction Not Found" }
  }

  return {
    title: `${attraction.name} | Maplewood`,
    description: attraction.shortDescription,
  }
}

export const revalidate = 60

export default async function AttractionPage({ params }: AttractionPageProps) {
  const { slug } = await params
  const attraction = await getAttractionBySlug(slug)

  if (!attraction) {
    notFound()
  }

  const allAttractions = await getAllAttractions()
  const related = allAttractions
    .filter((a) => a.category === attraction.category && a._id !== attraction._id)
    .slice(0, 3)

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="border-b border-border bg-secondary/50">
          <div className="mx-auto max-w-7xl px-4 py-4 lg:px-8">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/attractions" className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="h-4 w-4" />
                Back to Attractions
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground">{attraction.name}</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <section className="relative">
          <div className="relative aspect-[21/9] w-full lg:aspect-[3/1]">
            <Image
              src={attraction.image || "/placeholder.svg?height=600&width=1200"}
              alt={attraction.name}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/20 to-transparent" />

            {/* Hero Content */}
            <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-8">
              <div className="mx-auto max-w-7xl">
                <Badge variant="secondary" className="mb-4">
                  {attraction.category}
                </Badge>
                <h1 className="font-serif text-3xl font-bold text-card sm:text-4xl lg:text-5xl">{attraction.name}</h1>
                <p className="mt-2 max-w-2xl text-card/90 lg:text-lg">{attraction.shortDescription}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="absolute right-4 top-4 flex gap-2 lg:right-8 lg:top-8">
            <Button size="icon" variant="secondary" className="bg-card/90 backdrop-blur">
              <Heart className="h-4 w-4" />
              <span className="sr-only">Save</span>
            </Button>
            <ShareButton
              type="attraction"
              slug={attraction.slug.current}
              title={attraction.name}
              description={attraction.shortDescription}
              image={attraction.image}
              size="md"
            />
          </div>
        </section>

        {/* Main Content */}
        <section className="py-8 lg:py-12">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Left Column - Main Content */}
              <div className="lg:col-span-2">
                <Tabs defaultValue="overview" className="w-full">
                  <TabsList className="mb-6 w-full justify-start">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="gallery">Gallery</TabsTrigger>
                    <TabsTrigger value="map">Map</TabsTrigger>
                  </TabsList>

                  <TabsContent value="overview" className="space-y-8">
                    {/* Description */}
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-foreground">About</h2>
                      <p className="mt-4 leading-relaxed text-muted-foreground">{attraction.fullDescription}</p>
                    </div>

                    {/* Amenities */}
                    <div>
                      <h2 className="font-serif text-2xl font-bold text-foreground">Amenities & Features</h2>
                      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                        {attraction.amenities.map((amenity) => (
                          <div
                            key={amenity}
                            className="flex items-center gap-2 rounded-lg bg-secondary p-3 text-sm text-foreground"
                          >
                            <Check className="h-4 w-4 text-primary" />
                            {amenity}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Gallery Preview */}
                    {attraction.gallery && attraction.gallery.length > 0 && (
                      <div>
                        <h2 className="font-serif text-2xl font-bold text-foreground">Photo Gallery</h2>
                        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                          {attraction.gallery.map((img, index) => (
                            <div
                              key={index}
                              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                            >
                              <Image
                                src={img || "/placeholder.svg?height=300&width=300"}
                                alt={`${attraction.name} photo ${index + 1}`}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="gallery">
                    <AttractionGallery images={attraction.gallery || []} name={attraction.name} />
                  </TabsContent>

                  <TabsContent value="map">
                    <AttractionMap
                      coordinates={attraction.coordinates}
                      name={attraction.name}
                      address={attraction.address}
                    />
                  </TabsContent>
                </Tabs>
              </div>

              {/* Right Column - Info Card */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24 border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-serif text-xl font-bold text-foreground">Visit Information</h3>

                    <div className="mt-6 space-y-4">
                      {/* Hours */}
                      <div className="flex gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Hours</p>
                          <p className="text-sm text-muted-foreground">{attraction.hours}</p>
                        </div>
                      </div>

                      {/* Admission */}
                      <div className="flex gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <DollarSign className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Admission</p>
                          <p className="text-sm text-muted-foreground">{attraction.admission}</p>
                        </div>
                      </div>

                      {/* Address */}
                      <div className="flex gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <MapPin className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Address</p>
                          <p className="text-sm text-muted-foreground">{attraction.address}</p>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="flex gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <Phone className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Phone</p>
                          <a href={`tel:${attraction.phone}`} className="text-sm text-primary hover:underline">
                            {attraction.phone}
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="mt-8 space-y-3">
                      <Button className="w-full gap-2">
                        <Navigation className="h-4 w-4" />
                        Get Directions
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent">
                        Contact for Groups
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Related Attractions */}
        {related.length > 0 && (
          <section className="border-t border-border bg-secondary py-12 lg:py-16">
            <div className="mx-auto max-w-7xl px-4 lg:px-8">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl font-bold text-foreground">More in {attraction.category}</h2>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" className="bg-transparent">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button size="icon" variant="outline" className="bg-transparent">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <Link key={item._id} href={`/attractions/${item.slug.current}`} className="group">
                    <Card className="overflow-hidden border-0 shadow-sm transition-all hover:shadow-lg">
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={item.image || "/placeholder.svg?height=400&width=600"}
                          alt={item.name}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{item.shortDescription}</p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}
