/** Apartment/Real Estate Service Types */

// Property Type Enum
export type PropertyType = 'APARTMENT' | 'HOUSE' | 'VILLA' | 'COMMERCIAL' | 'LAND' | 'STUDIO'

export type ListingType = 'FOR_RENT' | 'FOR_SALE'

export type PropertyStatus = 'AVAILABLE' | 'RENTED' | 'SOLD' | 'UNLISTED' | 'SOLD_OUT'

// Location Model
export interface Location {
  id: string
  country: string
  city: string
  district: string
  subArea?: string
  latitude?: number
  longitude?: number
  slug: string
  createdAt: Date
}

// Property Image Model
export interface PropertyImage {
  id: string
  propertyId: string
  url: string
  thumbnailUrl?: string
  caption?: string
  displayOrder: number
  imageType: 'photo' | 'floorplan'
  createdAt: Date
}

// Floor Plan Model
export interface FloorPlan {
  id: string
  propertyId: string
  name?: string
  imageUrl: string
  dimensions?: { width: number; height: number; unit: string }
  areaSize?: number
  description?: string
  displayOrder: number
  createdAt: Date
}

// Amenity Model
export interface Amenity {
  id: string
  name: string
  category: 'facility' | 'feature' | 'service'
  icon?: string
  createdAt: Date
}

// Main Property Model
export interface Property {
  id: string
  title: string
  description?: string
  type: PropertyType
  subType?: string
  listingType: ListingType
  status: PropertyStatus
  price: number
  priceUnit: string
  pricePerUnit: string
  bedrooms: number
  bathrooms: number
  areaSize?: number
  furnishingType?: 'furnished' | 'unfurnished' | 'semi-furnished'
  yearBuilt?: number
  floorNumber?: number
  totalFloors?: number
  locationId: string
  streetAddress?: string
  coordinates?: { lat: number; lng: number }
  featuredImageUrl?: string
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
  deletedAt?: Date
  location?: Location
  images?: PropertyImage[]
  floorPlans?: FloorPlan[]
  amenities?: Amenity[]
  analytics?: PropertyAnalytics
  priceHistory?: PriceHistory[]
}

// Property Complex Model
export interface PropertyComplex {
  id: string
  name: string
  description?: string
  locationId: string
  totalUnits?: number
  imageUrl?: string
  createdAt: Date
}

// User Favorites Model
export interface UserFavorite {
  id: string
  userId: string
  propertyId: string
  listName: string
  notes?: string
  createdAt: Date
}

// User Preferences Model
export interface UserPreference {
  id: string
  userId: string
  minPrice?: number
  maxPrice?: number
  preferredLocations: string[]
  bedrooms: number[]
  bathrooms: number[]
  propertyTypes: PropertyType[]
  preferredAmenities: string[]
  petFriendly: boolean
  furnished?: boolean
  leaseType?: 'long-term' | 'short-term'
  moveInDate?: Date
  notificationsEnabled: boolean
  createdAt: Date
  updatedAt: Date
}

// Search Query Model
export interface SearchQuery {
  id: string
  userPreferenceId: string
  query?: string
  filters?: Record<string, any>
  resultsCount?: number
  selectedPropertyId?: string
  createdAt: Date
}

// Recommendation Model
export interface Recommendation {
  id: string
  userPreferenceId: string
  propertyId: string
  score: number
  reason?: string
  viewed: boolean
  viewedAt?: Date
  createdAt: Date
  expiresAt: Date
}

// Property View Analytics
export interface PropertyView {
  id: string
  propertyId: string
  userId?: string
  sessionId?: string
  source?: 'search' | 'recommendation' | 'direct'
  viewedAt: Date
}

// Price History Model
export interface PriceHistory {
  id: string
  propertyId: string
  price: number
  changeReason?: 'initial' | 'reduction' | 'increase'
  createdAt: Date
}

// Property Share Tracking
export interface PropertyShare {
  id: string
  propertyId: string
  userId?: string
  platform: 'whatsapp' | 'facebook' | 'twitter' | 'email' | 'link'
  shareToken: string
  clicks: number
  feedback?: string
  createdAt: Date
}

// Property Analytics Model
export interface PropertyAnalytics {
  id: string
  propertyId: string
  totalViews: number
  totalFavorites: number
  totalShares: number
  totalShareClicks: number
  contactRequests: number
  avgTimeOnPage?: number
  lastUpdated: Date
}

// API Request/Response Types

// List Properties Request
export interface ListPropertiesRequest {
  page?: number
  limit?: number
  sortBy?: 'price' | 'newest' | 'views' | 'popularity'
  sortOrder?: 'asc' | 'desc'
  filters?: PropertyFilters
}

// Property Filters
export interface PropertyFilters {
  type?: PropertyType[]
  listingType?: ListingType[]
  minPrice?: number
  maxPrice?: number
  bedrooms?: number[]
  bathrooms?: number[]
  areaMinSize?: number
  areaMaxSize?: number
  locations?: string[]
  amenities?: string[]
  petFriendly?: boolean
  furnished?: boolean
  leaseType?: 'long-term' | 'short-term'
  moveInDate?: string
  status?: PropertyStatus[]
}

// List Properties Response
export interface ListPropertiesResponse {
  properties: Property[]
  total: number
  page: number
  limit: number
  hasMore: boolean
  facets?: PropertyFacets
}

// Facets for search refinement
export interface PropertyFacets {
  types: { value: PropertyType; count: number }[]
  priceRanges: { min: number; max: number; count: number }[]
  bedrooms: { value: number; count: number }[]
  locations: { value: string; count: number }[]
  amenities: { value: string; count: number }[]
}

// Get Recommendations Request
export interface GetRecommendationsRequest {
  limit?: number
  excludeViewed?: boolean
}

// Get Recommendations Response
export interface GetRecommendationsResponse {
  recommendations: (Recommendation & { property?: Property })[]
  total: number
}

// Update Preferences Request
export interface UpdatePreferencesRequest {
  minPrice?: number
  maxPrice?: number
  preferredLocations?: string[]
  bedrooms?: number[]
  bathrooms?: number[]
  propertyTypes?: PropertyType[]
  preferredAmenities?: string[]
  petFriendly?: boolean
  furnished?: boolean
  leaseType?: 'long-term' | 'short-term'
  moveInDate?: Date
  notificationsEnabled?: boolean
}

// Add to Favorites Request
export interface AddFavoriteRequest {
  propertyId: string
  listName?: string
  notes?: string
}

// Property Share Request
export interface CreateShareRequest {
  propertyId: string
  platform: 'whatsapp' | 'facebook' | 'twitter' | 'email' | 'link'
  feedback?: string
}

// Share Token Info Response
export interface ShareTokenResponse {
  shareToken: string
  shareUrl: string
  property: Property
  analytics?: {
    totalClicks: number
    createdAt: Date
  }
}

// Analytics Query
export interface AnalyticsQuery {
  propertyId?: string
  locationId?: string
  type?: PropertyType
  startDate?: Date
  endDate?: Date
  metric?: 'views' | 'favorites' | 'shares' | 'contacts'
}

// Market Trends Response
export interface MarketTrendsResponse {
  averagePriceByLocation: { location: string; averagePrice: number; trend: 'up' | 'down' | 'stable' }[]
  priceHistoryByProperty: { propertyId: string; prices: { date: Date; price: number }[] }[]
  demandHeatmap: { location: string; demand: number }[]
  topProperties: Property[]
  marketInsights: string[]
}
