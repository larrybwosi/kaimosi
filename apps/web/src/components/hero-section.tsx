import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, MapPin, Users, Calendar } from "lucide-react"
import { townInfo } from "@/lib/data"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/placeholder.svg?height=900&width=1600"
          alt="Aerial view of Maplewood"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
            </span>
            Welcome to {townInfo.name}
          </div>

          {/* Heading */}
          <h1 className="font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
            {townInfo.tagline}
          </h1>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty">{townInfo.description}</p>

          <p className="mt-4 text-base leading-relaxed text-muted-foreground/80 text-pretty">
            Discover our award-winning restaurants, unique boutique shops, comfortable accommodations, and countless
            attractions that make Maplewood a destination worth exploring.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button asChild size="lg" className="gap-2">
              <Link href="/attractions">
                Explore Attractions
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="gap-2 bg-background/50 backdrop-blur-sm">
              <Link href="/history">
                <Play className="h-4 w-4" />
                Our Story
              </Link>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-6 border-t border-border pt-8 sm:grid-cols-4">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-foreground">{townInfo.founded}</p>
                <p className="text-sm text-muted-foreground">Year Founded</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-foreground">
                  {(townInfo.population / 1000).toFixed(1)}K
                </p>
                <p className="text-sm text-muted-foreground">Residents</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-foreground">50+</p>
                <p className="text-sm text-muted-foreground">Attractions</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-foreground">20+</p>
                <p className="text-sm text-muted-foreground">Annual Events</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
