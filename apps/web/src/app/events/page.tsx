import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { events, townInfo } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, ArrowRight, Bell } from "lucide-react"

export const metadata = {
  title: `Events & Calendar | ${townInfo.name}`,
  description: `Discover upcoming events, festivals, and community gatherings in ${townInfo.name}.`,
}

const upcomingMonths = [
  { month: "January 2026", events: 8 },
  { month: "February 2026", events: 12 },
  { month: "March 2026", events: 15 },
  { month: "April 2026", events: 10 },
]

export default function EventsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-secondary py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="text-sm font-medium uppercase tracking-wider text-primary">What's Happening</p>
                <h1 className="mt-2 font-serif text-4xl font-bold text-foreground sm:text-5xl">
                  Events & Celebrations
                </h1>
                <p className="mt-6 text-lg text-muted-foreground">
                  From seasonal festivals to weekly markets, there's always something happening in Maplewood. Join us
                  for community gatherings, cultural celebrations, and family-friendly activities throughout the year.
                </p>
                <Button asChild className="mt-8 gap-2">
                  <a href="#featured">
                    <Bell className="h-4 w-4" />
                    Get Event Alerts
                  </a>
                </Button>
              </div>

              {/* Quick Calendar */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="flex items-center gap-2 font-semibold text-foreground">
                    <Calendar className="h-5 w-5 text-primary" />
                    Quick Calendar
                  </h3>
                  <div className="mt-4 space-y-3">
                    {upcomingMonths.map((month) => (
                      <div
                        key={month.month}
                        className="flex items-center justify-between rounded-lg bg-secondary p-3 transition-colors hover:bg-secondary/80"
                      >
                        <span className="font-medium text-foreground">{month.month}</span>
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          {month.events} events
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Events */}
        <section id="featured" className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="font-serif text-3xl font-bold text-foreground">Featured Events</h2>
                <p className="mt-2 text-muted-foreground">Don't miss these upcoming highlights</p>
              </div>
            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-2">
              {events.map((event, index) => (
                <Card
                  key={event.id}
                  className={`group overflow-hidden border-0 shadow-sm transition-all hover:shadow-lg ${
                    index === 0 ? "lg:col-span-2" : ""
                  }`}
                >
                  <div className={`flex flex-col ${index === 0 ? "lg:flex-row" : "sm:flex-row"}`}>
                    {/* Image */}
                    <div
                      className={`relative ${index === 0 ? "aspect-video lg:aspect-auto lg:w-1/2" : "aspect-video sm:aspect-square sm:w-1/3"}`}
                    >
                      <Image
                        src={event.image || "/placeholder.svg"}
                        alt={event.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-1 flex-col justify-center p-6">
                      <div className="flex items-center gap-2 text-sm text-primary">
                        <Calendar className="h-4 w-4" />
                        {event.date}
                      </div>
                      <h3
                        className={`mt-2 font-serif font-bold text-foreground ${index === 0 ? "text-2xl lg:text-3xl" : "text-xl"}`}
                      >
                        {event.name}
                      </h3>
                      <p className={`mt-2 text-muted-foreground ${index === 0 ? "" : "line-clamp-2"}`}>
                        {event.description}
                      </p>
                      <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {event.location}
                        </span>
                      </div>
                      {index === 0 && (
                        <Button className="mt-6 w-fit gap-2">
                          Learn More
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Recurring Events */}
        <section className="bg-secondary py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center">
              <h2 className="font-serif text-3xl font-bold text-foreground">Weekly & Monthly Happenings</h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Regular community events you can count on throughout the year.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  name: "Farmers Market",
                  schedule: "Every Saturday, 8AM-1PM",
                  location: "Downtown Main Street",
                  description: "Fresh local produce, artisan goods, and live music.",
                },
                {
                  name: "First Friday Art Walk",
                  schedule: "First Friday of each month, 5-9PM",
                  location: "Historic Downtown",
                  description: "Gallery openings, street performances, and local artists.",
                },
                {
                  name: "Community Yoga",
                  schedule: "Sundays, 9AM",
                  location: "Maple Grove Park",
                  description: "Free outdoor yoga sessions for all skill levels.",
                },
                {
                  name: "Book Club Meetup",
                  schedule: "Second Tuesday, 7PM",
                  location: "Maplewood Library",
                  description: "Monthly book discussions open to all readers.",
                },
                {
                  name: "Live Music Nights",
                  schedule: "Thursdays, 7-10PM",
                  location: "Old Mill Brewery",
                  description: "Local and regional musicians perform weekly.",
                },
                {
                  name: "Kids Story Time",
                  schedule: "Wednesdays, 10AM",
                  location: "Maplewood Library",
                  description: "Interactive story sessions for children ages 2-6.",
                },
              ].map((event) => (
                <Card key={event.name} className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="font-serif text-lg font-bold text-foreground">{event.name}</h3>
                    <div className="mt-3 space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-primary">
                        <Clock className="h-4 w-4" />
                        {event.schedule}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground">{event.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <Card className="overflow-hidden border-0 bg-primary shadow-lg">
              <CardContent className="p-8 text-center lg:p-12">
                <h2 className="font-serif text-3xl font-bold text-primary-foreground">Host Your Event Here</h2>
                <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
                  Looking to host a private event, wedding, or corporate gathering? Maplewood offers beautiful venues
                  and full event planning support.
                </p>
                <Button asChild size="lg" variant="secondary" className="mt-8">
                  <Link href="/contact">Inquire About Venues</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
