import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { historyTimeline, townInfo } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export const metadata = {
  title: `History of ${townInfo.name} | ${townInfo.name}`,
  description: `Explore the rich history of ${townInfo.name}, from its founding in 1847 to the present day.`,
}

export default function HistoryPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-secondary py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm font-medium uppercase tracking-wider text-primary">Our Heritage</p>
                <h1 className="mt-2 font-serif text-4xl font-bold text-foreground sm:text-5xl">
                  A Legacy of Community & Progress
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                  Since 1847, Maplewood has been a beacon of community spirit, innovation, and natural beauty. From
                  humble beginnings as a frontier settlement to becoming one of the region's most vibrant small towns,
                  our story is one of resilience, growth, and an unwavering commitment to preserving what makes our
                  community special.
                </p>
                <Button asChild className="mt-8 gap-2">
                  <Link href="/attractions/maplewood-museum">
                    Visit Our Museum
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Historic photograph of Maplewood"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">Our Journey Through Time</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Key moments that shaped Maplewood into the vibrant community it is today.
              </p>
            </div>

            <div className="relative mt-16">
              {/* Timeline Line */}
              <div className="absolute left-4 top-0 hidden h-full w-0.5 bg-border md:left-1/2 md:block md:-translate-x-0.5" />

              <div className="space-y-12">
                {historyTimeline.map((event, index) => (
                  <div
                    key={event.year}
                    className={`relative flex flex-col gap-4 md:flex-row md:gap-8 ${
                      index % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Timeline Dot */}
                    <div className="absolute left-4 top-0 hidden h-4 w-4 -translate-x-1/2 rounded-full bg-primary md:left-1/2 md:block" />

                    {/* Content */}
                    <div className="flex-1 md:w-1/2">
                      <div className={`rounded-xl bg-card p-6 shadow-sm ${index % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}>
                        <span className="font-serif text-3xl font-bold text-primary">{event.year}</span>
                        <h3 className="mt-2 font-serif text-xl font-bold text-foreground">{event.title}</h3>
                        <p className="mt-2 text-muted-foreground">{event.description}</p>
                      </div>
                    </div>

                    {/* Spacer for alignment */}
                    <div className="hidden flex-1 md:block md:w-1/2" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Founding Story */}
        <section className="bg-secondary py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="order-2 lg:order-1">
                <div className="relative aspect-square overflow-hidden rounded-xl">
                  <Image
                    src="/placeholder.svg?height=600&width=600"
                    alt="Maple forest in autumn"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">The Founding Story</h2>
                <div className="mt-6 space-y-4 text-muted-foreground">
                  <p>
                    In the spring of 1847, a group of pioneering families, led by Ezra Thornwood, journeyed westward in
                    search of fertile land and new opportunities. When they crested the hills overlooking the Maple
                    River valley, they knew they had found their home.
                  </p>
                  <p>
                    The valley was carpeted with ancient maple trees, their leaves shimmering in the sunlight. Fresh
                    water flowed abundantly, and the rich soil promised bountiful harvests. Within weeks, the first
                    cabins were built, and Maplewood was born.
                  </p>
                  <p>
                    The town's name, suggested by Sarah Thornwood, honored the magnificent maple groves that would
                    become synonymous with our community. Those same trees still stand today in Maple Grove Park, living
                    monuments to our founders' vision.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Notable Figures */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">Notable Figures</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                The visionaries and leaders who shaped our community.
              </p>
            </div>

            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Ezra Thornwood",
                  role: "Town Founder",
                  years: "1815-1892",
                  description:
                    "Led the original settlers to the Maple Valley and served as the town's first mayor for 20 years.",
                },
                {
                  name: "Dr. Eleanor Hayes",
                  role: "University Founder",
                  years: "1845-1928",
                  description:
                    "Established Maplewood University in 1892, championing education for all regardless of background.",
                },
                {
                  name: "James Riverdale",
                  role: "Industrialist & Philanthropist",
                  years: "1860-1940",
                  description:
                    "Built the railroad connection and donated land for the Botanical Gardens and public parks.",
                },
              ].map((figure) => (
                <div key={figure.name} className="rounded-xl bg-card p-6 shadow-sm">
                  <div className="relative mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full bg-secondary">
                    <Image
                      src={`/placeholder.svg?height=96&width=96&query=vintage portrait ${figure.name.split(" ")[0]}`}
                      alt={figure.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-center font-serif text-xl font-bold text-foreground">{figure.name}</h3>
                  <p className="text-center text-sm text-primary">{figure.role}</p>
                  <p className="text-center text-sm text-muted-foreground">{figure.years}</p>
                  <p className="mt-4 text-center text-sm text-muted-foreground">{figure.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
