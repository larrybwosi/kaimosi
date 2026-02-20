"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react"

interface AttractionGalleryProps {
  images: string[]
  name: string
}

export function AttractionGallery({ images, name }: AttractionGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const openLightbox = (index: number) => setSelectedIndex(index)
  const closeLightbox = () => setSelectedIndex(null)

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1)
    }
  }

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1)
    }
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        {images.map((img, index) => (
          <div
            key={index}
            className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-xl"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={img || "/placeholder.svg"}
              alt={`${name} photo ${index + 1}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-foreground/0 transition-colors group-hover:bg-foreground/20">
              <ZoomIn className="h-8 w-8 text-card opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={selectedIndex !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-5xl border-0 bg-transparent p-0 shadow-none">
          <DialogTitle className="sr-only">Image Gallery</DialogTitle>
          <div className="relative">
            {/* Close Button */}
            <Button
              size="icon"
              variant="ghost"
              className="absolute -top-12 right-0 text-card hover:bg-card/20 hover:text-card"
              onClick={closeLightbox}
            >
              <X className="h-6 w-6" />
            </Button>

            {/* Image */}
            {selectedIndex !== null && (
              <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                <Image
                  src={images[selectedIndex] || "/placeholder.svg"}
                  alt={`${name} photo ${selectedIndex + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            )}

            {/* Navigation */}
            <Button
              size="icon"
              variant="ghost"
              className="absolute left-4 top-1/2 -translate-y-1/2 text-card hover:bg-card/20 hover:text-card"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-8 w-8" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-card hover:bg-card/20 hover:text-card"
              onClick={goToNext}
            >
              <ChevronRight className="h-8 w-8" />
            </Button>

            {/* Counter */}
            {selectedIndex !== null && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-foreground/50 px-4 py-2 text-sm text-card">
                {selectedIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
