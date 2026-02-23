"use client"

import * as React from "react"
import maplibregl from "maplibre-gl"
import "maplibre-gl/dist/maplibre-gl.css"
import { cn } from "@workspace/ui/lib/utils"

// Theme-aware map styles
const MAP_STYLES = {
  light: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
  dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
}

interface MapContextValue {
  map: maplibregl.Map | null
}

const MapContext = React.createContext<MapContextValue>({ map: null })

export function useMap() {
  return React.useContext(MapContext)
}

interface MapProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onLoad'> {
  center?: [number, number]
  zoom?: number
  minZoom?: number
  maxZoom?: number
  interactive?: boolean
  onLoad?: (map: maplibregl.Map) => void
}

export function Map({
  center = [-74.006, 40.7128],
  zoom = 12,
  minZoom = 1,
  maxZoom = 20,
  interactive = true,
  onLoad,
  className,
  children,
  ...props
}: MapProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const mapRef = React.useRef<maplibregl.Map | null>(null)
  const [isLoaded, setIsLoaded] = React.useState(false)

  React.useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const isDark = document.documentElement.classList.contains("dark")
    const style = isDark ? MAP_STYLES.dark : MAP_STYLES.light

    const map = new maplibregl.Map({
      container: containerRef.current,
      style,
      center,
      zoom,
      minZoom,
      maxZoom,
      interactive,
      attributionControl: false,
    })

    map.on("load", () => {
      setIsLoaded(true)
      onLoad?.(map)
    })

    mapRef.current = map

    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          const isDark = document.documentElement.classList.contains("dark")
          map.setStyle(isDark ? MAP_STYLES.dark : MAP_STYLES.light)
        }
      })
    })

    observer.observe(document.documentElement, { attributes: true })

    return () => {
      observer.disconnect()
      map.remove()
      mapRef.current = null
    }
  }, [center, zoom, minZoom, maxZoom, interactive, onLoad])

  return (
    <MapContext.Provider value={{ map: mapRef.current }}>
      <div ref={containerRef} className={cn("h-full w-full", className)} {...props}>
        {isLoaded && children}
      </div>
    </MapContext.Provider>
  )
}

interface MapControlsProps {
  showZoom?: boolean
  showCompass?: boolean
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"
}

export function MapControls({ showZoom = true, showCompass = true, position = "top-right" }: MapControlsProps) {
  const { map } = useMap()

  React.useEffect(() => {
    if (!map) return

    if (showZoom) {
      map.addControl(new maplibregl.NavigationControl({ showCompass }), position)
    }
  }, [map, showZoom, showCompass, position])

  return null
}

interface MapMarkerProps {
  longitude: number
  latitude: number
  color?: string
  children?: React.ReactNode
  popup?: React.ReactNode
  tooltip?: string
  onClick?: () => void
}

export function MapMarker({
  longitude,
  latitude,
  color = "hsl(var(--primary))",
  children,
  popup,
  tooltip,
  onClick,
}: MapMarkerProps) {
  const { map } = useMap()
  const markerRef = React.useRef<maplibregl.Marker | null>(null)

  React.useEffect(() => {
    if (!map) return

    // Create marker element
    const el = document.createElement("div")
    el.className = "map-marker"

    if (children) {
      // Custom marker content - render React to DOM
      const container = document.createElement("div")
      el.appendChild(container)
    } else {
      // Default pin marker
      el.innerHTML = `
        <svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 0C7.163 0 0 7.163 0 16c0 12 16 24 16 24s16-12 16-24c0-8.837-7.163-16-16-16z" fill="${color}"/>
          <circle cx="16" cy="16" r="8" fill="white"/>
        </svg>
      `
    }

    if (onClick) {
      el.style.cursor = "pointer"
      el.addEventListener("click", onClick)
    }

    if (isNaN(longitude) || isNaN(latitude)) {
      console.warn(`Invalid coordinates for marker: ${longitude}, ${latitude}`);
      return;
    }

    const marker = new maplibregl.Marker({ element: el })?.setLngLat([longitude, latitude]).addTo(map)

    if (popup) {
      const popupEl = new maplibregl.Popup({ offset: 25, closeButton: true })
      const popupContent = document.createElement("div")
      popupContent.className = "map-popup-content"
      popupContent.innerHTML = typeof popup === "string" ? popup : ""
      popupEl.setDOMContent(popupContent)
      marker.setPopup(popupEl)
    }

    markerRef.current = marker

    return () => {
      marker.remove()
    }
  }, [map, longitude, latitude, color, children, popup, tooltip, onClick])

  return null
}

export function MapPopup({
  longitude,
  latitude,
  children,
  onClose,
}: {
  longitude: number
  latitude: number
  children: React.ReactNode
  onClose?: () => void
}) {
  const { map } = useMap()
  const popupRef = React.useRef<maplibregl.Popup | null>(null)

  React.useEffect(() => {
    if (!map) return

    if (isNaN(longitude) || isNaN(latitude)) {
      console.warn(`Invalid coordinates for popup: ${longitude}, ${latitude}`);
      return;
    }

    const popup = new maplibregl.Popup({ closeButton: true, closeOnClick: false })
      .setLngLat([longitude, latitude])
      .setHTML(`<div class="map-popup">${children}</div>`)
      .addTo(map)

    popup.on("close", () => {
      onClose?.()
    })

    popupRef.current = popup

    return () => {
      popup.remove()
    }
  }, [map, longitude, latitude, children, onClose])

  return null
}
