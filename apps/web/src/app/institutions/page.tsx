import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { institutions, townInfo } from "@/lib/data"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  Users,
  Calendar,
  MapPin,
  Phone,
  ExternalLink,
  BookOpen,
  Building2,
  Briefcase,
} from "lucide-react"

export const metadata = {
  title: `Educational Institutions | ${townInfo.name}`,
  description: `Explore the universities, colleges, and educational institutions that make ${townInfo.name} a center of learning.`,
}

const institutionStats = [
  { icon: GraduationCap, label: "Institutions", value: "3" },
  { icon: Users, label: "Total Students", value: "14,500+" },
  { icon: BookOpen, label: "Programs", value: "100+" },
  { icon: Briefcase, label: "Job Placement", value: "94%" },
]

export default function InstitutionsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden bg-secondary py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-medium uppercase tracking-wider text-primary">Education Excellence</p>
              <h1 className="mt-2 font-serif text-4xl font-bold text-foreground sm:text-5xl">
                World-Class Institutions
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
                Maplewood is proud to be home to outstanding educational institutions that have been shaping minds and
                futures for over a century. From liberal arts to technical training, our schools offer pathways to
                success for every learner.
              </p>
            </div>

            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:gap-8">
              {institutionStats.map((stat) => (
                <Card key={stat.label} className="border-0 bg-card shadow-sm">
                  <CardContent className="flex flex-col items-center p-4 text-center lg:p-6">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <stat.icon className="h-6 w-6 text-primary" />
                    </div>
                    <span className="font-serif text-2xl font-bold text-foreground lg:text-3xl">{stat.value}</span>
                    <span className="text-sm text-muted-foreground">{stat.label}</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Institutions List */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="space-y-16">
              {institutions.map((institution, index) => (
                <div
                  key={institution.id}
                  className={`flex flex-col overflow-hidden rounded-2xl bg-card shadow-sm lg:flex-row ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Image */}
                  <div className="relative aspect-video w-full lg:aspect-auto lg:w-1/2">
                    <Image
                      src={institution.image || "/placeholder.svg"}
                      alt={institution.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute left-4 top-4">
                      <Badge className="bg-primary text-primary-foreground">{institution.type}</Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col justify-center p-6 lg:p-10">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        Est. {institution.established}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {institution.students.toLocaleString()} students
                      </span>
                    </div>

                    <h2 className="mt-3 font-serif text-2xl font-bold text-foreground lg:text-3xl">
                      {institution.name}
                    </h2>

                    <p className="mt-4 text-muted-foreground">{institution.description}</p>

                    {/* Programs */}
                    <div className="mt-6">
                      <h3 className="text-sm font-semibold text-foreground">Featured Programs</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {institution.programs.map((program) => (
                          <Badge key={program} variant="secondary" className="text-xs">
                            {program}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="mt-6 flex flex-col gap-2 text-sm text-muted-foreground sm:flex-row sm:gap-6">
                      <span className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 shrink-0" />
                        <span className="line-clamp-1">{institution.address}</span>
                      </span>
                      <span className="flex items-center gap-2">
                        <Phone className="h-4 w-4 shrink-0" />
                        {institution.phone}
                      </span>
                    </div>

                    {/* CTA */}
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                      <Button asChild>
                        <a href={institution.website} target="_blank" rel="noopener noreferrer" className="gap-2">
                          Visit Website
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button asChild variant="outline" className="bg-transparent">
                        <Link href="/contact">Request Information</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Study Here */}
        <section className="bg-secondary py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">Why Study in Maplewood?</h2>
                <div className="mt-6 space-y-6">
                  {[
                    {
                      icon: Building2,
                      title: "Affordable Living",
                      description:
                        "Enjoy a high quality of life at a fraction of the cost of major metropolitan areas.",
                    },
                    {
                      icon: Users,
                      title: "Supportive Community",
                      description:
                        "Small class sizes and a close-knit community mean personalized attention and support.",
                    },
                    {
                      icon: Briefcase,
                      title: "Career Opportunities",
                      description:
                        "Strong partnerships with local businesses provide internships and job placement opportunities.",
                    },
                    {
                      icon: GraduationCap,
                      title: "Academic Excellence",
                      description:
                        "Our institutions consistently rank among the best in the region for student outcomes.",
                    },
                  ].map((benefit) => (
                    <div key={benefit.title} className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <benefit.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{benefit.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{benefit.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative aspect-square overflow-hidden rounded-xl lg:aspect-[4/3]">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Students on campus"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
            <h2 className="font-serif text-3xl font-bold text-foreground">Ready to Start Your Journey?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Contact us to learn more about educational opportunities in Maplewood or schedule a campus visit.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
