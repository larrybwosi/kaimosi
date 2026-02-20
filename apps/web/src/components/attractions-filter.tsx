"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface AttractionsFilterProps {
  categories: string[]
}

export function AttractionsFilter({ categories }: AttractionsFilterProps) {
  const [active, setActive] = useState("All")

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Button
          key={category}
          variant={active === category ? "default" : "outline"}
          size="sm"
          onClick={() => setActive(category)}
          className={active === category ? "" : "bg-transparent"}
        >
          {category}
        </Button>
      ))}
    </div>
  )
}
