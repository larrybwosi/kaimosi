'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Separator } from '@/components/ui/separator'

interface Layer {
  id: string
  type: 'text' | 'image'
  x: number
  y: number
  rotation?: number
  // Text specific
  content?: string
  fontSize?: number
  fontFamily?: string
  color?: string
  // Image specific
  width?: number
  height?: number
}

interface PropertiesPanelProps {
  selectedLayer: Layer | undefined
  onLayerUpdate: (updates: Partial<Layer>) => void
}

export function PropertiesPanel({ selectedLayer, onLayerUpdate }: PropertiesPanelProps) {
  if (!selectedLayer) {
    return (
      <div className="flex h-full items-center justify-center p-4 text-center">
        <p className="text-sm text-muted-foreground">
          Select a layer to edit its properties
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6 p-4">
      <div>
        <h3 className="text-sm font-semibold mb-3">Properties</h3>
      </div>

      {/* Position */}
      <div className="space-y-3">
        <Label className="text-xs font-semibold text-muted-foreground">POSITION</Label>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="x" className="text-xs">X</Label>
            <Input
              id="x"
              type="number"
              value={Math.round(selectedLayer.x)}
              onChange={(e) => onLayerUpdate({ x: Number(e.target.value) })}
              className="h-8"
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="y" className="text-xs">Y</Label>
            <Input
              id="y"
              type="number"
              value={Math.round(selectedLayer.y)}
              onChange={(e) => onLayerUpdate({ y: Number(e.target.value) })}
              className="h-8"
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Text Properties */}
      {selectedLayer.type === 'text' && (
        <>
          <div className="space-y-3">
            <Label className="text-xs font-semibold text-muted-foreground">TEXT</Label>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="content" className="text-xs">Content</Label>
                <Input
                  id="content"
                  value={selectedLayer.content || ''}
                  onChange={(e) => onLayerUpdate({ content: e.target.value })}
                  className="h-8"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fontFamily" className="text-xs">Font</Label>
                <Select
                  value={selectedLayer.fontFamily}
                  onValueChange={(value) => onLayerUpdate({ fontFamily: value })}
                >
                  <SelectTrigger id="fontFamily" className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Arial">Arial</SelectItem>
                    <SelectItem value="Helvetica">Helvetica</SelectItem>
                    <SelectItem value="Times New Roman">Times New Roman</SelectItem>
                    <SelectItem value="Courier New">Courier New</SelectItem>
                    <SelectItem value="Georgia">Georgia</SelectItem>
                    <SelectItem value="Verdana">Verdana</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="fontSize" className="text-xs">Font Size</Label>
                <Input
                  id="fontSize"
                  type="number"
                  value={selectedLayer.fontSize || 24}
                  onChange={(e) => onLayerUpdate({ fontSize: Number(e.target.value) })}
                  min={8}
                  max={200}
                  className="h-8"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="color" className="text-xs">Color</Label>
                <div className="flex gap-2">
                  <Input
                    id="color"
                    type="color"
                    value={selectedLayer.color || '#000000'}
                    onChange={(e) => onLayerUpdate({ color: e.target.value })}
                    className="h-8 w-16 cursor-pointer"
                  />
                  <Input
                    type="text"
                    value={selectedLayer.color || '#000000'}
                    onChange={(e) => onLayerUpdate({ color: e.target.value })}
                    className="h-8 flex-1"
                  />
                </div>
              </div>
            </div>
          </div>

          <Separator />
        </>
      )}

      {/* Image Properties */}
      {selectedLayer.type === 'image' && (
        <>
          <div className="space-y-3">
            <Label className="text-xs font-semibold text-muted-foreground">SIZE</Label>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label htmlFor="width" className="text-xs">Width</Label>
                <Input
                  id="width"
                  type="number"
                  value={selectedLayer.width || 100}
                  onChange={(e) => onLayerUpdate({ width: Number(e.target.value) })}
                  min={10}
                  max={500}
                  className="h-8"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="height" className="text-xs">Height</Label>
                <Input
                  id="height"
                  type="number"
                  value={selectedLayer.height || 100}
                  onChange={(e) => onLayerUpdate({ height: Number(e.target.value) })}
                  min={10}
                  max={500}
                  className="h-8"
                />
              </div>
            </div>
          </div>

          <Separator />
        </>
      )}

      {/* Rotation */}
      <div className="space-y-3">
        <Label className="text-xs font-semibold text-muted-foreground">ROTATION</Label>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Slider
              value={[selectedLayer.rotation || 0]}
              onValueChange={([value]) => onLayerUpdate({ rotation: value })}
              min={-180}
              max={180}
              step={1}
              className="flex-1"
            />
            <span className="text-xs text-muted-foreground w-12 text-right">
              {selectedLayer.rotation || 0}°
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
