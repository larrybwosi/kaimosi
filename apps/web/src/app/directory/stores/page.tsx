import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { stores } from "@/lib/data"
import { MapPin, Star } from "lucide-react"

export const metadata = {
  title: "Stores & Shops | Maplewood",
  description: "Discover unique boutiques, local shops, and retail stores in Maplewood.",
}

function StoresList() {
  const featured = stores.filter((s) => s.featured)
  const others = stores.filter((s) => !s.featured)

  return (
    <div className="space-y-12">
      {/* Featured */}
      <div>
        <h2 className="font-serif text-2xl font-bold text-foreground mb-6">Featured Stores</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((store) => (
            <Link key={store.id} href={`/directory/stores/${store.id}`} className="group">
              <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/20">
                <div className="relative aspect-[16/10]">
                  <Image
                    src={store.image || "/placeholder.svg"}
                    alt={store.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-primary">{store.category}</Badge>
                  </div>
                </div>
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-serif text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                      {store.name}
                    </h3>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-medium">{store.rating}</span>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{store.description}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {store.address.split(",")[0]}
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
        <h2 className="font-serif text-2xl font-bold text-foreground mb-6">All Stores</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((store) => (
            <Link key={store.id} href={`/directory/stores/${store.id}`} className="group">
              <Card className="h-full transition-all duration-300 hover:shadow-md hover:border-primary/20">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg">
                      <Image src={store.image || "/placeholder.svg"} alt={store.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                          {store.name}
                        </h3>
                        <div className="flex items-center gap-1 text-amber-500 shrink-0">
                          <Star className="h-3 w-3 fill-current" />
                          <span className="text-xs font-medium">{store.rating}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs mt-1">
                        {store.category}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1 truncate">{store.address.split(",")[0]}</p>
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

export default function StoresPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative bg-gradient-to-b from-blue-50 to-background dark:from-blue-950/20 py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <Badge variant="secondary" className="mb-4">
              Shopping Guide
            </Badge>
            <h1 className="font-serif text-4xl font-bold text-foreground sm:text-5xl">Stores & Shops</h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              Explore Maplewood's unique retail scene featuring boutiques, antique shops, bookstores, and specialty
              retailers.
            </p>
          </div>
        </section>

        {/* Listings */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <Suspense fallback={<div className="text-center py-12">Loading stores...</div>}>
              <StoresList />
            </Suspense>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
