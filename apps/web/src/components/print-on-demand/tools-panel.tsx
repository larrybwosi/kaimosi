'use client'

import { Type, Image, Upload, Square, Circle, Minus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useRef } from 'react'

interface ToolsPanelProps {
  onAddText: () => void
  onAddImage: (url: string) => void
}

export function ToolsPanel({ onAddText, onAddImage }: ToolsPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      onAddImage(url)
    }
  }

  const tools = [
    {
      icon: Type,
      label: 'Add Text',
      onClick: onAddText,
    },
    {
      icon: Upload,
      label: 'Upload Image',
      onClick: () => fileInputRef.current?.click(),
    },
    {
      icon: Image,
      label: 'Stock Images',
      onClick: () => {},
    },
    {
      icon: Square,
      label: 'Add Shape',
      onClick: () => {},
    },
    {
      icon: Circle,
      label: 'Add Circle',
      onClick: () => {},
    },
    {
      icon: Minus,
      label: 'Add Line',
      onClick: () => {},
    },
  ]

  return (
    <TooltipProvider>
      <div className="flex flex-col items-center gap-2 p-2">
        {tools.map((tool, index) => {
          const Icon = tool.icon
          return (
            <Tooltip key={index}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-12 w-12"
                  onClick={tool.onClick}
                >
                  <Icon className="h-5 w-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{tool.label}</p>
              </TooltipContent>
            </Tooltip>
          )
        })}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileUpload}
        />
      </div>
    </TooltipProvider>
  )
}
