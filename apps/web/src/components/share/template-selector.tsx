"use client"

import { Card } from "@/components/ui/card"
import { shareCardTemplates } from "@/lib/share-card"
import { MapPin, ShoppingBag, Calendar, Utensils, Sparkles, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface TemplateSelectorProps {
  onSelect: (template: (typeof shareCardTemplates)[0]) => void
  selectedType: string
}

const iconMap = {
  ShoppingBag,
  MapPin,
  Utensils,
  Calendar,
  Sparkles,
}

export function TemplateSelector({ onSelect, selectedType }: TemplateSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {shareCardTemplates.map((template) => {
        const Icon = iconMap[template.icon as keyof typeof iconMap]
        const isSelected = template.type === selectedType

        return (
          <Card
            key={template.id}
            className={cn(
              "relative p-4 cursor-pointer transition-all hover:shadow-lg",
              isSelected && "ring-2 ring-primary",
            )}
            onClick={() => onSelect(template)}
          >
            {isSelected && (
              <div className="absolute -top-2 -right-2 bg-primary text-primary-foreground rounded-full p-1">
                <Check className="h-3 w-3" />
              </div>
            )}

            <div
              className="w-full h-32 rounded-lg mb-3 flex items-center justify-center"
              style={{ backgroundColor: template.backgroundColor }}
            >
              <Icon className="h-12 w-12" style={{ color: template.textColor }} />
            </div>

            <div>
              <h4 className="font-medium text-sm mb-1">{template.name}</h4>
              <div className="flex gap-1">
                <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: template.backgroundColor }} />
                <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: template.textColor }} />
                <div className="w-4 h-4 rounded-full border" style={{ backgroundColor: template.accentColor }} />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
