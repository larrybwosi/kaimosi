import { z } from 'zod'

// Enums
const PropertyTypeEnum = z.enum(['APARTMENT', 'HOUSE', 'VILLA', 'COMMERCIAL', 'LAND', 'STUDIO'])
const ListingTypeEnum = z.enum(['FOR_RENT', 'FOR_SALE'])
const PropertyStatusEnum = z.enum(['AVAILABLE', 'RENTED', 'SOLD', 'UNLISTED', 'SOLD_OUT'])

// Property Filters Schema
export const PropertyFiltersSchema = z.object({
  type: z.array(PropertyTypeEnum).optional(),
  listingType: z.array(ListingTypeEnum).optional(),
  minPrice: z.number().positive().optional(),
  maxPrice: z.number().positive().optional(),
  bedrooms: z.array(z.number().int().min(0)).optional(),
  bathrooms: z.array(z.number().int().min(0)).optional(),
  areaMinSize: z.number().positive().optional(),
  areaMaxSize: z.number().positive().optional(),
  locations: z.array(z.string()).optional(),
  amenities: z.array(z.string()).optional(),
  petFriendly: z.boolean().optional(),
  furnished: z.boolean().optional(),
  leaseType: z.enum(['long-term', 'short-term']).optional(),
  moveInDate: z.string().datetime().optional(),
  status: z.array(PropertyStatusEnum).optional(),
})

// List Properties Request Schema
export const ListPropertiesRequestSchema = z.object({
  page: z.number().int().positive().optional().default(1),
  limit: z.number().int().min(1).max(100).optional().default(20),
  sortBy: z.enum(['price', 'newest', 'views', 'popularity']).optional().default('newest'),
  sortOrder: z.enum(['asc', 'desc']).optional().default('desc'),
  filters: PropertyFiltersSchema.optional(),
})

// Create Property Schema
export const CreatePropertySchema = z.object({
  title: z.string().min(5).max(200),
  description: z.string().max(5000).optional(),
  type: PropertyTypeEnum,
  subType: z.string().optional(),
  listingType: ListingTypeEnum,
  status: PropertyStatusEnum.default('AVAILABLE'),
  price: z.number().positive(),
  priceUnit: z.string().default('KES'),
  pricePerUnit: z.string().default('month'),
  bedrooms: z.number().int().min(0),
  bathrooms: z.number().int().min(0),
  areaSize: z.number().positive().optional(),
  furnishingType: z.enum(['furnished', 'unfurnished', 'semi-furnished']).optional(),
  yearBuilt: z.number().int().min(1900).max(new Date().getFullYear()).optional(),
  floorNumber: z.number().int().min(0).optional(),
  totalFloors: z.number().int().min(1).optional(),
  locationId: z.string().cuid(),
  streetAddress: z.string().optional(),
  coordinates: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
  }).optional(),
  featuredImageUrl: z.string().url().optional(),
})

// Update Property Schema
export const UpdatePropertySchema = CreatePropertySchema.partial()

// User Preferences Schema
export const UserPreferencesSchema = z.object({
  minPrice: z.number().positive().optional(),
  maxPrice: z.number().positive().optional(),
  preferredLocations: z.array(z.string()).optional(),
  bedrooms: z.array(z.number().int().min(0)).optional(),
  bathrooms: z.array(z.number().int().min(0)).optional(),
  propertyTypes: z.array(PropertyTypeEnum).optional(),
  preferredAmenities: z.array(z.string()).optional(),
  petFriendly: z.boolean().optional(),
  furnished: z.boolean().optional(),
  leaseType: z.enum(['long-term', 'short-term']).optional(),
  moveInDate: z.date().optional(),
  notificationsEnabled: z.boolean().optional(),
})

// Add Favorite Schema
export const AddFavoriteSchema = z.object({
  propertyId: z.string().cuid(),
  listName: z.string().max(100).default('Favorites'),
  notes: z.string().max(1000).optional(),
})

// Remove Favorite Schema
export const RemoveFavoriteSchema = z.object({
  propertyId: z.string().cuid(),
})

// Create Share Schema
export const CreateShareSchema = z.object({
  propertyId: z.string().cuid(),
  platform: z.enum(['whatsapp', 'facebook', 'twitter', 'email', 'link']),
  feedback: z.string().max(500).optional(),
})

// Property View Schema
export const PropertyViewSchema = z.object({
  propertyId: z.string().cuid(),
  source: z.enum(['search', 'recommendation', 'direct']).optional(),
})

// Recommendations Query Schema
export const GetRecommendationsSchema = z.object({
  limit: z.number().int().min(1).max(50).optional().default(10),
  excludeViewed: z.boolean().optional().default(true),
})

// Analytics Query Schema
export const AnalyticsQuerySchema = z.object({
  propertyId: z.string().cuid().optional(),
  locationId: z.string().cuid().optional(),
  type: PropertyTypeEnum.optional(),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  metric: z.enum(['views', 'favorites', 'shares', 'contacts']).optional(),
})

// Location Schema
export const LocationSchema = z.object({
  country: z.string(),
  city: z.string(),
  district: z.string(),
  subArea: z.string().optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
})

// Amenity Schema
export const AmenitySchema = z.object({
  name: z.string().min(2).max(100),
  category: z.enum(['facility', 'feature', 'service']),
  icon: z.string().optional(),
})

// Property Complex Schema
export const PropertyComplexSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().max(5000).optional(),
  locationId: z.string().cuid(),
  totalUnits: z.number().int().positive().optional(),
  imageUrl: z.string().url().optional(),
})

// Export types inferred from schemas
export type PropertyFilters = z.infer<typeof PropertyFiltersSchema>
export type ListPropertiesRequest = z.infer<typeof ListPropertiesRequestSchema>
export type CreateProperty = z.infer<typeof CreatePropertySchema>
export type UpdateProperty = z.infer<typeof UpdatePropertySchema>
export type UserPreferences = z.infer<typeof UserPreferencesSchema>
export type AddFavorite = z.infer<typeof AddFavoriteSchema>
export type CreateShare = z.infer<typeof CreateShareSchema>
export type PropertyView = z.infer<typeof PropertyViewSchema>
export type GetRecommendations = z.infer<typeof GetRecommendationsSchema>
export type AnalyticsQuery = z.infer<typeof AnalyticsQuerySchema>
