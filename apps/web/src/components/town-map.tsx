"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@kaimosi/ui"
import { Badge } from "@kaimosi/ui"
import { Button } from "@kaimosi/ui"
import { Tabs, TabsList, TabsTrigger } from "@kaimosi/ui"
import { Map, MapControls, MapMarker } from "@kaimosi/ui"
import { stores, restaurants, hostels, townInfo } from "@/lib/data"
import { MapPin, Store, Utensils, Bed, Landmark, X } from "lucide-react"

type MarkerType = "all" | "attractions" | "stores" | "restaurants" | "hostels"

interface SelectedPlace {
  id: string
  name: string
  type: MarkerType
  description: string
  address: string
}

export function TownMap() {
  const [activeFilter, setActiveFilter] = useState<MarkerType>("all")
  const [selectedPlace, setSelectedPlace] = useState<SelectedPlace | null>(null)
  const [attractions, setAttractions] = useState<any[]>([])

  useEffect(() => {
    async function fetchAttractions() {
      try {
        const response = await fetch("/api/attractions")
        if (response.ok) {
          const data = await response.json()
          setAttractions(data)
        }
      } catch (error) {
        console.error("Failed to fetch attractions:", error)
      }
    }
    fetchAttractions()
  }, [])

  const getMarkerColor = (type: MarkerType) => {
    switch (type) {
      case "attractions":
        return "hsl(142, 76%, 36%)"
      case "stores":
        return "hsl(221, 83%, 53%)"
      case "restaurants":
        return "hsl(25, 95%, 53%)"
      case "hostels":
        return "hsl(262, 83%, 58%)"
      default:
        return "hsl(var(--primary))"
    }
  }

  const getFilteredMarkers = () => {
    const markers: Array<{
      id: string
      name: string
      type: MarkerType
      coordinates: { lat: number; lng: number }
      description: string
      address: string
    }> = []

    if (activeFilter === "all" || activeFilter === "attractions") {
      attractions.forEach((a) =>
        markers.push({
          id: a.slug.current,
          name: a.name,
          type: "attractions",
          coordinates: a.coordinates,
          description: a.shortDescription,
          address: a.address,
        }),
      )
    }

    if (activeFilter === "all" || activeFilter === "stores") {
      stores.forEach((s) =>
        markers.push({
          id: s.id,
          name: s.name,
          type: "stores",
          coordinates: s.coordinates,
          description: s.description,
          address: s.address,
        }),
      )
    }

    if (activeFilter === "all" || activeFilter === "restaurants") {
      restaurants.forEach((r) =>
        markers.push({
          id: r.id,
          name: r.name,
          type: "restaurants",
          coordinates: r.coordinates,
          description: r.description,
          address: r.address,
        }),
      )
    }

    if (activeFilter === "all" || activeFilter === "hostels") {
      hostels.forEach((h) =>
        markers.push({
          id: h.id,
          name: h.name,
          type: "hostels",
          coordinates: h.coordinates,
          description: h.description,
          address: h.address,
        }),
      )
    }

    return markers
  }

  const markers = getFilteredMarkers()

  const getLinkHref = (type: MarkerType, id: string) => {
    switch (type) {
      case "attractions":
        return `/attractions/${id}`
      case "stores":
        return `/directory/stores/${id}`
      case "restaurants":
        return `/directory/restaurants/${id}`
      case "hostels":
        return `/directory/hostels/${id}`
      default:
        return "#"
    }
  }

  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-4">
            Interactive Map
          </Badge>
          <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">Explore Maplewood</h2>
          <p className="mt-4 mx-auto max-w-2xl text-muted-foreground">
            Discover attractions, restaurants, shops, and accommodations across our beautiful town. Click on any marker
            to learn more.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-6">
          <Tabs value={activeFilter} onValueChange={(v) => setActiveFilter(v as MarkerType)}>
            <TabsList className="grid grid-cols-5 w-full max-w-2xl">
              <TabsTrigger value="all" className="gap-2">
                <MapPin className="h-4 w-4" />
                <span className="hidden sm:inline">All</span>
              </TabsTrigger>
              <TabsTrigger value="attractions" className="gap-2">
                <Landmark className="h-4 w-4" />
                <span className="hidden sm:inline">Attractions</span>
              </TabsTrigger>
              <TabsTrigger value="stores" className="gap-2">
                <Store className="h-4 w-4" />
                <span className="hidden sm:inline">Stores</span>
              </TabsTrigger>
              <TabsTrigger value="restaurants" className="gap-2">
                <Utensils className="h-4 w-4" />
                <span className="hidden sm:inline">Dining</span>
              </TabsTrigger>
              <TabsTrigger value="hostels" className="gap-2">
                <Bed className="h-4 w-4" />
                <span className="hidden sm:inline">Stay</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Map */}
        <Card className="overflow-hidden border-0 shadow-xl">
          <CardContent className="p-0 relative">
            <div className="h-[500px] lg:h-[600px]">
              <Map center={[townInfo.coordinates.lng, townInfo.coordinates.lat]} zoom={13}>
                <MapControls />
                {markers.map((marker) => {
                  if (!marker.coordinates?.lng || !marker.coordinates?.lat) return null;
                  
                  return (
                    <MapMarker
                      key={`${marker.type}-${marker.id}`}
                      longitude={marker.coordinates.lng}
                      latitude={marker.coordinates.lat}
                      color={getMarkerColor(marker.type)}
                      onClick={() =>
                        setSelectedPlace({
                          id: marker.id,
                          name: marker.name,
                          type: marker.type,
                          description: marker.description,
                          address: marker.address,
                        })
                      }
                    />
                  );
                })}
              </Map>
            </div>

            {/* Selected Place Info Panel */}
            {selectedPlace && (
              <div className="absolute bottom-4 left-4 right-4 sm:left-4 sm:right-auto sm:w-80">
                <Card className="shadow-lg">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <Badge
                          variant="secondary"
                          className="mb-2"
                          style={{
                            backgroundColor: `${getMarkerColor(selectedPlace.type)}20`,
                            color: getMarkerColor(selectedPlace.type),
                          }}
                        >
                          {selectedPlace.type.charAt(0).toUpperCase() + selectedPlace.type.slice(1)}
                        </Badge>
                        <CardTitle className="text-lg">{selectedPlace.name}</CardTitle>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 shrink-0"
                        onClick={() => setSelectedPlace(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{selectedPlace.description}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mb-4">
                      <MapPin className="h-3 w-3" />
                      {selectedPlace.address}
                    </p>
                    <Button asChild size="sm" className="w-full">
                      <Link href={getLinkHref(selectedPlace.type, selectedPlace.id)}>View Details</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: getMarkerColor("attractions") }} />
            <span className="text-muted-foreground">Attractions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: getMarkerColor("stores") }} />
            <span className="text-muted-foreground">Stores</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: getMarkerColor("restaurants") }} />
            <span className="text-muted-foreground">Restaurants</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: getMarkerColor("hostels") }} />
            <span className="text-muted-foreground">Accommodations</span>
          </div>
        </div>
      </div>
    </section>
  )
}
