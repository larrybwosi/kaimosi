'use client'

import { Eye, EyeOff, Copy, Trash2, GripVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

interface Layer {
  id: string
  type: 'text' | 'image'
  content?: string
  visible?: boolean
}

interface LayersPanelProps {
  layers: Layer[]
  selectedLayer: string | null
  onLayerSelect: (id: string) => void
  onLayerDelete: (id: string) => void
  onLayerReorder: (layers: Layer[]) => void
  onLayerToggleVisibility: (id: string) => void
  onLayerDuplicate: (id: string) => void
}

export function LayersPanel({
  layers,
  selectedLayer,
  onLayerSelect,
  onLayerDelete,
  onLayerReorder,
  onLayerToggleVisibility,
  onLayerDuplicate,
}: LayersPanelProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-border p-3">
        <h3 className="text-sm font-semibold">Layers</h3>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {layers.length === 0 ? (
            <div className="flex h-32 items-center justify-center text-center">
              <p className="text-sm text-muted-foreground">
                No layers yet.
                <br />
                Add text or images to get started.
              </p>
            </div>
          ) : (
            [...layers].reverse().map((layer, index) => {
              const isSelected = layer.id === selectedLayer
              const visible = layer.visible !== false

              return (
                <div
                  key={layer.id}
                  className={cn(
                    'flex items-center gap-2 rounded-md p-2 hover:bg-accent cursor-pointer',
                    isSelected && 'bg-accent'
                  )}
                  onClick={() => onLayerSelect(layer.id)}
                >
                  <GripVertical className="h-4 w-4 text-muted-foreground" />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium">
                        {layer.type === 'text' ? 'Text' : 'Image'}
                      </span>
                      {layer.type === 'text' && layer.content && (
                        <span className="text-xs text-muted-foreground truncate">
                          {layer.content}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation()
                        onLayerToggleVisibility(layer.id)
                      }}
                    >
                      {visible ? (
                        <Eye className="h-3.5 w-3.5" />
                      ) : (
                        <EyeOff className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6"
                      onClick={(e) => {
                        e.stopPropagation()
                        onLayerDuplicate(layer.id)
                      }}
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 text-destructive hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation()
                        onLayerDelete(layer.id)
                      }}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              )
            })
          )}
        </div>
      </ScrollArea>
    </div>
  )
}
