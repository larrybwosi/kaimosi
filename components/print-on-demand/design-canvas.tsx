'use client'

import { useRef, useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'

interface Layer {
  id: string
  type: 'text' | 'image'
  x: number
  y: number
  rotation?: number
  visible?: boolean
  // Text specific
  content?: string
  fontSize?: number
  fontFamily?: string
  color?: string
  // Image specific
  url?: string
  width?: number
  height?: number
}

interface DesignCanvasProps {
  productType: string
  layers: Layer[]
  selectedLayer: string | null
  onLayerUpdate: (layers: Layer[]) => void
  onLayerSelect: (id: string | null) => void
  canvasState: any
  onCanvasStateChange: (state: any) => void
}

export function DesignCanvas({
  productType,
  layers,
  selectedLayer,
  onLayerUpdate,
  onLayerSelect,
  canvasState,
  onCanvasStateChange,
}: DesignCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [productImage, setProductImage] = useState<HTMLImageElement | null>(null)

  // Product dimensions
  const productDimensions: Record<string, { width: number; height: number; printArea: { x: number; y: number; width: number; height: number } }> = {
    tshirt: {
      width: 400,
      height: 500,
      printArea: { x: 100, y: 150, width: 200, height: 250 },
    },
    mug: {
      width: 300,
      height: 300,
      printArea: { x: 50, y: 50, width: 200, height: 200 },
    },
    poster: {
      width: 400,
      height: 600,
      printArea: { x: 0, y: 0, width: 400, height: 600 },
    },
  }

  const dimensions = productDimensions[productType] || productDimensions.tshirt

  useEffect(() => {
    // Load product mockup image
    const img = new Image()
    img.src = `/placeholder.svg?height=${dimensions.height}&width=${dimensions.width}`
    img.onload = () => setProductImage(img)
  }, [productType, dimensions])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw product mockup
    if (productImage) {
      ctx.drawImage(productImage, 0, 0, dimensions.width, dimensions.height)
    }

    // Draw print area outline
    ctx.strokeStyle = '#666'
    ctx.setLineDash([5, 5])
    ctx.strokeRect(
      dimensions.printArea.x,
      dimensions.printArea.y,
      dimensions.printArea.width,
      dimensions.printArea.height
    )
    ctx.setLineDash([])

    // Draw layers
    layers.forEach((layer) => {
      if (layer.visible === false) return

      ctx.save()
      ctx.translate(layer.x, layer.y)
      if (layer.rotation) {
        ctx.rotate((layer.rotation * Math.PI) / 180)
      }

      if (layer.type === 'text') {
        ctx.font = `${layer.fontSize}px ${layer.fontFamily}`
        ctx.fillStyle = layer.color || '#000000'
        ctx.fillText(layer.content || '', 0, 0)
      } else if (layer.type === 'image' && layer.url) {
        // Draw image placeholder
        ctx.fillStyle = '#e0e0e0'
        ctx.fillRect(0, 0, layer.width || 100, layer.height || 100)
        ctx.strokeStyle = '#999'
        ctx.strokeRect(0, 0, layer.width || 100, layer.height || 100)
      }

      ctx.restore()

      // Draw selection highlight
      if (layer.id === selectedLayer) {
        ctx.strokeStyle = '#3b82f6'
        ctx.lineWidth = 2
        ctx.strokeRect(layer.x - 5, layer.y - 5, 100, 100)
      }
    })
  }, [layers, selectedLayer, productImage, dimensions])

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    // Check if clicking on a layer
    const clickedLayer = [...layers].reverse().find((layer) => {
      if (layer.visible === false) return false
      return (
        x >= layer.x &&
        x <= layer.x + 100 &&
        y >= layer.y &&
        y <= layer.y + 100
      )
    })

    if (clickedLayer) {
      onLayerSelect(clickedLayer.id)
      setIsDragging(true)
      setDragStart({ x: x - clickedLayer.x, y: y - clickedLayer.y })
    } else {
      onLayerSelect(null)
    }
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !selectedLayer) return

    const rect = canvasRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const updatedLayers = layers.map((layer) =>
      layer.id === selectedLayer
        ? { ...layer, x: x - dragStart.x, y: y - dragStart.y }
        : layer
    )

    onLayerUpdate(updatedLayers)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  return (
    <Card className="flex items-center justify-center bg-white p-8 shadow-lg">
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={dimensions.width}
          height={dimensions.height}
          className="cursor-move border border-border"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      </div>
    </Card>
  )
}
