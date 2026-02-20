"use client"

import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export function AttractionsSearch() {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
      <Input type="search" placeholder="Search attractions..." className="h-12 pl-10 bg-card border-border" />
    </div>
  )
}
