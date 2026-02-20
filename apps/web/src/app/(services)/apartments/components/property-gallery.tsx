'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, ZoomIn, X } from 'lucide-react'
import { PropertyImage } from '@/shared/types'

interface PropertyGalleryProps {
  images: PropertyImage[]
  title: string
  onImageSelect?: (image: PropertyImage) => void
}

export function PropertyGallery({ images, title, onImageSelect }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const current = images[currentIndex]

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index)
    onImageSelect?.(images[index])
  }

  if (!images.length) {
    return (
      <div className="w-full bg-gray-200 rounded-lg flex items-center justify-center h-96">
        <p className="text-gray-600">No images available</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Main Image Viewer */}
      <div className="relative w-full aspect-video bg-gray-900 rounded-lg overflow-hidden group">
        <Image
          src={current.url}
          alt={current.caption || title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
          priority
        />

        {/* Navigation Controls */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-all"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-all"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Image Counter and Fullscreen */}
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <span className="bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </span>
          <button
            onClick={() => setIsFullscreen(true)}
            className="bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-all"
            aria-label="Fullscreen"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
        </div>

        {/* Image Type Badge */}
        {current.imageType === 'floorplan' && (
          <div className="absolute bottom-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
            Floor Plan
          </div>
        )}
      </div>

      {/* Caption */}
      {current.caption && (
        <p className="text-gray-700 text-sm">{current.caption}</p>
      )}

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => handleThumbnailClick(index)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? 'border-primary ring-2 ring-primary/50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={image.thumbnailUrl || image.url}
                alt={image.caption || `Thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
              {image.imageType === 'floorplan' && (
                <div className="absolute inset-0 bg-blue-600/20 flex items-center justify-center">
                  <span className="text-xs text-white font-medium">Plan</span>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-lg transition-all z-10"
              aria-label="Close fullscreen"
            >
              <X className="w-8 h-8" />
            </button>

            <Image
              src={current.url}
              alt={current.caption || title}
              fill
              className="object-contain"
              sizes="100vw"
              priority
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevious}
                  className="absolute left-4 text-white p-3 hover:bg-white/10 rounded-full transition-all"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-4 text-white p-3 hover:bg-white/10 rounded-full transition-all"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
