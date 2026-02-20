import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { townInfo } from "@/lib/data"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Phone, Mail, Clock, MessageSquare, Users, Camera, Building } from "lucide-react"
import { ContactForm } from "@/components/contact-form"

export const metadata = {
  title: `Contact Us | ${townInfo.name}`,
  description: `Get in touch with the Town of ${townInfo.name}. Find visitor information, plan your trip, or reach out with questions.`,
}

const contactInfo = [
  {
    icon: MapPin,
    title: "Visitor Center",
    details: ["100 Main Street", "Maplewood, State 12345"],
  },
  {
    icon: Phone,
    title: "Phone",
    details: ["(555) 123-4567", "Toll-free: 1-800-MAPLE-WD"],
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@maplewood.gov", "tourism@maplewood.gov"],
  },
  {
    icon: Clock,
    title: "Visitor Center Hours",
    details: ["Mon-Fri: 9AM - 5PM", "Sat-Sun: 10AM - 4PM"],
  },
]

const inquiryTypes = [
  {
    icon: Camera,
    title: "Tourism & Visits",
    description: "Planning a visit? We'll help you make the most of your time in Maplewood.",
  },
  {
    icon: Users,
    title: "Relocating",
    description: "Interested in making Maplewood home? Learn about housing, schools, and community.",
  },
  {
    icon: Building,
    title: "Business Inquiries",
    description: "Starting or expanding a business? Discover opportunities in our growing economy.",
  },
  {
    icon: MessageSquare,
    title: "General Questions",
    description: "Have other questions? Our team is here to help with anything Maplewood-related.",
  },
]

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-secondary py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 text-center lg:px-8">
            <p className="text-sm font-medium uppercase tracking-wider text-primary">Get In Touch</p>
            <h1 className="mt-2 font-serif text-4xl font-bold text-foreground sm:text-5xl">Contact Us</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Whether you're planning a visit, considering relocation, or just have questions about Maplewood, we're
              here to help. Reach out and let us know how we can assist you.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {contactInfo.map((item) => (
                <Card key={item.title} className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <item.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <div className="mt-2 space-y-1">
                      {item.details.map((detail, index) => (
                        <p key={index} className="text-sm text-muted-foreground">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Inquiry Types */}
        <section className="border-y border-border bg-secondary/50 py-12 lg:py-16">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <h2 className="text-center font-serif text-2xl font-bold text-foreground">How Can We Help?</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {inquiryTypes.map((type) => (
                <div
                  key={type.title}
                  className="rounded-xl bg-card p-6 shadow-sm transition-all hover:shadow-md cursor-pointer"
                >
                  <type.icon className="h-8 w-8 text-primary" />
                  <h3 className="mt-4 font-semibold text-foreground">{type.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{type.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-16 lg:py-24">
          <div className="mx-auto max-w-7xl px-4 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Form */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground">Send Us a Message</h2>
                <p className="mt-2 text-muted-foreground">
                  Fill out the form below and we'll get back to you within 24-48 hours.
                </p>
                <ContactForm />
              </div>

              {/* Map */}
              <div>
                <h2 className="font-serif text-2xl font-bold text-foreground">Find Us</h2>
                <p className="mt-2 text-muted-foreground">
                  Our Visitor Center is located in the heart of downtown Maplewood.
                </p>
                <div className="mt-6 overflow-hidden rounded-xl border border-border">
                  <div className="aspect-square w-full lg:aspect-[4/3]">
                    <iframe
                      src="https://www.openstreetmap.org/export/embed.html?bbox=-74.02%2C40.70%2C-74.00%2C40.72&layer=mapnik&marker=40.71%2C-74.01"
                      className="h-full w-full"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Maplewood Visitor Center location"
                    />
                  </div>
                </div>
                <Card className="mt-4 border-0 shadow-sm">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Maplewood Visitor Center</p>
                      <p className="text-sm text-muted-foreground">100 Main Street, Maplewood, State 12345</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
