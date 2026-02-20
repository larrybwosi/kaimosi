import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Store, Utensils, Bed, GraduationCap, TreePine, Calendar } from "lucide-react"

const quickLinks = [
  {
    title: "Restaurants",
    description: "Explore local dining from farm-to-table to international cuisine",
    icon: Utensils,
    href: "/directory/restaurants",
    color: "bg-orange-500/10 text-orange-600",
  },
  {
    title: "Stores & Shops",
    description: "Discover boutiques, antiques, and unique local retailers",
    icon: Store,
    href: "/directory/stores",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    title: "Accommodations",
    description: "Find the perfect stay from cozy B&Bs to modern hotels",
    icon: Bed,
    href: "/directory/hostels",
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    title: "Institutions",
    description: "Universities, colleges, and educational centers",
    icon: GraduationCap,
    href: "/institutions",
    color: "bg-emerald-500/10 text-emerald-600",
  },
  {
    title: "Attractions",
    description: "Parks, museums, landmarks, and entertainment venues",
    icon: TreePine,
    href: "/attractions",
    color: "bg-green-500/10 text-green-600",
  },
  {
    title: "Events",
    description: "Festivals, concerts, and community gatherings",
    icon: Calendar,
    href: "/events",
    color: "bg-pink-500/10 text-pink-600",
  },
]

export function QuickLinks() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">Quick Access</p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">
            Find What You're Looking For
          </h2>
          <p className="mt-4 mx-auto max-w-2xl text-muted-foreground">
            Whether you're planning a visit or a longtime resident, easily find restaurants, shops, accommodations, and
            more in Maplewood.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickLinks.map((link) => (
            <Link key={link.title} href={link.href} className="group">
              <Card className="h-full transition-all duration-300 hover:shadow-lg hover:border-primary/20 group-hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl ${link.color}`}>
                    <link.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                    {link.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">{link.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
