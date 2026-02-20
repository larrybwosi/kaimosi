"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, MapPin, ShoppingBag, Calendar, Utensils, Sparkles } from "lucide-react"
import Image from "next/image"

interface ContentItem {
  id: string
  title: string
  description: string
  image?: string
}

interface ContentSelectorProps {
  selectedType: string
  onSelect: (type: "product" | "attraction" | "restaurant" | "event" | "custom", item: ContentItem) => void
}

export function ContentSelector({ selectedType, onSelect }: ContentSelectorProps) {
  const [search, setSearch] = useState("")
  const [attractions, setAttractions] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAttractions() {
      try {
        const response = await fetch("/api/attractions")
        if (response.ok) {
          const data = await response.json()
          setAttractions(
            data.slice(0, 6).map((a: any) => ({
              id: a.slug.current,
              title: a.name,
              description: a.shortDescription,
              image: a.image,
            })),
          )
        }
      } catch (error) {
        console.error("Failed to fetch attractions:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchAttractions()
  }, [])

  // Sample data - in production, this would come from your actual data sources
  const contentData = {
    attraction: attractions,
    product: [
      {
        id: "1",
        title: "Local Honey",
        description: "Pure organic honey from Maplewood farms",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "2",
        title: "Handmade Soap",
        description: "Natural artisan soap collection",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "3",
        title: "Maple Syrup",
        description: "Premium grade maple syrup",
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    restaurant: [
      {
        id: "1",
        title: "The Garden Bistro",
        description: "Farm-to-table dining experience",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "2",
        title: "Main Street Cafe",
        description: "Cozy cafe with fresh pastries",
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
    event: [
      {
        id: "1",
        title: "Summer Festival",
        description: "Annual summer celebration",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        id: "2",
        title: "Farmers Market",
        description: "Weekly market every Saturday",
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search content..."
          className="pl-9"
        />
      </div>

      <Tabs defaultValue="attraction" className="w-full">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="attraction" className="text-xs">
            <MapPin className="h-3 w-3 mr-1" />
            Places
          </TabsTrigger>
          <TabsTrigger value="product" className="text-xs">
            <ShoppingBag className="h-3 w-3 mr-1" />
            Products
          </TabsTrigger>
          <TabsTrigger value="restaurant" className="text-xs">
            <Utensils className="h-3 w-3 mr-1" />
            Food
          </TabsTrigger>
          <TabsTrigger value="event" className="text-xs">
            <Calendar className="h-3 w-3 mr-1" />
            Events
          </TabsTrigger>
          <TabsTrigger value="custom" className="text-xs">
            <Sparkles className="h-3 w-3 mr-1" />
            Custom
          </TabsTrigger>
        </TabsList>

        {Object.entries(contentData).map(([type, items]) => (
          <TabsContent key={type} value={type} className="space-y-2 max-h-[400px] overflow-y-auto">
            {loading && type === "attraction" ? (
              <div className="text-center py-8 text-muted-foreground">Loading...</div>
            ) : (
              items
                .filter(
                  (item) =>
                    search === "" ||
                    item.title.toLowerCase().includes(search.toLowerCase()) ||
                    item.description.toLowerCase().includes(search.toLowerCase()),
                )
                .map((item) => (
                  <Card
                    key={item.id}
                    className="p-3 cursor-pointer hover:border-primary transition-colors"
                    onClick={() => onSelect(type as any, item)}
                  >
                    <div className="flex gap-3">
                      {item.image && (
                        <div className="relative w-16 h-16 rounded-md overflow-hidden shrink-0">
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm mb-1 truncate">{item.title}</h4>
                        <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
                      </div>
                    </div>
                  </Card>
                ))
            )}
          </TabsContent>
        ))}

        <TabsContent value="custom">
          <div className="text-center py-8 text-muted-foreground">
            <Sparkles className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">Create a custom card from scratch</p>
            <p className="text-xs mt-1">Use the form above to customize your content</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
