import Link from "next/link"
import Image from "next/image"
import { ArrowRight, GraduationCap, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { institutions } from "@/lib/data"

export function InstitutionsPreview() {
  return (
    <section className="bg-secondary py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">Education</p>
          <h2 className="mt-2 font-serif text-3xl font-bold text-foreground sm:text-4xl">World-Class Institutions</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Maplewood is home to outstanding educational institutions serving students of all ages and backgrounds.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {institutions.map((institution) => (
            <Card key={institution.id} className="overflow-hidden border-0 shadow-sm transition-all hover:shadow-lg">
              <div className="relative aspect-video">
                <Image
                  src={institution.image || "/placeholder.svg"}
                  alt={institution.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 text-sm text-primary">
                  <GraduationCap className="h-4 w-4" />
                  {institution.type}
                </div>
                <h3 className="mt-2 font-serif text-xl font-bold text-foreground">{institution.name}</h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{institution.description}</p>
                <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {institution.students.toLocaleString()} students
                  </span>
                  <span>Est. {institution.established}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 text-center">
          <Button asChild size="lg" className="gap-2">
            <Link href="/institutions">
              Explore All Institutions
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
