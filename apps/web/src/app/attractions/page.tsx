import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { townInfo } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Clock, MapPin } from "lucide-react"
import { AttractionsFilter } from "@/components/attractions-filter"
import { AttractionsSearch } from "@/components/attractions-search"
import { getAllAttractions, getAttractionCategories } from "@/lib/sanity-queries"

export const metadata = {
  title: `Attractions | ${townInfo.name}`,
  description: `Discover the best attractions, parks, museums, and experiences in ${townInfo.name}.`,
}

export const revalidate = 60 // Revalidate every 60 seconds

export default async function AttractionsPage() {
  const attractions = await getAllAttractions()
  const categories = await getAttractionCategories()

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-secondary py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-wider text-primary">Explore</p>
              <h1 className="mt-2 font-serif text-4xl font-bold text-foreground sm:text-5xl">Things to See & Do</h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                From scenic parks to cultural landmarks, discover the attractions that make Maplewood a destination
                worth visiting.
              </p>
            </div>

            {/* Search - wrapped in Suspense */}
            <div className="mx-auto mt-8 max-w-xl">
              <Suspense fallback={<div className="h-12 rounded-md bg-card animate-pulse" />}>
                <AttractionsSearch />
              </Suspense>
            </div>
          </div>
        </section>

        {/* Filter & Grid */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            {/* Category Filter */}
            <Suspense fallback={<div className="h-9 w-64 rounded-md bg-secondary animate-pulse" />}>
              <AttractionsFilter categories={categories} />
            </Suspense>

            {/* Attractions Grid */}
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {attractions.map((attraction) => (
                <Link key={attraction._id} href={`/attractions/${attraction.slug.current}`} className="group">
                  <Card className="h-full overflow-hidden border-0 bg-card shadow-sm transition-all hover:shadow-lg">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={attraction.image || "/placeholder.svg?height=400&width=600"}
                        alt={attraction.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute left-3 top-3">
                        <Badge variant="secondary" className="bg-card/90 backdrop-blur">
                          {attraction.category}
                        </Badge>
                      </div>
                      {attraction.featured && (
                        <div className="absolute right-3 top-3">
                          <Badge className="bg-accent text-accent-foreground">Featured</Badge>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {attraction.name}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{attraction.shortDescription}</p>
                      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          {attraction.hours.split(",")[0]}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5" />
                          {attraction.admission}
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
