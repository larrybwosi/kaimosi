'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Palette, Info } from 'lucide-react'
import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

interface Product {
  id: string
  name: string
  category: string
  basePrice: number
  image: string
  colors?: string[]
  sizes?: string[]
  description: string
}

interface ProductCardProps {
  product: Product
  onCustomize: () => void
}

export function ProductCard({ product, onCustomize }: ProductCardProps) {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all">
      <div className="relative aspect-square bg-muted">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute top-3 right-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="icon" variant="secondary" className="h-8 w-8">
                <Info className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{product.name}</DialogTitle>
                <DialogDescription>{product.description}</DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                {product.colors && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Available Colors</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.colors.map((color) => (
                        <Badge key={color} variant="outline">
                          {color}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {product.sizes && (
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Available Sizes</h4>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <Badge key={size} variant="outline">
                          {size}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <h4 className="font-semibold text-sm mb-2">Base Price</h4>
                  <p className="text-2xl font-bold">KES {product.basePrice.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Price varies with quantity and options
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <Badge variant="secondary">KES {product.basePrice}</Badge>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">{product.colors.length} colors</span>
            </div>
          )}
          {product.sizes && product.sizes.length > 0 && (
            <div className="flex items-center gap-1">
              <span className="text-xs text-muted-foreground">•</span>
              <span className="text-xs text-muted-foreground">{product.sizes.length} sizes</span>
            </div>
          )}
        </div>

        <Button className="w-full" onClick={onCustomize}>
          <Palette className="mr-2 h-4 w-4" />
          Customize Design
        </Button>
      </div>
    </Card>
  )
}
