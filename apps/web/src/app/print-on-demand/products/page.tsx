'use client'

import { useState, useEffect } from 'react'
import { ShoppingCart, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProductCard } from '@/components/print-on-demand/product-card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ProductsPage() {
  const router = useRouter()
  const [cartCount, setCartCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    // Fetch products
    // Mock products for now
    setProducts([
      {
        id: '1',
        name: 'Premium T-Shirt',
        category: 'apparel',
        basePrice: 1200,
        image: '/placeholder.svg?height=400&width=400',
        colors: ['Black', 'White', 'Navy', 'Gray'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        description: '100% cotton, comfortable fit, high-quality print',
      },
      {
        id: '2',
        name: 'Ceramic Mug',
        category: 'drinkware',
        basePrice: 800,
        image: '/placeholder.svg?height=400&width=400',
        colors: ['White', 'Black'],
        sizes: ['11oz', '15oz'],
        description: 'Dishwasher safe, vibrant colors',
      },
      {
        id: '3',
        name: 'Canvas Poster',
        category: 'home',
        basePrice: 1500,
        image: '/placeholder.svg?height=400&width=400',
        sizes: ['12x16', '16x20', '24x36'],
        description: 'Museum-quality canvas, ready to hang',
      },
      {
        id: '4',
        name: 'Hoodie',
        category: 'apparel',
        basePrice: 2500,
        image: '/placeholder.svg?height=400&width=400',
        colors: ['Black', 'Navy', 'Gray', 'Maroon'],
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
        description: '80/20 cotton blend, kangaroo pocket',
      },
      {
        id: '5',
        name: 'Tote Bag',
        category: 'accessories',
        basePrice: 1000,
        image: '/placeholder.svg?height=400&width=400',
        colors: ['Natural', 'Black'],
        description: 'Heavy-duty canvas, large capacity',
      },
      {
        id: '6',
        name: 'Phone Case',
        category: 'accessories',
        basePrice: 600,
        image: '/placeholder.svg?height=400&width=400',
        description: 'Slim profile, protective edges',
      },
    ])
  }, [])

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'apparel', name: 'Apparel' },
    { id: 'drinkware', name: 'Drinkware' },
    { id: 'home', name: 'Home & Living' },
    { id: 'accessories', name: 'Accessories' },
  ]

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Print-on-Demand Products</h1>
              <p className="text-sm text-muted-foreground">
                Choose a product to customize
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="outline" asChild>
                <Link href="/print-on-demand/templates">
                  Browse Templates
                </Link>
              </Button>

              <Button variant="outline" className="relative" asChild>
                <Link href="/print-on-demand/cart">
                  <ShoppingCart className="h-4 w-4" />
                  {cartCount > 0 && (
                    <Badge className="absolute -right-2 -top-2 h-5 w-5 rounded-full p-0 flex items-center justify-center">
                      {cartCount}
                    </Badge>
                  )}
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-4 relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.id}>
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(category.id === 'all'
                  ? filteredProducts
                  : filteredProducts.filter((p) => p.category === category.id)
                ).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onCustomize={() => router.push(`/print-on-demand/studio?product=${product.id}`)}
                  />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  )
}
