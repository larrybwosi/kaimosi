'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface ProductPreviewProps {
  productType: string
  designLayers: any[]
}

export function ProductPreview({ productType, designLayers }: ProductPreviewProps) {
  const productInfo: Record<string, { name: string; description: string }> = {
    tshirt: {
      name: 'Premium T-Shirt',
      description: '100% cotton, high-quality print',
    },
    mug: {
      name: 'Ceramic Mug',
      description: '11oz, dishwasher safe',
    },
    poster: {
      name: 'Art Poster',
      description: 'Museum-quality paper',
    },
    hoodie: {
      name: 'Premium Hoodie',
      description: '80/20 cotton blend',
    },
    tote: {
      name: 'Tote Bag',
      description: 'Heavy-duty canvas',
    },
  }

  const info = productInfo[productType] || productInfo.tshirt

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg">{info.name}</h3>
          <p className="text-sm text-muted-foreground">{info.description}</p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary">Preview Mode</Badge>
          <Badge variant="outline">{designLayers.length} layers</Badge>
        </div>

        <div className="aspect-square bg-muted/20 rounded-lg flex items-center justify-center">
          <p className="text-sm text-muted-foreground">3D Preview Coming Soon</p>
        </div>
      </div>
    </Card>
  )
}
