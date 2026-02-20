"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Tag } from "lucide-react"

export function DiscountBanner({ discounts }: { discounts: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (discounts.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % discounts.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [discounts.length])

  const discount = discounts[currentIndex]

  return (
    <div className="flex items-center justify-center gap-3 text-center">
      <Tag className="h-5 w-5" />
      <div>
        <span className="font-semibold">{discount.name}</span>
        {discount.description && <span className="ml-2 opacity-90">{discount.description}</span>}
      </div>
      <Badge variant="secondary" className="bg-white/20">
        {discount.discountType === "percentage" ? `${discount.value}% OFF` : `$${discount.value} OFF`}
      </Badge>
    </div>
  )
}
