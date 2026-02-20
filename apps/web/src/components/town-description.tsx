import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, TreePine, Mountain, Thermometer } from "lucide-react"
import { townInfo } from "@/lib/data"

export function TownDescription() {
  const features = [
    { icon: TreePine, label: "Area", value: townInfo.area },
    { icon: Mountain, label: "Elevation", value: townInfo.elevation },
    { icon: Thermometer, label: "Climate", value: townInfo.climate },
  ]

  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Image Grid */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image
                    src="/placeholder.svg?height=500&width=400"
                    alt="Downtown Maplewood"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Maple forest trails"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  <Image
                    src="/placeholder.svg?height=300&width=300"
                    alt="Farmers market"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
                  <Image
                    src="/placeholder.svg?height=500&width=400"
                    alt="Historic buildings"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-background rounded-full px-6 py-3 shadow-lg border">
              <p className="text-sm font-medium text-center">
                <span className="text-primary font-bold">Voted #1</span> Small Town in the Region
              </p>
            </div>
          </div>

          {/* Content */}
          <div>
            <Badge variant="secondary" className="mb-4">
              About Our Town
            </Badge>
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl text-balance">
              A Community Rich in History, Culture & Natural Beauty
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{townInfo.longDescription}</p>

            {/* Features */}
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.label} className="flex items-center gap-3 rounded-lg bg-background p-4 border">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{feature.label}</p>
                    <p className="font-medium text-foreground text-sm">{feature.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="gap-2">
                <Link href="/history">
                  Explore Our History
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/culture">Discover Our Culture</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
