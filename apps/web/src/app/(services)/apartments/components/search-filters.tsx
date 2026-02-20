'use client'

import { useState, useCallback } from 'react'
import { Search, X, ChevronDown } from 'lucide-react'
import { PropertyFilters } from '@/shared/types'

interface SearchFiltersProps {
  onFiltersChange: (filters: PropertyFilters) => void
  isLoading?: boolean
}

export function SearchFilters({ onFiltersChange, isLoading = false }: SearchFiltersProps) {
  const [filters, setFilters] = useState<PropertyFilters>({})
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    price: true,
    bedrooms: true,
    location: false,
    amenities: false,
  })

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }))
  }

  const handleFilterChange = useCallback(
    (newFilters: PropertyFilters) => {
      setFilters(newFilters)
      onFiltersChange(newFilters)
    },
    [onFiltersChange]
  )

  const handlePriceChange = (field: 'minPrice' | 'maxPrice', value: number) => {
    handleFilterChange({ ...filters, [field]: value })
  }

  const handleBedroomsToggle = (bedroom: number) => {
    const bedrooms = filters.bedrooms || []
    const updated = bedrooms.includes(bedroom)
      ? bedrooms.filter((b) => b !== bedroom)
      : [...bedrooms, bedroom]
    handleFilterChange({ ...filters, bedrooms: updated })
  }

  const handlePropertyTypeToggle = (type: string) => {
    const types = filters.type || []
    const updated = types.includes(type as any)
      ? types.filter((t) => t !== type)
      : [...types, type as any]
    handleFilterChange({ ...filters, type: updated })
  }

  const handleAmenityToggle = (amenity: string) => {
    const amenities = filters.amenities || []
    const updated = amenities.includes(amenity)
      ? amenities.filter((a) => a !== amenity)
      : [...amenities, amenity]
    handleFilterChange({ ...filters, amenities: updated })
  }

  const handleClearFilters = () => {
    setFilters({})
    onFiltersChange({})
  }

  const activeFiltersCount = Object.values(filters).filter(
    (v) => v !== undefined && v !== null && (Array.isArray(v) ? v.length > 0 : true)
  ).length

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        {activeFiltersCount > 0 && (
          <button
            onClick={handleClearFilters}
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {/* Price Range */}
      <div className="space-y-3 border-b pb-4">
        <button
          onClick={() => toggleSection('price')}
          className="flex items-center justify-between w-full"
        >
          <span className="font-medium">Price Range</span>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${expandedSections.price ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.price && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-700 mb-2">Minimum Price (KES)</label>
              <input
                type="number"
                value={filters.minPrice || ''}
                onChange={(e) => handlePriceChange('minPrice', parseInt(e.target.value) || 0)}
                placeholder="0"
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-2">Maximum Price (KES)</label>
              <input
                type="number"
                value={filters.maxPrice || ''}
                onChange={(e) => handlePriceChange('maxPrice', parseInt(e.target.value) || 0)}
                placeholder="Unlimited"
                disabled={isLoading}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        )}
      </div>

      {/* Property Type */}
      <div className="space-y-3 border-b pb-4">
        <button
          onClick={() => toggleSection('type')}
          className="flex items-center justify-between w-full"
        >
          <span className="font-medium">Property Type</span>
          <ChevronDown className="w-5 h-5" />
        </button>
        {expandedSections.type !== false && (
          <div className="space-y-2">
            {['APARTMENT', 'HOUSE', 'VILLA', 'COMMERCIAL', 'STUDIO'].map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.type?.includes(type as any) || false}
                  onChange={() => handlePropertyTypeToggle(type)}
                  disabled={isLoading}
                  className="w-4 h-4 rounded border-gray-300"
                />
                <span className="text-sm">{type}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Bedrooms */}
      <div className="space-y-3 border-b pb-4">
        <button
          onClick={() => toggleSection('bedrooms')}
          className="flex items-center justify-between w-full"
        >
          <span className="font-medium">Bedrooms</span>
          <ChevronDown
            className={`w-5 h-5 transition-transform ${expandedSections.bedrooms ? 'rotate-180' : ''}`}
          />
        </button>
        {expandedSections.bedrooms && (
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4, 5].map((bed) => (
              <button
                key={bed}
                onClick={() => handleBedroomsToggle(bed)}
                disabled={isLoading}
                className={`px-3 py-2 rounded-lg border transition-all ${
                  filters.bedrooms?.includes(bed)
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                }`}
              >
                {bed}+
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Additional Features */}
      <div className="space-y-3 border-b pb-4">
        <button
          onClick={() => toggleSection('features')}
          className="flex items-center justify-between w-full"
        >
          <span className="font-medium">Features</span>
          <ChevronDown className="w-5 h-5" />
        </button>
        {expandedSections.features !== false && (
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.petFriendly || false}
                onChange={(e) => handleFilterChange({ ...filters, petFriendly: e.target.checked })}
                disabled={isLoading}
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-sm">Pet Friendly</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.furnished || false}
                onChange={(e) => handleFilterChange({ ...filters, furnished: e.target.checked })}
                disabled={isLoading}
                className="w-4 h-4 rounded border-gray-300"
              />
              <span className="text-sm">Furnished</span>
            </label>
          </div>
        )}
      </div>

      {/* Listing Type */}
      <div className="space-y-3">
        <span className="font-medium block">Listing Type</span>
        <div className="flex gap-2">
          {['FOR_RENT', 'FOR_SALE'].map((type) => (
            <button
              key={type}
              onClick={() =>
                handleFilterChange({
                  ...filters,
                  listingType: filters.listingType?.includes(type as any)
                    ? []
                    : [type as any],
                })
              }
              disabled={isLoading}
              className={`flex-1 px-3 py-2 rounded-lg border transition-all ${
                filters.listingType?.includes(type as any)
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
              }`}
            >
              {type === 'FOR_RENT' ? 'Rent' : 'Buy'}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
