"use client"

import { use, useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Heart, Share2, Truck, Shield, RefreshCw, Star } from "lucide-react"
import { calculateDiscount, addToCart } from "@/lib/actions/marketplace"
import { toast } from "sonner"
import { PortableText } from "@portabletext/react"
import { ShareButton } from "@/components/share/share-button"
import { urlFor } from "@/sanity/lib/image"

export function ProductDetail({ product }: { product: any }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)

  const images = product.images || []
  const hasDiscount = product.discount?.isActive
  const originalPrice = product.price
  const discountedPrice = use(calculateDiscount(originalPrice, product.discount))

  const handleAddToCart = async () => {
    setIsAdding(true)
    const result = await addToCart(product._id, quantity)
    setIsAdding(false)

    if (result.success) {
      toast.success(`Added ${quantity} item(s) to cart!`)
    } else {
      toast.error("Failed to add to cart")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
              <Image
                src={
                  images[selectedImage]
                    ? urlFor(images[selectedImage]).width(800).height(800).url()
                    : "/placeholder.svg?height=800&width=800"
                }
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {hasDiscount && (
                <Badge className="absolute top-4 right-4 bg-destructive text-lg px-3 py-1">
                  Save {Math.round(((originalPrice - discountedPrice) / originalPrice) * 100)}%
                </Badge>
              )}
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {images.map((image: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${
                      selectedImage === index ? "border-primary" : "border-transparent hover:border-muted-foreground"
                    }`}
                  >
                    <Image
                      src={urlFor(image).width(200).height(200).url() || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {product.categories?.map((cat: any) => (
                  <Badge key={cat._id} variant="secondary">
                    {cat.name}
                  </Badge>
                ))}
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">{product.name}</h1>

              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "text-muted"}`} />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(127 reviews)</span>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              {hasDiscount ? (
                <>
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-foreground">${discountedPrice.toFixed(2)}</span>
                    <span className="text-xl text-muted-foreground line-through">${originalPrice.toFixed(2)}</span>
                  </div>
                  {product.discount && (
                    <p className="text-sm text-destructive font-medium">
                      {product.discount.name} - Limited time offer!
                    </p>
                  )}
                </>
              ) : (
                <span className="text-4xl font-bold text-foreground">${originalPrice.toFixed(2)}</span>
              )}

              {product.inStock ? (
                <p className="text-sm text-green-600 font-medium">In Stock</p>
              ) : (
                <p className="text-sm text-destructive font-medium">Out of Stock</p>
              )}
            </div>

            <Separator />

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="font-medium">Quantity:</label>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3"
                  >
                    -
                  </Button>
                  <span className="px-4 font-medium">{quantity}</span>
                  <Button variant="ghost" size="sm" onClick={() => setQuantity(quantity + 1)} className="px-3">
                    +
                  </Button>
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1 gap-2"
                  onClick={handleAddToCart}
                  disabled={!product.inStock || isAdding}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {isAdding ? "Adding..." : "Add to Cart"}
                </Button>
                <Button size="lg" variant="outline">
                  <Heart className="h-5 w-5" />
                </Button>
                <ShareButton
                  type="product"
                  slug={product.slug?.current}
                  title={product.name}
                  description={product.shortDescription}
                  image={product.images?.[0] ? urlFor(product.images[0]).width(400).height(400).url() : undefined}
                  size="lg"
                />
              </div>
            </div>

            {/* Features */}
            <Card>
              <CardContent className="grid grid-cols-3 gap-4 p-6">
                <div className="flex flex-col items-center text-center gap-2">
                  <Truck className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium text-sm">Free Shipping</p>
                    <p className="text-xs text-muted-foreground">Orders over $50</p>
                  </div>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <Shield className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium text-sm">Secure Payment</p>
                    <p className="text-xs text-muted-foreground">100% Protected</p>
                  </div>
                </div>
                <div className="flex flex-col items-center text-center gap-2">
                  <RefreshCw className="h-8 w-8 text-primary" />
                  <div>
                    <p className="font-medium text-sm">Easy Returns</p>
                    <p className="text-xs text-muted-foreground">30 Day Return</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6 prose max-w-none">
                  {product.description ? (
                    <PortableText value={product.description} />
                  ) : (
                    <p className="text-muted-foreground">No description available.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specifications" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="grid gap-3">
                    {product.sku && (
                      <div className="flex justify-between py-2 border-b">
                        <span className="font-medium">SKU:</span>
                        <span className="text-muted-foreground">{product.sku}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Availability:</span>
                      <span className="text-muted-foreground">{product.inStock ? "In Stock" : "Out of Stock"}</span>
                    </div>
                    {product.stockQuantity && (
                      <div className="flex justify-between py-2 border-b">
                        <span className="font-medium">Stock Quantity:</span>
                        <span className="text-muted-foreground">{product.stockQuantity}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <p className="text-muted-foreground">Reviews coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
