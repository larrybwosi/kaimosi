import { Suspense } from "react"
import { getProducts, getCategories, getActiveDiscounts } from "@/lib/actions/marketplace"
import { ProductGrid } from "@/components/marketplace/product-grid"
import { CategoryFilter } from "@/components/marketplace/category-filter"
import { DiscountBanner } from "@/components/marketplace/discount-banner"
import { MarketplaceSearch } from "@/components/marketplace/marketplace-search"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Marketplace | Browse Products",
  description: "Discover amazing products with exclusive discounts and deals",
}

export default async function MarketplacePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>
}) {
  const { category, search } = await searchParams
  const [productsResult, categoriesResult, discountsResult] = await Promise.all([
    getProducts({ category: category, search: search }),
    getCategories(),
    getActiveDiscounts(),
  ])

  const products = productsResult.success ? productsResult.data : []
  const categories = categoriesResult.success ? categoriesResult.data : []
  const discounts = discountsResult.success ? discountsResult.data : []

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Marketplace</h1>
              <p className="text-muted-foreground mt-1">Discover quality products at great prices</p>
            </div>
            <Link href="/marketplace/cart">
              <Button size="lg" className="gap-2">
                <ShoppingCart className="h-5 w-5" />
                View Cart
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Discount Banner */}
      {discounts.length > 0 && (
        <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
          <div className="container mx-auto px-4 py-4">
            <DiscountBanner discounts={discounts} />
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-4 space-y-6">
              <Suspense fallback={<div className="h-64 animate-pulse bg-muted rounded-lg" />}>
                <CategoryFilter categories={categories} />
              </Suspense>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <Suspense fallback={<div className="h-10 animate-pulse bg-muted rounded-lg" />}>
              <MarketplaceSearch />
            </Suspense>
            <div className="mt-6">
              <ProductGrid products={products} />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
