import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { getFeaturedAttractions } from "@/lib/sanity-queries"
import { ShareButton } from "@/components/share/share-button"

export async function FeaturedAttractions() {
  const featured = await getFeaturedAttractions()

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-primary">Explore</p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">Featured Attractions</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">
              Discover the best of Maplewood, from natural wonders to cultural landmarks.
            </p>
          </div>
          <Button asChild variant="outline" className="gap-2 self-start bg-transparent">
            <Link href="/attractions">
              View All
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((attraction, index) => (
            <Link
              key={attraction._id}
              href={`/attractions/${attraction.slug.current}`}
              className={`group ${index === 0 ? "sm:col-span-2 sm:row-span-2" : ""}`}
            >
              <Card className="h-full overflow-hidden border-0 bg-card shadow-sm transition-all hover:shadow-lg">
                <div
                  className={`relative ${index === 0 ? "aspect-square sm:aspect-auto sm:h-full sm:min-h-[400px]" : "aspect-[4/3]"}`}
                >
                  <Image
                    src={attraction.image || "/placeholder.svg?height=600&width=800"}
                    alt={attraction.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <ShareButton
                      type="attraction"
                      slug={attraction.slug.current}
                      title={attraction.name}
                      description={attraction.shortDescription}
                      image={attraction.image}
                      size="sm"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <Badge variant="secondary" className="mb-2">
                      {attraction.category}
                    </Badge>
                    <h3
                      className={`font-serif font-bold text-card ${index === 0 ? "text-2xl sm:text-3xl" : "text-lg"}`}
                    >
                      {attraction.name}
                    </h3>
                    <p className={`mt-2 text-card/80 ${index === 0 ? "line-clamp-3" : "line-clamp-2 text-sm"}`}>
                      {attraction.shortDescription}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
