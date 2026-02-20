import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { events } from "@/lib/data"

export function EventsPreview() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-primary">What's Happening</p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">Upcoming Events</h2>
          </div>
          <Button asChild variant="outline" className="gap-2 self-start bg-transparent">
            <Link href="/events">
              Full Calendar
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Events */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden border-0 shadow-sm transition-all hover:shadow-lg">
              <div className="relative aspect-[4/3]">
                <Image src={event.image || "/placeholder.svg"} alt={event.name} fill className="object-cover" />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 text-sm text-primary">
                  <Calendar className="h-4 w-4" />
                  {event.date}
                </div>
                <h3 className="mt-2 font-serif text-lg font-bold text-foreground">{event.name}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{event.description}</p>
                <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  {event.location}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
