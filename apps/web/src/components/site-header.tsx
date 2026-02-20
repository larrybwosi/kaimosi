"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, MapPin, Store, Utensils, Bed, Home, Calendar, BookOpen, Users, ArrowRight, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { UserMenu } from "@/components/auth/user-menu"

type NavigationItem = {
  name: string
  href: string
  icon?: LucideIcon
  description?: string
  children?: NavigationItem[]
}

const navigation: NavigationItem[] = [
  { name: "Home", href: "/", icon: Home },
  {
    name: "Discover",
    href: "#",
    icon: BookOpen,
    children: [
      { name: "History", href: "/history", description: "Explore our rich heritage since 1847" },
      { name: "Culture", href: "/culture", description: "Arts, traditions, and community life" },
      { name: "Attractions", href: "/attractions", description: "Things to see and do" },
    ],
  },
  {
    name: "Directory",
    href: "#",
    icon: Store,
    children: [
      {
        name: "Restaurants",
        href: "/directory/restaurants",
        description: "Dining from farm-to-table to international",
        icon: Utensils,
      },
      {
        name: "Stores & Shops",
        href: "/directory/stores",
        description: "Boutiques, antiques, and local retailers",
        icon: Store,
      },
      {
        name: "Accommodations",
        href: "/directory/hostels",
        description: "Hotels, B&Bs, and places to stay",
        icon: Bed,
      },
    ],
  },
  { name: "Institutions", href: "/institutions", icon: Users },
  { name: "Events", href: "/events", icon: Calendar },
  { name: "Contact", href: "/contact" },
]

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 lg:px-8 lg:py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-105">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary shadow-md">
            <MapPin className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg lg:text-xl font-bold text-foreground">Maplewood</span>
            <span className="text-xs text-muted-foreground">Est. 1847</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-1">
          <NavigationMenu>
            <NavigationMenuList>
              {navigation.map((item) =>
                item.children ? (
                  <NavigationMenuItem key={item.name}>
                    <NavigationMenuTrigger className="bg-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all duration-200">
                      <div className="flex items-center gap-2">
                        {item.icon && <item.icon className="h-4 w-4" />}
                        {item.name}
                      </div>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[420px] gap-2 p-4">
                        {item.children.map((child) => (
                          <li key={child.name}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={child.href}
                                className="flex items-start gap-3 select-none rounded-lg p-3 leading-none no-underline outline-none transition-all hover:bg-primary/10 hover:text-primary focus:bg-primary/10 focus:text-primary group"
                              >
                                {child.icon && (
                                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                                    <child.icon className="h-4 w-4 text-primary" />
                                  </div>
                                )}
                                <div className="space-y-1 flex-1">
                                  <div className="text-sm font-semibold leading-none text-foreground group-hover:text-primary transition-colors">{child.name}</div>
                                  <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                    {child.description}
                                  </p>
                                </div>
                                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100" />
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  <NavigationMenuItem key={item.name}>
                    <Link
                      href={item.href}
                      className={cn(
                        "group inline-flex h-10 w-max items-center justify-center gap-2 rounded-md bg-transparent px-3 py-2 text-sm font-medium text-muted-foreground transition-all hover:bg-secondary/50 hover:text-foreground focus:bg-secondary/50 focus:text-foreground focus:outline-none",
                      )}
                    >
                      {item.icon && <item.icon className="h-4 w-4" />}
                      {item.name}
                    </Link>
                  </NavigationMenuItem>
                ),
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden lg:block">
          <UserMenu />
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" className="hover:bg-secondary/50">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-sm p-0 overflow-y-auto">
            <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
            {/* Mobile Header */}
            <div className="sticky top-0 flex items-center justify-between bg-gradient-to-r from-primary/5 to-primary/10 px-4 py-4 border-b">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                  <MapPin className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="font-bold text-foreground">Maplewood</span>
              </div>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-5 w-5" />
                </Button>
              </SheetTrigger>
            </div>

            {/* Mobile Navigation */}
            <div className="flex flex-col divide-y divide-border">
              {navigation.map((item) => (
                <div key={item.name} className="border-b border-border/50">
                  {item.children ? (
                    <details className="group">
                      <summary className="flex items-center justify-between cursor-pointer px-4 py-3 hover:bg-secondary/50 transition-colors">
                        <div className="flex items-center gap-3">
                          {item.icon && <item.icon className="h-5 w-5 text-primary" />}
                          <span className="font-semibold text-foreground">{item.name}</span>
                        </div>
                        <svg className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                      </summary>
                      <div className="bg-secondary/30 px-4 py-2 space-y-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-primary/10 transition-all"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {child.icon && <child.icon className="h-4 w-4 text-primary" />}
                            <div className="flex-1">
                              <div className="font-medium text-foreground">{child.name}</div>
                              <p className="text-xs text-muted-foreground">{child.description}</p>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 font-semibold text-foreground hover:bg-primary/10 hover:text-primary transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.icon && <item.icon className="h-5 w-5 text-primary" />}
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}

              {/* Mobile Footer */}
              <div className="px-4 py-4 space-y-3 border-t">
                <UserMenu />
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  )
}
