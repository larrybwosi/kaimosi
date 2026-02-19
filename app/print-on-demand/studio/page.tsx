'use client'

import { useState } from 'react'
import { DesignCanvas } from '@/components/print-on-demand/design-canvas'
import { ToolsPanel } from '@/components/print-on-demand/tools-panel'
import { LayersPanel } from '@/components/print-on-demand/layers-panel'
import { ProductPreview } from '@/components/print-on-demand/product-preview'
import { DesignHeader } from '@/components/print-on-demand/design-header'
import { PropertiesPanel } from '@/components/print-on-demand/properties-panel'

export default function DesignStudioPage() {
  const [selectedProduct, setSelectedProduct] = useState('tshirt')
  const [layers, setLayers] = useState<any[]>([])
  const [selectedLayer, setSelectedLayer] = useState<string | null>(null)
  const [canvasState, setCanvasState] = useState<any>({
    zoom: 1,
    pan: { x: 0, y: 0 },
  })

  return (
    <div className="flex h-screen flex-col bg-background">
      <DesignHeader
        selectedProduct={selectedProduct}
        onProductChange={setSelectedProduct}
        canvasState={canvasState}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Tools */}
        <aside className="w-20 border-r border-border bg-muted/30">
          <ToolsPanel
            onAddText={() => {
              const newLayer = {
                id: `text-${Date.now()}`,
                type: 'text',
                content: 'Add Text',
                x: 100,
                y: 100,
                fontSize: 24,
                fontFamily: 'Arial',
                color: '#000000',
                rotation: 0,
              }
              setLayers([...layers, newLayer])
              setSelectedLayer(newLayer.id)
            }}
            onAddImage={(imageUrl) => {
              const newLayer = {
                id: `image-${Date.now()}`,
                type: 'image',
                url: imageUrl,
                x: 100,
                y: 100,
                width: 200,
                height: 200,
                rotation: 0,
              }
              setLayers([...layers, newLayer])
              setSelectedLayer(newLayer.id)
            }}
          />
        </aside>

        {/* Main Canvas Area */}
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 items-center justify-center bg-muted/10 p-8">
            <DesignCanvas
              productType={selectedProduct}
              layers={layers}
              selectedLayer={selectedLayer}
              onLayerUpdate={(updatedLayers) => setLayers(updatedLayers)}
              onLayerSelect={setSelectedLayer}
              canvasState={canvasState}
              onCanvasStateChange={setCanvasState}
            />
          </div>
        </div>

        {/* Right Sidebar - Properties & Layers */}
        <aside className="flex w-80 flex-col border-l border-border bg-background">
          <div className="flex-1 overflow-y-auto">
            <PropertiesPanel
              selectedLayer={layers.find(l => l.id === selectedLayer)}
              onLayerUpdate={(updates) => {
                setLayers(layers.map(l =>
                  l.id === selectedLayer ? { ...l, ...updates } : l
                ))
              }}
            />
          </div>
          
          <div className="h-80 border-t border-border">
            <LayersPanel
              layers={layers}
              selectedLayer={selectedLayer}
              onLayerSelect={setSelectedLayer}
              onLayerDelete={(id) => {
                setLayers(layers.filter(l => l.id !== id))
                if (selectedLayer === id) setSelectedLayer(null)
              }}
              onLayerReorder={setLayers}
              onLayerToggleVisibility={(id) => {
                setLayers(layers.map(l =>
                  l.id === id ? { ...l, visible: !l.visible } : l
                ))
              }}
              onLayerDuplicate={(id) => {
                const layer = layers.find(l => l.id === id)
                if (layer) {
                  const newLayer = {
                    ...layer,
                    id: `${layer.type}-${Date.now()}`,
                    x: layer.x + 20,
                    y: layer.y + 20,
                  }
                  setLayers([...layers, newLayer])
                }
              }}
            />
          </div>
        </aside>
      </div>
    </div>
  )
}
