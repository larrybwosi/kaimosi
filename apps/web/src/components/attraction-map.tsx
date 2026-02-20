"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ExternalLink, MapPin, Navigation } from "lucide-react"

interface AttractionMapProps {
  coordinates: { lat: number; lng: number }
  name: string
  address: string
}

export function AttractionMap({ coordinates, name, address }: AttractionMapProps) {
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${coordinates.lng - 0.01}%2C${coordinates.lat - 0.01}%2C${coordinates.lng + 0.01}%2C${coordinates.lat + 0.01}&layer=mapnik&marker=${coordinates.lat}%2C${coordinates.lng}`

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`

  const openMapUrl = `https://www.openstreetmap.org/?mlat=${coordinates.lat}&mlon=${coordinates.lng}#map=15/${coordinates.lat}/${coordinates.lng}`

  return (
    <div className="space-y-4">
      {/* Map Embed */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border">
        <iframe
          src={mapUrl}
          className="h-full w-full"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Map showing location of ${name}`}
        />
      </div>

      {/* Location Info Card */}
      <Card className="border-0 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{name}</h3>
              <p className="text-sm text-muted-foreground">{address}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Coordinates: {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row">
            <Button asChild className="flex-1 gap-2">
              <a href={directionsUrl} target="_blank" rel="noopener noreferrer">
                <Navigation className="h-4 w-4" />
                Get Directions
              </a>
            </Button>
            <Button asChild variant="outline" className="flex-1 gap-2 bg-transparent">
              <a href={openMapUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
                Open in Maps
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
