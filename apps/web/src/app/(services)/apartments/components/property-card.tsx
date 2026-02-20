'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, MapPin, Bed, Bath, Ruler } from 'lucide-react'
import type { Property } from '@kaimosi/types'

interface PropertyCardProps {
  property: Property
  onFavoriteToggle?: (propertyId: string, isFavorited: boolean) => Promise<void>
  isFavorited?: boolean
}

export function PropertyCard({ property, onFavoriteToggle, isFavorited = false }: PropertyCardProps) {
  const [isLoadingFavorite, setIsLoadingFavorite] = useState(false)
  const [favorited, setFavorited] = useState(isFavorited)

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!onFavoriteToggle) return

    try {
      setIsLoadingFavorite(true)
      await onFavoriteToggle(property.id, !favorited)
      setFavorited(!favorited)
    } catch (error) {
      console.error('Failed to toggle favorite:', error)
    } finally {
      setIsLoadingFavorite(false)
    }
  }

  const image = property.images?.[0]
  const imageUrl = image?.thumbnailUrl || image?.url || property.featuredImageUrl || '/placeholder.svg?height=300&width=400'

  const formattedPrice = new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: property.priceUnit || 'KES',
    maximumFractionDigits: 0,
  }).format(property.price)

  return (
    <Link href={`/apartments/${property.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden cursor-pointer h-full flex flex-col">
        {/* Image Container */}
        <div className="relative h-48 bg-gray-200 overflow-hidden group">
          <Image
            src={imageUrl}
            alt={property.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Favorite Button */}
          <button
            onClick={handleFavoriteClick}
            disabled={isLoadingFavorite}
            className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all z-10"
            aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              className={`w-5 h-5 transition-colors ${
                favorited ? 'fill-red-500 text-red-500' : 'text-gray-400'
              }`}
            />
          </button>

          {/* Status Badge */}
          {property.status !== 'AVAILABLE' && (
            <div className="absolute bottom-2 left-2 bg-red-600 text-white px-3 py-1 rounded text-xs font-medium">
              {property.status === 'RENTED' ? 'Rented' : property.status}
            </div>
          )}

          {/* Type Badge */}
          <div className="absolute top-3 left-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
            {property.type.charAt(0) + property.type.slice(1).toLowerCase()}
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex-1 flex flex-col">
          {/* Title */}
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 mb-2">
            {property.title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1 text-gray-600 text-sm mb-3">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="line-clamp-1">{property.location?.district || 'Location'}</span>
          </div>

          {/* Price */}
          <p className="text-xl font-bold text-primary mb-3">
            {formattedPrice}
            <span className="text-sm text-gray-600 font-normal ml-1">
              /{property.pricePerUnit}
            </span>
          </p>

          {/* Details */}
          <div className="flex items-center gap-4 text-sm text-gray-700 mb-3">
            {property.bedrooms > 0 && (
              <div className="flex items-center gap-1">
                <Bed className="w-4 h-4" />
                <span>{property.bedrooms} bed{property.bedrooms !== 1 ? 's' : ''}</span>
              </div>
            )}
            {property.bathrooms > 0 && (
              <div className="flex items-center gap-1">
                <Bath className="w-4 h-4" />
                <span>{property.bathrooms} bath</span>
              </div>
            )}
            {property.areaSize && (
              <div className="flex items-center gap-1">
                <Ruler className="w-4 h-4" />
                <span>{property.areaSize} m²</span>
              </div>
            )}
          </div>

          {/* Features */}
          {property.amenities && property.amenities.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-auto">
              {property.amenities.slice(0, 3).map((amenity) => (
                <span
                  key={amenity.id}
                  className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
                >
                  {amenity.name}
                </span>
              ))}
              {property.amenities.length > 3 && (
                <span className="inline-block bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                  +{property.amenities.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
