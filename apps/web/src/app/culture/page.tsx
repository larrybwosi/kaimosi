import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { cultureHighlights, townInfo } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Music, Palette, Utensils, Users } from "lucide-react"

export const metadata = {
  title: `Culture & Community | ${townInfo.name}`,
  description: `Experience the vibrant culture, arts, and community traditions of ${townInfo.name}.`,
}

const culturalPillars = [
  {
    icon: Palette,
    title: "Arts & Crafts",
    description: "Over 30 galleries and studios showcase local talent, from traditional crafts to contemporary art.",
  },
  {
    icon: Music,
    title: "Music Scene",
    description: "Live music fills our streets year-round, from bluegrass jams to symphony performances.",
  },
  {
    icon: Utensils,
    title: "Culinary Heritage",
    description: "Farm-to-table dining and century-old family recipes define our delicious food scene.",
  },
  {
    icon: Users,
    title: "Community Spirit",
    description: "Neighbors helping neighbors has been our way since 1847, creating an unbreakable bond.",
  },
]

export default function CulturePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/placeholder.svg?height=600&width=1600"
              alt="Maplewood community celebration"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/50" />
          </div>
          <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 lg:px-8 lg:py-32">
            <div className="max-w-2xl">
              <p className="text-sm font-medium uppercase tracking-wider text-primary">Our Community</p>
              <h1 className="mt-2 font-serif text-4xl font-bold text-foreground sm:text-5xl">
                A Tapestry of Tradition & Creativity
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Maplewood's culture is a rich blend of heritage and innovation. From our renowned arts scene to our
                celebrated culinary traditions, our community thrives on creativity, connection, and a deep respect for
                our roots.
              </p>
            </div>
          </div>
        </section>

        {/* Cultural Pillars */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {culturalPillars.map((pillar) => (
                <Card key={pillar.title} className="border-0 bg-card shadow-sm">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <pillar.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-serif text-lg font-bold text-foreground">{pillar.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{pillar.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Culture Highlights */}
        <section className="bg-secondary py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">Cultural Highlights</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Discover what makes Maplewood's culture truly unique.
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {cultureHighlights.map((highlight, index) => (
                <div
                  key={highlight.title}
                  className={`flex flex-col overflow-hidden rounded-xl bg-card shadow-sm ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="relative aspect-[4/3] md:aspect-auto md:w-1/2">
                    <Image
                      src={highlight.image || "/placeholder.svg"}
                      alt={highlight.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center p-6 md:w-1/2">
                    <h3 className="font-serif text-xl font-bold text-foreground">{highlight.title}</h3>
                    <p className="mt-2 text-muted-foreground">{highlight.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Traditions Section */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">Living Traditions</h2>
                <div className="mt-6 space-y-4 text-muted-foreground">
                  <p>
                    Every October, the scent of maple syrup fills the air as families gather for the annual Maple
                    Festival. This beloved tradition, dating back to 1895, celebrates our town's namesake with syrup
                    tastings, pancake breakfasts, and the legendary Maple Pie Contest.
                  </p>
                  <p>
                    The Saturday Farmers Market has been a weekly ritual since 1923, bringing together farmers,
                    artisans, and neighbors. It's more than shopping—it's where friendships are forged and community
                    bonds are strengthened.
                  </p>
                  <p>
                    Our "First Friday Art Walks" transform downtown into an open-air gallery each month, as galleries
                    and studios open their doors, musicians perform on corners, and the community celebrates creativity
                    together.
                  </p>
                </div>
                <Button asChild className="mt-8 gap-2">
                  <Link href="/events">
                    See Upcoming Events
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                    <Image
                      src="/placeholder.svg?height=400&width=300"
                      alt="Farmers market"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="relative aspect-square overflow-hidden rounded-xl">
                    <Image
                      src="/placeholder.svg?height=300&width=300"
                      alt="Local crafts"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="mt-8 space-y-4">
                  <div className="relative aspect-square overflow-hidden rounded-xl">
                    <Image src="/placeholder.svg?height=300&width=300" alt="Live music" fill className="object-cover" />
                  </div>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-xl">
                    <Image
                      src="/placeholder.svg?height=400&width=300"
                      alt="Art gallery"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Get Involved CTA */}
        <section className="bg-primary py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-primary-foreground sm:text-4xl">Get Involved</h2>
            <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
              Whether you're a resident or a visitor, there are countless ways to experience and contribute to
              Maplewood's vibrant culture.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" variant="secondary">
                <Link href="/events">View Events Calendar</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
