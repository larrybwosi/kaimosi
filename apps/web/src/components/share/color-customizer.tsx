"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface ColorCustomizerProps {
  backgroundColor: string
  textColor: string
  accentColor: string
  onChange: (colors: {
    backgroundColor?: string
    textColor?: string
    accentColor?: string
  }) => void
}

export function ColorCustomizer({ backgroundColor, textColor, accentColor, onChange }: ColorCustomizerProps) {
  const presets = [
    { name: "Forest", bg: "#2d5f3f", text: "#ffffff", accent: "#f9f6f1" },
    { name: "Ocean", bg: "#0077b6", text: "#ffffff", accent: "#90e0ef" },
    { name: "Sunset", bg: "#ff6b6b", text: "#ffffff", accent: "#ffe66d" },
    { name: "Elegant", bg: "#1a1a1a", text: "#f9f6f1", accent: "#d4af37" },
    { name: "Fresh", bg: "#ffffff", text: "#1a1a1a", accent: "#2d5f3f" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="bg-color" className="text-sm mb-2 block">
            Background
          </Label>
          <div className="space-y-2">
            <div className="relative">
              <Input
                id="bg-color"
                type="color"
                value={backgroundColor}
                onChange={(e) => onChange({ backgroundColor: e.target.value })}
                className="h-12 cursor-pointer"
              />
            </div>
            <Input
              type="text"
              value={backgroundColor}
              onChange={(e) => onChange({ backgroundColor: e.target.value })}
              className="font-mono text-xs"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="text-color" className="text-sm mb-2 block">
            Text
          </Label>
          <div className="space-y-2">
            <div className="relative">
              <Input
                id="text-color"
                type="color"
                value={textColor}
                onChange={(e) => onChange({ textColor: e.target.value })}
                className="h-12 cursor-pointer"
              />
            </div>
            <Input
              type="text"
              value={textColor}
              onChange={(e) => onChange({ textColor: e.target.value })}
              className="font-mono text-xs"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="accent-color" className="text-sm mb-2 block">
            Accent
          </Label>
          <div className="space-y-2">
            <div className="relative">
              <Input
                id="accent-color"
                type="color"
                value={accentColor}
                onChange={(e) => onChange({ accentColor: e.target.value })}
                className="h-12 cursor-pointer"
              />
            </div>
            <Input
              type="text"
              value={accentColor}
              onChange={(e) => onChange({ accentColor: e.target.value })}
              className="font-mono text-xs"
            />
          </div>
        </div>
      </div>

      <div>
        <Label className="text-sm mb-3 block">Color Presets</Label>
        <div className="flex gap-2 flex-wrap">
          {presets.map((preset) => (
            <button
              key={preset.name}
              onClick={() =>
                onChange({
                  backgroundColor: preset.bg,
                  textColor: preset.text,
                  accentColor: preset.accent,
                })
              }
              className="group relative"
              title={preset.name}
            >
              <div className="flex gap-0.5 rounded-lg overflow-hidden border-2 hover:border-primary transition-colors">
                <div className="w-8 h-8" style={{ backgroundColor: preset.bg }} />
                <div className="w-8 h-8" style={{ backgroundColor: preset.text }} />
                <div className="w-8 h-8" style={{ backgroundColor: preset.accent }} />
              </div>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                {preset.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
