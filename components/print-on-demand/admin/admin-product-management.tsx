'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Plus } from 'lucide-react'

export function AdminProductManagement() {
  const products = [
    { id: '1', name: 'Premium T-Shirt', category: 'Apparel', basePrice: 1200, stock: 'Unlimited', status: 'Active' },
    { id: '2', name: 'Ceramic Mug', category: 'Drinkware', basePrice: 800, stock: 'Unlimited', status: 'Active' },
    { id: '3', name: 'Canvas Poster', category: 'Home', basePrice: 1500, stock: 'Unlimited', status: 'Active' },
    { id: '4', name: 'Hoodie', category: 'Apparel', basePrice: 2500, stock: 'Unlimited', status: 'Active' },
  ]

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold">Product Catalog</h2>
          <p className="text-sm text-muted-foreground">
            Manage available products for print-on-demand
          </p>
        </div>

        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <Card key={product.id} className="p-4">
            <div className="aspect-square bg-muted rounded-md mb-3" />
            <div className="space-y-2">
              <div className="flex items-start justify-between">
                <h3 className="font-semibold">{product.name}</h3>
                <Badge variant="secondary">Active</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{product.category}</p>
              <p className="text-lg font-bold">KES {product.basePrice}</p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Edit
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  Disable
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Card>
  )
}
