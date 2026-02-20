import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Palette, ShoppingBag, Package, TrendingUp, Zap, Shield } from 'lucide-react'

export default function PrintOnDemandPage() {
  const features = [
    {
      icon: Palette,
      title: 'Design Studio',
      description: 'Professional canvas editor with layers, text, images, and real-time preview',
      link: '/print-on-demand/studio',
    },
    {
      icon: ShoppingBag,
      title: 'Product Catalog',
      description: 'Wide range of customizable products from apparel to home decor',
      link: '/print-on-demand/products',
    },
    {
      icon: Package,
      title: 'Template Library',
      description: 'Start with professional templates or create from scratch',
      link: '/print-on-demand/templates',
    },
  ]

  const benefits = [
    {
      icon: Zap,
      title: 'Fast Production',
      description: 'Quick turnaround time from order to delivery',
    },
    {
      icon: Shield,
      title: 'Quality Guarantee',
      description: 'Premium materials and printing technology',
    },
    {
      icon: TrendingUp,
      title: 'Scalable Orders',
      description: 'From single items to bulk orders with discounts',
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b border-border bg-gradient-to-b from-muted/50 to-background">
        <div className="mx-auto max-w-7xl px-4 py-20 text-center">
          <Badge variant="secondary" className="mb-4">
            Enterprise-Grade Print-on-Demand
          </Badge>
          <h1 className="text-5xl font-bold mb-6 text-balance">
            Create Custom Products
            <br />
            <span className="text-primary">With Your Designs</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Professional design tools, instant previews, and seamless ordering. 
            Bring your creative vision to life on premium products.
          </p>

          <div className="flex items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/print-on-demand/studio">
                <Palette className="mr-2 h-5 w-5" />
                Start Designing
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/print-on-demand/products">
                Browse Products
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
            <p className="text-lg text-muted-foreground">
              Complete design and ordering workflow in one platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="mb-4">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <Button variant="ghost" className="p-0" asChild>
                    <Link href={feature.link}>Explore →</Link>
                  </Button>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Us</h2>
            <p className="text-lg text-muted-foreground">
              Quality, speed, and reliability for your custom products
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4">
          <Card className="p-12 text-center bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Create your first custom product in minutes
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/print-on-demand/templates">
                  Browse Templates
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/print-on-demand/studio">
                  Start from Scratch
                </Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
