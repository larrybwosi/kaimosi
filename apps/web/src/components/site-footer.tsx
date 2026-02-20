import Link from "next/link"
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube } from "lucide-react"
import { townInfo } from "@/lib/data"

const footerLinks = {
  discover: [
    { name: "History", href: "/history" },
    { name: "Culture", href: "/culture" },
    { name: "Attractions", href: "/attractions" },
    { name: "Events", href: "/events" },
  ],
  visit: [
    { name: "Plan Your Trip", href: "/contact" },
    { name: "Accommodations", href: "/contact" },
    { name: "Dining", href: "/attractions" },
    { name: "Transportation", href: "/contact" },
  ],
  connect: [
    { name: "Contact Us", href: "/contact" },
    { name: "Newsletter", href: "/contact" },
    { name: "Careers", href: "/contact" },
    { name: "Press", href: "/contact" },
  ],
}

const socialLinks = [
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "Instagram", href: "#", icon: Instagram },
  { name: "YouTube", href: "#", icon: Youtube },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <MapPin className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold text-foreground">{townInfo.name}</span>
                <span className="text-xs text-muted-foreground">Est. {townInfo.founded}</span>
              </div>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">{townInfo.tagline}</p>
            <div className="mt-6 flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-3">
            <div>
              <h3 className="text-sm font-semibold text-foreground">Discover</h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.discover.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Visit</h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.visit.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Connect</h3>
              <ul className="mt-4 space-y-3">
                {footerLinks.connect.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Bar */}
        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <a href="tel:+15551234567" className="flex items-center gap-2 hover:text-primary transition-colors">
              <Phone className="h-4 w-4" />
              (555) 123-4567
            </a>
            <a
              href="mailto:info@maplewood.gov"
              className="flex items-center gap-2 hover:text-primary transition-colors"
            >
              <Mail className="h-4 w-4" />
              info@maplewood.gov
            </a>
          </div>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Town of {townInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
