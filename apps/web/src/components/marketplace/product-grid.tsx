"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { calculateDiscount } from "@/lib/actions/marketplace"
import { use, useState } from "react"
import { addToCart } from "@/lib/actions/marketplace"
import { toast } from "sonner"
import { urlFor } from "@/sanity/lib/image"

export function ProductGrid({ products }: { products: any[] }) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No products found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  )
}

function ProductCard({ product }: { product: any }) {
  const [isAdding, setIsAdding] = useState(false)
  const imageUrl = product.images?.[0]
    ? urlFor(product.images[0]).width(400).height(400).url()
    : "/placeholder.svg?height=400&width=400"

  const hasDiscount = product.discount?.isActive
  const originalPrice = product.price
  const discountedPrice = use(calculateDiscount(originalPrice, product.discount))
  const discountPercentage = hasDiscount ? Math.round(((originalPrice - Number(discountedPrice)) / originalPrice) * 100) : 0

  const handleAddToCart = async () => {
    setIsAdding(true)
    const result = await addToCart(product._id, 1)
    setIsAdding(false)

    if (result.success) {
      toast.success("Added to cart!")
    } else {
      toast.error("Failed to add to cart")
    }
  }

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-shadow">
      <Link href={`/marketplace/products/${product.slug.current}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={imageUrl || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          {hasDiscount && discountPercentage > 0 && (
            <Badge className="absolute top-2 right-2 bg-destructive text-destructive-foreground">
              -{discountPercentage}%
            </Badge>
          )}
          {product.featured && <Badge className="absolute top-2 left-2 bg-primary">Featured</Badge>}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="secondary" className="text-lg">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link href={`/marketplace/products/${product.slug.current}`}>
          <h3 className="font-semibold text-lg line-clamp-2 hover:text-primary transition-colors">{product.name}</h3>
        </Link>

        {product.categories && product.categories.length > 0 && (
          <p className="text-sm text-muted-foreground mt-1">{product.categories[0].name}</p>
        )}

        <div className="flex items-center gap-1 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-4 w-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-muted"}`} />
          ))}
          <span className="text-sm text-muted-foreground ml-1">(4.0)</span>
        </div>

        <div className="mt-3">
          {hasDiscount ? (
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-foreground">${discountedPrice.toFixed(2)}</span>
              <span className="text-sm text-muted-foreground line-through">${originalPrice.toFixed(2)}</span>
            </div>
          ) : (
            <span className="text-2xl font-bold text-foreground">${originalPrice.toFixed(2)}</span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full gap-2" onClick={handleAddToCart} disabled={!product.inStock || isAdding}>
          <ShoppingCart className="h-4 w-4" />
          {isAdding ? "Adding..." : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  )
}
