'use client'

import { useState } from 'react'
import { ChevronLeft, Save, Download, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useRouter } from 'next/navigation'

interface DesignHeaderProps {
  selectedProduct: string
  onProductChange: (product: string) => void
  canvasState: any
}

export function DesignHeader({ selectedProduct, onProductChange, canvasState }: DesignHeaderProps) {
  const router = useRouter()
  const [designName, setDesignName] = useState('Untitled Design')

  return (
    <header className="flex items-center justify-between border-b border-border bg-background px-4 py-3">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <div className="flex items-center gap-3">
          <Input
            value={designName}
            onChange={(e) => setDesignName(e.target.value)}
            className="w-64"
          />

          <Select value={selectedProduct} onValueChange={onProductChange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tshirt">T-Shirt</SelectItem>
              <SelectItem value="mug">Mug</SelectItem>
              <SelectItem value="poster">Poster</SelectItem>
              <SelectItem value="hoodie">Hoodie</SelectItem>
              <SelectItem value="tote">Tote Bag</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 border-r border-border pr-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground w-12 text-center">
            {Math.round(canvasState.zoom * 100)}%
          </span>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>

        <Button variant="ghost" size="sm">
          <RotateCcw className="mr-2 h-4 w-4" />
          Undo
        </Button>

        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>

        <Button size="sm">
          <Save className="mr-2 h-4 w-4" />
          Save Design
        </Button>

        <Button size="sm" className="bg-primary">
          Add to Cart
        </Button>
      </div>
    </header>
  )
}
