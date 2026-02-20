"use client"

import { Card } from "@/components/ui/card"
import Image from "next/image"
import type { ShareCard } from "@/lib/share-card"
import { MapPin, ShoppingBag, Calendar, Utensils, Sparkles } from "lucide-react"

interface ShareCardPreviewProps {
  card: ShareCard
}

const iconMap = {
  product: ShoppingBag,
  attraction: MapPin,
  restaurant: Utensils,
  event: Calendar,
  custom: Sparkles,
}

export function ShareCardPreview({ card }: ShareCardPreviewProps) {
  const Icon = iconMap[card.type]

  return (
    <div className="space-y-4">
      {/* Mobile Preview Frame */}
      <div className="mx-auto max-w-[320px] border-4 border-gray-800 rounded-[2.5rem] p-3 bg-gray-800 shadow-2xl">
        <div className="bg-white rounded-[1.5rem] overflow-hidden">
          {/* WhatsApp Header Simulation */}
          <div className="bg-[#075E54] text-white p-3 flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full" />
            <div className="flex-1">
              <div className="text-sm font-medium">Maplewood</div>
              <div className="text-xs opacity-80">online</div>
            </div>
          </div>

          {/* Message Bubble */}
          <div className="p-4 bg-[#ECE5DD] min-h-[400px]">
            <div className="bg-white rounded-lg shadow-sm max-w-[260px] overflow-hidden">
              {/* Card Content */}
              <div
                className="p-4 space-y-3"
                style={{
                  backgroundColor: card.backgroundColor,
                  color: card.textColor,
                }}
              >
                {card.image && (
                  <div className="relative w-full h-32 -mx-4 -mt-4 mb-3">
                    <Image src={card.image || "/placeholder.svg"} alt={card.title} fill className="object-cover" />
                  </div>
                )}

                <div className="flex items-start gap-2">
                  <div className="p-2 rounded-lg shrink-0" style={{ backgroundColor: card.accentColor + "20" }}>
                    <Icon className="h-5 w-5" style={{ color: card.accentColor }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-base leading-tight mb-1 line-clamp-2">{card.title}</h4>
                    <p className="text-sm opacity-90 line-clamp-3">{card.description}</p>
                  </div>
                </div>

                <div
                  className="text-xs font-medium pt-2 border-t flex items-center gap-1"
                  style={{
                    borderColor: card.accentColor + "30",
                    color: card.accentColor,
                  }}
                >
                  <span>Tap to explore →</span>
                </div>
              </div>

              {/* Link Preview */}
              <div className="px-3 py-2 bg-gray-50 border-t text-xs text-gray-600">
                <div className="font-medium truncate">{card.deepLink}</div>
              </div>
            </div>

            {/* Timestamp */}
            <div className="text-xs text-gray-500 mt-1 text-right">12:30 PM</div>
          </div>
        </div>
      </div>

      {/* Desktop Preview */}
      <div className="hidden lg:block">
        <div className="text-sm font-medium mb-2 text-muted-foreground">Desktop Preview</div>
        <Card
          className="p-6 space-y-4"
          style={{
            backgroundColor: card.backgroundColor,
            color: card.textColor,
          }}
        >
          {card.image && (
            <div className="relative w-full h-48 rounded-lg overflow-hidden">
              <Image src={card.image || "/placeholder.svg"} alt={card.title} fill className="object-cover" />
            </div>
          )}

          <div className="flex items-start gap-3">
            <div className="p-3 rounded-xl" style={{ backgroundColor: card.accentColor + "20" }}>
              <Icon className="h-6 w-6" style={{ color: card.accentColor }} />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-xl mb-2">{card.title}</h4>
              <p className="opacity-90">{card.description}</p>
            </div>
          </div>

          <div
            className="pt-4 border-t flex items-center gap-2 font-medium"
            style={{ borderColor: card.accentColor + "30", color: card.accentColor }}
          >
            <span>Learn more →</span>
          </div>
        </Card>
      </div>
    </div>
  )
}
